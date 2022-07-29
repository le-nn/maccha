import { RestaurantMenuRounded } from "@mui/icons-material";
import { Category } from "./Category";
import { CategoryNode } from "./CategoryNode";

export class CategoryTree {
    private _categories: Category[] = [];
    private _observers: (() => void)[] = [];

    get all(): Category[] {
        return this._categories;
    }

    get tree(): CategoryNode[] {
        return this.calcTree().tree;
    }

    constructor(items?: Category[]) {
        items?.forEach(x => {
            this.add(x);
        });
    }

    generateNextId() {
        const max = Math.max(...[
            0,
            ...this._categories.map(x => x.id)
        ]);
        const map = new Set(this._categories.map(x => x.id));
        const getId = () => {
            for (let i = 0; i <= max; i++) {
                if (!map.has(i)) {
                    return i;
                }
            }
        };

        return getId() ?? max + 1;
    }

    subscribe(observer: () => void) {
        this._observers.push(observer);

        // notify state changed
        return {
            dispose: () => this._observers = this._observers.filter(x => x !== observer)
        };
    }

    calcTree() {
        const categoriesMap = new Map<number, CategoryNode>();
        for (const c of this._categories) {
            if (categoriesMap.has(c.id)) {
                throw new Error("Category " + c.id + " has already exists.");
            }

            const entity = {
                ...c,
                children: [],
            };

            categoriesMap.set(c.id, entity);
        }

        for (const c of this._categories) {
            if (c.parentId !== null) {
                const target = categoriesMap.get(c.id);
                const parent = categoriesMap.get(c.parentId);
                if (parent && target) {
                    parent.children.push(target);
                }
            }
        }

        return {
            tree: Array.from(categoriesMap.values()).filter(x => x.parentId === null),
            map: categoriesMap,
        };
    }

    add(category: Category) {
        this._categories.push(category);
        this._categories.sort((a, b) => a.id - b.id);
        for (const o of this._observers) {
            o();
        }
    }

    mutate(id: number, mutaion: (category: Category) => Category) {
        const c = this._categories.find(x => x.id === id);
        if (c) {
            const newc = mutaion(c);
            this._categories = [
                ... this._categories.filter(x => x.id !== id),
                newc
            ];

            for (const o of this._observers) {
                o();
            }
        }
    }

    get(id: number) {
        return this._categories.find(x => x.id === id) ?? null;
    }

    remove(id: number) {
        this._categories = this._categories.filter(x => x.id !== id);

        // notify state changed
        for (const o of this._observers) {
            o();
        }
    }

    getAllChildren(targetId: number): number[] {
        const map = this.calcTree().map;
        const parent = map.get(targetId);

        const ids = [];
        if (parent) {
            let items = parent.children;
            while (items.length) {
                const aggregate = [];
                for (const item of items) {
                    ids.push(item.id);

                    // for next loop
                    for (const child of item.children) {
                        aggregate.push(child);
                    }
                }

                items = aggregate;
            }
        }
        return ids;
    }

    getAllParents(targetId: number): number[] {
        const map = this.calcTree().map;
        const parent = map.get(targetId);
        const ids = [];
        if (parent) {
            let p = map.get(parent.parentId ?? -1);
            while (p) {
                ids.push(p.id);
                p = map.get(p.parentId ?? -1);
            }
        }
        return ids;
    }
}