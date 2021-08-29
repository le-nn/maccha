import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaController } from "@/Applications/Media/MediaController";
import { MediaRepository } from "@/Infrastructure/Repositories/MediaRepository";
import { MediaService } from "@/Models/Media/Services/MediaService";

@Module({
    imports: [
        TypeOrmModule.forFeature([])
    ],
    controllers: [MediaController],
    providers: [
        MediaService,
        {
            provide: MediaRepository,
            useClass: MediaRepository
        },
    ],
    exports: [
        MediaService
    ]
})
export class MediaModule { }
