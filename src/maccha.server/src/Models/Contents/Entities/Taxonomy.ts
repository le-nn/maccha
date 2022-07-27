import { DateTime } from "luxon";
import { CategoryMeta } from "./CategoryMeta";
import { Scheme } from "./Scheme";

interface ITaxonomy {
    taxonomyId: string;
    name: string;
    description: string;
    displayName: string;
    identifier: string;
    schemes: Scheme[];
    categorySchemes: CategoryMeta[];
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
    readonly categorySchemes: CategoryMeta[] = [];

    constructor(value?: ITaxonomy) {
        Object.assign(this, value);
    }
}