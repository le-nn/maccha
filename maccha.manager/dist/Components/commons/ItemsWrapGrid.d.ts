/// <reference types="react" />
interface ItemsWrapGridProps<T extends {
    id: string;
}> {
    itemSlot: (item: T) => JSX.Element;
    items: T[];
    segmentLength?: number;
    space?: number;
}
/**
 * Wrap items grid.
 */
export declare function ItemsWrapGrid<T extends {
    id: string;
}>(props: ItemsWrapGridProps<T>): JSX.Element;
export {};
