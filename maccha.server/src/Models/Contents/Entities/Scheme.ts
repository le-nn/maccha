export class Scheme {
    readonly schemeId: string = "";
    readonly type: string = "";
    readonly name: string = "";
    readonly displayName: string = "";
    readonly description: string = "";
    readonly metadata: string = "";

    constructor(params?: Scheme) {
        Object.assign(this, params);
    }
}