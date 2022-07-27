export interface CategoryMeta {
    id: number;
    slug: string;
    name: string;
    order: number;
    parentId: number | null;
}