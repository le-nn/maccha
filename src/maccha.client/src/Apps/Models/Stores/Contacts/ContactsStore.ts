import { ContactContent, ContactContentMeta } from "Apps/Models/Domain/Contacts/Contact";
import { ContactsRepository } from "Apps/Repositories/ContactsRepository";
import { Message, State, FluxStore, meta } from "memento.core";

class ContactsStoreState extends State<ContactsStoreState>{
    contacts: ContactContentMeta[] = [];
    selectedId: string | null = null;
}

class ModifyContacts extends Message<ContactContentMeta[]> { }
class SetSelectedContactContentId extends Message<{ selectedId: string | null }> { }

@meta({ name: "ContactsStore" })
export class ContactsStore extends FluxStore<ContactsStoreState> {
    readonly repository = new ContactsRepository();

    constructor() {
        super(new ContactsStoreState(), ContactsStore.mutation);
    }

    static mutation(state: ContactsStoreState, message: Message): ContactsStoreState {
        switch (message.constructor) {
            case ModifyContacts: {
                const { payload } = message as ModifyContacts;
                return state.clone({
                    contacts: payload
                });
            }
            case SetSelectedContactContentId: {
                const { payload } = message as SetSelectedContactContentId;
                return state.clone({
                    selectedId: payload.selectedId
                });
            }
        }
        return state;
    }

    async loadAsync(contactSettingId: string | null) {
        if (!contactSettingId) {
            this.mutate(new ModifyContacts([]));
            return;
        }

        const contacts = await this.repository.fetchAsync(contactSettingId);
        this.mutate(new ModifyContacts(contacts));

        const [c] = contacts;
        if (!this.state.selectedId && c) {
            this.select(c.contactContentId);
        }
        else if (!c) {
            this.select(null);
        }
    }

    select(contactContentId: string | null) {
        this.mutate(
            new SetSelectedContactContentId({
                selectedId: contactContentId
            }));
    }
}