import { Content } from "@/Models/Contents/Entities/Content";
import { Field } from "@/Models/Contents/Entities/Field";
import { ICreateContentParams } from "@/Models/Contents/Params/ICreateContentParams";
import { ISaveContentParams } from "@/Models/Contents/Params/ISaveContentParams";
import { ISearchContentParams } from "@/Models/Contents/Params/ISearchContentParams";
import { IContentsRepository } from "@/Models/Contents/Repositories";
import { InjectRepository } from "@nestjs/typeorm";
import { from, lastValueFrom, of } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";
import { Repository, In } from "typeorm";
import { ContentEntity, FieldEntity } from "../Database/Entities";

export class ContentsRepository implements IContentsRepository {
    constructor(
        @InjectRepository(ContentEntity) private readonly contents: Repository<ContentEntity>,
        @InjectRepository(FieldEntity) private readonly fields: Repository<FieldEntity>
    ) {

    }

    async findByIdAsync(contentId: string): Promise<Content | null> {
        try {
            const content = await this.contents.findOne({
                contentId
            });

            if (!content) {
                return null;
            }

            const fields = await this.fields.find({
                contentId: content.contentId
            });

            return new Content({
                contentId: content.contentId,
                createdAt: content.createdAt,
                createdBy: {
                    name: "",
                    thumbnail: ""
                },
                description: content.description,
                identifier: content.identifier,
                metadata: content.metadata,
                publishIn: content.publishIn,
                status: content.status,
                taxonomyId: content.taxonomyId,
                thumbnail: content.thumbnail,
                title: content.title,
                updatedAt: content.updatedAt,
                fields: fields.map(f => new Field({
                    fieldId: f.fieldId,
                    name: f.name,
                    schemeId: f.schemeId,
                    value: f.value
                })),
            });
        }
        catch {
            throw new Error("Cannot to create content.");
        }
    }

    async searchAsync(taxonomyId: string, params: ISearchContentParams): Promise<[Content[], number]> {
        try {
            const [rows, count] = await this.contents.manager.transaction(async connection => {
                const filterSql = "";// buildFilterSql(parseFilterQuery());
                const fieldSql = `
SELECT DISTINCT \`contentId\` as \`fieldContentId\` FROM \`field_entity\`
WHERE \`taxonomyId\`='${taxonomyId}' ${filterSql ? "AND" + filterSql : ""}
                `;

                const userSql = `
INNER JOIN (SELECT \`userId\`,\`name\`,\`avatar\` FROM maccha.\`user_entity\`) 
AS B ON B.\`userId\`=\`content_entity\`.\`createdBy\`
                `;

                const sql = `
SELECT SQL_CALC_FOUND_ROWS * FROM \`content_entity\` 
${filterSql ? "INNER" : "LEFT OUTER"} JOIN(${fieldSql}) AS A ON A.\`fieldContentId\`=\`content_entity\`.\`contentId\`
${userSql}
WHERE \`taxonomyId\`='${taxonomyId}' 
ORDER BY \`createdAt\` DESC 
LIMIT ${params.fetch} OFFSET ${params.offset}
;`;

                const rawData = await connection.query(sql) as (ContentEntity & any)[];
                const count = (await connection.query("SELECT FOUND_ROWS() as count;"))[0].count as number;
                return [rawData, count];
            });

            const split = params.fields.split(",");
            const selects = split.length ? In(split) : undefined;
            const mapContent = async (c: any) => {
                return new Content({
                    contentId: c.contentId,
                    createdAt: c.createdAt,
                    updatedAt: c.updatedAt,
                    description: c.description,
                    identifier: c.identifier,
                    metadata: c.metadata,
                    publishIn: c.publishIn,
                    status: c.status,
                    taxonomyId: c.taxonomyId,
                    thumbnail: c.thumbnail,
                    title: c.title,
                    fields: (await this.fields.find({
                        where: {
                            contentId: c.contentId,
                            name: selects,
                        }
                    })).map(
                        (f: any) => new Field({
                            fieldId: f.fieldId,
                            name: f.name,
                            schemeId: f.schemeId,
                            value: f.value
                        })
                    ),
                    createdBy: {
                        name: c.name,
                        thumbnail: c.avatar,
                    }
                });
            };

            // fetch fields
            const fields = await lastValueFrom(
                from(rows).pipe(
                    map(c => from(mapContent(c))),
                    mergeMap(x => x),
                    toArray()
                ));

            return [
                fields,
                count
            ];
        }
        catch (ex: any) {
            console.log(ex);
            throw new Error(`Cannot to search contents. `);
        }
    }

    async saveAsync(identifier: string, params: ISaveContentParams): Promise<Content> {
        try {
            const content = await this.contents.update(
                {
                    contentId: params.contentId,
                },
                {
                    thumbnail: params.thumbnail,
                    description: params.description,
                    status: params.status,
                    title: params.title,
                    publishIn: params.publishIn,
                    metadata: params.metadata,
                }
            );

            const c = await this.contents.findOne(params.contentId);
            if (!c) throw new Error("Cannot update content");

            await this.fields.delete({
                contentId: params.contentId
            });

            for (const item of params.fields) {
                await this.fields.insert(new FieldEntity({
                    contentId: params.contentId,
                    name: item.name,
                    value: item.value,
                    schemeId: item.schemeId,
                    taxonomyId: c.taxonomyId
                }));
            }

        }
        catch (ex: any) {
            throw new Error("Cannot to save content in repository.");
        }

        return new Content();
    }

    async createAsync(identifier: string, params: ICreateContentParams): Promise<Content | null> {
        try {
            const content = await this.contents.save(new ContentEntity({
                createdBy: params.userId,
                thumbnail: params.thumbnail,
                description: params.description,
                status: params.status,
                title: params.title,
                identifier,
                publishIn: params.publishIn,
                metadata: params.metadata,
                taxonomyId: params.taxonomyId,
            }));

            for (const item of params.fields) {
                await this.fields.insert(new FieldEntity({
                    contentId: content.contentId,
                    name: item.name,
                    value: item.value,
                    schemeId: item.schemeId,
                    taxonomyId: params.taxonomyId
                }));
            }
        }
        catch {
            throw new Error("Cannot to create content.");
        }

        return null;
    }

    async deleteAsync(contentId: string): Promise<void> {
        try {
            this.contents.delete({
                contentId
            });
        }
        catch {
            throw new Error("Error occurered");
        }
    }
}
