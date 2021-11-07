
interface ISaveContactEmailSetting {
    to: string;
    from: string;
    header: string;
    titleTemplate: string;
    bodyTemplate: string;
}

export interface ISaveContactSettingParams {
    contactSettingId: string;
    emailSettings: ISaveContactEmailSetting[];
    name: string;
    schemes: string[];
    identifier: string;
}