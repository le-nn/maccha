import { observable, computed, action, makeAutoObservable } from "mobx";
import { WebSiteManagementsRepository } from "../Repositories/WebSiteManagementsRepository";
import { WebSite } from "../Models/sites/web-site";
import { ICreateWebSiteParams } from "../Models/sites/create-werb-site.params";
import { IUpdateWebSiteParams } from "../Models/sites/update-web-site.params";

/**
 * Users serive.
 */
export class WebSiteManagementsService {
    private readonly repository = new WebSiteManagementsRepository();
    private _webSites: WebSite[] = [];
    private _selected: WebSite | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * WEBサイト一覧
     */
    public get webSites(): WebSite[] {
        return this._webSites;
    }

    public get selected(): WebSite | null {
        return this._selected;
    }

    /**
     * clear current selected user.
     */
    public async fetchWebsitesAsync() {
        try {
            this._webSites = await this.repository.fetchWebSitesAync();
        }
        catch {
            throw new Error("failed to fetch web site");
        }
    }

    public async saveWebSiteAsync(webSite: IUpdateWebSiteParams) {
        try {
            await this.repository.saveWebSiteAsync({
                webSiteId: webSite.webSiteId,
                name: webSite.name,
                displayName: webSite.displayName,
                description: webSite.description,
                host: webSite.host
            });
            this.fetchWebsitesAsync();
        }
        catch {
            throw new Error("failed to save web sites");
        }
    }

    public async createNewWwebSiteAsync(webSite: ICreateWebSiteParams) {
        try {
            await this.repository.createNewWebSiteAsync({
                name: webSite.name,
                displayName: webSite.displayName,
                description: webSite.description,
                host: webSite.host
            });
            this.fetchWebsitesAsync();
        }
        catch {
            throw new Error("failed to create web site");
        }
    }

    public async saveAsync() {
        if (!this.selected) return;
        await this.saveWebSiteAsync(this.selected);
    }

    public async selectWebSiteAsync(identifier: string) {
        try {
            const webSite = await this.repository.fetchWebSiteAync(identifier);
            this._selected = webSite;
        }
        catch {
            throw new Error("failed to create web site");
        }
    }

    public async setSelectedWebSite(site: WebSite) {
        this._selected = site;
    }
}
