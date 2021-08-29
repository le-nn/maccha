import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SchemeEntity } from ".";

/**
 * Taxonomy entity.
 */
@Entity()
export class TaxonomyEntity {
    @PrimaryGeneratedColumn("uuid")
    taxonomyId!: string;

    @OneToMany(() => SchemeEntity, scheme => scheme.schemeId)
    schemes?: SchemeEntity[];

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    displayName!: string;

    @Column()
    isDeleted!: boolean;

    @Column()
    @Index()
    identifier!: string;

    constructor(params: TaxonomyEntity) {
        Object.assign(this, params);
    }
}