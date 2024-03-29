import React, { useState, useEffect } from "react";
import { Box, Input, Button, Divider, makeStyles, Backdrop } from "@mui/material";
import { observer } from "mobx-react";
import { services } from "../../../Services";
import { PhotoGridView } from "../../commons";
import { Flipped, Flipper } from "react-flip-toolkit";
import { timer } from "rxjs";
import { axios } from "../../../Repositories/config";
import { css } from "@mui/styled-engine";
import { EmptyItemsPanel } from "Apps/Components/commons/EmptyItemsPanel";
import { useTranslation } from "react-i18next";

const base = axios.defaults.baseURL;

export const ImageGrid = observer(() => {
    const [path, setPath] = useState("");
    const [selected, setSelected] = useState<string | null>(null);
    const { t } = useTranslation();
    useEffect(() => {
        services.mediaService.fetchAllFilesAsync();
    }, []);

    if (!services.mediaService.files.length) {
        return (
            <Box mt={2} display="flex" flexWrap="wrap" width="100%"  height="100%" justifyContent={"center"} alignItems={"center"}>
                <EmptyItemsPanel message={t("ファイルがありません")} />
            </Box>
        );
    }

    return (
        <Box mt={2} display="flex" flexWrap="wrap" width="100%">
            <PhotoGridView
                multiSelect
                baseUrl={base === "/" ? "" : base}
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
                        src={base === "/" ? path : base + path}
                        alt={path}
                        css={img}
                    />
                </div>
            </Backdrop>
        </Box>
    );
});

const img = css({
    height: "90%",
    width: "90%",
    objectFit: "contain"
});