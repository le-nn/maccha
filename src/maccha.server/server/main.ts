import { createMacchaApiServer } from "../src";
import path = require("path");
import env = require("dotenv");
import { TestPlugin } from "../src/Plugins";

env.config();

const bootstrap = async (): Promise<void> => {
    const app = await createMacchaApiServer({
        assetsDir: path.join(process.cwd(), "public"),
        authorization: {
            expiresIn: process.env.EXPIRES_IN ?? "10m",
            jwtKey: process.env.JWT_KEY ?? "hogehoge"
        },
        database: {
            username: process.env.DB_USERNAME ?? "root",
            password: process.env.DB_PASSWORD ?? "root",
            database: process.env.DB_DATABASE ?? "maccha",
            host: process.env.DB_HOST ?? "localhost",
            port: Number(process.env.DB_PORT),
            logging: false,
            logger: process.env.LOGGER_TYPE as "simple-console"
        },
        pulugins: [
            TestPlugin
        ],
        clientSpaPath: "/app",
        mailConnectionString: process.env.MAIL_CONNECTION_STRING
    });

    console.log("start espresso cms listen on " + (process.env.PORT || 8081));
    await app.listen(process.env.PORT || 8081);
};
bootstrap();
