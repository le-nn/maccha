import { showDialogAsync, DialogContentProp } from "../../commons/showDialog";
import React, { useState } from "react";
import { Observer } from "mobx-react";
import { services } from "../../../Services";
import {
    Button,
    Box,
    makeStyles,
    Typography,
    TextField,
    Select,
    MenuItem,
    Switch,
    ListItemText,
    Checkbox,
    Chip
} from "@material-ui/core";

import { WebSite } from "../../../Models/sites/web-site";
import { IWebSite } from "../../../Models/sites/web-site.interface";

function WebSiteDetailDialog(props: DialogContentProp<IWebSite, IWebSite | undefined>) {
    const classes = useStyles();
    const [webSite, setWebSite] = useState(props.context);

    const [canClose, setCanClose] = useState(false);

    const [displayNameErrorMessage, setdisplayNameErrorMessage] = useState<string | null>(null);
    const [hostErrorMessage, setHostErrorMessage] = useState<string | null>(null);
    const [nameErrorMessage, setnameErrorMessage] = useState<string | null>(null);

    /**
     * webサイトのパラメータをセットとバリデーション.
     * @param key キー
     * @param value 値
     */
    function setWebSiteParam(key: keyof WebSite, value: string) {
        setWebSite({
            ...webSite,
            [key]: value
        });

        if (key === "name") {
            if (/^[A-Za-z0-9_-]*$/.test(value) === false) {
                setnameErrorMessage("英数字のみ入力可能です");
                setCanClose(false);
            }
            else if (!value.length) {
                setnameErrorMessage("入力してください");
                setCanClose(false);
            }
            else if (webSite.displayName && webSite.host) {
                setnameErrorMessage(null);
                setCanClose(true);
            }
            else {
                setnameErrorMessage(null);
            }
        }
        if (key === "displayName") {
            if (!value.length) {
                setdisplayNameErrorMessage("入力してください");
                setCanClose(false);
            }
            else if (webSite.name && webSite.host) {
                setdisplayNameErrorMessage(null);
                setCanClose(true);
            }
            else {
                setdisplayNameErrorMessage(null);
            }
        }
        else if (key === "host") {
            if (!value.length) {
                setHostErrorMessage("入力してください");
                setCanClose(false);
            }
            else if (/(http[s]?):\/\/[^\/\.]+?\..+\w$/i.test(value) === false) {
                setHostErrorMessage("無効なURLです");
                setCanClose(false);
            }
            else if (webSite.name && webSite.displayName) {
                setHostErrorMessage(null);
                setCanClose(true);
            }
            else {
                setHostErrorMessage(null);
            }
        }
        else if (webSite.name && webSite.displayName && webSite.host) {
            setHostErrorMessage(null);
            setCanClose(true);
        }
    }

    return (
        <Observer>
            {() =>
                <Box
                    p={3}
                    display="flex"
                    height="100%"
                    flexDirection="column"
                    justifyContent="space-between">
                    <Typography variant="h5">ユーザー編集</Typography>
                    <Box>
                        <Typography style={{ marginTop: "24px" }}>
                            WEBサイト名
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="サンプルサイト"
                            value={webSite.displayName}
                            style={{ borderBottomWidth: "2px" }}
                            onChange={e => setWebSiteParam("displayName", e.target.value)}
                            error={!!displayNameErrorMessage}
                            helperText={!displayNameErrorMessage ? "サイト名称" : displayNameErrorMessage}
                        />

                        <Typography style={{ marginTop: "24px" }}>識別名</Typography>
                        <TextField
                            fullWidth
                            placeholder="sample_site"
                            value={webSite.name}
                            onChange={e => setWebSiteParam("name", e.target.value)}
                            error={!!nameErrorMessage}
                            helperText={!nameErrorMessage ? "英数字および_-のみ" : nameErrorMessage}
                        />

                        <Typography style={{ marginTop: "24px" }}>ホストアドレス</Typography>
                        <TextField
                            fullWidth
                            placeholder="https://example.com"
                            value={webSite.host}
                            onChange={e => setWebSiteParam("host", e.target.value)}
                            error={!!hostErrorMessage}
                            helperText={!hostErrorMessage ? "サイトのURL" : hostErrorMessage}
                        />

                        <Typography style={{ marginTop: "24px" }}>備考</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            placeholder="入力してください"
                            value={webSite.description}
                            onChange={e => setWebSiteParam("description", e.target.value)}
                        />
                    </Box>

                    <Box marginTop="24px" marginBottom="12px" display="flex">
                        <Button
                            variant="text"
                            color="primary"
                            style={{ marginLeft: "auto" }}
                            onClick={() => props.onClose(undefined)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            style={{ marginLeft: "12px" }}
                            onClick={() => props.onClose(webSite)}
                            color="primary"
                            disabled={!canClose} >
                            Ok
                        </Button>
                    </Box>
                </Box >
            }
        </Observer>
    );
}

export async function showWebSiteDetailsDialogAsync(webSite: IWebSite) {
    return await showDialogAsync(WebSiteDetailDialog, webSite);
}

const useStyles = makeStyles({
    root: {

    },
});