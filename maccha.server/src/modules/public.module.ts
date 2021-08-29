import { Module } from "@nestjs/common";
import { ContentsModule } from "./ContentsModule";
import {PublicContentsAppService} from "@/Applications/Public/Services/PublicContentsAppService";
import {PublicContentsController} from "@/Applications/Public/Controllers/PublicContentsController";

@Module({
    imports: [
        ContentsModule
    ],
    controllers: [PublicContentsController],
    providers: [
        PublicContentsAppService,
    ],
    exports: [
    ]
})
export class PublicModule { }
