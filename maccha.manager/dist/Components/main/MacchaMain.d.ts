/// <reference types="react" />
import { History } from "history";
import { Route } from "../../Models";
interface MacchaMainProp {
    history: History;
    hiddenLazyRoutes: (Route & {
        loadedComponent: any;
    })[];
    settings: Route[];
    menus: Route[];
    logo?: (isOpen: boolean) => JSX.Element;
}
declare const _default: (props: MacchaMainProp) => JSX.Element;
export default _default;
