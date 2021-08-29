import { StatusType } from "@/Models/Contents/Enumes/StatusType";
import { DateTime } from "luxon";

/**
 * Public content response.
 */
export class PublicContentResponse {
    readonly contentId: string = "";
    readonly title: string = "";
    readonly description: string = "";
    readonly thumbnail: string = "";
    readonly metadata: string = "";
    readonly status: StatusType = StatusType.Public;
    readonly publishIn: string = "";
    readonly createdBy = { name: "", thumbnail: "" };
    readonly identifier: string = "";
    readonly fields: { [key: string]: string } = {};

    /**
     * constructor
     * @param value initial value
     */
    constructor(
        params?: Partial<PublicContentResponse>
    ) {
        Object.assign(this, params);
    }

    /**
     * clone with new params.
     * @param params new params.
     */
    public clone(params: Partial<PublicContentResponse>): PublicContentResponse {
        const c = new PublicContentResponse(this);
        Object.assign(c, params);
        return c;
    }
}