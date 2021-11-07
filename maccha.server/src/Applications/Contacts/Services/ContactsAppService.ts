import { IPostContactFieldParams, IPostContactParams } from "@/Models/Contacts/params/IPostParams";
import { ContactSettingsService } from "@/Models/Contacts/Services/ContactSettingsService";
import { ContactsService } from "@/Models/Contacts/Services/ContactsService";
import { Inject } from "@nestjs/common";
import { CreateContactSettingParams } from "../Params/CreateContactSettingParams";

export class ContactAppService {    
    constructor(
        @Inject(ContactsService)
        readonly contactsService: ContactsService) {
    }

    async searchAsync(identifier: string) {
        return await this.contactsService.searchAsync(identifier);
    }

    async fetchAsync(contactSettingId: string, contactId: string) {
        return await this.contactsService.fetchAsync(contactId);
    }

    async postAsync(
        contactsSettingId: string,
        params: IPostContactFieldParams[]) {
        await this.contactsService.postAsync(contactsSettingId, params);
    }
}