import { DataSourceOptions } from "typeorm";
import { Migrations } from "./src/Infrastructure/Database/Migrations";
import * as Entities from "./src/Infrastructure/Database/Entities";

const config: DataSourceOptions | any = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: "utf8mb4_unicode_ci",
    migrationsTableName: "migrations",
    synchronize: false,
    logging: ["error"],// Boolean(process.env.DB_IS_LOGGING),
    logger: process.env.LOGGER_TYPE as "simple-console",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entities: Object.keys(Entities).map(key => (Entities as any)[key]),
    migrations: [
        ...Migrations
    ],
    subscribers: ["dist/subscribers/**/*.js"],
    cli: {
        entitiesDir: "src/Infrastructure/Database/Entities",
        migrationsDir: "src/Infrastructure/Database/Migrations",
        subscribersDir: "src/subscribers"
    }
};

export = config;
