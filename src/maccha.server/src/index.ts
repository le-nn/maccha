import { ArgumentsHost, Catch, DynamicModule, ExceptionFilter, Global, INestApplication, Module, NotFoundException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConnectionOptions, createConnection, MigrationInterface, QueryRunner } from "typeorm";
import { MacchaModule } from "./modules/maccha.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { WebSitesModule } from "./modules/web-sites.module";
import { UsersModule } from "./modules/users.module";
import { AuthService } from "./Models/Authentications/auth.service";
import { MulterModule } from "@nestjs/platform-express";
import { AuthGuard } from "./Applications/Commons/auth-guard";

import * as Entities from "@/Infrastructure/Database/Entities";
import { Migrations as MacchaMigrations } from "./Infrastructure/Database/Migrations";
import { AuthenticationsController } from "./Applications/Authentications/AuthenticationsController";
import * as bodyParser from "body-parser";
import express from "express";
import path from "path";
import { NotFoundExceptionFilter } from "./NotFoundFallback";
import { MailService } from "./Infrastructure/Mail/MailServie";
import { UserEntity } from "@/Infrastructure/Database/Entities";

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

export interface MacchaOption {
    database: DbConfig;
    authorization: AuthOption;
    assetsDir: string;
    pulugins: MacchaPlugin[];
    clientSpaPath: string;
    mailConnectionString: string;
}

const defaultOption: MacchaOption = {
    assetsDir: path.join(process.cwd(), "public"),
    authorization: {
        expiresIn: "10m",
        jwtKey: "security_key",
    },
    clientSpaPath: "/app",
    database: {
        database: "maccha",
        host: "localhost",
        logger: "simple-console",
        logging: true,
        password: "root",
        port: 3306,
        username: "root",
    },
    pulugins: [],
    mailConnectionString: "user=null;password=null;host=null;port=0",
};

const buildDbConfig = (option: MacchaOption) => {
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
        entities: Object.keys(Entities)
            .map(key => (Entities as any)[key]),
        migrations: [
            ...MacchaMigrations as any,
            ...option.pulugins
                .map(p => p.migrations)
                .reduce((x, y) => [...x, ...y], [])
        ]
    } as ConnectionOptions;
};

@Global()
@Module({})
class AuthModule {
    static register(option: MacchaOption): DynamicModule {
        return {
            module: AuthModule,
            imports: [
                TypeOrmModule.forFeature([UserEntity]),
                WebSitesModule,
                UsersModule,
                JwtModule.register({
                    secret: option.authorization.jwtKey,
                    signOptions: { expiresIn: option.authorization.expiresIn },
                }),
            ],
            controllers: [
                AuthenticationsController
            ],
            providers: [
                AuthService,
                AuthGuard
            ],
            exports: [
                AuthService,
                AuthGuard
            ],
        };
    }
}

@Global()
@Module({})
export class MainModule {
    static register(option: MacchaOption): DynamicModule {
        return {
            module: MainModule,
            providers: [
                {
                    provide: "IMailService",
                    useFactory: () => new MailService(option.mailConnectionString)
                }
            ],
            imports: [
                MulterModule.register(),
                TypeOrmModule.forRootAsync({
                    useFactory: () => buildDbConfig(option)
                }),
                AuthModule.register(option),
                MacchaModule,
                ...option.pulugins.map(p => p.modules).reduce((x, y) => [...x, y], [] as any)
            ],
            exports: ["IMailService"]
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

export async function createMacchaApiServer(_option: Partial<MacchaOption>): Promise<INestApplication> {
    const option: MacchaOption = {
        ...defaultOption,
        ..._option
    };

    plugins = option.pulugins;

    // run db migration
    await migration(option);
    const app = await NestFactory.create(MainModule.register(option));
    // for auto validation in model mapping
    app.useGlobalPipes(new ValidationPipe());

    // cors
    app.enableCors({ origin: "*", allowedHeaders: "Origin, Authentication, *" });

    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    // build documents
    const options = new DocumentBuilder()
        .setTitle("maccha cms")
        .setDescription("maccha cms API description")
        .setVersion("1.0.0")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api", app, document);

    app.use(express.static(option.assetsDir));

    app.useGlobalFilters(new NotFoundExceptionFilter(option));
    return app;
}
