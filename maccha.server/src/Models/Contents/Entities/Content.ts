import { DateTime } from "luxon";
import { StatusType } from "../Enumes/StatusType";
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
    readonly updatedAt: DateTime = DateTime.local();
    readonly createdAt: DateTime = DateTime.local();
    readonly publishIn: DateTime | null = null;
    readonly createdBy = { name: "", thumbnail: "" };
    readonly identifier: string = "";
    readonly fields: Field[] = [];

    /**
     * constructor
     * @param value initial value
     */
    constructor(
        params?: Partial<Content>
    ) {
        Object.assign(this, params);
    }

    /**
     * clone with new params.
     * @param params new params.
     */
    public with(params: Partial<Content>): Content {
        const c = new Content(this);
        Object.assign(c, params);
        return c;
    }
}
