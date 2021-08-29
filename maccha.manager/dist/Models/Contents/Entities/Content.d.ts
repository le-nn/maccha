import { DateTime } from "luxon";
import { StatusType } from "../Enumes/StatusType";
import { Field } from "./Field";
/**
 * express content.
 */
export declare class Content {
    readonly contentId: string;
    readonly taxonomyId: string;
    readonly title: string;
    readonly description: string;
    readonly thumbnail: string;
    readonly metadata: string;
    readonly status: StatusType;
    readonly updatedAt: DateTime;
    readonly createdAt: DateTime;
    readonly publishIn: DateTime | null;
    readonly createdBy: {
        name: string;
        thumbnail: string;
    };
    readonly identifier: string;
    readonly fields: Field[];
    /**
     * constructor
     * @param value initial value
     */
    constructor(params?: Partial<Content>);
    /**
     * clone with new params.
     * @param params new params.
     */
    clone(params?: Partial<Content>): Content;
}
