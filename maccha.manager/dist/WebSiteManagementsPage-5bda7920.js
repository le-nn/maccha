function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

import { n as makeStyles, i as __awaiter, j as __generator, g as __read, k as jsxRuntime, a3 as ObserverComponent, R as Box, m as __assign, T as Typography, B as Button, u as useTheme, s as services, h as useObserver, aQ as Toolbar, P as Paper, aV as InputBase, I as IconButton, Y as Icon, aX as WebSite } from './index.lib-feb42a94.js';
import React, { useState, useEffect } from 'react';
import { s as showDialogAsync, C as Checkbox } from './showDialog-06f9b5a1.js';
import { T as TextField } from './TextField-21ae30c0.js';
import { S as Search } from './Search-57dbdb70.js';
import { A as Add } from './Add-d2dfd5fa.js';
import { T as TableContainer, a as Table, b as TableHead, c as TableRow, d as TableCell, e as TableBody } from './TableRow-5e260c33.js';
import 'react-dom';

function WebSiteDetailDialog(props) {
    useStyles();
    var _a = __read(useState(props.context), 2), webSite = _a[0], setWebSite = _a[1];
    var _b = __read(useState(false), 2), canClose = _b[0], setCanClose = _b[1];
    var _c = __read(useState(null), 2), displayNameErrorMessage = _c[0], setdisplayNameErrorMessage = _c[1];
    var _d = __read(useState(null), 2), hostErrorMessage = _d[0], setHostErrorMessage = _d[1];
    var _e = __read(useState(null), 2), nameErrorMessage = _e[0], setnameErrorMessage = _e[1];
    /**
     * webサイトのパラメータをセットとバリデーション.
     * @param key キー
     * @param value 値
     */
    function setWebSiteParam(key, value) {
        var _a;
        setWebSite(__assign(__assign({}, webSite), (_a = {}, _a[key] = value, _a)));
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
    return (jsxRuntime.jsx(ObserverComponent, { children: function () {
            return jsxRuntime.jsxs(Box, __assign({ p: 3, display: "flex", height: "100%", flexDirection: "column", justifyContent: "space-between" }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "h5" }, { children: "\u30E6\u30FC\u30B6\u30FC\u7DE8\u96C6" }), void 0),
                    jsxRuntime.jsxs(Box, { children: [jsxRuntime.jsx(Typography, __assign({ style: { marginTop: "24px" } }, { children: "WEB\u30B5\u30A4\u30C8\u540D" }), void 0),
                            jsxRuntime.jsx(TextField, { fullWidth: true, placeholder: "\u30B5\u30F3\u30D7\u30EB\u30B5\u30A4\u30C8", value: webSite.displayName, style: { borderBottomWidth: "2px" }, onChange: function (e) { return setWebSiteParam("displayName", e.target.value); }, error: !!displayNameErrorMessage, helperText: !displayNameErrorMessage ? "サイト名称" : displayNameErrorMessage }, void 0),
                            jsxRuntime.jsx(Typography, __assign({ style: { marginTop: "24px" } }, { children: "\u8B58\u5225\u540D" }), void 0),
                            jsxRuntime.jsx(TextField, { fullWidth: true, placeholder: "sample_site", value: webSite.name, onChange: function (e) { return setWebSiteParam("name", e.target.value); }, error: !!nameErrorMessage, helperText: !nameErrorMessage ? "英数字および_-のみ" : nameErrorMessage }, void 0),
                            jsxRuntime.jsx(Typography, __assign({ style: { marginTop: "24px" } }, { children: "\u30DB\u30B9\u30C8\u30A2\u30C9\u30EC\u30B9" }), void 0),
                            jsxRuntime.jsx(TextField, { fullWidth: true, placeholder: "https://example.com", value: webSite.host, onChange: function (e) { return setWebSiteParam("host", e.target.value); }, error: !!hostErrorMessage, helperText: !hostErrorMessage ? "サイトのURL" : hostErrorMessage }, void 0),
                            jsxRuntime.jsx(Typography, __assign({ style: { marginTop: "24px" } }, { children: "\u5099\u8003" }), void 0),
                            jsxRuntime.jsx(TextField, { fullWidth: true, multiline: true, rows: 6, placeholder: "\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044", value: webSite.description, onChange: function (e) { return setWebSiteParam("description", e.target.value); } }, void 0)] }, void 0),
                    jsxRuntime.jsxs(Box, __assign({ marginTop: "24px", marginBottom: "12px", display: "flex" }, { children: [jsxRuntime.jsx(Button, __assign({ variant: "text", color: "primary", style: { marginLeft: "auto" }, onClick: function () { return props.onClose(undefined); } }, { children: "Cancel" }), void 0),
                            jsxRuntime.jsx(Button, __assign({ variant: "contained", style: { marginLeft: "12px" }, onClick: function () { return props.onClose(webSite); }, color: "primary", disabled: !canClose }, { children: "Ok" }), void 0)] }), void 0)] }), void 0);
        } }, void 0));
}
function showWebSiteDetailsDialogAsync(webSite) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showDialogAsync(WebSiteDetailDialog, webSite)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var useStyles = makeStyles({
    root: {},
});

function WebSiteManagementsPage() {
    var _this = this;
    var classes = useStyles$1();
    // const [order, setOrder] = React.useState<Order>('asc');
    // const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
    var _a = __read(React.useState([]), 2); _a[0]; _a[1];
    var _b = __read(React.useState(0), 2); _b[0]; _b[1];
    var _c = __read(React.useState(false), 2); _c[0]; _c[1];
    var _d = __read(React.useState(5), 2); _d[0]; _d[1];
    var theme = useTheme();
    useEffect(function () {
        services.webSiteManagementsService.fetchWebsitesAsync();
    }, []);
    var createAsync = function () { return __awaiter(_this, void 0, void 0, function () {
        var webSite;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showWebSiteDetailsDialogAsync(new WebSite("", "", "", "", ""))];
                case 1:
                    webSite = _a.sent();
                    if (!webSite) return [3 /*break*/, 3];
                    return [4 /*yield*/, services.webSiteManagementsService.createNewWwebSiteAsync({
                            description: webSite.description,
                            displayName: webSite.displayName,
                            host: webSite.host,
                            name: webSite.name
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var editAsync = function (webSite) { return __awaiter(_this, void 0, void 0, function () {
        var edited;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showWebSiteDetailsDialogAsync(webSite)];
                case 1:
                    edited = _a.sent();
                    if (!edited) return [3 /*break*/, 3];
                    return [4 /*yield*/, services.webSiteManagementsService.saveWebSiteAsync({
                            webSiteId: edited.webSiteId,
                            description: edited.description,
                            displayName: edited.displayName,
                            host: edited.host,
                            name: edited.name
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return useObserver(function () {
        var webSiteManagementsService = services.webSiteManagementsService;
        return (jsxRuntime.jsxs(Box, __assign({ p: 2, height: "100%", display: "flex", flexDirection: "column" }, { children: [jsxRuntime.jsxs(Toolbar, __assign({ style: { paddingRight: "0" } }, { children: [jsxRuntime.jsxs(Paper, __assign({ style: { marginLeft: "auto" }, elevation: 2 }, { children: [jsxRuntime.jsx(InputBase, { style: {
                                        marginLeft: theme.spacing(1),
                                        flex: 1,
                                    }, placeholder: "\u691C\u7D22", inputProps: { "aria-label": "検索" } }, void 0),
                                jsxRuntime.jsx(IconButton, __assign({ type: "submit", style: { padding: "10px" }, "aria-label": "search" }, { children: jsxRuntime.jsx(Search, {}, void 0) }), void 0)] }), void 0),
                        jsxRuntime.jsxs(Button, __assign({ variant: "contained", style: {
                                marginLeft: "8px",
                                height: "44px",
                                borderRadius: "22px"
                            }, color: "primary", onClick: function () { return createAsync(); } }, { children: [jsxRuntime.jsx(Add, {}, void 0), "\u8FFD\u52A0"] }), void 0)] }), void 0),
                jsxRuntime.jsx(Paper, __assign({ className: classes.root, elevation: 2 }, { children: jsxRuntime.jsx(TableContainer, __assign({ className: classes.container }, { children: jsxRuntime.jsxs(Table, __assign({ stickyHeader: true, "aria-label": "sticky table" }, { children: [jsxRuntime.jsx(TableHead, { children: jsxRuntime.jsxs(TableRow, { children: [jsxRuntime.jsx(TableCell, {}, void 0),
                                            jsxRuntime.jsx(TableCell, { children: "\u30B5\u30A4\u30C8\u540D" }, void 0),
                                            jsxRuntime.jsx(TableCell, { children: "\u8B58\u5225\u540D" }, void 0),
                                            jsxRuntime.jsx(TableCell, { children: "\u30DB\u30B9\u30C8" }, void 0),
                                            jsxRuntime.jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: "\u5099\u8003" }), void 0),
                                            jsxRuntime.jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: "\u8A73\u7D30" }), void 0)] }, void 0) }, void 0),
                                jsxRuntime.jsx(TableBody, { children: webSiteManagementsService.webSites.map(function (site, i) { return (jsxRuntime.jsxs(TableRow, { children: [jsxRuntime.jsx(TableCell, __assign({ padding: "checkbox" }, { children: jsxRuntime.jsx(Checkbox, { color: "primary" }, void 0) }), void 0),
                                            jsxRuntime.jsx(TableCell, { children: site.displayName }, void 0),
                                            jsxRuntime.jsx(TableCell, { children: site.name }, void 0),
                                            jsxRuntime.jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: jsxRuntime.jsx("a", __assign({ style: {
                                                        color: theme.palette.primary.main
                                                    }, target: "_blank", href: site.host, rel: "noreferrer" }, { children: site.host }), void 0) }), void 0),
                                            jsxRuntime.jsx(TableCell, { children: site.description }, void 0),
                                            jsxRuntime.jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: jsxRuntime.jsx(IconButton, __assign({ onClick: function () { return editAsync(site); } }, { children: jsxRuntime.jsx(Icon, { children: "list" }, void 0) }), void 0) }), void 0)] }, i)); }) }, void 0)] }), void 0) }), void 0) }), void 0)] }), void 0));
    });
}
var useStyles$1 = makeStyles({
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

export default WebSiteManagementsPage;
