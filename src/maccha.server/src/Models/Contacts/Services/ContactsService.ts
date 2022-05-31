import { IMailService } from "@/Models/Mail/IMailService";
import { Inject } from "@nestjs/common";
import { DateTime } from "luxon";
import { ContactContent, IContactContentMeta } from "../Entities/ContactContent";
import { IPostContactFieldParams } from "../params/IPostParams";
import { IContactSettingsRepository } from "../Repositories/IContactSettingsRepository";
import { IContactsRepository } from "../Repositories/IContactsRepository";

export class ContactsService {
    constructor(
        @Inject("IContactsRepository")
        readonly contactsRepository: IContactsRepository,
        @Inject("IContactSettingsRepository")
        readonly contactSettingsRepository: IContactSettingsRepository,
        @Inject("IMailService")
        readonly mailService: IMailService
    ) { }

    /**
     * Search the contact info async.
     * @param settingId The contact setting id.
     * @returns The hit contacts.
     */
    async searchAsync(settingId: string): Promise<IContactContentMeta[]> {
        const settings = await this.contactsRepository.searchAsync(settingId);
        return settings;
    }

    /**
     * Fetch a contact info async.
     * @param contactId The contact id.
     * @returns The contact info.
     */
    async fetchAsync(contactId: string): Promise<ContactContent | null> {
        return await this.contactsRepository.fetchAsync(contactId);
    }

    /**
     * Post contact info async.
     * @param contactSettingId The contact setting id.
     * @param params The contact field params.
     */
    async postAsync(contactSettingId: string,
        params: IPostContactFieldParams[]): Promise<void> {
        const setting = await this.contactSettingsRepository.findAsync(contactSettingId);
        if (!setting) {
            throw new Error("ContactSettingId : " + contactSettingId + " is not found.");
        }

        try {
            const table = setting.schemes;
            const fields = params.filter(x => table.includes(x.name));

            const replace = (text: string) => this.replace(text, fields);

            for (const mail of setting.emailSettings) {
                const { to, bodyTemplate, from, header, titleTemplate } = mail;
                await this.mailService.sendAsync(
                    replace(to),
                    replace(from),
                    replace(titleTemplate),
                    replace(bodyTemplate));
            }

            // TODO: confirm rather exists scheme key

            await this.contactsRepository.postAsync(contactSettingId, {
                contactedAt: DateTime.now(),
                title: "",
                fields
            });
        }
        catch(ex) {
            console.error(ex);
        }
    }

    /**
     * replace "[field_name]" to "field_value" in text.
     * for example:
     * fields = [
     *   { name: "email", value: "email@example.com"},
     *   { name: "first_name", value: "John"}
     * ]
     * "aaa [email] bbb [first_name]" -> "aaa email@example.com bbb John"
     * @param text source text.
     * @param fields contact scheme fields.
     * @returns replaced text.
     */
    private replace(text: string, fields: IPostContactFieldParams[]) {
        return fields.reduce((x, y) => x.replace(`[${y.name}]`, y.value), text);
    }
}