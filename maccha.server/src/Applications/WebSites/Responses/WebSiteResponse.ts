import { ApiProperty } from "@nestjs/swagger";


export class WebSiteResponse {
    @ApiProperty({ description: "WEBサイトID" })
    public readonly webSiteId!: string;

    @ApiProperty({ description: "WEBサイト名" })
    public readonly name!: string;

    @ApiProperty({ description: "WEBサイト識別名" })
    public readonly displayName!: string;

    @ApiProperty({ description: "ホストURL" })
    public readonly host!: string;

    @ApiProperty({ description: "WEBサイトの説明" })
    public readonly description!: string;

    constructor(params: WebSiteResponse) {
        Object.assign(this, params);
    }
}
