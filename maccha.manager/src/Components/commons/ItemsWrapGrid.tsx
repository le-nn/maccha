import React, { useEffect, useState, useRef, ReactComponentElement, cloneElement } from "react";
import {
    makeStyles,
    useTheme,
    Box, Grow
} from "@material-ui/core";
import { Flipper, Flipped } from "react-flip-toolkit";

interface ItemsWrapGridProps<T extends { id: string }> {
    itemSlot: (item: T) => JSX.Element;
    items: T[];
    segmentLength?: number;
    space?: number;
}

/**
 * Wrap items grid.
 */
export function ItemsWrapGrid<T extends { id: string }>(props: ItemsWrapGridProps<T>) {
    const classes = useStyles();
    const { itemSlot, items } = props;
    const container = useRef<HTMLDivElement | null>(null);
    const [itemWidth, setItemWidth] = useState("100%");

    useEffect(() => {
        updateWidth(itemWidth);

        const id = setInterval(() => {
            updateWidth(itemWidth);
        }, 200);

        return () => clearInterval(id);
    }, [itemWidth]);

    const segmentLength = props.segmentLength ?? 220;
    function updateWidth(itemWidth: string) {
        const rect = container.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const size = 100 / (Math.floor(width / (segmentLength)));
            const sizeStr = `${size}%`;
            if (itemWidth !== sizeStr) {
                setItemWidth(`${size}%`);
            }
        }
    }

    return (
        <div className={classes.container} ref={container}>
            <Flipper
                flipKey={`${items.length}_${itemWidth}`}
                className={classes.container}
            >
                {items.map(
                    (post, i) => (
                        <Flipped
                            key={post.id}
                            flipId={post.id}
                            translate
                        >
                            <div style={{ width: itemWidth, padding: `${props.space ?? 12}px` }}>
                                {itemSlot(post)}
                            </div>
                        </Flipped>
                    )
                )}
            </Flipper>
        </div >
    );
}

const useStyles = makeStyles({
    container: {
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "start"
    },
});