/// <reference types="react" />
import { PostType } from "../../../Models/posts/entities/PostType";
interface SchemeSettingPanelProps {
    postType: PostType;
    onChange: (scheme: PostType) => void;
}
/**
 * Provides scheme settings.
 * @param props props
 */
export declare function SchemeSettingPanel(props: SchemeSettingPanelProps): JSX.Element;
export {};
