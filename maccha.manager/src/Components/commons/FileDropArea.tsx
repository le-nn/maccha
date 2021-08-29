
import React, { useEffect, useRef, useState } from "react";
import { useObserver } from "mobx-react";
import {
    Button,
    Box,
    makeStyles,
    Typography,
    CircularProgress,
    useTheme
} from "@material-ui/core";
import { CloudUploadOutlined } from "@material-ui/icons";

interface FileDropArea {
    onChange?: (path: File) => void;
    commited?: (file: File | null) => void;
    showCommend?: boolean;
}

export function FileDropArea(props: FileDropArea) {
    const classes = useStyles();
    const fileInput = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isDragEntered, setIsDragEntered] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const theme = useTheme();

    function setImage(file?: File) {
        if (!file) {
            return;
        }
        setFile(file);
        props.onChange && props.onChange(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
            setImgUrl(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    function Loading() {
        if (isLoading && imgUrl === "") {
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
            <Box display="flex" justifyContent="center" flexDirection="column">
                {
                    imgUrl === "" ?
                        <div
                            className={classes.fileContainer}
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
                                className={isDragEntered ? classes.cloudIcon : ""}
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
                            height="280"
                            src={imgUrl}
                            style={{ width: "100%", objectFit: "cover" }}
                            onError={() => setIsLoading(false)}
                            onLoad={() => setIsLoading(false)}
                        >
                        </img>
                }

                <Box mt={2} display="flex">
                    {
                        file && <Button
                            fullWidth={!props.showCommend}
                            color="primary"
                            onClick={() => {
                                setFile(null);
                                setImgUrl("");
                            }}
                        >
                            Clear
                        </Button>
                    }
                    {
                        props.showCommend && <Box ml="auto">
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
            </Box>
            <Loading />
        </>
    );
}

const useStyles = makeStyles(
    theme => ({
        "fileContainer": {
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            border: `4px dashed ${theme.palette.primary.main}`,
            height: "280px",
            width: "100%"
        },
        "cloudIcon": {
            animationName: "$cloudicon",
            animationTimingFunction: "ease-in-out",
            animationDuration: "0.8s",
            animationDirection: "alternate",
            animationIterationCount: "infinite"
        },
        "@keyframes cloudicon": {
            "0%": {
                transform: "translate(0, 0px)"
            },
            "100%": {
                transform: "translate(0, -15px)"
            }
        }
    })
);