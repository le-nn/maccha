interface MessageOption {
    description: string;
    okText: string;
}
/**
 * show confirm dialog async.
 * @param message confirm message
 * @param option dialog option
 */
export declare function messageAsync(message: string, option?: Partial<MessageOption>): Promise<void>;
export {};
