import React, { useEffect, useState } from "react";
import { useObserver } from "mobx-react";
import { useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CardContent, Card, Typography, Hidden, Button, CardActions, TextField, InputAdornment, FormControl } from "@mui/material";
import { Alert, AlertTitle } from "@mui/lab";
import { AccountCircle, VpnKey } from "@mui/icons-material";
import { services } from "../../Services";
import { useOption } from "Apps/Hooks/useOption";

export default function LoginPage() {
    const classes = useStyles();
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowError, setIsShowError] = useState(false);

    const option = useOption();

    useEffect(() => {
        const onEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                loginAsync();
            }
        };

        document.addEventListener("keydown", onEnter);
        return () => document.removeEventListener("keydown", onEnter);
    }, []);

    const loginAsync = async () => {
        try {
            await services.authService.login(email, password);
            alert(option.pathPrefix + "/"+services.authService.isLogin);
            if (services.authService.isLogin) {
                alert(option.pathPrefix + "/");
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

    return useObserver(() => {
        return (
            <div>
                <Card elevation={2} className={classes.card} >
                    <CardContent>
                        <Typography variant="h4">
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
                            }} />
                    </CardContent>
                    <CardActions style={{ marginTop: "36px" }} >
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => {
                                loginAsync();
                            }}
                        >
                            ログイン
                        </Button>
                    </CardActions>
                    {
                        isShowError && (
                            <Alert severity="error" style={{ marginRight: "8px", marginLeft: "8px", marginTop: "24px", color: theme.palette.error.dark }}>
                                <AlertTitle>ログインできませんでした。</AlertTitle>
                                ユーザー名とパスワードを確認してください
                            </Alert>
                        )
                    }
                </Card>
            </div>
        );
    });
}

const useStyles = makeStyles({
    card: {
        width: "380px",
        height: "460px",
        padding: "24px",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        margin: "auto",
        textAlign: "center"
    }
});