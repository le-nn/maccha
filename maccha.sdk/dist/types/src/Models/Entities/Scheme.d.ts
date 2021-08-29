export declare type SchemeType = "switch" | "text-area" | "text-field" | "rich-editor" | "select" | "photo-gallery" | "image";
export declare class Scheme {
    readonly schemeId: string;
    readonly type: SchemeType;
    readonly metadata: string;
    readonly name: string;
    readonly displayName: string;
    readonly description: string;
    constructor(params?: Partial<Scheme>);
    clone(params: Partial<Scheme>): Scheme;
}
export declare const schemeTypeDisplayNames: {
    [key: string]: string;
};
