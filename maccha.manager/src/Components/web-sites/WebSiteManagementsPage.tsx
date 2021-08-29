import React, { useEffect } from "react";
import { useObserver } from "mobx-react";
import { services } from "../../Services";
import {
    Paper,
    TableContainer,
    Icon,
    Table,
    IconButton, TableCell,
    TableHead, TableRow, TableBody, TablePagination, makeStyles,
    Checkbox, Box, useTheme, Modal, Fade, Backdrop, Toolbar, InputBase, Fab, Button
} from "@material-ui/core";
import {
    Search,
    Add
} from "@material-ui/icons";

import { showWebSiteDetailsDialogAsync } from "./ecosystems/WebSiteDetailDialog";
import { WebSite } from "../../Models/sites/web-site";

export default function WebSiteManagementsPage() {
    const classes = useStyles();
    // const [order, setOrder] = React.useState<Order>('asc');
    // const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const theme = useTheme();

    useEffect(() => {
        services.webSiteManagementsService.fetchWebsitesAsync();
    }, []);

    const createAsync = async () => {
        const webSite = await showWebSiteDetailsDialogAsync(new WebSite("", "", "", "", ""));
        if (webSite) {
            await services.webSiteManagementsService.createNewWwebSiteAsync({
                description: webSite.description,
                displayName: webSite.displayName,
                host: webSite.host,
                name: webSite.name
            });
        }
    };

    const editAsync = async (webSite: WebSite) => {
        const edited = await showWebSiteDetailsDialogAsync(webSite);
        if (edited) {
            await services.webSiteManagementsService.saveWebSiteAsync({
                webSiteId: edited.webSiteId,
                description: edited.description,
                displayName: edited.displayName,
                host: edited.host,
                name: edited.name
            });
        }
    };

    return useObserver(() => {
        const { webSiteManagementsService } = services;
        return (
            <Box p={2} height="100%" display="flex" flexDirection="column" >
                <Toolbar style={{ paddingRight: "0" }}>
                    <Paper style={{ marginLeft: "auto" }} elevation={2} >
                        <InputBase
                            style={{
                                marginLeft: theme.spacing(1),
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
                                        サイト名
                                    </TableCell>
                                    <TableCell>
                                        識別名
                                    </TableCell>
                                    <TableCell>
                                        ホスト
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        備考
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        詳細
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {webSiteManagementsService.webSites.map((site, i) => (
                                    <TableRow key={i}>
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
                                            {site.displayName}
                                        </TableCell>
                                        <TableCell>
                                            {site.name}
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <a
                                                style={{
                                                    color: theme.palette.primary.main
                                                }}
                                                target="_blank"
                                                href={site.host} rel="noreferrer"
                                            >
                                                {site.host}
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                            {site.description}
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center" }}>
                                            <IconButton onClick={() => editAsync(site)}><Icon>list</Icon></IconButton>
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
            </Box>
        );
    });
}

const useStyles = makeStyles({
    root: {
        width: "100%",
        flex: "1 1 auto",
        marginTop: "8px",
        overflowY: "auto"
    },
    container: {
        height: "100%"
    },
});