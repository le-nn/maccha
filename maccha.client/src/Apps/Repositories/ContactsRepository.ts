import { ContactContent } from "Apps/Models/Domain/Contacts/Contact";
import { axios } from "./config";

export class ContactsRepository {
    async fetchAsync(contactSettingId: string) {
        try {
            const result = await axios.get<ContactContent[]>("/api/contacts/" + contactSettingId);
            return result.data;
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
}