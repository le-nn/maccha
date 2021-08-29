import { ApiProperty } from "@nestjs/swagger";
import { IsString, Contains, MinLength, Matches } from "class-validator";

/**
 * params for login
 */
export class LoginParams {
    @ApiProperty({ description: "メールアドレス" })
    @IsString()
    @MinLength(1)
    @Matches(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/, { message: "invalid email adress" })
    email!: string;

    @ApiProperty({ description: "パスワード" })
    @IsString()
    password!: string;
}