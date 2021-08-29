/// <reference types="react" />
interface PostCardMenuProps {
    deletePresed: () => void;
    editPressed: () => void;
    previewPressed: () => void;
    disableDeleteButton?: boolean;
    disableEditButton?: boolean;
}
export declare function PostCardMenu(props: PostCardMenuProps): JSX.Element;
export {};
