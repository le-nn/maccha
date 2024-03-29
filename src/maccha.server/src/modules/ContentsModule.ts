import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FieldEntity, SchemeEntity, TaxonomyEntity } from "@/Infrastructure/Database/Entities";
import { TaxonomiesRepository } from "@/Infrastructure/Repositories/TaxonomiesRepository";
import { ContentsService, TaxonomiesService } from "@/Models/Contents/Services";
import { ContentsRepository } from "@/Infrastructure/Repositories/ContentsRepository";
import { ContentEntity } from "@/Infrastructure/Database/Entities/ContentEntity";
import { ContentsAppService } from "@/Applications/Contents/Services/ContentsAppService";
import { TaxonomiesAppService } from "@/Applications/Contents/Services/TaxonomiesAppService";
import { ContentsController } from "@/Applications/Contents/Controllers/ContentsController";
import { TaxonomiesController } from "@/Applications/Contents/Controllers/TaxonomiesController";
import { ContentCategoryEntity } from "@/Infrastructure/Database/Entities/ContentCategoryEntity";
import { CategorySchemeEntity } from "@/Infrastructure/Database/Entities/CategorySchemeEntity";
import { CategorySchemeRepository } from "@/Infrastructure/Repositories/CategorySchemeRepository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SchemeEntity,
            ContentEntity,
            TaxonomyEntity,
            FieldEntity,
            ContentCategoryEntity,
            CategorySchemeEntity,
        ]),
        ContentsModule
    ],
    controllers: [
        ContentsController,
        TaxonomiesController
    ],
    providers: [
        // Aopp Services
        ContentsAppService,
        TaxonomiesAppService,
        // Domain Services
        ContentsService,
        TaxonomiesService,
        // Repositories
        {
            provide: "ContentsRepository",
            useClass: ContentsRepository
        },
        {
            provide: "TaxonomiesRepository",
            useClass: TaxonomiesRepository
        },
        {
            provide: "CategorySchemeRepository",
            useClass: CategorySchemeRepository
        }
    ],
    exports: [
        TaxonomiesService,
        ContentsService
    ]
})
export class ContentsModule { }
