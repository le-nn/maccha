/// <reference types="react" />
interface PostSearchPagingBarProps {
    count: number;
    fetch: number;
    offset: number;
    onChange: (e: {
        fetch: number;
        offset: number;
    }) => void;
}
export declare function PostSearchPagingBar(props: PostSearchPagingBarProps): JSX.Element;
export {};
