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

import { g as __read, h as useObserver, k as jsxRuntime, R as Box, m as __assign, T as Typography, s as services, B as Button, U as Divider, i as __awaiter, j as __generator, a6 as Menu, V as axios, ac as Backdrop, n as makeStyles } from './index.lib-feb42a94.js';
import React, { useState, useEffect } from 'react';
import { o as observer } from './mobxreact.esm-48418c5f.js';
import { a as FileDropArea, P as PhotoGridView } from './ColorPalette-33a190ab.js';
import './showDialog-06f9b5a1.js';
import { c as confirmAsync } from './confirmAsync-44ae1b03.js';
import 'react-dom';

function MediaListToolbar() {
    var _a = __read(useState(""), 2); _a[0]; _a[1];
    var _b = __read(React.useState(null), 2), anchorEl = _b[0], setAnchorEl = _b[1];
    var upload = function (event) {
        setAnchorEl(event.currentTarget);
    };
    function selectAll() {
        services.mediaService.setSelected(services.mediaService.files);
    }
    function clearAll() {
        services.mediaService.setSelected([]);
    }
    function handleDelete() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, confirmAsync(services.mediaService.selected.length + "\u4EF6\u3092\u524A\u9664\u3057\u307E\u3059\u304B?")];
                    case 1:
                        if (_a.sent()) {
                            services.mediaService.removeSelectedAsync();
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    return useObserver(function () {
        return (jsxRuntime.jsxs(Box, __assign({ p: 1, height: "100%", overflow: "auto", display: "flex", alignItems: "center" }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "h4" }, { children: "Files" }), void 0),
                services.mediaService.selected.length
                    ?
                        // when any items are selected
                        jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Box, { flex: "1 1 auto" }, void 0),
                                jsxRuntime.jsxs(Typography, { children: [services.mediaService.selected.length, " \u30A2\u30A4\u30C6\u30E0\u9078\u629E\u4E2D"] }, void 0),
                                jsxRuntime.jsx(Button, __assign({ color: "primary", style: { marginLeft: "8px" }, onClick: function () { return clearAll(); } }, { children: "Cancel" }), void 0),
                                jsxRuntime.jsx(Button, __assign({ onClick: function () { return selectAll(); }, variant: "contained", color: "primary", style: { marginLeft: "8px" } }, { children: "\u5168\u9078\u629E" }), void 0),
                                jsxRuntime.jsx(Divider, { orientation: "vertical" }, void 0),
                                jsxRuntime.jsx(Button, __assign({ onClick: function () { return handleDelete(); }, variant: "contained", color: "primary", style: { marginLeft: "8px" } }, { children: "\u524A\u9664" }), void 0)] }, void 0)
                    :
                        // when no item is selected
                        jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(Box, __assign({ ml: "auto" }, { children: [jsxRuntime.jsx(Menu, __assign({ id: "long-menu", anchorEl: anchorEl, keepMounted: true, open: !!anchorEl, PaperProps: {
                                            style: {
                                                maxHeight: 400,
                                                padding: "12px",
                                                boxSizing: "border-box"
                                            },
                                        } }, { children: jsxRuntime.jsx(FileDropArea, { showCommend: true, commited: function (f) {
                                                f && services.mediaService.postAsync(f);
                                                setAnchorEl(null);
                                            }, onChange: function (e) { return 0; } }, void 0) }), void 0),
                                    jsxRuntime.jsx(Button, __assign({ variant: "contained", color: "primary", onClick: upload }, { children: "Upload" }), void 0)] }), void 0) }, void 0)] }), void 0));
    });
}

var ImageGrid = observer(function () {
    var classes = useStyle();
    var _a = __read(useState(""), 2), path = _a[0], setPath = _a[1];
    var _b = __read(useState(null), 2), selected = _b[0], setSelected = _b[1];
    var _c = __read(useState(false), 2); _c[0]; _c[1];
    useEffect(function () {
        services.mediaService.fetchAllFilesAsync();
    }, []);
    return (jsxRuntime.jsxs(Box, __assign({ mt: 2, display: "flex", flexWrap: "wrap", width: "100%" }, { children: [jsxRuntime.jsx(PhotoGridView, { multiSelect: true, baseUrl: axios.defaults.baseURL, images: services.mediaService.files, selected: services.mediaService.selected, selectionChanged: function (selected) { return services.mediaService.setSelected(selected); }, invoked: function (path) {
                    setSelected(path);
                    setPath(path);
                } }, void 0),
            jsxRuntime.jsx(Backdrop, __assign({ style: { zIndex: 9999 }, open: !!selected, onClick: function () {
                    setSelected(null);
                } }, { children: jsxRuntime.jsx("div", __assign({ onClick: function () { return setSelected(null); }, style: {
                        zIndex: 9999,
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        margin: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    } }, { children: jsxRuntime.jsx("img", { onClick: function () { return setSelected(null); }, src: axios.defaults.baseURL + path, alt: path, className: classes.img }, void 0) }), void 0) }), void 0)] }), void 0));
});
var useStyle = makeStyles({
    imgContainer: {
        height: "160px",
    },
    img: {
        height: "90%",
        width: "90%",
        objectFit: "contain"
    }
});

var MediaPage = observer(function () {
    useEffect(function () {
        services.mediaService.fetchAllFilesAsync();
    }, []);
    return (jsxRuntime.jsxs(Box, __assign({ p: 1, height: "100%", overflow: "auto" }, { children: [jsxRuntime.jsx(Box, { children: jsxRuntime.jsx(MediaListToolbar, {}, void 0) }, void 0),
            jsxRuntime.jsx(Divider, { style: { marginTop: "8px" } }, void 0),
            jsxRuntime.jsx(Box, __assign({ mt: 2, display: "flex", flexWrap: "wrap", width: "100%" }, { children: jsxRuntime.jsx(ImageGrid, {}, void 0) }), void 0)] }), void 0));
});
makeStyles({
    imgContainer: {
        height: "160px",
    },
    img: {
        height: "100%"
    }
});

export default MediaPage;
