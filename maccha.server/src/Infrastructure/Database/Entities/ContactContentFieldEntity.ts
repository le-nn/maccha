import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/**
 * ContactContentField entity.
 */
@Entity()
export class ContactContentFieldEntity {
    @PrimaryGeneratedColumn("uuid")
    contactContentFieldId!: string;

    @Column({ length: 128 })
    name!: string;

    @Column({ type: "longtext" })
    value!: string;

    @Column()
    @Index()
    contactContentId!: string;

    constructor(params: ContactContentFieldEntity) {
        Object.assign(this, params);
    }
}