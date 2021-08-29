import { AuthService } from "./AuthService";
import { UsersService } from "./UsersService";
import { WebSiteManagementsService } from "./WebSiteManagementsService";
import { PostsService } from "./PostsService";
import { PostManagementsService } from "./PostManagementsService";
import { MediaService } from "./MediaService";
import { PostsEditServic } from "./PostEditService";
import { PluginsService } from "./PluginsService";
export declare class ServiceContext {
    readonly authService: AuthService;
    readonly usersService: UsersService;
    readonly webSiteManagementsService: WebSiteManagementsService;
    readonly postsService: PostsService;
    readonly postEditService: PostsEditServic;
    readonly postManagementsService: PostManagementsService;
    readonly mediaService: MediaService;
    readonly pluginsService: PluginsService;
    constructor(authService: AuthService, usersService: UsersService, webSiteManagementsService: WebSiteManagementsService, postsService: PostsService, postEditService: PostsEditServic, postManagementsService: PostManagementsService, mediaService: MediaService, pluginsService: PluginsService);
}
export declare const services: ServiceContext;
