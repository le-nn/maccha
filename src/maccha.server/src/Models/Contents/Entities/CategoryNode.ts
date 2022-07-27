export interface CategoryNode {
    id: number;
    slug: string;
    name: string;
    order: number;
    parentId: number | null;
    children: CategoryNode[];
}