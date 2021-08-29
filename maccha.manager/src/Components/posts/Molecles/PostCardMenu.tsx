import React, { useEffect, useState, ReactComponentElement, cloneElement } from "react";
import {
    IconButton, useTheme, Fab, Icon,
} from "@material-ui/core";
import { Planet } from "../../commons/Planet";

interface PostCardMenuProps {
    deletePresed: () => void;
    editPressed: () => void;
    previewPressed: () => void;
    disableDeleteButton?: boolean;
    disableEditButton?: boolean;
}

export function PostCardMenu(props: PostCardMenuProps) {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const theme = useTheme();
    const { deletePresed, editPressed, previewPressed } = props;

    return (
        <Planet
            color={theme.palette.secondary.light}
            autoClose
            angle={270}
            rotation={-90}
            orbitRadius={72}
            radius={72 * 0.6666}
            onClose={() => setIsMenuOpened(false)}
            centerContent={
                <Fab color="secondary"
                    size="small"
                    onClick={() => setIsMenuOpened(true)}
                    style={{
                        boxShadow: isMenuOpened ? "none" : undefined,
                        filter: isMenuOpened ? "Brightness(0.8)" : undefined
                    }}
                >
                    <Icon>toc</Icon>
                </Fab>
            }
        >
            {
                !props.disableDeleteButton && <IconButton
                    disabled={props.disableDeleteButton}
                    color="inherit"
                    style={{ color: "white" }}
                    size="small"
                    onClick={() => deletePresed()}
                >
                    <Icon>delete</Icon>
                </IconButton >
            }

            <IconButton
                color="inherit"
                style={{ color: "white" }}
                size="small"
                onClick={() => previewPressed()}
            >
                <Icon>visibility</Icon>
            </IconButton >

            {
                !props.disableEditButton && <IconButton
                    disabled={props.disableEditButton}
                    color="inherit"
                    style={{ color: "white" }}
                    size="small"
                    onClick={() => editPressed()}
                >
                    <Icon>edit</Icon>
                </IconButton >
            }
        </Planet>
    );
}