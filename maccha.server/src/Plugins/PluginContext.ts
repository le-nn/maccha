import { MacchaPlugin } from "./MacchaPlugin";

let _plugins: MacchaPlugin[] = [];

export function getPluginContext(): MacchaPlugin[] {
    return _plugins;
}

export function setPluginContext(plugins: MacchaPlugin[]): void {
    _plugins = plugins;
}