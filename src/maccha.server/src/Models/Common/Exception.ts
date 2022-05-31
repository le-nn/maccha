export class Exception<TErrorType = void> extends Error {
    constructor(
        readonly message: string,
        readonly display: string,
        readonly type: TErrorType | null = null,
        readonly innerException: Error | null = null
    ) {
        super(message);
    }
}