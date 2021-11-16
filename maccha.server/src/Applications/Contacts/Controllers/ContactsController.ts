import { Controller, Body, Post, Param, Get, UseGuards, SetMetadata, Delete, Put, Query, NotFoundException, Headers } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation, ApiCreatedResponse, ApiHeader, ApiParam, ApiResponse, ApiNoContentResponse } from "@nestjs/swagger";
import { AuthGuard } from "../../Commons/auth-guard";
import { Claim } from "../../Commons/user.decorator";
import { LoginUser } from "@/Models/Authentications/login-user";
import { i18n } from "../../Commons/i18n";
import { RoleType } from "@/Models/Users/role.enum";
import { ContactAppService } from "../Services/ContactsAppService";

/**
 * provide contacts endpoints.
 */
@ApiTags("Contacts")
@Controller({ path: "api/contacts" })
export class ContactsController {
    constructor(readonly contactAppService: ContactAppService) { }

    @Get("content/:contactId")
    @SetMetadata("role", RoleType.Subscribe)
    @UseGuards(AuthGuard)
    public async find(
        @Param("contactId") contactId: string
    ): Promise<any> {
        const settings = await this.contactAppService.fetchAsync(contactId);
        return settings;
    }

    @Get(":contactSettingId")
    @SetMetadata("role", RoleType.Subscribe)
    @UseGuards(AuthGuard)
    public async search(
        @Param("contactSettingId") contactSettingId: string
    ): Promise<any> {
        const settings = await this.contactAppService.searchAsync(contactSettingId);
        return settings;
    }

    @Post(":contactSettingId")
    public async post(
        @Param("contactSettingId") contactSettingId: string,
        @Body() body: any
    ): Promise<any> {
        const fields = Object.keys(body).map(k => ({
            name: k,
            value: body[k]
        }));
        const settings = await this.contactAppService.postAsync(contactSettingId, fields);
    }
}
