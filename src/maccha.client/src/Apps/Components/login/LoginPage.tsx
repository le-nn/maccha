import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CardContent, Card, Typography, Hidden, Button, CardActions, TextField, InputAdornment, FormControl } from "@mui/material";
import { Alert, AlertTitle } from "@mui/lab";
import { AccountCircle, VpnKey } from "@mui/icons-material";
import { useOption } from "Apps/Hooks/useOption";
import { useDispatch, useObserver, useStore } from "react-relux";
import { AuthStore } from "Apps/Models/Stores/Auth/AuthStore";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowError, setIsShowError] = useState(false);
    const { t } = useTranslation();
    const option = useOption();

    const dispatch = useDispatch(AuthStore);
    const authStoreRef = useStore(AuthStore);

    useEffect(() => {
        const onEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                loginAsync();
            }
        };

        document.addEventListener("keydown", onEnter);
        return () => document.removeEventListener("keydown", onEnter);
    }, [email, password]);

    const loginAsync = async () => {
        try {
            await dispatch(auth => auth.login(email, password));
            if (authStoreRef.state.isLogin) {
                window.location.assign(option.pathPrefix + "/");
            }
            else {
                setIsShowError(true);
            }
        }
        catch {
            setIsShowError(true);
        }
    };



    return (
        <Box width={"100%"}
            height="100%"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Card elevation={3} sx={{ maxWidth: "380px" }}>
                <Box p={5}>
                    <Typography variant="h4" textAlign={"center"}>
                        ログイン
                    </Typography>
                    <TextField label="ログインID"
                        style={{ marginTop: "64px" }}
                        fullWidth
                        value={email}
                        variant="standard"
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }} />
                    <TextField label="パスワード"
                        style={{ marginTop: "36px" }}
                        fullWidth
                        type="password"
                        variant="standard"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="end" >
                                    <VpnKey />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box mt={5}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => {
                                loginAsync();
                            }}
                        >
                            {t("サインイン")}
                        </Button>
                    </Box>
                    <Box height={"80px"}>
                        {
                            isShowError && (
                                <Alert
                                    severity="error"
                                    style={{
                                        marginRight: "8px",
                                        marginLeft: "8px",
                                        marginTop: "24px",
                                        color: theme.palette.error.dark
                                    }}
                                >
                                    <AlertTitle>ログインできませんでした。</AlertTitle>
                                    ユーザー名とパスワードを確認してください
                                </Alert>
                            )
                        }
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}
