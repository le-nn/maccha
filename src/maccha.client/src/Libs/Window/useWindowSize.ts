import { height } from "@mui/system";
import { useEffect, useState } from "react";
import { Window } from ".";

export const useWindowsSize = () => {
    const [size, setSize] = useState({
        width: Window.innerWidth,
        height: Window.innerHeight,
    });

    useEffect(() => {
        const sizeChanged = () => {
            setSize({
                width: Window.innerWidth,
                height: Window.innerHeight,
            });
        };
        window.addEventListener("resize", sizeChanged);
        return () => Window.removeEventListener("resize", sizeChanged);
    }, []);

    return size;
};