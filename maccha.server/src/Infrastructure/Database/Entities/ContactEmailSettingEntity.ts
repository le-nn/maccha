import { DateTime } from "luxon";
import { CreateDateColumn, Entity, Column, Index, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";

/**
 * Contact entity.
 */
@Entity()
export class ContactEmailSettingEntity {
    @PrimaryGeneratedColumn("uuid")
    contactEmailSettingId!: string;

    @Column({ length: 256 })
    @Column()
    to!: string;

    @Column({ length: 256 })
    @Column()
    from!: string;

    @Column()
    header!: string;

    @Column({ length: 512 })
    titleTemplate!: string;

    @Column({ type: "longtext" })
    bodyTemplate!: string;

    @Column()
    @Index()
    contactSettingId!: string;
}