import { ContactField } from "./ContactField";

export interface ContactContent {
    contactContentId: string;
    contactSettingId: string;
    contactedAt: string;
    title: string;
    fields: ContactField[];
}

export interface ContactContentMeta {
    contactContentId: string;
    title: string;
    contactedAt: string;
}
