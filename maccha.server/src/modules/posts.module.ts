import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostTypeEntity } from "@/Infrastructure/Database/Entities/PostTypeEntity";
import { PostTypesRepository } from "@/Infrastructure/Repositories/PostTypesRepository";
import { PostTypesService } from "@/Models/Posts/Services/PostTypesService";
import { PostTypesController } from "@/Applications/Posts/PostTypesController";
import { SchemeEntity, TaxonomyEntity } from "@/Infrastructure/Database/Entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostTypeEntity,
            TaxonomyEntity,
            SchemeEntity
        ])
    ],
    controllers: [PostTypesController],
    providers: [
        PostTypesService,
        {
            provide: PostTypesRepository,
            useClass: PostTypesRepository
        },
    ],
    exports: [
        PostTypesService
    ]
})
export class PostsModule { }
