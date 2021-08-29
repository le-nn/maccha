import React, { useEffect, useState } from "react";
import { useObserver } from "mobx-react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { CardContent, Card, Typography, Hidden, Button, CardActions, TextField, InputAdornment, FormControl } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { AccountCircle, VpnKey } from "@material-ui/icons";
import { services } from "../../Services";
import { useLocation, useHistory } from "react-router-dom";

export default function LoginPage() {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowError, setIsShowError] = useState(false);

    useEffect(() => {
        function onEnter(e: KeyboardEvent) {
            if (e.key === "Enter") {
                loginAsync();
            }
        }

        document.addEventListener("keydown", onEnter);
        return () => document.removeEventListener("keydown", onEnter);
    });

    const loginAsync = async () => {
        try {
            await services.authService.login(email, password);
            if (services.authService.isLogin) {
                window.location.assign("/");
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
                <Hidden smUp implementation="js">
                </Hidden>
                <Hidden xsDown implementation="js">
                    <Card elevation={2} className={classes.card} >
                        <CardContent>
                            <Typography variant="h4">
                                ログイン
                            </Typography>
                            <TextField label="ログインID"
                                style={{ marginTop: "64px" }}
                                fullWidth
                                value={email}
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
                            <Button variant="contained" color="primary" fullWidth onClick={() => {
                                loginAsync();
                            }}>
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
                </Hidden>
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