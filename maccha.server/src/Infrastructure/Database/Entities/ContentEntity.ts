import { StatusType } from "@/Models/Contents/Enumes/StatusType";
import { DateTime } from "luxon";
import { CreateDateColumn, Entity, Column, Index, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { FieldEntity } from "./FieldEntity";

/**
 * Taxonomy entity.
 */
@Entity()
export class ContentEntity {
    @PrimaryGeneratedColumn("uuid")
    contentId!: string;

    @Column()
    @Index()
    identifier!: string;

    @Column()
    description!: string;

    @Column()
    taxonomyId!: string;

    @Column()
    title!: string;

    @Column()
    thumbnail!: string;

    @Column()
    status!: StatusType;

    @Column({ type: "text" })
    metadata!: string;

    @UpdateDateColumn({
        readonly: true,
        type: "datetime",
        transformer: {
            to: (value: DateTime) => value?.toISO(),
            from: (value: Date) => DateTime.fromJSDate(value)
        }
    })
    updatedAt!: DateTime;

    @CreateDateColumn({
        readonly: true,
        type: "datetime",
        transformer: {
            to: (value: DateTime) => value?.toISO(),
            from: (value: Date) => DateTime.fromJSDate(value)
        }
    })
    createdAt!: DateTime;

    @Column({
        nullable: true,
        type: "datetime",
        transformer: {
            to: (value: DateTime) => value?.toISO(),
            from: (value: Date) => DateTime.fromJSDate(value)
        }
    })
    publishIn!: DateTime | null;

    @Column()
    createdBy!: string;

    constructor(params: Partial<ContentEntity>) {
        Object.assign(this, params);
    }
}