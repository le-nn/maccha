import { Entity, PrimaryGeneratedColumn, Column, Index, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { SchemeEntity } from "./SchemeEntity";
import { TaxonomyEntity } from "./TaxonomyEntity";

/**
 * post type entity.
 */
@Entity()
export class PostTypeEntity {
    @PrimaryGeneratedColumn("uuid")
    readonly postTypeId?: string;

    @Column({ length: 128 })
    taxonomyId!: string;

    @OneToOne(() => TaxonomyEntity)
    @JoinColumn({
        name: "taxonomyId",
    })
    taxonomy!: TaxonomyEntity;

    @Column()
    displayFormat!: string;

    @Column()
    @Index()
    identifier!: string;

    @Column()
    isDeleted!: boolean;

    /**
     * constructor
     * @param params initial value
     */
    constructor(params: PostTypeEntity) {
        Object.assign(this, params);
    }
}