import { RestaurantMenuRounded } from "@mui/icons-material";
import { Category } from "./Category";
import { CategoryNode } from "./CategoryNode";

export class CategoryTree {
    private _categories: Category[] = [];
    private observers: (() => void)[] = [];

    get all(): Category[] {
        return this._categories;
    }

    get tree(): CategoryNode[] {
        return this.calcTree();
    }

    constructor(items?: Category[]) {
        items?.forEach(x => {
            this.add(x);
        });
    }

    getMaxId() {
        return Math.max(...[
            0,
            ...this.all.map(x => x.id)
        ]);
    }

    subscribe(observer: () => void) {
        this.observers.push(observer);
        //this.observers = [...this.observers, observer];

        // notify state changed
        return {
            dispose: () => this.observers = this.observers.filter(x => x !== observer)
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

        return Array.from(categoriesMap.values()).filter(x => x.parentId === null);
    }

    add(category: Category) {
        this._categories.push(category);
        console.log(this.tree);
        for (const o of this.observers) {
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

            for (const o of this.observers) {
                o();
            }
        }
    }

    remove(id: number) {
        this._categories = this._categories.filter(x => x.id !== id);

        // notify state changed
        for (const o of this.observers) {
            o();
        }
    }
}