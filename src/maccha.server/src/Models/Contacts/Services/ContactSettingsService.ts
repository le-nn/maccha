import { Inject } from "@nestjs/common";
import { ICreateContactSettingParams } from "../params/ICreateContactSettingParams";
import { ISaveContactSettingParams } from "../params/ISaveContactSettingParams";
import { IContactSettingsRepository } from "../Repositories/IContactSettingsRepository";

export class ContactSettingsService {
    constructor(
        @Inject("IContactSettingsRepository")
        readonly contactSettingsRepository: IContactSettingsRepository) { }

    async fetchAsync(contactSettingId: string) {
        return await this.contactSettingsRepository.findAsync(contactSettingId);
    }

    async getAllAsync(identifier: string): Promise<{ contactSettingId: string, name: string }[]> {
        const settings = await this.contactSettingsRepository.getAllAsync(identifier);
        return settings;
    }

    async createAsync(params: ICreateContactSettingParams): Promise<void> {
        await this.contactSettingsRepository.createAsync(params);
    }

    async removeAsync(contactSettingId:string){
        await this.contactSettingsRepository.deleteAsync(contactSettingId);
    }

   async saveAsync(params: ISaveContactSettingParams) {
       await this.contactSettingsRepository.saveAsync(params);
   }
}