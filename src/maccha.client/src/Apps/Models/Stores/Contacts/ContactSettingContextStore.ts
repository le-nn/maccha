import { KeyboardReturnOutlined } from "@mui/icons-material";
import { IContactSetting } from "Apps/Models/Domain/Contacts/ContactSettings";
import { ContactSettingsRepository } from "Apps/Repositories/ContactSettingsRepository";
import { services } from "Apps/Services";
import { Message, State, FluxStore, meta } from "memento.core";
import { AuthStore } from "../Auth/AuthStore";

class ContactSettingContextState extends State<ContactSettingContextState>{
    contactSetting: IContactSetting | null = null;
    isNew = false;
}

class ModifySetting extends Message<IContactSetting | null> { }
class InitSetting extends Message<string> { }
class SetIsNew extends Message<boolean>{ }

@meta({ name: "ContactSettingContextStore" })
export class ContactSettingContextStore extends FluxStore<ContactSettingContextState> {
    readonly repository = new ContactSettingsRepository();

    constructor(private readonly authStore: AuthStore) {
        super(new ContactSettingContextState(), ContactSettingContextStore.mutation);
    }

    static mutation(state: ContactSettingContextState, message: Message): ContactSettingContextState {
        switch (message.constructor) {
            case ModifySetting: {
                const { payload } = message as ModifySetting;
                return state.clone({
                    contactSetting: payload,
                });
            }
            case SetIsNew: {
                return state.clone({
                    isNew: false,
                });
            }
            case InitSetting: {
                const { payload } = message as InitSetting;
                return state.clone({
                    contactSetting: {
                        contactSettingId: "",
                        identifier: payload,
                        name: "",
                        schemes: [
                            "name",
                            "email"
                        ],
                        emailSettings: [
                            {
                                bodyTemplate: "Body",
                                from: "example@example.com",
                                header: "",
                                titleTemplate: "Title",
                                to: "example2@example2.com"
                            }
                        ]
                    },
                    isNew: true,
                });
            }
        }
        return state;
    }

    async loadSettingAsync(contactSettingId: string | null) {
        if (!contactSettingId) {
            this.mutate(new ModifySetting(null));
            return;
        }

        const contactSetting = await this.repository.fetchContactSetting(contactSettingId);
        this.mutate(new ModifySetting(contactSetting));
        this.mutate(new SetIsNew(false));
    }

    async initAsNewSetting() {
        const websiteId = this.authStore.state.loginInfo?.webSiteId;
        if (!websiteId) {
            throw new Error("website is not selected");
        }

        this.mutate(new InitSetting(websiteId));
    }

    async modifySetting(setting: IContactSetting) {
        this.mutate(new ModifySetting(setting));
    }

    async saveSettingAsync() {
        if (this.state.isNew && this.state.contactSetting) {
            await this.repository.addContactSetting(this.state.contactSetting);
        }
        else if (this.state.contactSetting) {
            await this.repository.saveContactSetting(this.state.contactSetting);
        }
    }
}