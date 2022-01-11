import { AuthRepository } from "Apps/Repositories/AuthRepository";
import { MediaRepositry } from "Apps/Repositories/MediaRepository";
import { createProvider } from "relux.js";
import { AuthStore } from "./Auth/AuthStore";
import { ContactContentContextStore } from "./Contacts/ContactContextStore";
import { ContactSettingContextStore } from "./Contacts/ContactSettingContextStore";
import { ContactSettingsStore } from "./Contacts/ContactSettingsStore";
import { ContactsStore } from "./Contacts/ContactsStore";
import { MediaStore } from "./Media/MediaStore";

export const build = () => {
    return createProvider({
        stores: [
            ContactsStore,
            ContactSettingsStore,
            ContactSettingContextStore,
            ContactContentContextStore,
            AuthStore,
            MediaStore
        ],
        services: [
            AuthRepository,
            MediaRepositry,
        ]
    });
};