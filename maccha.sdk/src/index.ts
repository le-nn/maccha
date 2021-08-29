import Axios, { AxiosInstance } from "axios";
import { Content } from "./Models/Entities/Content";
import { Field } from "./Models/Entities/Field";

interface MacchaOption {
    readonly url: string;
    readonly identifier: string;
}

interface SearchOption {
    offset?: number;
    fetch?: number;
}

const searchOption: SearchOption = {
    fetch: 30,
    offset: 0
};

export class Maccha {
    readonly axios: AxiosInstance;

    constructor(readonly option: MacchaOption) {
        console.log(option);
        this.axios = Axios.create({
            headers: {
                "X-Identifier": option.identifier
            },
            baseURL: option.url
        });
    }

    public async fetch(taxonomy: string, contentId: string): Promise<Content | null> {
        try {
            const data = await this.axios.get<Content>(`/contents/${taxonomy}/${contentId}`);
            return this.toDomain(data.data);
        }
        catch (ex) {
            console.error("Failed to fetch content.", `Taxonomy: ${taxonomy}, contentId: ${contentId}`);
        }

        return null;
    }

    public async search(taxonomy: string, option: SearchOption): Promise<SearchResponse<Content>> {
        try {
            const data = await this.axios.get<SearchResponse<Content>>(`/contents/${taxonomy}`, {
                params: option
            });

            return {
                collection: data.data.collection.map(c => this.toDomain(c)),
                hitCount: data.data.hitCount
            };
        }
        catch {
            console.error("Failed to search content.",`Taxonomy: ${taxonomy}`);
        }

        return {
            hitCount: 0,
            collection: []
        };
    }

    private toDomain(post: Content) {
        return new Content({
            contentId: post.contentId,
            status: post.status,
            thumbnail: post.thumbnail,
            title: post.title,
            createdBy: post.createdBy,
            description: post.description,
            identifier: post.identifier,
            publishIn: new Date(post.publishIn as any),
            metadata: post.metadata,
            fields: post.fields
        });
    }
}
