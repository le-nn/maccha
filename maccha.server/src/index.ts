import { DynamicModule, Global, INestApplication, Module, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConnectionOptions, createConnection, MigrationInterface, QueryRunner } from "typeorm";
import { MacchaModule } from "./modules/maccha.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ServeStaticModule } from "@nestjs/serve-static";
import { WebSitesModule } from "./modules/web-sites.module";
import { UsersModule } from "./modules/users.module";
import { AuthService } from "./Models/Authentications/auth.service";
import { MulterModule } from "@nestjs/platform-express";
import { AuthGuard } from "./Applications/Commons/auth-guard";

import * as Entities from "@/Infrastructure/Database/Entities";
import { Migration as MacchaMigration } from "./Infrastructure/Database/Migrations";
import { AuthenticationsController } from "./Applications/Authentications/AuthenticationsController";
import * as bodyParser from "body-parser";

export interface Logger {
    /**
     * Logs query and parameters used in it.
     */
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any;
    /**
     * Logs query that is failed.
     */
    logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any;
    /**
     * Logs query that is slow.
     */
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any;
    /**
     * Logs events from the schema build process.
     */
    logSchemaBuild(message: string, queryRunner?: QueryRunner): any;
    /**
     * Logs events from the migrations run process.
     */
    logMigration(message: string, queryRunner?: QueryRunner): any;
    /**
     * Perform logging using given logger, or by default to the console.
     * Log has its own level and message.
     */
    log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any;
}

interface AuthOption {
    /**
     *  expressed in seconds or a string describing a time span.  Eg: 60, "2 days", "10h", "7d"
     */
    expiresIn: string;

    /**
     * key for jwt token.
     */
    jwtKey: string;
}

interface DbConfig {
    database: string;
    username: string;
    password: string;
    port: number;
    host: string;
    logging: boolean;
    logger: "advanced-console" | "simple-console" | "file" | "debug" | Logger;
}

export interface MacchaPlugin {
    modules: DynamicModule;
    migrations: MigrationInterface[];
}


interface MacchaOption {
    database: DbConfig;
    authorization: AuthOption;
    assetsDir: string;
    pulugins: MacchaPlugin[];
}

function buildDbConfig(option: MacchaOption) {
    return {
        name: "main",
        type: "mysql",
        host: option.database.host,
        port: option.database.port,
        username: option.database.username,
        password: option.database.password,
        database: option.database.database,
        charset: "utf8mb4_unicode_ci",
        migrationsTableName: "migrations",
        synchronize: false,
        logging: option.database.logging,
        logger: option.database.logger,
        entities: Object.keys(Entities).map(key => (Entities as any)[key]),
        migrations: [
            MacchaMigration,
            ...option.pulugins.map(p => p.migrations).reduce((x, y) => [...x, ...y], [])
        ]
    } as ConnectionOptions;
}

@Global()
@Module({})
class AuthModule {
    static register(option: MacchaOption): DynamicModule {
        return {
            module: AuthModule,
            imports: [
                WebSitesModule,
                UsersModule,
                JwtModule.register({
                    secret: option.authorization.jwtKey,
                    signOptions: { expiresIn: option.authorization.expiresIn },
                }),
            ],
            controllers: [AuthenticationsController],
            providers: [AuthService, AuthGuard],
            exports: [AuthService, AuthGuard],
        };
    }
}

@Module({})
class MainModule {
    static register(option: MacchaOption): DynamicModule {
        return {
            module: MainModule,
            imports: [
                MulterModule.register(),
                TypeOrmModule.forRootAsync({
                    useFactory: () => buildDbConfig(option)
                }),
                ServeStaticModule.forRoot({
                    rootPath: option.assetsDir,

                }),
                AuthModule.register(option),
                MacchaModule,
                ...option.pulugins.map(p => p.modules).reduce((x, y) => [...x, y], [] as any)
            ],
        };
    }
}

async function migration(option: MacchaOption) {
    const connection = await createConnection(buildDbConfig(option));
    await connection.runMigrations();
    await connection.close();
}

let plugins: MacchaPlugin[] = [];

export function getPlugins(): MacchaPlugin[] {
    return plugins;
}

export async function createMacchaApiServer(option: MacchaOption): Promise<INestApplication> {
    plugins = option.pulugins;

    // run db migration
    await migration(option);

    const app = await NestFactory.create(MainModule.register(option));

    // for auto validation in model mapping
    app.useGlobalPipes(new ValidationPipe());

    // cors
    app.enableCors({ origin: "*", allowedHeaders: "Origin, Authentication, *" });

    app.use(bodyParser.json({limit: "50mb"}));
    app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

    // build documents
    const options = new DocumentBuilder()
        .setTitle("espresso.js cms")
        .setDescription("espresso.js cms API description")
        .setVersion("1.0.0")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api", app, document);

    return app;
}
