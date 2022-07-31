import { DateTime } from "luxon";
import { StatusType } from "../Enumes/StatusType";
import { Category } from "./Category";
import { Field } from "./Field";

/**
 * express content.
 */
export interface ContentEditContext {
    contentId: string
    taxonomyId: string;
    title: string
    description: string
    thumbnail: string
    metadata: string
    status: StatusType
    updatedAt: string
    createdAt: string
    publishIn: string | null
    fields: Field[]
    categoryIds: number[]
}
