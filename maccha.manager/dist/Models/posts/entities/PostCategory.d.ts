import { IPostCategory } from "./IPostCategory";
/**
 * Post category entity.
 */
export declare class PostCategory implements IPostCategory {
    readonly postCategoryId: string;
    readonly name: string;
    readonly parent: string;
    readonly description: string;
    /**
     * constructor.
     * @param value initial value
     */
    constructor(value: IPostCategory);
}
