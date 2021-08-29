interface ConfirmOption {
    description: string;
    okText: string;
    cancelText: string;
}
/**
 * show confirm dialog async.
 * @param message confirm message
 * @param option dialog option
 */
export declare function confirmAsync(message: string, option?: Partial<ConfirmOption>): Promise<boolean>;
export {};
