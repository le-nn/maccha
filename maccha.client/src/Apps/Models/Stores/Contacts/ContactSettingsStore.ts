import { IContactSetting } from "Apps/Models/Domain/Contacts/ContactSettings";
import { ContactSettingsRepository } from "Apps/Repositories/ContactSettingsRepository";
import { Message, State, Store, store } from "relux.js";

class ContactSettingsState extends State<ContactSettingsState>{
    contactSettings: { contactSettingId: string, name: string }[] = [];
    selectedSettingId: string | null = null;
}

class ModifyContactSettings extends Message<{ contactSettingId: string, name: string }[]> { }
class SetSelectedSettingId extends Message<{ id: string | null }> { }

@store({ name: "ContactSettingsStore" })
export class ContactSettingsStore extends Store<ContactSettingsState> {
    readonly repository = new ContactSettingsRepository();

    constructor() {
        super(new ContactSettingsState(), ContactSettingsStore.mutation);
    }

    static mutation(state: ContactSettingsState, message: Message): ContactSettingsState {
        switch (message.constructor) {
            case ModifyContactSettings: {
                const { payload } = message as ModifyContactSettings;
                return state.clone({
                    contactSettings: payload ?? []
                });
            }
            case SetSelectedSettingId: {
                const { payload } = message as SetSelectedSettingId;
                return state.clone({
                    selectedSettingId: payload.id
                });
            }
        }
        return state;
    }

    async loadSettingsAsync() {
        const settings = await this.repository.fetchContactSettings();
        this.mutate(new ModifyContactSettings(settings));

        // select first if not selected
        if (!this.state.selectedSettingId) {
            const [first] = settings;
            if (first) {
                this.select(first.contactSettingId);
            }
        }
    }

    select(selectedSettingId: string | null) {
        this.mutate(new SetSelectedSettingId({
            id: selectedSettingId,
        }));
    }

    async createSettingsAsync(params: Omit<IContactSetting, "contactSettingId">) {
        await this.repository.fetchContactSettings();
        await this.loadSettingsAsync();
    }

    async removeItemAsync(contactSettingId: string) {
        try {
            await this.repository.removeAsync(contactSettingId);
            await this.loadSettingsAsync();
        }
        catch {
            throw new Error();
        }
    }
}