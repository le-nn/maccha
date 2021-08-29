import { IWebSite } from "./web-site.interface";

export class WebSite implements IWebSite {
    webSiteId: string;
    name: string;
    host: string;
    displayName: string;
    description: string;
    constructor(webSiteId: string,
        displayName: string,
        name: string,
        host: string,
        description: string) {
        this.webSiteId = webSiteId;
        this.name = name;
        this.displayName = displayName;
        this.host = host;
        this.description = description;
    }

    /**
     * close this instance.
     * @returns cloned instance
     */
    public clone(): WebSite {
        return new WebSite(this.webSiteId, this.displayName, this.name, this.host, this.description);
    }

    public with(params: Partial<WebSite>) {
        const site = this.clone();
        Object.assign(site, params);
        return site;
    }
}
