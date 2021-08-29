import { Controller, Body, Post, Param, Get, UseGuards, SetMetadata, Delete, Put, Query, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../Commons/auth-guard";
import { MediaService } from "@/Models/Media/Services/MediaService";
import { Claim } from "../Commons/user.decorator";
import { LoginUser } from "@/Models/Authentications/login-user";

/**
 * provide users endpoints.
 */
@ApiTags("Medias")
@Controller({ path: "api/media" })
@UseGuards(AuthGuard)
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    /**
     * get one web-sites
     * @param identifieridentifier
     */
    @ApiOperation({ summary: "一覧を取得します.", description: "auth: Post" })
    @UseGuards(AuthGuard)
    @Get()
    public async getAllPaths(
        @Claim() loginUser: LoginUser
    ): Promise<string[]> {
        return this.mediaService.getAllPathsAsync(loginUser.identifier);
    }

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    public async postFileAsync(
        @Claim() loginUser: LoginUser,
        @UploadedFile() file: any
    ): Promise<string> {
        return this.mediaService.postAsync(loginUser.identifier, file);
    }

    @Delete()
    public async deleteFileAsync(
        @Claim() loginUser: LoginUser,
        @Query("file") file: any
    ): Promise<void> {
        return this.mediaService.deleteAsync(loginUser.identifier, file);
    }
}
