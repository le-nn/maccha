import { DateTime } from "luxon";
import { ContactContentField } from "./ContactContentField";

export interface IContactContentMeta {
    contactContentId: string;
    title: string;
    contactedAt: DateTime;
}

export class ContactContent {
    contactContentId = "";
    contactSettingId = "";
    identifier = "";
    title = "";
    contactedAt: DateTime | null = null;
    fields: ContactContentField[] = [];

    constructor(params: ContactContent) {
        Object.assign(this, params);
    }
}