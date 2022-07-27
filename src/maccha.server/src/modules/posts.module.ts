import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostTypeEntity } from "@/Infrastructure/Database/Entities/PostTypeEntity";
import { PostTypesRepository } from "@/Infrastructure/Repositories/PostTypesRepository";
import { PostTypesService } from "@/Models/Posts/Services/PostTypesService";
import { PostTypesController } from "@/Applications/Posts/PostTypesController";
import { SchemeEntity, TaxonomyEntity } from "@/Infrastructure/Database/Entities";
import { CategorySchemeEntity } from "@/Infrastructure/Database/Entities/CategorySchemeEntity";
import { ContentCategoryEntity } from "@/Infrastructure/Database/Entities/ContentCategoryEntity";
import { CategorySchemeRepository } from "@/Infrastructure/Repositories/CategorySchemeRepository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostTypeEntity,
            TaxonomyEntity,
            SchemeEntity,
            ContentCategoryEntity,
            CategorySchemeEntity,
        ])
    ],
    controllers: [PostTypesController],
    providers: [
        PostTypesService,
        {
            provide: "PostTypesRepository",
            useClass: PostTypesRepository
        },
        {
            provide: "CategorySchemeRepository",
            useClass: CategorySchemeRepository
        }
    ],
    exports: [
        PostTypesService
    ]
})
export class PostsModule { }
