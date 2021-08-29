/// <reference types="react" />
import { User } from "../../../Models/users/user";
interface UserSettingPanelProps {
    onChange: (key: keyof User, value: any) => void;
}
export declare const UserSettingPanel: (props: UserSettingPanelProps) => JSX.Element;
export {};
