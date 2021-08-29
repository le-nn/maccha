import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WebSiteEntity } from "@/Infrastructure/Database/Entities/web-site.entity";
import { WebSitesRepository } from "@/Infrastructure/Repositories/web-sites.repository";
import { WebSitesController } from "@/Applications/WebSites/Controllers/WebSitesController";
import { WebSitesService } from "@/Models/WebSites/web-sites.service";
import { UsersModule } from "./users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([WebSiteEntity]),
        UsersModule
    ],
    controllers: [WebSitesController],
    providers: [WebSitesService, { provide: WebSitesRepository, useClass: WebSitesRepository }],
    exports:[WebSitesService]
})
export class WebSitesModule { }
