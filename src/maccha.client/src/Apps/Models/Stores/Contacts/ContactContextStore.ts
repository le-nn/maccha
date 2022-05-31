import { ContactContent } from "Apps/Models/Domain/Contacts/Contact";
import { ContactsRepository } from "Apps/Repositories/ContactsRepository";
import { Message, State, Store, store } from "relux.js";
import { ContactsStore } from "./ContactsStore";

class ContactContentContextStoreState extends State<ContactContentContextStoreState>{
    contact: ContactContent | null = null;
}

class ModifyContactContent extends Message<ContactContent | null> { }

@store({ name: "ContactContentContextStore" })
export class ContactContentContextStore extends Store<ContactContentContextStoreState> {
    readonly repository = new ContactsRepository();

    constructor(
        readonly contactsStore: ContactsStore
    ) {
        super(new ContactContentContextStoreState(), ContactContentContextStore.mutation);

        contactsStore.subscribe(e => {
            if (e.present.selectedId !== e.previous.selectedId) {
                this.loadAsync(e.present.selectedId);
            }
        });
    }

    static mutation(state: ContactContentContextStoreState, message: Message): ContactContentContextStoreState {
        switch (message.constructor) {
            case ModifyContactContent: {
                const { payload } = message as ModifyContactContent;
                return state.clone({
                    contact: payload
                });
            }
        }
        return state;
    }

    async loadAsync(contactContentId: string | null) {
        if (!contactContentId) {
            this.mutate(new ModifyContactContent(null));
            return;
        }

        const content = await this.repository.fetchContactContentAsync(contactContentId);
        if (!content) {
            throw new Error("ContactContent is not found.");
        }
        this.mutate(new ModifyContactContent(content));
    }
}