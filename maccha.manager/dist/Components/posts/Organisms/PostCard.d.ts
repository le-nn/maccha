/// <reference types="react" />
import { Content } from "../../../Models/Contents/Entities/Content";
interface PostCardProps {
    content: Content;
    deletePresed: () => void;
    editPressed: () => void;
    previewPressed: () => void;
}
export declare function PostCard(props: PostCardProps): JSX.Element;
export {};
