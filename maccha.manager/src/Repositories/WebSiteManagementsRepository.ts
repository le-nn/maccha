import { axios } from "./config";
import { from } from "rxjs";
import { concatMap } from "rxjs/operators";
import { WebSite } from "../Models/sites/web-site";
import { ICreateWebSiteParams } from "../Models/sites/create-werb-site.params";
import { IUpdateWebSiteParams } from "../Models/sites/update-web-site.params";

export class WebSiteManagementsRepository {

    public async fetchWebSiteAync(identifier: string): Promise<WebSite> {
        try {
            const result = await axios.get<WebSite>("/api/web-sites/" + identifier);
            const x = result.data;
            return new WebSite(x.webSiteId, x.displayName, x.name, x.host, x.description);
        }
        catch (ex) {
            throw new Error("Failed to fetch data websites data.");
        }
    }

    public async fetchWebSitesAync(): Promise<WebSite[]> {
        try {
            const result = await axios.get<WebSite[]>("/api/web-sites");
            return result.data.map(x => new WebSite(x.webSiteId, x.displayName, x.name, x.host, x.description));
        }
        catch (ex) {
            throw new Error("Failed to fetch data websites data.");
        }
    }

    public async createNewWebSiteAsync(webSite: ICreateWebSiteParams) {
        try {
            await axios.post("/api/web-sites/", webSite);
        }
        catch (ex) {
            throw new Error("failed to create new web site");
        }
    }

    public async saveWebSiteAsync(webSite: IUpdateWebSiteParams) {
        try {
            await axios.put("/api/web-sites", webSite);
        }
        catch (ex) {
            throw new Error("failed to create new web site");
        }
    }
}