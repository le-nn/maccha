import { useEffect, useState } from "react";

const isClient = () => typeof window !== "undefined";

export const useWindowSize = (eventCancelDuration?: number) => {
    const [size, setSize] = useState({
        innerHeight: 0,
        innerWidth: 0,
        outerWidth: 0,
        outerHeight: 0
    });

    useEffect(() => {
        if (!isClient()) {
            return;
        }

        let id = 0;

        const update = () => {
            setSize({
                innerHeight: window.innerHeight,
                innerWidth: window.innerWidth,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight,
            });
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
            }, eventCancelDuration ?? 200) as any;
        };

        handleScroll(); // Re-evaluate trigger when dependencies change
        window.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return size;
};