import { ContactSettingsController } from "@/Applications/Contacts/Controllers/ContactSettingsController";
import { ContactsController } from "@/Applications/Contacts/Controllers/ContactsController";
import { ContactContentFieldEntity, ContactContentEntity, ContactSettingEntity, ContactEmailSettingEntity } from "@/Infrastructure/Database/Entities";
import { ContactSettingsRepository } from "@/Infrastructure/Repositories/ContactSettingsRepository";
import { ContactSettingsService } from "@/Models/Contacts/Services/ContactSettingsService";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactSettingsAppService } from "@/Applications/Contacts/Services/ContactSettingsService";
import { ContactAppService } from "@/Applications/Contacts/Services/ContactsAppService";
import { ContactsService } from "@/Models/Contacts/Services/ContactsService";
import { ContactsRepository } from "@/Infrastructure/Repositories/ContactsRepository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ContactContentEntity,
            ContactContentFieldEntity,
            ContactSettingEntity,
            ContactEmailSettingEntity
        ]),
    ],
    controllers: [
        ContactsController,
        ContactSettingsController
    ],
    providers: [
        ContactSettingsService,
        ContactSettingsAppService,
        ContactAppService,
        ContactsService,
        {
            provide: "IContactSettingsRepository",
            useClass: ContactSettingsRepository
        },
        {
            provide: "IContactsRepository",
            useClass: ContactsRepository
        }
    ],
    exports: [
    ]
})
export class ContactsModule { }
