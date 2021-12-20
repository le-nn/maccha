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
        readonly contactSettingsRepository: IContactSettingsRepository) {
    }

    async searchAsync(settingId: string): Promise<IContactContentMeta[]> {
        const settings = await this.contactsRepository.searchAsync(settingId);
        return settings;
    }

    async fetchAsync(contactId: string): Promise<ContactContent | null> {
        return await this.contactsRepository.fetchAsync(contactId);
    }

    async postAsync(contactSettingId: string,
        params: IPostContactFieldParams[]): Promise<void> {
        const setting = await this.contactSettingsRepository.findAsync(contactSettingId);
        if (!setting) {
            throw new Error("ContactSettingId : " + contactSettingId + "is not found.");
        }

        const table = setting.schemes;

        const filterFields = (fields: IPostContactFieldParams[]) => {
            return fields.filter(x => table.includes(x.name));
        };

        // TODO: confirm rather exists scheme key

        await this.contactsRepository.postAsync(contactSettingId, {
            contactedAt: DateTime.now(),
            title: "",
            fields: filterFields(params)
        });
    }
}