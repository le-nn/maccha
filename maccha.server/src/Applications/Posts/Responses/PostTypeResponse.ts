import { i18n } from "@/Applications/Commons/i18n";
import { TaxonomyReponse } from "@/Applications/Contents/Responses/TaxonomyResponse";
import { Taxonomy } from "@/Models/Contents/Entities/Taxonomy";
import { IPostType } from "@/Models/Posts/Entities/IPostType";
import { ApiProperty, ApiResponse } from "@nestjs/swagger";

export class PostTypeResponse implements IPostType {
    @ApiProperty({
        type: () => TaxonomyReponse, description: i18n({
            en: "Taxonomy",
            ja: "タクソノミー"
        })
    })
    readonly taxonomy: Taxonomy = new Taxonomy();

    @ApiProperty({
        description: i18n({
            en: "Post type id.",
            ja: "投稿タイプID"
        })
    })
    readonly postTypeId: string = "";

    @ApiProperty({
        description: i18n({
            en: "Web site identifier.",
            ja: "WEBサイト識別子"
        })
    })
    readonly identifier: string = "";

    @ApiProperty({
        description: i18n({
            en: "Display format.",
            ja: "表示形式."
        })
    })
   readonly displayFormat = "table";

    constructor(value: IPostType) {
        Object.assign(this, value);
    }

}