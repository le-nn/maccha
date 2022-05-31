import { ContactContent, IContactContentMeta } from "../Entities/ContactContent";
import { IPostContactParams } from "../params/IPostParams";

export interface IContactsRepository {
    searchAsync(settingId: string): Promise<IContactContentMeta[]>;
    fetchAsync(contactId: string): Promise<ContactContent | null>;
    postAsync(contactSettingId: string, prams: IPostContactParams): Promise<void>;
}