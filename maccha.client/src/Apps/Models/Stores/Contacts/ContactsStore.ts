import { ContactContent } from "Apps/Models/Domain/Contacts/Contact";
import { ContactsRepository } from "Apps/Repositories/ContactsRepository";
import { Message, State, Store, store } from "relux.js";

class ContactsStoreState extends State<ContactsStoreState>{
    contacts: ContactContent[] = [];
}

class ModifyContacts extends Message<ContactContent[]> { }

@store({ name: "ContactsStore" })
export class ContactsStore extends Store<ContactsStoreState> {
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
        }
        return state;
    }

    async loadAsync(contactSettingId: string) {
        const contacts = await this.repository.fetchAsync(contactSettingId);
        this.mutate(new ModifyContacts(contacts));
    }
}