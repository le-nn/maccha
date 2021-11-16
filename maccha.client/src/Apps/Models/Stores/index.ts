import { createProvider } from "relux.js";
import { ContactContentContextStore } from "./Contacts/ContactContextStore";
import { ContactSettingContextStore } from "./Contacts/ContactSettingContextStore";
import { ContactSettingsStore } from "./Contacts/ContactSettingsStore";
import { ContactsStore } from "./Contacts/ContactsStore";

//let c = 0;

export const build = () => {
    const s = createProvider({
        stores: [
            ContactsStore,
            ContactSettingsStore,
            ContactSettingContextStore,
            ContactContentContextStore
        ],
        services: [

        ]
    });
    return s;
};