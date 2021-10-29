import { useScrollTrigger } from "@mui/material";
import React, { useContext,useEffect,useState } from "react";
import { Transition, TransitionStatus } from 'react-transition-group';
import { CSSProperties } from "@mui/material";

const ScrollContext = React.createContext<HTMLElement | null>(null);

interface ScrollContainer {
    children: React.ReactNode | React.ReactNodeArray;
    style?: CSSProperties;
}

const ScrollContainer = React.forwardRef((props: ScrollContainer) => {
    const [scrollTarget, setScrollTarget] = useState<HTMLDivElement | null>(null);

    return (
        <div
            ref={node => {
                if (node) {
                    setScrollTarget(node);
                }
            }} {...props} >
            <ScrollContext.Provider value={scrollTarget}>
                {props.children}
            </ScrollContext.Provider>
        </div >
    );
});

interface AnimatoinProps {
    duration?: number;
    delay?: number;
    children: React.ReactNode;
    scrollThreshold?: number;
    style?: CSSProperties;
    className?: string;
    once?: boolean;
    forceIn?: boolean;
}

const FLIP_STYLE: { [K in TransitionStatus]: CSSProperties } = {
    entering: {
        transform: 'rotateZ(-0) translateY(0px)',
        opacity: 1
    },
    entered: {
        transform: 'rotateZ(-0) translateY(0px)',
        opacity: 1
    },
    exiting: {
        transform: 'rotateZ(6deg) translateY(40px)',
        opacity: 0
    },
    exited: {
        transform: 'rotateZ(6deg) translateY(40px)',
        opacity: 0
    },
    unmounted: {

    }
};

export const Animation = (props: AnimatoinProps) => {
    const target = useContext(ScrollContext);
    const trigger = useScrollTrigger({
        target: (target ?? undefined) as any,
        threshold: props.scrollThreshold
    });
    const [mount, setMount] = useState(false);

    useEffect(() => {
        if (!trigger && props.once) {
            return;
        }
        setMount(trigger);
    }, [trigger]);

    useEffect(() => {
        if (props.forceIn) {
            setMount(true);
        }
    }, []);

    return (
        <Transition
            in={mount}
            timeout={props.duration ?? 2000}
        >
            {state => (
                <div
                    className={props.className}
                    style={{
                        ...props.style,
                        ...FLIP_STYLE[state],
                        ...{
                            transition: `all ${props.duration ?? 2000}ms ease-in-out`
                        },
                    }}>
                    {props.children}
                </div>
            )}
        </Transition>
    );
};