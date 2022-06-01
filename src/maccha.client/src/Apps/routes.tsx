import React from "react";
import { RouterConfig } from "Libs/Routing/RouterConfig";
import { TFunction } from "react-i18next";
import { AccountBox, ContactMail, InsertPhoto, Language, LiveHelp, Mail, PostAdd, Settings } from "@mui/icons-material";
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
            to: "/app/posts",
            name: "posts",
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
            ],
            roles: [RoleType.Edit, RoleType.Admin, RoleType.Post, RoleType.Subscribe]
        },
        {
            to: "/app/media",
            name: "media",
            path: "/media",
            title: "メディア",
            icon: () => <InsertPhoto />,
            component: () => import("Apps/Components/Media/Enviroments/MediaPage"),
            roles: [RoleType.Edit, RoleType.Admin, RoleType.Post, RoleType.Subscribe]
        },
        {
            to: "/app/contacts",
            path: "/contacts/*",
            name: "contacts",
            title: option?.t("お問い合わせ") ?? "",
            icon: () => <Mail />,
            component: () => import("Apps/Components/Contacts/Environments/ContactPageRoot"),
            roles: [RoleType.Edit, RoleType.Admin, RoleType.Post, RoleType.Subscribe],
            children: [
                {
                    component: () => import("Apps/Components/Contacts/Environments/ContactSettingPage"),
                    path: "new/edit"
                },
                {
                    component: () => import("Apps/Components/Contacts/Environments/ContactSettingPage"),
                    path: ":contactSettingId/edit"
                },
                {
                    component: () => import("Apps/Components/Contacts/Environments/ContactListPage"),
                    path: "/"
                },
            ]
        },
        {
            to: "/app/settings",
            path: "/settings",
            title: "設定",
            name: "settings",
            icon: () => <Settings />,
            component: () => import("Apps/Components/Settings/Environments/SettingsPage"),
            roles: [RoleType.Edit, RoleType.Admin, RoleType.Post, RoleType.Subscribe]
        },
        {
            to: "/app/user-managements",
            path: "/user-managements",
            title: "ユーザー管理",
            name: "user-managements",
            icon: () => <AccountBox />,
            component: () => import("Apps/Components/users/UserPage"),
            roles: [RoleType.Edit, RoleType.Admin]
        },
        {
            to: "/app/web-site-managements",
            path: "/web-site-managements",
            title: "WEBサイト管理",
            name: "web-site-managements",
            icon: () => <Language />,
            component: () => import("Apps/Components/web-sites/WebSiteManagementsPage"),
            roles: [RoleType.Edit, RoleType.Admin],
            group: option?.t("管理")
        },
        {
            to: "/app/api-reference",
            path: "/api-reference",
            title: "API定義",
            name: "api-reference",
            icon: () => <LiveHelp />,
            component: () => import("Apps/Components/References/ApiReferencePage"),
            roles: [RoleType.Admin],
            group: option?.t("管理")
        },
    ]
});