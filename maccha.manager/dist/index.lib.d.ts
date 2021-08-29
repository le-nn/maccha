/// <reference types="react" />
import { Route } from "./Models/route";
import "./styles/style.scss";
export interface MacchaCofig {
    host: string;
    plugins: Route[];
    logo?: (isOpen: boolean) => JSX.Element;
}
/**
 * entry pont.
 * @param config config option params.
 */
export declare function MacchaManager(config?: Partial<MacchaCofig>): Promise<() => JSX.Element>;
