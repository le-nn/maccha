export interface ICreateCategoryParams {
    id: number;
    slug: string;
    name: string;
    order: number;
    parentId: number | null;
}