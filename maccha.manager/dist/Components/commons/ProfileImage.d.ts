import React from "react";
interface ProfileImageProp {
    src: string;
    name: string;
    width: string;
    height: string;
    textColor?: string;
    alt?: string;
    backgroundColor?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>;
}
export default function ProfileImage(props: ProfileImageProp): JSX.Element;
export {};
