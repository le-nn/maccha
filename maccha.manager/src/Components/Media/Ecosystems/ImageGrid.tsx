import React, { useState, useEffect } from "react";
import { Box, Input, Button, Divider, makeStyles, Backdrop } from "@material-ui/core";
import { observer } from "mobx-react";
import { services } from "../../../Services";
import { PhotoGridView } from "../../commons";
import { Flipped, Flipper } from "react-flip-toolkit";
import { timer } from "rxjs";
import { axios } from "../../../Repositories/config";

export const ImageGrid = observer(() => {
    const classes = useStyle();
    const [path, setPath] = useState("");
    const [selected, setSelected] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        services.mediaService.fetchAllFilesAsync();
    }, []);

    return (
        <Box mt={2} display="flex" flexWrap="wrap" width="100%">
            <PhotoGridView
                multiSelect
                baseUrl={axios.defaults.baseURL}
                images={services.mediaService.files}
                selected={services.mediaService.selected}
                selectionChanged={selected => services.mediaService.setSelected(selected)}
                invoked={path => {
                    setSelected(path);
                    setPath(path);
                }}
            />

            <Backdrop style={{ zIndex: 9999 }} open={!!selected} onClick={() => {
                setSelected(null);
            }}>
                <div
                    onClick={() => setSelected(null)}
                    style={{
                        zIndex: 9999,
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        margin: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <img
                        onClick={() => setSelected(null)}
                        src={axios.defaults.baseURL + path}
                        alt={path}
                        className={classes.img}
                    />
                </div>
            </Backdrop>
        </Box>
    );
});

const useStyle = makeStyles({
    imgContainer: {
        height: "160px",
    },
    img: {
        height: "90%",
        width: "90%",
        objectFit: "contain"
    }
});