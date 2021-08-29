/// <reference types="react" />
import { PostType } from "../../../Models/posts/entities/PostType";
interface PostTypeBasicSettingPanelProps {
    postType: PostType;
    onChange: (postType: PostType) => void;
}
export declare function PostTypeBasicSettingPanel(props: PostTypeBasicSettingPanelProps): JSX.Element;
export {};
