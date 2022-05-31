
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Box,
    css,
    Typography,
    CircularProgress,
    useTheme
} from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";

interface FileDropArea {
    onChange?: (path: File) => void;
    commited?: (file: File | null) => void;
    onClear?: () => void;
    showCommand?: boolean;
    image?: string;
}

export function FileDropArea(props: FileDropArea) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const fileInput = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isDragEntered, setIsDragEntered] = useState(false);
    function setImage(file?: File) {
        if (!file) {
            return;
        }
        setFile(file);
        props.onChange && props.onChange(file);
    }

    function Loading() {
        if (isLoading && props.image) {
            return (
                <Box
                    display="flex"
                    justifyContent="center"
                    overflow="hidden"
                    position="absolute"
                    top="0px"
                    left="0px"
                    right="0px"
                    bottom="0px"
                    style={{
                        background: theme.palette.background.paper
                    }}>
                    <CircularProgress style={{
                        margin: "auto"
                    }} size={120} />
                </Box>
            );
        }
        return <></>;
    }

    return (
        <>
            <Box position="relative" display="flex" justifyContent="center" flexDirection="column">
                {
                    !props.image ?
                        <div
                            css={classes.fileContainer}
                            onDragOver={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsDragEntered(true);
                            }}
                            onDragLeave={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsDragEntered(false);
                            }}
                            onDrop={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                setImage(e.dataTransfer.files[0]);
                            }}
                            style={{ borderStyle: isDragEntered ? "solid" : "dashed" }}
                        >
                            <CloudUploadOutlined
                                color="primary"
                                fontSize="large"
                                css={isDragEntered ? classes.cloudIcon : ""}
                            />
                            <Box mt={2} mx={2} display="flex" flexDirection="column" alignItems="center">
                                <Typography
                                >アップロードするファイルをドロップ</Typography>
                                <Typography
                                    style={{ marginTop: "8px" }}
                                    variant="caption"
                                >
                                    または
                                </Typography>
                                <Button
                                    style={{ marginTop: "8px" }}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setIsLoading(true);
                                        fileInput?.current?.click();
                                    }}
                                >
                                    <input
                                        ref={fileInput}
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={e => setImage((e.target as any).files[0])}
                                    />
                                    画像を選択
                                </Button>
                            </Box>
                        </div>
                        :
                        <img
                            alt="preview"
                            height="240"
                            src={props.image}
                            style={{ width: "100%", objectFit: "contain" }}
                            onError={() => setIsLoading(false)}
                            onLoad={() => setIsLoading(false)}
                        >
                        </img>
                }

                <Box mt={2} display="flex">
                    {
                        props.image && <Button
                            fullWidth={!props.showCommand}
                            color="primary"
                            onClick={() => {
                                setFile(null);
                                props.onClear && props.onClear();
                            }}
                        >
                            Clear
                        </Button>
                    }
                    {
                        props.showCommand && <Box ml="auto">
                            <Button
                                color="primary"
                                onClick={() => {
                                    props.commited && props.commited(null);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                style={{ marginLeft: "8px" }}
                                disabled={!file}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    file && props.commited && props.commited(file);
                                }}
                            >
                                OK
                            </Button>
                        </Box>
                    }
                </Box>
                <Loading />
            </Box>
        </>
    );
}

const useStyles = (theme: any) => ({
    "fileContainer": css({
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: `4px dashed ${theme.palette.primary.main}`,
        height: "280px",
        width: "100%"
    }),
    "cloudIcon": css({
        animationName: "$cloudicon",
        animationTimingFunction: "ease-in-out",
        animationDuration: "0.8s",
        animationDirection: "alternate",
        animationIterationCount: "infinite"
    }),
    "@keyframes cloudicon": css({
        "0%": {
            transform: "translate(0, 0px)"
        },
        "100%": {
            transform: "translate(0, -15px)"
        }
    })
});