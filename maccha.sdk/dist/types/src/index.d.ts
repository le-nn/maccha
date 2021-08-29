import { AxiosInstance } from "axios";
import { Content } from "./Models/Entities/Content";
interface MacchaOption {
    readonly url: string;
    readonly identifier: string;
}
interface SearchOption {
    offset?: number;
    fetch?: number;
}
export declare class Maccha {
    readonly option: MacchaOption;
    readonly axios: AxiosInstance;
    constructor(option: MacchaOption);
    fetch(taxonomy: string, contentId: string): Promise<Content | null>;
    search(taxonomy: string, option: SearchOption): Promise<SearchResponse<Content>>;
    private toDomain;
}
export {};
