import { ContactEmailSetting } from "@/Models/Contacts/Entities/ContactEmailSetting";
import { ContactSetting } from "@/Models/Contacts/Entities/ContactSetting";
import { ICreateContactSettingParams } from "@/Models/Contacts/params/ICreateContactSettingParams";
import { ISaveContactSettingParams } from "@/Models/Contacts/params/ISaveContactSettingParams";
import { IContactSettingsRepository } from "@/Models/Contacts/Repositories/IContactSettingsRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 } from "uuid";
import { ContactEmailSettingEntity, ContactSettingEntity } from "../Database/Entities";

export class ContactSettingsRepository implements IContactSettingsRepository {
    constructor(
        @InjectRepository(ContactSettingEntity) private readonly contactSettings: Repository<ContactSettingEntity>,
        @InjectRepository(ContactEmailSettingEntity) private readonly contactEmails: Repository<ContactEmailSettingEntity>
    ) {

    }

    async getAllAsync(identifier: string): Promise<{ contactSettingId: string, name: string }[]> {
        try {
            const settings = await this.contactSettings.find({
                select: ["contactSettingId", "name"],
                where: {
                    identifier
                }
            });
            console.log(settings, identifier);
            return settings.map(x => ({
                contactSettingId: x.contactSettingId,
                name: x.name,
            }));
        }
        catch (expect) {
            throw expect;
        }
    }

    async createAsync(params: ICreateContactSettingParams): Promise<void> {
        try {
            const contactSettingId = v4();
            const settings = await this.contactSettings.save({
                contactSettingId: contactSettingId,
                identifier: params.identifier,
                name: params.name,
                schemes: params.schemes.join(",")
            });
            await this.contactEmails.save(
                params.emailSettings.map(e => ({
                    bodyTemplate: e.bodyTemplate,
                    contactEmailSettingId: v4(),
                    contactSettingId,
                    from: e.from,
                    header: e.header,
                    titleTemplate: e.titleTemplate,
                    to: e.to,
                }))
            );
        }
        catch (expect) {
            console.log(expect);
            throw expect;
        }
    }

    deleteAsync(contactSettingId: string): Promise<void> {
        // this.contactEmails.createQueryBuilder()
        //     .delete()
        //     .from(ContactEmailSettingEntity)
        //     .where("contactSettingId = :id", { id: params.emailSettings })
        //     .execute();
        throw new Error("Method not implemented.");
    }

    async findAsync(contactSettingId: string): Promise<ContactSetting | null> {
        try {
            const settings = await this.contactSettings.findOne({
                where: {
                    contactSettingId,
                }
            });

            const emailSetting = await this.contactEmails.find({
                where: {
                    contactSettingId: contactSettingId,
                }
            });

            if (!settings || !emailSetting.length) {
                return null;
            }

            return new ContactSetting({
                contactSettingId: settings.contactSettingId,
                identifier: settings.identifier,
                name: settings.name,
                schemes: settings.schemes.split(","),
                emailSettings: emailSetting.map(e => new ContactEmailSetting({
                    bodyTemplate: e.bodyTemplate,
                    from: e.from,
                    to: e.to,
                    header: e.header,
                    titleTemplate: e.titleTemplate,
                })),
            });
        }
        catch (expect) {
            throw expect;
        }
    }

    saveAsync(params: ISaveContactSettingParams): Promise<void> {
        throw new Error("Method not implemented.");
    }
}