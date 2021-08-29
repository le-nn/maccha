/// <reference types="react" />
import { WebSite } from "../../../Models/sites/web-site";
interface WebSiteSettingPanelProps {
    onChange: (key: keyof WebSite, value: any) => void;
}
export declare function WebSiteSettingPanel(props: WebSiteSettingPanelProps): JSX.Element;
export {};
