export class ContactEmailSetting {
    to = "";
    from = "";
    header = "";
    titleTemplate = "";
    bodyTemplate = "";

    constructor(params: ContactEmailSetting) {
        Object.assign(this, params);
    }
}