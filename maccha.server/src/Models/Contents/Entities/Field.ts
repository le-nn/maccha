/**
 * express content field.
 */
export class Field {
    readonly fieldId: string = "";
    readonly name: string = "";
    readonly schemeId: string = "";
    readonly value: string = "";

    /**
     * constructor
     * @param value initial value
     */
    constructor(
        params?: Partial<Field>
    ) {
        Object.assign(this, params);
    }

    /**
     * clone with new params.
     * @param params new params.
     */
    public with(params: Partial<Field>): Field {
        const c = new Field(this);
        Object.assign(c, params);
        return c;
    }
}
