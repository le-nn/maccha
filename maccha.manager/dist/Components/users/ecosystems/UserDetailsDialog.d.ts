import { IUser } from "../../../Models/users/user.interface";
declare type DialogUser = IUser & {
    password?: string;
};
export declare function showUserDetailsDialogAsync(user: IUser, isNew?: boolean): Promise<DialogUser | undefined>;
export {};
