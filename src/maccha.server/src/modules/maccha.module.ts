import { Module } from "@nestjs/common";
import { UsersModule } from "./users.module";
import { WebSitesModule } from "./web-sites.module";
import { PostsModule } from "./posts.module";
import { MediaModule } from "./media.module";
import { ContentsModule} from "./ContentsModule";
import { PublicModule } from "./public.module";
import { ContactsModule } from "./ContactsModule";

@Module({
    imports: [
        PostsModule,
        MediaModule,
        UsersModule,
        WebSitesModule,
        ContentsModule,
        PublicModule,
        ContactsModule,
    ]
})
export class MacchaModule {
}
