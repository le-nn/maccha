/// <reference types="react" />
interface PhotoGridViewProps {
    images: string[];
    itemHeight?: number;
    selected?: string[];
    multiSelect?: boolean;
    span?: number;
    hideCheckbox?: boolean;
    disableInvok?: boolean;
    disableSelection?: boolean;
    baseUrl?: string;
    selectionChanged?: (selected: string[]) => void;
    invoked?: (path: string) => void;
    slot?: (image: JSX.Element, item: string) => JSX.Element;
}
export declare function PhotoGridView(props: PhotoGridViewProps): JSX.Element;
export {};
