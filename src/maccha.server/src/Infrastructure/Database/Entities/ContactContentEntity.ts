import { DateTime } from "luxon";
import { CreateDateColumn, Entity, Column, Index, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";

/**
 * Taxonomy entity.
 */
@Entity()
export class ContactContentEntity {
    @PrimaryGeneratedColumn("uuid")
    contactContentId!: string;

    @Column()
    @Index()
    contactSettingId!: string;

    @Column()
    @Index()
    identifier!: string;

    @Column({
        nullable: true,
        type: "datetime",
        transformer: {
            to: (value: DateTime) => value?.toISO&&value?.toISO(),
            from: (value: Date) => DateTime.fromJSDate(value)
        }
    })
    contactedAt!: DateTime | null;
}