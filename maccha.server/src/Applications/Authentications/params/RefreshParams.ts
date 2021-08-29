import { ApiProperty } from "@nestjs/swagger";
import { IsString, Contains, MinLength, Matches } from "class-validator";

/**
 * params for refresh token.
 */
export class RefreshParams {
    @ApiProperty({ description: "リフレッシュトークン" })
    @IsString()
    @MinLength(1)
    refreshToken!: string;

    @ApiProperty({ description: "新しいサイト識別子" })
    @IsString()
    @MinLength(1)
    identifier!: string;
}