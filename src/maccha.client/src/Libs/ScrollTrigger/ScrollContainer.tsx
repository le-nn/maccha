import React, { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { ScrollContainerContext, ScrollContext } from "./contexts";
import { css } from "@mui/styled-engine";

interface ScrollContainerProps {
    children: React.ReactNode | React.ReactNodeArray;
    style?: CSSProperties;
    className?: string;
    scrollStartPosition?: number;
    scrollEndPosition?: number;
    debug?: boolean;
}

export const ScrollContainer = (props: ScrollContainerProps) => {
    const [option, setOption] = useState<ScrollContainerContext>({
        getScrollHeight: () => 0,
        scrollTo: y => { },
        scrollToBottom: () => { },
        scrollDirection: "down",
        debug: false,
    });
    const scrollY = useRef<number>(0);

    const scrollTo = (y: number) => {
        option.rawElement?.scrollTo(0, y);
    };

    const getScrollHeight = (): number => {
        return option.rawElement?.scrollHeight ?? 0;
    };

    const scrollToBottom = (): number => {
        return option.rawElement?.scrollTop ?? 0;
    };

    useEffect(() => {
        setOption({
            ...option,
            getScrollHeight,
            scrollTo,
            scrollToBottom,
        });
    }, [option.rawElement]);

    useEffect(
        () => {
            setOption(state => ({
                ...state,
                scrollEndPosition: props.scrollEndPosition,
                scrollStartPosition: props.scrollStartPosition,
                debug: props.debug ?? false,
            }));
        },
        [
            props.scrollEndPosition,
            props.scrollStartPosition,
            props.debug
        ]);

    useEffect(() => {
        let id = 0;
        const container = option.rawElement;
        const update = () => {
            if (scrollY.current < (container?.scrollTop ?? 0)) {
                if (option.scrollDirection !== "down") {
                    setOption(option => ({
                        ...option,
                        scrollDirection: "down",
                    }));
                }
            }
            else {
                if (option.scrollDirection !== "up") {
                    setOption(option => ({
                        ...option,
                        scrollDirection: "up",
                    }));
                }
            }
            scrollY.current = (container?.scrollTop ?? 0);
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
            }, 500) as any;
        };

        handleScroll(); // Re-evaluate trigger when dependencies change
        container?.addEventListener('scroll', handleScroll);
        return () => {
            container?.removeEventListener('scroll', handleScroll);
        };
    }, [option]);

    return (
        <div
            style={props.style}
            className={props.className}
        >
            <div
                css={css({
                    position: "relative",
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "100%",
                    width: "100%",
                })}
                ref={node => {
                    if (node && !option.rawElement) {
                        setOption({
                            ...option,
                            rawElement: node,
                            scrollTo,
                            getScrollHeight,
                            scrollToBottom,
                        });
                    }
                }}
            >
                <ScrollContext.Provider value={option}>
                    {props.children}
                </ScrollContext.Provider>

                {option.debug && <Debug
                    {...option}
                />}
            </div >
        </div>
    );
};

const Debug = (props: Partial<ScrollContainerProps>) => {
    return (
        <>
            {/* debug */}
            {
                <div style={{
                    background: "rgba(255,255,255,0.6)",
                    zIndex: 9999999,
                    position: "sticky",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    marginLeft: "auto",
                    height: "100%",
                    width: "60px",
                }}>
                    {/* end */}
                    <div style={{
                        borderTop: "2px solid #f54646",
                        top: "0px",
                        width: "60px",
                        position: "absolute",
                        fontSize: "10px",
                        paddingLeft: "8px"
                    }}>
                        end
                    </div>

                    {/* end */}
                    <div style={{
                        borderTop: "2px solid #f54646",
                        top: `${props.scrollEndPosition ?? 10}%`,
                        width: "60px",
                        position: "absolute",
                        fontSize: "10px",
                        paddingLeft: "8px"
                    }}>
                        end
                    </div>

                    {/* start */}
                    <div style={{
                        borderTop: "2px solid #0f8fe4",
                        top: `${props.scrollStartPosition ?? 90}%`,
                        width: "60px",
                        position: "absolute",
                        fontSize: "10px",
                        paddingLeft: "8px"
                    }}>
                        start
                    </div>
                </div>
            }
        </>
    );
};