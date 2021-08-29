import { ICreateWebSiteParams } from "./create-werb-site.params";
import { WebSite } from "./web-site";
import { IUpdateWebSiteParams } from "./update-web-site.params";

export interface IWebSitesRepository {
    getAllAsync(): Promise<WebSite[]>;
    getAsync(identifier: string): Promise<WebSite>;
    createAsync(params: ICreateWebSiteParams): Promise<WebSite>;
    updateAsync(webSite: IUpdateWebSiteParams): Promise<WebSite>;
    deleteAsync(identifier: string): Promise<void>;
}