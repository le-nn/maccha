export class ContactContentField {
    contactContentFieldId = "";
    name = "";
    value = "";
    contactContentId = "";

    constructor(params: ContactContentField) {
        Object.assign(this, params);
    }
}