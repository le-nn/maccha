import { IContactContentMeta, ContactContent } from "@/Models/Contacts/Entities/ContactContent";
import { ContactContentField } from "@/Models/Contacts/Entities/ContactContentField";
import { IPostContactParams } from "@/Models/Contacts/params/IPostParams";
import { IContactsRepository } from "@/Models/Contacts/Repositories/IContactsRepository";
import { InjectRepository } from "@nestjs/typeorm";
import { DateTime } from "luxon";
import { concatMap, firstValueFrom, from, map, toArray } from "rxjs";
import { Repository } from "typeorm";
import { v4 } from "uuid";
import { ContactContentEntity, ContactContentFieldEntity } from "../Database/Entities";

export class ContactsRepository implements IContactsRepository {
    constructor(
        @InjectRepository(ContactContentEntity)
        private readonly contacts: Repository<ContactContentEntity>,
        @InjectRepository(ContactContentFieldEntity)
        private readonly contactContentFields: Repository<ContactContentFieldEntity>
    ) {

    }

    async searchAsync(settingId: string): Promise<IContactContentMeta[]> {
        try {
            const contacts = await this.contacts.find({
                select: [
                    "contactedAt",
                    "contactContentId"
                ],
                where: {
                    contactSettingId: settingId,
                },
                order: {
                    contactedAt: "DESC" as any,
                }
            });

            const getFields = async (contactId: string, contactedAt: DateTime): Promise<IContactContentMeta> => {
                const title = await this.contactContentFields.findOne({
                    where: {
                        contactContentId: contactId,
                        name: "title"
                    },
                    select: ["name", "value"]
                });

                const title2 = title ?? await this.contactContentFields.findOne({
                    where: {
                        contactContentId: contactId,
                    },
                    select: ["name", "value"],
                    order: {
                        name: "ASC"
                    }
                });

                return {
                    contactContentId: contactId,
                    contactedAt,
                    title: title2?.value ?? "NO CONTENT"
                };
            };

            const results = from(contacts).pipe(
                concatMap(x => from(getFields(x.contactContentId, x.contactedAt ?? DateTime.min()))),
                toArray()
            );

            return (await firstValueFrom(results)) ?? [];
        }
        catch (expect) {
            throw expect;
        }
    }

    async fetchAsync(contactId: string): Promise<ContactContent | null> {
        try {
            const contact = await this.contacts.findOne({
                where: {
                    contactContentId: contactId,
                }
            });

            const fields = await this.contactContentFields.find({
                where: {
                    contactContentId: contactId
                },
                order: {
                    name: "ASC"
                }
            });

            if (contact && fields.length) {
                return new ContactContent({
                    contactContentId: contact.contactContentId,
                    contactSettingId: contact.contactSettingId,
                    contactedAt: contact.contactedAt,
                    title: "",
                    identifier: contact.identifier,
                    fields: fields.map(x => new ContactContentField({
                        contactContentId: x.contactContentFieldId,
                        contactContentFieldId: x.contactContentFieldId,
                        name: x.name,
                        value: x.value,
                    }))
                });
            }

            return null;
        }
        catch (expect) {
            throw expect;
        }
    }

    async postAsync(contactSettingId: string, params: IPostContactParams): Promise<void> {
        try {
            const contentId = v4();
            await this.contacts.save({
                contactedAt: params.contactedAt,
                contactContentId: contentId,
                contactSettingId,
                identifier: "",
            });

            for (const item of params.fields) {
                await this.contactContentFields.insert({
                    contactContentId: contentId,
                    name: item.name,
                    value: item.value,
                    contactContentFieldId: v4(),
                    contactSettingId,
                });
            }
        }
        catch (expect) {
            throw expect;
        }
    }
}