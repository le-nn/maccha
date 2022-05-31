import React, { useEffect, useState, useRef } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { css } from "@emotion/react";
import { Grow } from "@mui/material";

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
}

/**
 * Wrap items grid.
 */
export const ItemsWrapGrid = <T extends { id: string }>(props: ItemsWrapGridProps<T>) => {
    const { itemSlot, items } = props;
    const container = useRef<HTMLDivElement | null>(null);
    const [itemWidth, setItemWidth] = useState<string | null>(null);

    useEffect(() => {
        const id =
            setInterval(() => {
                updateWidth(itemWidth);
            }, 200);
        return () => clearInterval(id);
    }, [itemWidth, props.segmentLength]);

    const updateWidth = (itemWidth: string | null) => {
        const segmentLength = props.segmentLength ?? 220;
        const rect = container.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const size = 100 / (Math.floor(width / (segmentLength)));
            const sizeStr = `${size}%`;
            if (itemWidth !== sizeStr) {
                setItemWidth(`${size}%`);
            }
        }
    };

    return (
        <div css={containerStyle} ref={container}>
            <Flipper
                flipKey={`${items.length}_${itemWidth}`}
                css={containerStyle}
            >
                {items.map(
                    post => (
                        <Flipped
                            key={post.id}
                            flipId={post.id}
                            translate={!!itemWidth}
                        >
                            <div style={{ width: itemWidth ?? "", padding: `${props.space ?? 12}px` }}>
                                <Grow in={!!itemWidth}>
                                    <div>
                                        {itemSlot(post)}
                                    </div>
                                </Grow>
                            </div>
                        </Flipped>
                    )
                )}
            </Flipper>
        </div >
    );
};
