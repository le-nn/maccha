import React, { useEffect, useState, useRef, ReactComponentElement, cloneElement } from "react";
import {
    useTheme,
    Box, Grow
} from "@mui/material";
import { Flipper, Flipped } from "react-flip-toolkit";
import jsx, { css } from "@emotion/react";
import useResizeObserver from "use-resize-observer";
import { CSSProperties } from "@mui/styled-engine";

const containerStyle = css`
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: start;
`;

interface ItemsWrapGridProps<T extends { id: string }> {
    itemSlot: (item: T) => JSX.Element;
    items: T[];
    segmentLength?: number;
    space?: number;
    className?: string;
    style?: CSSProperties;
}

/**
 * Wrap items grid.
 */
export const ItemsWrapGrid = <T extends { id: string }>(props: ItemsWrapGridProps<T>) => {
    const { itemSlot, items } = props;
    const [itemWidth, setItemWidth] = useState("100%");

    const { ref, width } = useResizeObserver();

    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!width) {
            return;
        }

        const size = 100 / (Math.floor(Number(width) / (segmentLength)));
        if (size === Infinity) {
            setItemWidth(`100%`);
            return;
        }

        const sizeStr = `${size}%`;
        if (itemWidth !== sizeStr) {
            setItemWidth(`${size}%`);
        }
    }, [width, itemWidth, isInitialized]);

    const segmentLength = props.segmentLength ?? 220;

    return (
        <div
            css={containerStyle}
            ref={ref}
            className={props.className}
        >
            <Flipper
                flipKey={`${items.length}_${itemWidth}`}
                css={containerStyle}
                onComplete={e => {
                    if (!isInitialized) {
                        setIsInitialized(true);
                    }
                }}

            >
                {items.map(
                    (post, i) => (
                        <Flipped
                            shouldFlip={() => isInitialized}
                            key={post.id}
                            flipId={post.id}
                            translate
                        >
                            <div
                                css={css({
                                    transition: "opacity 1s",
                                    opacity: isInitialized ? 1 : 0,
                                    width: itemWidth,
                                    padding: `${props.space ?? 12}px`
                                })}
                            >
                                {itemSlot(post)}
                            </div>
                        </Flipped>
                    )
                )}
            </Flipper>
        </div >
    );
};
