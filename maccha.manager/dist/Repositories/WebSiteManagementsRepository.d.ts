import { WebSite } from "../Models/sites/web-site";
import { ICreateWebSiteParams } from "../Models/sites/create-werb-site.params";
import { IUpdateWebSiteParams } from "../Models/sites/update-web-site.params";
export declare class WebSiteManagementsRepository {
    fetchWebSiteAync(identifier: string): Promise<WebSite>;
    fetchWebSitesAync(): Promise<WebSite[]>;
    createNewWebSiteAsync(webSite: ICreateWebSiteParams): Promise<void>;
    saveWebSiteAsync(webSite: IUpdateWebSiteParams): Promise<void>;
}
