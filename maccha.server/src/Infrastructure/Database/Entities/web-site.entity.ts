import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Unique, Index } from "typeorm";
import { DateTime } from "luxon";

@Unique(["name"])
@Entity()
export class WebSiteEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly webSiteId?: string;

    @Column({ length: 128 })
    readonly name!: string;

    @Column({ length: 128 })
    readonly displayName!: string;

    @Column({ length: 256 })
    readonly host!: string;

    @Column({ length: 1024 })
    readonly description!: string;

    @UpdateDateColumn({
        readonly: true,
        type: "datetime",
        transformer: {

            to: (value: DateTime) => value?.toISO(),

            from: (value: Date) => DateTime.fromJSDate(value)
        }
    })
    public readonly updatedAt?: DateTime = DateTime.local();

    @CreateDateColumn({
        readonly: true,
        type: "datetime",
        transformer: {

            to: (value: DateTime) => value?.toISO(),

            from: (value: Date) => DateTime.fromJSDate(value)
        }
    })
    public readonly createdAt?: DateTime = DateTime.local();

    constructor(params: WebSiteEntity) {
        Object.assign(this, params);
    }
}