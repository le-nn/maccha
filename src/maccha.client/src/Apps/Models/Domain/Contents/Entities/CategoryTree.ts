import { Category } from "./Category";
import { CategoryNode } from "./CategoryNode";

export class CategoryTree {
    private categoriesMap = new Map<number, CategoryNode>();
    private observers: (() => void)[] = [];

    get all(): Category[] {
        return Array.from(this.categoriesMap.values()).map(x => ({
            id: x.id,
            slug: x.slug,
            name: x.name,
            order: x.order,
            parentId: x.parentId,
        }));
    }

    get tree(): CategoryNode[] {
        return Array.from(this.categoriesMap.values())
            .filter(x => x.parentId === null);
    }

    constructor(items?: Category[]) {
        items?.forEach(x => {
            this.add(x);
        });
    }

    getMaxId() {
        return Math.max(...[
            0,
            ...Array.from(this.categoriesMap.values()).map(x => x.id)
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

    add(category: Category) {
        if (this.categoriesMap.has(category.id)) {
            throw new Error("Category " + category.id + " has already exists.");
        }

        const entity = {
            ...category,
            children: [],
        };

        this.categoriesMap.set(category.id, entity);
        if (category.parentId !== null) {
            const parent = this.categoriesMap.get(category.parentId);
            if (!parent) {
                throw new Error("parent category id " + category.parentId + " is not exists.");
            }

            parent.children.push(entity);
        }

        for (const o of this.observers) {
            o();
        }
    }

    mutate(id: number, mutaion: (category: Category) => Category) {
        const c = this.categoriesMap.get(id);
        if (c) {
            const newc = mutaion(c);
            this.categoriesMap.set(id, c);

            for (const o of this.observers) {
                o();
            }
        }
    }

    remove(id: number) {
        const category = this.categoriesMap.get(id);
        if (!category) {
            throw new Error(`Category ${id} is not exists.`);
        }

        this.categoriesMap.delete(id);

        // remove from parent
        if (category.parentId !== null) {
            const parent = this.categoriesMap.get(category.parentId);
            if (!parent) {
                throw new Error("parent category id " + category.parentId + " is not exists.");
            }

            parent.children = parent.children.filter(x => x.id !== id);
        }

        // notify state changed
        for (const o of this.observers) {
            o();
        }
    }
}