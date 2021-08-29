import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Unique, Index } from "typeorm";
import { DateTime } from "luxon";
import { RoleType } from "@/Models/Users/role.enum";

@Entity()
@Unique(["email"])
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    userId?: string;

    @Column({ length: 128 })
    @Index()
    name!: string;

    @Column({ length: 256 })
    email!: string;

    @Column({ length: 256 })
    password?: string;

    @Column({ unsigned: true, type: "bigint" })
    @Index()
    role!: RoleType;

    @Column()
    isActive!: boolean;

    @Column()
    avatar!: string;

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

    constructor(params: UserEntity) {
        Object.assign(this, params);
    }
}