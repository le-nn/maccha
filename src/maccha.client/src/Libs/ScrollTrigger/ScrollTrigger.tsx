import { useScrollContext } from "./contexts";
import { Marker } from "./debug";
import { Transition, TransitionStatus } from 'react-transition-group';
import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { useScrollTrigger } from "./useScrollTrigger";
import { css } from "@mui/styled-engine";

const randomColor = ()=>"#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);

interface ScrollInfo {
    scrollDirection: "up" | "down";
    scrollProgress: number;
    isOverlap: boolean;
}

interface ScrollTriggerProps {
    children: ((status: TransitionStatus, scrollInfo: ScrollInfo) => ReactNode);
    delay?: number;
    once?: boolean;
    forceIn?: boolean;
    scrollStartOffset?: number | string;
    scrollEndOffset?: number | string;
    className?: string;
    style?: CSSProperties;
}

export const ScrollTrigger = (props: ScrollTriggerProps) => {
    const [me, setMe] = useState<HTMLDivElement | null>(null);
    const context = useScrollContext();
    const trigger = useScrollTrigger({
        target: me ?? undefined,
        scrollStartOffset: props.scrollStartOffset,
        scrollEndOffset: props.scrollEndOffset,
    });
    const [mount, setMount] = useState(false);
    const color = useRef(randomColor());

    useEffect(() => {
        if (!trigger.isOverlap && props.once) {
            return;
        }
        setMount(trigger.isOverlap);
    }, [trigger]);

    useEffect(() => {
        if (props.forceIn) {
            setMount(true);
        }
    }, []);

    return (
        <div
            css={context.debug ?
                css({
                    position: "relative",
                    border: `3px solid ${color.current}`
                }) :
                css({
                    position: "relative",
                })}
            className={props.className}
            style={props.style}
            ref={raw => {
                if (raw) {
                    setMe(raw);
                }
            }}
        >
            <Transition
                in={mount}
                timeout={props.delay ?? 0}
            >
                {state => props.children(state, trigger)}
            </Transition>
            {
                context.debug && <Marker
                    color={color.current}
                    scrollEndOffset={props.scrollEndOffset}
                    scrollStartOffset={props.scrollStartOffset}
                    target={me ?? undefined}
                    container={context.rawElement}
                />
            }
        </div>
    );
};
