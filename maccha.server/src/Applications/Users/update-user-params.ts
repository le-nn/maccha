import { IUpdateUserParams } from "@/Models/Users/update-user-params";
import { RoleType } from "@/Models/Users/role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsArray, Matches } from "class-validator";

export class UpdateUserParams implements IUpdateUserParams {
    @ApiProperty({ description: "サイト一覧" })
    @IsArray()
    identifiers!: string[];

    @ApiProperty({ description: "ユーザーID" })
    @IsString()
    userId!: string;

    @ApiProperty({ description: "名前" })
    @IsString()
    name!: string;

    @ApiProperty({ description: "メールアドレス" })
    @IsString()
    @Matches(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/, { message: "invalid email adress" })
    email!: string;

    @ApiProperty({ description: "権限" })
    @IsNumber()
    role!: RoleType;

    @ApiProperty({ description: "アカウントが有効かどうか" })
    @IsBoolean()
    isActive!: boolean;
}