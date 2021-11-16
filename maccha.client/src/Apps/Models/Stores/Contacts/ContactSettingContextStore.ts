import { KeyboardReturnOutlined } from "@mui/icons-material";
import { IContactSetting } from "Apps/Models/Domain/Contacts/ContactSettings";
import { ContactSettingsRepository } from "Apps/Repositories/ContactSettingsRepository";
import { services } from "Apps/Services";
import { Message, State, Store, meta } from "relux.js";

class ContactSettingContextState extends State<ContactSettingContextState>{
    contactSetting: IContactSetting | null = null;
    isNew = false;
}

class ModifySetting extends Message<IContactSetting | null> { }
class InitSetting extends Message { }

@meta({ name: "ContactSettingContextStore" })
export class ContactSettingContextStore extends Store<ContactSettingContextState> {
    readonly repository = new ContactSettingsRepository();

    constructor() {
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
            case InitSetting: {
                return state.clone({
                    contactSetting: {
                        contactSettingId: "",
                        identifier: services.authService.loginInfo.identifier,
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
    }

    async initAsNewSetting() {
        this.mutate(new InitSetting());
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