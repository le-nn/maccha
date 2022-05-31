import React, { useContext } from "react";

export interface MacchaConfig {
    apiServerHost: string;
    pathPrefix: string;
    // plugins: Route[];
    logo?: (isOpen: boolean) => JSX.Element;
}

const OptionContext = React.createContext<MacchaConfig>({
    apiServerHost: "",
    pathPrefix: ""
});

export const OptionProvider = (props: { children: any, option: any }) => {
    return (
        <OptionContext.Provider value={props.option}>
            {props.children}
        </OptionContext.Provider>
    );
};

export const useOption = () => useContext(OptionContext);