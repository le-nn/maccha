import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";

interface ColorPaletteProps {
    colors?: string[];
    value?: string;
    onChange?: (e: string) => void;
    itemSize?: number;
    itemSpace?: number;
}

const defaultColors = [
    "#e91e63",
    "#f44336",
    "#ff5722",
    "#ff9800",
    "#ffc107",
    "#ffeb3b",
    "#cddc39",
    "#4caf50",
    "#009688",
    "#00bcd4",
    "#2196f3",
    "#3f51b5",
    "#9c27b0",
];

const DefaultItemSize = 50;

export function ColorPalette(props: ColorPaletteProps) {
    const styles = useStyles();

    const colors = props.colors ?? defaultColors;

    useEffect(() => {
        if (!props.value || (props.value && !colors.includes(props.value))) {
            props.onChange && props.onChange(colors[0]);
        }
    }, []);

    return (
        <div className={styles.container}>
            {
                colors.map(
                    c => <div
                        className={styles.item}
                        key={c}
                        style={{ padding: props.itemSpace ?? 1 }}
                    >
                        <div
                            style={{
                                width: `${props.itemSize ?? DefaultItemSize}px`,
                                height: `${props.itemSize ?? DefaultItemSize}px`,
                                background: c,
                                border: c === props.value ? "4px solid rgb(40,40,40)" : undefined
                            }}
                            onClick={_ => props.onChange && props.onChange(c)}
                        >
                        </div>
                    </div>
                )
            }
        </div>
    );
}

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    active: {
    },
    item: {
        "cursor": "pointer",
        "&:hover": {
            filter: "brightness(0.9 )"
        }
    }
});