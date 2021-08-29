import { Scheme } from "./Scheme";
/**
 * Express taxonomy entity.
 */
export declare class Taxonomy {
    readonly taxonomyId: string;
    readonly name: string;
    readonly description: string;
    readonly displayName: string;
    readonly identifier: string;
    readonly schemes: Scheme[];
    constructor(value?: Partial<Taxonomy>);
    clone(params?: Partial<Taxonomy>): Taxonomy;
}
