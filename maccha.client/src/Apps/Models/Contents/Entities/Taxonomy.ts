import { Scheme } from "./Scheme";

/**
 * Express taxonomy entity.
 */
export class Taxonomy {
    readonly taxonomyId: string = "";
    readonly name: string = "";
    readonly description: string = "";
    readonly displayName: string = "";
    readonly identifier: string = "";
    readonly schemes: Scheme[] = [];

    constructor(value?: Partial<Taxonomy>) {
        Object.assign(this, value);
    }

    clone(params?: Partial<Taxonomy>): Taxonomy {
        return new Taxonomy({ ...this, ...params });
    }
}