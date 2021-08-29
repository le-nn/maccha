/// <reference types="react" />
import { Variant } from "@material-ui/core/styles/createTypography";
import { PropTypes } from "@material-ui/core";
interface DateTimeTextProps {
    date?: Date;
    showTime?: boolean;
    align?: PropTypes.Alignment;
    color?: "initial" | "inherit" | "primary" | "secondary" | "textPrimary" | "textSecondary" | "error";
    display?: "initial" | "block" | "inline";
    gutterBottom?: boolean;
    noWrap?: boolean;
    paragraph?: boolean;
    variant?: Variant | "inherit";
    variantMapping?: Partial<Record<Variant, string>>;
    fontSize?: string;
}
export declare function DateTimeText(props: DateTimeTextProps): JSX.Element;
export {};
