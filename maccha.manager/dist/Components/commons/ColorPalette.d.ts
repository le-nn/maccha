/// <reference types="react" />
interface ColorPaletteProps {
    colors?: string[];
    value?: string;
    onChange?: (e: string) => void;
    itemSize?: number;
    itemSpace?: number;
}
export declare function ColorPalette(props: ColorPaletteProps): JSX.Element;
export {};
