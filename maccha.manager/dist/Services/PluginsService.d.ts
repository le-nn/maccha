import { Route } from "../Models/route";
export declare class PluginsService {
    private pluginAdapter;
    private _plugins;
    constructor();
    get plugins(): Route[];
    fetchAsync(): Promise<void>;
}
