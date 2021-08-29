import { WebSite } from "../Models/sites/web-site";
import { ICreateWebSiteParams } from "../Models/sites/create-werb-site.params";
import { IUpdateWebSiteParams } from "../Models/sites/update-web-site.params";
/**
 * Users serive.
 */
export declare class WebSiteManagementsService {
    private readonly repository;
    private _webSites;
    private _selected;
    constructor();
    /**
     * WEBサイト一覧
     */
    get webSites(): WebSite[];
    get selected(): WebSite | null;
    /**
     * clear current selected user.
     */
    fetchWebsitesAsync(): Promise<void>;
    saveWebSiteAsync(webSite: IUpdateWebSiteParams): Promise<void>;
    createNewWwebSiteAsync(webSite: ICreateWebSiteParams): Promise<void>;
    saveAsync(): Promise<void>;
    selectWebSiteAsync(identifier: string): Promise<void>;
    setSelectedWebSite(site: WebSite): Promise<void>;
}
