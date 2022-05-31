import { Interpolation, Theme } from "@emotion/react";
import clsx from "clsx";
import React, { CSSProperties } from "react";
import { ScrollTrigger } from "./ScrollTrigger";

interface AnimationStateStyle<T> {
    entering?: T;
    entered?: T;
    exiting?: T;
    exited?: T;
    unmounted?: T;
}

interface ScrollTriggerTransisionProps {
    animationStyle?: AnimationStateStyle<CSSProperties>;
    animationEmotionCss?: AnimationStateStyle<Interpolation<Theme>>;
    animationClassName?: AnimationStateStyle<string>;

    emotionCss?: Interpolation<Theme>;
    className?: string;
    style?: CSSProperties;

    easing?: string;
    duration?: number;
    delay?: number;

    children: React.ReactNode;
    scrollThreshold?: number;
    once?: boolean;
    forceIn?: boolean;

    /**
     * @example
     * 100vh + 20px
     * 80vh + 20px + 30%
     * 
     * [(%|px|vh)|number]
     */
    scrollStartOffset?: string | number;

    /**
     * @example
     * 100vh + 20px
     * 80vh + 20px + 30%
     * 
     * [(%|px|vh)|number]
     */
    scrollEndOffset?: string | number;
}

export const ScrollTriggerTransition = (props: ScrollTriggerTransisionProps) => {
    return <ScrollTrigger
        once={props.once}
        delay={props.delay}
        forceIn={props.forceIn}
        scrollEndOffset={props.scrollEndOffset}
        scrollStartOffset={props.scrollStartOffset}
    >
        {state => (
            <div
                className={clsx([props.className, (props.animationClassName ?? {})[state]])}
                css={[props.emotionCss, (props.animationEmotionCss ?? {})[state]]}
                style={{
                    ...props.style,
                    ...((props.animationStyle ?? {})[state]),
                    ...{
                        transition: `all ${props.duration ?? 800}ms ${props.easing ?? "cubic-bezier(0.3, 0.13, 0.09, 0.84)"}`
                    },
                }}>
                {props.children}
            </div>
        )}
    </ScrollTrigger>;
};

