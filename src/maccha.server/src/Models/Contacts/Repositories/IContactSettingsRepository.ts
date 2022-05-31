import { ContactSetting } from "../Entities/ContactSetting";
import { ICreateContactSettingParams } from "../params/ICreateContactSettingParams";
import { ISaveContactSettingParams } from "../params/ISaveContactSettingParams";

export interface IContactSettingsRepository {
    getAllAsync(identifier: string): Promise<{ contactSettingId: string, name: string }[]>;
    createAsync(params: ICreateContactSettingParams): Promise<void>;
    deleteAsync(contactSettingId: string): Promise<void>;
    findAsync(contactSettingId: string): Promise<ContactSetting | null>;
    saveAsync(params: ISaveContactSettingParams): Promise<void>;
}