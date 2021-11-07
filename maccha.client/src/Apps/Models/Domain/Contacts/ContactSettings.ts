export interface IContactEmailSetting {
    to: string;
    from: string;
    header: string;
    titleTemplate: string;
    bodyTemplate: string;
}

export interface IContactSetting {
    contactSettingId: string;
    emailSettings: IContactEmailSetting[];
    name: string;
    schemes: string[];
    identifier: string;
}