
export type SchemeType = "switch" | "text-area" | "text-field" | "rich-editor" | "select" | "photo-gallery" | "image";

export class Scheme {
    readonly schemeId: string = "";
    readonly type: SchemeType = "text-field";
    readonly metadata: string = "";
    readonly name: string = "";
    readonly displayName: string = "";
    readonly description: string = "";

    constructor(params?: Partial<Scheme>) {
        Object.assign(this, params);
    }

    clone(params: Partial<Scheme>): Scheme {
        return new Scheme({
            ...this,
            ...params
        });
    }
}

export const schemeTypeDisplayNames: { [key: string]: string } = {
    "text-field": "テキストフィールド",
    "text-area": "テキストエリア",
    "rich-editor": "リッチエディター",
    "switch": "スイッチ",
    "select": "セレクト",
    "photo-gallery": "フォトギャラリー",
    "image": "画像"
};