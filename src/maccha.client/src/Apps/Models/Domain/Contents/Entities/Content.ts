import { DateTime } from "luxon";
import { StatusType } from "../Enumes/StatusType";
import { Category } from "./Category";
import { Field } from "./Field";

/**
 * express content.
 */
export class Content {
    readonly contentId: string = "";
    readonly taxonomyId!: string;
    readonly title: string = "";
    readonly description: string = "";
    readonly thumbnail: string = "";
    readonly metadata: string = "";
    readonly status: StatusType = StatusType.Public;
    readonly updatedAt: string = "";
    readonly createdAt: string = "";
    readonly publishIn: string | null = null;
    readonly createdBy = { name: "", thumbnail: "" };
    readonly identifier: string = "";
    readonly fields: Field[] = [];
    readonly categories: Category[] = [];

    get categoryIds() {
        return this.categories.map(c => c.id);
    }

    /**
     * constructor
     * @param value initial value
     */
    constructor(
        params?: Partial<Content>
    ) {
        Object.assign(this, params);
    }

    /**image.png
     * clone with new params.
     * @param params new params.
     */
    public clone(params?: Partial<Content>): Content {
        return new Content({
            categories: params?.categories ?? this.categories,
            contentId: params?.contentId ?? this.contentId,
            createdAt: params?.createdAt ?? this.createdAt,
            createdBy: params?.createdBy ?? this.createdBy,
            description: params?.description ?? this.description,
            fields: params?.fields ?? this.fields,
            metadata: params?.metadata ?? this.metadata,
            identifier: params?.identifier ?? this.identifier,
            publishIn: params?.publishIn ?? this.publishIn,
            taxonomyId: params?.taxonomyId ?? this.taxonomyId,
            status: params?.status ?? this.status,
            thumbnail: params?.thumbnail ?? this.thumbnail,
            title: params?.title ?? this.title,
            updatedAt: params?.updatedAt ?? this.updatedAt,
        });
    }
}
