import { StatusType } from "../Enumes/StatusType";
import { Field } from "./Field";

/**
 * express content.
 */
export class Content {
    readonly contentId: string = "";
    readonly title: string = "";
    readonly description: string = "";
    readonly thumbnail: string = "";
    readonly metadata: string = "";
    readonly status: StatusType = StatusType.Public;
    readonly publishIn: Date = new Date();
    readonly createdBy = { name: "", thumbnail: "" };
    readonly identifier: string = "";
    readonly fields: { [key: string]: string } = {};

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
    public clone(params?: Partial<Content>): Content {
        const c = new Content(this);
        Object.assign(c, params);
        return c;
    }
}
