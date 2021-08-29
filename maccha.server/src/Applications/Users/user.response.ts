import { ApiProperty } from "@nestjs/swagger";
import { RoleType } from "@/Models/Users/role.enum";
import { WebSiteResponse } from "../WebSites/Responses/WebSiteResponse";

export class UserResponse {
    @ApiProperty({ description: "ユーザー識別ID" })
    userId!: string;

    @ApiProperty({ description: "ユーザー名" })
    name!: string;

    @ApiProperty({ description: "メールアドレス" })
    email!: string;

    @ApiProperty({ description: "権限" })
    role!: RoleType;

    @ApiProperty({
        description: "サイト一覧",
        type: () => [WebSiteResponse]
    })
    public readonly identifiers!: string[];

    @ApiProperty({ description: "有効かどうか" })
    public readonly isActive!: boolean;

    @ApiProperty({ description: "アバター画像のURL" })
    public readonly avatar!: string;

    /**
     * constructor
     * @param params initial value
     */
    constructor(params: UserResponse) {
        Object.assign(this, params);
    }
}
