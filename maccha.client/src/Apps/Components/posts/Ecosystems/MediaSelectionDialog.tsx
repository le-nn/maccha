import { showDialogAsync, DialogContentProp } from "../../commons/showDialog";
import React, { useEffect, useRef, useState } from "react";
import { useObserver } from "mobx-react";
import { services } from "../../../Services";
import {
    Button,
    Box,
    Tab,
    Icon, Tabs, Theme
} from "@mui/material";
import { FileDropArea, PhotoGridView } from "../../commons";
import { lightTheme } from "Apps/theme";
import SwipeableViews from "react-swipeable-views";
import { axios } from "../../../Repositories/config";
import { CloudUpload, ViewModule } from "@mui/icons-material";

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
                    style={{ background: lightTheme.palette.background.paper }}
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
                        <Tab icon={<CloudUpload />} label="アップロード" />
                        <Tab icon={<ViewModule />} label="画像を選択" />
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
                    style={{ background: lightTheme.palette.background.paper }}
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
