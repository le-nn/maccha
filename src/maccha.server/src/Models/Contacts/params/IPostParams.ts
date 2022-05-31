import { DateTime } from "luxon";

export interface IPostContactFieldParams {
    name: string;
    value: string;
}

export interface IPostContactParams {
    title: string;
    contactedAt: DateTime;
    fields: IPostContactFieldParams[];
}