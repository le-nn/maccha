import { Module } from "@nestjs/common";
import { UsersService } from "../Models/Users/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "@/Applications/Users/users.controller";
import { UserEntity } from "@/Infrastructure/Database/Entities/user.entify";
import { UsersRepository } from "@/Infrastructure/Repositories/users.repository";
import { UserWebSiteEntity } from "@/Infrastructure/Database/Entities/user-web-site.entity";
import { WebSiteEntity } from "@/Infrastructure/Database/Entities/web-site.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserWebSiteEntity, WebSiteEntity])
    ],
    controllers: [UsersController],
    providers: [UsersService, { provide: UsersRepository, useClass: UsersRepository }],
    exports: [UsersService]
})
export class UsersModule { }
