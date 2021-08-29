import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaxonomyEntity } from "./TaxonomyEntity";

@Entity()
export class SchemeEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly schemeId?: string;

    @Column()
    taxonomyId!: string;

    @ManyToOne(type => TaxonomyEntity, t => t.schemes)
    @JoinColumn({ name: "taxonomyId" })
    taxonomy?: TaxonomyEntity;

    @Column({ length: 64 })
    type!: string;

    @Column({ length: 64 })
    name!: string;

    @Column({ length: 64 })
    displayName!: string;

    @Column({ length: 512 })
    description!: string;

    @Column({ length: 2048 })
    metadata!: string;

    @Column()
    sort!: number;

    /**
     * constructor
     * @param params initial value
     */
    constructor(params: SchemeEntity) {
        Object.assign(this, params);
    }
}
