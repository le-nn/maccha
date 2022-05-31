import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContactContentEntity, ContactEmailSettingEntity } from ".";

/**
 * Taxonomy entity.
 */
@Entity()
export class ContactSettingEntity {
    @PrimaryGeneratedColumn("uuid")
    contactSettingId!: string;

    @OneToMany(() => ContactContentEntity, scheme => scheme.contactContentId)
    contacts!: ContactContentEntity[];

    @OneToOne(() => ContactEmailSettingEntity, scheme => scheme.contactEmailSettingId)
    emailSetting!: ContactEmailSettingEntity[];

    @Column({ length: 128 })
    name!: string;

    /**
     * split via ","
     * @example 
     * name,first-name,description
     */
     @Column({ length: 512 })
    schemes!: string;

    @Column()
    @Index()
    identifier!: string;

    constructor(params: ContactSettingEntity) {
        Object.assign(this, params);
    }
}