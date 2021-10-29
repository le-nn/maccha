import { DateTime } from "luxon";

export interface ISaveContentParams {
    contentId: string;
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    metadata: string;
    updatedAt: DateTime;
    createdBy: string;
}