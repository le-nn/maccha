export class WebSite {
    webSiteId: string;
    name: string;
    host: string;
    displayName: string;
    description: string;
    constructor(
        webSiteId: string,
        name: string,
        displayName: string,
        host: string,
        description: string) {
        this.webSiteId = webSiteId;
        this.name = name;
        this.displayName = displayName;
        this.host = host;
        this.description = description;
    }
}