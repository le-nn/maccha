import { DateTime } from "luxon";
import { StatusType } from "../Enumes/StatusType";

export interface ICreateContentParams {
    status: StatusType;
    taxonomyId: string;
    title: string;
    content: string;
    thumbnail: string;
    publishIn: DateTime;
    description: string;
    userId: string;
    metadata: string;
    categoryIds: number[];
}