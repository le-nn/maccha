import { ICreateWebSiteParams } from "./create-werb-site.params";
import { WebSite } from "./web-site";
import { IUpdateWebSiteParams } from "./update-web-site.params";
export interface IWebSitesRepository {
    getAllAsync(): Promise<WebSite[]>;
    getAsync(webSiteIdentifier: string): Promise<WebSite>;
    createAsync(params: ICreateWebSiteParams): Promise<WebSite>;
    updateAsync(identifier: string, webSite: IUpdateWebSiteParams): Promise<WebSite>;
    deleteAsync(webSiteIdentifier: string): Promise<void>;
}
