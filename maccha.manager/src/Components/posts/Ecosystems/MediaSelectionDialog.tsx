import { showDialogAsync, DialogContentProp } from "../../commons/showDialog";
import React, { useEffect, useRef, useState } from "react";
import { useObserver } from "mobx-react";
import { services } from "../../../Services";
import {
    Button,
    Box,
    makeStyles,
    Tab,
    Icon, Tabs
} from "@material-ui/core";
import { FileDropArea, PhotoGridView } from "../../commons";
import { theme } from "../../../theme";
import SwipeableViews from "react-swipeable-views";
import { CloudUploadOutlined, LocalDining } from "@material-ui/icons";
import { axios } from "../../../Repositories/config";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;

    return (
        <>
            {value === index && (children)}
        </>
    );
}

/**
 * select media or upload Dialog.
 * @param props props
 */
function MediaSelectionDialog(props: DialogContentProp<MediaSelectDialogProps | undefined, string[]>) {
    const [selected, setSelected] = useState<string[]>([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [file, setFile] = useState<File | null>(null);

    const { context } = props;

    useEffect(() => {
        services.mediaService.fetchAllFilesAsync().then(() => {
        });
    }, []);

    return useObserver(() => {
        return (
            <Box position="relative">
                {/* tab  */}
                <Box
                    p={2}
                    display="flex"
                    style={{ background: theme.palette.background.paper }}
                    width="100%"
                    zIndex="999"
                    position="sticky"
                    top="0px"
                >
                    <Tabs indicatorColor="primary"
                        variant="fullWidth"
                        value={selectedTab}
                        style={{ width: "100%" }}
                        onChange={(_, e) => setSelectedTab(e)}
                        aria-label="setting"
                    >
                        <Tab icon={<Icon>cloud_upload</Icon>} label="アップロード" />
                        <Tab icon={<Icon>view_module</Icon>} label="画像を選択" />
                    </Tabs>
                </Box>

                {/* Tab content */}
                <SwipeableViews index={selectedTab}
                    axis="x"
                    height="100%"
                    style={{ height: "100%" }}
                    onChangeIndex={(_, e) => setSelectedTab(e)}
                >
                    <TabPanel
                        value={selectedTab}
                        index={0}
                    >
                        <Box
                            p={2}
                            position="relative"
                            flex={"1 1 auto"}
                        >
                            <FileDropArea onChange={e => setFile(e)} />
                        </Box>
                    </TabPanel>
                    <TabPanel
                        value={selectedTab}
                        index={1}
                    >
                        <PhotoGridView
                            selected={selected}
                            multiSelect={context?.multiple}
                            selectionChanged={selected => setSelected(selected)}
                            images={services.mediaService.files}
                            baseUrl={axios.defaults.baseURL}
                            hideCheckbox
                            disableInvok
                        />
                    </TabPanel>
                </SwipeableViews>

                {/* Commend bar */}
                <Box
                    p={1}
                    display="flex"
                    style={{ background: theme.palette.background.paper }}
                    width="100%"
                    position="sticky"
                    bottom="0px"
                >
                    <Box flex="1 1 auto" />
                    <Button
                        onClick={() => props.onClose([])}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{ marginLeft: "4px" }}
                        disabled={(selectedTab === 1 && !selected.length) || (selectedTab === 0 && !file)}
                        onClick={() => {
                            if (selectedTab === 0 && file) {
                                services.mediaService
                                    .postAsync(file)
                                    .then(path => props.onClose([`${path}`]));
                            }
                            else {
                                props.onClose(selected);
                            }
                        }}
                        color="primary"
                        variant="contained"
                    >
                        Ok
                    </Button>
                </Box>
            </Box >
        );
    });
}

interface MediaSelectDialogProps {
    multiple?: boolean;
}

export async function showMediaSelectionDialog() {
    const [path] = await showDialogAsync(MediaSelectionDialog, undefined, {
        maxWidth: "lg"
    });
    return path;
}

export async function showMultipleMediaSelectionDialogAsync() {
    return await showDialogAsync(MediaSelectionDialog, { multiple: true }, {
        maxWidth: "lg"
    });
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