import { ContactContent } from "./ContactContent";
import { ContactEmailSetting } from "./ContactEmailSetting";

/**
 * Taxonomy entity.
 */
export class ContactSetting {
    contactSettingId = "";

    emailSettings: ContactEmailSetting[] = [];

    name = "";

    /**
     * Field schemes.
     * @example 
     * ["name", "first-name", "description"]
     */
    schemes: string[] = [];

    identifier = "";

    constructor(params: ContactSetting) {
        Object.assign(this, params);
    }
}