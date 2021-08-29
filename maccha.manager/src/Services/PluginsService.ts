import { observable, computed, action, makeAutoObservable } from "mobx";
import { AuthRepository } from "../Repositories/AuthRepository";
import { LoginInfo } from "../Models/auth/login-info";
import { RoleType } from "../Models";
import { PluginAdapter } from "../Plugins/PluginAdapter";
import { Route } from "../Models/route";

export class PluginsService {
    private pluginAdapter = new PluginAdapter();

    private _plugins: Route[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public get plugins() {
        return this._plugins;
    }

    public async fetchAsync(): Promise<void> {
        const plugins = [{
            pluginName: "SamplePlugin",
            url: "http://localhost:8080/index.js",
            role: RoleType.Subscribe,
            icon: "edit",
            path: "/sample",
            title: "サンプルプラグイン"
        }];

        // this._plugins = plugins.map(
        //     plugin => ({
        //         component: () => this.pluginAdapter.atatch({
        //             pluginName: plugin.pluginName,
        //             url: plugin.url
        //         }),
        //         role: plugin.role,
        //         icon: plugin.icon,
        //         path: plugin.path,
        //         title: plugin.title,
        //     })
        // );
    }
}
