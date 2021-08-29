import { FailedResponse } from "./failed-response";
import { SearchResultResponse } from "./search-result-response";

export type Response<T> = FailedResponse | SearchResultResponse<T> | T;
