import React, { useEffect, useState, ReactComponentElement, cloneElement } from "react";
import { useObserver } from "mobx-react";
import { services } from "../../Services";
import {
    Paper,
    TableContainer,
    Icon,
    Table,
    Fab,
    Modal,
    Backdrop,
    Fade,
    Toolbar,
    IconButton, TableCell,
    TableHead, TableRow, TableBody, TablePagination,
    Checkbox, Box, InputBase, useTheme, Button, Chip, Avatar
} from "@mui/material";
import {
    Search,
    Add,
    List
} from "@mui/icons-material";
import ProfileImage from "../commons/ProfileImage";
import { showUserDetailsDialogAsync } from "./ecosystems/UserDetailsDialog";
import { IUser } from "../../Models/Domain/users/user.interface";
import { User } from "../../Models/Domain/users/user";
import { RoleType, displayRoles } from "../../Models";
import { axios } from "../../Repositories/config";
import { makeStyles } from "@mui/styles";
import { useStore } from "memento.react";
import { AuthStore } from "Apps/Models/Stores/Auth/AuthStore";

export default () => {
    const classes = useStyles();
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const theme = useTheme();
    const authStore = useStore(AuthStore);

    useEffect(() => {
        services.usersService.fetchUesrsAsync();
    }, []);

    const createAsync = async () => {
        const user = await showUserDetailsDialogAsync(
            new User(
                "",
                "",
                "",
                RoleType.Subscribe,
                true,
                authStore.state.loginInfo?.webSiteId ?
                    [authStore.state.loginInfo.webSiteId] :
                    [],
                ""
            ),
            true
        );
        if (user) {
            await services.usersService.createNewUserAsync({
                email: user.email,
                isActive: user.isActive,
                name: user.name,
                role: user.role,
                webSiteIds: user.webSiteIds,
                password: user.password ?? ""
            });
        }
    };

    const editEsync = async (user: IUser) => {
        const edited = await showUserDetailsDialogAsync(user);
        if (edited) {
            await services.usersService.saveUserAsync(edited);
        }
    };


    return useObserver(() => {
        const { usersService } = services;
        return (
            <Box p={2} height="100%" display="flex" flexDirection="column" >
                <Toolbar style={{ paddingRight: "0" }}>
                    <Paper style={{ marginLeft: "auto" }} elevation={2} >
                        <InputBase
                            style={{
                                marginLeft: theme.spacing(2),
                                flex: 1,
                            }}
                            placeholder="検索"
                            inputProps={{ "aria-label": "検索" }}
                        />
                        <IconButton type="submit" style={{ padding: "10px" }} aria-label="search">
                            <Search />
                        </IconButton>
                    </Paper>
                    <Button
                        variant="contained"
                        style={{
                            marginLeft: "8px",
                            height: "44px",
                            borderRadius: "22px"
                        }}
                        color="primary"
                        onClick={() => createAsync()}>
                        <Add ></Add>
                        追加
                    </Button>
                </Toolbar>

                <Paper className={classes.root} elevation={2}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        E-Mail
                                    </TableCell>
                                    <TableCell width="500px">
                                        Web Site
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        Role
                                    </TableCell>
                                    <TableCell>
                                        Enabled
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        Detail
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usersService.users.map((user, i) => (
                                    <TableRow key={user.email}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                            // indeterminate={numSelected > 0 && numSelected < rowCount}
                                            // checked={rowCount > 0 && numSelected === rowCount}
                                            // onChange={onSelectAllClick}
                                            // inputProps={{ 'aria-label': 'select all desserts' }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Avatar src={axios.defaults.baseURL + user.avatar} alt={user.name} />
                                        </TableCell>
                                        <TableCell>
                                            {user.name}
                                        </TableCell>
                                        <TableCell>
                                            {user.email}
                                        </TableCell>
                                        <TableCell >
                                            <Box style={{ display: "flex", flexWrap: "wrap" }}>
                                                {
                                                    user.role === RoleType.Admin ?
                                                        <Box padding="4px">
                                                            <Chip color="primary" label="管理者"></Chip>
                                                        </Box>
                                                        :
                                                        user.webSiteIds.slice(0, 6).map(webSiteId => (
                                                            <Box padding="4px" key={webSiteId}>
                                                                <Chip color="primary" label={webSiteId}></Chip>
                                                            </Box>
                                                        ))
                                                }
                                            </Box>
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            {displayRoles[user.role]}
                                        </TableCell>
                                        <TableCell>
                                            {user.isActive ? "有効" : "無効"}
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <IconButton onClick={() => editEsync(user)}><List /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* // <TablePagination
                //     rowsPerPageOptions={[10, 25, 100]}
                //     component="div"
                //     count={rows.length}
                //     rowsPerPage={rowsPerPage}
                //     page={page}
                //     onChangePage={handleChangePage}
                //     onChangeRowsPerPage={handleChangeRowsPerPage}
                // /> */}
                </Paper>
            </Box >
        );
    });
};

const useStyles = makeStyles({
    root: {
        width: "100%",
        flex: "1 1 auto",
        marginTop: "8px",
        overflowY: "auto"
    },
    container: {
        height: "100%",
    },
});