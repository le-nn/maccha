import { Content } from "@/Models/Contents/Entities/Content";
import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { ContentEntity } from "./ContentEntity";

/**
 * post type entity.
 */
@Entity()
export class FieldEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly fieldId!: string;

    @Column({ length: 128 })
    name!: string;

    @Column({ length: 128 })
    schemeId!: string;

    @Column({ type: "longtext" })
    value!: string;

    @Column()
    @Index()
    contentId!: string;

    @Column()
    @Index()
    taxonomyId!: string;

    /**
     * constructor
     * @param params initial value
     */
    constructor(params: Partial<FieldEntity>) {
        Object.assign(this, params);
    }
}