import { ISaveContactSettingParams } from "@/Models/Contacts/params/ISaveContactSettingParams";
import { ContactSettingsService } from "@/Models/Contacts/Services/ContactSettingsService";
import { Inject } from "@nestjs/common";
import { CreateContactSettingParams } from "../Params/CreateContactSettingParams";

export class ContactSettingsAppService {
    constructor(
        @Inject(ContactSettingsService) readonly contactSettingsService: ContactSettingsService) {
    }

    async fetchAsync(contactSettingId: string) {
        return await this.contactSettingsService.fetchAsync(contactSettingId);
    }

    async getAllAsync(identifier: string) {
        return await this.contactSettingsService.getAllAsync(identifier);
    }

    async createAsync(params: CreateContactSettingParams) {
        return await this.contactSettingsService.createAsync(params);
    }

    async saveAsync(params: ISaveContactSettingParams) {
        return await this.contactSettingsService.saveAsync(params);
    }

    async removeAsync(contactSettingId: string) {
        return await this.contactSettingsService.removeAsync(contactSettingId);
    }
}