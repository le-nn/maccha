
import { AuthService } from "./AuthService";
import { UsersService } from "./UsersService";
import { WebSiteManagementsService } from "./WebSiteManagementsService";
import { PostsService } from "./PostsService";
import { PostManagementsService } from "./PostManagementsService";
import { MediaService } from "./MediaService";
import { PostsEditServic } from "./PostEditService";
import { PluginsService } from "./PluginsService";

// @singleton()
export class ServiceContext {
    constructor(
        readonly authService: AuthService,
        readonly usersService: UsersService,
        readonly webSiteManagementsService: WebSiteManagementsService,
        readonly postsService: PostsService,
        readonly postEditService: PostsEditServic,
        readonly postManagementsService: PostManagementsService,
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
    new AuthService(),
    new UsersService(),
    new WebSiteManagementsService(),
    new PostsService(),
    new PostsEditServic(),
    new PostManagementsService(),
    new MediaService(),
    new PluginsService()
);