import { DateTime } from "luxon";
import { StatusType } from "../Enumes/StatusType";
export interface ICreateContentParams {
    readonly status: StatusType;
    readonly taxonomyId: string;
    readonly title: string;
    readonly content: string;
    readonly thumbnail: string;
    readonly publishIn: DateTime;
    readonly description: string;
    readonly userId: string;
    readonly metadata: string;
}
