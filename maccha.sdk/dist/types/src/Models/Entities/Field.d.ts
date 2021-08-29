/**
 * express content field.
 */
export declare class Field {
    readonly fieldId: string;
    readonly name: string;
    readonly schemeId: string;
    readonly value: string;
    /**
     * constructor
     * @param value initial value
     */
    constructor(params?: Partial<Field>);
    /**
     * clone with new params.
     * @param params new params.
     */
    clone(params: Partial<Field>): Field;
}
