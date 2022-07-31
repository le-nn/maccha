
import { UsersService } from "./UsersService";
import { WebSiteManagementsService } from "./WebSiteManagementsService";
import { MediaService } from "./MediaService";
import { PostsEditServic } from "./PostEditService";
import { PluginsService } from "./PluginsService";

// @singleton()
export class ServiceContext {
    constructor(
        readonly usersService: UsersService,
        readonly webSiteManagementsService: WebSiteManagementsService,
        readonly postEditService: PostsEditServic,
        readonly mediaService: MediaService,
        readonly pluginsService: PluginsService
    ) { }
}

// container
//     .registerType(AuthService, AuthService)
//     .registerType(UsersService, UsersService)
//     .registerType(WebSiteManagementsService, WebSiteManagementsService)
//     .registerType(PostsService, PostsService)
//     .registerType(MediaService, MediaService)
//     .registerType(PostsEditServic, PostsEditServic)
//     .registerType(PostManagementsService, PostManagementsService);

export const services = new ServiceContext(
    new UsersService(),
    new WebSiteManagementsService(),
    new PostsEditServic(),
    new MediaService(),
    new PluginsService()
);