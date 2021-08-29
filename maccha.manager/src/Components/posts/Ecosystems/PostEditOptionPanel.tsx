import React, { useState } from "react";
import {
    Divider, Select, MenuItem,
    Icon,
    TextField, Box, Typography, Button, Switch,
} from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";
import { services } from "../../../Services";
import { confirmAsync } from "../../commons/confirmAsync";
import { DateTime } from "luxon";
import { showMediaSelectionDialog } from "./MediaSelectionDialog";
import { postStatusTypes } from "../../../Models/posts/entities/PostStatusType";
import { Content } from "../../../Models/Contents/Entities/Content";
import { StatusType } from "../../../Models/Contents/Enumes/StatusType";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { axios } from "../../../Repositories/config";

interface PostEditOptionPanelProps {
    contentEditContext: Content;
}

/**
 * Post settings edit panel.
 * @param props Props
 */
export function PostEditOptionPanel(props: PostEditOptionPanelProps) {
    const { contentEditContext } = props;
    const matches = useRouteMatch<{ taxonomy: string; }>();
    const history = useHistory();
    const [isReservationed, setIsReservation] = useState(!!props.contentEditContext.publishIn);

    function setcontentEditContextParam(key: keyof Content, value: any) {
        services.postEditService.setContent(contentEditContext.clone({ [key]: value }));
    }

    async function selectMedia() {
        const path = await showMediaSelectionDialog();
        if (path) {
            setcontentEditContextParam("thumbnail", path);
        }
    }

    async function publishAsync() {
        if (! await confirmAsync("記事を公開しますがよろしいですか？", {
            description: ""
        })) {
            return;
        }

        if (!isReservationed) {
            setcontentEditContextParam("publishIn", null);
        }

        services.postEditService.saveAsync();

        history.push("/posts/" + matches.params.taxonomy);
    }

    return (
        <>
            <Box
                width="100%"
                display="flex"
                mt={1}
            >
                <Select
                    color="primary"
                    style={{ flex: "1 1 auto" }}
                    value={contentEditContext.status}
                    onChange={e => setcontentEditContextParam("status", e.target.value)}
                >
                    {postStatusTypes.map(t => (<MenuItem key={t.value} value={t.value}>{t.display}</MenuItem >))}
                </Select>
                <Button
                    style={{ marginLeft: "8px" }}
                    onClick={publishAsync}
                    color="primary"
                    variant="contained"
                >
                    投稿
                </Button>
            </Box>

            <Box mt={3}>
                <Divider />
            </Box>

            {
                contentEditContext.status !== StatusType.Drafting && (
                    <Box width="100%" mt={3}>
                        <Typography color="textSecondary">
                            公開時間予約
                        </Typography>
                        {/* <Box display="flex" alignItems="center">
                            <Switch
                                color="primary"
                                checked={isReservationed}
                                onChange={e => {
                                    setcontentEditContextParam("publishIn", DateTime.local());
                                    setIsReservation(e.target.checked);
                                }}
                            ></Switch>
                            {
                                isReservationed ? "ON" : "OFF"
                            }
                        </Box> */}
                        {
                            isReservationed && <>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="公開日"
                                        format="MM/dd/yyyy"
                                        value={contentEditContext.publishIn?.toJSDate()}
                                        onChange={e => setcontentEditContextParam("publishIn", DateTime.fromISO(e?.toISOString() ?? ""))}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="公開時間"
                                        value={contentEditContext.publishIn?.toJSDate()}
                                        onChange={e => setcontentEditContextParam("publishIn", DateTime.fromISO(e?.toISOString() ?? ""))}
                                        KeyboardButtonProps={{
                                            "aria-label": "change time",
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </>
                        }
                    </Box>
                )
            }


            <Box width="100%" mt={3}>
                <Typography color="textSecondary" variant="overline">
                    タイトル
                </Typography>
                <TextField
                    onChange={e => setcontentEditContextParam("title", e.target.value)}
                    placeholder="新しい投稿です"
                    fullWidth
                    value={contentEditContext.title}
                    color="primary"
                />
            </Box>

            <Box width="100%" mt={2}>
                <Box display="flex">
                    <Typography color="textSecondary" variant="overline">
                        サムネイル
                    </Typography>
                    <Button
                        variant="text"
                        color="primary"
                        size="small"
                        disabled={!contentEditContext.thumbnail}
                        style={{ marginLeft: "auto" }}
                        onClick={() => setcontentEditContextParam("thumbnail", "")}
                    >
                        クリア
                    </Button>
                </Box>
                <Box
                    height="120px"
                    width="100%"
                    mt={1}
                    overflow="hidden"
                    style={{
                        position: "relative",
                        borderRadius: "2px",
                        background: "rgba(127,127,127,0.09)",
                    }}
                >
                    {
                        contentEditContext.thumbnail && <img
                            alt="thumbnail"
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                                WebkitUserSelect: "none"
                            }}
                            src={axios.defaults.baseURL + contentEditContext.thumbnail}
                        />
                    }
                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => selectMedia()}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0,
                            height: "120px",
                            width: "100%"
                        }}>
                        <Icon>add</Icon>
                    </Button>
                </Box>
            </Box>

            <Box mt={2}>
                <Typography color="textSecondary" variant="overline">
                    備考
                </Typography>
                <TextField
                    multiline
                    rows={6}
                    variant="filled"
                    hiddenLabel
                    fullWidth
                    value={contentEditContext.description}
                    onChange={e => setcontentEditContextParam("description", e.target.value)}
                />
            </Box>

            <Box mt={2}>
                <Typography color="textSecondary" variant="overline">
                    メタデータ
                </Typography>
                <TextField
                    multiline
                    rows={6}
                    variant="filled"
                    hiddenLabel
                    fullWidth
                    value={contentEditContext.metadata}
                    onChange={e => setcontentEditContextParam("metadata", e.target.value)}
                />
            </Box>
        </>
    );
}