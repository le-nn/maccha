import { RoleType, Route } from "../Models";
import { timer } from "rxjs";

interface RouteConfig {
    hiddenRoutes: Route[];
    footerRoutes: Route[];
    displayRoutes: Route[];
}

interface NavbarItem {

}

export const config: RouteConfig = {
    hiddenRoutes: [
        {
            path: "/login",
            title: "ログイン",
            icon: "Star",
            component: () => import("../Components/login/LoginPage"),
            role: RoleType.None
        },
    ],
    displayRoutes: [
        // {
        //     path: "/main",
        //     title: "メイン",
        //     icon: "web",
        //     component: () => import("../Components/main/MainPage"),
        //     role: RoleType.Subscribe
        // },
        {
            path: "/posts",
            title: "投稿",
            icon: "post_add",
            component: () => import("../Components/posts/Environments/PostsPage"),
            role: RoleType.Subscribe,
            exact: true,
            children: [
                {
                    path: "/posts/:taxonomy",
                    component: () => import("../Components/posts/Environments/PostsPage"),
                    children: []
                },
                {
                    path: "/posts/:taxonomy/:contentId",
                    component: () => import("../Components/posts/Environments/PostPreviewPage"),
                    children: []
                },
                {
                    path: "/posts/:taxonomy/edit",
                    component: () => import("../Components/posts/Environments/PostTypeEditPage"),
                    children: []
                },
                {
                    path: "/posts/:taxonomy/:contentId/edit",
                    component: () => import("../Components/posts/Environments/PostEditPage"),
                    children: []
                },
            ]
        },
        {
            path: "/media",
            title: "メディア",
            icon: "insert_photo",
            component: () => import("../Components/Media/Enviroments/MediaPage"),
            role: RoleType.Post
        },
        {
            path: "/settings",
            title: "設定",
            icon: "settings",
            component: () => import("../Components/Settings/Environments/SettingsPage"),
            role: RoleType.Subscribe
        },
    ],
    footerRoutes: [
        {
            path: "/user-managements",
            title: "ユーザー管理",
            icon: "account_box",
            component: () => import("../Components/users/UserPage"),
            role: RoleType.Edit
        },
        {
            path: "/web-site-managements",
            title: "WEBサイト管理",
            icon: "language",
            component: () => import("../Components/web-sites/WebSiteManagementsPage"),
            role: RoleType.Edit
        },
        {
            path: "/api-reference",
            title: "API定義",
            icon: "live_help",
            component: () => import("../Components/References/ApiReferencePage"),
            role: RoleType.Subscribe
        },
    ]
};