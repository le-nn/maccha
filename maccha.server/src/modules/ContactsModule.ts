import { ContactContentFieldEntity, ContactContentEntity, ContactSettingEntity, ContactEmailSettingEntity } from "@/Infrastructure/Database/Entities";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ContactContentEntity,
            ContactContentFieldEntity,
            ContactSettingEntity,
            ContactEmailSettingEntity
        ])
    ],
    controllers: [
    ],
    providers: [
    ],
    exports: [
    ]
})
export class ContactsModule { }
