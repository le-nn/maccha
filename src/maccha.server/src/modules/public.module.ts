import { Module } from "@nestjs/common";
import { ContentsModule } from "./ContentsModule";
import {PublicContentsAppService} from "@/Applications/Public/Services/PublicContentsAppService";
import {PublicContentsController} from "@/Applications/Public/Controllers/PublicContentsController";
import { WebSitesModule } from "./web-sites.module";

@Module({
    imports: [
        ContentsModule,
        WebSitesModule
    ],
    controllers: [PublicContentsController],
    providers: [
        PublicContentsAppService,
    ],
    exports: [
    ]
})
export class PublicModule { }
