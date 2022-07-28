import { Controller, Body, Post, Param, Get, UseGuards, SetMetadata, Delete, Put, Query, NotFoundException, Headers } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation, ApiCreatedResponse, ApiHeader, ApiParam, ApiResponse, ApiNoContentResponse } from "@nestjs/swagger";
import { AuthGuard } from "../../Commons/auth-guard";
import { Claim } from "../../Commons/user.decorator";
import { LoginUser } from "@/Models/Authentications/login-user";
import { i18n } from "../../Commons/i18n";
import { RoleType } from "@/Models/Users/role.enum";
import { CreateContactSettingParams } from "../Params/CreateContactSettingParams";
import { ContactSettingsAppService } from "../Services/ContactSettingsService";
import { ISaveContactSettingParams } from "@/Models/Contacts/params/ISaveContactSettingParams";

/**
 * provide users endpoints.
 */
@ApiTags("ContactSettingss")
@Controller({ path: "api/contact-settings" })
export class ContactSettingsController {
    constructor(readonly contactSettingsAppService: ContactSettingsAppService) { }

    @Get(":contactSettingId")
    @SetMetadata("role", RoleType.Subscribe)
    @UseGuards(AuthGuard)
    async get(
        @Claim() loginUser: LoginUser,
        @Param("contactSettingId") contactSettingId: string
    ) {
        const setting = await this.contactSettingsAppService.fetchAsync(contactSettingId);
        return setting;
    }

    @Get()
    @SetMetadata("role", RoleType.Subscribe)
    @UseGuards(AuthGuard)
    async getAll(@Claim() loginUser: LoginUser) {
        const settings = await this.contactSettingsAppService.getAllAsync(loginUser.identifier);
        return settings;
    }

    @Post()
    @SetMetadata("role", RoleType.Edit)
    @UseGuards(AuthGuard)
    async createAsync(@Body() params: CreateContactSettingParams) {
        const settings = await this.contactSettingsAppService.createAsync(params);
        return settings;
    }

    @Put()
    @SetMetadata("role", RoleType.Edit)
    @UseGuards(AuthGuard)
    async saveAsync(@Body() params: ISaveContactSettingParams) {
        const settings = await this.contactSettingsAppService.saveAsync(params);
        return settings;
    }

    @Delete(":contactSettingId")
    @SetMetadata("role", RoleType.Edit)
    @UseGuards(AuthGuard)
    async deleteAsync(@Param("contactSettingId") contactSettingId: string) {
        const settings = await this.contactSettingsAppService.removeAsync(contactSettingId);
        return settings;
    }
}
