import { IContactSetting } from "Apps/Models/Domain/Contacts/ContactSettings";
import { axios } from "./config";

export class ContactSettingsRepository {
    async fetchContactSettings() {
        try {
            const result = await axios.get<{ name: string, contactSettingId: string }[]>("/api/contact-settings");
            return result.data;
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }

    async fetchContactSetting(contactSettingId: string): Promise<IContactSetting | null> {
        try {
            const result = await axios.get<IContactSetting>("/api/contact-settings/" + contactSettingId);
            return result.data;
        }
        catch (ex) {
            console.error(ex);
            return null;
        }
    }

    async addContactSetting(params: Omit<IContactSetting, "contactSettingId">) {
        try {
            const result = await axios.post("/api/contact-settings", params);
            return result.data;
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }

    async saveContactSetting(params: IContactSetting) {
        try {
            const result = await axios.put("/api/contact-settings", params);
            return result.data;
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
}