import { Injectable, Inject } from "@nestjs/common";
import { IWebSitesRepository } from "./web-site-repository.interface";
import { WebSite } from "./web-site";
import { ICreateWebSiteParams } from "./create-werb-site.params";
import { IUpdateWebSiteParams } from "./update-web-site.params";
import { LoginUser } from "../Authentications/login-user";
import { UsersService } from "../Users/users.service";
import { RoleType } from "../Users/role.enum";

/**
 * provide web sites info service.
 */
@Injectable()
export class WebSitesService {
    constructor(
        @Inject("WebSitesRepository") private readonly webSitesRepository: IWebSitesRepository,
        @Inject(UsersService) private readonly usersRepository: UsersService
    ) { }

    /**
     * get a web site by identifierasync.
     * if user role is admin, get all web sites. else, get web sites that you join.
     */
    public async getAllAsync(loginInfo?: LoginUser): Promise<WebSite[]> {
        if (!loginInfo) {
            return await this.webSitesRepository.getAllAsync();
        }

        if (loginInfo.role === RoleType.Admin) {
            return await this.webSitesRepository.getAllAsync();
        }

        const user = await this.usersRepository.findByEmailAsync(loginInfo.email);

        const sites = [];
        if (user) {
            for (const i of user.identifiers) {
                sites.push(this.webSitesRepository.getAsync(i));
            }
        }

        return await Promise.all(sites);
    }

    /**
     * get a web site by identifierasync.
     * @param identifierto get identifier
     */
    public async getAsync(identifier: string): Promise<WebSite | undefined> {
        try {
            return await this.webSitesRepository.getAsync(identifier);
        }
        catch {
            return undefined;
        }
    }

    /**
     * create  new web site async.
     * @param params to create params
     */
    public async createAsync(params: ICreateWebSiteParams): Promise<WebSite> {
        return await this.webSitesRepository.createAsync(params);
    }

    /**
     * create  new web site async.
     * @param params to create params
     */
    public async updateAsync(params: IUpdateWebSiteParams): Promise<WebSite> {
        return await this.webSitesRepository.updateAsync(params);
    }

    /**
     * delete web site async from id.
     * @param identifierweb site id
     */
    public async deleteAsync(identifier: string): Promise<void> {
        await this.webSitesRepository.deleteAsync(identifier);
    }
}