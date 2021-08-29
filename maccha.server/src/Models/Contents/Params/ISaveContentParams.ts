import { DateTime } from "luxon";
import { StatusType } from "../Enumes/StatusType";
import { ICreateFieldParams } from "./ICreateFieldParams";

export interface ISaveContentParams {
    contentId: string;
    title: string;
    description: string;
    status: StatusType;
    thumbnail: string;
    metadata: string;
    publishIn: DateTime;
    fields: ICreateFieldParams[];
}