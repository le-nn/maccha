import React from "react";
import { RouterConfig } from "Libs/Routing/RouterConfig";
import { TFunction } from "react-i18next";
import { AccountBox, InsertPhoto, Language, LiveHelp, PostAdd, Settings } from "@mui/icons-material";
import { RoleType } from "./Models";
import { group } from "console";

export const routes = (option?: {
    t: TFunction<string>;
    pathPrefix?: string;
}): RouterConfig => ({
    // absolute path
    basepath: option?.pathPrefix ?? "/",
    // default home page path
    homepath: "/",
    routes: [
        {
            component: () => import("Apps/Components/posts/Environments/PostPageRoot"),
            icon: () => <PostAdd />,
            path: "/posts/*",
            title: option?.t("投稿") ?? "Posts",
            children: [
                {
                    component: () => import("Apps/Components/posts/Environments/PostsPage"),
                    path: "/"
                },
                {
                    component: () => import("Apps/Components/posts/Environments/PostsPage"),
                    path: ":taxonomy"
                },
                {
                    component: () => import("Apps/Components/posts/Environments/PostEditPage"),
                    path: ":taxonomy/:contentId/edit"
                },
                {
                    component: () => import("Apps/Components/posts/Environments/PostPreviewPage"),
                    path: "/:taxonomy/:contentId"
                },
                {
                    component: () => import("Apps/Components/posts/Environments/PostTypeEditPage"),
                    path: ":taxonomy/edit"
                },
            ]
        },
        {
            path: "/media",
            title: "メディア",
            icon: () => <InsertPhoto />,
            component: () => import("Apps/Components/Media/Enviroments/MediaPage"),
            role: RoleType.Post
        },
        {
            path: "/settings",
            title: "設定",
            icon: () => <Settings />,
            component: () => import("Apps/Components/Settings/Environments/SettingsPage"),
            role: RoleType.Subscribe
        },
        {
            path: "/user-managements",
            title: "ユーザー管理",
            icon: () => <AccountBox />,
            component: () => import("Apps/Components/users/UserPage"),
            role: RoleType.Edit,
            group: option?.t("管理")
        },
        {
            path: "/web-site-managements",
            title: "WEBサイト管理",
            icon: () => <Language />,
            component: () => import("Apps/Components/web-sites/WebSiteManagementsPage"),
            role: RoleType.Edit,
            group: option?.t("管理")
        },
        {
            path: "/api-reference",
            title: "API定義",
            icon: () => <LiveHelp />,
            component: () => import("Apps/Components/References/ApiReferencePage"),
            role: RoleType.Subscribe,
            group: option?.t("管理")
        },
    ]
});