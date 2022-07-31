import { AuthRepository } from "Apps/Repositories/AuthRepository";
import { MediaRepositry } from "Apps/Repositories/MediaRepository";
import { PostManagementsRepository } from "Apps/Repositories/PostManagementsRepository";
import { createProvider } from "memento.core";
import { AuthStore } from "./Auth/AuthStore";
import { ContactContentContextStore } from "./Contacts/ContactContextStore";
import { ContactSettingContextStore } from "./Contacts/ContactSettingContextStore";
import { ContactSettingsStore } from "./Contacts/ContactSettingsStore";
import { ContactsStore } from "./Contacts/ContactsStore";
import { MediaStore } from "./Media/MediaStore";
import { PostCollectionStore } from "./Posts/PostsService";
import { PostTypeCollectionStore } from "./Posts/PostTypeCollectionStore";

export const build = () => {
    return createProvider({
        stores: [
            ContactsStore,
            ContactSettingsStore,
            ContactSettingContextStore,
            ContactContentContextStore,
            AuthStore,
            MediaStore,
            PostCollectionStore,
            PostTypeCollectionStore,
        ],
        services: [
            AuthRepository,
            MediaRepositry,
            PostManagementsRepository,
        ]
    });
};