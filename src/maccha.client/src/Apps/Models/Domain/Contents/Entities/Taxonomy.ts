import { Category } from "./Category";
import { CategoryTree } from "./CategoryTree";
import { Scheme } from "./Scheme";

export interface ITaxonomy {
    taxonomyId: string;
    name: string;
    description: string;
    displayName: string;
    identifier: string;
    schemes: Scheme[];
    categoryTree: Category[];
}

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

    constructor(value?: ITaxonomy & any) {
        Object.assign(this, value);
    }

    clone(params?: Partial<ITaxonomy>): Taxonomy {
        return new Taxonomy({ ...this, ...params });
    }
}