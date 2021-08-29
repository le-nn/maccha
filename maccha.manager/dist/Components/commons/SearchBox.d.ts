/// <reference types="react" />
interface SearchBoxProps {
    placeholder?: string;
    changed?: (e: string) => void;
    invoked?: () => void;
    value?: string;
    elevation?: number;
    style?: any;
}
export declare function SearchBox(props: SearchBoxProps): JSX.Element;
export {};
