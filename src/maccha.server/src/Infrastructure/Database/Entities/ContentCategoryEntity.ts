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
export class ContentCategoryEntity {
    @PrimaryGeneratedColumn("uuid")
    contentCategoryId!: string;

    @Index()
    @Column("uuid")
    taxonomyId!: string;

    @Index()
    @Column("uuid")
    contentId?: string;

    @Index()
    @Column("uuid")
    categorySchemeId?: string;
}