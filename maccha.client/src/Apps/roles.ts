import { RoleType } from "Apps/Models";

export const roles = {
    contactSettings: {
        create: [RoleType.Admin, RoleType.Edit],
        edit: [RoleType.Admin, RoleType.Edit],
        remove: [RoleType.Admin, RoleType.Edit],
    },
    webSiteSettings: {
        create: [RoleType.Admin, RoleType.Edit],
        edit: [RoleType.Admin, RoleType.Edit],
        remove: [RoleType.Admin, RoleType.Edit],
    },
    posts: {
        create: [RoleType.Admin, RoleType.Edit, RoleType.Post],
        editOwn: [RoleType.Admin, RoleType.Edit, RoleType.Post],
        removeOwn: [RoleType.Admin, RoleType.Edit, RoleType.Post],
        editOther: [RoleType.Admin, RoleType.Edit],
        removeOther: [RoleType.Admin, RoleType.Edit],
    },
    postTypes: {
        create: [RoleType.Admin, RoleType.Edit],
        edit: [RoleType.Admin, RoleType.Edit],
        remove: [RoleType.Admin, RoleType.Edit],
    }
};