
export interface ICreateContactEmailSetting {
    to: string;
    from: string;
    header: string;
    titleTemplate: string;
    bodyTemplate: string;
}

export interface ICreateContactSettingParams {
    emailSettings: ICreateContactEmailSetting[];
    name: string;
    schemes: string[];
    identifier: string;
}