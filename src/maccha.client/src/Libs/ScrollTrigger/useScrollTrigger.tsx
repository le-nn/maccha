import React, { useEffect } from "react";
import { ScrollContainerContext, useScrollContext } from "./contexts";

interface ScrollInfo {
    scrollDirection: "up" | "down";
    scrollProgress: number;
    isOverlap: boolean;
}

const toPixel = (
    param: string | number,
    container: HTMLElement,
    target: HTMLElement
): number => {
    if (typeof param === "number") {
        return param;
    }

    const ammount = Number(param.replace(/[a-zA-Z|%]/g, ""));
    const unit = param.replace(/[^a-zA-Z|%]/g, "");
    switch (unit) {
        case "vh": {
            const containerHeight = container.clientHeight;
            return containerHeight * ammount * 0.01;
        }
        case "px": {
            return ammount;
        }
        case "%": {
            const targetHeight = target.clientHeight;
            return targetHeight * ammount * 0.01;
        }
        default: return ammount;
    }
};

export const parse = (expression: string | number,
    container: HTMLElement,
    target: HTMLElement) => {
    if (typeof expression === "number") {
        return expression;
    }

    const blocks = expression.split(" ");
    let sum = toPixel(blocks[0], container, target);
    for (let i = 1; i < blocks.length - 1; i++) {
        switch (blocks[i]) {
            case "+":
                sum += toPixel(blocks[i + 1], container, target);
                break;
            case "-":
                sum -= toPixel(blocks[i + 1], container, target);
                break;
            case "*":
                sum *= toPixel(blocks[i + 1], container, target);
                break;
            case "/":
                sum /= toPixel(blocks[i + 1], container, target);
                break;
            case "%":
                sum %= toPixel(blocks[i + 1], container, target);
                break;
            default:
                sum += toPixel(blocks[i + 1], container, target);
                break;
        }
    }

    return sum;
};

const defaultTrigger = (
    store: any,
    targetOptions: ScrollTriggerOption,
    containerOptions: ScrollContainerContext): ScrollInfo | null => {
    const { target } = targetOptions;
    const container = containerOptions.rawElement;
    const previous = store.current;

    let isFire = false;
    let progress = 0;
    if (target && container) {
        const targetEndOffset = parse(targetOptions.scrollEndOffset ?? 0, container, target);
        const targetStartOffset = parse(targetOptions.scrollStartOffset ?? 0, container, target);
        const containerStartPosition = containerOptions.scrollStartPosition ?? 90;
        const containerEndPosition = containerOptions.scrollEndPosition ?? 10;

        store.current = container.scrollTop;

        const containerAbsoluteRect = container.getBoundingClientRect();
        const targetAbsoluteRect = target.getBoundingClientRect();

        // 画面外だったら
        if (!targetOptions.fireWhenOutsideOfScreen && (
            window.innerHeight < targetAbsoluteRect.top
            || targetAbsoluteRect.top + targetAbsoluteRect.height < 0
        )) {
            return null;
        }

        const offsetTop = targetAbsoluteRect.y - containerAbsoluteRect.y;

        const containerStart = container.clientHeight * (containerStartPosition * 0.01);
        const containerEnd = container.clientHeight * (containerEndPosition * 0.01);
        const targetStart = (offsetTop + targetStartOffset);
        const targetEnd = (offsetTop + targetEndOffset);

        const scrollableRange = containerStart - containerEnd - (targetStartOffset - targetEndOffset);
        progress = (targetEnd - containerEnd) / scrollableRange;
        if (containerStart > targetStart) {
            if (containerEnd < targetEnd) {
                isFire = true;
            }
        }
    }

    return {
        scrollDirection: store.current < previous ? "down" : "up",
        scrollProgress: 1 - Math.max(0, Math.min(progress, 1)),
        isOverlap: isFire,
    };
};

interface ScrollTriggerOption {
    target?: HTMLElement;
    scrollStartOffset?: string | number;
    scrollEndOffset?: string | number;
    scrollEventPerSecond?: number;
    fireWhenOutsideOfScreen?: boolean;
}

export const useScrollTrigger = (options: ScrollTriggerOption = {}) => {
    const store = React.useRef();
    const context = useScrollContext();
    const [trigger, setTrigger] = React.useState<ScrollInfo>(() =>
        defaultTrigger(store, options, context) ?? {
            isOverlap: false,
            scrollDirection: "down",
            scrollProgress: 0,
        });
    const container = context.rawElement;

    useEffect(() => {
        let id = 0;

        const update = () => {
            const t = defaultTrigger(store, options, context);
            if (t) {
                setTrigger(t);
            }
        };

        const handleScroll = () => {
            if (id !== 0) {
                return;
            }
            else {
                update();
            }

            id = setTimeout(() => {
                update();
                id = 0;
            }, 1000 / (options.scrollEventPerSecond ?? 8)) as any;
        };

        handleScroll(); // Re-evaluate trigger when dependencies change
        container?.addEventListener('scroll', handleScroll);
        return () => {
            container?.removeEventListener('scroll', handleScroll);
        };
    }, [container, options.scrollEventPerSecond, options.target]);

    return trigger;
};