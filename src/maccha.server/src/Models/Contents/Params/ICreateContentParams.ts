import { DateTime } from "luxon";
import { StatusType } from "../Enumes/StatusType";
import { ICreateFieldParams } from "./ICreateFieldParams";

export interface ICreateContentParams {
    status: StatusType;
    taxonomyId: string;
    title: string;
    fields: ICreateFieldParams[];
    thumbnail: string;
    publishIn: DateTime;
    description: string;
    userId: string;
    metadata: string;
    categoryIds: number[];
}