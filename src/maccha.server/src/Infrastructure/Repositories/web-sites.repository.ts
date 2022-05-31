import { IWebSitesRepository } from "@/Models/WebSites/web-site-repository.interface";
import { InjectRepository, InjectConnection } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { WebSiteEntity } from "../Database/Entities/web-site.entity";
import { WebSite } from "@/Models/WebSites/web-site";
import { ICreateWebSiteParams } from "@/Models/WebSites/create-werb-site.params";
import { IUpdateWebSiteParams } from "@/Models/WebSites/update-web-site.params";

export class WebSitesRepository implements IWebSitesRepository {
    /**
     * constructor
     * @param webSites web sites typeorm repository
     */
    constructor(
        @InjectRepository(WebSiteEntity) private readonly webSites: Repository<WebSiteEntity>,
        @InjectConnection() private readonly connection: Connection
    ) { }

    public async getWebSiteIdAsync(identifier: string): Promise<string | null> {
        try {
            const created = await this.webSites.findOne({ name: identifier });
            return created?.webSiteId ?? null;
        }
        catch {
            return null;
        }
    }

    /**
     * get all web sites
     * @returns web sites list
     */
    public async getAllAsync(): Promise<WebSite[]> {
        try {
            const sites = await this.webSites.find({});
            if (sites) {
                return sites.map(created => new WebSite(
                    created.webSiteId ?? "",
                    created.name,
                    created.displayName,
                    created.host,
                    created.description,
                ));
            }
        }
        catch (ex: any) {
            console.error("error traced in websites repository", ex.message);
        }
        throw new Error();
    }

    /**
     * get a web site
     * @param webSiteId to find web site id
     * @returns web site
     */
    public async getAsync(webSiteId: string): Promise<WebSite> {
        try {
            const created = await this.webSites.findOne({ webSiteId: webSiteId });
            if (created) {
                return new WebSite(
                    created.webSiteId ?? "",
                    created.name,
                    created.displayName,
                    created.host,
                    created.description,
                );
            }
        }
        catch (ex: any) {
            console.error("error traced in websites repository", ex.message);
        }
        throw new Error(`web site webSiteId [${webSiteId}] is not exists.`);
    }

    /**
     * create new websites
     * @param params to create params
     * @returns web site
     */
    public async createAsync(params: ICreateWebSiteParams): Promise<WebSite> {
        try {
            const exists = await this.webSites.findOne({ name: params.name });
            if (exists) throw new Error("web site name [" + params.name + "] is already exists.");

            const created = await this.webSites.save(new WebSiteEntity({
                displayName: params.displayName,
                description: params.description,
                host: params.host,
                name: params.name
            }));
            if (created) {
                return new WebSite(
                    created.webSiteId ?? "",
                    created.name,
                    created.displayName,
                    created.host,
                    created.description
                );
            }
        }
        catch (ex: any) {
            console.error("error traced in websites repository", ex.message);
            throw new Error(ex.message);
        }

        throw new Error("Unhandled error occured. cannot crate website in repository.");
    }

    /**
     * update web site async
     * @param webSite to update web site
     */
    public async updateAsync(webSite: IUpdateWebSiteParams): Promise<WebSite> {
        try {
            const updated = await this.webSites.save(new WebSiteEntity({
                webSiteId: webSite.webSiteId,
                host: webSite.host,
                displayName: webSite.displayName,
                name: webSite.name,
                description: webSite.description
            }));

            if (updated) {
                return new WebSite(
                    updated.webSiteId ?? "",
                    updated.name,
                    updated.displayName,
                    updated.host,
                    updated.description
                );
            }
        }
        catch (ex: any) {
            console.error("error traced in websites repository", ex.message);
        }

        throw new Error(`web site is not exists.`);
    }

    /**
     * delete web site async from id
     * @param identifier web site id
     */
    public async deleteAsync(identifier: string): Promise<void> {
        try {
            const exists = await this.webSites.findOne({ webSiteId: identifier });
            if (!exists) {
                throw new Error(identifier + " is not exists.");
            }
            await this.webSites.delete({ webSiteId: identifier });
            return;
        }
        catch (ex: any) {
            console.error("error traced in websites repository", ex.message);
        }
        throw new Error();
    }
}