import { IMailService } from "@/Models/Mail/IMailService";
import mailer, { Transporter } from "nodemailer";
type Setting = { [key: string]: string };

export class MailService implements IMailService {
    settings: Setting = {};
    transporter: Transporter;

    constructor(connectionString: string) {
        if (!connectionString) {
            throw new Error("connectionString is undefined.");
        }

        // Parse connection strings.
        this.settings = connectionString.split(";").reduce<Setting>((x, y) => {
            const [left, right] = y.split("=");
            return { ...x, [left]: right };
        }, {});

        const properties = ["user", "password", "port", "host"];
        for (const key of properties) {
            if (!this.settings[key]) {
                throw new Error(`Mail server connection string is failed. \n"${key} is undefined.\nconnection string: ${connectionString}"`);
            }
        }

        this.transporter = mailer.createTransport({
            port: Number(this.settings.port),
            host: this.settings.host,
            auth: {
                user: this.settings.user,
                pass: this.settings.password,
            }
        });
    }

    sendAsync(to: string, from: string, subject: string, text: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const option = {
                from,
                to,
                subject,
                text
            };

            this.transporter.sendMail(option, (error, info) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
}