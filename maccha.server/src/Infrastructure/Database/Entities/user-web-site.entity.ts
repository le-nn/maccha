import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, Index, ManyToOne } from "typeorm";
import { WebSiteEntity } from "./web-site.entity";

/**
 * web sites that user can login.
 */
@Entity()
export class UserWebSiteEntity {
    @PrimaryGeneratedColumn()
    readonly userWebSiteId!: number;

    @Column()
    @Index()
    readonly userId!: string;

    @Column()
    readonly webSiteId!: string;

    @ManyToOne(() => WebSiteEntity)
    @JoinColumn({
        name: "webSiteId",
    })
    readonly webSite?: WebSiteEntity;

    /**
     * constructor
     * @param params initial value
     */
    constructor(params: UserWebSiteEntity) {
        Object.assign(this, params);
    }
}