import { IWebSite } from "./web-site.interface";
export declare class WebSite implements IWebSite {
    webSiteId: string;
    name: string;
    host: string;
    displayName: string;
    description: string;
    constructor(webSiteId: string, displayName: string, name: string, host: string, description: string);
    /**
     * close this instance.
     * @returns cloned instance
     */
    clone(): WebSite;
    with(params: Partial<WebSite>): WebSite;
}
