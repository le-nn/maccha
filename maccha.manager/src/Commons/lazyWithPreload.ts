import { ComponentType, createElement, forwardRef, lazy } from "react";

export type PreloadableComponent<T extends ComponentType<any>> = T & {
    preload: () => Promise<void>;
};

export function lazyWithPreload<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>
): PreloadableComponent<T> {
    const LazyComponent = lazy(factory);
    let LoadedComponent: T | undefined;

    const Component = (forwardRef(function LazyWithPreload(props, ref) {
        return createElement(
            LoadedComponent ?? LazyComponent,
            Object.assign(ref ? { ref } : {}, props) as any
        );
    }) as any) as PreloadableComponent<T>;

    Component.preload = async () => {
        if (!LoadedComponent) {
            LoadedComponent = (await factory()).default;
        }
    };
    return Component;
}