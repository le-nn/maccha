import { showDialogAsync, DialogContentProp } from "../../commons/showDialog";
import React, { useState } from "react";
import { useObserver } from "mobx-react";
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
import { IUser } from "../../../Models/users/user.interface";
import { displayRoles, RoleType } from "../../../Models/auth/role";
import { WebSite } from "../../../Models/sites/web-site";

type DialogUser = IUser & { password?: string; };

function UserDetailDialog(props: DialogContentProp<DialogUser, DialogUser | undefined>) {
    const classes = useStyles();
    const [user, setUser] = useState(props.context);
    const [canClose, setCanClose] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState<string | null>(null);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);
    const [confirmErrorMessage, setConfirmErrorMessage] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

    function confirm() {
        // edit mode doesn't need password.
        if (props.context.password === undefined) {
            return true;
        }

        if (confirmPassword !== user.password) {
            setConfirmErrorMessage("一致しません");
            setCanClose(false);
            return false;
        }

        setConfirmErrorMessage(null);
        setCanClose(true);
        return true;
    }

    function setConfirmPasswordParam(value: string) {
        setConfirmPassword(value);
        if (user.name && user.email && value === user.password) {
            setConfirmErrorMessage(null);
            setCanClose(true);
        }
        else if (value === user.password) {
            setConfirmErrorMessage(null);
            setCanClose(false);
        }
        else {
            setConfirmErrorMessage("一致しません");
            setCanClose(false);
        }
    }

    function setUserParam(key: keyof DialogUser, value: string) {
        setUser({
            ...user,
            [key]: value
        });

        if (key === "name") {
            if (!value.length) {
                setNameErrorMessage("入力してください");
                setCanClose(false);
            }
            else if (user.email && confirm()) {
                setNameErrorMessage(null);
                setCanClose(true);
            }
            else {
                setNameErrorMessage(null);
            }
        }
        else if (key === "email") {
            if (!value.length) {
                setEmailErrorMessage("入力してください");
                setCanClose(false);
            }
            else if (/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(value) === false) {
                setEmailErrorMessage("無効なメールアドレスです");
                setCanClose(false);
            }
            else if (user.name && confirm()) {
                setEmailErrorMessage(null);
                setCanClose(true);
            }
            else {
                setEmailErrorMessage(null);
            }
        }
        else if (key === "password") {
            if (/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/.test(value) === false) {
                setPasswordErrorMessage("無効な文字が含まれています");
                setCanClose(false);
            }
            else if (user.name && user.email && value === confirmPassword) {
                setConfirmErrorMessage(null);
                setCanClose(true);
            }
            else if (value === confirmPassword) {
                setConfirmErrorMessage(null);
                setCanClose(false);
            }
            else {
                setConfirmErrorMessage("一致しません");
                setCanClose(false);
            }
        }
        else {
            setCanClose(true);
        }
    }

    return useObserver(() => {
        const { webSiteManagementsService } = services;
        return (
            <Box
                p={3}
                display="flex"
                height="100%"
                flexDirection="column"
                justifyContent="space-between">
                <Typography variant="h5">ユーザー編集</Typography>
                <Box>
                    <Typography style={{ marginTop: "24px" }}>
                        名前
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="John Do"
                        value={user.name}
                        style={{ borderBottomWidth: "2px" }}
                        onChange={e => setUserParam("name", e.target.value)}
                        error={!!nameErrorMessage}
                        helperText={!!nameErrorMessage ? nameErrorMessage : "表示名"}
                    />

                    <Typography style={{ marginTop: "24px" }}>E-Mail</Typography>
                    <TextField
                        fullWidth
                        placeholder="hoge@example.com"
                        value={user.email}
                        error={!!emailErrorMessage}
                        helperText={!!emailErrorMessage ? emailErrorMessage : "メールアドレス"}
                        onChange={e => setUserParam("email", e.target.value)}
                    />

                    {
                        props.context.password !== undefined && <>
                            <Typography style={{ marginTop: "24px" }}>Password</Typography>
                            <TextField
                                fullWidth
                                type="password"
                                value={user.password}
                                error={!!passwordErrorMessage}
                                helperText={!!passwordErrorMessage ? passwordErrorMessage : "パスワード"}
                                onChange={e => setUserParam("password", e.target.value)}
                            />
                            <TextField
                                fullWidth
                                type="password"
                                value={confirmPassword}
                                error={!!confirmErrorMessage}
                                helperText={!!confirmErrorMessage ? confirmErrorMessage : "確認"}
                                onChange={e => setConfirmPasswordParam(e.target.value)}
                            />
                        </>
                    }

                    <Typography style={{ marginTop: "24px" }}>権限</Typography>
                    <Select fullWidth value={user.role}
                        onChange={e => {
                            setUser({ ...user, ...{ role: Number(e.target.value) } });
                            setCanClose(true);
                        }}
                    >
                        {
                            Object.keys(displayRoles).map((role, key) => <MenuItem value={role} key={key}>
                                {displayRoles[role]}
                            </MenuItem>)
                        }
                    </Select>

                    <Typography style={{ marginTop: "24px" }}>有効性</Typography>
                    <Switch
                        checked={user.isActive} color="primary"
                        onChange={e => {
                            setUser({ ...user, ...{ isActive: !user.isActive } });
                            setCanClose(true);
                        }} />
                    {
                        user.role !== RoleType.Admin &&
                        <>
                            <Typography style={{ marginTop: "24px" }}>許可するサイト</Typography>
                            <Select fullWidth
                                multiple
                                value={user.identifiers}
                                onChange={e => {
                                    setUser({ ...user, ...{ identifiers: e.target.value as any } });
                                    setCanClose(true);
                                }}
                                renderValue={(selected: any) => (
                                    <div>
                                        {selected.map(
                                            (value: string, key: number) => (
                                                <Chip color="primary" style={{ marginLeft: "4px" }}
                                                    key={key}
                                                    label={webSiteManagementsService.webSites.find(w => w.webSiteId === value)?.name}
                                                />
                                            )
                                        )}
                                    </div>
                                )}
                            >
                                {
                                    webSiteManagementsService.webSites.map(
                                        (site, key) => (
                                            <MenuItem key={key} value={site.webSiteId}>
                                                <Checkbox color="primary" checked={user.identifiers.includes(site.webSiteId)} ></Checkbox>
                                                <ListItemText>{site.name} - {site.displayName}</ListItemText>
                                            </MenuItem>
                                        )
                                    )
                                }
                            </Select>
                        </>
                    }
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
                        disabled={!canClose}
                        variant="contained"
                        style={{ marginLeft: "12px" }}
                        onClick={() => props.onClose(user)}
                        color="primary" >
                        Ok
                    </Button>
                </Box>
            </Box >
        );
    });
}

export async function showUserDetailsDialogAsync(user: IUser, isNew?: boolean) {
    if (isNew) {
        return await showDialogAsync(UserDetailDialog, { password: "", ...user });
    }
    return await showDialogAsync(UserDetailDialog, user);
}

const useStyles = makeStyles({
    root: {

    },
});