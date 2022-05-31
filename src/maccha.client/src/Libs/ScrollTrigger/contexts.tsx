import React, { useContext } from "react";
import { FadeAndSlideScrollTriggerAnimation } from "StaticPages/Components/FadeAndSlideScriollTriggerAnimation";

export interface ScrollContainerContext {
    scrollStartPosition?: number;
    scrollEndPosition?: number;
    rawElement?: HTMLDivElement;
    debug: boolean;
    getScrollHeight: () => number,
    scrollTo: (y: number) => void;
    scrollToBottom: () => void;
    scrollDirection: "down" | "up";
}

export const ScrollContext = React.createContext<ScrollContainerContext>({
    getScrollHeight: () => 0,
    scrollTo: y => { },
    scrollToBottom: () => { },
    scrollDirection: "down",
    debug: false,
});

export const useScrollContext = () => useContext(ScrollContext);