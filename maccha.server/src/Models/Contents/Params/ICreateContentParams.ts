import { DateTime } from "luxon";
import { StatusType } from "../Enumes/StatusType";
import { ICreateFieldParams } from "./ICreateFieldParams";

export interface ICreateContentParams {
    readonly status: StatusType;
    readonly taxonomyId: string;
    readonly title: string;
    readonly fields: ICreateFieldParams[];
    readonly thumbnail: string;
    readonly publishIn: DateTime;
    readonly description: string;
    readonly userId: string;
    readonly metadata: string;
}