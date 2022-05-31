import { observable, computed, action, makeAutoObservable } from "mobx";
import { PostsRepository } from "../Repositories/PostsRepository";
import { Content } from "Apps/Models/Domain/Contents/Entities/Content";
import { Taxonomy } from "Apps/Models/Domain/Contents/Entities/Taxonomy";
import { Field } from "Apps/Models/Domain/Contents/Entities/Field";

/**
 * Users serive.
 */
export class PostsEditServic {
    private readonly repository = new PostsRepository();
    private _content: Content | null = null;
    private isNew = false;
    private _taxonomy: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public get content(): Content | null {
        return this._content;
    }

    public get taxonomy() {
        return this._taxonomy;
    }

    public setContent(content: Content) {
        this._content = content;
    }

    public initializeAsNewPost(taxonomy: Taxonomy) {
        this.setContent(new Content({
            fields: taxonomy.schemes.map(s => new Field({
                name: s.name,
                schemeId: s.schemeId,
                value: ""
            }))
        }));
        this._taxonomy = taxonomy.name;
        this.isNew = true;
    }

    public clear() {
        this._content = null;
        this.isNew = false;
        this._taxonomy = null;
    }

    public async fetchAsync(taxonomy: string, contentId: string) {
        try {
            this._taxonomy = taxonomy;
            const content = await this.repository.fetchPostAsync(taxonomy, contentId);
            this.setContent(content);
        }
        catch {
            console.error("failed to search posts.");
        }
    }

    public async saveAsync() {
        const content = this.content;
        if (content === null) {
            throw new Error("post is not selected or initialized.");
        }
        else if (this.taxonomy === null) {
            throw new Error("post type is not selected.");
        }

        try {
            if (this.isNew) {
                await this.repository.createPostAsync(
                    this.taxonomy,
                    new Content({
                        taxonomyId: content.taxonomyId,
                        description: content.description,
                        updatedAt: content.updatedAt as any,
                        createdAt: content.createdAt as any,
                        publishIn: content.publishIn as any ?? null,
                        fields: content.fields.map(x => new Field({
                            name: x.name,
                            schemeId: x.schemeId,
                            value: x.value
                        })),
                        status: content.status,
                        thumbnail: content.thumbnail,
                        title: content.title,
                        metadata: content.metadata
                    })
                );
            }
            else {
                await this.repository.saveAsync(
                    this.taxonomy,
                    new Content({
                        contentId: content.contentId,
                        taxonomyId: content.taxonomyId,
                        description: content.description,
                        updatedAt: content.updatedAt as any,
                        createdAt: content.createdAt as any,
                        publishIn: content.publishIn as any ?? null,
                        fields: content.fields.map(x => new Field({
                            name: x.name,
                            schemeId: x.schemeId,
                            value: x.value
                        })),
                        status: content.status,
                        thumbnail: content.thumbnail,
                        title: content.title,
                        metadata: content.metadata
                    })
                );
            }
        }
        catch {
            console.error("failed to search posts.");
        }
    }

    public async deleteAsync() {
        // :TODO delete current context
    }
}
