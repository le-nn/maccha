import { DateTime } from "luxon";
import {
    CreateDateColumn,
    Entity,
    Column,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn
} from "typeorm";

@Entity()
export class CategorySchemeEntity {
    @PrimaryGeneratedColumn("uuid")
    categorySchemeId!: string;

    @Index()
    @Column("uuid")
    taxonomyId!: string;

    @Column()
    id!: number;

    @Column({ length: 64 })
    name!: string;

    @Column({ length: 32 })
    slug!: string;

    @Column()
    order!: number;

    @Column({ nullable: true })
    parentId!: number | null;
}