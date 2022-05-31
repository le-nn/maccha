import React from "react";
import { parse } from "./useScrollTrigger";

export const Marker = (props: {
    scrollStartOffset?: number | string;
    scrollEndOffset?: number | string;
    container?: HTMLElement;
    target?: HTMLElement;
    color: string;
}) => {
    const { container, scrollEndOffset, scrollStartOffset, target } = props;

    if (!target || !container) {
        return <></>;
    }

    const targetEndOffset = parse(scrollEndOffset ?? 0, container, target);
    const targetStartOffset = parse(scrollStartOffset ?? 0, container, target);

    return <>
        <div style={{
            borderBottom: `2px solid ${props.color}`,
            top: `${(targetEndOffset ?? 0) - 20}px`,
            width: "100vw",
            position: "absolute",
            fontSize: "10px",
            paddingLeft: "8px",
            zIndex: 999999999,
            right: 0,
            transform: "translateX(80%)",
            textAlign: "left"
        }}>
            end
        </div>
        <div style={{
            borderTop: `2px solid ${props.color}}`,
            top: `${(targetStartOffset ?? 0)}px`,
            width: "100vw",
            position: "absolute",
            fontSize: "10px",
            paddingLeft: "8px",
            zIndex: 999999999,
            right: 0,
            transform: "translateX(80%)",
            textAlign: "left"
        }}>
            start
        </div>
    </>;
};