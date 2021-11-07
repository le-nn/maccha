import { createProvider } from "relux.js";
import { ContactSettingContextStore } from "./Contacts/ContactSettingContextStore";
import { ContactSettingsStore } from "./Contacts/ContactSettingsStore";
import { ContactsStore } from "./Contacts/ContactsStore";

export const build = () => createProvider({
    stores: [
        ContactsStore,
        ContactSettingsStore,
        ContactSettingContextStore
    ],
    services: [

    ]
});