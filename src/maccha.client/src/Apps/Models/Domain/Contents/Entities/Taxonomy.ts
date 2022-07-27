import { CategoryTree } from "./CategoryTree";
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
    readonly categoryTree = new CategoryTree();

    constructor(value?: Partial<Taxonomy>) {
        Object.assign(this, value);
    }

    clone(params?: Partial<Taxonomy>): Taxonomy {
        return new Taxonomy({ ...this, ...params });
    }
}