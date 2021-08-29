// /// <reference types="react-scripts" />
// declare module "react-router-transition" {
//     import { RouteProps } from "react-router";

//     interface AnimatedSwitchProps {
//         atEnter: React.CSSProperties;
//         atLeave: React.CSSProperties;
//         atActive: React.CSSProperties;
//         didLeave?: (style: React.CSSProperties) => void;
//         className?: HTMLDivElement;
//         wrapperComponent?: keyof HTMLElementTagNameMap;
//         mapStyles?: (styles: React.CSSProperties) => React.CSSProperties;
//         runOnMount?: boolean;
//         children: React.ReactNode;
//     }

//     interface AnimatedRouteProps extends RouteProps { }

//     export function spring(val: number, args: any);

//     export const AnimatedSwitch: React.ComponentClass<AnimatedSwitchProps>;
//     export const AnimatedRoute: React.ComponentClass<AnimatedRouteProps>;
//     export const RouteTransition: React.ComponentClass<AnimatedSwitchProps>;
// }

// declare module "*.scss" {
//     export function use(): void;
//     export function unuse(): void;
//  }