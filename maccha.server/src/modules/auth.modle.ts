import { Module, Global } from "@nestjs/common";
import { AuthService } from "@/Models/Authentications/auth.service";
import { AuthenticationsController } from "@/Applications/Authentications/AuthenticationsController";
import { UsersModule } from "./users.module";
import { WebSitesModule } from "./web-sites.module";

@Global()
@Module({
    imports: [
        WebSitesModule,
        UsersModule
    ],
    controllers: [AuthenticationsController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule { }
