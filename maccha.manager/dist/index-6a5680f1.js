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

import { at as _setPrototypeOf, au as _typeof, ap as _assertThisInitialized, b as createSvgIcon, g as __read, k as jsxRuntime, m as __assign, n as makeStyles, i as __awaiter, j as __generator, s as services, h as useObserver, K as Box, U as theme, W as Icon, M as axios, B as Button, I as IconButton, av as createCommonjsModule, aw as commonjsGlobal, ax as objectAssign, p as propTypes, ay as __extends, S as Select$1, a2 as MenuItem, T as Typography } from './index.lib-fcf45d4b.js';
import { a as FileDropArea, P as PhotoGridView } from './ColorPalette-317a1e72.js';
import { s as showDialogAsync } from './showDialog-eede1950.js';
import React, { createElement, useState, useEffect } from 'react';
import { T as TextField } from './TextField-ff451be2.js';
import { T as Tabs, a as Tab, S as SwipeableViews } from './index-2dea0a48.js';
import { c as confirmAsync } from './confirmAsync-423c00d4.js';
import { A as Add } from './Add-2a7a6091.js';
import ReactDOM from 'react-dom';
import { S as Switch$1 } from './Switch-282d039c.js';

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var Delete = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
}), 'Delete');

function ValidationTextField(props) {
    var _a = __read(useState(false), 2), isError = _a[0], setIsError = _a[1];
    var _b = __read(useState(false), 2), isChanged = _b[0], setIsChanged = _b[1];
    function handleChange(value) {
        var _a, _b;
        var valid = (_b = (_a = props.rules) === null || _a === void 0 ? void 0 : _a.test(value)) !== null && _b !== void 0 ? _b : true;
        if (isError !== !valid) {
            setIsError(!valid);
        }
        props.textChanged && props.textChanged({
            value: value,
            valid: valid
        });
    }
    return jsxRuntime.jsx(TextField, __assign({}, props, { error: (isError || (props.required && !props.value)) && isChanged, value: props.value, onChange: function (e) { setIsChanged(true); handleChange(e.target.value); }, helperText: (props.required && !props.value) && isChanged ?
            "入力してください" :
            isError ?
                props.errorText :
                props.helperText }), void 0);
}

var TextareaEditor = {
    fieldEditor: Area,
    schemeEditor: function () { return jsxRuntime.jsx(jsxRuntime.Fragment, {}, void 0); },
    type: "text-area",
    name: "テキストエリア",
    description: "自由入力の複数行テキストです。リッチエディタによる編集が可能です。APIからHTMLが取得できます。"
};
function Area(props) {
    function handleChange(text) {
        props.onChange(props.field.field.clone({
            value: text
        }));
    }
    return (jsxRuntime.jsx(ValidationTextField, { fullWidth: true, rows: 8, variant: "outlined", multiline: true, helperText: props.helperText, errorText: "\u7121\u52B9\u306A\u5024\u3067\u3059", required: props.required, rules: props.rule, value: props.field.field.value, textChanged: function (e) { return handleChange(e.value); } }, void 0));
}

function TabPanel(props) {
    var children = props.children, value = props.value, index = props.index;
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: value === index && (children) }, void 0));
}
/**
 * select media or upload Dialog.
 * @param props props
 */
function MediaSelectionDialog(props) {
    var _a = __read(useState([]), 2), selected = _a[0], setSelected = _a[1];
    var _b = __read(useState(0), 2), selectedTab = _b[0], setSelectedTab = _b[1];
    var _c = __read(useState(null), 2), file = _c[0], setFile = _c[1];
    var context = props.context;
    useEffect(function () {
        services.mediaService.fetchAllFilesAsync().then(function () {
        });
    }, []);
    return useObserver(function () {
        return (jsxRuntime.jsxs(Box, __assign({ position: "relative" }, { children: [jsxRuntime.jsx(Box, __assign({ p: 2, display: "flex", style: { background: theme.palette.background.paper }, width: "100%", zIndex: "999", position: "sticky", top: "0px" }, { children: jsxRuntime.jsxs(Tabs, __assign({ indicatorColor: "primary", variant: "fullWidth", value: selectedTab, style: { width: "100%" }, onChange: function (_, e) { return setSelectedTab(e); }, "aria-label": "setting" }, { children: [jsxRuntime.jsx(Tab, { icon: jsxRuntime.jsx(Icon, { children: "cloud_upload" }, void 0), label: "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9" }, void 0),
                            jsxRuntime.jsx(Tab, { icon: jsxRuntime.jsx(Icon, { children: "view_module" }, void 0), label: "\u753B\u50CF\u3092\u9078\u629E" }, void 0)] }), void 0) }), void 0),
                jsxRuntime.jsxs(SwipeableViews, __assign({ index: selectedTab, axis: "x", height: "100%", style: { height: "100%" }, onChangeIndex: function (_, e) { return setSelectedTab(e); } }, { children: [jsxRuntime.jsx(TabPanel, __assign({ value: selectedTab, index: 0 }, { children: jsxRuntime.jsx(Box, __assign({ p: 2, position: "relative", flex: "1 1 auto" }, { children: jsxRuntime.jsx(FileDropArea, { onChange: function (e) { return setFile(e); } }, void 0) }), void 0) }), void 0),
                        jsxRuntime.jsx(TabPanel, __assign({ value: selectedTab, index: 1 }, { children: jsxRuntime.jsx(PhotoGridView, { selected: selected, multiSelect: context === null || context === void 0 ? void 0 : context.multiple, selectionChanged: function (selected) { return setSelected(selected); }, images: services.mediaService.files, baseUrl: axios.defaults.baseURL, hideCheckbox: true, disableInvok: true }, void 0) }), void 0)] }), void 0),
                jsxRuntime.jsxs(Box, __assign({ p: 1, display: "flex", style: { background: theme.palette.background.paper }, width: "100%", position: "sticky", bottom: "0px" }, { children: [jsxRuntime.jsx(Box, { flex: "1 1 auto" }, void 0),
                        jsxRuntime.jsx(Button, __assign({ onClick: function () { return props.onClose([]); }, color: "primary" }, { children: "Cancel" }), void 0),
                        jsxRuntime.jsx(Button, __assign({ style: { marginLeft: "4px" }, disabled: (selectedTab === 1 && !selected.length) || (selectedTab === 0 && !file), onClick: function () {
                                if (selectedTab === 0 && file) {
                                    services.mediaService
                                        .postAsync(file)
                                        .then(function (path) { return props.onClose(["" + path]); });
                                }
                                else {
                                    props.onClose(selected);
                                }
                            }, color: "primary", variant: "contained" }, { children: "Ok" }), void 0)] }), void 0)] }), void 0));
    });
}
function showMediaSelectionDialog() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, path;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, showDialogAsync(MediaSelectionDialog, undefined, {
                        maxWidth: "lg"
                    })];
                case 1:
                    _a = __read.apply(void 0, [_b.sent(), 1]), path = _a[0];
                    return [2 /*return*/, path];
            }
        });
    });
}
function showMultipleMediaSelectionDialogAsync() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showDialogAsync(MediaSelectionDialog, { multiple: true }, {
                        maxWidth: "lg"
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
makeStyles(function (theme) { return ({
    "fileContainer": {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "4px dashed " + theme.palette.primary.main,
        height: "280px",
        width: "100%"
    },
    "cloudIcon": {
        animationName: "$cloudicon",
        animationTimingFunction: "ease-in-out",
        animationDuration: "0.8s",
        animationDirection: "alternate",
        animationIterationCount: "infinite"
    },
    "@keyframes cloudicon": {
        "0%": {
            transform: "translate(0, 0px)"
        },
        "100%": {
            transform: "translate(0, -15px)"
        }
    }
}); });

var ImageEditor = {
    fieldEditor: Image,
    schemeEditor: function () { return jsxRuntime.jsx(jsxRuntime.Fragment, {}, void 0); },
    type: "image",
    name: "画像",
    description: "画像用のフィールドです。APIからは画像URLが返却されます。"
};
function Image(props) {
    function handleChange(imageUrl) {
        props.onChange(props.field.field.clone({
            value: imageUrl
        }));
    }
    function selectAsync() {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showMediaSelectionDialog()];
                    case 1:
                        url = _a.sent();
                        handleChange(url);
                        return [2 /*return*/];
                }
            });
        });
    }
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(Box, __assign({ display: "flex", justifyContent: "center", flexDirection: "column" }, { children: [!props.field.field.value ?
                    jsxRuntime.jsx(Box, __assign({ mt: 2, mx: 2, display: "flex", flexDirection: "column", alignItems: "center" }, { children: jsxRuntime.jsx(Button, __assign({ style: { marginTop: "8px" }, variant: "contained", color: "primary", onClick: function () {
                                selectAsync();
                            } }, { children: "\u753B\u50CF\u3092\u9078\u629E" }), void 0) }), void 0)
                    :
                        jsxRuntime.jsx("img", { alt: "preview", height: "280", src: axios.defaults.baseURL + props.field.field.value, style: { width: "100%", objectFit: "cover" } }, void 0),
                jsxRuntime.jsx(Box, __assign({ mt: 2, display: "flex" }, { children: props.field.field.value && jsxRuntime.jsx(Button, __assign({ color: "primary", onClick: function () {
                            handleChange("");
                        } }, { children: "Clear" }), void 0) }), void 0)] }), void 0) }, void 0));
}

var PhotoGalleryEditor = {
    fieldEditor: PhotoGallery,
    schemeEditor: function () { return jsxRuntime.jsx(jsxRuntime.Fragment, {}, void 0); },
    type: "photo-gallery",
    name: "フォトギャラリー",
    description: "画像の一覧用のフィールドです。APIからは画像URLが返却されます。"
};
function PhotoGallery(props) {
    var _a = __read(useState([]), 2), selected = _a[0], setSelected = _a[1];
    function addMedia() {
        return __awaiter(this, void 0, void 0, function () {
            var path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showMultipleMediaSelectionDialogAsync()];
                    case 1:
                        path = _a.sent();
                        props.onChange(props.field.field.clone({
                            value: props.field.field.value + "," + path
                        }));
                        return [2 /*return*/];
                }
            });
        });
    }
    function removeSelected() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, confirmAsync(selected.length + "\u4EF6\u306E\u30A2\u30A4\u30C6\u30E0\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F")];
                    case 1:
                        if (_a.sent()) {
                            props.onChange(props.field.field.clone({
                                value: props.field.field.value.split(",").filter(function (p) { return !selected.includes(p); }).join(",")
                            }));
                            setSelected([]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    return (jsxRuntime.jsxs(Box, { children: [jsxRuntime.jsxs(Box, __assign({ display: "flex" }, { children: [jsxRuntime.jsx(IconButton, __assign({ disabled: !selected.length, color: "primary", size: "small", style: { marginLeft: "auto" }, onClick: function () { return removeSelected(); } }, { children: jsxRuntime.jsx(Delete, {}, void 0) }), void 0),
                    jsxRuntime.jsx(IconButton, __assign({ disabled: !!selected.length, color: "primary", size: "small", onClick: function () { return addMedia(); } }, { children: jsxRuntime.jsx(Add, {}, void 0) }), void 0)] }), void 0),
            jsxRuntime.jsx(Box, __assign({ height: "368px", width: "100%", mt: 1, overflow: "hidden", style: {
                    overflowY: "auto",
                    position: "relative",
                    borderRadius: "2px",
                    background: "rgba(127,127,127,0.09)",
                } }, { children: jsxRuntime.jsx(PhotoGridView, { disableInvok: true, hideCheckbox: true, itemHeight: 90, span: 1, images: props.field.field.value.split(",").filter(function (x) { return !!x; }), selected: selected, baseUrl: axios.defaults.baseURL, multiSelect: true, selectionChanged: function (e) { return setSelected(e); } }, void 0) }), void 0)] }, void 0));
}

___$insertStyle("@charset \"UTF-8\";\n/*!\n * Quill Editor v1.3.7\n * https://quilljs.com/\n * Copyright (c) 2014, Jason Chen\n * Copyright (c) 2013, salesforce.com\n */\n.ql-container {\n  box-sizing: border-box;\n  font-family: Helvetica, Arial, sans-serif;\n  font-size: 13px;\n  height: 100%;\n  margin: 0px;\n  position: relative;\n}\n\n.ql-container.ql-disabled .ql-tooltip {\n  visibility: hidden;\n}\n\n.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\n  pointer-events: none;\n}\n\n.ql-clipboard {\n  left: -100000px;\n  height: 1px;\n  overflow-y: hidden;\n  position: absolute;\n  top: 50%;\n}\n\n.ql-clipboard p {\n  margin: 0;\n  padding: 0;\n}\n\n.ql-editor {\n  box-sizing: border-box;\n  line-height: 1.42;\n  height: 100%;\n  outline: none;\n  overflow-y: auto;\n  padding: 12px 15px;\n  tab-size: 4;\n  -moz-tab-size: 4;\n  text-align: left;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n\n.ql-editor > * {\n  cursor: text;\n}\n\n.ql-editor p,\n.ql-editor ol,\n.ql-editor ul,\n.ql-editor pre,\n.ql-editor blockquote,\n.ql-editor h1,\n.ql-editor h2,\n.ql-editor h3,\n.ql-editor h4,\n.ql-editor h5,\n.ql-editor h6 {\n  margin: 0;\n  padding: 0;\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n\n.ql-editor ol,\n.ql-editor ul {\n  padding-left: 1.5em;\n}\n\n.ql-editor ol > li,\n.ql-editor ul > li {\n  list-style-type: none;\n}\n\n.ql-editor ul > li::before {\n  content: \"•\";\n}\n\n.ql-editor ul[data-checked=true],\n.ql-editor ul[data-checked=false] {\n  pointer-events: none;\n}\n\n.ql-editor ul[data-checked=true] > li *,\n.ql-editor ul[data-checked=false] > li * {\n  pointer-events: all;\n}\n\n.ql-editor ul[data-checked=true] > li::before,\n.ql-editor ul[data-checked=false] > li::before {\n  color: #777;\n  cursor: pointer;\n  pointer-events: all;\n}\n\n.ql-editor ul[data-checked=true] > li::before {\n  content: \"☑\";\n}\n\n.ql-editor ul[data-checked=false] > li::before {\n  content: \"☐\";\n}\n\n.ql-editor li::before {\n  display: inline-block;\n  white-space: nowrap;\n  width: 1.2em;\n}\n\n.ql-editor li:not(.ql-direction-rtl)::before {\n  margin-left: -1.5em;\n  margin-right: 0.3em;\n  text-align: right;\n}\n\n.ql-editor li.ql-direction-rtl::before {\n  margin-left: 0.3em;\n  margin-right: -1.5em;\n}\n\n.ql-editor ol li:not(.ql-direction-rtl),\n.ql-editor ul li:not(.ql-direction-rtl) {\n  padding-left: 1.5em;\n}\n\n.ql-editor ol li.ql-direction-rtl,\n.ql-editor ul li.ql-direction-rtl {\n  padding-right: 1.5em;\n}\n\n.ql-editor ol li {\n  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n  counter-increment: list-0;\n}\n\n.ql-editor ol li:before {\n  content: counter(list-0, decimal) \". \";\n}\n\n.ql-editor ol li.ql-indent-1 {\n  counter-increment: list-1;\n}\n\n.ql-editor ol li.ql-indent-1:before {\n  content: counter(list-1, lower-alpha) \". \";\n}\n\n.ql-editor ol li.ql-indent-1 {\n  counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n\n.ql-editor ol li.ql-indent-2 {\n  counter-increment: list-2;\n}\n\n.ql-editor ol li.ql-indent-2:before {\n  content: counter(list-2, lower-roman) \". \";\n}\n\n.ql-editor ol li.ql-indent-2 {\n  counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n}\n\n.ql-editor ol li.ql-indent-3 {\n  counter-increment: list-3;\n}\n\n.ql-editor ol li.ql-indent-3:before {\n  content: counter(list-3, decimal) \". \";\n}\n\n.ql-editor ol li.ql-indent-3 {\n  counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;\n}\n\n.ql-editor ol li.ql-indent-4 {\n  counter-increment: list-4;\n}\n\n.ql-editor ol li.ql-indent-4:before {\n  content: counter(list-4, lower-alpha) \". \";\n}\n\n.ql-editor ol li.ql-indent-4 {\n  counter-reset: list-5 list-6 list-7 list-8 list-9;\n}\n\n.ql-editor ol li.ql-indent-5 {\n  counter-increment: list-5;\n}\n\n.ql-editor ol li.ql-indent-5:before {\n  content: counter(list-5, lower-roman) \". \";\n}\n\n.ql-editor ol li.ql-indent-5 {\n  counter-reset: list-6 list-7 list-8 list-9;\n}\n\n.ql-editor ol li.ql-indent-6 {\n  counter-increment: list-6;\n}\n\n.ql-editor ol li.ql-indent-6:before {\n  content: counter(list-6, decimal) \". \";\n}\n\n.ql-editor ol li.ql-indent-6 {\n  counter-reset: list-7 list-8 list-9;\n}\n\n.ql-editor ol li.ql-indent-7 {\n  counter-increment: list-7;\n}\n\n.ql-editor ol li.ql-indent-7:before {\n  content: counter(list-7, lower-alpha) \". \";\n}\n\n.ql-editor ol li.ql-indent-7 {\n  counter-reset: list-8 list-9;\n}\n\n.ql-editor ol li.ql-indent-8 {\n  counter-increment: list-8;\n}\n\n.ql-editor ol li.ql-indent-8:before {\n  content: counter(list-8, lower-roman) \". \";\n}\n\n.ql-editor ol li.ql-indent-8 {\n  counter-reset: list-9;\n}\n\n.ql-editor ol li.ql-indent-9 {\n  counter-increment: list-9;\n}\n\n.ql-editor ol li.ql-indent-9:before {\n  content: counter(list-9, decimal) \". \";\n}\n\n.ql-editor .ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 3em;\n}\n\n.ql-editor li.ql-indent-1:not(.ql-direction-rtl) {\n  padding-left: 4.5em;\n}\n\n.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 3em;\n}\n\n.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {\n  padding-right: 4.5em;\n}\n\n.ql-editor .ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 6em;\n}\n\n.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {\n  padding-left: 7.5em;\n}\n\n.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 6em;\n}\n\n.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {\n  padding-right: 7.5em;\n}\n\n.ql-editor .ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 9em;\n}\n\n.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {\n  padding-left: 10.5em;\n}\n\n.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 9em;\n}\n\n.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {\n  padding-right: 10.5em;\n}\n\n.ql-editor .ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 12em;\n}\n\n.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {\n  padding-left: 13.5em;\n}\n\n.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 12em;\n}\n\n.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {\n  padding-right: 13.5em;\n}\n\n.ql-editor .ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 15em;\n}\n\n.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {\n  padding-left: 16.5em;\n}\n\n.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 15em;\n}\n\n.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {\n  padding-right: 16.5em;\n}\n\n.ql-editor .ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 18em;\n}\n\n.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {\n  padding-left: 19.5em;\n}\n\n.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 18em;\n}\n\n.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {\n  padding-right: 19.5em;\n}\n\n.ql-editor .ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 21em;\n}\n\n.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {\n  padding-left: 22.5em;\n}\n\n.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 21em;\n}\n\n.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {\n  padding-right: 22.5em;\n}\n\n.ql-editor .ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 24em;\n}\n\n.ql-editor li.ql-indent-8:not(.ql-direction-rtl) {\n  padding-left: 25.5em;\n}\n\n.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 24em;\n}\n\n.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {\n  padding-right: 25.5em;\n}\n\n.ql-editor .ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 27em;\n}\n\n.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {\n  padding-left: 28.5em;\n}\n\n.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 27em;\n}\n\n.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {\n  padding-right: 28.5em;\n}\n\n.ql-editor .ql-video {\n  display: block;\n  max-width: 100%;\n}\n\n.ql-editor .ql-video.ql-align-center {\n  margin: 0 auto;\n}\n\n.ql-editor .ql-video.ql-align-right {\n  margin: 0 0 0 auto;\n}\n\n.ql-editor .ql-bg-black {\n  background-color: #000;\n}\n\n.ql-editor .ql-bg-red {\n  background-color: #e60000;\n}\n\n.ql-editor .ql-bg-orange {\n  background-color: #f90;\n}\n\n.ql-editor .ql-bg-yellow {\n  background-color: #ff0;\n}\n\n.ql-editor .ql-bg-green {\n  background-color: #008a00;\n}\n\n.ql-editor .ql-bg-blue {\n  background-color: #06c;\n}\n\n.ql-editor .ql-bg-purple {\n  background-color: #93f;\n}\n\n.ql-editor .ql-color-white {\n  color: #fff;\n}\n\n.ql-editor .ql-color-red {\n  color: #e60000;\n}\n\n.ql-editor .ql-color-orange {\n  color: #f90;\n}\n\n.ql-editor .ql-color-yellow {\n  color: #ff0;\n}\n\n.ql-editor .ql-color-green {\n  color: #008a00;\n}\n\n.ql-editor .ql-color-blue {\n  color: #06c;\n}\n\n.ql-editor .ql-color-purple {\n  color: #93f;\n}\n\n.ql-editor .ql-font-serif {\n  font-family: Georgia, Times New Roman, serif;\n}\n\n.ql-editor .ql-font-monospace {\n  font-family: Monaco, Courier New, monospace;\n}\n\n.ql-editor .ql-size-small {\n  font-size: 0.75em;\n}\n\n.ql-editor .ql-size-large {\n  font-size: 1.5em;\n}\n\n.ql-editor .ql-size-huge {\n  font-size: 2.5em;\n}\n\n.ql-editor .ql-direction-rtl {\n  direction: rtl;\n  text-align: inherit;\n}\n\n.ql-editor .ql-align-center {\n  text-align: center;\n}\n\n.ql-editor .ql-align-justify {\n  text-align: justify;\n}\n\n.ql-editor .ql-align-right {\n  text-align: right;\n}\n\n.ql-editor.ql-blank::before {\n  color: rgba(0, 0, 0, 0.6);\n  content: attr(data-placeholder);\n  font-style: italic;\n  left: 15px;\n  pointer-events: none;\n  position: absolute;\n  right: 15px;\n}\n\n.ql-snow.ql-toolbar:after,\n.ql-snow .ql-toolbar:after {\n  clear: both;\n  content: \"\";\n  display: table;\n}\n\n.ql-snow.ql-toolbar button,\n.ql-snow .ql-toolbar button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  display: inline-block;\n  float: left;\n  height: 24px;\n  padding: 3px 5px;\n  width: 28px;\n}\n\n.ql-snow.ql-toolbar button svg,\n.ql-snow .ql-toolbar button svg {\n  float: left;\n  height: 100%;\n}\n\n.ql-snow.ql-toolbar button:active:hover,\n.ql-snow .ql-toolbar button:active:hover {\n  outline: none;\n}\n\n.ql-snow.ql-toolbar input.ql-image[type=file],\n.ql-snow .ql-toolbar input.ql-image[type=file] {\n  display: none;\n}\n\n.ql-snow.ql-toolbar button:hover,\n.ql-snow .ql-toolbar button:hover,\n.ql-snow.ql-toolbar button:focus,\n.ql-snow .ql-toolbar button:focus,\n.ql-snow.ql-toolbar button.ql-active,\n.ql-snow .ql-toolbar button.ql-active,\n.ql-snow.ql-toolbar .ql-picker-label:hover,\n.ql-snow .ql-toolbar .ql-picker-label:hover,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active,\n.ql-snow.ql-toolbar .ql-picker-item:hover,\n.ql-snow .ql-toolbar .ql-picker-item:hover,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected {\n  color: #06c;\n}\n\n.ql-snow.ql-toolbar button:hover .ql-fill,\n.ql-snow .ql-toolbar button:hover .ql-fill,\n.ql-snow.ql-toolbar button:focus .ql-fill,\n.ql-snow .ql-toolbar button:focus .ql-fill,\n.ql-snow.ql-toolbar button.ql-active .ql-fill,\n.ql-snow .ql-toolbar button.ql-active .ql-fill,\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n.ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {\n  fill: #06c;\n}\n\n.ql-snow.ql-toolbar button:hover .ql-stroke,\n.ql-snow .ql-toolbar button:hover .ql-stroke,\n.ql-snow.ql-toolbar button:focus .ql-stroke,\n.ql-snow .ql-toolbar button:focus .ql-stroke,\n.ql-snow.ql-toolbar button.ql-active .ql-stroke,\n.ql-snow .ql-toolbar button.ql-active .ql-stroke,\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n.ql-snow.ql-toolbar button:hover .ql-stroke-miter,\n.ql-snow .ql-toolbar button:hover .ql-stroke-miter,\n.ql-snow.ql-toolbar button:focus .ql-stroke-miter,\n.ql-snow .ql-toolbar button:focus .ql-stroke-miter,\n.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,\n.ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,\n.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,\n.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {\n  stroke: #06c;\n}\n\n@media (pointer: coarse) {\n  .ql-snow.ql-toolbar button:hover:not(.ql-active),\n.ql-snow .ql-toolbar button:hover:not(.ql-active) {\n    color: #444;\n  }\n\n  .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,\n.ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,\n.ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,\n.ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {\n    fill: #444;\n  }\n\n  .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n.ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n.ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,\n.ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {\n    stroke: #444;\n  }\n}\n.ql-snow {\n  box-sizing: border-box;\n}\n\n.ql-snow * {\n  box-sizing: border-box;\n}\n\n.ql-snow .ql-hidden {\n  display: none;\n}\n\n.ql-snow .ql-out-bottom,\n.ql-snow .ql-out-top {\n  visibility: hidden;\n}\n\n.ql-snow .ql-tooltip {\n  position: absolute;\n  transform: translateY(10px);\n}\n\n.ql-snow .ql-tooltip a {\n  cursor: pointer;\n  text-decoration: none;\n}\n\n.ql-snow .ql-tooltip.ql-flip {\n  transform: translateY(-10px);\n}\n\n.ql-snow .ql-formats {\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.ql-snow .ql-formats:after {\n  clear: both;\n  content: \"\";\n  display: table;\n}\n\n.ql-snow .ql-stroke {\n  fill: none;\n  stroke: #444;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 2;\n}\n\n.ql-snow .ql-stroke-miter {\n  fill: none;\n  stroke: #444;\n  stroke-miterlimit: 10;\n  stroke-width: 2;\n}\n\n.ql-snow .ql-fill,\n.ql-snow .ql-stroke.ql-fill {\n  fill: #444;\n}\n\n.ql-snow .ql-empty {\n  fill: none;\n}\n\n.ql-snow .ql-even {\n  fill-rule: evenodd;\n}\n\n.ql-snow .ql-thin,\n.ql-snow .ql-stroke.ql-thin {\n  stroke-width: 1;\n}\n\n.ql-snow .ql-transparent {\n  opacity: 0.4;\n}\n\n.ql-snow .ql-direction svg:last-child {\n  display: none;\n}\n\n.ql-snow .ql-direction.ql-active svg:last-child {\n  display: inline;\n}\n\n.ql-snow .ql-direction.ql-active svg:first-child {\n  display: none;\n}\n\n.ql-snow .ql-editor h1 {\n  font-size: 2em;\n}\n\n.ql-snow .ql-editor h2 {\n  font-size: 1.5em;\n}\n\n.ql-snow .ql-editor h3 {\n  font-size: 1.17em;\n}\n\n.ql-snow .ql-editor h4 {\n  font-size: 1em;\n}\n\n.ql-snow .ql-editor h5 {\n  font-size: 0.83em;\n}\n\n.ql-snow .ql-editor h6 {\n  font-size: 0.67em;\n}\n\n.ql-snow .ql-editor a {\n  text-decoration: underline;\n}\n\n.ql-snow .ql-editor blockquote {\n  border-left: 4px solid #ccc;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  padding-left: 16px;\n}\n\n.ql-snow .ql-editor code,\n.ql-snow .ql-editor pre {\n  background-color: #f0f0f0;\n  border-radius: 3px;\n}\n\n.ql-snow .ql-editor pre {\n  white-space: pre-wrap;\n  margin-bottom: 5px;\n  margin-top: 5px;\n  padding: 5px 10px;\n}\n\n.ql-snow .ql-editor code {\n  font-size: 85%;\n  padding: 2px 4px;\n}\n\n.ql-snow .ql-editor pre.ql-syntax {\n  background-color: #23241f;\n  color: #f8f8f2;\n  overflow: visible;\n}\n\n.ql-snow .ql-editor img {\n  max-width: 100%;\n}\n\n.ql-snow .ql-picker {\n  color: #444;\n  display: inline-block;\n  float: left;\n  font-size: 14px;\n  font-weight: 500;\n  height: 24px;\n  position: relative;\n  vertical-align: middle;\n}\n\n.ql-snow .ql-picker-label {\n  cursor: pointer;\n  display: inline-block;\n  height: 100%;\n  padding-left: 8px;\n  padding-right: 2px;\n  position: relative;\n  width: 100%;\n}\n\n.ql-snow .ql-picker-label::before {\n  display: inline-block;\n  line-height: 22px;\n}\n\n.ql-snow .ql-picker-options {\n  background-color: #fff;\n  display: none;\n  min-width: 100%;\n  padding: 4px 8px;\n  position: absolute;\n  white-space: nowrap;\n}\n\n.ql-snow .ql-picker-options .ql-picker-item {\n  cursor: pointer;\n  display: block;\n  padding-bottom: 5px;\n  padding-top: 5px;\n}\n\n.ql-snow .ql-picker.ql-expanded .ql-picker-label {\n  color: #ccc;\n  z-index: 2;\n}\n\n.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {\n  fill: #ccc;\n}\n\n.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {\n  stroke: #ccc;\n}\n\n.ql-snow .ql-picker.ql-expanded .ql-picker-options {\n  display: block;\n  margin-top: -1px;\n  top: 100%;\n  z-index: 1;\n}\n\n.ql-snow .ql-color-picker,\n.ql-snow .ql-icon-picker {\n  width: 28px;\n}\n\n.ql-snow .ql-color-picker .ql-picker-label,\n.ql-snow .ql-icon-picker .ql-picker-label {\n  padding: 2px 4px;\n}\n\n.ql-snow .ql-color-picker .ql-picker-label svg,\n.ql-snow .ql-icon-picker .ql-picker-label svg {\n  right: 4px;\n}\n\n.ql-snow .ql-icon-picker .ql-picker-options {\n  padding: 4px 0px;\n}\n\n.ql-snow .ql-icon-picker .ql-picker-item {\n  height: 24px;\n  width: 24px;\n  padding: 2px 4px;\n}\n\n.ql-snow .ql-color-picker .ql-picker-options {\n  padding: 3px 5px;\n  width: 152px;\n}\n\n.ql-snow .ql-color-picker .ql-picker-item {\n  border: 1px solid transparent;\n  float: left;\n  height: 16px;\n  margin: 2px;\n  padding: 0px;\n  width: 16px;\n}\n\n.ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {\n  position: absolute;\n  margin-top: -9px;\n  right: 0;\n  top: 50%;\n  width: 18px;\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=\"\"])::before,\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=\"\"])::before,\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=\"\"])::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=\"\"])::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=\"\"])::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=\"\"])::before {\n  content: attr(data-label);\n}\n\n.ql-snow .ql-picker.ql-header {\n  width: 98px;\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-label::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item::before {\n  content: \"Normal\";\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"1\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before {\n  content: \"Heading 1\";\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"2\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before {\n  content: \"Heading 2\";\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"3\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before {\n  content: \"Heading 3\";\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"4\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before {\n  content: \"Heading 4\";\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"5\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before {\n  content: \"Heading 5\";\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"6\"]::before,\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before {\n  content: \"Heading 6\";\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before {\n  font-size: 2em;\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before {\n  font-size: 1.5em;\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before {\n  font-size: 1.17em;\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before {\n  font-size: 1em;\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before {\n  font-size: 0.83em;\n}\n\n.ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before {\n  font-size: 0.67em;\n}\n\n.ql-snow .ql-picker.ql-font {\n  width: 108px;\n}\n\n.ql-snow .ql-picker.ql-font .ql-picker-label::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item::before {\n  content: \"Sans Serif\";\n}\n\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n  content: \"Serif\";\n}\n\n.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n  content: \"Monospace\";\n}\n\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n  font-family: Georgia, Times New Roman, serif;\n}\n\n.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n  font-family: Monaco, Courier New, monospace;\n}\n\n.ql-snow .ql-picker.ql-size {\n  width: 98px;\n}\n\n.ql-snow .ql-picker.ql-size .ql-picker-label::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item::before {\n  content: \"Normal\";\n}\n\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n  content: \"Small\";\n}\n\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n  content: \"Large\";\n}\n\n.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n  content: \"Huge\";\n}\n\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n  font-size: 10px;\n}\n\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n  font-size: 18px;\n}\n\n.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n  font-size: 32px;\n}\n\n.ql-snow .ql-color-picker.ql-background .ql-picker-item {\n  background-color: #fff;\n}\n\n.ql-snow .ql-color-picker.ql-color .ql-picker-item {\n  background-color: #000;\n}\n\n.ql-toolbar.ql-snow {\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n  font-family: \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif;\n  padding: 8px;\n}\n\n.ql-toolbar.ql-snow .ql-formats {\n  margin-right: 15px;\n}\n\n.ql-toolbar.ql-snow .ql-picker-label {\n  border: 1px solid transparent;\n}\n\n.ql-toolbar.ql-snow .ql-picker-options {\n  border: 1px solid transparent;\n  box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;\n}\n\n.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {\n  border-color: #ccc;\n}\n\n.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {\n  border-color: #ccc;\n}\n\n.ql-toolbar.ql-snow .ql-color-picker .ql-picker-item.ql-selected,\n.ql-toolbar.ql-snow .ql-color-picker .ql-picker-item:hover {\n  border-color: #000;\n}\n\n.ql-toolbar.ql-snow + .ql-container.ql-snow {\n  border-top: 0px;\n}\n\n.ql-snow .ql-tooltip {\n  background-color: #fff;\n  border: 1px solid #ccc;\n  box-shadow: 0px 0px 5px #ddd;\n  color: #444;\n  padding: 5px 12px;\n  white-space: nowrap;\n}\n\n.ql-snow .ql-tooltip::before {\n  content: \"Visit URL:\";\n  line-height: 26px;\n  margin-right: 8px;\n}\n\n.ql-snow .ql-tooltip input[type=text] {\n  display: none;\n  border: 1px solid #ccc;\n  font-size: 13px;\n  height: 26px;\n  margin: 0px;\n  padding: 3px 5px;\n  width: 170px;\n}\n\n.ql-snow .ql-tooltip a.ql-preview {\n  display: inline-block;\n  max-width: 200px;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  vertical-align: top;\n}\n\n.ql-snow .ql-tooltip a.ql-action::after {\n  border-right: 1px solid #ccc;\n  content: \"Edit\";\n  margin-left: 16px;\n  padding-right: 8px;\n}\n\n.ql-snow .ql-tooltip a.ql-remove::before {\n  content: \"Remove\";\n  margin-left: 8px;\n}\n\n.ql-snow .ql-tooltip a {\n  line-height: 26px;\n}\n\n.ql-snow .ql-tooltip.ql-editing a.ql-preview,\n.ql-snow .ql-tooltip.ql-editing a.ql-remove {\n  display: none;\n}\n\n.ql-snow .ql-tooltip.ql-editing input[type=text] {\n  display: inline-block;\n}\n\n.ql-snow .ql-tooltip.ql-editing a.ql-action::after {\n  border-right: 0px;\n  content: \"Save\";\n  padding-right: 0px;\n}\n\n.ql-snow .ql-tooltip[data-mode=link]::before {\n  content: \"Enter link:\";\n}\n\n.ql-snow .ql-tooltip[data-mode=formula]::before {\n  content: \"Enter formula:\";\n}\n\n.ql-snow .ql-tooltip[data-mode=video]::before {\n  content: \"Enter video:\";\n}\n\n.ql-snow a {\n  color: #06c;\n}\n\n.ql-container.ql-snow {\n  border: 1px solid #ccc;\n}");

/*!
 * Quill Editor v1.3.7
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
var quill = createCommonjsModule(function (module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
  })(typeof self !== 'undefined' ? self : commonjsGlobal, function () {
    return (
      /******/
      function (modules) {
        // webpackBootstrap

        /******/
        // The module cache

        /******/
        var installedModules = {};
        /******/

        /******/
        // The require function

        /******/

        function __webpack_require__(moduleId) {
          /******/

          /******/
          // Check if module is in cache

          /******/
          if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
          }
          /******/
          // Create a new module (and put it into the cache)

          /******/


          var module = installedModules[moduleId] = {
            /******/
            i: moduleId,

            /******/
            l: false,

            /******/
            exports: {}
            /******/

          };
          /******/

          /******/
          // Execute the module function

          /******/

          modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          /******/

          /******/
          // Flag the module as loaded

          /******/

          module.l = true;
          /******/

          /******/
          // Return the exports of the module

          /******/

          return module.exports;
          /******/
        }
        /******/

        /******/

        /******/
        // expose the modules object (__webpack_modules__)

        /******/


        __webpack_require__.m = modules;
        /******/

        /******/
        // expose the module cache

        /******/

        __webpack_require__.c = installedModules;
        /******/

        /******/
        // define getter function for harmony exports

        /******/

        __webpack_require__.d = function (exports, name, getter) {
          /******/
          if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {
              /******/
              configurable: false,

              /******/
              enumerable: true,

              /******/
              get: getter
              /******/

            });
            /******/
          }
          /******/

        };
        /******/

        /******/
        // getDefaultExport function for compatibility with non-harmony modules

        /******/


        __webpack_require__.n = function (module) {
          /******/
          var getter = module && module.__esModule ?
          /******/
          function getDefault() {
            return module['default'];
          } :
          /******/
          function getModuleExports() {
            return module;
          };
          /******/

          __webpack_require__.d(getter, 'a', getter);
          /******/


          return getter;
          /******/
        };
        /******/

        /******/
        // Object.prototype.hasOwnProperty.call

        /******/


        __webpack_require__.o = function (object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/

        /******/
        // __webpack_public_path__

        /******/


        __webpack_require__.p = "";
        /******/

        /******/
        // Load entry module and return exports

        /******/

        return __webpack_require__(__webpack_require__.s = 109);
        /******/
      }(
      /************************************************************************/

      /******/
      [
      /* 0 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var container_1 = __webpack_require__(17);

        var format_1 = __webpack_require__(18);

        var leaf_1 = __webpack_require__(19);

        var scroll_1 = __webpack_require__(45);

        var inline_1 = __webpack_require__(46);

        var block_1 = __webpack_require__(47);

        var embed_1 = __webpack_require__(48);

        var text_1 = __webpack_require__(49);

        var attributor_1 = __webpack_require__(12);

        var class_1 = __webpack_require__(32);

        var style_1 = __webpack_require__(33);

        var store_1 = __webpack_require__(31);

        var Registry = __webpack_require__(1);

        var Parchment = {
          Scope: Registry.Scope,
          create: Registry.create,
          find: Registry.find,
          query: Registry.query,
          register: Registry.register,
          Container: container_1.default,
          Format: format_1.default,
          Leaf: leaf_1.default,
          Embed: embed_1.default,
          Scroll: scroll_1.default,
          Block: block_1.default,
          Inline: inline_1.default,
          Text: text_1.default,
          Attributor: {
            Attribute: attributor_1.default,
            Class: class_1.default,
            Style: style_1.default,
            Store: store_1.default
          }
        };
        exports.default = Parchment;
        /***/
      },
      /* 1 */

      /***/
      function (module, exports, __webpack_require__) {

        var __extends = this && this.__extends || function () {
          var extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };

          return function (d, b) {
            extendStatics(d, b);

            function __() {
              this.constructor = d;
            }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var ParchmentError =
        /** @class */
        function (_super) {
          __extends(ParchmentError, _super);

          function ParchmentError(message) {
            var _this = this;

            message = '[Parchment] ' + message;
            _this = _super.call(this, message) || this;
            _this.message = message;
            _this.name = _this.constructor.name;
            return _this;
          }

          return ParchmentError;
        }(Error);

        exports.ParchmentError = ParchmentError;
        var attributes = {};
        var classes = {};
        var tags = {};
        var types = {};
        exports.DATA_KEY = '__blot';
        var Scope;

        (function (Scope) {
          Scope[Scope["TYPE"] = 3] = "TYPE";
          Scope[Scope["LEVEL"] = 12] = "LEVEL";
          Scope[Scope["ATTRIBUTE"] = 13] = "ATTRIBUTE";
          Scope[Scope["BLOT"] = 14] = "BLOT";
          Scope[Scope["INLINE"] = 7] = "INLINE";
          Scope[Scope["BLOCK"] = 11] = "BLOCK";
          Scope[Scope["BLOCK_BLOT"] = 10] = "BLOCK_BLOT";
          Scope[Scope["INLINE_BLOT"] = 6] = "INLINE_BLOT";
          Scope[Scope["BLOCK_ATTRIBUTE"] = 9] = "BLOCK_ATTRIBUTE";
          Scope[Scope["INLINE_ATTRIBUTE"] = 5] = "INLINE_ATTRIBUTE";
          Scope[Scope["ANY"] = 15] = "ANY";
        })(Scope = exports.Scope || (exports.Scope = {}));

        function create(input, value) {
          var match = query(input);

          if (match == null) {
            throw new ParchmentError("Unable to create " + input + " blot");
          }

          var BlotClass = match;
          var node = // @ts-ignore
          input instanceof Node || input['nodeType'] === Node.TEXT_NODE ? input : BlotClass.create(value);
          return new BlotClass(node, value);
        }

        exports.create = create;

        function find(node, bubble) {
          if (bubble === void 0) {
            bubble = false;
          }

          if (node == null) return null; // @ts-ignore

          if (node[exports.DATA_KEY] != null) return node[exports.DATA_KEY].blot;
          if (bubble) return find(node.parentNode, bubble);
          return null;
        }

        exports.find = find;

        function query(query, scope) {
          if (scope === void 0) {
            scope = Scope.ANY;
          }

          var match;

          if (typeof query === 'string') {
            match = types[query] || attributes[query]; // @ts-ignore
          } else if (query instanceof Text || query['nodeType'] === Node.TEXT_NODE) {
            match = types['text'];
          } else if (typeof query === 'number') {
            if (query & Scope.LEVEL & Scope.BLOCK) {
              match = types['block'];
            } else if (query & Scope.LEVEL & Scope.INLINE) {
              match = types['inline'];
            }
          } else if (query instanceof HTMLElement) {
            var names = (query.getAttribute('class') || '').split(/\s+/);

            for (var i in names) {
              match = classes[names[i]];
              if (match) break;
            }

            match = match || tags[query.tagName];
          }

          if (match == null) return null; // @ts-ignore

          if (scope & Scope.LEVEL & match.scope && scope & Scope.TYPE & match.scope) return match;
          return null;
        }

        exports.query = query;

        function register() {
          var Definitions = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            Definitions[_i] = arguments[_i];
          }

          if (Definitions.length > 1) {
            return Definitions.map(function (d) {
              return register(d);
            });
          }

          var Definition = Definitions[0];

          if (typeof Definition.blotName !== 'string' && typeof Definition.attrName !== 'string') {
            throw new ParchmentError('Invalid definition');
          } else if (Definition.blotName === 'abstract') {
            throw new ParchmentError('Cannot register abstract class');
          }

          types[Definition.blotName || Definition.attrName] = Definition;

          if (typeof Definition.keyName === 'string') {
            attributes[Definition.keyName] = Definition;
          } else {
            if (Definition.className != null) {
              classes[Definition.className] = Definition;
            }

            if (Definition.tagName != null) {
              if (Array.isArray(Definition.tagName)) {
                Definition.tagName = Definition.tagName.map(function (tagName) {
                  return tagName.toUpperCase();
                });
              } else {
                Definition.tagName = Definition.tagName.toUpperCase();
              }

              var tagNames = Array.isArray(Definition.tagName) ? Definition.tagName : [Definition.tagName];
              tagNames.forEach(function (tag) {
                if (tags[tag] == null || Definition.className == null) {
                  tags[tag] = Definition;
                }
              });
            }
          }

          return Definition;
        }

        exports.register = register;
        /***/
      },
      /* 2 */

      /***/
      function (module, exports, __webpack_require__) {
        var diff = __webpack_require__(51);

        var equal = __webpack_require__(11);

        var extend = __webpack_require__(3);

        var op = __webpack_require__(20);

        var NULL_CHARACTER = String.fromCharCode(0); // Placeholder char for embed in diff()

        var Delta = function (ops) {
          // Assume we are given a well formed ops
          if (Array.isArray(ops)) {
            this.ops = ops;
          } else if (ops != null && Array.isArray(ops.ops)) {
            this.ops = ops.ops;
          } else {
            this.ops = [];
          }
        };

        Delta.prototype.insert = function (text, attributes) {
          var newOp = {};
          if (text.length === 0) return this;
          newOp.insert = text;

          if (attributes != null && typeof attributes === 'object' && Object.keys(attributes).length > 0) {
            newOp.attributes = attributes;
          }

          return this.push(newOp);
        };

        Delta.prototype['delete'] = function (length) {
          if (length <= 0) return this;
          return this.push({
            'delete': length
          });
        };

        Delta.prototype.retain = function (length, attributes) {
          if (length <= 0) return this;
          var newOp = {
            retain: length
          };

          if (attributes != null && typeof attributes === 'object' && Object.keys(attributes).length > 0) {
            newOp.attributes = attributes;
          }

          return this.push(newOp);
        };

        Delta.prototype.push = function (newOp) {
          var index = this.ops.length;
          var lastOp = this.ops[index - 1];
          newOp = extend(true, {}, newOp);

          if (typeof lastOp === 'object') {
            if (typeof newOp['delete'] === 'number' && typeof lastOp['delete'] === 'number') {
              this.ops[index - 1] = {
                'delete': lastOp['delete'] + newOp['delete']
              };
              return this;
            } // Since it does not matter if we insert before or after deleting at the same index,
            // always prefer to insert first


            if (typeof lastOp['delete'] === 'number' && newOp.insert != null) {
              index -= 1;
              lastOp = this.ops[index - 1];

              if (typeof lastOp !== 'object') {
                this.ops.unshift(newOp);
                return this;
              }
            }

            if (equal(newOp.attributes, lastOp.attributes)) {
              if (typeof newOp.insert === 'string' && typeof lastOp.insert === 'string') {
                this.ops[index - 1] = {
                  insert: lastOp.insert + newOp.insert
                };
                if (typeof newOp.attributes === 'object') this.ops[index - 1].attributes = newOp.attributes;
                return this;
              } else if (typeof newOp.retain === 'number' && typeof lastOp.retain === 'number') {
                this.ops[index - 1] = {
                  retain: lastOp.retain + newOp.retain
                };
                if (typeof newOp.attributes === 'object') this.ops[index - 1].attributes = newOp.attributes;
                return this;
              }
            }
          }

          if (index === this.ops.length) {
            this.ops.push(newOp);
          } else {
            this.ops.splice(index, 0, newOp);
          }

          return this;
        };

        Delta.prototype.chop = function () {
          var lastOp = this.ops[this.ops.length - 1];

          if (lastOp && lastOp.retain && !lastOp.attributes) {
            this.ops.pop();
          }

          return this;
        };

        Delta.prototype.filter = function (predicate) {
          return this.ops.filter(predicate);
        };

        Delta.prototype.forEach = function (predicate) {
          this.ops.forEach(predicate);
        };

        Delta.prototype.map = function (predicate) {
          return this.ops.map(predicate);
        };

        Delta.prototype.partition = function (predicate) {
          var passed = [],
              failed = [];
          this.forEach(function (op) {
            var target = predicate(op) ? passed : failed;
            target.push(op);
          });
          return [passed, failed];
        };

        Delta.prototype.reduce = function (predicate, initial) {
          return this.ops.reduce(predicate, initial);
        };

        Delta.prototype.changeLength = function () {
          return this.reduce(function (length, elem) {
            if (elem.insert) {
              return length + op.length(elem);
            } else if (elem.delete) {
              return length - elem.delete;
            }

            return length;
          }, 0);
        };

        Delta.prototype.length = function () {
          return this.reduce(function (length, elem) {
            return length + op.length(elem);
          }, 0);
        };

        Delta.prototype.slice = function (start, end) {
          start = start || 0;
          if (typeof end !== 'number') end = Infinity;
          var ops = [];
          var iter = op.iterator(this.ops);
          var index = 0;

          while (index < end && iter.hasNext()) {
            var nextOp;

            if (index < start) {
              nextOp = iter.next(start - index);
            } else {
              nextOp = iter.next(end - index);
              ops.push(nextOp);
            }

            index += op.length(nextOp);
          }

          return new Delta(ops);
        };

        Delta.prototype.compose = function (other) {
          var thisIter = op.iterator(this.ops);
          var otherIter = op.iterator(other.ops);
          var ops = [];
          var firstOther = otherIter.peek();

          if (firstOther != null && typeof firstOther.retain === 'number' && firstOther.attributes == null) {
            var firstLeft = firstOther.retain;

            while (thisIter.peekType() === 'insert' && thisIter.peekLength() <= firstLeft) {
              firstLeft -= thisIter.peekLength();
              ops.push(thisIter.next());
            }

            if (firstOther.retain - firstLeft > 0) {
              otherIter.next(firstOther.retain - firstLeft);
            }
          }

          var delta = new Delta(ops);

          while (thisIter.hasNext() || otherIter.hasNext()) {
            if (otherIter.peekType() === 'insert') {
              delta.push(otherIter.next());
            } else if (thisIter.peekType() === 'delete') {
              delta.push(thisIter.next());
            } else {
              var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
              var thisOp = thisIter.next(length);
              var otherOp = otherIter.next(length);

              if (typeof otherOp.retain === 'number') {
                var newOp = {};

                if (typeof thisOp.retain === 'number') {
                  newOp.retain = length;
                } else {
                  newOp.insert = thisOp.insert;
                } // Preserve null when composing with a retain, otherwise remove it for inserts


                var attributes = op.attributes.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === 'number');
                if (attributes) newOp.attributes = attributes;
                delta.push(newOp); // Optimization if rest of other is just retain

                if (!otherIter.hasNext() && equal(delta.ops[delta.ops.length - 1], newOp)) {
                  var rest = new Delta(thisIter.rest());
                  return delta.concat(rest).chop();
                } // Other op should be delete, we could be an insert or retain
                // Insert + delete cancels out

              } else if (typeof otherOp['delete'] === 'number' && typeof thisOp.retain === 'number') {
                delta.push(otherOp);
              }
            }
          }

          return delta.chop();
        };

        Delta.prototype.concat = function (other) {
          var delta = new Delta(this.ops.slice());

          if (other.ops.length > 0) {
            delta.push(other.ops[0]);
            delta.ops = delta.ops.concat(other.ops.slice(1));
          }

          return delta;
        };

        Delta.prototype.diff = function (other, index) {
          if (this.ops === other.ops) {
            return new Delta();
          }

          var strings = [this, other].map(function (delta) {
            return delta.map(function (op) {
              if (op.insert != null) {
                return typeof op.insert === 'string' ? op.insert : NULL_CHARACTER;
              }

              var prep = delta === other ? 'on' : 'with';
              throw new Error('diff() called ' + prep + ' non-document');
            }).join('');
          });
          var delta = new Delta();
          var diffResult = diff(strings[0], strings[1], index);
          var thisIter = op.iterator(this.ops);
          var otherIter = op.iterator(other.ops);
          diffResult.forEach(function (component) {
            var length = component[1].length;

            while (length > 0) {
              var opLength = 0;

              switch (component[0]) {
                case diff.INSERT:
                  opLength = Math.min(otherIter.peekLength(), length);
                  delta.push(otherIter.next(opLength));
                  break;

                case diff.DELETE:
                  opLength = Math.min(length, thisIter.peekLength());
                  thisIter.next(opLength);
                  delta['delete'](opLength);
                  break;

                case diff.EQUAL:
                  opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);
                  var thisOp = thisIter.next(opLength);
                  var otherOp = otherIter.next(opLength);

                  if (equal(thisOp.insert, otherOp.insert)) {
                    delta.retain(opLength, op.attributes.diff(thisOp.attributes, otherOp.attributes));
                  } else {
                    delta.push(otherOp)['delete'](opLength);
                  }

                  break;
              }

              length -= opLength;
            }
          });
          return delta.chop();
        };

        Delta.prototype.eachLine = function (predicate, newline) {
          newline = newline || '\n';
          var iter = op.iterator(this.ops);
          var line = new Delta();
          var i = 0;

          while (iter.hasNext()) {
            if (iter.peekType() !== 'insert') return;
            var thisOp = iter.peek();
            var start = op.length(thisOp) - iter.peekLength();
            var index = typeof thisOp.insert === 'string' ? thisOp.insert.indexOf(newline, start) - start : -1;

            if (index < 0) {
              line.push(iter.next());
            } else if (index > 0) {
              line.push(iter.next(index));
            } else {
              if (predicate(line, iter.next(1).attributes || {}, i) === false) {
                return;
              }

              i += 1;
              line = new Delta();
            }
          }

          if (line.length() > 0) {
            predicate(line, {}, i);
          }
        };

        Delta.prototype.transform = function (other, priority) {
          priority = !!priority;

          if (typeof other === 'number') {
            return this.transformPosition(other, priority);
          }

          var thisIter = op.iterator(this.ops);
          var otherIter = op.iterator(other.ops);
          var delta = new Delta();

          while (thisIter.hasNext() || otherIter.hasNext()) {
            if (thisIter.peekType() === 'insert' && (priority || otherIter.peekType() !== 'insert')) {
              delta.retain(op.length(thisIter.next()));
            } else if (otherIter.peekType() === 'insert') {
              delta.push(otherIter.next());
            } else {
              var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
              var thisOp = thisIter.next(length);
              var otherOp = otherIter.next(length);

              if (thisOp['delete']) {
                // Our delete either makes their delete redundant or removes their retain
                continue;
              } else if (otherOp['delete']) {
                delta.push(otherOp);
              } else {
                // We retain either their retain or insert
                delta.retain(length, op.attributes.transform(thisOp.attributes, otherOp.attributes, priority));
              }
            }
          }

          return delta.chop();
        };

        Delta.prototype.transformPosition = function (index, priority) {
          priority = !!priority;
          var thisIter = op.iterator(this.ops);
          var offset = 0;

          while (thisIter.hasNext() && offset <= index) {
            var length = thisIter.peekLength();
            var nextType = thisIter.peekType();
            thisIter.next();

            if (nextType === 'delete') {
              index -= Math.min(length, index - offset);
              continue;
            } else if (nextType === 'insert' && (offset < index || !priority)) {
              index += length;
            }

            offset += length;
          }

          return index;
        };

        module.exports = Delta;
        /***/
      },
      /* 3 */

      /***/
      function (module, exports) {

        var hasOwn = Object.prototype.hasOwnProperty;
        var toStr = Object.prototype.toString;
        var defineProperty = Object.defineProperty;
        var gOPD = Object.getOwnPropertyDescriptor;

        var isArray = function isArray(arr) {
          if (typeof Array.isArray === 'function') {
            return Array.isArray(arr);
          }

          return toStr.call(arr) === '[object Array]';
        };

        var isPlainObject = function isPlainObject(obj) {
          if (!obj || toStr.call(obj) !== '[object Object]') {
            return false;
          }

          var hasOwnConstructor = hasOwn.call(obj, 'constructor');
          var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf'); // Not own constructor property must be Object

          if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
            return false;
          } // Own properties are enumerated firstly, so to speed up,
          // if last one is own, then all properties are own.


          var key;

          for (key in obj) {
            /**/
          }

          return typeof key === 'undefined' || hasOwn.call(obj, key);
        }; // If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target


        var setProperty = function setProperty(target, options) {
          if (defineProperty && options.name === '__proto__') {
            defineProperty(target, options.name, {
              enumerable: true,
              configurable: true,
              value: options.newValue,
              writable: true
            });
          } else {
            target[options.name] = options.newValue;
          }
        }; // Return undefined instead of __proto__ if '__proto__' is not an own property


        var getProperty = function getProperty(obj, name) {
          if (name === '__proto__') {
            if (!hasOwn.call(obj, name)) {
              return void 0;
            } else if (gOPD) {
              // In early versions of node, obj['__proto__'] is buggy when obj has
              // __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
              return gOPD(obj, name).value;
            }
          }

          return obj[name];
        };

        module.exports = function extend() {
          var options, name, src, copy, copyIsArray, clone;
          var target = arguments[0];
          var i = 1;
          var length = arguments.length;
          var deep = false; // Handle a deep copy situation

          if (typeof target === 'boolean') {
            deep = target;
            target = arguments[1] || {}; // skip the boolean and the target

            i = 2;
          }

          if (target == null || typeof target !== 'object' && typeof target !== 'function') {
            target = {};
          }

          for (; i < length; ++i) {
            options = arguments[i]; // Only deal with non-null/undefined values

            if (options != null) {
              // Extend the base object
              for (name in options) {
                src = getProperty(target, name);
                copy = getProperty(options, name); // Prevent never-ending loop

                if (target !== copy) {
                  // Recurse if we're merging plain objects or arrays
                  if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                    if (copyIsArray) {
                      copyIsArray = false;
                      clone = src && isArray(src) ? src : [];
                    } else {
                      clone = src && isPlainObject(src) ? src : {};
                    } // Never move original objects, clone them


                    setProperty(target, {
                      name: name,
                      newValue: extend(deep, clone, copy)
                    }); // Don't bring in undefined values
                  } else if (typeof copy !== 'undefined') {
                    setProperty(target, {
                      name: name,
                      newValue: copy
                    });
                  }
                }
              }
            }
          } // Return the modified object


          return target;
        };
        /***/

      },
      /* 4 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = exports.BlockEmbed = exports.bubbleFormats = undefined;

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _extend = __webpack_require__(3);

        var _extend2 = _interopRequireDefault(_extend);

        var _quillDelta = __webpack_require__(2);

        var _quillDelta2 = _interopRequireDefault(_quillDelta);

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _break = __webpack_require__(16);

        var _break2 = _interopRequireDefault(_break);

        var _inline = __webpack_require__(6);

        var _inline2 = _interopRequireDefault(_inline);

        var _text = __webpack_require__(7);

        var _text2 = _interopRequireDefault(_text);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var NEWLINE_LENGTH = 1;

        var BlockEmbed = function (_Parchment$Embed) {
          _inherits(BlockEmbed, _Parchment$Embed);

          function BlockEmbed() {
            _classCallCheck(this, BlockEmbed);

            return _possibleConstructorReturn(this, (BlockEmbed.__proto__ || Object.getPrototypeOf(BlockEmbed)).apply(this, arguments));
          }

          _createClass(BlockEmbed, [{
            key: 'attach',
            value: function attach() {
              _get(BlockEmbed.prototype.__proto__ || Object.getPrototypeOf(BlockEmbed.prototype), 'attach', this).call(this);

              this.attributes = new _parchment2.default.Attributor.Store(this.domNode);
            }
          }, {
            key: 'delta',
            value: function delta() {
              return new _quillDelta2.default().insert(this.value(), (0, _extend2.default)(this.formats(), this.attributes.values()));
            }
          }, {
            key: 'format',
            value: function format(name, value) {
              var attribute = _parchment2.default.query(name, _parchment2.default.Scope.BLOCK_ATTRIBUTE);

              if (attribute != null) {
                this.attributes.attribute(attribute, value);
              }
            }
          }, {
            key: 'formatAt',
            value: function formatAt(index, length, name, value) {
              this.format(name, value);
            }
          }, {
            key: 'insertAt',
            value: function insertAt(index, value, def) {
              if (typeof value === 'string' && value.endsWith('\n')) {
                var block = _parchment2.default.create(Block.blotName);

                this.parent.insertBefore(block, index === 0 ? this : this.next);
                block.insertAt(0, value.slice(0, -1));
              } else {
                _get(BlockEmbed.prototype.__proto__ || Object.getPrototypeOf(BlockEmbed.prototype), 'insertAt', this).call(this, index, value, def);
              }
            }
          }]);

          return BlockEmbed;
        }(_parchment2.default.Embed);

        BlockEmbed.scope = _parchment2.default.Scope.BLOCK_BLOT; // It is important for cursor behavior BlockEmbeds use tags that are block level elements

        var Block = function (_Parchment$Block) {
          _inherits(Block, _Parchment$Block);

          function Block(domNode) {
            _classCallCheck(this, Block);

            var _this2 = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, domNode));

            _this2.cache = {};
            return _this2;
          }

          _createClass(Block, [{
            key: 'delta',
            value: function delta() {
              if (this.cache.delta == null) {
                this.cache.delta = this.descendants(_parchment2.default.Leaf).reduce(function (delta, leaf) {
                  if (leaf.length() === 0) {
                    return delta;
                  } else {
                    return delta.insert(leaf.value(), bubbleFormats(leaf));
                  }
                }, new _quillDelta2.default()).insert('\n', bubbleFormats(this));
              }

              return this.cache.delta;
            }
          }, {
            key: 'deleteAt',
            value: function deleteAt(index, length) {
              _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'deleteAt', this).call(this, index, length);

              this.cache = {};
            }
          }, {
            key: 'formatAt',
            value: function formatAt(index, length, name, value) {
              if (length <= 0) return;

              if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK)) {
                if (index + length === this.length()) {
                  this.format(name, value);
                }
              } else {
                _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'formatAt', this).call(this, index, Math.min(length, this.length() - index - 1), name, value);
              }

              this.cache = {};
            }
          }, {
            key: 'insertAt',
            value: function insertAt(index, value, def) {
              if (def != null) return _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertAt', this).call(this, index, value, def);
              if (value.length === 0) return;
              var lines = value.split('\n');
              var text = lines.shift();

              if (text.length > 0) {
                if (index < this.length() - 1 || this.children.tail == null) {
                  _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertAt', this).call(this, Math.min(index, this.length() - 1), text);
                } else {
                  this.children.tail.insertAt(this.children.tail.length(), text);
                }

                this.cache = {};
              }

              var block = this;
              lines.reduce(function (index, line) {
                block = block.split(index, true);
                block.insertAt(0, line);
                return line.length;
              }, index + text.length);
            }
          }, {
            key: 'insertBefore',
            value: function insertBefore(blot, ref) {
              var head = this.children.head;

              _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertBefore', this).call(this, blot, ref);

              if (head instanceof _break2.default) {
                head.remove();
              }

              this.cache = {};
            }
          }, {
            key: 'length',
            value: function length() {
              if (this.cache.length == null) {
                this.cache.length = _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'length', this).call(this) + NEWLINE_LENGTH;
              }

              return this.cache.length;
            }
          }, {
            key: 'moveChildren',
            value: function moveChildren(target, ref) {
              _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'moveChildren', this).call(this, target, ref);

              this.cache = {};
            }
          }, {
            key: 'optimize',
            value: function optimize(context) {
              _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'optimize', this).call(this, context);

              this.cache = {};
            }
          }, {
            key: 'path',
            value: function path(index) {
              return _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'path', this).call(this, index, true);
            }
          }, {
            key: 'removeChild',
            value: function removeChild(child) {
              _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'removeChild', this).call(this, child);

              this.cache = {};
            }
          }, {
            key: 'split',
            value: function split(index) {
              var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

              if (force && (index === 0 || index >= this.length() - NEWLINE_LENGTH)) {
                var clone = this.clone();

                if (index === 0) {
                  this.parent.insertBefore(clone, this);
                  return this;
                } else {
                  this.parent.insertBefore(clone, this.next);
                  return clone;
                }
              } else {
                var next = _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'split', this).call(this, index, force);

                this.cache = {};
                return next;
              }
            }
          }]);

          return Block;
        }(_parchment2.default.Block);

        Block.blotName = 'block';
        Block.tagName = 'P';
        Block.defaultChild = 'break';
        Block.allowedChildren = [_inline2.default, _parchment2.default.Embed, _text2.default];

        function bubbleFormats(blot) {
          var formats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          if (blot == null) return formats;

          if (typeof blot.formats === 'function') {
            formats = (0, _extend2.default)(formats, blot.formats());
          }

          if (blot.parent == null || blot.parent.blotName == 'scroll' || blot.parent.statics.scope !== blot.statics.scope) {
            return formats;
          }

          return bubbleFormats(blot.parent, formats);
        }

        exports.bubbleFormats = bubbleFormats;
        exports.BlockEmbed = BlockEmbed;
        exports.default = Block;
        /***/
      },
      /* 5 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = exports.overload = exports.expandConfig = undefined;

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        var _slicedToArray = function () {
          function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"]) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }

            return _arr;
          }

          return function (arr, i) {
            if (Array.isArray(arr)) {
              return arr;
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i);
            } else {
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
          };
        }();

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        __webpack_require__(50);

        var _quillDelta = __webpack_require__(2);

        var _quillDelta2 = _interopRequireDefault(_quillDelta);

        var _editor = __webpack_require__(14);

        var _editor2 = _interopRequireDefault(_editor);

        var _emitter3 = __webpack_require__(8);

        var _emitter4 = _interopRequireDefault(_emitter3);

        var _module = __webpack_require__(9);

        var _module2 = _interopRequireDefault(_module);

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _selection = __webpack_require__(15);

        var _selection2 = _interopRequireDefault(_selection);

        var _extend = __webpack_require__(3);

        var _extend2 = _interopRequireDefault(_extend);

        var _logger = __webpack_require__(10);

        var _logger2 = _interopRequireDefault(_logger);

        var _theme = __webpack_require__(34);

        var _theme2 = _interopRequireDefault(_theme);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var debug = (0, _logger2.default)('quill');

        var Quill = function () {
          _createClass(Quill, null, [{
            key: 'debug',
            value: function debug(limit) {
              if (limit === true) {
                limit = 'log';
              }

              _logger2.default.level(limit);
            }
          }, {
            key: 'find',
            value: function find(node) {
              return node.__quill || _parchment2.default.find(node);
            }
          }, {
            key: 'import',
            value: function _import(name) {
              if (this.imports[name] == null) {
                debug.error('Cannot import ' + name + '. Are you sure it was registered?');
              }

              return this.imports[name];
            }
          }, {
            key: 'register',
            value: function register(path, target) {
              var _this = this;

              var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

              if (typeof path !== 'string') {
                var name = path.attrName || path.blotName;

                if (typeof name === 'string') {
                  // register(Blot | Attributor, overwrite)
                  this.register('formats/' + name, path, target);
                } else {
                  Object.keys(path).forEach(function (key) {
                    _this.register(key, path[key], target);
                  });
                }
              } else {
                if (this.imports[path] != null && !overwrite) {
                  debug.warn('Overwriting ' + path + ' with', target);
                }

                this.imports[path] = target;

                if ((path.startsWith('blots/') || path.startsWith('formats/')) && target.blotName !== 'abstract') {
                  _parchment2.default.register(target);
                } else if (path.startsWith('modules') && typeof target.register === 'function') {
                  target.register();
                }
              }
            }
          }]);

          function Quill(container) {
            var _this2 = this;

            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            _classCallCheck(this, Quill);

            this.options = expandConfig(container, options);
            this.container = this.options.container;

            if (this.container == null) {
              return debug.error('Invalid Quill container', container);
            }

            if (this.options.debug) {
              Quill.debug(this.options.debug);
            }

            var html = this.container.innerHTML.trim();
            this.container.classList.add('ql-container');
            this.container.innerHTML = '';
            this.container.__quill = this;
            this.root = this.addContainer('ql-editor');
            this.root.classList.add('ql-blank');
            this.root.setAttribute('data-gramm', false);
            this.scrollingContainer = this.options.scrollingContainer || this.root;
            this.emitter = new _emitter4.default();
            this.scroll = _parchment2.default.create(this.root, {
              emitter: this.emitter,
              whitelist: this.options.formats
            });
            this.editor = new _editor2.default(this.scroll);
            this.selection = new _selection2.default(this.scroll, this.emitter);
            this.theme = new this.options.theme(this, this.options);
            this.keyboard = this.theme.addModule('keyboard');
            this.clipboard = this.theme.addModule('clipboard');
            this.history = this.theme.addModule('history');
            this.theme.init();
            this.emitter.on(_emitter4.default.events.EDITOR_CHANGE, function (type) {
              if (type === _emitter4.default.events.TEXT_CHANGE) {
                _this2.root.classList.toggle('ql-blank', _this2.editor.isBlank());
              }
            });
            this.emitter.on(_emitter4.default.events.SCROLL_UPDATE, function (source, mutations) {
              var range = _this2.selection.lastRange;
              var index = range && range.length === 0 ? range.index : undefined;
              modify.call(_this2, function () {
                return _this2.editor.update(null, mutations, index);
              }, source);
            });
            var contents = this.clipboard.convert('<div class=\'ql-editor\' style="white-space: normal;">' + html + '<p><br></p></div>');
            this.setContents(contents);
            this.history.clear();

            if (this.options.placeholder) {
              this.root.setAttribute('data-placeholder', this.options.placeholder);
            }

            if (this.options.readOnly) {
              this.disable();
            }
          }

          _createClass(Quill, [{
            key: 'addContainer',
            value: function addContainer(container) {
              var refNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

              if (typeof container === 'string') {
                var className = container;
                container = document.createElement('div');
                container.classList.add(className);
              }

              this.container.insertBefore(container, refNode);
              return container;
            }
          }, {
            key: 'blur',
            value: function blur() {
              this.selection.setRange(null);
            }
          }, {
            key: 'deleteText',
            value: function deleteText(index, length, source) {
              var _this3 = this;

              var _overload = overload(index, length, source);

              var _overload2 = _slicedToArray(_overload, 4);

              index = _overload2[0];
              length = _overload2[1];
              source = _overload2[3];
              return modify.call(this, function () {
                return _this3.editor.deleteText(index, length);
              }, source, index, -1 * length);
            }
          }, {
            key: 'disable',
            value: function disable() {
              this.enable(false);
            }
          }, {
            key: 'enable',
            value: function enable() {
              var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
              this.scroll.enable(enabled);
              this.container.classList.toggle('ql-disabled', !enabled);
            }
          }, {
            key: 'focus',
            value: function focus() {
              var scrollTop = this.scrollingContainer.scrollTop;
              this.selection.focus();
              this.scrollingContainer.scrollTop = scrollTop;
              this.scrollIntoView();
            }
          }, {
            key: 'format',
            value: function format(name, value) {
              var _this4 = this;

              var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _emitter4.default.sources.API;
              return modify.call(this, function () {
                var range = _this4.getSelection(true);

                var change = new _quillDelta2.default();

                if (range == null) {
                  return change;
                } else if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK)) {
                  change = _this4.editor.formatLine(range.index, range.length, _defineProperty({}, name, value));
                } else if (range.length === 0) {
                  _this4.selection.format(name, value);

                  return change;
                } else {
                  change = _this4.editor.formatText(range.index, range.length, _defineProperty({}, name, value));
                }

                _this4.setSelection(range, _emitter4.default.sources.SILENT);

                return change;
              }, source);
            }
          }, {
            key: 'formatLine',
            value: function formatLine(index, length, name, value, source) {
              var _this5 = this;

              var formats = void 0;

              var _overload3 = overload(index, length, name, value, source);

              var _overload4 = _slicedToArray(_overload3, 4);

              index = _overload4[0];
              length = _overload4[1];
              formats = _overload4[2];
              source = _overload4[3];
              return modify.call(this, function () {
                return _this5.editor.formatLine(index, length, formats);
              }, source, index, 0);
            }
          }, {
            key: 'formatText',
            value: function formatText(index, length, name, value, source) {
              var _this6 = this;

              var formats = void 0;

              var _overload5 = overload(index, length, name, value, source);

              var _overload6 = _slicedToArray(_overload5, 4);

              index = _overload6[0];
              length = _overload6[1];
              formats = _overload6[2];
              source = _overload6[3];
              return modify.call(this, function () {
                return _this6.editor.formatText(index, length, formats);
              }, source, index, 0);
            }
          }, {
            key: 'getBounds',
            value: function getBounds(index) {
              var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
              var bounds = void 0;

              if (typeof index === 'number') {
                bounds = this.selection.getBounds(index, length);
              } else {
                bounds = this.selection.getBounds(index.index, index.length);
              }

              var containerBounds = this.container.getBoundingClientRect();
              return {
                bottom: bounds.bottom - containerBounds.top,
                height: bounds.height,
                left: bounds.left - containerBounds.left,
                right: bounds.right - containerBounds.left,
                top: bounds.top - containerBounds.top,
                width: bounds.width
              };
            }
          }, {
            key: 'getContents',
            value: function getContents() {
              var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
              var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;

              var _overload7 = overload(index, length);

              var _overload8 = _slicedToArray(_overload7, 2);

              index = _overload8[0];
              length = _overload8[1];
              return this.editor.getContents(index, length);
            }
          }, {
            key: 'getFormat',
            value: function getFormat() {
              var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getSelection(true);
              var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

              if (typeof index === 'number') {
                return this.editor.getFormat(index, length);
              } else {
                return this.editor.getFormat(index.index, index.length);
              }
            }
          }, {
            key: 'getIndex',
            value: function getIndex(blot) {
              return blot.offset(this.scroll);
            }
          }, {
            key: 'getLength',
            value: function getLength() {
              return this.scroll.length();
            }
          }, {
            key: 'getLeaf',
            value: function getLeaf(index) {
              return this.scroll.leaf(index);
            }
          }, {
            key: 'getLine',
            value: function getLine(index) {
              return this.scroll.line(index);
            }
          }, {
            key: 'getLines',
            value: function getLines() {
              var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
              var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;

              if (typeof index !== 'number') {
                return this.scroll.lines(index.index, index.length);
              } else {
                return this.scroll.lines(index, length);
              }
            }
          }, {
            key: 'getModule',
            value: function getModule(name) {
              return this.theme.modules[name];
            }
          }, {
            key: 'getSelection',
            value: function getSelection() {
              var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
              if (focus) this.focus();
              this.update(); // Make sure we access getRange with editor in consistent state

              return this.selection.getRange()[0];
            }
          }, {
            key: 'getText',
            value: function getText() {
              var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
              var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;

              var _overload9 = overload(index, length);

              var _overload10 = _slicedToArray(_overload9, 2);

              index = _overload10[0];
              length = _overload10[1];
              return this.editor.getText(index, length);
            }
          }, {
            key: 'hasFocus',
            value: function hasFocus() {
              return this.selection.hasFocus();
            }
          }, {
            key: 'insertEmbed',
            value: function insertEmbed(index, embed, value) {
              var _this7 = this;

              var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Quill.sources.API;
              return modify.call(this, function () {
                return _this7.editor.insertEmbed(index, embed, value);
              }, source, index);
            }
          }, {
            key: 'insertText',
            value: function insertText(index, text, name, value, source) {
              var _this8 = this;

              var formats = void 0;

              var _overload11 = overload(index, 0, name, value, source);

              var _overload12 = _slicedToArray(_overload11, 4);

              index = _overload12[0];
              formats = _overload12[2];
              source = _overload12[3];
              return modify.call(this, function () {
                return _this8.editor.insertText(index, text, formats);
              }, source, index, text.length);
            }
          }, {
            key: 'isEnabled',
            value: function isEnabled() {
              return !this.container.classList.contains('ql-disabled');
            }
          }, {
            key: 'off',
            value: function off() {
              return this.emitter.off.apply(this.emitter, arguments);
            }
          }, {
            key: 'on',
            value: function on() {
              return this.emitter.on.apply(this.emitter, arguments);
            }
          }, {
            key: 'once',
            value: function once() {
              return this.emitter.once.apply(this.emitter, arguments);
            }
          }, {
            key: 'pasteHTML',
            value: function pasteHTML(index, html, source) {
              this.clipboard.dangerouslyPasteHTML(index, html, source);
            }
          }, {
            key: 'removeFormat',
            value: function removeFormat(index, length, source) {
              var _this9 = this;

              var _overload13 = overload(index, length, source);

              var _overload14 = _slicedToArray(_overload13, 4);

              index = _overload14[0];
              length = _overload14[1];
              source = _overload14[3];
              return modify.call(this, function () {
                return _this9.editor.removeFormat(index, length);
              }, source, index);
            }
          }, {
            key: 'scrollIntoView',
            value: function scrollIntoView() {
              this.selection.scrollIntoView(this.scrollingContainer);
            }
          }, {
            key: 'setContents',
            value: function setContents(delta) {
              var _this10 = this;

              var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;
              return modify.call(this, function () {
                delta = new _quillDelta2.default(delta);

                var length = _this10.getLength();

                var deleted = _this10.editor.deleteText(0, length);

                var applied = _this10.editor.applyDelta(delta);

                var lastOp = applied.ops[applied.ops.length - 1];

                if (lastOp != null && typeof lastOp.insert === 'string' && lastOp.insert[lastOp.insert.length - 1] === '\n') {
                  _this10.editor.deleteText(_this10.getLength() - 1, 1);

                  applied.delete(1);
                }

                var ret = deleted.compose(applied);
                return ret;
              }, source);
            }
          }, {
            key: 'setSelection',
            value: function setSelection(index, length, source) {
              if (index == null) {
                this.selection.setRange(null, length || Quill.sources.API);
              } else {
                var _overload15 = overload(index, length, source);

                var _overload16 = _slicedToArray(_overload15, 4);

                index = _overload16[0];
                length = _overload16[1];
                source = _overload16[3];
                this.selection.setRange(new _selection.Range(index, length), source);

                if (source !== _emitter4.default.sources.SILENT) {
                  this.selection.scrollIntoView(this.scrollingContainer);
                }
              }
            }
          }, {
            key: 'setText',
            value: function setText(text) {
              var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;
              var delta = new _quillDelta2.default().insert(text);
              return this.setContents(delta, source);
            }
          }, {
            key: 'update',
            value: function update() {
              var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _emitter4.default.sources.USER;
              var change = this.scroll.update(source); // Will update selection before selection.update() does if text changes

              this.selection.update(source);
              return change;
            }
          }, {
            key: 'updateContents',
            value: function updateContents(delta) {
              var _this11 = this;

              var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;
              return modify.call(this, function () {
                delta = new _quillDelta2.default(delta);
                return _this11.editor.applyDelta(delta, source);
              }, source, true);
            }
          }]);

          return Quill;
        }();

        Quill.DEFAULTS = {
          bounds: null,
          formats: null,
          modules: {},
          placeholder: '',
          readOnly: false,
          scrollingContainer: null,
          strict: true,
          theme: 'default'
        };
        Quill.events = _emitter4.default.events;
        Quill.sources = _emitter4.default.sources; // eslint-disable-next-line no-undef

        Quill.version = "1.3.7";
        Quill.imports = {
          'delta': _quillDelta2.default,
          'parchment': _parchment2.default,
          'core/module': _module2.default,
          'core/theme': _theme2.default
        };

        function expandConfig(container, userConfig) {
          userConfig = (0, _extend2.default)(true, {
            container: container,
            modules: {
              clipboard: true,
              keyboard: true,
              history: true
            }
          }, userConfig);

          if (!userConfig.theme || userConfig.theme === Quill.DEFAULTS.theme) {
            userConfig.theme = _theme2.default;
          } else {
            userConfig.theme = Quill.import('themes/' + userConfig.theme);

            if (userConfig.theme == null) {
              throw new Error('Invalid theme ' + userConfig.theme + '. Did you register it?');
            }
          }

          var themeConfig = (0, _extend2.default)(true, {}, userConfig.theme.DEFAULTS);
          [themeConfig, userConfig].forEach(function (config) {
            config.modules = config.modules || {};
            Object.keys(config.modules).forEach(function (module) {
              if (config.modules[module] === true) {
                config.modules[module] = {};
              }
            });
          });
          var moduleNames = Object.keys(themeConfig.modules).concat(Object.keys(userConfig.modules));
          var moduleConfig = moduleNames.reduce(function (config, name) {
            var moduleClass = Quill.import('modules/' + name);

            if (moduleClass == null) {
              debug.error('Cannot load ' + name + ' module. Are you sure you registered it?');
            } else {
              config[name] = moduleClass.DEFAULTS || {};
            }

            return config;
          }, {}); // Special case toolbar shorthand

          if (userConfig.modules != null && userConfig.modules.toolbar && userConfig.modules.toolbar.constructor !== Object) {
            userConfig.modules.toolbar = {
              container: userConfig.modules.toolbar
            };
          }

          userConfig = (0, _extend2.default)(true, {}, Quill.DEFAULTS, {
            modules: moduleConfig
          }, themeConfig, userConfig);
          ['bounds', 'container', 'scrollingContainer'].forEach(function (key) {
            if (typeof userConfig[key] === 'string') {
              userConfig[key] = document.querySelector(userConfig[key]);
            }
          });
          userConfig.modules = Object.keys(userConfig.modules).reduce(function (config, name) {
            if (userConfig.modules[name]) {
              config[name] = userConfig.modules[name];
            }

            return config;
          }, {});
          return userConfig;
        } // Handle selection preservation and TEXT_CHANGE emission
        // common to modification APIs


        function modify(modifier, source, index, shift) {
          if (this.options.strict && !this.isEnabled() && source === _emitter4.default.sources.USER) {
            return new _quillDelta2.default();
          }

          var range = index == null ? null : this.getSelection();
          var oldDelta = this.editor.delta;
          var change = modifier();

          if (range != null) {
            if (index === true) index = range.index;

            if (shift == null) {
              range = shiftRange(range, change, source);
            } else if (shift !== 0) {
              range = shiftRange(range, index, shift, source);
            }

            this.setSelection(range, _emitter4.default.sources.SILENT);
          }

          if (change.length() > 0) {
            var _emitter;

            var args = [_emitter4.default.events.TEXT_CHANGE, change, oldDelta, source];

            (_emitter = this.emitter).emit.apply(_emitter, [_emitter4.default.events.EDITOR_CHANGE].concat(args));

            if (source !== _emitter4.default.sources.SILENT) {
              var _emitter2;

              (_emitter2 = this.emitter).emit.apply(_emitter2, args);
            }
          }

          return change;
        }

        function overload(index, length, name, value, source) {
          var formats = {};

          if (typeof index.index === 'number' && typeof index.length === 'number') {
            // Allow for throwaway end (used by insertText/insertEmbed)
            if (typeof length !== 'number') {
              source = value, value = name, name = length, length = index.length, index = index.index;
            } else {
              length = index.length, index = index.index;
            }
          } else if (typeof length !== 'number') {
            source = value, value = name, name = length, length = 0;
          } // Handle format being object, two format name/value strings or excluded


          if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
            formats = name;
            source = value;
          } else if (typeof name === 'string') {
            if (value != null) {
              formats[name] = value;
            } else {
              source = name;
            }
          } // Handle optional source


          source = source || _emitter4.default.sources.API;
          return [index, length, formats, source];
        }

        function shiftRange(range, index, length, source) {
          if (range == null) return null;
          var start = void 0,
              end = void 0;

          if (index instanceof _quillDelta2.default) {
            var _map = [range.index, range.index + range.length].map(function (pos) {
              return index.transformPosition(pos, source !== _emitter4.default.sources.USER);
            });

            var _map2 = _slicedToArray(_map, 2);

            start = _map2[0];
            end = _map2[1];
          } else {
            var _map3 = [range.index, range.index + range.length].map(function (pos) {
              if (pos < index || pos === index && source === _emitter4.default.sources.USER) return pos;

              if (length >= 0) {
                return pos + length;
              } else {
                return Math.max(index, pos + length);
              }
            });

            var _map4 = _slicedToArray(_map3, 2);

            start = _map4[0];
            end = _map4[1];
          }

          return new _selection.Range(start, end - start);
        }

        exports.expandConfig = expandConfig;
        exports.overload = overload;
        exports.default = Quill;
        /***/
      },
      /* 6 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _text = __webpack_require__(7);

        var _text2 = _interopRequireDefault(_text);

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Inline = function (_Parchment$Inline) {
          _inherits(Inline, _Parchment$Inline);

          function Inline() {
            _classCallCheck(this, Inline);

            return _possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
          }

          _createClass(Inline, [{
            key: 'formatAt',
            value: function formatAt(index, length, name, value) {
              if (Inline.compare(this.statics.blotName, name) < 0 && _parchment2.default.query(name, _parchment2.default.Scope.BLOT)) {
                var blot = this.isolate(index, length);

                if (value) {
                  blot.wrap(name, value);
                }
              } else {
                _get(Inline.prototype.__proto__ || Object.getPrototypeOf(Inline.prototype), 'formatAt', this).call(this, index, length, name, value);
              }
            }
          }, {
            key: 'optimize',
            value: function optimize(context) {
              _get(Inline.prototype.__proto__ || Object.getPrototypeOf(Inline.prototype), 'optimize', this).call(this, context);

              if (this.parent instanceof Inline && Inline.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                var parent = this.parent.isolate(this.offset(), this.length());
                this.moveChildren(parent);
                parent.wrap(this);
              }
            }
          }], [{
            key: 'compare',
            value: function compare(self, other) {
              var selfIndex = Inline.order.indexOf(self);
              var otherIndex = Inline.order.indexOf(other);

              if (selfIndex >= 0 || otherIndex >= 0) {
                return selfIndex - otherIndex;
              } else if (self === other) {
                return 0;
              } else if (self < other) {
                return -1;
              } else {
                return 1;
              }
            }
          }]);

          return Inline;
        }(_parchment2.default.Inline);

        Inline.allowedChildren = [Inline, _parchment2.default.Embed, _text2.default]; // Lower index means deeper in the DOM tree, since not found (-1) is for embeds

        Inline.order = ['cursor', 'inline', // Must be lower
        'underline', 'strike', 'italic', 'bold', 'script', 'link', 'code' // Must be higher
        ];
        exports.default = Inline;
        /***/
      },
      /* 7 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var TextBlot = function (_Parchment$Text) {
          _inherits(TextBlot, _Parchment$Text);

          function TextBlot() {
            _classCallCheck(this, TextBlot);

            return _possibleConstructorReturn(this, (TextBlot.__proto__ || Object.getPrototypeOf(TextBlot)).apply(this, arguments));
          }

          return TextBlot;
        }(_parchment2.default.Text);

        exports.default = TextBlot;
        /***/
      },
      /* 8 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _eventemitter = __webpack_require__(54);

        var _eventemitter2 = _interopRequireDefault(_eventemitter);

        var _logger = __webpack_require__(10);

        var _logger2 = _interopRequireDefault(_logger);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var debug = (0, _logger2.default)('quill:events');
        var EVENTS = ['selectionchange', 'mousedown', 'mouseup', 'click'];
        EVENTS.forEach(function (eventName) {
          document.addEventListener(eventName, function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            [].slice.call(document.querySelectorAll('.ql-container')).forEach(function (node) {
              // TODO use WeakMap
              if (node.__quill && node.__quill.emitter) {
                var _node$__quill$emitter;

                (_node$__quill$emitter = node.__quill.emitter).handleDOM.apply(_node$__quill$emitter, args);
              }
            });
          });
        });

        var Emitter = function (_EventEmitter) {
          _inherits(Emitter, _EventEmitter);

          function Emitter() {
            _classCallCheck(this, Emitter);

            var _this = _possibleConstructorReturn(this, (Emitter.__proto__ || Object.getPrototypeOf(Emitter)).call(this));

            _this.listeners = {};

            _this.on('error', debug.error);

            return _this;
          }

          _createClass(Emitter, [{
            key: 'emit',
            value: function emit() {
              debug.log.apply(debug, arguments);

              _get(Emitter.prototype.__proto__ || Object.getPrototypeOf(Emitter.prototype), 'emit', this).apply(this, arguments);
            }
          }, {
            key: 'handleDOM',
            value: function handleDOM(event) {
              for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }

              (this.listeners[event.type] || []).forEach(function (_ref) {
                var node = _ref.node,
                    handler = _ref.handler;

                if (event.target === node || node.contains(event.target)) {
                  handler.apply(undefined, [event].concat(args));
                }
              });
            }
          }, {
            key: 'listenDOM',
            value: function listenDOM(eventName, node, handler) {
              if (!this.listeners[eventName]) {
                this.listeners[eventName] = [];
              }

              this.listeners[eventName].push({
                node: node,
                handler: handler
              });
            }
          }]);

          return Emitter;
        }(_eventemitter2.default);

        Emitter.events = {
          EDITOR_CHANGE: 'editor-change',
          SCROLL_BEFORE_UPDATE: 'scroll-before-update',
          SCROLL_OPTIMIZE: 'scroll-optimize',
          SCROLL_UPDATE: 'scroll-update',
          SELECTION_CHANGE: 'selection-change',
          TEXT_CHANGE: 'text-change'
        };
        Emitter.sources = {
          API: 'api',
          SILENT: 'silent',
          USER: 'user'
        };
        exports.default = Emitter;
        /***/
      },
      /* 9 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var Module = function Module(quill) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          _classCallCheck(this, Module);

          this.quill = quill;
          this.options = options;
        };

        Module.DEFAULTS = {};
        exports.default = Module;
        /***/
      },
      /* 10 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        var levels = ['error', 'warn', 'log', 'info'];
        var level = 'warn';

        function debug(method) {
          if (levels.indexOf(method) <= levels.indexOf(level)) {
            var _console;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            (_console = console)[method].apply(_console, args); // eslint-disable-line no-console

          }
        }

        function namespace(ns) {
          return levels.reduce(function (logger, method) {
            logger[method] = debug.bind(console, method, ns);
            return logger;
          }, {});
        }

        debug.level = namespace.level = function (newLevel) {
          level = newLevel;
        };

        exports.default = namespace;
        /***/
      },
      /* 11 */

      /***/
      function (module, exports, __webpack_require__) {
        var pSlice = Array.prototype.slice;

        var objectKeys = __webpack_require__(52);

        var isArguments = __webpack_require__(53);

        var deepEqual = module.exports = function (actual, expected, opts) {
          if (!opts) opts = {}; // 7.1. All identical values are equivalent, as determined by ===.

          if (actual === expected) {
            return true;
          } else if (actual instanceof Date && expected instanceof Date) {
            return actual.getTime() === expected.getTime(); // 7.3. Other pairs that do not both pass typeof value == 'object',
            // equivalence is determined by ==.
          } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
            return opts.strict ? actual === expected : actual == expected; // 7.4. For all other Object pairs, including Array objects, equivalence is
            // determined by having the same number of owned properties (as verified
            // with Object.prototype.hasOwnProperty.call), the same set of keys
            // (although not necessarily the same order), equivalent values for every
            // corresponding key, and an identical 'prototype' property. Note: this
            // accounts for both named and indexed properties on Arrays.
          } else {
            return objEquiv(actual, expected, opts);
          }
        };

        function isUndefinedOrNull(value) {
          return value === null || value === undefined;
        }

        function isBuffer(x) {
          if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;

          if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
            return false;
          }

          if (x.length > 0 && typeof x[0] !== 'number') return false;
          return true;
        }

        function objEquiv(a, b, opts) {
          var i, key;
          if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false; // an identical 'prototype' property.

          if (a.prototype !== b.prototype) return false; //~~~I've managed to break Object.keys through screwy arguments passing.
          //   Converting to array solves the problem.

          if (isArguments(a)) {
            if (!isArguments(b)) {
              return false;
            }

            a = pSlice.call(a);
            b = pSlice.call(b);
            return deepEqual(a, b, opts);
          }

          if (isBuffer(a)) {
            if (!isBuffer(b)) {
              return false;
            }

            if (a.length !== b.length) return false;

            for (i = 0; i < a.length; i++) {
              if (a[i] !== b[i]) return false;
            }

            return true;
          }

          try {
            var ka = objectKeys(a),
                kb = objectKeys(b);
          } catch (e) {
            //happens when one is a string literal and the other isn't
            return false;
          } // having the same number of owned properties (keys incorporates
          // hasOwnProperty)


          if (ka.length != kb.length) return false; //the same set of keys (although not necessarily the same order),

          ka.sort();
          kb.sort(); //~~~cheap key test

          for (i = ka.length - 1; i >= 0; i--) {
            if (ka[i] != kb[i]) return false;
          } //equivalent values for every corresponding key, and
          //~~~possibly expensive deep test


          for (i = ka.length - 1; i >= 0; i--) {
            key = ka[i];
            if (!deepEqual(a[key], b[key], opts)) return false;
          }

          return typeof a === typeof b;
        }
        /***/

      },
      /* 12 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var Registry = __webpack_require__(1);

        var Attributor =
        /** @class */
        function () {
          function Attributor(attrName, keyName, options) {
            if (options === void 0) {
              options = {};
            }

            this.attrName = attrName;
            this.keyName = keyName;
            var attributeBit = Registry.Scope.TYPE & Registry.Scope.ATTRIBUTE;

            if (options.scope != null) {
              // Ignore type bits, force attribute bit
              this.scope = options.scope & Registry.Scope.LEVEL | attributeBit;
            } else {
              this.scope = Registry.Scope.ATTRIBUTE;
            }

            if (options.whitelist != null) this.whitelist = options.whitelist;
          }

          Attributor.keys = function (node) {
            return [].map.call(node.attributes, function (item) {
              return item.name;
            });
          };

          Attributor.prototype.add = function (node, value) {
            if (!this.canAdd(node, value)) return false;
            node.setAttribute(this.keyName, value);
            return true;
          };

          Attributor.prototype.canAdd = function (node, value) {
            var match = Registry.query(node, Registry.Scope.BLOT & (this.scope | Registry.Scope.TYPE));
            if (match == null) return false;
            if (this.whitelist == null) return true;

            if (typeof value === 'string') {
              return this.whitelist.indexOf(value.replace(/["']/g, '')) > -1;
            } else {
              return this.whitelist.indexOf(value) > -1;
            }
          };

          Attributor.prototype.remove = function (node) {
            node.removeAttribute(this.keyName);
          };

          Attributor.prototype.value = function (node) {
            var value = node.getAttribute(this.keyName);

            if (this.canAdd(node, value) && value) {
              return value;
            }

            return '';
          };

          return Attributor;
        }();

        exports.default = Attributor;
        /***/
      },
      /* 13 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = exports.Code = undefined;

        var _slicedToArray = function () {
          function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"]) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }

            return _arr;
          }

          return function (arr, i) {
            if (Array.isArray(arr)) {
              return arr;
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i);
            } else {
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
          };
        }();

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _quillDelta = __webpack_require__(2);

        var _quillDelta2 = _interopRequireDefault(_quillDelta);

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _block = __webpack_require__(4);

        var _block2 = _interopRequireDefault(_block);

        var _inline = __webpack_require__(6);

        var _inline2 = _interopRequireDefault(_inline);

        var _text = __webpack_require__(7);

        var _text2 = _interopRequireDefault(_text);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Code = function (_Inline) {
          _inherits(Code, _Inline);

          function Code() {
            _classCallCheck(this, Code);

            return _possibleConstructorReturn(this, (Code.__proto__ || Object.getPrototypeOf(Code)).apply(this, arguments));
          }

          return Code;
        }(_inline2.default);

        Code.blotName = 'code';
        Code.tagName = 'CODE';

        var CodeBlock = function (_Block) {
          _inherits(CodeBlock, _Block);

          function CodeBlock() {
            _classCallCheck(this, CodeBlock);

            return _possibleConstructorReturn(this, (CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock)).apply(this, arguments));
          }

          _createClass(CodeBlock, [{
            key: 'delta',
            value: function delta() {
              var _this3 = this;

              var text = this.domNode.textContent;

              if (text.endsWith('\n')) {
                // Should always be true
                text = text.slice(0, -1);
              }

              return text.split('\n').reduce(function (delta, frag) {
                return delta.insert(frag).insert('\n', _this3.formats());
              }, new _quillDelta2.default());
            }
          }, {
            key: 'format',
            value: function format(name, value) {
              if (name === this.statics.blotName && value) return;

              var _descendant = this.descendant(_text2.default, this.length() - 1),
                  _descendant2 = _slicedToArray(_descendant, 1),
                  text = _descendant2[0];

              if (text != null) {
                text.deleteAt(text.length() - 1, 1);
              }

              _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'format', this).call(this, name, value);
            }
          }, {
            key: 'formatAt',
            value: function formatAt(index, length, name, value) {
              if (length === 0) return;

              if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK) == null || name === this.statics.blotName && value === this.statics.formats(this.domNode)) {
                return;
              }

              var nextNewline = this.newlineIndex(index);
              if (nextNewline < 0 || nextNewline >= index + length) return;
              var prevNewline = this.newlineIndex(index, true) + 1;
              var isolateLength = nextNewline - prevNewline + 1;
              var blot = this.isolate(prevNewline, isolateLength);
              var next = blot.next;
              blot.format(name, value);

              if (next instanceof CodeBlock) {
                next.formatAt(0, index - prevNewline + length - isolateLength, name, value);
              }
            }
          }, {
            key: 'insertAt',
            value: function insertAt(index, value, def) {
              if (def != null) return;

              var _descendant3 = this.descendant(_text2.default, index),
                  _descendant4 = _slicedToArray(_descendant3, 2),
                  text = _descendant4[0],
                  offset = _descendant4[1];

              text.insertAt(offset, value);
            }
          }, {
            key: 'length',
            value: function length() {
              var length = this.domNode.textContent.length;

              if (!this.domNode.textContent.endsWith('\n')) {
                return length + 1;
              }

              return length;
            }
          }, {
            key: 'newlineIndex',
            value: function newlineIndex(searchIndex) {
              var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

              if (!reverse) {
                var offset = this.domNode.textContent.slice(searchIndex).indexOf('\n');
                return offset > -1 ? searchIndex + offset : -1;
              } else {
                return this.domNode.textContent.slice(0, searchIndex).lastIndexOf('\n');
              }
            }
          }, {
            key: 'optimize',
            value: function optimize(context) {
              if (!this.domNode.textContent.endsWith('\n')) {
                this.appendChild(_parchment2.default.create('text', '\n'));
              }

              _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'optimize', this).call(this, context);

              var next = this.next;

              if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === next.statics.formats(next.domNode)) {
                next.optimize(context);
                next.moveChildren(this);
                next.remove();
              }
            }
          }, {
            key: 'replace',
            value: function replace(target) {
              _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'replace', this).call(this, target);

              [].slice.call(this.domNode.querySelectorAll('*')).forEach(function (node) {
                var blot = _parchment2.default.find(node);

                if (blot == null) {
                  node.parentNode.removeChild(node);
                } else if (blot instanceof _parchment2.default.Embed) {
                  blot.remove();
                } else {
                  blot.unwrap();
                }
              });
            }
          }], [{
            key: 'create',
            value: function create(value) {
              var domNode = _get(CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock), 'create', this).call(this, value);

              domNode.setAttribute('spellcheck', false);
              return domNode;
            }
          }, {
            key: 'formats',
            value: function formats() {
              return true;
            }
          }]);

          return CodeBlock;
        }(_block2.default);

        CodeBlock.blotName = 'code-block';
        CodeBlock.tagName = 'PRE';
        CodeBlock.TAB = '  ';
        exports.Code = Code;
        exports.default = CodeBlock;
        /***/
      },
      /* 14 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        var _slicedToArray = function () {
          function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"]) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }

            return _arr;
          }

          return function (arr, i) {
            if (Array.isArray(arr)) {
              return arr;
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i);
            } else {
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
          };
        }();

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _quillDelta = __webpack_require__(2);

        var _quillDelta2 = _interopRequireDefault(_quillDelta);

        var _op = __webpack_require__(20);

        var _op2 = _interopRequireDefault(_op);

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _code = __webpack_require__(13);

        var _code2 = _interopRequireDefault(_code);

        var _cursor = __webpack_require__(24);

        var _cursor2 = _interopRequireDefault(_cursor);

        var _block = __webpack_require__(4);

        var _block2 = _interopRequireDefault(_block);

        var _break = __webpack_require__(16);

        var _break2 = _interopRequireDefault(_break);

        var _clone = __webpack_require__(21);

        var _clone2 = _interopRequireDefault(_clone);

        var _deepEqual = __webpack_require__(11);

        var _deepEqual2 = _interopRequireDefault(_deepEqual);

        var _extend = __webpack_require__(3);

        var _extend2 = _interopRequireDefault(_extend);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var ASCII = /^[ -~]*$/;

        var Editor = function () {
          function Editor(scroll) {
            _classCallCheck(this, Editor);

            this.scroll = scroll;
            this.delta = this.getDelta();
          }

          _createClass(Editor, [{
            key: 'applyDelta',
            value: function applyDelta(delta) {
              var _this = this;

              var consumeNextNewline = false;
              this.scroll.update();
              var scrollLength = this.scroll.length();
              this.scroll.batchStart();
              delta = normalizeDelta(delta);
              delta.reduce(function (index, op) {
                var length = op.retain || op.delete || op.insert.length || 1;
                var attributes = op.attributes || {};

                if (op.insert != null) {
                  if (typeof op.insert === 'string') {
                    var text = op.insert;

                    if (text.endsWith('\n') && consumeNextNewline) {
                      consumeNextNewline = false;
                      text = text.slice(0, -1);
                    }

                    if (index >= scrollLength && !text.endsWith('\n')) {
                      consumeNextNewline = true;
                    }

                    _this.scroll.insertAt(index, text);

                    var _scroll$line = _this.scroll.line(index),
                        _scroll$line2 = _slicedToArray(_scroll$line, 2),
                        line = _scroll$line2[0],
                        offset = _scroll$line2[1];

                    var formats = (0, _extend2.default)({}, (0, _block.bubbleFormats)(line));

                    if (line instanceof _block2.default) {
                      var _line$descendant = line.descendant(_parchment2.default.Leaf, offset),
                          _line$descendant2 = _slicedToArray(_line$descendant, 1),
                          leaf = _line$descendant2[0];

                      formats = (0, _extend2.default)(formats, (0, _block.bubbleFormats)(leaf));
                    }

                    attributes = _op2.default.attributes.diff(formats, attributes) || {};
                  } else if (_typeof(op.insert) === 'object') {
                    var key = Object.keys(op.insert)[0]; // There should only be one key

                    if (key == null) return index;

                    _this.scroll.insertAt(index, key, op.insert[key]);
                  }

                  scrollLength += length;
                }

                Object.keys(attributes).forEach(function (name) {
                  _this.scroll.formatAt(index, length, name, attributes[name]);
                });
                return index + length;
              }, 0);
              delta.reduce(function (index, op) {
                if (typeof op.delete === 'number') {
                  _this.scroll.deleteAt(index, op.delete);

                  return index;
                }

                return index + (op.retain || op.insert.length || 1);
              }, 0);
              this.scroll.batchEnd();
              return this.update(delta);
            }
          }, {
            key: 'deleteText',
            value: function deleteText(index, length) {
              this.scroll.deleteAt(index, length);
              return this.update(new _quillDelta2.default().retain(index).delete(length));
            }
          }, {
            key: 'formatLine',
            value: function formatLine(index, length) {
              var _this2 = this;

              var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
              this.scroll.update();
              Object.keys(formats).forEach(function (format) {
                if (_this2.scroll.whitelist != null && !_this2.scroll.whitelist[format]) return;

                var lines = _this2.scroll.lines(index, Math.max(length, 1));

                var lengthRemaining = length;
                lines.forEach(function (line) {
                  var lineLength = line.length();

                  if (!(line instanceof _code2.default)) {
                    line.format(format, formats[format]);
                  } else {
                    var codeIndex = index - line.offset(_this2.scroll);
                    var codeLength = line.newlineIndex(codeIndex + lengthRemaining) - codeIndex + 1;
                    line.formatAt(codeIndex, codeLength, format, formats[format]);
                  }

                  lengthRemaining -= lineLength;
                });
              });
              this.scroll.optimize();
              return this.update(new _quillDelta2.default().retain(index).retain(length, (0, _clone2.default)(formats)));
            }
          }, {
            key: 'formatText',
            value: function formatText(index, length) {
              var _this3 = this;

              var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
              Object.keys(formats).forEach(function (format) {
                _this3.scroll.formatAt(index, length, format, formats[format]);
              });
              return this.update(new _quillDelta2.default().retain(index).retain(length, (0, _clone2.default)(formats)));
            }
          }, {
            key: 'getContents',
            value: function getContents(index, length) {
              return this.delta.slice(index, index + length);
            }
          }, {
            key: 'getDelta',
            value: function getDelta() {
              return this.scroll.lines().reduce(function (delta, line) {
                return delta.concat(line.delta());
              }, new _quillDelta2.default());
            }
          }, {
            key: 'getFormat',
            value: function getFormat(index) {
              var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
              var lines = [],
                  leaves = [];

              if (length === 0) {
                this.scroll.path(index).forEach(function (path) {
                  var _path = _slicedToArray(path, 1),
                      blot = _path[0];

                  if (blot instanceof _block2.default) {
                    lines.push(blot);
                  } else if (blot instanceof _parchment2.default.Leaf) {
                    leaves.push(blot);
                  }
                });
              } else {
                lines = this.scroll.lines(index, length);
                leaves = this.scroll.descendants(_parchment2.default.Leaf, index, length);
              }

              var formatsArr = [lines, leaves].map(function (blots) {
                if (blots.length === 0) return {};
                var formats = (0, _block.bubbleFormats)(blots.shift());

                while (Object.keys(formats).length > 0) {
                  var blot = blots.shift();
                  if (blot == null) return formats;
                  formats = combineFormats((0, _block.bubbleFormats)(blot), formats);
                }

                return formats;
              });
              return _extend2.default.apply(_extend2.default, formatsArr);
            }
          }, {
            key: 'getText',
            value: function getText(index, length) {
              return this.getContents(index, length).filter(function (op) {
                return typeof op.insert === 'string';
              }).map(function (op) {
                return op.insert;
              }).join('');
            }
          }, {
            key: 'insertEmbed',
            value: function insertEmbed(index, embed, value) {
              this.scroll.insertAt(index, embed, value);
              return this.update(new _quillDelta2.default().retain(index).insert(_defineProperty({}, embed, value)));
            }
          }, {
            key: 'insertText',
            value: function insertText(index, text) {
              var _this4 = this;

              var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
              text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
              this.scroll.insertAt(index, text);
              Object.keys(formats).forEach(function (format) {
                _this4.scroll.formatAt(index, text.length, format, formats[format]);
              });
              return this.update(new _quillDelta2.default().retain(index).insert(text, (0, _clone2.default)(formats)));
            }
          }, {
            key: 'isBlank',
            value: function isBlank() {
              if (this.scroll.children.length == 0) return true;
              if (this.scroll.children.length > 1) return false;
              var block = this.scroll.children.head;
              if (block.statics.blotName !== _block2.default.blotName) return false;
              if (block.children.length > 1) return false;
              return block.children.head instanceof _break2.default;
            }
          }, {
            key: 'removeFormat',
            value: function removeFormat(index, length) {
              var text = this.getText(index, length);

              var _scroll$line3 = this.scroll.line(index + length),
                  _scroll$line4 = _slicedToArray(_scroll$line3, 2),
                  line = _scroll$line4[0],
                  offset = _scroll$line4[1];

              var suffixLength = 0,
                  suffix = new _quillDelta2.default();

              if (line != null) {
                if (!(line instanceof _code2.default)) {
                  suffixLength = line.length() - offset;
                } else {
                  suffixLength = line.newlineIndex(offset) - offset + 1;
                }

                suffix = line.delta().slice(offset, offset + suffixLength - 1).insert('\n');
              }

              var contents = this.getContents(index, length + suffixLength);
              var diff = contents.diff(new _quillDelta2.default().insert(text).concat(suffix));
              var delta = new _quillDelta2.default().retain(index).concat(diff);
              return this.applyDelta(delta);
            }
          }, {
            key: 'update',
            value: function update(change) {
              var mutations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
              var cursorIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
              var oldDelta = this.delta;

              if (mutations.length === 1 && mutations[0].type === 'characterData' && mutations[0].target.data.match(ASCII) && _parchment2.default.find(mutations[0].target)) {
                // Optimization for character changes
                var textBlot = _parchment2.default.find(mutations[0].target);

                var formats = (0, _block.bubbleFormats)(textBlot);
                var index = textBlot.offset(this.scroll);
                var oldValue = mutations[0].oldValue.replace(_cursor2.default.CONTENTS, '');
                var oldText = new _quillDelta2.default().insert(oldValue);
                var newText = new _quillDelta2.default().insert(textBlot.value());
                var diffDelta = new _quillDelta2.default().retain(index).concat(oldText.diff(newText, cursorIndex));
                change = diffDelta.reduce(function (delta, op) {
                  if (op.insert) {
                    return delta.insert(op.insert, formats);
                  } else {
                    return delta.push(op);
                  }
                }, new _quillDelta2.default());
                this.delta = oldDelta.compose(change);
              } else {
                this.delta = this.getDelta();

                if (!change || !(0, _deepEqual2.default)(oldDelta.compose(change), this.delta)) {
                  change = oldDelta.diff(this.delta, cursorIndex);
                }
              }

              return change;
            }
          }]);

          return Editor;
        }();

        function combineFormats(formats, combined) {
          return Object.keys(combined).reduce(function (merged, name) {
            if (formats[name] == null) return merged;

            if (combined[name] === formats[name]) {
              merged[name] = combined[name];
            } else if (Array.isArray(combined[name])) {
              if (combined[name].indexOf(formats[name]) < 0) {
                merged[name] = combined[name].concat([formats[name]]);
              }
            } else {
              merged[name] = [combined[name], formats[name]];
            }

            return merged;
          }, {});
        }

        function normalizeDelta(delta) {
          return delta.reduce(function (delta, op) {
            if (op.insert === 1) {
              var attributes = (0, _clone2.default)(op.attributes);
              delete attributes['image'];
              return delta.insert({
                image: op.attributes.image
              }, attributes);
            }

            if (op.attributes != null && (op.attributes.list === true || op.attributes.bullet === true)) {
              op = (0, _clone2.default)(op);

              if (op.attributes.list) {
                op.attributes.list = 'ordered';
              } else {
                op.attributes.list = 'bullet';
                delete op.attributes.bullet;
              }
            }

            if (typeof op.insert === 'string') {
              var text = op.insert.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
              return delta.insert(text, op.attributes);
            }

            return delta.push(op);
          }, new _quillDelta2.default());
        }

        exports.default = Editor;
        /***/
      },
      /* 15 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = exports.Range = undefined;

        var _slicedToArray = function () {
          function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"]) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }

            return _arr;
          }

          return function (arr, i) {
            if (Array.isArray(arr)) {
              return arr;
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i);
            } else {
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
          };
        }();

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _clone = __webpack_require__(21);

        var _clone2 = _interopRequireDefault(_clone);

        var _deepEqual = __webpack_require__(11);

        var _deepEqual2 = _interopRequireDefault(_deepEqual);

        var _emitter3 = __webpack_require__(8);

        var _emitter4 = _interopRequireDefault(_emitter3);

        var _logger = __webpack_require__(10);

        var _logger2 = _interopRequireDefault(_logger);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _toConsumableArray(arr) {
          if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
              arr2[i] = arr[i];
            }

            return arr2;
          } else {
            return Array.from(arr);
          }
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var debug = (0, _logger2.default)('quill:selection');

        var Range = function Range(index) {
          var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

          _classCallCheck(this, Range);

          this.index = index;
          this.length = length;
        };

        var Selection = function () {
          function Selection(scroll, emitter) {
            var _this = this;

            _classCallCheck(this, Selection);

            this.emitter = emitter;
            this.scroll = scroll;
            this.composing = false;
            this.mouseDown = false;
            this.root = this.scroll.domNode;
            this.cursor = _parchment2.default.create('cursor', this); // savedRange is last non-null range

            this.lastRange = this.savedRange = new Range(0, 0);
            this.handleComposition();
            this.handleDragging();
            this.emitter.listenDOM('selectionchange', document, function () {
              if (!_this.mouseDown) {
                setTimeout(_this.update.bind(_this, _emitter4.default.sources.USER), 1);
              }
            });
            this.emitter.on(_emitter4.default.events.EDITOR_CHANGE, function (type, delta) {
              if (type === _emitter4.default.events.TEXT_CHANGE && delta.length() > 0) {
                _this.update(_emitter4.default.sources.SILENT);
              }
            });
            this.emitter.on(_emitter4.default.events.SCROLL_BEFORE_UPDATE, function () {
              if (!_this.hasFocus()) return;

              var native = _this.getNativeRange();

              if (native == null) return;
              if (native.start.node === _this.cursor.textNode) return; // cursor.restore() will handle
              // TODO unclear if this has negative side effects

              _this.emitter.once(_emitter4.default.events.SCROLL_UPDATE, function () {
                try {
                  _this.setNativeRange(native.start.node, native.start.offset, native.end.node, native.end.offset);
                } catch (ignored) {}
              });
            });
            this.emitter.on(_emitter4.default.events.SCROLL_OPTIMIZE, function (mutations, context) {
              if (context.range) {
                var _context$range = context.range,
                    startNode = _context$range.startNode,
                    startOffset = _context$range.startOffset,
                    endNode = _context$range.endNode,
                    endOffset = _context$range.endOffset;

                _this.setNativeRange(startNode, startOffset, endNode, endOffset);
              }
            });
            this.update(_emitter4.default.sources.SILENT);
          }

          _createClass(Selection, [{
            key: 'handleComposition',
            value: function handleComposition() {
              var _this2 = this;

              this.root.addEventListener('compositionstart', function () {
                _this2.composing = true;
              });
              this.root.addEventListener('compositionend', function () {
                _this2.composing = false;

                if (_this2.cursor.parent) {
                  var range = _this2.cursor.restore();

                  if (!range) return;
                  setTimeout(function () {
                    _this2.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset);
                  }, 1);
                }
              });
            }
          }, {
            key: 'handleDragging',
            value: function handleDragging() {
              var _this3 = this;

              this.emitter.listenDOM('mousedown', document.body, function () {
                _this3.mouseDown = true;
              });
              this.emitter.listenDOM('mouseup', document.body, function () {
                _this3.mouseDown = false;

                _this3.update(_emitter4.default.sources.USER);
              });
            }
          }, {
            key: 'focus',
            value: function focus() {
              if (this.hasFocus()) return;
              this.root.focus();
              this.setRange(this.savedRange);
            }
          }, {
            key: 'format',
            value: function format(_format, value) {
              if (this.scroll.whitelist != null && !this.scroll.whitelist[_format]) return;
              this.scroll.update();
              var nativeRange = this.getNativeRange();
              if (nativeRange == null || !nativeRange.native.collapsed || _parchment2.default.query(_format, _parchment2.default.Scope.BLOCK)) return;

              if (nativeRange.start.node !== this.cursor.textNode) {
                var blot = _parchment2.default.find(nativeRange.start.node, false);

                if (blot == null) return; // TODO Give blot ability to not split

                if (blot instanceof _parchment2.default.Leaf) {
                  var after = blot.split(nativeRange.start.offset);
                  blot.parent.insertBefore(this.cursor, after);
                } else {
                  blot.insertBefore(this.cursor, nativeRange.start.node); // Should never happen
                }

                this.cursor.attach();
              }

              this.cursor.format(_format, value);
              this.scroll.optimize();
              this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length);
              this.update();
            }
          }, {
            key: 'getBounds',
            value: function getBounds(index) {
              var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
              var scrollLength = this.scroll.length();
              index = Math.min(index, scrollLength - 1);
              length = Math.min(index + length, scrollLength - 1) - index;

              var node = void 0,
                  _scroll$leaf = this.scroll.leaf(index),
                  _scroll$leaf2 = _slicedToArray(_scroll$leaf, 2),
                  leaf = _scroll$leaf2[0],
                  offset = _scroll$leaf2[1];

              if (leaf == null) return null;

              var _leaf$position = leaf.position(offset, true);

              var _leaf$position2 = _slicedToArray(_leaf$position, 2);

              node = _leaf$position2[0];
              offset = _leaf$position2[1];
              var range = document.createRange();

              if (length > 0) {
                range.setStart(node, offset);

                var _scroll$leaf3 = this.scroll.leaf(index + length);

                var _scroll$leaf4 = _slicedToArray(_scroll$leaf3, 2);

                leaf = _scroll$leaf4[0];
                offset = _scroll$leaf4[1];
                if (leaf == null) return null;

                var _leaf$position3 = leaf.position(offset, true);

                var _leaf$position4 = _slicedToArray(_leaf$position3, 2);

                node = _leaf$position4[0];
                offset = _leaf$position4[1];
                range.setEnd(node, offset);
                return range.getBoundingClientRect();
              } else {
                var side = 'left';
                var rect = void 0;

                if (node instanceof Text) {
                  if (offset < node.data.length) {
                    range.setStart(node, offset);
                    range.setEnd(node, offset + 1);
                  } else {
                    range.setStart(node, offset - 1);
                    range.setEnd(node, offset);
                    side = 'right';
                  }

                  rect = range.getBoundingClientRect();
                } else {
                  rect = leaf.domNode.getBoundingClientRect();
                  if (offset > 0) side = 'right';
                }

                return {
                  bottom: rect.top + rect.height,
                  height: rect.height,
                  left: rect[side],
                  right: rect[side],
                  top: rect.top,
                  width: 0
                };
              }
            }
          }, {
            key: 'getNativeRange',
            value: function getNativeRange() {
              var selection = document.getSelection();
              if (selection == null || selection.rangeCount <= 0) return null;
              var nativeRange = selection.getRangeAt(0);
              if (nativeRange == null) return null;
              var range = this.normalizeNative(nativeRange);
              debug.info('getNativeRange', range);
              return range;
            }
          }, {
            key: 'getRange',
            value: function getRange() {
              var normalized = this.getNativeRange();
              if (normalized == null) return [null, null];
              var range = this.normalizedToRange(normalized);
              return [range, normalized];
            }
          }, {
            key: 'hasFocus',
            value: function hasFocus() {
              return document.activeElement === this.root;
            }
          }, {
            key: 'normalizedToRange',
            value: function normalizedToRange(range) {
              var _this4 = this;

              var positions = [[range.start.node, range.start.offset]];

              if (!range.native.collapsed) {
                positions.push([range.end.node, range.end.offset]);
              }

              var indexes = positions.map(function (position) {
                var _position = _slicedToArray(position, 2),
                    node = _position[0],
                    offset = _position[1];

                var blot = _parchment2.default.find(node, true);

                var index = blot.offset(_this4.scroll);

                if (offset === 0) {
                  return index;
                } else if (blot instanceof _parchment2.default.Container) {
                  return index + blot.length();
                } else {
                  return index + blot.index(node, offset);
                }
              });
              var end = Math.min(Math.max.apply(Math, _toConsumableArray(indexes)), this.scroll.length() - 1);
              var start = Math.min.apply(Math, [end].concat(_toConsumableArray(indexes)));
              return new Range(start, end - start);
            }
          }, {
            key: 'normalizeNative',
            value: function normalizeNative(nativeRange) {
              if (!contains(this.root, nativeRange.startContainer) || !nativeRange.collapsed && !contains(this.root, nativeRange.endContainer)) {
                return null;
              }

              var range = {
                start: {
                  node: nativeRange.startContainer,
                  offset: nativeRange.startOffset
                },
                end: {
                  node: nativeRange.endContainer,
                  offset: nativeRange.endOffset
                },
                native: nativeRange
              };
              [range.start, range.end].forEach(function (position) {
                var node = position.node,
                    offset = position.offset;

                while (!(node instanceof Text) && node.childNodes.length > 0) {
                  if (node.childNodes.length > offset) {
                    node = node.childNodes[offset];
                    offset = 0;
                  } else if (node.childNodes.length === offset) {
                    node = node.lastChild;
                    offset = node instanceof Text ? node.data.length : node.childNodes.length + 1;
                  } else {
                    break;
                  }
                }

                position.node = node, position.offset = offset;
              });
              return range;
            }
          }, {
            key: 'rangeToNative',
            value: function rangeToNative(range) {
              var _this5 = this;

              var indexes = range.collapsed ? [range.index] : [range.index, range.index + range.length];
              var args = [];
              var scrollLength = this.scroll.length();
              indexes.forEach(function (index, i) {
                index = Math.min(scrollLength - 1, index);

                var node = void 0,
                    _scroll$leaf5 = _this5.scroll.leaf(index),
                    _scroll$leaf6 = _slicedToArray(_scroll$leaf5, 2),
                    leaf = _scroll$leaf6[0],
                    offset = _scroll$leaf6[1];

                var _leaf$position5 = leaf.position(offset, i !== 0);

                var _leaf$position6 = _slicedToArray(_leaf$position5, 2);

                node = _leaf$position6[0];
                offset = _leaf$position6[1];
                args.push(node, offset);
              });

              if (args.length < 2) {
                args = args.concat(args);
              }

              return args;
            }
          }, {
            key: 'scrollIntoView',
            value: function scrollIntoView(scrollingContainer) {
              var range = this.lastRange;
              if (range == null) return;
              var bounds = this.getBounds(range.index, range.length);
              if (bounds == null) return;
              var limit = this.scroll.length() - 1;

              var _scroll$line = this.scroll.line(Math.min(range.index, limit)),
                  _scroll$line2 = _slicedToArray(_scroll$line, 1),
                  first = _scroll$line2[0];

              var last = first;

              if (range.length > 0) {
                var _scroll$line3 = this.scroll.line(Math.min(range.index + range.length, limit));

                var _scroll$line4 = _slicedToArray(_scroll$line3, 1);

                last = _scroll$line4[0];
              }

              if (first == null || last == null) return;
              var scrollBounds = scrollingContainer.getBoundingClientRect();

              if (bounds.top < scrollBounds.top) {
                scrollingContainer.scrollTop -= scrollBounds.top - bounds.top;
              } else if (bounds.bottom > scrollBounds.bottom) {
                scrollingContainer.scrollTop += bounds.bottom - scrollBounds.bottom;
              }
            }
          }, {
            key: 'setNativeRange',
            value: function setNativeRange(startNode, startOffset) {
              var endNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : startNode;
              var endOffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : startOffset;
              var force = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
              debug.info('setNativeRange', startNode, startOffset, endNode, endOffset);

              if (startNode != null && (this.root.parentNode == null || startNode.parentNode == null || endNode.parentNode == null)) {
                return;
              }

              var selection = document.getSelection();
              if (selection == null) return;

              if (startNode != null) {
                if (!this.hasFocus()) this.root.focus();
                var native = (this.getNativeRange() || {}).native;

                if (native == null || force || startNode !== native.startContainer || startOffset !== native.startOffset || endNode !== native.endContainer || endOffset !== native.endOffset) {
                  if (startNode.tagName == "BR") {
                    startOffset = [].indexOf.call(startNode.parentNode.childNodes, startNode);
                    startNode = startNode.parentNode;
                  }

                  if (endNode.tagName == "BR") {
                    endOffset = [].indexOf.call(endNode.parentNode.childNodes, endNode);
                    endNode = endNode.parentNode;
                  }

                  var range = document.createRange();
                  range.setStart(startNode, startOffset);
                  range.setEnd(endNode, endOffset);
                  selection.removeAllRanges();
                  selection.addRange(range);
                }
              } else {
                selection.removeAllRanges();
                this.root.blur();
                document.body.focus(); // root.blur() not enough on IE11+Travis+SauceLabs (but not local VMs)
              }
            }
          }, {
            key: 'setRange',
            value: function setRange(range) {
              var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
              var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _emitter4.default.sources.API;

              if (typeof force === 'string') {
                source = force;
                force = false;
              }

              debug.info('setRange', range);

              if (range != null) {
                var args = this.rangeToNative(range);
                this.setNativeRange.apply(this, _toConsumableArray(args).concat([force]));
              } else {
                this.setNativeRange(null);
              }

              this.update(source);
            }
          }, {
            key: 'update',
            value: function update() {
              var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _emitter4.default.sources.USER;
              var oldRange = this.lastRange;

              var _getRange = this.getRange(),
                  _getRange2 = _slicedToArray(_getRange, 2),
                  lastRange = _getRange2[0],
                  nativeRange = _getRange2[1];

              this.lastRange = lastRange;

              if (this.lastRange != null) {
                this.savedRange = this.lastRange;
              }

              if (!(0, _deepEqual2.default)(oldRange, this.lastRange)) {
                var _emitter;

                if (!this.composing && nativeRange != null && nativeRange.native.collapsed && nativeRange.start.node !== this.cursor.textNode) {
                  this.cursor.restore();
                }

                var args = [_emitter4.default.events.SELECTION_CHANGE, (0, _clone2.default)(this.lastRange), (0, _clone2.default)(oldRange), source];

                (_emitter = this.emitter).emit.apply(_emitter, [_emitter4.default.events.EDITOR_CHANGE].concat(args));

                if (source !== _emitter4.default.sources.SILENT) {
                  var _emitter2;

                  (_emitter2 = this.emitter).emit.apply(_emitter2, args);
                }
              }
            }
          }]);

          return Selection;
        }();

        function contains(parent, descendant) {
          try {
            // Firefox inserts inaccessible nodes around video elements
            descendant.parentNode;
          } catch (e) {
            return false;
          } // IE11 has bug with Text nodes
          // https://connect.microsoft.com/IE/feedback/details/780874/node-contains-is-incorrect


          if (descendant instanceof Text) {
            descendant = descendant.parentNode;
          }

          return parent.contains(descendant);
        }

        exports.Range = Range;
        exports.default = Selection;
        /***/
      },
      /* 16 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Break = function (_Parchment$Embed) {
          _inherits(Break, _Parchment$Embed);

          function Break() {
            _classCallCheck(this, Break);

            return _possibleConstructorReturn(this, (Break.__proto__ || Object.getPrototypeOf(Break)).apply(this, arguments));
          }

          _createClass(Break, [{
            key: 'insertInto',
            value: function insertInto(parent, ref) {
              if (parent.children.length === 0) {
                _get(Break.prototype.__proto__ || Object.getPrototypeOf(Break.prototype), 'insertInto', this).call(this, parent, ref);
              } else {
                this.remove();
              }
            }
          }, {
            key: 'length',
            value: function length() {
              return 0;
            }
          }, {
            key: 'value',
            value: function value() {
              return '';
            }
          }], [{
            key: 'value',
            value: function value() {
              return undefined;
            }
          }]);

          return Break;
        }(_parchment2.default.Embed);

        Break.blotName = 'break';
        Break.tagName = 'BR';
        exports.default = Break;
        /***/
      },
      /* 17 */

      /***/
      function (module, exports, __webpack_require__) {

        var __extends = this && this.__extends || function () {
          var extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };

          return function (d, b) {
            extendStatics(d, b);

            function __() {
              this.constructor = d;
            }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var linked_list_1 = __webpack_require__(44);

        var shadow_1 = __webpack_require__(30);

        var Registry = __webpack_require__(1);

        var ContainerBlot =
        /** @class */
        function (_super) {
          __extends(ContainerBlot, _super);

          function ContainerBlot(domNode) {
            var _this = _super.call(this, domNode) || this;

            _this.build();

            return _this;
          }

          ContainerBlot.prototype.appendChild = function (other) {
            this.insertBefore(other);
          };

          ContainerBlot.prototype.attach = function () {
            _super.prototype.attach.call(this);

            this.children.forEach(function (child) {
              child.attach();
            });
          };

          ContainerBlot.prototype.build = function () {
            var _this = this;

            this.children = new linked_list_1.default(); // Need to be reversed for if DOM nodes already in order

            [].slice.call(this.domNode.childNodes).reverse().forEach(function (node) {
              try {
                var child = makeBlot(node);

                _this.insertBefore(child, _this.children.head || undefined);
              } catch (err) {
                if (err instanceof Registry.ParchmentError) return;else throw err;
              }
            });
          };

          ContainerBlot.prototype.deleteAt = function (index, length) {
            if (index === 0 && length === this.length()) {
              return this.remove();
            }

            this.children.forEachAt(index, length, function (child, offset, length) {
              child.deleteAt(offset, length);
            });
          };

          ContainerBlot.prototype.descendant = function (criteria, index) {
            var _a = this.children.find(index),
                child = _a[0],
                offset = _a[1];

            if (criteria.blotName == null && criteria(child) || criteria.blotName != null && child instanceof criteria) {
              return [child, offset];
            } else if (child instanceof ContainerBlot) {
              return child.descendant(criteria, offset);
            } else {
              return [null, -1];
            }
          };

          ContainerBlot.prototype.descendants = function (criteria, index, length) {
            if (index === void 0) {
              index = 0;
            }

            if (length === void 0) {
              length = Number.MAX_VALUE;
            }

            var descendants = [];
            var lengthLeft = length;
            this.children.forEachAt(index, length, function (child, index, length) {
              if (criteria.blotName == null && criteria(child) || criteria.blotName != null && child instanceof criteria) {
                descendants.push(child);
              }

              if (child instanceof ContainerBlot) {
                descendants = descendants.concat(child.descendants(criteria, index, lengthLeft));
              }

              lengthLeft -= length;
            });
            return descendants;
          };

          ContainerBlot.prototype.detach = function () {
            this.children.forEach(function (child) {
              child.detach();
            });

            _super.prototype.detach.call(this);
          };

          ContainerBlot.prototype.formatAt = function (index, length, name, value) {
            this.children.forEachAt(index, length, function (child, offset, length) {
              child.formatAt(offset, length, name, value);
            });
          };

          ContainerBlot.prototype.insertAt = function (index, value, def) {
            var _a = this.children.find(index),
                child = _a[0],
                offset = _a[1];

            if (child) {
              child.insertAt(offset, value, def);
            } else {
              var blot = def == null ? Registry.create('text', value) : Registry.create(value, def);
              this.appendChild(blot);
            }
          };

          ContainerBlot.prototype.insertBefore = function (childBlot, refBlot) {
            if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function (child) {
              return childBlot instanceof child;
            })) {
              throw new Registry.ParchmentError("Cannot insert " + childBlot.statics.blotName + " into " + this.statics.blotName);
            }

            childBlot.insertInto(this, refBlot);
          };

          ContainerBlot.prototype.length = function () {
            return this.children.reduce(function (memo, child) {
              return memo + child.length();
            }, 0);
          };

          ContainerBlot.prototype.moveChildren = function (targetParent, refNode) {
            this.children.forEach(function (child) {
              targetParent.insertBefore(child, refNode);
            });
          };

          ContainerBlot.prototype.optimize = function (context) {
            _super.prototype.optimize.call(this, context);

            if (this.children.length === 0) {
              if (this.statics.defaultChild != null) {
                var child = Registry.create(this.statics.defaultChild);
                this.appendChild(child);
                child.optimize(context);
              } else {
                this.remove();
              }
            }
          };

          ContainerBlot.prototype.path = function (index, inclusive) {
            if (inclusive === void 0) {
              inclusive = false;
            }

            var _a = this.children.find(index, inclusive),
                child = _a[0],
                offset = _a[1];

            var position = [[this, index]];

            if (child instanceof ContainerBlot) {
              return position.concat(child.path(offset, inclusive));
            } else if (child != null) {
              position.push([child, offset]);
            }

            return position;
          };

          ContainerBlot.prototype.removeChild = function (child) {
            this.children.remove(child);
          };

          ContainerBlot.prototype.replace = function (target) {
            if (target instanceof ContainerBlot) {
              target.moveChildren(this);
            }

            _super.prototype.replace.call(this, target);
          };

          ContainerBlot.prototype.split = function (index, force) {
            if (force === void 0) {
              force = false;
            }

            if (!force) {
              if (index === 0) return this;
              if (index === this.length()) return this.next;
            }

            var after = this.clone();
            this.parent.insertBefore(after, this.next);
            this.children.forEachAt(index, this.length(), function (child, offset, length) {
              child = child.split(offset, force);
              after.appendChild(child);
            });
            return after;
          };

          ContainerBlot.prototype.unwrap = function () {
            this.moveChildren(this.parent, this.next);
            this.remove();
          };

          ContainerBlot.prototype.update = function (mutations, context) {
            var _this = this;

            var addedNodes = [];
            var removedNodes = [];
            mutations.forEach(function (mutation) {
              if (mutation.target === _this.domNode && mutation.type === 'childList') {
                addedNodes.push.apply(addedNodes, mutation.addedNodes);
                removedNodes.push.apply(removedNodes, mutation.removedNodes);
              }
            });
            removedNodes.forEach(function (node) {
              // Check node has actually been removed
              // One exception is Chrome does not immediately remove IFRAMEs
              // from DOM but MutationRecord is correct in its reported removal
              if (node.parentNode != null && // @ts-ignore
              node.tagName !== 'IFRAME' && document.body.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                return;
              }

              var blot = Registry.find(node);
              if (blot == null) return;

              if (blot.domNode.parentNode == null || blot.domNode.parentNode === _this.domNode) {
                blot.detach();
              }
            });
            addedNodes.filter(function (node) {
              return node.parentNode == _this.domNode;
            }).sort(function (a, b) {
              if (a === b) return 0;

              if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) {
                return 1;
              }

              return -1;
            }).forEach(function (node) {
              var refBlot = null;

              if (node.nextSibling != null) {
                refBlot = Registry.find(node.nextSibling);
              }

              var blot = makeBlot(node);

              if (blot.next != refBlot || blot.next == null) {
                if (blot.parent != null) {
                  blot.parent.removeChild(_this);
                }

                _this.insertBefore(blot, refBlot || undefined);
              }
            });
          };

          return ContainerBlot;
        }(shadow_1.default);

        function makeBlot(node) {
          var blot = Registry.find(node);

          if (blot == null) {
            try {
              blot = Registry.create(node);
            } catch (e) {
              blot = Registry.create(Registry.Scope.INLINE);
              [].slice.call(node.childNodes).forEach(function (child) {
                // @ts-ignore
                blot.domNode.appendChild(child);
              });

              if (node.parentNode) {
                node.parentNode.replaceChild(blot.domNode, node);
              }

              blot.attach();
            }
          }

          return blot;
        }

        exports.default = ContainerBlot;
        /***/
      },
      /* 18 */

      /***/
      function (module, exports, __webpack_require__) {

        var __extends = this && this.__extends || function () {
          var extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };

          return function (d, b) {
            extendStatics(d, b);

            function __() {
              this.constructor = d;
            }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var attributor_1 = __webpack_require__(12);

        var store_1 = __webpack_require__(31);

        var container_1 = __webpack_require__(17);

        var Registry = __webpack_require__(1);

        var FormatBlot =
        /** @class */
        function (_super) {
          __extends(FormatBlot, _super);

          function FormatBlot(domNode) {
            var _this = _super.call(this, domNode) || this;

            _this.attributes = new store_1.default(_this.domNode);
            return _this;
          }

          FormatBlot.formats = function (domNode) {
            if (typeof this.tagName === 'string') {
              return true;
            } else if (Array.isArray(this.tagName)) {
              return domNode.tagName.toLowerCase();
            }

            return undefined;
          };

          FormatBlot.prototype.format = function (name, value) {
            var format = Registry.query(name);

            if (format instanceof attributor_1.default) {
              this.attributes.attribute(format, value);
            } else if (value) {
              if (format != null && (name !== this.statics.blotName || this.formats()[name] !== value)) {
                this.replaceWith(name, value);
              }
            }
          };

          FormatBlot.prototype.formats = function () {
            var formats = this.attributes.values();
            var format = this.statics.formats(this.domNode);

            if (format != null) {
              formats[this.statics.blotName] = format;
            }

            return formats;
          };

          FormatBlot.prototype.replaceWith = function (name, value) {
            var replacement = _super.prototype.replaceWith.call(this, name, value);

            this.attributes.copy(replacement);
            return replacement;
          };

          FormatBlot.prototype.update = function (mutations, context) {
            var _this = this;

            _super.prototype.update.call(this, mutations, context);

            if (mutations.some(function (mutation) {
              return mutation.target === _this.domNode && mutation.type === 'attributes';
            })) {
              this.attributes.build();
            }
          };

          FormatBlot.prototype.wrap = function (name, value) {
            var wrapper = _super.prototype.wrap.call(this, name, value);

            if (wrapper instanceof FormatBlot && wrapper.statics.scope === this.statics.scope) {
              this.attributes.move(wrapper);
            }

            return wrapper;
          };

          return FormatBlot;
        }(container_1.default);

        exports.default = FormatBlot;
        /***/
      },
      /* 19 */

      /***/
      function (module, exports, __webpack_require__) {

        var __extends = this && this.__extends || function () {
          var extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };

          return function (d, b) {
            extendStatics(d, b);

            function __() {
              this.constructor = d;
            }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var shadow_1 = __webpack_require__(30);

        var Registry = __webpack_require__(1);

        var LeafBlot =
        /** @class */
        function (_super) {
          __extends(LeafBlot, _super);

          function LeafBlot() {
            return _super !== null && _super.apply(this, arguments) || this;
          }

          LeafBlot.value = function (domNode) {
            return true;
          };

          LeafBlot.prototype.index = function (node, offset) {
            if (this.domNode === node || this.domNode.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
              return Math.min(offset, 1);
            }

            return -1;
          };

          LeafBlot.prototype.position = function (index, inclusive) {
            var offset = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
            if (index > 0) offset += 1;
            return [this.parent.domNode, offset];
          };

          LeafBlot.prototype.value = function () {
            var _a;

            return _a = {}, _a[this.statics.blotName] = this.statics.value(this.domNode) || true, _a;
          };

          LeafBlot.scope = Registry.Scope.INLINE_BLOT;
          return LeafBlot;
        }(shadow_1.default);

        exports.default = LeafBlot;
        /***/
      },
      /* 20 */

      /***/
      function (module, exports, __webpack_require__) {
        var equal = __webpack_require__(11);

        var extend = __webpack_require__(3);

        var lib = {
          attributes: {
            compose: function (a, b, keepNull) {
              if (typeof a !== 'object') a = {};
              if (typeof b !== 'object') b = {};
              var attributes = extend(true, {}, b);

              if (!keepNull) {
                attributes = Object.keys(attributes).reduce(function (copy, key) {
                  if (attributes[key] != null) {
                    copy[key] = attributes[key];
                  }

                  return copy;
                }, {});
              }

              for (var key in a) {
                if (a[key] !== undefined && b[key] === undefined) {
                  attributes[key] = a[key];
                }
              }

              return Object.keys(attributes).length > 0 ? attributes : undefined;
            },
            diff: function (a, b) {
              if (typeof a !== 'object') a = {};
              if (typeof b !== 'object') b = {};
              var attributes = Object.keys(a).concat(Object.keys(b)).reduce(function (attributes, key) {
                if (!equal(a[key], b[key])) {
                  attributes[key] = b[key] === undefined ? null : b[key];
                }

                return attributes;
              }, {});
              return Object.keys(attributes).length > 0 ? attributes : undefined;
            },
            transform: function (a, b, priority) {
              if (typeof a !== 'object') return b;
              if (typeof b !== 'object') return undefined;
              if (!priority) return b; // b simply overwrites us without priority

              var attributes = Object.keys(b).reduce(function (attributes, key) {
                if (a[key] === undefined) attributes[key] = b[key]; // null is a valid value

                return attributes;
              }, {});
              return Object.keys(attributes).length > 0 ? attributes : undefined;
            }
          },
          iterator: function (ops) {
            return new Iterator(ops);
          },
          length: function (op) {
            if (typeof op['delete'] === 'number') {
              return op['delete'];
            } else if (typeof op.retain === 'number') {
              return op.retain;
            } else {
              return typeof op.insert === 'string' ? op.insert.length : 1;
            }
          }
        };

        function Iterator(ops) {
          this.ops = ops;
          this.index = 0;
          this.offset = 0;
        }

        Iterator.prototype.hasNext = function () {
          return this.peekLength() < Infinity;
        };

        Iterator.prototype.next = function (length) {
          if (!length) length = Infinity;
          var nextOp = this.ops[this.index];

          if (nextOp) {
            var offset = this.offset;
            var opLength = lib.length(nextOp);

            if (length >= opLength - offset) {
              length = opLength - offset;
              this.index += 1;
              this.offset = 0;
            } else {
              this.offset += length;
            }

            if (typeof nextOp['delete'] === 'number') {
              return {
                'delete': length
              };
            } else {
              var retOp = {};

              if (nextOp.attributes) {
                retOp.attributes = nextOp.attributes;
              }

              if (typeof nextOp.retain === 'number') {
                retOp.retain = length;
              } else if (typeof nextOp.insert === 'string') {
                retOp.insert = nextOp.insert.substr(offset, length);
              } else {
                // offset should === 0, length should === 1
                retOp.insert = nextOp.insert;
              }

              return retOp;
            }
          } else {
            return {
              retain: Infinity
            };
          }
        };

        Iterator.prototype.peek = function () {
          return this.ops[this.index];
        };

        Iterator.prototype.peekLength = function () {
          if (this.ops[this.index]) {
            // Should never return 0 if our index is being managed correctly
            return lib.length(this.ops[this.index]) - this.offset;
          } else {
            return Infinity;
          }
        };

        Iterator.prototype.peekType = function () {
          if (this.ops[this.index]) {
            if (typeof this.ops[this.index]['delete'] === 'number') {
              return 'delete';
            } else if (typeof this.ops[this.index].retain === 'number') {
              return 'retain';
            } else {
              return 'insert';
            }
          }

          return 'retain';
        };

        Iterator.prototype.rest = function () {
          if (!this.hasNext()) {
            return [];
          } else if (this.offset === 0) {
            return this.ops.slice(this.index);
          } else {
            var offset = this.offset;
            var index = this.index;
            var next = this.next();
            var rest = this.ops.slice(this.index);
            this.offset = offset;
            this.index = index;
            return [next].concat(rest);
          }
        };

        module.exports = lib;
        /***/
      },
      /* 21 */

      /***/
      function (module, exports) {
        var clone = function () {

          function _instanceof(obj, type) {
            return type != null && obj instanceof type;
          }

          var nativeMap;

          try {
            nativeMap = Map;
          } catch (_) {
            // maybe a reference error because no `Map`. Give it a dummy value that no
            // value will ever be an instanceof.
            nativeMap = function () {};
          }

          var nativeSet;

          try {
            nativeSet = Set;
          } catch (_) {
            nativeSet = function () {};
          }

          var nativePromise;

          try {
            nativePromise = Promise;
          } catch (_) {
            nativePromise = function () {};
          }
          /**
           * Clones (copies) an Object using deep copying.
           *
           * This function supports circular references by default, but if you are certain
           * there are no circular references in your object, you can save some CPU time
           * by calling clone(obj, false).
           *
           * Caution: if `circular` is false and `parent` contains circular references,
           * your program may enter an infinite loop and crash.
           *
           * @param `parent` - the object to be cloned
           * @param `circular` - set to true if the object to be cloned may contain
           *    circular references. (optional - true by default)
           * @param `depth` - set to a number if the object is only to be cloned to
           *    a particular depth. (optional - defaults to Infinity)
           * @param `prototype` - sets the prototype to be used when cloning an object.
           *    (optional - defaults to parent prototype).
           * @param `includeNonEnumerable` - set to true if the non-enumerable properties
           *    should be cloned as well. Non-enumerable properties on the prototype
           *    chain will be ignored. (optional - false by default)
          */


          function clone(parent, circular, depth, prototype, includeNonEnumerable) {
            if (typeof circular === 'object') {
              depth = circular.depth;
              prototype = circular.prototype;
              includeNonEnumerable = circular.includeNonEnumerable;
              circular = circular.circular;
            } // maintain two arrays for circular references, where corresponding parents
            // and children have the same index


            var allParents = [];
            var allChildren = [];
            var useBuffer = typeof Buffer != 'undefined';
            if (typeof circular == 'undefined') circular = true;
            if (typeof depth == 'undefined') depth = Infinity; // recurse this function so we don't reset allParents and allChildren

            function _clone(parent, depth) {
              // cloning null always returns null
              if (parent === null) return null;
              if (depth === 0) return parent;
              var child;
              var proto;

              if (typeof parent != 'object') {
                return parent;
              }

              if (_instanceof(parent, nativeMap)) {
                child = new nativeMap();
              } else if (_instanceof(parent, nativeSet)) {
                child = new nativeSet();
              } else if (_instanceof(parent, nativePromise)) {
                child = new nativePromise(function (resolve, reject) {
                  parent.then(function (value) {
                    resolve(_clone(value, depth - 1));
                  }, function (err) {
                    reject(_clone(err, depth - 1));
                  });
                });
              } else if (clone.__isArray(parent)) {
                child = [];
              } else if (clone.__isRegExp(parent)) {
                child = new RegExp(parent.source, __getRegExpFlags(parent));
                if (parent.lastIndex) child.lastIndex = parent.lastIndex;
              } else if (clone.__isDate(parent)) {
                child = new Date(parent.getTime());
              } else if (useBuffer && Buffer.isBuffer(parent)) {
                if (Buffer.allocUnsafe) {
                  // Node.js >= 4.5.0
                  child = Buffer.allocUnsafe(parent.length);
                } else {
                  // Older Node.js versions
                  child = new Buffer(parent.length);
                }

                parent.copy(child);
                return child;
              } else if (_instanceof(parent, Error)) {
                child = Object.create(parent);
              } else {
                if (typeof prototype == 'undefined') {
                  proto = Object.getPrototypeOf(parent);
                  child = Object.create(proto);
                } else {
                  child = Object.create(prototype);
                  proto = prototype;
                }
              }

              if (circular) {
                var index = allParents.indexOf(parent);

                if (index != -1) {
                  return allChildren[index];
                }

                allParents.push(parent);
                allChildren.push(child);
              }

              if (_instanceof(parent, nativeMap)) {
                parent.forEach(function (value, key) {
                  var keyChild = _clone(key, depth - 1);

                  var valueChild = _clone(value, depth - 1);

                  child.set(keyChild, valueChild);
                });
              }

              if (_instanceof(parent, nativeSet)) {
                parent.forEach(function (value) {
                  var entryChild = _clone(value, depth - 1);

                  child.add(entryChild);
                });
              }

              for (var i in parent) {
                var attrs;

                if (proto) {
                  attrs = Object.getOwnPropertyDescriptor(proto, i);
                }

                if (attrs && attrs.set == null) {
                  continue;
                }

                child[i] = _clone(parent[i], depth - 1);
              }

              if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(parent);

                for (var i = 0; i < symbols.length; i++) {
                  // Don't need to worry about cloning a symbol because it is a primitive,
                  // like a number or string.
                  var symbol = symbols[i];
                  var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);

                  if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                    continue;
                  }

                  child[symbol] = _clone(parent[symbol], depth - 1);

                  if (!descriptor.enumerable) {
                    Object.defineProperty(child, symbol, {
                      enumerable: false
                    });
                  }
                }
              }

              if (includeNonEnumerable) {
                var allPropertyNames = Object.getOwnPropertyNames(parent);

                for (var i = 0; i < allPropertyNames.length; i++) {
                  var propertyName = allPropertyNames[i];
                  var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);

                  if (descriptor && descriptor.enumerable) {
                    continue;
                  }

                  child[propertyName] = _clone(parent[propertyName], depth - 1);
                  Object.defineProperty(child, propertyName, {
                    enumerable: false
                  });
                }
              }

              return child;
            }

            return _clone(parent, depth);
          }
          /**
           * Simple flat clone using prototype, accepts only objects, usefull for property
           * override on FLAT configuration object (no nested props).
           *
           * USE WITH CAUTION! This may not behave as you wish if you do not know how this
           * works.
           */


          clone.clonePrototype = function clonePrototype(parent) {
            if (parent === null) return null;

            var c = function () {};

            c.prototype = parent;
            return new c();
          }; // private utility functions


          function __objToStr(o) {
            return Object.prototype.toString.call(o);
          }

          clone.__objToStr = __objToStr;

          function __isDate(o) {
            return typeof o === 'object' && __objToStr(o) === '[object Date]';
          }

          clone.__isDate = __isDate;

          function __isArray(o) {
            return typeof o === 'object' && __objToStr(o) === '[object Array]';
          }

          clone.__isArray = __isArray;

          function __isRegExp(o) {
            return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
          }

          clone.__isRegExp = __isRegExp;

          function __getRegExpFlags(re) {
            var flags = '';
            if (re.global) flags += 'g';
            if (re.ignoreCase) flags += 'i';
            if (re.multiline) flags += 'm';
            return flags;
          }

          clone.__getRegExpFlags = __getRegExpFlags;
          return clone;
        }();

        if (typeof module === 'object' && module.exports) {
          module.exports = clone;
        }
        /***/

      },
      /* 22 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _slicedToArray = function () {
          function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"]) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }

            return _arr;
          }

          return function (arr, i) {
            if (Array.isArray(arr)) {
              return arr;
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i);
            } else {
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
          };
        }();

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _emitter = __webpack_require__(8);

        var _emitter2 = _interopRequireDefault(_emitter);

        var _block = __webpack_require__(4);

        var _block2 = _interopRequireDefault(_block);

        var _break = __webpack_require__(16);

        var _break2 = _interopRequireDefault(_break);

        var _code = __webpack_require__(13);

        var _code2 = _interopRequireDefault(_code);

        var _container = __webpack_require__(25);

        var _container2 = _interopRequireDefault(_container);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        function isLine(blot) {
          return blot instanceof _block2.default || blot instanceof _block.BlockEmbed;
        }

        var Scroll = function (_Parchment$Scroll) {
          _inherits(Scroll, _Parchment$Scroll);

          function Scroll(domNode, config) {
            _classCallCheck(this, Scroll);

            var _this = _possibleConstructorReturn(this, (Scroll.__proto__ || Object.getPrototypeOf(Scroll)).call(this, domNode));

            _this.emitter = config.emitter;

            if (Array.isArray(config.whitelist)) {
              _this.whitelist = config.whitelist.reduce(function (whitelist, format) {
                whitelist[format] = true;
                return whitelist;
              }, {});
            } // Some reason fixes composition issues with character languages in Windows/Chrome, Safari


            _this.domNode.addEventListener('DOMNodeInserted', function () {});

            _this.optimize();

            _this.enable();

            return _this;
          }

          _createClass(Scroll, [{
            key: 'batchStart',
            value: function batchStart() {
              this.batch = true;
            }
          }, {
            key: 'batchEnd',
            value: function batchEnd() {
              this.batch = false;
              this.optimize();
            }
          }, {
            key: 'deleteAt',
            value: function deleteAt(index, length) {
              var _line = this.line(index),
                  _line2 = _slicedToArray(_line, 2),
                  first = _line2[0],
                  offset = _line2[1];

              var _line3 = this.line(index + length),
                  _line4 = _slicedToArray(_line3, 1),
                  last = _line4[0];

              _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'deleteAt', this).call(this, index, length);

              if (last != null && first !== last && offset > 0) {
                if (first instanceof _block.BlockEmbed || last instanceof _block.BlockEmbed) {
                  this.optimize();
                  return;
                }

                if (first instanceof _code2.default) {
                  var newlineIndex = first.newlineIndex(first.length(), true);

                  if (newlineIndex > -1) {
                    first = first.split(newlineIndex + 1);

                    if (first === last) {
                      this.optimize();
                      return;
                    }
                  }
                } else if (last instanceof _code2.default) {
                  var _newlineIndex = last.newlineIndex(0);

                  if (_newlineIndex > -1) {
                    last.split(_newlineIndex + 1);
                  }
                }

                var ref = last.children.head instanceof _break2.default ? null : last.children.head;
                first.moveChildren(last, ref);
                first.remove();
              }

              this.optimize();
            }
          }, {
            key: 'enable',
            value: function enable() {
              var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
              this.domNode.setAttribute('contenteditable', enabled);
            }
          }, {
            key: 'formatAt',
            value: function formatAt(index, length, format, value) {
              if (this.whitelist != null && !this.whitelist[format]) return;

              _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'formatAt', this).call(this, index, length, format, value);

              this.optimize();
            }
          }, {
            key: 'insertAt',
            value: function insertAt(index, value, def) {
              if (def != null && this.whitelist != null && !this.whitelist[value]) return;

              if (index >= this.length()) {
                if (def == null || _parchment2.default.query(value, _parchment2.default.Scope.BLOCK) == null) {
                  var blot = _parchment2.default.create(this.statics.defaultChild);

                  this.appendChild(blot);

                  if (def == null && value.endsWith('\n')) {
                    value = value.slice(0, -1);
                  }

                  blot.insertAt(0, value, def);
                } else {
                  var embed = _parchment2.default.create(value, def);

                  this.appendChild(embed);
                }
              } else {
                _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'insertAt', this).call(this, index, value, def);
              }

              this.optimize();
            }
          }, {
            key: 'insertBefore',
            value: function insertBefore(blot, ref) {
              if (blot.statics.scope === _parchment2.default.Scope.INLINE_BLOT) {
                var wrapper = _parchment2.default.create(this.statics.defaultChild);

                wrapper.appendChild(blot);
                blot = wrapper;
              }

              _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'insertBefore', this).call(this, blot, ref);
            }
          }, {
            key: 'leaf',
            value: function leaf(index) {
              return this.path(index).pop() || [null, -1];
            }
          }, {
            key: 'line',
            value: function line(index) {
              if (index === this.length()) {
                return this.line(index - 1);
              }

              return this.descendant(isLine, index);
            }
          }, {
            key: 'lines',
            value: function lines() {
              var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
              var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;

              var getLines = function getLines(blot, index, length) {
                var lines = [],
                    lengthLeft = length;
                blot.children.forEachAt(index, length, function (child, index, length) {
                  if (isLine(child)) {
                    lines.push(child);
                  } else if (child instanceof _parchment2.default.Container) {
                    lines = lines.concat(getLines(child, index, lengthLeft));
                  }

                  lengthLeft -= length;
                });
                return lines;
              };

              return getLines(this, index, length);
            }
          }, {
            key: 'optimize',
            value: function optimize() {
              var mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
              var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
              if (this.batch === true) return;

              _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'optimize', this).call(this, mutations, context);

              if (mutations.length > 0) {
                this.emitter.emit(_emitter2.default.events.SCROLL_OPTIMIZE, mutations, context);
              }
            }
          }, {
            key: 'path',
            value: function path(index) {
              return _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'path', this).call(this, index).slice(1); // Exclude self
            }
          }, {
            key: 'update',
            value: function update(mutations) {
              if (this.batch === true) return;
              var source = _emitter2.default.sources.USER;

              if (typeof mutations === 'string') {
                source = mutations;
              }

              if (!Array.isArray(mutations)) {
                mutations = this.observer.takeRecords();
              }

              if (mutations.length > 0) {
                this.emitter.emit(_emitter2.default.events.SCROLL_BEFORE_UPDATE, source, mutations);
              }

              _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'update', this).call(this, mutations.concat([])); // pass copy


              if (mutations.length > 0) {
                this.emitter.emit(_emitter2.default.events.SCROLL_UPDATE, source, mutations);
              }
            }
          }]);

          return Scroll;
        }(_parchment2.default.Scroll);

        Scroll.blotName = 'scroll';
        Scroll.className = 'ql-editor';
        Scroll.tagName = 'DIV';
        Scroll.defaultChild = 'block';
        Scroll.allowedChildren = [_block2.default, _block.BlockEmbed, _container2.default];
        exports.default = Scroll;
        /***/
      },
      /* 23 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.SHORTKEY = exports.default = undefined;

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        var _slicedToArray = function () {
          function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"]) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }

            return _arr;
          }

          return function (arr, i) {
            if (Array.isArray(arr)) {
              return arr;
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i);
            } else {
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
          };
        }();

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _clone = __webpack_require__(21);

        var _clone2 = _interopRequireDefault(_clone);

        var _deepEqual = __webpack_require__(11);

        var _deepEqual2 = _interopRequireDefault(_deepEqual);

        var _extend = __webpack_require__(3);

        var _extend2 = _interopRequireDefault(_extend);

        var _quillDelta = __webpack_require__(2);

        var _quillDelta2 = _interopRequireDefault(_quillDelta);

        var _op = __webpack_require__(20);

        var _op2 = _interopRequireDefault(_op);

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _quill = __webpack_require__(5);

        var _quill2 = _interopRequireDefault(_quill);

        var _logger = __webpack_require__(10);

        var _logger2 = _interopRequireDefault(_logger);

        var _module = __webpack_require__(9);

        var _module2 = _interopRequireDefault(_module);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var debug = (0, _logger2.default)('quill:keyboard');
        var SHORTKEY = /Mac/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';

        var Keyboard = function (_Module) {
          _inherits(Keyboard, _Module);

          _createClass(Keyboard, null, [{
            key: 'match',
            value: function match(evt, binding) {
              binding = normalize(binding);

              if (['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].some(function (key) {
                return !!binding[key] !== evt[key] && binding[key] !== null;
              })) {
                return false;
              }

              return binding.key === (evt.which || evt.keyCode);
            }
          }]);

          function Keyboard(quill, options) {
            _classCallCheck(this, Keyboard);

            var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this, quill, options));

            _this.bindings = {};
            Object.keys(_this.options.bindings).forEach(function (name) {
              if (name === 'list autofill' && quill.scroll.whitelist != null && !quill.scroll.whitelist['list']) {
                return;
              }

              if (_this.options.bindings[name]) {
                _this.addBinding(_this.options.bindings[name]);
              }
            });

            _this.addBinding({
              key: Keyboard.keys.ENTER,
              shiftKey: null
            }, handleEnter);

            _this.addBinding({
              key: Keyboard.keys.ENTER,
              metaKey: null,
              ctrlKey: null,
              altKey: null
            }, function () {});

            if (/Firefox/i.test(navigator.userAgent)) {
              // Need to handle delete and backspace for Firefox in the general case #1171
              _this.addBinding({
                key: Keyboard.keys.BACKSPACE
              }, {
                collapsed: true
              }, handleBackspace);

              _this.addBinding({
                key: Keyboard.keys.DELETE
              }, {
                collapsed: true
              }, handleDelete);
            } else {
              _this.addBinding({
                key: Keyboard.keys.BACKSPACE
              }, {
                collapsed: true,
                prefix: /^.?$/
              }, handleBackspace);

              _this.addBinding({
                key: Keyboard.keys.DELETE
              }, {
                collapsed: true,
                suffix: /^.?$/
              }, handleDelete);
            }

            _this.addBinding({
              key: Keyboard.keys.BACKSPACE
            }, {
              collapsed: false
            }, handleDeleteRange);

            _this.addBinding({
              key: Keyboard.keys.DELETE
            }, {
              collapsed: false
            }, handleDeleteRange);

            _this.addBinding({
              key: Keyboard.keys.BACKSPACE,
              altKey: null,
              ctrlKey: null,
              metaKey: null,
              shiftKey: null
            }, {
              collapsed: true,
              offset: 0
            }, handleBackspace);

            _this.listen();

            return _this;
          }

          _createClass(Keyboard, [{
            key: 'addBinding',
            value: function addBinding(key) {
              var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
              var handler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
              var binding = normalize(key);

              if (binding == null || binding.key == null) {
                return debug.warn('Attempted to add invalid keyboard binding', binding);
              }

              if (typeof context === 'function') {
                context = {
                  handler: context
                };
              }

              if (typeof handler === 'function') {
                handler = {
                  handler: handler
                };
              }

              binding = (0, _extend2.default)(binding, context, handler);
              this.bindings[binding.key] = this.bindings[binding.key] || [];
              this.bindings[binding.key].push(binding);
            }
          }, {
            key: 'listen',
            value: function listen() {
              var _this2 = this;

              this.quill.root.addEventListener('keydown', function (evt) {
                if (evt.defaultPrevented) return;
                var which = evt.which || evt.keyCode;
                var bindings = (_this2.bindings[which] || []).filter(function (binding) {
                  return Keyboard.match(evt, binding);
                });
                if (bindings.length === 0) return;

                var range = _this2.quill.getSelection();

                if (range == null || !_this2.quill.hasFocus()) return;

                var _quill$getLine = _this2.quill.getLine(range.index),
                    _quill$getLine2 = _slicedToArray(_quill$getLine, 2),
                    line = _quill$getLine2[0],
                    offset = _quill$getLine2[1];

                var _quill$getLeaf = _this2.quill.getLeaf(range.index),
                    _quill$getLeaf2 = _slicedToArray(_quill$getLeaf, 2),
                    leafStart = _quill$getLeaf2[0],
                    offsetStart = _quill$getLeaf2[1];

                var _ref = range.length === 0 ? [leafStart, offsetStart] : _this2.quill.getLeaf(range.index + range.length),
                    _ref2 = _slicedToArray(_ref, 2),
                    leafEnd = _ref2[0],
                    offsetEnd = _ref2[1];

                var prefixText = leafStart instanceof _parchment2.default.Text ? leafStart.value().slice(0, offsetStart) : '';
                var suffixText = leafEnd instanceof _parchment2.default.Text ? leafEnd.value().slice(offsetEnd) : '';
                var curContext = {
                  collapsed: range.length === 0,
                  empty: range.length === 0 && line.length() <= 1,
                  format: _this2.quill.getFormat(range),
                  offset: offset,
                  prefix: prefixText,
                  suffix: suffixText
                };
                var prevented = bindings.some(function (binding) {
                  if (binding.collapsed != null && binding.collapsed !== curContext.collapsed) return false;
                  if (binding.empty != null && binding.empty !== curContext.empty) return false;
                  if (binding.offset != null && binding.offset !== curContext.offset) return false;

                  if (Array.isArray(binding.format)) {
                    // any format is present
                    if (binding.format.every(function (name) {
                      return curContext.format[name] == null;
                    })) {
                      return false;
                    }
                  } else if (_typeof(binding.format) === 'object') {
                    // all formats must match
                    if (!Object.keys(binding.format).every(function (name) {
                      if (binding.format[name] === true) return curContext.format[name] != null;
                      if (binding.format[name] === false) return curContext.format[name] == null;
                      return (0, _deepEqual2.default)(binding.format[name], curContext.format[name]);
                    })) {
                      return false;
                    }
                  }

                  if (binding.prefix != null && !binding.prefix.test(curContext.prefix)) return false;
                  if (binding.suffix != null && !binding.suffix.test(curContext.suffix)) return false;
                  return binding.handler.call(_this2, range, curContext) !== true;
                });

                if (prevented) {
                  evt.preventDefault();
                }
              });
            }
          }]);

          return Keyboard;
        }(_module2.default);

        Keyboard.keys = {
          BACKSPACE: 8,
          TAB: 9,
          ENTER: 13,
          ESCAPE: 27,
          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,
          DELETE: 46
        };
        Keyboard.DEFAULTS = {
          bindings: {
            'bold': makeFormatHandler('bold'),
            'italic': makeFormatHandler('italic'),
            'underline': makeFormatHandler('underline'),
            'indent': {
              // highlight tab or tab at beginning of list, indent or blockquote
              key: Keyboard.keys.TAB,
              format: ['blockquote', 'indent', 'list'],
              handler: function handler(range, context) {
                if (context.collapsed && context.offset !== 0) return true;
                this.quill.format('indent', '+1', _quill2.default.sources.USER);
              }
            },
            'outdent': {
              key: Keyboard.keys.TAB,
              shiftKey: true,
              format: ['blockquote', 'indent', 'list'],
              // highlight tab or tab at beginning of list, indent or blockquote
              handler: function handler(range, context) {
                if (context.collapsed && context.offset !== 0) return true;
                this.quill.format('indent', '-1', _quill2.default.sources.USER);
              }
            },
            'outdent backspace': {
              key: Keyboard.keys.BACKSPACE,
              collapsed: true,
              shiftKey: null,
              metaKey: null,
              ctrlKey: null,
              altKey: null,
              format: ['indent', 'list'],
              offset: 0,
              handler: function handler(range, context) {
                if (context.format.indent != null) {
                  this.quill.format('indent', '-1', _quill2.default.sources.USER);
                } else if (context.format.list != null) {
                  this.quill.format('list', false, _quill2.default.sources.USER);
                }
              }
            },
            'indent code-block': makeCodeBlockHandler(true),
            'outdent code-block': makeCodeBlockHandler(false),
            'remove tab': {
              key: Keyboard.keys.TAB,
              shiftKey: true,
              collapsed: true,
              prefix: /\t$/,
              handler: function handler(range) {
                this.quill.deleteText(range.index - 1, 1, _quill2.default.sources.USER);
              }
            },
            'tab': {
              key: Keyboard.keys.TAB,
              handler: function handler(range) {
                this.quill.history.cutoff();
                var delta = new _quillDelta2.default().retain(range.index).delete(range.length).insert('\t');
                this.quill.updateContents(delta, _quill2.default.sources.USER);
                this.quill.history.cutoff();
                this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
              }
            },
            'list empty enter': {
              key: Keyboard.keys.ENTER,
              collapsed: true,
              format: ['list'],
              empty: true,
              handler: function handler(range, context) {
                this.quill.format('list', false, _quill2.default.sources.USER);

                if (context.format.indent) {
                  this.quill.format('indent', false, _quill2.default.sources.USER);
                }
              }
            },
            'checklist enter': {
              key: Keyboard.keys.ENTER,
              collapsed: true,
              format: {
                list: 'checked'
              },
              handler: function handler(range) {
                var _quill$getLine3 = this.quill.getLine(range.index),
                    _quill$getLine4 = _slicedToArray(_quill$getLine3, 2),
                    line = _quill$getLine4[0],
                    offset = _quill$getLine4[1];

                var formats = (0, _extend2.default)({}, line.formats(), {
                  list: 'checked'
                });
                var delta = new _quillDelta2.default().retain(range.index).insert('\n', formats).retain(line.length() - offset - 1).retain(1, {
                  list: 'unchecked'
                });
                this.quill.updateContents(delta, _quill2.default.sources.USER);
                this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
                this.quill.scrollIntoView();
              }
            },
            'header enter': {
              key: Keyboard.keys.ENTER,
              collapsed: true,
              format: ['header'],
              suffix: /^$/,
              handler: function handler(range, context) {
                var _quill$getLine5 = this.quill.getLine(range.index),
                    _quill$getLine6 = _slicedToArray(_quill$getLine5, 2),
                    line = _quill$getLine6[0],
                    offset = _quill$getLine6[1];

                var delta = new _quillDelta2.default().retain(range.index).insert('\n', context.format).retain(line.length() - offset - 1).retain(1, {
                  header: null
                });
                this.quill.updateContents(delta, _quill2.default.sources.USER);
                this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
                this.quill.scrollIntoView();
              }
            },
            'list autofill': {
              key: ' ',
              collapsed: true,
              format: {
                list: false
              },
              prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
              handler: function handler(range, context) {
                var length = context.prefix.length;

                var _quill$getLine7 = this.quill.getLine(range.index),
                    _quill$getLine8 = _slicedToArray(_quill$getLine7, 2),
                    line = _quill$getLine8[0],
                    offset = _quill$getLine8[1];

                if (offset > length) return true;
                var value = void 0;

                switch (context.prefix.trim()) {
                  case '[]':
                  case '[ ]':
                    value = 'unchecked';
                    break;

                  case '[x]':
                    value = 'checked';
                    break;

                  case '-':
                  case '*':
                    value = 'bullet';
                    break;

                  default:
                    value = 'ordered';
                }

                this.quill.insertText(range.index, ' ', _quill2.default.sources.USER);
                this.quill.history.cutoff();
                var delta = new _quillDelta2.default().retain(range.index - offset).delete(length + 1).retain(line.length() - 2 - offset).retain(1, {
                  list: value
                });
                this.quill.updateContents(delta, _quill2.default.sources.USER);
                this.quill.history.cutoff();
                this.quill.setSelection(range.index - length, _quill2.default.sources.SILENT);
              }
            },
            'code exit': {
              key: Keyboard.keys.ENTER,
              collapsed: true,
              format: ['code-block'],
              prefix: /\n\n$/,
              suffix: /^\s+$/,
              handler: function handler(range) {
                var _quill$getLine9 = this.quill.getLine(range.index),
                    _quill$getLine10 = _slicedToArray(_quill$getLine9, 2),
                    line = _quill$getLine10[0],
                    offset = _quill$getLine10[1];

                var delta = new _quillDelta2.default().retain(range.index + line.length() - offset - 2).retain(1, {
                  'code-block': null
                }).delete(1);
                this.quill.updateContents(delta, _quill2.default.sources.USER);
              }
            },
            'embed left': makeEmbedArrowHandler(Keyboard.keys.LEFT, false),
            'embed left shift': makeEmbedArrowHandler(Keyboard.keys.LEFT, true),
            'embed right': makeEmbedArrowHandler(Keyboard.keys.RIGHT, false),
            'embed right shift': makeEmbedArrowHandler(Keyboard.keys.RIGHT, true)
          }
        };

        function makeEmbedArrowHandler(key, shiftKey) {
          var _ref3;

          var where = key === Keyboard.keys.LEFT ? 'prefix' : 'suffix';
          return _ref3 = {
            key: key,
            shiftKey: shiftKey,
            altKey: null
          }, _defineProperty(_ref3, where, /^$/), _defineProperty(_ref3, 'handler', function handler(range) {
            var index = range.index;

            if (key === Keyboard.keys.RIGHT) {
              index += range.length + 1;
            }

            var _quill$getLeaf3 = this.quill.getLeaf(index),
                _quill$getLeaf4 = _slicedToArray(_quill$getLeaf3, 1),
                leaf = _quill$getLeaf4[0];

            if (!(leaf instanceof _parchment2.default.Embed)) return true;

            if (key === Keyboard.keys.LEFT) {
              if (shiftKey) {
                this.quill.setSelection(range.index - 1, range.length + 1, _quill2.default.sources.USER);
              } else {
                this.quill.setSelection(range.index - 1, _quill2.default.sources.USER);
              }
            } else {
              if (shiftKey) {
                this.quill.setSelection(range.index, range.length + 1, _quill2.default.sources.USER);
              } else {
                this.quill.setSelection(range.index + range.length + 1, _quill2.default.sources.USER);
              }
            }

            return false;
          }), _ref3;
        }

        function handleBackspace(range, context) {
          if (range.index === 0 || this.quill.getLength() <= 1) return;

          var _quill$getLine11 = this.quill.getLine(range.index),
              _quill$getLine12 = _slicedToArray(_quill$getLine11, 1),
              line = _quill$getLine12[0];

          var formats = {};

          if (context.offset === 0) {
            var _quill$getLine13 = this.quill.getLine(range.index - 1),
                _quill$getLine14 = _slicedToArray(_quill$getLine13, 1),
                prev = _quill$getLine14[0];

            if (prev != null && prev.length() > 1) {
              var curFormats = line.formats();
              var prevFormats = this.quill.getFormat(range.index - 1, 1);
              formats = _op2.default.attributes.diff(curFormats, prevFormats) || {};
            }
          } // Check for astral symbols


          var length = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(context.prefix) ? 2 : 1;
          this.quill.deleteText(range.index - length, length, _quill2.default.sources.USER);

          if (Object.keys(formats).length > 0) {
            this.quill.formatLine(range.index - length, length, formats, _quill2.default.sources.USER);
          }

          this.quill.focus();
        }

        function handleDelete(range, context) {
          // Check for astral symbols
          var length = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(context.suffix) ? 2 : 1;
          if (range.index >= this.quill.getLength() - length) return;
          var formats = {},
              nextLength = 0;

          var _quill$getLine15 = this.quill.getLine(range.index),
              _quill$getLine16 = _slicedToArray(_quill$getLine15, 1),
              line = _quill$getLine16[0];

          if (context.offset >= line.length() - 1) {
            var _quill$getLine17 = this.quill.getLine(range.index + 1),
                _quill$getLine18 = _slicedToArray(_quill$getLine17, 1),
                next = _quill$getLine18[0];

            if (next) {
              var curFormats = line.formats();
              var nextFormats = this.quill.getFormat(range.index, 1);
              formats = _op2.default.attributes.diff(curFormats, nextFormats) || {};
              nextLength = next.length();
            }
          }

          this.quill.deleteText(range.index, length, _quill2.default.sources.USER);

          if (Object.keys(formats).length > 0) {
            this.quill.formatLine(range.index + nextLength - 1, length, formats, _quill2.default.sources.USER);
          }
        }

        function handleDeleteRange(range) {
          var lines = this.quill.getLines(range);
          var formats = {};

          if (lines.length > 1) {
            var firstFormats = lines[0].formats();
            var lastFormats = lines[lines.length - 1].formats();
            formats = _op2.default.attributes.diff(lastFormats, firstFormats) || {};
          }

          this.quill.deleteText(range, _quill2.default.sources.USER);

          if (Object.keys(formats).length > 0) {
            this.quill.formatLine(range.index, 1, formats, _quill2.default.sources.USER);
          }

          this.quill.setSelection(range.index, _quill2.default.sources.SILENT);
          this.quill.focus();
        }

        function handleEnter(range, context) {
          var _this3 = this;

          if (range.length > 0) {
            this.quill.scroll.deleteAt(range.index, range.length); // So we do not trigger text-change
          }

          var lineFormats = Object.keys(context.format).reduce(function (lineFormats, format) {
            if (_parchment2.default.query(format, _parchment2.default.Scope.BLOCK) && !Array.isArray(context.format[format])) {
              lineFormats[format] = context.format[format];
            }

            return lineFormats;
          }, {});
          this.quill.insertText(range.index, '\n', lineFormats, _quill2.default.sources.USER); // Earlier scroll.deleteAt might have messed up our selection,
          // so insertText's built in selection preservation is not reliable

          this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
          this.quill.focus();
          Object.keys(context.format).forEach(function (name) {
            if (lineFormats[name] != null) return;
            if (Array.isArray(context.format[name])) return;
            if (name === 'link') return;

            _this3.quill.format(name, context.format[name], _quill2.default.sources.USER);
          });
        }

        function makeCodeBlockHandler(indent) {
          return {
            key: Keyboard.keys.TAB,
            shiftKey: !indent,
            format: {
              'code-block': true
            },
            handler: function handler(range) {
              var CodeBlock = _parchment2.default.query('code-block');

              var index = range.index,
                  length = range.length;

              var _quill$scroll$descend = this.quill.scroll.descendant(CodeBlock, index),
                  _quill$scroll$descend2 = _slicedToArray(_quill$scroll$descend, 2),
                  block = _quill$scroll$descend2[0],
                  offset = _quill$scroll$descend2[1];

              if (block == null) return;
              var scrollIndex = this.quill.getIndex(block);
              var start = block.newlineIndex(offset, true) + 1;
              var end = block.newlineIndex(scrollIndex + offset + length);
              var lines = block.domNode.textContent.slice(start, end).split('\n');
              offset = 0;
              lines.forEach(function (line, i) {
                if (indent) {
                  block.insertAt(start + offset, CodeBlock.TAB);
                  offset += CodeBlock.TAB.length;

                  if (i === 0) {
                    index += CodeBlock.TAB.length;
                  } else {
                    length += CodeBlock.TAB.length;
                  }
                } else if (line.startsWith(CodeBlock.TAB)) {
                  block.deleteAt(start + offset, CodeBlock.TAB.length);
                  offset -= CodeBlock.TAB.length;

                  if (i === 0) {
                    index -= CodeBlock.TAB.length;
                  } else {
                    length -= CodeBlock.TAB.length;
                  }
                }

                offset += line.length + 1;
              });
              this.quill.update(_quill2.default.sources.USER);
              this.quill.setSelection(index, length, _quill2.default.sources.SILENT);
            }
          };
        }

        function makeFormatHandler(format) {
          return {
            key: format[0].toUpperCase(),
            shortKey: true,
            handler: function handler(range, context) {
              this.quill.format(format, !context.format[format], _quill2.default.sources.USER);
            }
          };
        }

        function normalize(binding) {
          if (typeof binding === 'string' || typeof binding === 'number') {
            return normalize({
              key: binding
            });
          }

          if ((typeof binding === 'undefined' ? 'undefined' : _typeof(binding)) === 'object') {
            binding = (0, _clone2.default)(binding, false);
          }

          if (typeof binding.key === 'string') {
            if (Keyboard.keys[binding.key.toUpperCase()] != null) {
              binding.key = Keyboard.keys[binding.key.toUpperCase()];
            } else if (binding.key.length === 1) {
              binding.key = binding.key.toUpperCase().charCodeAt(0);
            } else {
              return null;
            }
          }

          if (binding.shortKey) {
            binding[SHORTKEY] = binding.shortKey;
            delete binding.shortKey;
          }

          return binding;
        }

        exports.default = Keyboard;
        exports.SHORTKEY = SHORTKEY;
        /***/
      },
      /* 24 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _slicedToArray = function () {
          function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"]) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }

            return _arr;
          }

          return function (arr, i) {
            if (Array.isArray(arr)) {
              return arr;
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i);
            } else {
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _text = __webpack_require__(7);

        var _text2 = _interopRequireDefault(_text);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Cursor = function (_Parchment$Embed) {
          _inherits(Cursor, _Parchment$Embed);

          _createClass(Cursor, null, [{
            key: 'value',
            value: function value() {
              return undefined;
            }
          }]);

          function Cursor(domNode, selection) {
            _classCallCheck(this, Cursor);

            var _this = _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this, domNode));

            _this.selection = selection;
            _this.textNode = document.createTextNode(Cursor.CONTENTS);

            _this.domNode.appendChild(_this.textNode);

            _this._length = 0;
            return _this;
          }

          _createClass(Cursor, [{
            key: 'detach',
            value: function detach() {
              // super.detach() will also clear domNode.__blot
              if (this.parent != null) this.parent.removeChild(this);
            }
          }, {
            key: 'format',
            value: function format(name, value) {
              if (this._length !== 0) {
                return _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'format', this).call(this, name, value);
              }

              var target = this,
                  index = 0;

              while (target != null && target.statics.scope !== _parchment2.default.Scope.BLOCK_BLOT) {
                index += target.offset(target.parent);
                target = target.parent;
              }

              if (target != null) {
                this._length = Cursor.CONTENTS.length;
                target.optimize();
                target.formatAt(index, Cursor.CONTENTS.length, name, value);
                this._length = 0;
              }
            }
          }, {
            key: 'index',
            value: function index(node, offset) {
              if (node === this.textNode) return 0;
              return _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'index', this).call(this, node, offset);
            }
          }, {
            key: 'length',
            value: function length() {
              return this._length;
            }
          }, {
            key: 'position',
            value: function position() {
              return [this.textNode, this.textNode.data.length];
            }
          }, {
            key: 'remove',
            value: function remove() {
              _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'remove', this).call(this);

              this.parent = null;
            }
          }, {
            key: 'restore',
            value: function restore() {
              if (this.selection.composing || this.parent == null) return;
              var textNode = this.textNode;
              var range = this.selection.getNativeRange();
              var restoreText = void 0,
                  start = void 0,
                  end = void 0;

              if (range != null && range.start.node === textNode && range.end.node === textNode) {
                var _ref = [textNode, range.start.offset, range.end.offset];
                restoreText = _ref[0];
                start = _ref[1];
                end = _ref[2];
              } // Link format will insert text outside of anchor tag


              while (this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode) {
                this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
              }

              if (this.textNode.data !== Cursor.CONTENTS) {
                var text = this.textNode.data.split(Cursor.CONTENTS).join('');

                if (this.next instanceof _text2.default) {
                  restoreText = this.next.domNode;
                  this.next.insertAt(0, text);
                  this.textNode.data = Cursor.CONTENTS;
                } else {
                  this.textNode.data = text;
                  this.parent.insertBefore(_parchment2.default.create(this.textNode), this);
                  this.textNode = document.createTextNode(Cursor.CONTENTS);
                  this.domNode.appendChild(this.textNode);
                }
              }

              this.remove();

              if (start != null) {
                var _map = [start, end].map(function (offset) {
                  return Math.max(0, Math.min(restoreText.data.length, offset - 1));
                });

                var _map2 = _slicedToArray(_map, 2);

                start = _map2[0];
                end = _map2[1];
                return {
                  startNode: restoreText,
                  startOffset: start,
                  endNode: restoreText,
                  endOffset: end
                };
              }
            }
          }, {
            key: 'update',
            value: function update(mutations, context) {
              var _this2 = this;

              if (mutations.some(function (mutation) {
                return mutation.type === 'characterData' && mutation.target === _this2.textNode;
              })) {
                var range = this.restore();
                if (range) context.range = range;
              }
            }
          }, {
            key: 'value',
            value: function value() {
              return '';
            }
          }]);

          return Cursor;
        }(_parchment2.default.Embed);

        Cursor.blotName = 'cursor';
        Cursor.className = 'ql-cursor';
        Cursor.tagName = 'span';
        Cursor.CONTENTS = '\uFEFF'; // Zero width no break space

        exports.default = Cursor;
        /***/
      },
      /* 25 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _block = __webpack_require__(4);

        var _block2 = _interopRequireDefault(_block);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Container = function (_Parchment$Container) {
          _inherits(Container, _Parchment$Container);

          function Container() {
            _classCallCheck(this, Container);

            return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
          }

          return Container;
        }(_parchment2.default.Container);

        Container.allowedChildren = [_block2.default, _block.BlockEmbed, Container];
        exports.default = Container;
        /***/
      },
      /* 26 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.ColorStyle = exports.ColorClass = exports.ColorAttributor = undefined;

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var ColorAttributor = function (_Parchment$Attributor) {
          _inherits(ColorAttributor, _Parchment$Attributor);

          function ColorAttributor() {
            _classCallCheck(this, ColorAttributor);

            return _possibleConstructorReturn(this, (ColorAttributor.__proto__ || Object.getPrototypeOf(ColorAttributor)).apply(this, arguments));
          }

          _createClass(ColorAttributor, [{
            key: 'value',
            value: function value(domNode) {
              var value = _get(ColorAttributor.prototype.__proto__ || Object.getPrototypeOf(ColorAttributor.prototype), 'value', this).call(this, domNode);

              if (!value.startsWith('rgb(')) return value;
              value = value.replace(/^[^\d]+/, '').replace(/[^\d]+$/, '');
              return '#' + value.split(',').map(function (component) {
                return ('00' + parseInt(component).toString(16)).slice(-2);
              }).join('');
            }
          }]);

          return ColorAttributor;
        }(_parchment2.default.Attributor.Style);

        var ColorClass = new _parchment2.default.Attributor.Class('color', 'ql-color', {
          scope: _parchment2.default.Scope.INLINE
        });
        var ColorStyle = new ColorAttributor('color', 'color', {
          scope: _parchment2.default.Scope.INLINE
        });
        exports.ColorAttributor = ColorAttributor;
        exports.ColorClass = ColorClass;
        exports.ColorStyle = ColorStyle;
        /***/
      },
      /* 27 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.sanitize = exports.default = undefined;

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _inline = __webpack_require__(6);

        var _inline2 = _interopRequireDefault(_inline);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Link = function (_Inline) {
          _inherits(Link, _Inline);

          function Link() {
            _classCallCheck(this, Link);

            return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
          }

          _createClass(Link, [{
            key: 'format',
            value: function format(name, value) {
              if (name !== this.statics.blotName || !value) return _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), 'format', this).call(this, name, value);
              value = this.constructor.sanitize(value);
              this.domNode.setAttribute('href', value);
            }
          }], [{
            key: 'create',
            value: function create(value) {
              var node = _get(Link.__proto__ || Object.getPrototypeOf(Link), 'create', this).call(this, value);

              value = this.sanitize(value);
              node.setAttribute('href', value);
              node.setAttribute('rel', 'noopener noreferrer');
              node.setAttribute('target', '_blank');
              return node;
            }
          }, {
            key: 'formats',
            value: function formats(domNode) {
              return domNode.getAttribute('href');
            }
          }, {
            key: 'sanitize',
            value: function sanitize(url) {
              return _sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
            }
          }]);

          return Link;
        }(_inline2.default);

        Link.blotName = 'link';
        Link.tagName = 'A';
        Link.SANITIZED_URL = 'about:blank';
        Link.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];

        function _sanitize(url, protocols) {
          var anchor = document.createElement('a');
          anchor.href = url;
          var protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
          return protocols.indexOf(protocol) > -1;
        }

        exports.default = Link;
        exports.sanitize = _sanitize;
        /***/
      },
      /* 28 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _keyboard = __webpack_require__(23);

        var _keyboard2 = _interopRequireDefault(_keyboard);

        var _dropdown = __webpack_require__(107);

        var _dropdown2 = _interopRequireDefault(_dropdown);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var optionsCounter = 0;

        function toggleAriaAttribute(element, attribute) {
          element.setAttribute(attribute, !(element.getAttribute(attribute) === 'true'));
        }

        var Picker = function () {
          function Picker(select) {
            var _this = this;

            _classCallCheck(this, Picker);

            this.select = select;
            this.container = document.createElement('span');
            this.buildPicker();
            this.select.style.display = 'none';
            this.select.parentNode.insertBefore(this.container, this.select);
            this.label.addEventListener('mousedown', function () {
              _this.togglePicker();
            });
            this.label.addEventListener('keydown', function (event) {
              switch (event.keyCode) {
                // Allows the "Enter" key to open the picker
                case _keyboard2.default.keys.ENTER:
                  _this.togglePicker();

                  break;
                // Allows the "Escape" key to close the picker

                case _keyboard2.default.keys.ESCAPE:
                  _this.escape();

                  event.preventDefault();
                  break;
              }
            });
            this.select.addEventListener('change', this.update.bind(this));
          }

          _createClass(Picker, [{
            key: 'togglePicker',
            value: function togglePicker() {
              this.container.classList.toggle('ql-expanded'); // Toggle aria-expanded and aria-hidden to make the picker accessible

              toggleAriaAttribute(this.label, 'aria-expanded');
              toggleAriaAttribute(this.options, 'aria-hidden');
            }
          }, {
            key: 'buildItem',
            value: function buildItem(option) {
              var _this2 = this;

              var item = document.createElement('span');
              item.tabIndex = '0';
              item.setAttribute('role', 'button');
              item.classList.add('ql-picker-item');

              if (option.hasAttribute('value')) {
                item.setAttribute('data-value', option.getAttribute('value'));
              }

              if (option.textContent) {
                item.setAttribute('data-label', option.textContent);
              }

              item.addEventListener('click', function () {
                _this2.selectItem(item, true);
              });
              item.addEventListener('keydown', function (event) {
                switch (event.keyCode) {
                  // Allows the "Enter" key to select an item
                  case _keyboard2.default.keys.ENTER:
                    _this2.selectItem(item, true);

                    event.preventDefault();
                    break;
                  // Allows the "Escape" key to close the picker

                  case _keyboard2.default.keys.ESCAPE:
                    _this2.escape();

                    event.preventDefault();
                    break;
                }
              });
              return item;
            }
          }, {
            key: 'buildLabel',
            value: function buildLabel() {
              var label = document.createElement('span');
              label.classList.add('ql-picker-label');
              label.innerHTML = _dropdown2.default;
              label.tabIndex = '0';
              label.setAttribute('role', 'button');
              label.setAttribute('aria-expanded', 'false');
              this.container.appendChild(label);
              return label;
            }
          }, {
            key: 'buildOptions',
            value: function buildOptions() {
              var _this3 = this;

              var options = document.createElement('span');
              options.classList.add('ql-picker-options'); // Don't want screen readers to read this until options are visible

              options.setAttribute('aria-hidden', 'true');
              options.tabIndex = '-1'; // Need a unique id for aria-controls

              options.id = 'ql-picker-options-' + optionsCounter;
              optionsCounter += 1;
              this.label.setAttribute('aria-controls', options.id);
              this.options = options;
              [].slice.call(this.select.options).forEach(function (option) {
                var item = _this3.buildItem(option);

                options.appendChild(item);

                if (option.selected === true) {
                  _this3.selectItem(item);
                }
              });
              this.container.appendChild(options);
            }
          }, {
            key: 'buildPicker',
            value: function buildPicker() {
              var _this4 = this;

              [].slice.call(this.select.attributes).forEach(function (item) {
                _this4.container.setAttribute(item.name, item.value);
              });
              this.container.classList.add('ql-picker');
              this.label = this.buildLabel();
              this.buildOptions();
            }
          }, {
            key: 'escape',
            value: function escape() {
              var _this5 = this; // Close menu and return focus to trigger label


              this.close(); // Need setTimeout for accessibility to ensure that the browser executes
              // focus on the next process thread and after any DOM content changes

              setTimeout(function () {
                return _this5.label.focus();
              }, 1);
            }
          }, {
            key: 'close',
            value: function close() {
              this.container.classList.remove('ql-expanded');
              this.label.setAttribute('aria-expanded', 'false');
              this.options.setAttribute('aria-hidden', 'true');
            }
          }, {
            key: 'selectItem',
            value: function selectItem(item) {
              var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
              var selected = this.container.querySelector('.ql-selected');
              if (item === selected) return;

              if (selected != null) {
                selected.classList.remove('ql-selected');
              }

              if (item == null) return;
              item.classList.add('ql-selected');
              this.select.selectedIndex = [].indexOf.call(item.parentNode.children, item);

              if (item.hasAttribute('data-value')) {
                this.label.setAttribute('data-value', item.getAttribute('data-value'));
              } else {
                this.label.removeAttribute('data-value');
              }

              if (item.hasAttribute('data-label')) {
                this.label.setAttribute('data-label', item.getAttribute('data-label'));
              } else {
                this.label.removeAttribute('data-label');
              }

              if (trigger) {
                if (typeof Event === 'function') {
                  this.select.dispatchEvent(new Event('change'));
                } else if ((typeof Event === 'undefined' ? 'undefined' : _typeof(Event)) === 'object') {
                  // IE11
                  var event = document.createEvent('Event');
                  event.initEvent('change', true, true);
                  this.select.dispatchEvent(event);
                }

                this.close();
              }
            }
          }, {
            key: 'update',
            value: function update() {
              var option = void 0;

              if (this.select.selectedIndex > -1) {
                var item = this.container.querySelector('.ql-picker-options').children[this.select.selectedIndex];
                option = this.select.options[this.select.selectedIndex];
                this.selectItem(item);
              } else {
                this.selectItem(null);
              }

              var isActive = option != null && option !== this.select.querySelector('option[selected]');
              this.label.classList.toggle('ql-active', isActive);
            }
          }]);

          return Picker;
        }();

        exports.default = Picker;
        /***/
      },
      /* 29 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _quill = __webpack_require__(5);

        var _quill2 = _interopRequireDefault(_quill);

        var _block = __webpack_require__(4);

        var _block2 = _interopRequireDefault(_block);

        var _break = __webpack_require__(16);

        var _break2 = _interopRequireDefault(_break);

        var _container = __webpack_require__(25);

        var _container2 = _interopRequireDefault(_container);

        var _cursor = __webpack_require__(24);

        var _cursor2 = _interopRequireDefault(_cursor);

        var _embed = __webpack_require__(35);

        var _embed2 = _interopRequireDefault(_embed);

        var _inline = __webpack_require__(6);

        var _inline2 = _interopRequireDefault(_inline);

        var _scroll = __webpack_require__(22);

        var _scroll2 = _interopRequireDefault(_scroll);

        var _text = __webpack_require__(7);

        var _text2 = _interopRequireDefault(_text);

        var _clipboard = __webpack_require__(55);

        var _clipboard2 = _interopRequireDefault(_clipboard);

        var _history = __webpack_require__(42);

        var _history2 = _interopRequireDefault(_history);

        var _keyboard = __webpack_require__(23);

        var _keyboard2 = _interopRequireDefault(_keyboard);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        _quill2.default.register({
          'blots/block': _block2.default,
          'blots/block/embed': _block.BlockEmbed,
          'blots/break': _break2.default,
          'blots/container': _container2.default,
          'blots/cursor': _cursor2.default,
          'blots/embed': _embed2.default,
          'blots/inline': _inline2.default,
          'blots/scroll': _scroll2.default,
          'blots/text': _text2.default,
          'modules/clipboard': _clipboard2.default,
          'modules/history': _history2.default,
          'modules/keyboard': _keyboard2.default
        });

        _parchment2.default.register(_block2.default, _break2.default, _cursor2.default, _inline2.default, _scroll2.default, _text2.default);

        exports.default = _quill2.default;
        /***/
      },
      /* 30 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var Registry = __webpack_require__(1);

        var ShadowBlot =
        /** @class */
        function () {
          function ShadowBlot(domNode) {
            this.domNode = domNode; // @ts-ignore

            this.domNode[Registry.DATA_KEY] = {
              blot: this
            };
          }

          Object.defineProperty(ShadowBlot.prototype, "statics", {
            // Hack for accessing inherited static methods
            get: function () {
              return this.constructor;
            },
            enumerable: true,
            configurable: true
          });

          ShadowBlot.create = function (value) {
            if (this.tagName == null) {
              throw new Registry.ParchmentError('Blot definition missing tagName');
            }

            var node;

            if (Array.isArray(this.tagName)) {
              if (typeof value === 'string') {
                value = value.toUpperCase();

                if (parseInt(value).toString() === value) {
                  value = parseInt(value);
                }
              }

              if (typeof value === 'number') {
                node = document.createElement(this.tagName[value - 1]);
              } else if (this.tagName.indexOf(value) > -1) {
                node = document.createElement(value);
              } else {
                node = document.createElement(this.tagName[0]);
              }
            } else {
              node = document.createElement(this.tagName);
            }

            if (this.className) {
              node.classList.add(this.className);
            }

            return node;
          };

          ShadowBlot.prototype.attach = function () {
            if (this.parent != null) {
              this.scroll = this.parent.scroll;
            }
          };

          ShadowBlot.prototype.clone = function () {
            var domNode = this.domNode.cloneNode(false);
            return Registry.create(domNode);
          };

          ShadowBlot.prototype.detach = function () {
            if (this.parent != null) this.parent.removeChild(this); // @ts-ignore

            delete this.domNode[Registry.DATA_KEY];
          };

          ShadowBlot.prototype.deleteAt = function (index, length) {
            var blot = this.isolate(index, length);
            blot.remove();
          };

          ShadowBlot.prototype.formatAt = function (index, length, name, value) {
            var blot = this.isolate(index, length);

            if (Registry.query(name, Registry.Scope.BLOT) != null && value) {
              blot.wrap(name, value);
            } else if (Registry.query(name, Registry.Scope.ATTRIBUTE) != null) {
              var parent = Registry.create(this.statics.scope);
              blot.wrap(parent);
              parent.format(name, value);
            }
          };

          ShadowBlot.prototype.insertAt = function (index, value, def) {
            var blot = def == null ? Registry.create('text', value) : Registry.create(value, def);
            var ref = this.split(index);
            this.parent.insertBefore(blot, ref);
          };

          ShadowBlot.prototype.insertInto = function (parentBlot, refBlot) {
            if (refBlot === void 0) {
              refBlot = null;
            }

            if (this.parent != null) {
              this.parent.children.remove(this);
            }

            var refDomNode = null;
            parentBlot.children.insertBefore(this, refBlot);

            if (refBlot != null) {
              refDomNode = refBlot.domNode;
            }

            if (this.domNode.parentNode != parentBlot.domNode || this.domNode.nextSibling != refDomNode) {
              parentBlot.domNode.insertBefore(this.domNode, refDomNode);
            }

            this.parent = parentBlot;
            this.attach();
          };

          ShadowBlot.prototype.isolate = function (index, length) {
            var target = this.split(index);
            target.split(length);
            return target;
          };

          ShadowBlot.prototype.length = function () {
            return 1;
          };

          ShadowBlot.prototype.offset = function (root) {
            if (root === void 0) {
              root = this.parent;
            }

            if (this.parent == null || this == root) return 0;
            return this.parent.children.offset(this) + this.parent.offset(root);
          };

          ShadowBlot.prototype.optimize = function (context) {
            // TODO clean up once we use WeakMap
            // @ts-ignore
            if (this.domNode[Registry.DATA_KEY] != null) {
              // @ts-ignore
              delete this.domNode[Registry.DATA_KEY].mutations;
            }
          };

          ShadowBlot.prototype.remove = function () {
            if (this.domNode.parentNode != null) {
              this.domNode.parentNode.removeChild(this.domNode);
            }

            this.detach();
          };

          ShadowBlot.prototype.replace = function (target) {
            if (target.parent == null) return;
            target.parent.insertBefore(this, target.next);
            target.remove();
          };

          ShadowBlot.prototype.replaceWith = function (name, value) {
            var replacement = typeof name === 'string' ? Registry.create(name, value) : name;
            replacement.replace(this);
            return replacement;
          };

          ShadowBlot.prototype.split = function (index, force) {
            return index === 0 ? this : this.next;
          };

          ShadowBlot.prototype.update = function (mutations, context) {// Nothing to do by default
          };

          ShadowBlot.prototype.wrap = function (name, value) {
            var wrapper = typeof name === 'string' ? Registry.create(name, value) : name;

            if (this.parent != null) {
              this.parent.insertBefore(wrapper, this.next);
            }

            wrapper.appendChild(this);
            return wrapper;
          };

          ShadowBlot.blotName = 'abstract';
          return ShadowBlot;
        }();

        exports.default = ShadowBlot;
        /***/
      },
      /* 31 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var attributor_1 = __webpack_require__(12);

        var class_1 = __webpack_require__(32);

        var style_1 = __webpack_require__(33);

        var Registry = __webpack_require__(1);

        var AttributorStore =
        /** @class */
        function () {
          function AttributorStore(domNode) {
            this.attributes = {};
            this.domNode = domNode;
            this.build();
          }

          AttributorStore.prototype.attribute = function (attribute, value) {
            // verb
            if (value) {
              if (attribute.add(this.domNode, value)) {
                if (attribute.value(this.domNode) != null) {
                  this.attributes[attribute.attrName] = attribute;
                } else {
                  delete this.attributes[attribute.attrName];
                }
              }
            } else {
              attribute.remove(this.domNode);
              delete this.attributes[attribute.attrName];
            }
          };

          AttributorStore.prototype.build = function () {
            var _this = this;

            this.attributes = {};
            var attributes = attributor_1.default.keys(this.domNode);
            var classes = class_1.default.keys(this.domNode);
            var styles = style_1.default.keys(this.domNode);
            attributes.concat(classes).concat(styles).forEach(function (name) {
              var attr = Registry.query(name, Registry.Scope.ATTRIBUTE);

              if (attr instanceof attributor_1.default) {
                _this.attributes[attr.attrName] = attr;
              }
            });
          };

          AttributorStore.prototype.copy = function (target) {
            var _this = this;

            Object.keys(this.attributes).forEach(function (key) {
              var value = _this.attributes[key].value(_this.domNode);

              target.format(key, value);
            });
          };

          AttributorStore.prototype.move = function (target) {
            var _this = this;

            this.copy(target);
            Object.keys(this.attributes).forEach(function (key) {
              _this.attributes[key].remove(_this.domNode);
            });
            this.attributes = {};
          };

          AttributorStore.prototype.values = function () {
            var _this = this;

            return Object.keys(this.attributes).reduce(function (attributes, name) {
              attributes[name] = _this.attributes[name].value(_this.domNode);
              return attributes;
            }, {});
          };

          return AttributorStore;
        }();

        exports.default = AttributorStore;
        /***/
      },
      /* 32 */

      /***/
      function (module, exports, __webpack_require__) {

        var __extends = this && this.__extends || function () {
          var extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };

          return function (d, b) {
            extendStatics(d, b);

            function __() {
              this.constructor = d;
            }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var attributor_1 = __webpack_require__(12);

        function match(node, prefix) {
          var className = node.getAttribute('class') || '';
          return className.split(/\s+/).filter(function (name) {
            return name.indexOf(prefix + "-") === 0;
          });
        }

        var ClassAttributor =
        /** @class */
        function (_super) {
          __extends(ClassAttributor, _super);

          function ClassAttributor() {
            return _super !== null && _super.apply(this, arguments) || this;
          }

          ClassAttributor.keys = function (node) {
            return (node.getAttribute('class') || '').split(/\s+/).map(function (name) {
              return name.split('-').slice(0, -1).join('-');
            });
          };

          ClassAttributor.prototype.add = function (node, value) {
            if (!this.canAdd(node, value)) return false;
            this.remove(node);
            node.classList.add(this.keyName + "-" + value);
            return true;
          };

          ClassAttributor.prototype.remove = function (node) {
            var matches = match(node, this.keyName);
            matches.forEach(function (name) {
              node.classList.remove(name);
            });

            if (node.classList.length === 0) {
              node.removeAttribute('class');
            }
          };

          ClassAttributor.prototype.value = function (node) {
            var result = match(node, this.keyName)[0] || '';
            var value = result.slice(this.keyName.length + 1); // +1 for hyphen

            return this.canAdd(node, value) ? value : '';
          };

          return ClassAttributor;
        }(attributor_1.default);

        exports.default = ClassAttributor;
        /***/
      },
      /* 33 */

      /***/
      function (module, exports, __webpack_require__) {

        var __extends = this && this.__extends || function () {
          var extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };

          return function (d, b) {
            extendStatics(d, b);

            function __() {
              this.constructor = d;
            }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var attributor_1 = __webpack_require__(12);

        function camelize(name) {
          var parts = name.split('-');
          var rest = parts.slice(1).map(function (part) {
            return part[0].toUpperCase() + part.slice(1);
          }).join('');
          return parts[0] + rest;
        }

        var StyleAttributor =
        /** @class */
        function (_super) {
          __extends(StyleAttributor, _super);

          function StyleAttributor() {
            return _super !== null && _super.apply(this, arguments) || this;
          }

          StyleAttributor.keys = function (node) {
            return (node.getAttribute('style') || '').split(';').map(function (value) {
              var arr = value.split(':');
              return arr[0].trim();
            });
          };

          StyleAttributor.prototype.add = function (node, value) {
            if (!this.canAdd(node, value)) return false; // @ts-ignore

            node.style[camelize(this.keyName)] = value;
            return true;
          };

          StyleAttributor.prototype.remove = function (node) {
            // @ts-ignore
            node.style[camelize(this.keyName)] = '';

            if (!node.getAttribute('style')) {
              node.removeAttribute('style');
            }
          };

          StyleAttributor.prototype.value = function (node) {
            // @ts-ignore
            var value = node.style[camelize(this.keyName)];
            return this.canAdd(node, value) ? value : '';
          };

          return StyleAttributor;
        }(attributor_1.default);

        exports.default = StyleAttributor;
        /***/
      },
      /* 34 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var Theme = function () {
          function Theme(quill, options) {
            _classCallCheck(this, Theme);

            this.quill = quill;
            this.options = options;
            this.modules = {};
          }

          _createClass(Theme, [{
            key: 'init',
            value: function init() {
              var _this = this;

              Object.keys(this.options.modules).forEach(function (name) {
                if (_this.modules[name] == null) {
                  _this.addModule(name);
                }
              });
            }
          }, {
            key: 'addModule',
            value: function addModule(name) {
              var moduleClass = this.quill.constructor.import('modules/' + name);
              this.modules[name] = new moduleClass(this.quill, this.options.modules[name] || {});
              return this.modules[name];
            }
          }]);

          return Theme;
        }();

        Theme.DEFAULTS = {
          modules: {}
        };
        Theme.themes = {
          'default': Theme
        };
        exports.default = Theme;
        /***/
      },
      /* 35 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _text = __webpack_require__(7);

        var _text2 = _interopRequireDefault(_text);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var GUARD_TEXT = '\uFEFF';

        var Embed = function (_Parchment$Embed) {
          _inherits(Embed, _Parchment$Embed);

          function Embed(node) {
            _classCallCheck(this, Embed);

            var _this = _possibleConstructorReturn(this, (Embed.__proto__ || Object.getPrototypeOf(Embed)).call(this, node));

            _this.contentNode = document.createElement('span');

            _this.contentNode.setAttribute('contenteditable', false);

            [].slice.call(_this.domNode.childNodes).forEach(function (childNode) {
              _this.contentNode.appendChild(childNode);
            });
            _this.leftGuard = document.createTextNode(GUARD_TEXT);
            _this.rightGuard = document.createTextNode(GUARD_TEXT);

            _this.domNode.appendChild(_this.leftGuard);

            _this.domNode.appendChild(_this.contentNode);

            _this.domNode.appendChild(_this.rightGuard);

            return _this;
          }

          _createClass(Embed, [{
            key: 'index',
            value: function index(node, offset) {
              if (node === this.leftGuard) return 0;
              if (node === this.rightGuard) return 1;
              return _get(Embed.prototype.__proto__ || Object.getPrototypeOf(Embed.prototype), 'index', this).call(this, node, offset);
            }
          }, {
            key: 'restore',
            value: function restore(node) {
              var range = void 0,
                  textNode = void 0;
              var text = node.data.split(GUARD_TEXT).join('');

              if (node === this.leftGuard) {
                if (this.prev instanceof _text2.default) {
                  var prevLength = this.prev.length();
                  this.prev.insertAt(prevLength, text);
                  range = {
                    startNode: this.prev.domNode,
                    startOffset: prevLength + text.length
                  };
                } else {
                  textNode = document.createTextNode(text);
                  this.parent.insertBefore(_parchment2.default.create(textNode), this);
                  range = {
                    startNode: textNode,
                    startOffset: text.length
                  };
                }
              } else if (node === this.rightGuard) {
                if (this.next instanceof _text2.default) {
                  this.next.insertAt(0, text);
                  range = {
                    startNode: this.next.domNode,
                    startOffset: text.length
                  };
                } else {
                  textNode = document.createTextNode(text);
                  this.parent.insertBefore(_parchment2.default.create(textNode), this.next);
                  range = {
                    startNode: textNode,
                    startOffset: text.length
                  };
                }
              }

              node.data = GUARD_TEXT;
              return range;
            }
          }, {
            key: 'update',
            value: function update(mutations, context) {
              var _this2 = this;

              mutations.forEach(function (mutation) {
                if (mutation.type === 'characterData' && (mutation.target === _this2.leftGuard || mutation.target === _this2.rightGuard)) {
                  var range = _this2.restore(mutation.target);

                  if (range) context.range = range;
                }
              });
            }
          }]);

          return Embed;
        }(_parchment2.default.Embed);

        exports.default = Embed;
        /***/
      },
      /* 36 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.AlignStyle = exports.AlignClass = exports.AlignAttribute = undefined;

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        var config = {
          scope: _parchment2.default.Scope.BLOCK,
          whitelist: ['right', 'center', 'justify']
        };
        var AlignAttribute = new _parchment2.default.Attributor.Attribute('align', 'align', config);
        var AlignClass = new _parchment2.default.Attributor.Class('align', 'ql-align', config);
        var AlignStyle = new _parchment2.default.Attributor.Style('align', 'text-align', config);
        exports.AlignAttribute = AlignAttribute;
        exports.AlignClass = AlignClass;
        exports.AlignStyle = AlignStyle;
        /***/
      },
      /* 37 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.BackgroundStyle = exports.BackgroundClass = undefined;

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _color = __webpack_require__(26);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        var BackgroundClass = new _parchment2.default.Attributor.Class('background', 'ql-bg', {
          scope: _parchment2.default.Scope.INLINE
        });
        var BackgroundStyle = new _color.ColorAttributor('background', 'background-color', {
          scope: _parchment2.default.Scope.INLINE
        });
        exports.BackgroundClass = BackgroundClass;
        exports.BackgroundStyle = BackgroundStyle;
        /***/
      },
      /* 38 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.DirectionStyle = exports.DirectionClass = exports.DirectionAttribute = undefined;

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        var config = {
          scope: _parchment2.default.Scope.BLOCK,
          whitelist: ['rtl']
        };
        var DirectionAttribute = new _parchment2.default.Attributor.Attribute('direction', 'dir', config);
        var DirectionClass = new _parchment2.default.Attributor.Class('direction', 'ql-direction', config);
        var DirectionStyle = new _parchment2.default.Attributor.Style('direction', 'direction', config);
        exports.DirectionAttribute = DirectionAttribute;
        exports.DirectionClass = DirectionClass;
        exports.DirectionStyle = DirectionStyle;
        /***/
      },
      /* 39 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.FontClass = exports.FontStyle = undefined;

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var config = {
          scope: _parchment2.default.Scope.INLINE,
          whitelist: ['serif', 'monospace']
        };
        var FontClass = new _parchment2.default.Attributor.Class('font', 'ql-font', config);

        var FontStyleAttributor = function (_Parchment$Attributor) {
          _inherits(FontStyleAttributor, _Parchment$Attributor);

          function FontStyleAttributor() {
            _classCallCheck(this, FontStyleAttributor);

            return _possibleConstructorReturn(this, (FontStyleAttributor.__proto__ || Object.getPrototypeOf(FontStyleAttributor)).apply(this, arguments));
          }

          _createClass(FontStyleAttributor, [{
            key: 'value',
            value: function value(node) {
              return _get(FontStyleAttributor.prototype.__proto__ || Object.getPrototypeOf(FontStyleAttributor.prototype), 'value', this).call(this, node).replace(/["']/g, '');
            }
          }]);

          return FontStyleAttributor;
        }(_parchment2.default.Attributor.Style);

        var FontStyle = new FontStyleAttributor('font', 'font-family', config);
        exports.FontStyle = FontStyle;
        exports.FontClass = FontClass;
        /***/
      },
      /* 40 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.SizeStyle = exports.SizeClass = undefined;

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        var SizeClass = new _parchment2.default.Attributor.Class('size', 'ql-size', {
          scope: _parchment2.default.Scope.INLINE,
          whitelist: ['small', 'large', 'huge']
        });
        var SizeStyle = new _parchment2.default.Attributor.Style('size', 'font-size', {
          scope: _parchment2.default.Scope.INLINE,
          whitelist: ['10px', '18px', '32px']
        });
        exports.SizeClass = SizeClass;
        exports.SizeStyle = SizeStyle;
        /***/
      },
      /* 41 */

      /***/
      function (module, exports, __webpack_require__) {

        module.exports = {
          'align': {
            '': __webpack_require__(76),
            'center': __webpack_require__(77),
            'right': __webpack_require__(78),
            'justify': __webpack_require__(79)
          },
          'background': __webpack_require__(80),
          'blockquote': __webpack_require__(81),
          'bold': __webpack_require__(82),
          'clean': __webpack_require__(83),
          'code': __webpack_require__(58),
          'code-block': __webpack_require__(58),
          'color': __webpack_require__(84),
          'direction': {
            '': __webpack_require__(85),
            'rtl': __webpack_require__(86)
          },
          'float': {
            'center': __webpack_require__(87),
            'full': __webpack_require__(88),
            'left': __webpack_require__(89),
            'right': __webpack_require__(90)
          },
          'formula': __webpack_require__(91),
          'header': {
            '1': __webpack_require__(92),
            '2': __webpack_require__(93)
          },
          'italic': __webpack_require__(94),
          'image': __webpack_require__(95),
          'indent': {
            '+1': __webpack_require__(96),
            '-1': __webpack_require__(97)
          },
          'link': __webpack_require__(98),
          'list': {
            'ordered': __webpack_require__(99),
            'bullet': __webpack_require__(100),
            'check': __webpack_require__(101)
          },
          'script': {
            'sub': __webpack_require__(102),
            'super': __webpack_require__(103)
          },
          'strike': __webpack_require__(104),
          'underline': __webpack_require__(105),
          'video': __webpack_require__(106)
        };
        /***/
      },
      /* 42 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.getLastChangeIndex = exports.default = undefined;

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _quill = __webpack_require__(5);

        var _quill2 = _interopRequireDefault(_quill);

        var _module = __webpack_require__(9);

        var _module2 = _interopRequireDefault(_module);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var History = function (_Module) {
          _inherits(History, _Module);

          function History(quill, options) {
            _classCallCheck(this, History);

            var _this = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this, quill, options));

            _this.lastRecorded = 0;
            _this.ignoreChange = false;

            _this.clear();

            _this.quill.on(_quill2.default.events.EDITOR_CHANGE, function (eventName, delta, oldDelta, source) {
              if (eventName !== _quill2.default.events.TEXT_CHANGE || _this.ignoreChange) return;

              if (!_this.options.userOnly || source === _quill2.default.sources.USER) {
                _this.record(delta, oldDelta);
              } else {
                _this.transform(delta);
              }
            });

            _this.quill.keyboard.addBinding({
              key: 'Z',
              shortKey: true
            }, _this.undo.bind(_this));

            _this.quill.keyboard.addBinding({
              key: 'Z',
              shortKey: true,
              shiftKey: true
            }, _this.redo.bind(_this));

            if (/Win/i.test(navigator.platform)) {
              _this.quill.keyboard.addBinding({
                key: 'Y',
                shortKey: true
              }, _this.redo.bind(_this));
            }

            return _this;
          }

          _createClass(History, [{
            key: 'change',
            value: function change(source, dest) {
              if (this.stack[source].length === 0) return;
              var delta = this.stack[source].pop();
              this.stack[dest].push(delta);
              this.lastRecorded = 0;
              this.ignoreChange = true;
              this.quill.updateContents(delta[source], _quill2.default.sources.USER);
              this.ignoreChange = false;
              var index = getLastChangeIndex(delta[source]);
              this.quill.setSelection(index);
            }
          }, {
            key: 'clear',
            value: function clear() {
              this.stack = {
                undo: [],
                redo: []
              };
            }
          }, {
            key: 'cutoff',
            value: function cutoff() {
              this.lastRecorded = 0;
            }
          }, {
            key: 'record',
            value: function record(changeDelta, oldDelta) {
              if (changeDelta.ops.length === 0) return;
              this.stack.redo = [];
              var undoDelta = this.quill.getContents().diff(oldDelta);
              var timestamp = Date.now();

              if (this.lastRecorded + this.options.delay > timestamp && this.stack.undo.length > 0) {
                var delta = this.stack.undo.pop();
                undoDelta = undoDelta.compose(delta.undo);
                changeDelta = delta.redo.compose(changeDelta);
              } else {
                this.lastRecorded = timestamp;
              }

              this.stack.undo.push({
                redo: changeDelta,
                undo: undoDelta
              });

              if (this.stack.undo.length > this.options.maxStack) {
                this.stack.undo.shift();
              }
            }
          }, {
            key: 'redo',
            value: function redo() {
              this.change('redo', 'undo');
            }
          }, {
            key: 'transform',
            value: function transform(delta) {
              this.stack.undo.forEach(function (change) {
                change.undo = delta.transform(change.undo, true);
                change.redo = delta.transform(change.redo, true);
              });
              this.stack.redo.forEach(function (change) {
                change.undo = delta.transform(change.undo, true);
                change.redo = delta.transform(change.redo, true);
              });
            }
          }, {
            key: 'undo',
            value: function undo() {
              this.change('undo', 'redo');
            }
          }]);

          return History;
        }(_module2.default);

        History.DEFAULTS = {
          delay: 1000,
          maxStack: 100,
          userOnly: false
        };

        function endsWithNewlineChange(delta) {
          var lastOp = delta.ops[delta.ops.length - 1];
          if (lastOp == null) return false;

          if (lastOp.insert != null) {
            return typeof lastOp.insert === 'string' && lastOp.insert.endsWith('\n');
          }

          if (lastOp.attributes != null) {
            return Object.keys(lastOp.attributes).some(function (attr) {
              return _parchment2.default.query(attr, _parchment2.default.Scope.BLOCK) != null;
            });
          }

          return false;
        }

        function getLastChangeIndex(delta) {
          var deleteLength = delta.reduce(function (length, op) {
            length += op.delete || 0;
            return length;
          }, 0);
          var changeIndex = delta.length() - deleteLength;

          if (endsWithNewlineChange(delta)) {
            changeIndex -= 1;
          }

          return changeIndex;
        }

        exports.default = History;
        exports.getLastChangeIndex = getLastChangeIndex;
        /***/
      },
      /* 43 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = exports.BaseTooltip = undefined;

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _extend = __webpack_require__(3);

        var _extend2 = _interopRequireDefault(_extend);

        var _quillDelta = __webpack_require__(2);

        var _quillDelta2 = _interopRequireDefault(_quillDelta);

        var _emitter = __webpack_require__(8);

        var _emitter2 = _interopRequireDefault(_emitter);

        var _keyboard = __webpack_require__(23);

        var _keyboard2 = _interopRequireDefault(_keyboard);

        var _theme = __webpack_require__(34);

        var _theme2 = _interopRequireDefault(_theme);

        var _colorPicker = __webpack_require__(59);

        var _colorPicker2 = _interopRequireDefault(_colorPicker);

        var _iconPicker = __webpack_require__(60);

        var _iconPicker2 = _interopRequireDefault(_iconPicker);

        var _picker = __webpack_require__(28);

        var _picker2 = _interopRequireDefault(_picker);

        var _tooltip = __webpack_require__(61);

        var _tooltip2 = _interopRequireDefault(_tooltip);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var ALIGNS = [false, 'center', 'right', 'justify'];
        var COLORS = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];
        var FONTS = [false, 'serif', 'monospace'];
        var HEADERS = ['1', '2', '3', false];
        var SIZES = ['small', false, 'large', 'huge'];

        var BaseTheme = function (_Theme) {
          _inherits(BaseTheme, _Theme);

          function BaseTheme(quill, options) {
            _classCallCheck(this, BaseTheme);

            var _this = _possibleConstructorReturn(this, (BaseTheme.__proto__ || Object.getPrototypeOf(BaseTheme)).call(this, quill, options));

            var listener = function listener(e) {
              if (!document.body.contains(quill.root)) {
                return document.body.removeEventListener('click', listener);
              }

              if (_this.tooltip != null && !_this.tooltip.root.contains(e.target) && document.activeElement !== _this.tooltip.textbox && !_this.quill.hasFocus()) {
                _this.tooltip.hide();
              }

              if (_this.pickers != null) {
                _this.pickers.forEach(function (picker) {
                  if (!picker.container.contains(e.target)) {
                    picker.close();
                  }
                });
              }
            };

            quill.emitter.listenDOM('click', document.body, listener);
            return _this;
          }

          _createClass(BaseTheme, [{
            key: 'addModule',
            value: function addModule(name) {
              var module = _get(BaseTheme.prototype.__proto__ || Object.getPrototypeOf(BaseTheme.prototype), 'addModule', this).call(this, name);

              if (name === 'toolbar') {
                this.extendToolbar(module);
              }

              return module;
            }
          }, {
            key: 'buildButtons',
            value: function buildButtons(buttons, icons) {
              buttons.forEach(function (button) {
                var className = button.getAttribute('class') || '';
                className.split(/\s+/).forEach(function (name) {
                  if (!name.startsWith('ql-')) return;
                  name = name.slice('ql-'.length);
                  if (icons[name] == null) return;

                  if (name === 'direction') {
                    button.innerHTML = icons[name][''] + icons[name]['rtl'];
                  } else if (typeof icons[name] === 'string') {
                    button.innerHTML = icons[name];
                  } else {
                    var value = button.value || '';

                    if (value != null && icons[name][value]) {
                      button.innerHTML = icons[name][value];
                    }
                  }
                });
              });
            }
          }, {
            key: 'buildPickers',
            value: function buildPickers(selects, icons) {
              var _this2 = this;

              this.pickers = selects.map(function (select) {
                if (select.classList.contains('ql-align')) {
                  if (select.querySelector('option') == null) {
                    fillSelect(select, ALIGNS);
                  }

                  return new _iconPicker2.default(select, icons.align);
                } else if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {
                  var format = select.classList.contains('ql-background') ? 'background' : 'color';

                  if (select.querySelector('option') == null) {
                    fillSelect(select, COLORS, format === 'background' ? '#ffffff' : '#000000');
                  }

                  return new _colorPicker2.default(select, icons[format]);
                } else {
                  if (select.querySelector('option') == null) {
                    if (select.classList.contains('ql-font')) {
                      fillSelect(select, FONTS);
                    } else if (select.classList.contains('ql-header')) {
                      fillSelect(select, HEADERS);
                    } else if (select.classList.contains('ql-size')) {
                      fillSelect(select, SIZES);
                    }
                  }

                  return new _picker2.default(select);
                }
              });

              var update = function update() {
                _this2.pickers.forEach(function (picker) {
                  picker.update();
                });
              };

              this.quill.on(_emitter2.default.events.EDITOR_CHANGE, update);
            }
          }]);

          return BaseTheme;
        }(_theme2.default);

        BaseTheme.DEFAULTS = (0, _extend2.default)(true, {}, _theme2.default.DEFAULTS, {
          modules: {
            toolbar: {
              handlers: {
                formula: function formula() {
                  this.quill.theme.tooltip.edit('formula');
                },
                image: function image() {
                  var _this3 = this;

                  var fileInput = this.container.querySelector('input.ql-image[type=file]');

                  if (fileInput == null) {
                    fileInput = document.createElement('input');
                    fileInput.setAttribute('type', 'file');
                    fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
                    fileInput.classList.add('ql-image');
                    fileInput.addEventListener('change', function () {
                      if (fileInput.files != null && fileInput.files[0] != null) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                          var range = _this3.quill.getSelection(true);

                          _this3.quill.updateContents(new _quillDelta2.default().retain(range.index).delete(range.length).insert({
                            image: e.target.result
                          }), _emitter2.default.sources.USER);

                          _this3.quill.setSelection(range.index + 1, _emitter2.default.sources.SILENT);

                          fileInput.value = "";
                        };

                        reader.readAsDataURL(fileInput.files[0]);
                      }
                    });
                    this.container.appendChild(fileInput);
                  }

                  fileInput.click();
                },
                video: function video() {
                  this.quill.theme.tooltip.edit('video');
                }
              }
            }
          }
        });

        var BaseTooltip = function (_Tooltip) {
          _inherits(BaseTooltip, _Tooltip);

          function BaseTooltip(quill, boundsContainer) {
            _classCallCheck(this, BaseTooltip);

            var _this4 = _possibleConstructorReturn(this, (BaseTooltip.__proto__ || Object.getPrototypeOf(BaseTooltip)).call(this, quill, boundsContainer));

            _this4.textbox = _this4.root.querySelector('input[type="text"]');

            _this4.listen();

            return _this4;
          }

          _createClass(BaseTooltip, [{
            key: 'listen',
            value: function listen() {
              var _this5 = this;

              this.textbox.addEventListener('keydown', function (event) {
                if (_keyboard2.default.match(event, 'enter')) {
                  _this5.save();

                  event.preventDefault();
                } else if (_keyboard2.default.match(event, 'escape')) {
                  _this5.cancel();

                  event.preventDefault();
                }
              });
            }
          }, {
            key: 'cancel',
            value: function cancel() {
              this.hide();
            }
          }, {
            key: 'edit',
            value: function edit() {
              var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'link';
              var preview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
              this.root.classList.remove('ql-hidden');
              this.root.classList.add('ql-editing');

              if (preview != null) {
                this.textbox.value = preview;
              } else if (mode !== this.root.getAttribute('data-mode')) {
                this.textbox.value = '';
              }

              this.position(this.quill.getBounds(this.quill.selection.savedRange));
              this.textbox.select();
              this.textbox.setAttribute('placeholder', this.textbox.getAttribute('data-' + mode) || '');
              this.root.setAttribute('data-mode', mode);
            }
          }, {
            key: 'restoreFocus',
            value: function restoreFocus() {
              var scrollTop = this.quill.scrollingContainer.scrollTop;
              this.quill.focus();
              this.quill.scrollingContainer.scrollTop = scrollTop;
            }
          }, {
            key: 'save',
            value: function save() {
              var value = this.textbox.value;

              switch (this.root.getAttribute('data-mode')) {
                case 'link':
                  {
                    var scrollTop = this.quill.root.scrollTop;

                    if (this.linkRange) {
                      this.quill.formatText(this.linkRange, 'link', value, _emitter2.default.sources.USER);
                      delete this.linkRange;
                    } else {
                      this.restoreFocus();
                      this.quill.format('link', value, _emitter2.default.sources.USER);
                    }

                    this.quill.root.scrollTop = scrollTop;
                    break;
                  }

                case 'video':
                  {
                    value = extractVideoUrl(value);
                  }
                // eslint-disable-next-line no-fallthrough

                case 'formula':
                  {
                    if (!value) break;
                    var range = this.quill.getSelection(true);

                    if (range != null) {
                      var index = range.index + range.length;
                      this.quill.insertEmbed(index, this.root.getAttribute('data-mode'), value, _emitter2.default.sources.USER);

                      if (this.root.getAttribute('data-mode') === 'formula') {
                        this.quill.insertText(index + 1, ' ', _emitter2.default.sources.USER);
                      }

                      this.quill.setSelection(index + 2, _emitter2.default.sources.USER);
                    }

                    break;
                  }
              }

              this.textbox.value = '';
              this.hide();
            }
          }]);

          return BaseTooltip;
        }(_tooltip2.default);

        function extractVideoUrl(url) {
          var match = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);

          if (match) {
            return (match[1] || 'https') + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
          }

          if (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {
            // eslint-disable-line no-cond-assign
            return (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/';
          }

          return url;
        }

        function fillSelect(select, values) {
          var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          values.forEach(function (value) {
            var option = document.createElement('option');

            if (value === defaultValue) {
              option.setAttribute('selected', 'selected');
            } else {
              option.setAttribute('value', value);
            }

            select.appendChild(option);
          });
        }

        exports.BaseTooltip = BaseTooltip;
        exports.default = BaseTheme;
        /***/
      },
      /* 44 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var LinkedList =
        /** @class */
        function () {
          function LinkedList() {
            this.head = this.tail = null;
            this.length = 0;
          }

          LinkedList.prototype.append = function () {
            var nodes = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              nodes[_i] = arguments[_i];
            }

            this.insertBefore(nodes[0], null);

            if (nodes.length > 1) {
              this.append.apply(this, nodes.slice(1));
            }
          };

          LinkedList.prototype.contains = function (node) {
            var cur,
                next = this.iterator();

            while (cur = next()) {
              if (cur === node) return true;
            }

            return false;
          };

          LinkedList.prototype.insertBefore = function (node, refNode) {
            if (!node) return;
            node.next = refNode;

            if (refNode != null) {
              node.prev = refNode.prev;

              if (refNode.prev != null) {
                refNode.prev.next = node;
              }

              refNode.prev = node;

              if (refNode === this.head) {
                this.head = node;
              }
            } else if (this.tail != null) {
              this.tail.next = node;
              node.prev = this.tail;
              this.tail = node;
            } else {
              node.prev = null;
              this.head = this.tail = node;
            }

            this.length += 1;
          };

          LinkedList.prototype.offset = function (target) {
            var index = 0,
                cur = this.head;

            while (cur != null) {
              if (cur === target) return index;
              index += cur.length();
              cur = cur.next;
            }

            return -1;
          };

          LinkedList.prototype.remove = function (node) {
            if (!this.contains(node)) return;
            if (node.prev != null) node.prev.next = node.next;
            if (node.next != null) node.next.prev = node.prev;
            if (node === this.head) this.head = node.next;
            if (node === this.tail) this.tail = node.prev;
            this.length -= 1;
          };

          LinkedList.prototype.iterator = function (curNode) {
            if (curNode === void 0) {
              curNode = this.head;
            } // TODO use yield when we can


            return function () {
              var ret = curNode;
              if (curNode != null) curNode = curNode.next;
              return ret;
            };
          };

          LinkedList.prototype.find = function (index, inclusive) {
            if (inclusive === void 0) {
              inclusive = false;
            }

            var cur,
                next = this.iterator();

            while (cur = next()) {
              var length = cur.length();

              if (index < length || inclusive && index === length && (cur.next == null || cur.next.length() !== 0)) {
                return [cur, index];
              }

              index -= length;
            }

            return [null, 0];
          };

          LinkedList.prototype.forEach = function (callback) {
            var cur,
                next = this.iterator();

            while (cur = next()) {
              callback(cur);
            }
          };

          LinkedList.prototype.forEachAt = function (index, length, callback) {
            if (length <= 0) return;

            var _a = this.find(index),
                startNode = _a[0],
                offset = _a[1];

            var cur,
                curIndex = index - offset,
                next = this.iterator(startNode);

            while ((cur = next()) && curIndex < index + length) {
              var curLength = cur.length();

              if (index > curIndex) {
                callback(cur, index - curIndex, Math.min(length, curIndex + curLength - index));
              } else {
                callback(cur, 0, Math.min(curLength, index + length - curIndex));
              }

              curIndex += curLength;
            }
          };

          LinkedList.prototype.map = function (callback) {
            return this.reduce(function (memo, cur) {
              memo.push(callback(cur));
              return memo;
            }, []);
          };

          LinkedList.prototype.reduce = function (callback, memo) {
            var cur,
                next = this.iterator();

            while (cur = next()) {
              memo = callback(memo, cur);
            }

            return memo;
          };

          return LinkedList;
        }();

        exports.default = LinkedList;
        /***/
      },
      /* 45 */

      /***/
      function (module, exports, __webpack_require__) {

        var __extends = this && this.__extends || function () {
          var extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };

          return function (d, b) {
            extendStatics(d, b);

            function __() {
              this.constructor = d;
            }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var container_1 = __webpack_require__(17);

        var Registry = __webpack_require__(1);

        var OBSERVER_CONFIG = {
          attributes: true,
          characterData: true,
          characterDataOldValue: true,
          childList: true,
          subtree: true
        };
        var MAX_OPTIMIZE_ITERATIONS = 100;

        var ScrollBlot =
        /** @class */
        function (_super) {
          __extends(ScrollBlot, _super);

          function ScrollBlot(node) {
            var _this = _super.call(this, node) || this;

            _this.scroll = _this;
            _this.observer = new MutationObserver(function (mutations) {
              _this.update(mutations);
            });

            _this.observer.observe(_this.domNode, OBSERVER_CONFIG);

            _this.attach();

            return _this;
          }

          ScrollBlot.prototype.detach = function () {
            _super.prototype.detach.call(this);

            this.observer.disconnect();
          };

          ScrollBlot.prototype.deleteAt = function (index, length) {
            this.update();

            if (index === 0 && length === this.length()) {
              this.children.forEach(function (child) {
                child.remove();
              });
            } else {
              _super.prototype.deleteAt.call(this, index, length);
            }
          };

          ScrollBlot.prototype.formatAt = function (index, length, name, value) {
            this.update();

            _super.prototype.formatAt.call(this, index, length, name, value);
          };

          ScrollBlot.prototype.insertAt = function (index, value, def) {
            this.update();

            _super.prototype.insertAt.call(this, index, value, def);
          };

          ScrollBlot.prototype.optimize = function (mutations, context) {
            var _this = this;

            if (mutations === void 0) {
              mutations = [];
            }

            if (context === void 0) {
              context = {};
            }

            _super.prototype.optimize.call(this, context); // We must modify mutations directly, cannot make copy and then modify


            var records = [].slice.call(this.observer.takeRecords()); // Array.push currently seems to be implemented by a non-tail recursive function
            // so we cannot just mutations.push.apply(mutations, this.observer.takeRecords());

            while (records.length > 0) mutations.push(records.pop()); // TODO use WeakMap


            var mark = function (blot, markParent) {
              if (markParent === void 0) {
                markParent = true;
              }

              if (blot == null || blot === _this) return;
              if (blot.domNode.parentNode == null) return; // @ts-ignore

              if (blot.domNode[Registry.DATA_KEY].mutations == null) {
                // @ts-ignore
                blot.domNode[Registry.DATA_KEY].mutations = [];
              }

              if (markParent) mark(blot.parent);
            };

            var optimize = function (blot) {
              // Post-order traversal
              if ( // @ts-ignore
              blot.domNode[Registry.DATA_KEY] == null || // @ts-ignore
              blot.domNode[Registry.DATA_KEY].mutations == null) {
                return;
              }

              if (blot instanceof container_1.default) {
                blot.children.forEach(optimize);
              }

              blot.optimize(context);
            };

            var remaining = mutations;

            for (var i = 0; remaining.length > 0; i += 1) {
              if (i >= MAX_OPTIMIZE_ITERATIONS) {
                throw new Error('[Parchment] Maximum optimize iterations reached');
              }

              remaining.forEach(function (mutation) {
                var blot = Registry.find(mutation.target, true);
                if (blot == null) return;

                if (blot.domNode === mutation.target) {
                  if (mutation.type === 'childList') {
                    mark(Registry.find(mutation.previousSibling, false));
                    [].forEach.call(mutation.addedNodes, function (node) {
                      var child = Registry.find(node, false);
                      mark(child, false);

                      if (child instanceof container_1.default) {
                        child.children.forEach(function (grandChild) {
                          mark(grandChild, false);
                        });
                      }
                    });
                  } else if (mutation.type === 'attributes') {
                    mark(blot.prev);
                  }
                }

                mark(blot);
              });
              this.children.forEach(optimize);
              remaining = [].slice.call(this.observer.takeRecords());
              records = remaining.slice();

              while (records.length > 0) mutations.push(records.pop());
            }
          };

          ScrollBlot.prototype.update = function (mutations, context) {
            var _this = this;

            if (context === void 0) {
              context = {};
            }

            mutations = mutations || this.observer.takeRecords(); // TODO use WeakMap

            mutations.map(function (mutation) {
              var blot = Registry.find(mutation.target, true);
              if (blot == null) return null; // @ts-ignore

              if (blot.domNode[Registry.DATA_KEY].mutations == null) {
                // @ts-ignore
                blot.domNode[Registry.DATA_KEY].mutations = [mutation];
                return blot;
              } else {
                // @ts-ignore
                blot.domNode[Registry.DATA_KEY].mutations.push(mutation);
                return null;
              }
            }).forEach(function (blot) {
              if (blot == null || blot === _this || //@ts-ignore
              blot.domNode[Registry.DATA_KEY] == null) return; // @ts-ignore

              blot.update(blot.domNode[Registry.DATA_KEY].mutations || [], context);
            }); // @ts-ignore

            if (this.domNode[Registry.DATA_KEY].mutations != null) {
              // @ts-ignore
              _super.prototype.update.call(this, this.domNode[Registry.DATA_KEY].mutations, context);
            }

            this.optimize(mutations, context);
          };

          ScrollBlot.blotName = 'scroll';
          ScrollBlot.defaultChild = 'block';
          ScrollBlot.scope = Registry.Scope.BLOCK_BLOT;
          ScrollBlot.tagName = 'DIV';
          return ScrollBlot;
        }(container_1.default);

        exports.default = ScrollBlot;
        /***/
      },
      /* 46 */

      /***/
      function (module, exports, __webpack_require__) {

        var __extends = this && this.__extends || function () {
          var extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };

          return function (d, b) {
            extendStatics(d, b);

            function __() {
              this.constructor = d;
            }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var format_1 = __webpack_require__(18);

        var Registry = __webpack_require__(1); // Shallow object comparison


        function isEqual(obj1, obj2) {
          if (Object.keys(obj1).length !== Object.keys(obj2).length) return false; // @ts-ignore

          for (var prop in obj1) {
            // @ts-ignore
            if (obj1[prop] !== obj2[prop]) return false;
          }

          return true;
        }

        var InlineBlot =
        /** @class */
        function (_super) {
          __extends(InlineBlot, _super);

          function InlineBlot() {
            return _super !== null && _super.apply(this, arguments) || this;
          }

          InlineBlot.formats = function (domNode) {
            if (domNode.tagName === InlineBlot.tagName) return undefined;
            return _super.formats.call(this, domNode);
          };

          InlineBlot.prototype.format = function (name, value) {
            var _this = this;

            if (name === this.statics.blotName && !value) {
              this.children.forEach(function (child) {
                if (!(child instanceof format_1.default)) {
                  child = child.wrap(InlineBlot.blotName, true);
                }

                _this.attributes.copy(child);
              });
              this.unwrap();
            } else {
              _super.prototype.format.call(this, name, value);
            }
          };

          InlineBlot.prototype.formatAt = function (index, length, name, value) {
            if (this.formats()[name] != null || Registry.query(name, Registry.Scope.ATTRIBUTE)) {
              var blot = this.isolate(index, length);
              blot.format(name, value);
            } else {
              _super.prototype.formatAt.call(this, index, length, name, value);
            }
          };

          InlineBlot.prototype.optimize = function (context) {
            _super.prototype.optimize.call(this, context);

            var formats = this.formats();

            if (Object.keys(formats).length === 0) {
              return this.unwrap(); // unformatted span
            }

            var next = this.next;

            if (next instanceof InlineBlot && next.prev === this && isEqual(formats, next.formats())) {
              next.moveChildren(this);
              next.remove();
            }
          };

          InlineBlot.blotName = 'inline';
          InlineBlot.scope = Registry.Scope.INLINE_BLOT;
          InlineBlot.tagName = 'SPAN';
          return InlineBlot;
        }(format_1.default);

        exports.default = InlineBlot;
        /***/
      },
      /* 47 */

      /***/
      function (module, exports, __webpack_require__) {

        var __extends = this && this.__extends || function () {
          var extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };

          return function (d, b) {
            extendStatics(d, b);

            function __() {
              this.constructor = d;
            }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var format_1 = __webpack_require__(18);

        var Registry = __webpack_require__(1);

        var BlockBlot =
        /** @class */
        function (_super) {
          __extends(BlockBlot, _super);

          function BlockBlot() {
            return _super !== null && _super.apply(this, arguments) || this;
          }

          BlockBlot.formats = function (domNode) {
            var tagName = Registry.query(BlockBlot.blotName).tagName;
            if (domNode.tagName === tagName) return undefined;
            return _super.formats.call(this, domNode);
          };

          BlockBlot.prototype.format = function (name, value) {
            if (Registry.query(name, Registry.Scope.BLOCK) == null) {
              return;
            } else if (name === this.statics.blotName && !value) {
              this.replaceWith(BlockBlot.blotName);
            } else {
              _super.prototype.format.call(this, name, value);
            }
          };

          BlockBlot.prototype.formatAt = function (index, length, name, value) {
            if (Registry.query(name, Registry.Scope.BLOCK) != null) {
              this.format(name, value);
            } else {
              _super.prototype.formatAt.call(this, index, length, name, value);
            }
          };

          BlockBlot.prototype.insertAt = function (index, value, def) {
            if (def == null || Registry.query(value, Registry.Scope.INLINE) != null) {
              // Insert text or inline
              _super.prototype.insertAt.call(this, index, value, def);
            } else {
              var after = this.split(index);
              var blot = Registry.create(value, def);
              after.parent.insertBefore(blot, after);
            }
          };

          BlockBlot.prototype.update = function (mutations, context) {
            if (navigator.userAgent.match(/Trident/)) {
              this.build();
            } else {
              _super.prototype.update.call(this, mutations, context);
            }
          };

          BlockBlot.blotName = 'block';
          BlockBlot.scope = Registry.Scope.BLOCK_BLOT;
          BlockBlot.tagName = 'P';
          return BlockBlot;
        }(format_1.default);

        exports.default = BlockBlot;
        /***/
      },
      /* 48 */

      /***/
      function (module, exports, __webpack_require__) {

        var __extends = this && this.__extends || function () {
          var extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };

          return function (d, b) {
            extendStatics(d, b);

            function __() {
              this.constructor = d;
            }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var leaf_1 = __webpack_require__(19);

        var EmbedBlot =
        /** @class */
        function (_super) {
          __extends(EmbedBlot, _super);

          function EmbedBlot() {
            return _super !== null && _super.apply(this, arguments) || this;
          }

          EmbedBlot.formats = function (domNode) {
            return undefined;
          };

          EmbedBlot.prototype.format = function (name, value) {
            // super.formatAt wraps, which is what we want in general,
            // but this allows subclasses to overwrite for formats
            // that just apply to particular embeds
            _super.prototype.formatAt.call(this, 0, this.length(), name, value);
          };

          EmbedBlot.prototype.formatAt = function (index, length, name, value) {
            if (index === 0 && length === this.length()) {
              this.format(name, value);
            } else {
              _super.prototype.formatAt.call(this, index, length, name, value);
            }
          };

          EmbedBlot.prototype.formats = function () {
            return this.statics.formats(this.domNode);
          };

          return EmbedBlot;
        }(leaf_1.default);

        exports.default = EmbedBlot;
        /***/
      },
      /* 49 */

      /***/
      function (module, exports, __webpack_require__) {

        var __extends = this && this.__extends || function () {
          var extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (d, b) {
            d.__proto__ = b;
          } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
          };

          return function (d, b) {
            extendStatics(d, b);

            function __() {
              this.constructor = d;
            }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var leaf_1 = __webpack_require__(19);

        var Registry = __webpack_require__(1);

        var TextBlot =
        /** @class */
        function (_super) {
          __extends(TextBlot, _super);

          function TextBlot(node) {
            var _this = _super.call(this, node) || this;

            _this.text = _this.statics.value(_this.domNode);
            return _this;
          }

          TextBlot.create = function (value) {
            return document.createTextNode(value);
          };

          TextBlot.value = function (domNode) {
            var text = domNode.data; // @ts-ignore

            if (text['normalize']) text = text['normalize']();
            return text;
          };

          TextBlot.prototype.deleteAt = function (index, length) {
            this.domNode.data = this.text = this.text.slice(0, index) + this.text.slice(index + length);
          };

          TextBlot.prototype.index = function (node, offset) {
            if (this.domNode === node) {
              return offset;
            }

            return -1;
          };

          TextBlot.prototype.insertAt = function (index, value, def) {
            if (def == null) {
              this.text = this.text.slice(0, index) + value + this.text.slice(index);
              this.domNode.data = this.text;
            } else {
              _super.prototype.insertAt.call(this, index, value, def);
            }
          };

          TextBlot.prototype.length = function () {
            return this.text.length;
          };

          TextBlot.prototype.optimize = function (context) {
            _super.prototype.optimize.call(this, context);

            this.text = this.statics.value(this.domNode);

            if (this.text.length === 0) {
              this.remove();
            } else if (this.next instanceof TextBlot && this.next.prev === this) {
              this.insertAt(this.length(), this.next.value());
              this.next.remove();
            }
          };

          TextBlot.prototype.position = function (index, inclusive) {

            return [this.domNode, index];
          };

          TextBlot.prototype.split = function (index, force) {
            if (force === void 0) {
              force = false;
            }

            if (!force) {
              if (index === 0) return this;
              if (index === this.length()) return this.next;
            }

            var after = Registry.create(this.domNode.splitText(index));
            this.parent.insertBefore(after, this.next);
            this.text = this.statics.value(this.domNode);
            return after;
          };

          TextBlot.prototype.update = function (mutations, context) {
            var _this = this;

            if (mutations.some(function (mutation) {
              return mutation.type === 'characterData' && mutation.target === _this.domNode;
            })) {
              this.text = this.statics.value(this.domNode);
            }
          };

          TextBlot.prototype.value = function () {
            return this.text;
          };

          TextBlot.blotName = 'text';
          TextBlot.scope = Registry.Scope.INLINE_BLOT;
          return TextBlot;
        }(leaf_1.default);

        exports.default = TextBlot;
        /***/
      },
      /* 50 */

      /***/
      function (module, exports, __webpack_require__) {

        var elem = document.createElement('div');
        elem.classList.toggle('test-class', false);

        if (elem.classList.contains('test-class')) {
          var _toggle = DOMTokenList.prototype.toggle;

          DOMTokenList.prototype.toggle = function (token, force) {
            if (arguments.length > 1 && !this.contains(token) === !force) {
              return force;
            } else {
              return _toggle.call(this, token);
            }
          };
        }

        if (!String.prototype.startsWith) {
          String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
          };
        }

        if (!String.prototype.endsWith) {
          String.prototype.endsWith = function (searchString, position) {
            var subjectString = this.toString();

            if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
              position = subjectString.length;
            }

            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
          };
        }

        if (!Array.prototype.find) {
          Object.defineProperty(Array.prototype, "find", {
            value: function value(predicate) {
              if (this === null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
              }

              if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
              }

              var list = Object(this);
              var length = list.length >>> 0;
              var thisArg = arguments[1];
              var value;

              for (var i = 0; i < length; i++) {
                value = list[i];

                if (predicate.call(thisArg, value, i, list)) {
                  return value;
                }
              }

              return undefined;
            }
          });
        }

        document.addEventListener("DOMContentLoaded", function () {
          // Disable resizing in Firefox
          document.execCommand("enableObjectResizing", false, false); // Disable automatic linkifying in IE11

          document.execCommand("autoUrlDetect", false, false);
        });
        /***/
      },
      /* 51 */

      /***/
      function (module, exports) {
        /**
         * This library modifies the diff-patch-match library by Neil Fraser
         * by removing the patch and match functionality and certain advanced
         * options in the diff function. The original license is as follows:
         *
         * ===
         *
         * Diff Match and Patch
         *
         * Copyright 2006 Google Inc.
         * http://code.google.com/p/google-diff-match-patch/
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         *   http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         */

        /**
         * The data structure representing a diff is an array of tuples:
         * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
         * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
         */
        var DIFF_DELETE = -1;
        var DIFF_INSERT = 1;
        var DIFF_EQUAL = 0;
        /**
         * Find the differences between two texts.  Simplifies the problem by stripping
         * any common prefix or suffix off the texts before diffing.
         * @param {string} text1 Old string to be diffed.
         * @param {string} text2 New string to be diffed.
         * @param {Int} cursor_pos Expected edit position in text1 (optional)
         * @return {Array} Array of diff tuples.
         */

        function diff_main(text1, text2, cursor_pos) {
          // Check for equality (speedup).
          if (text1 == text2) {
            if (text1) {
              return [[DIFF_EQUAL, text1]];
            }

            return [];
          } // Check cursor_pos within bounds


          if (cursor_pos < 0 || text1.length < cursor_pos) {
            cursor_pos = null;
          } // Trim off common prefix (speedup).


          var commonlength = diff_commonPrefix(text1, text2);
          var commonprefix = text1.substring(0, commonlength);
          text1 = text1.substring(commonlength);
          text2 = text2.substring(commonlength); // Trim off common suffix (speedup).

          commonlength = diff_commonSuffix(text1, text2);
          var commonsuffix = text1.substring(text1.length - commonlength);
          text1 = text1.substring(0, text1.length - commonlength);
          text2 = text2.substring(0, text2.length - commonlength); // Compute the diff on the middle block.

          var diffs = diff_compute_(text1, text2); // Restore the prefix and suffix.

          if (commonprefix) {
            diffs.unshift([DIFF_EQUAL, commonprefix]);
          }

          if (commonsuffix) {
            diffs.push([DIFF_EQUAL, commonsuffix]);
          }

          diff_cleanupMerge(diffs);

          if (cursor_pos != null) {
            diffs = fix_cursor(diffs, cursor_pos);
          }

          diffs = fix_emoji(diffs);
          return diffs;
        }
        /**
         * Find the differences between two texts.  Assumes that the texts do not
         * have any common prefix or suffix.
         * @param {string} text1 Old string to be diffed.
         * @param {string} text2 New string to be diffed.
         * @return {Array} Array of diff tuples.
         */

        function diff_compute_(text1, text2) {
          var diffs;

          if (!text1) {
            // Just add some text (speedup).
            return [[DIFF_INSERT, text2]];
          }

          if (!text2) {
            // Just delete some text (speedup).
            return [[DIFF_DELETE, text1]];
          }

          var longtext = text1.length > text2.length ? text1 : text2;
          var shorttext = text1.length > text2.length ? text2 : text1;
          var i = longtext.indexOf(shorttext);

          if (i != -1) {
            // Shorter text is inside the longer text (speedup).
            diffs = [[DIFF_INSERT, longtext.substring(0, i)], [DIFF_EQUAL, shorttext], [DIFF_INSERT, longtext.substring(i + shorttext.length)]]; // Swap insertions for deletions if diff is reversed.

            if (text1.length > text2.length) {
              diffs[0][0] = diffs[2][0] = DIFF_DELETE;
            }

            return diffs;
          }

          if (shorttext.length == 1) {
            // Single character string.
            // After the previous speedup, the character can't be an equality.
            return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
          } // Check to see if the problem can be split in two.


          var hm = diff_halfMatch_(text1, text2);

          if (hm) {
            // A half-match was found, sort out the return data.
            var text1_a = hm[0];
            var text1_b = hm[1];
            var text2_a = hm[2];
            var text2_b = hm[3];
            var mid_common = hm[4]; // Send both pairs off for separate processing.

            var diffs_a = diff_main(text1_a, text2_a);
            var diffs_b = diff_main(text1_b, text2_b); // Merge the results.

            return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
          }

          return diff_bisect_(text1, text2);
        }
        /**
         * Find the 'middle snake' of a diff, split the problem in two
         * and return the recursively constructed diff.
         * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
         * @param {string} text1 Old string to be diffed.
         * @param {string} text2 New string to be diffed.
         * @return {Array} Array of diff tuples.
         * @private
         */

        function diff_bisect_(text1, text2) {
          // Cache the text lengths to prevent multiple calls.
          var text1_length = text1.length;
          var text2_length = text2.length;
          var max_d = Math.ceil((text1_length + text2_length) / 2);
          var v_offset = max_d;
          var v_length = 2 * max_d;
          var v1 = new Array(v_length);
          var v2 = new Array(v_length); // Setting all elements to -1 is faster in Chrome & Firefox than mixing
          // integers and undefined.

          for (var x = 0; x < v_length; x++) {
            v1[x] = -1;
            v2[x] = -1;
          }

          v1[v_offset + 1] = 0;
          v2[v_offset + 1] = 0;
          var delta = text1_length - text2_length; // If the total number of characters is odd, then the front path will collide
          // with the reverse path.

          var front = delta % 2 != 0; // Offsets for start and end of k loop.
          // Prevents mapping of space beyond the grid.

          var k1start = 0;
          var k1end = 0;
          var k2start = 0;
          var k2end = 0;

          for (var d = 0; d < max_d; d++) {
            // Walk the front path one step.
            for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
              var k1_offset = v_offset + k1;
              var x1;

              if (k1 == -d || k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
                x1 = v1[k1_offset + 1];
              } else {
                x1 = v1[k1_offset - 1] + 1;
              }

              var y1 = x1 - k1;

              while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
                x1++;
                y1++;
              }

              v1[k1_offset] = x1;

              if (x1 > text1_length) {
                // Ran off the right of the graph.
                k1end += 2;
              } else if (y1 > text2_length) {
                // Ran off the bottom of the graph.
                k1start += 2;
              } else if (front) {
                var k2_offset = v_offset + delta - k1;

                if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
                  // Mirror x2 onto top-left coordinate system.
                  var x2 = text1_length - v2[k2_offset];

                  if (x1 >= x2) {
                    // Overlap detected.
                    return diff_bisectSplit_(text1, text2, x1, y1);
                  }
                }
              }
            } // Walk the reverse path one step.


            for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
              var k2_offset = v_offset + k2;
              var x2;

              if (k2 == -d || k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
                x2 = v2[k2_offset + 1];
              } else {
                x2 = v2[k2_offset - 1] + 1;
              }

              var y2 = x2 - k2;

              while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) == text2.charAt(text2_length - y2 - 1)) {
                x2++;
                y2++;
              }

              v2[k2_offset] = x2;

              if (x2 > text1_length) {
                // Ran off the left of the graph.
                k2end += 2;
              } else if (y2 > text2_length) {
                // Ran off the top of the graph.
                k2start += 2;
              } else if (!front) {
                var k1_offset = v_offset + delta - k2;

                if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
                  var x1 = v1[k1_offset];
                  var y1 = v_offset + x1 - k1_offset; // Mirror x2 onto top-left coordinate system.

                  x2 = text1_length - x2;

                  if (x1 >= x2) {
                    // Overlap detected.
                    return diff_bisectSplit_(text1, text2, x1, y1);
                  }
                }
              }
            }
          } // Diff took too long and hit the deadline or
          // number of diffs equals number of characters, no commonality at all.


          return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
        }
        /**
         * Given the location of the 'middle snake', split the diff in two parts
         * and recurse.
         * @param {string} text1 Old string to be diffed.
         * @param {string} text2 New string to be diffed.
         * @param {number} x Index of split point in text1.
         * @param {number} y Index of split point in text2.
         * @return {Array} Array of diff tuples.
         */

        function diff_bisectSplit_(text1, text2, x, y) {
          var text1a = text1.substring(0, x);
          var text2a = text2.substring(0, y);
          var text1b = text1.substring(x);
          var text2b = text2.substring(y); // Compute both diffs serially.

          var diffs = diff_main(text1a, text2a);
          var diffsb = diff_main(text1b, text2b);
          return diffs.concat(diffsb);
        }
        /**
         * Determine the common prefix of two strings.
         * @param {string} text1 First string.
         * @param {string} text2 Second string.
         * @return {number} The number of characters common to the start of each
         *     string.
         */

        function diff_commonPrefix(text1, text2) {
          // Quick check for common null cases.
          if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
            return 0;
          } // Binary search.
          // Performance analysis: http://neil.fraser.name/news/2007/10/09/


          var pointermin = 0;
          var pointermax = Math.min(text1.length, text2.length);
          var pointermid = pointermax;
          var pointerstart = 0;

          while (pointermin < pointermid) {
            if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
              pointermin = pointermid;
              pointerstart = pointermin;
            } else {
              pointermax = pointermid;
            }

            pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
          }

          return pointermid;
        }
        /**
         * Determine the common suffix of two strings.
         * @param {string} text1 First string.
         * @param {string} text2 Second string.
         * @return {number} The number of characters common to the end of each string.
         */

        function diff_commonSuffix(text1, text2) {
          // Quick check for common null cases.
          if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
            return 0;
          } // Binary search.
          // Performance analysis: http://neil.fraser.name/news/2007/10/09/


          var pointermin = 0;
          var pointermax = Math.min(text1.length, text2.length);
          var pointermid = pointermax;
          var pointerend = 0;

          while (pointermin < pointermid) {
            if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
              pointermin = pointermid;
              pointerend = pointermin;
            } else {
              pointermax = pointermid;
            }

            pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
          }

          return pointermid;
        }
        /**
         * Do the two texts share a substring which is at least half the length of the
         * longer text?
         * This speedup can produce non-minimal diffs.
         * @param {string} text1 First string.
         * @param {string} text2 Second string.
         * @return {Array.<string>} Five element Array, containing the prefix of
         *     text1, the suffix of text1, the prefix of text2, the suffix of
         *     text2 and the common middle.  Or null if there was no match.
         */

        function diff_halfMatch_(text1, text2) {
          var longtext = text1.length > text2.length ? text1 : text2;
          var shorttext = text1.length > text2.length ? text2 : text1;

          if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
            return null; // Pointless.
          }
          /**
           * Does a substring of shorttext exist within longtext such that the substring
           * is at least half the length of longtext?
           * Closure, but does not reference any external variables.
           * @param {string} longtext Longer string.
           * @param {string} shorttext Shorter string.
           * @param {number} i Start index of quarter length substring within longtext.
           * @return {Array.<string>} Five element Array, containing the prefix of
           *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
           *     of shorttext and the common middle.  Or null if there was no match.
           * @private
           */


          function diff_halfMatchI_(longtext, shorttext, i) {
            // Start with a 1/4 length substring at position i as a seed.
            var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
            var j = -1;
            var best_common = '';
            var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;

            while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
              var prefixLength = diff_commonPrefix(longtext.substring(i), shorttext.substring(j));
              var suffixLength = diff_commonSuffix(longtext.substring(0, i), shorttext.substring(0, j));

              if (best_common.length < suffixLength + prefixLength) {
                best_common = shorttext.substring(j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
                best_longtext_a = longtext.substring(0, i - suffixLength);
                best_longtext_b = longtext.substring(i + prefixLength);
                best_shorttext_a = shorttext.substring(0, j - suffixLength);
                best_shorttext_b = shorttext.substring(j + prefixLength);
              }
            }

            if (best_common.length * 2 >= longtext.length) {
              return [best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b, best_common];
            } else {
              return null;
            }
          } // First check if the second quarter is the seed for a half-match.


          var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4)); // Check again based on the third quarter.

          var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
          var hm;

          if (!hm1 && !hm2) {
            return null;
          } else if (!hm2) {
            hm = hm1;
          } else if (!hm1) {
            hm = hm2;
          } else {
            // Both matched.  Select the longest.
            hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
          } // A half-match was found, sort out the return data.


          var text1_a, text1_b, text2_a, text2_b;

          if (text1.length > text2.length) {
            text1_a = hm[0];
            text1_b = hm[1];
            text2_a = hm[2];
            text2_b = hm[3];
          } else {
            text2_a = hm[0];
            text2_b = hm[1];
            text1_a = hm[2];
            text1_b = hm[3];
          }

          var mid_common = hm[4];
          return [text1_a, text1_b, text2_a, text2_b, mid_common];
        }
        /**
         * Reorder and merge like edit sections.  Merge equalities.
         * Any edit section can move as long as it doesn't cross an equality.
         * @param {Array} diffs Array of diff tuples.
         */

        function diff_cleanupMerge(diffs) {
          diffs.push([DIFF_EQUAL, '']); // Add a dummy entry at the end.

          var pointer = 0;
          var count_delete = 0;
          var count_insert = 0;
          var text_delete = '';
          var text_insert = '';
          var commonlength;

          while (pointer < diffs.length) {
            switch (diffs[pointer][0]) {
              case DIFF_INSERT:
                count_insert++;
                text_insert += diffs[pointer][1];
                pointer++;
                break;

              case DIFF_DELETE:
                count_delete++;
                text_delete += diffs[pointer][1];
                pointer++;
                break;

              case DIFF_EQUAL:
                // Upon reaching an equality, check for prior redundancies.
                if (count_delete + count_insert > 1) {
                  if (count_delete !== 0 && count_insert !== 0) {
                    // Factor out any common prefixies.
                    commonlength = diff_commonPrefix(text_insert, text_delete);

                    if (commonlength !== 0) {
                      if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL) {
                        diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
                      } else {
                        diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)]);
                        pointer++;
                      }

                      text_insert = text_insert.substring(commonlength);
                      text_delete = text_delete.substring(commonlength);
                    } // Factor out any common suffixies.


                    commonlength = diff_commonSuffix(text_insert, text_delete);

                    if (commonlength !== 0) {
                      diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                      text_insert = text_insert.substring(0, text_insert.length - commonlength);
                      text_delete = text_delete.substring(0, text_delete.length - commonlength);
                    }
                  } // Delete the offending records and add the merged ones.


                  if (count_delete === 0) {
                    diffs.splice(pointer - count_insert, count_delete + count_insert, [DIFF_INSERT, text_insert]);
                  } else if (count_insert === 0) {
                    diffs.splice(pointer - count_delete, count_delete + count_insert, [DIFF_DELETE, text_delete]);
                  } else {
                    diffs.splice(pointer - count_delete - count_insert, count_delete + count_insert, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert]);
                  }

                  pointer = pointer - count_delete - count_insert + (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
                } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
                  // Merge this equality with the previous one.
                  diffs[pointer - 1][1] += diffs[pointer][1];
                  diffs.splice(pointer, 1);
                } else {
                  pointer++;
                }

                count_insert = 0;
                count_delete = 0;
                text_delete = '';
                text_insert = '';
                break;
            }
          }

          if (diffs[diffs.length - 1][1] === '') {
            diffs.pop(); // Remove the dummy entry at the end.
          } // Second pass: look for single edits surrounded on both sides by equalities
          // which can be shifted sideways to eliminate an equality.
          // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC


          var changes = false;
          pointer = 1; // Intentionally ignore the first and last element (don't need checking).

          while (pointer < diffs.length - 1) {
            if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
              // This is a single edit surrounded by equalities.
              if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
                // Shift the edit over the previous equality.
                diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
                diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
                diffs.splice(pointer - 1, 1);
                changes = true;
              } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
                // Shift the edit over the next equality.
                diffs[pointer - 1][1] += diffs[pointer + 1][1];
                diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
                diffs.splice(pointer + 1, 1);
                changes = true;
              }
            }

            pointer++;
          } // If shifts were made, the diff needs reordering and another shift sweep.


          if (changes) {
            diff_cleanupMerge(diffs);
          }
        }
        var diff = diff_main;
        diff.INSERT = DIFF_INSERT;
        diff.DELETE = DIFF_DELETE;
        diff.EQUAL = DIFF_EQUAL;
        module.exports = diff;
        /*
         * Modify a diff such that the cursor position points to the start of a change:
         * E.g.
         *   cursor_normalize_diff([[DIFF_EQUAL, 'abc']], 1)
         *     => [1, [[DIFF_EQUAL, 'a'], [DIFF_EQUAL, 'bc']]]
         *   cursor_normalize_diff([[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xyz']], 2)
         *     => [2, [[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xy'], [DIFF_DELETE, 'z']]]
         *
         * @param {Array} diffs Array of diff tuples
         * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
         * @return {Array} A tuple [cursor location in the modified diff, modified diff]
         */

        function cursor_normalize_diff(diffs, cursor_pos) {
          if (cursor_pos === 0) {
            return [DIFF_EQUAL, diffs];
          }

          for (var current_pos = 0, i = 0; i < diffs.length; i++) {
            var d = diffs[i];

            if (d[0] === DIFF_DELETE || d[0] === DIFF_EQUAL) {
              var next_pos = current_pos + d[1].length;

              if (cursor_pos === next_pos) {
                return [i + 1, diffs];
              } else if (cursor_pos < next_pos) {
                // copy to prevent side effects
                diffs = diffs.slice(); // split d into two diff changes

                var split_pos = cursor_pos - current_pos;
                var d_left = [d[0], d[1].slice(0, split_pos)];
                var d_right = [d[0], d[1].slice(split_pos)];
                diffs.splice(i, 1, d_left, d_right);
                return [i + 1, diffs];
              } else {
                current_pos = next_pos;
              }
            }
          }

          throw new Error('cursor_pos is out of bounds!');
        }
        /*
         * Modify a diff such that the edit position is "shifted" to the proposed edit location (cursor_position).
         *
         * Case 1)
         *   Check if a naive shift is possible:
         *     [0, X], [ 1, Y] -> [ 1, Y], [0, X]    (if X + Y === Y + X)
         *     [0, X], [-1, Y] -> [-1, Y], [0, X]    (if X + Y === Y + X) - holds same result
         * Case 2)
         *   Check if the following shifts are possible:
         *     [0, 'pre'], [ 1, 'prefix'] -> [ 1, 'pre'], [0, 'pre'], [ 1, 'fix']
         *     [0, 'pre'], [-1, 'prefix'] -> [-1, 'pre'], [0, 'pre'], [-1, 'fix']
         *         ^            ^
         *         d          d_next
         *
         * @param {Array} diffs Array of diff tuples
         * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
         * @return {Array} Array of diff tuples
         */


        function fix_cursor(diffs, cursor_pos) {
          var norm = cursor_normalize_diff(diffs, cursor_pos);
          var ndiffs = norm[1];
          var cursor_pointer = norm[0];
          var d = ndiffs[cursor_pointer];
          var d_next = ndiffs[cursor_pointer + 1];

          if (d == null) {
            // Text was deleted from end of original string,
            // cursor is now out of bounds in new string
            return diffs;
          } else if (d[0] !== DIFF_EQUAL) {
            // A modification happened at the cursor location.
            // This is the expected outcome, so we can return the original diff.
            return diffs;
          } else {
            if (d_next != null && d[1] + d_next[1] === d_next[1] + d[1]) {
              // Case 1)
              // It is possible to perform a naive shift
              ndiffs.splice(cursor_pointer, 2, d_next, d);
              return merge_tuples(ndiffs, cursor_pointer, 2);
            } else if (d_next != null && d_next[1].indexOf(d[1]) === 0) {
              // Case 2)
              // d[1] is a prefix of d_next[1]
              // We can assume that d_next[0] !== 0, since d[0] === 0
              // Shift edit locations..
              ndiffs.splice(cursor_pointer, 2, [d_next[0], d[1]], [0, d[1]]);
              var suffix = d_next[1].slice(d[1].length);

              if (suffix.length > 0) {
                ndiffs.splice(cursor_pointer + 2, 0, [d_next[0], suffix]);
              }

              return merge_tuples(ndiffs, cursor_pointer, 3);
            } else {
              // Not possible to perform any modification
              return diffs;
            }
          }
        }
        /*
         * Check diff did not split surrogate pairs.
         * Ex. [0, '\uD83D'], [-1, '\uDC36'], [1, '\uDC2F'] -> [-1, '\uD83D\uDC36'], [1, '\uD83D\uDC2F']
         *     '\uD83D\uDC36' === '🐶', '\uD83D\uDC2F' === '🐯'
         *
         * @param {Array} diffs Array of diff tuples
         * @return {Array} Array of diff tuples
         */


        function fix_emoji(diffs) {
          var compact = false;

          var starts_with_pair_end = function (str) {
            return str.charCodeAt(0) >= 0xDC00 && str.charCodeAt(0) <= 0xDFFF;
          };

          var ends_with_pair_start = function (str) {
            return str.charCodeAt(str.length - 1) >= 0xD800 && str.charCodeAt(str.length - 1) <= 0xDBFF;
          };

          for (var i = 2; i < diffs.length; i += 1) {
            if (diffs[i - 2][0] === DIFF_EQUAL && ends_with_pair_start(diffs[i - 2][1]) && diffs[i - 1][0] === DIFF_DELETE && starts_with_pair_end(diffs[i - 1][1]) && diffs[i][0] === DIFF_INSERT && starts_with_pair_end(diffs[i][1])) {
              compact = true;
              diffs[i - 1][1] = diffs[i - 2][1].slice(-1) + diffs[i - 1][1];
              diffs[i][1] = diffs[i - 2][1].slice(-1) + diffs[i][1];
              diffs[i - 2][1] = diffs[i - 2][1].slice(0, -1);
            }
          }

          if (!compact) {
            return diffs;
          }

          var fixed_diffs = [];

          for (var i = 0; i < diffs.length; i += 1) {
            if (diffs[i][1].length > 0) {
              fixed_diffs.push(diffs[i]);
            }
          }

          return fixed_diffs;
        }
        /*
         * Try to merge tuples with their neigbors in a given range.
         * E.g. [0, 'a'], [0, 'b'] -> [0, 'ab']
         *
         * @param {Array} diffs Array of diff tuples.
         * @param {Int} start Position of the first element to merge (diffs[start] is also merged with diffs[start - 1]).
         * @param {Int} length Number of consecutive elements to check.
         * @return {Array} Array of merged diff tuples.
         */


        function merge_tuples(diffs, start, length) {
          // Check from (start-1) to (start+length).
          for (var i = start + length - 1; i >= 0 && i >= start - 1; i--) {
            if (i + 1 < diffs.length) {
              var left_d = diffs[i];
              var right_d = diffs[i + 1];

              if (left_d[0] === right_d[1]) {
                diffs.splice(i, 2, [left_d[0], left_d[1] + right_d[1]]);
              }
            }
          }

          return diffs;
        }
        /***/

      },
      /* 52 */

      /***/
      function (module, exports) {
        exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;
        exports.shim = shim;

        function shim(obj) {
          var keys = [];

          for (var key in obj) keys.push(key);

          return keys;
        }
        /***/

      },
      /* 53 */

      /***/
      function (module, exports) {
        var supportsArgumentsClass = function () {
          return Object.prototype.toString.call(arguments);
        }() == '[object Arguments]';

        exports = module.exports = supportsArgumentsClass ? supported : unsupported;
        exports.supported = supported;

        function supported(object) {
          return Object.prototype.toString.call(object) == '[object Arguments]';
        }
        exports.unsupported = unsupported;

        function unsupported(object) {
          return object && typeof object == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
        }
        /***/
      },
      /* 54 */

      /***/
      function (module, exports) {

        var has = Object.prototype.hasOwnProperty,
            prefix = '~';
        /**
         * Constructor to create a storage for our `EE` objects.
         * An `Events` instance is a plain object whose properties are event names.
         *
         * @constructor
         * @api private
         */

        function Events() {} //
        // We try to not inherit from `Object.prototype`. In some engines creating an
        // instance in this way is faster than calling `Object.create(null)` directly.
        // If `Object.create(null)` is not supported we prefix the event names with a
        // character to make sure that the built-in object properties are not
        // overridden or used as an attack vector.
        //


        if (Object.create) {
          Events.prototype = Object.create(null); //
          // This hack is needed because the `__proto__` property is still inherited in
          // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
          //

          if (!new Events().__proto__) prefix = false;
        }
        /**
         * Representation of a single event listener.
         *
         * @param {Function} fn The listener function.
         * @param {Mixed} context The context to invoke the listener with.
         * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
         * @constructor
         * @api private
         */


        function EE(fn, context, once) {
          this.fn = fn;
          this.context = context;
          this.once = once || false;
        }
        /**
         * Minimal `EventEmitter` interface that is molded against the Node.js
         * `EventEmitter` interface.
         *
         * @constructor
         * @api public
         */


        function EventEmitter() {
          this._events = new Events();
          this._eventsCount = 0;
        }
        /**
         * Return an array listing the events for which the emitter has registered
         * listeners.
         *
         * @returns {Array}
         * @api public
         */


        EventEmitter.prototype.eventNames = function eventNames() {
          var names = [],
              events,
              name;
          if (this._eventsCount === 0) return names;

          for (name in events = this._events) {
            if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
          }

          if (Object.getOwnPropertySymbols) {
            return names.concat(Object.getOwnPropertySymbols(events));
          }

          return names;
        };
        /**
         * Return the listeners registered for a given event.
         *
         * @param {String|Symbol} event The event name.
         * @param {Boolean} exists Only check if there are listeners.
         * @returns {Array|Boolean}
         * @api public
         */


        EventEmitter.prototype.listeners = function listeners(event, exists) {
          var evt = prefix ? prefix + event : event,
              available = this._events[evt];
          if (exists) return !!available;
          if (!available) return [];
          if (available.fn) return [available.fn];

          for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
            ee[i] = available[i].fn;
          }

          return ee;
        };
        /**
         * Calls each of the listeners registered for a given event.
         *
         * @param {String|Symbol} event The event name.
         * @returns {Boolean} `true` if the event had listeners, else `false`.
         * @api public
         */


        EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
          var evt = prefix ? prefix + event : event;
          if (!this._events[evt]) return false;
          var listeners = this._events[evt],
              len = arguments.length,
              args,
              i;

          if (listeners.fn) {
            if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

            switch (len) {
              case 1:
                return listeners.fn.call(listeners.context), true;

              case 2:
                return listeners.fn.call(listeners.context, a1), true;

              case 3:
                return listeners.fn.call(listeners.context, a1, a2), true;

              case 4:
                return listeners.fn.call(listeners.context, a1, a2, a3), true;

              case 5:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;

              case 6:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
            }

            for (i = 1, args = new Array(len - 1); i < len; i++) {
              args[i - 1] = arguments[i];
            }

            listeners.fn.apply(listeners.context, args);
          } else {
            var length = listeners.length,
                j;

            for (i = 0; i < length; i++) {
              if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

              switch (len) {
                case 1:
                  listeners[i].fn.call(listeners[i].context);
                  break;

                case 2:
                  listeners[i].fn.call(listeners[i].context, a1);
                  break;

                case 3:
                  listeners[i].fn.call(listeners[i].context, a1, a2);
                  break;

                case 4:
                  listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                  break;

                default:
                  if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                    args[j - 1] = arguments[j];
                  }
                  listeners[i].fn.apply(listeners[i].context, args);
              }
            }
          }

          return true;
        };
        /**
         * Add a listener for a given event.
         *
         * @param {String|Symbol} event The event name.
         * @param {Function} fn The listener function.
         * @param {Mixed} [context=this] The context to invoke the listener with.
         * @returns {EventEmitter} `this`.
         * @api public
         */


        EventEmitter.prototype.on = function on(event, fn, context) {
          var listener = new EE(fn, context || this),
              evt = prefix ? prefix + event : event;
          if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;else if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];
          return this;
        };
        /**
         * Add a one-time listener for a given event.
         *
         * @param {String|Symbol} event The event name.
         * @param {Function} fn The listener function.
         * @param {Mixed} [context=this] The context to invoke the listener with.
         * @returns {EventEmitter} `this`.
         * @api public
         */


        EventEmitter.prototype.once = function once(event, fn, context) {
          var listener = new EE(fn, context || this, true),
              evt = prefix ? prefix + event : event;
          if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;else if (!this._events[evt].fn) this._events[evt].push(listener);else this._events[evt] = [this._events[evt], listener];
          return this;
        };
        /**
         * Remove the listeners of a given event.
         *
         * @param {String|Symbol} event The event name.
         * @param {Function} fn Only remove the listeners that match this function.
         * @param {Mixed} context Only remove the listeners that have this context.
         * @param {Boolean} once Only remove one-time listeners.
         * @returns {EventEmitter} `this`.
         * @api public
         */


        EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
          var evt = prefix ? prefix + event : event;
          if (!this._events[evt]) return this;

          if (!fn) {
            if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
            return this;
          }

          var listeners = this._events[evt];

          if (listeners.fn) {
            if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
              if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
            }
          } else {
            for (var i = 0, events = [], length = listeners.length; i < length; i++) {
              if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
                events.push(listeners[i]);
              }
            } //
            // Reset the array, or remove it completely if we have no more listeners.
            //


            if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
          }

          return this;
        };
        /**
         * Remove all listeners, or those of the specified event.
         *
         * @param {String|Symbol} [event] The event name.
         * @returns {EventEmitter} `this`.
         * @api public
         */


        EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
          var evt;

          if (event) {
            evt = prefix ? prefix + event : event;

            if (this._events[evt]) {
              if (--this._eventsCount === 0) this._events = new Events();else delete this._events[evt];
            }
          } else {
            this._events = new Events();
            this._eventsCount = 0;
          }

          return this;
        }; //
        // Alias methods names because people roll like that.
        //


        EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
        EventEmitter.prototype.addListener = EventEmitter.prototype.on; //
        // This function doesn't apply anymore.
        //

        EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
          return this;
        }; //
        // Expose the prefix.
        //


        EventEmitter.prefixed = prefix; //
        // Allow `EventEmitter` to be imported as module namespace.
        //

        EventEmitter.EventEmitter = EventEmitter; //
        // Expose the module.
        //

        if ('undefined' !== typeof module) {
          module.exports = EventEmitter;
        }
        /***/

      },
      /* 55 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.matchText = exports.matchSpacing = exports.matchNewline = exports.matchBlot = exports.matchAttributor = exports.default = undefined;

        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };

        var _slicedToArray = function () {
          function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"]) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }

            return _arr;
          }

          return function (arr, i) {
            if (Array.isArray(arr)) {
              return arr;
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i);
            } else {
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
          };
        }();

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _extend2 = __webpack_require__(3);

        var _extend3 = _interopRequireDefault(_extend2);

        var _quillDelta = __webpack_require__(2);

        var _quillDelta2 = _interopRequireDefault(_quillDelta);

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _quill = __webpack_require__(5);

        var _quill2 = _interopRequireDefault(_quill);

        var _logger = __webpack_require__(10);

        var _logger2 = _interopRequireDefault(_logger);

        var _module = __webpack_require__(9);

        var _module2 = _interopRequireDefault(_module);

        var _align = __webpack_require__(36);

        var _background = __webpack_require__(37);

        var _code = __webpack_require__(13);

        var _code2 = _interopRequireDefault(_code);

        var _color = __webpack_require__(26);

        var _direction = __webpack_require__(38);

        var _font = __webpack_require__(39);

        var _size = __webpack_require__(40);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var debug = (0, _logger2.default)('quill:clipboard');
        var DOM_KEY = '__ql-matcher';
        var CLIPBOARD_CONFIG = [[Node.TEXT_NODE, matchText], [Node.TEXT_NODE, matchNewline], ['br', matchBreak], [Node.ELEMENT_NODE, matchNewline], [Node.ELEMENT_NODE, matchBlot], [Node.ELEMENT_NODE, matchSpacing], [Node.ELEMENT_NODE, matchAttributor], [Node.ELEMENT_NODE, matchStyles], ['li', matchIndent], ['b', matchAlias.bind(matchAlias, 'bold')], ['i', matchAlias.bind(matchAlias, 'italic')], ['style', matchIgnore]];
        var ATTRIBUTE_ATTRIBUTORS = [_align.AlignAttribute, _direction.DirectionAttribute].reduce(function (memo, attr) {
          memo[attr.keyName] = attr;
          return memo;
        }, {});
        var STYLE_ATTRIBUTORS = [_align.AlignStyle, _background.BackgroundStyle, _color.ColorStyle, _direction.DirectionStyle, _font.FontStyle, _size.SizeStyle].reduce(function (memo, attr) {
          memo[attr.keyName] = attr;
          return memo;
        }, {});

        var Clipboard = function (_Module) {
          _inherits(Clipboard, _Module);

          function Clipboard(quill, options) {
            _classCallCheck(this, Clipboard);

            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this, quill, options));

            _this.quill.root.addEventListener('paste', _this.onPaste.bind(_this));

            _this.container = _this.quill.addContainer('ql-clipboard');

            _this.container.setAttribute('contenteditable', true);

            _this.container.setAttribute('tabindex', -1);

            _this.matchers = [];
            CLIPBOARD_CONFIG.concat(_this.options.matchers).forEach(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  selector = _ref2[0],
                  matcher = _ref2[1];

              if (!options.matchVisual && matcher === matchSpacing) return;

              _this.addMatcher(selector, matcher);
            });
            return _this;
          }

          _createClass(Clipboard, [{
            key: 'addMatcher',
            value: function addMatcher(selector, matcher) {
              this.matchers.push([selector, matcher]);
            }
          }, {
            key: 'convert',
            value: function convert(html) {
              if (typeof html === 'string') {
                this.container.innerHTML = html.replace(/\>\r?\n +\</g, '><'); // Remove spaces between tags

                return this.convert();
              }

              var formats = this.quill.getFormat(this.quill.selection.savedRange.index);

              if (formats[_code2.default.blotName]) {
                var text = this.container.innerText;
                this.container.innerHTML = '';
                return new _quillDelta2.default().insert(text, _defineProperty({}, _code2.default.blotName, formats[_code2.default.blotName]));
              }

              var _prepareMatching = this.prepareMatching(),
                  _prepareMatching2 = _slicedToArray(_prepareMatching, 2),
                  elementMatchers = _prepareMatching2[0],
                  textMatchers = _prepareMatching2[1];

              var delta = traverse(this.container, elementMatchers, textMatchers); // Remove trailing newline

              if (deltaEndsWith(delta, '\n') && delta.ops[delta.ops.length - 1].attributes == null) {
                delta = delta.compose(new _quillDelta2.default().retain(delta.length() - 1).delete(1));
              }

              debug.log('convert', this.container.innerHTML, delta);
              this.container.innerHTML = '';
              return delta;
            }
          }, {
            key: 'dangerouslyPasteHTML',
            value: function dangerouslyPasteHTML(index, html) {
              var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _quill2.default.sources.API;

              if (typeof index === 'string') {
                this.quill.setContents(this.convert(index), html);
                this.quill.setSelection(0, _quill2.default.sources.SILENT);
              } else {
                var paste = this.convert(html);
                this.quill.updateContents(new _quillDelta2.default().retain(index).concat(paste), source);
                this.quill.setSelection(index + paste.length(), _quill2.default.sources.SILENT);
              }
            }
          }, {
            key: 'onPaste',
            value: function onPaste(e) {
              var _this2 = this;

              if (e.defaultPrevented || !this.quill.isEnabled()) return;
              var range = this.quill.getSelection();
              var delta = new _quillDelta2.default().retain(range.index);
              var scrollTop = this.quill.scrollingContainer.scrollTop;
              this.container.focus();
              this.quill.selection.update(_quill2.default.sources.SILENT);
              setTimeout(function () {
                delta = delta.concat(_this2.convert()).delete(range.length);

                _this2.quill.updateContents(delta, _quill2.default.sources.USER); // range.length contributes to delta.length()


                _this2.quill.setSelection(delta.length() - range.length, _quill2.default.sources.SILENT);

                _this2.quill.scrollingContainer.scrollTop = scrollTop;

                _this2.quill.focus();
              }, 1);
            }
          }, {
            key: 'prepareMatching',
            value: function prepareMatching() {
              var _this3 = this;

              var elementMatchers = [],
                  textMatchers = [];
              this.matchers.forEach(function (pair) {
                var _pair = _slicedToArray(pair, 2),
                    selector = _pair[0],
                    matcher = _pair[1];

                switch (selector) {
                  case Node.TEXT_NODE:
                    textMatchers.push(matcher);
                    break;

                  case Node.ELEMENT_NODE:
                    elementMatchers.push(matcher);
                    break;

                  default:
                    [].forEach.call(_this3.container.querySelectorAll(selector), function (node) {
                      // TODO use weakmap
                      node[DOM_KEY] = node[DOM_KEY] || [];
                      node[DOM_KEY].push(matcher);
                    });
                    break;
                }
              });
              return [elementMatchers, textMatchers];
            }
          }]);

          return Clipboard;
        }(_module2.default);

        Clipboard.DEFAULTS = {
          matchers: [],
          matchVisual: true
        };

        function applyFormat(delta, format, value) {
          if ((typeof format === 'undefined' ? 'undefined' : _typeof(format)) === 'object') {
            return Object.keys(format).reduce(function (delta, key) {
              return applyFormat(delta, key, format[key]);
            }, delta);
          } else {
            return delta.reduce(function (delta, op) {
              if (op.attributes && op.attributes[format]) {
                return delta.push(op);
              } else {
                return delta.insert(op.insert, (0, _extend3.default)({}, _defineProperty({}, format, value), op.attributes));
              }
            }, new _quillDelta2.default());
          }
        }

        function computeStyle(node) {
          if (node.nodeType !== Node.ELEMENT_NODE) return {};
          var DOM_KEY = '__ql-computed-style';
          return node[DOM_KEY] || (node[DOM_KEY] = window.getComputedStyle(node));
        }

        function deltaEndsWith(delta, text) {
          var endText = "";

          for (var i = delta.ops.length - 1; i >= 0 && endText.length < text.length; --i) {
            var op = delta.ops[i];
            if (typeof op.insert !== 'string') break;
            endText = op.insert + endText;
          }

          return endText.slice(-1 * text.length) === text;
        }

        function isLine(node) {
          if (node.childNodes.length === 0) return false; // Exclude embed blocks

          var style = computeStyle(node);
          return ['block', 'list-item'].indexOf(style.display) > -1;
        }

        function traverse(node, elementMatchers, textMatchers) {
          // Post-order
          if (node.nodeType === node.TEXT_NODE) {
            return textMatchers.reduce(function (delta, matcher) {
              return matcher(node, delta);
            }, new _quillDelta2.default());
          } else if (node.nodeType === node.ELEMENT_NODE) {
            return [].reduce.call(node.childNodes || [], function (delta, childNode) {
              var childrenDelta = traverse(childNode, elementMatchers, textMatchers);

              if (childNode.nodeType === node.ELEMENT_NODE) {
                childrenDelta = elementMatchers.reduce(function (childrenDelta, matcher) {
                  return matcher(childNode, childrenDelta);
                }, childrenDelta);
                childrenDelta = (childNode[DOM_KEY] || []).reduce(function (childrenDelta, matcher) {
                  return matcher(childNode, childrenDelta);
                }, childrenDelta);
              }

              return delta.concat(childrenDelta);
            }, new _quillDelta2.default());
          } else {
            return new _quillDelta2.default();
          }
        }

        function matchAlias(format, node, delta) {
          return applyFormat(delta, format, true);
        }

        function matchAttributor(node, delta) {
          var attributes = _parchment2.default.Attributor.Attribute.keys(node);

          var classes = _parchment2.default.Attributor.Class.keys(node);

          var styles = _parchment2.default.Attributor.Style.keys(node);

          var formats = {};
          attributes.concat(classes).concat(styles).forEach(function (name) {
            var attr = _parchment2.default.query(name, _parchment2.default.Scope.ATTRIBUTE);

            if (attr != null) {
              formats[attr.attrName] = attr.value(node);
              if (formats[attr.attrName]) return;
            }

            attr = ATTRIBUTE_ATTRIBUTORS[name];

            if (attr != null && (attr.attrName === name || attr.keyName === name)) {
              formats[attr.attrName] = attr.value(node) || undefined;
            }

            attr = STYLE_ATTRIBUTORS[name];

            if (attr != null && (attr.attrName === name || attr.keyName === name)) {
              attr = STYLE_ATTRIBUTORS[name];
              formats[attr.attrName] = attr.value(node) || undefined;
            }
          });

          if (Object.keys(formats).length > 0) {
            delta = applyFormat(delta, formats);
          }

          return delta;
        }

        function matchBlot(node, delta) {
          var match = _parchment2.default.query(node);

          if (match == null) return delta;

          if (match.prototype instanceof _parchment2.default.Embed) {
            var embed = {};
            var value = match.value(node);

            if (value != null) {
              embed[match.blotName] = value;
              delta = new _quillDelta2.default().insert(embed, match.formats(node));
            }
          } else if (typeof match.formats === 'function') {
            delta = applyFormat(delta, match.blotName, match.formats(node));
          }

          return delta;
        }

        function matchBreak(node, delta) {
          if (!deltaEndsWith(delta, '\n')) {
            delta.insert('\n');
          }

          return delta;
        }

        function matchIgnore() {
          return new _quillDelta2.default();
        }

        function matchIndent(node, delta) {
          var match = _parchment2.default.query(node);

          if (match == null || match.blotName !== 'list-item' || !deltaEndsWith(delta, '\n')) {
            return delta;
          }

          var indent = -1,
              parent = node.parentNode;

          while (!parent.classList.contains('ql-clipboard')) {
            if ((_parchment2.default.query(parent) || {}).blotName === 'list') {
              indent += 1;
            }

            parent = parent.parentNode;
          }

          if (indent <= 0) return delta;
          return delta.compose(new _quillDelta2.default().retain(delta.length() - 1).retain(1, {
            indent: indent
          }));
        }

        function matchNewline(node, delta) {
          if (!deltaEndsWith(delta, '\n')) {
            if (isLine(node) || delta.length() > 0 && node.nextSibling && isLine(node.nextSibling)) {
              delta.insert('\n');
            }
          }

          return delta;
        }

        function matchSpacing(node, delta) {
          if (isLine(node) && node.nextElementSibling != null && !deltaEndsWith(delta, '\n\n')) {
            var nodeHeight = node.offsetHeight + parseFloat(computeStyle(node).marginTop) + parseFloat(computeStyle(node).marginBottom);

            if (node.nextElementSibling.offsetTop > node.offsetTop + nodeHeight * 1.5) {
              delta.insert('\n');
            }
          }

          return delta;
        }

        function matchStyles(node, delta) {
          var formats = {};
          var style = node.style || {};

          if (style.fontStyle && computeStyle(node).fontStyle === 'italic') {
            formats.italic = true;
          }

          if (style.fontWeight && (computeStyle(node).fontWeight.startsWith('bold') || parseInt(computeStyle(node).fontWeight) >= 700)) {
            formats.bold = true;
          }

          if (Object.keys(formats).length > 0) {
            delta = applyFormat(delta, formats);
          }

          if (parseFloat(style.textIndent || 0) > 0) {
            // Could be 0.5in
            delta = new _quillDelta2.default().insert('\t').concat(delta);
          }

          return delta;
        }

        function matchText(node, delta) {
          var text = node.data; // Word represents empty line with <o:p>&nbsp;</o:p>

          if (node.parentNode.tagName === 'O:P') {
            return delta.insert(text.trim());
          }

          if (text.trim().length === 0 && node.parentNode.classList.contains('ql-clipboard')) {
            return delta;
          }

          if (!computeStyle(node.parentNode).whiteSpace.startsWith('pre')) {
            // eslint-disable-next-line func-style
            var replacer = function replacer(collapse, match) {
              match = match.replace(/[^\u00a0]/g, ''); // \u00a0 is nbsp;

              return match.length < 1 && collapse ? ' ' : match;
            };

            text = text.replace(/\r\n/g, ' ').replace(/\n/g, ' ');
            text = text.replace(/\s\s+/g, replacer.bind(replacer, true)); // collapse whitespace

            if (node.previousSibling == null && isLine(node.parentNode) || node.previousSibling != null && isLine(node.previousSibling)) {
              text = text.replace(/^\s+/, replacer.bind(replacer, false));
            }

            if (node.nextSibling == null && isLine(node.parentNode) || node.nextSibling != null && isLine(node.nextSibling)) {
              text = text.replace(/\s+$/, replacer.bind(replacer, false));
            }
          }

          return delta.insert(text);
        }

        exports.default = Clipboard;
        exports.matchAttributor = matchAttributor;
        exports.matchBlot = matchBlot;
        exports.matchNewline = matchNewline;
        exports.matchSpacing = matchSpacing;
        exports.matchText = matchText;
        /***/
      },
      /* 56 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _inline = __webpack_require__(6);

        var _inline2 = _interopRequireDefault(_inline);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Bold = function (_Inline) {
          _inherits(Bold, _Inline);

          function Bold() {
            _classCallCheck(this, Bold);

            return _possibleConstructorReturn(this, (Bold.__proto__ || Object.getPrototypeOf(Bold)).apply(this, arguments));
          }

          _createClass(Bold, [{
            key: 'optimize',
            value: function optimize(context) {
              _get(Bold.prototype.__proto__ || Object.getPrototypeOf(Bold.prototype), 'optimize', this).call(this, context);

              if (this.domNode.tagName !== this.statics.tagName[0]) {
                this.replaceWith(this.statics.blotName);
              }
            }
          }], [{
            key: 'create',
            value: function create() {
              return _get(Bold.__proto__ || Object.getPrototypeOf(Bold), 'create', this).call(this);
            }
          }, {
            key: 'formats',
            value: function formats() {
              return true;
            }
          }]);

          return Bold;
        }(_inline2.default);

        Bold.blotName = 'bold';
        Bold.tagName = ['STRONG', 'B'];
        exports.default = Bold;
        /***/
      },
      /* 57 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.addControls = exports.default = undefined;

        var _slicedToArray = function () {
          function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"]) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }

            return _arr;
          }

          return function (arr, i) {
            if (Array.isArray(arr)) {
              return arr;
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i);
            } else {
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
          };
        }();

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _quillDelta = __webpack_require__(2);

        var _quillDelta2 = _interopRequireDefault(_quillDelta);

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _quill = __webpack_require__(5);

        var _quill2 = _interopRequireDefault(_quill);

        var _logger = __webpack_require__(10);

        var _logger2 = _interopRequireDefault(_logger);

        var _module = __webpack_require__(9);

        var _module2 = _interopRequireDefault(_module);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var debug = (0, _logger2.default)('quill:toolbar');

        var Toolbar = function (_Module) {
          _inherits(Toolbar, _Module);

          function Toolbar(quill, options) {
            _classCallCheck(this, Toolbar);

            var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, quill, options));

            if (Array.isArray(_this.options.container)) {
              var container = document.createElement('div');
              addControls(container, _this.options.container);
              quill.container.parentNode.insertBefore(container, quill.container);
              _this.container = container;
            } else if (typeof _this.options.container === 'string') {
              _this.container = document.querySelector(_this.options.container);
            } else {
              _this.container = _this.options.container;
            }

            if (!(_this.container instanceof HTMLElement)) {
              var _ret;

              return _ret = debug.error('Container required for toolbar', _this.options), _possibleConstructorReturn(_this, _ret);
            }

            _this.container.classList.add('ql-toolbar');

            _this.controls = [];
            _this.handlers = {};
            Object.keys(_this.options.handlers).forEach(function (format) {
              _this.addHandler(format, _this.options.handlers[format]);
            });
            [].forEach.call(_this.container.querySelectorAll('button, select'), function (input) {
              _this.attach(input);
            });

            _this.quill.on(_quill2.default.events.EDITOR_CHANGE, function (type, range) {
              if (type === _quill2.default.events.SELECTION_CHANGE) {
                _this.update(range);
              }
            });

            _this.quill.on(_quill2.default.events.SCROLL_OPTIMIZE, function () {
              var _this$quill$selection = _this.quill.selection.getRange(),
                  _this$quill$selection2 = _slicedToArray(_this$quill$selection, 1),
                  range = _this$quill$selection2[0]; // quill.getSelection triggers update


              _this.update(range);
            });

            return _this;
          }

          _createClass(Toolbar, [{
            key: 'addHandler',
            value: function addHandler(format, handler) {
              this.handlers[format] = handler;
            }
          }, {
            key: 'attach',
            value: function attach(input) {
              var _this2 = this;

              var format = [].find.call(input.classList, function (className) {
                return className.indexOf('ql-') === 0;
              });
              if (!format) return;
              format = format.slice('ql-'.length);

              if (input.tagName === 'BUTTON') {
                input.setAttribute('type', 'button');
              }

              if (this.handlers[format] == null) {
                if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[format] == null) {
                  debug.warn('ignoring attaching to disabled format', format, input);
                  return;
                }

                if (_parchment2.default.query(format) == null) {
                  debug.warn('ignoring attaching to nonexistent format', format, input);
                  return;
                }
              }

              var eventName = input.tagName === 'SELECT' ? 'change' : 'click';
              input.addEventListener(eventName, function (e) {
                var value = void 0;

                if (input.tagName === 'SELECT') {
                  if (input.selectedIndex < 0) return;
                  var selected = input.options[input.selectedIndex];

                  if (selected.hasAttribute('selected')) {
                    value = false;
                  } else {
                    value = selected.value || false;
                  }
                } else {
                  if (input.classList.contains('ql-active')) {
                    value = false;
                  } else {
                    value = input.value || !input.hasAttribute('value');
                  }

                  e.preventDefault();
                }

                _this2.quill.focus();

                var _quill$selection$getR = _this2.quill.selection.getRange(),
                    _quill$selection$getR2 = _slicedToArray(_quill$selection$getR, 1),
                    range = _quill$selection$getR2[0];

                if (_this2.handlers[format] != null) {
                  _this2.handlers[format].call(_this2, value);
                } else if (_parchment2.default.query(format).prototype instanceof _parchment2.default.Embed) {
                  value = prompt('Enter ' + format);
                  if (!value) return;

                  _this2.quill.updateContents(new _quillDelta2.default().retain(range.index).delete(range.length).insert(_defineProperty({}, format, value)), _quill2.default.sources.USER);
                } else {
                  _this2.quill.format(format, value, _quill2.default.sources.USER);
                }

                _this2.update(range);
              }); // TODO use weakmap

              this.controls.push([format, input]);
            }
          }, {
            key: 'update',
            value: function update(range) {
              var formats = range == null ? {} : this.quill.getFormat(range);
              this.controls.forEach(function (pair) {
                var _pair = _slicedToArray(pair, 2),
                    format = _pair[0],
                    input = _pair[1];

                if (input.tagName === 'SELECT') {
                  var option = void 0;

                  if (range == null) {
                    option = null;
                  } else if (formats[format] == null) {
                    option = input.querySelector('option[selected]');
                  } else if (!Array.isArray(formats[format])) {
                    var value = formats[format];

                    if (typeof value === 'string') {
                      value = value.replace(/\"/g, '\\"');
                    }

                    option = input.querySelector('option[value="' + value + '"]');
                  }

                  if (option == null) {
                    input.value = ''; // TODO make configurable?

                    input.selectedIndex = -1;
                  } else {
                    option.selected = true;
                  }
                } else {
                  if (range == null) {
                    input.classList.remove('ql-active');
                  } else if (input.hasAttribute('value')) {
                    // both being null should match (default values)
                    // '1' should match with 1 (headers)
                    var isActive = formats[format] === input.getAttribute('value') || formats[format] != null && formats[format].toString() === input.getAttribute('value') || formats[format] == null && !input.getAttribute('value');
                    input.classList.toggle('ql-active', isActive);
                  } else {
                    input.classList.toggle('ql-active', formats[format] != null);
                  }
                }
              });
            }
          }]);

          return Toolbar;
        }(_module2.default);

        Toolbar.DEFAULTS = {};

        function addButton(container, format, value) {
          var input = document.createElement('button');
          input.setAttribute('type', 'button');
          input.classList.add('ql-' + format);

          if (value != null) {
            input.value = value;
          }

          container.appendChild(input);
        }

        function addControls(container, groups) {
          if (!Array.isArray(groups[0])) {
            groups = [groups];
          }

          groups.forEach(function (controls) {
            var group = document.createElement('span');
            group.classList.add('ql-formats');
            controls.forEach(function (control) {
              if (typeof control === 'string') {
                addButton(group, control);
              } else {
                var format = Object.keys(control)[0];
                var value = control[format];

                if (Array.isArray(value)) {
                  addSelect(group, format, value);
                } else {
                  addButton(group, format, value);
                }
              }
            });
            container.appendChild(group);
          });
        }

        function addSelect(container, format, values) {
          var input = document.createElement('select');
          input.classList.add('ql-' + format);
          values.forEach(function (value) {
            var option = document.createElement('option');

            if (value !== false) {
              option.setAttribute('value', value);
            } else {
              option.setAttribute('selected', 'selected');
            }

            input.appendChild(option);
          });
          container.appendChild(input);
        }

        Toolbar.DEFAULTS = {
          container: null,
          handlers: {
            clean: function clean() {
              var _this3 = this;

              var range = this.quill.getSelection();
              if (range == null) return;

              if (range.length == 0) {
                var formats = this.quill.getFormat();
                Object.keys(formats).forEach(function (name) {
                  // Clean functionality in existing apps only clean inline formats
                  if (_parchment2.default.query(name, _parchment2.default.Scope.INLINE) != null) {
                    _this3.quill.format(name, false);
                  }
                });
              } else {
                this.quill.removeFormat(range, _quill2.default.sources.USER);
              }
            },
            direction: function direction(value) {
              var align = this.quill.getFormat()['align'];

              if (value === 'rtl' && align == null) {
                this.quill.format('align', 'right', _quill2.default.sources.USER);
              } else if (!value && align === 'right') {
                this.quill.format('align', false, _quill2.default.sources.USER);
              }

              this.quill.format('direction', value, _quill2.default.sources.USER);
            },
            indent: function indent(value) {
              var range = this.quill.getSelection();
              var formats = this.quill.getFormat(range);
              var indent = parseInt(formats.indent || 0);

              if (value === '+1' || value === '-1') {
                var modifier = value === '+1' ? 1 : -1;
                if (formats.direction === 'rtl') modifier *= -1;
                this.quill.format('indent', indent + modifier, _quill2.default.sources.USER);
              }
            },
            link: function link(value) {
              if (value === true) {
                value = prompt('Enter link URL:');
              }

              this.quill.format('link', value, _quill2.default.sources.USER);
            },
            list: function list(value) {
              var range = this.quill.getSelection();
              var formats = this.quill.getFormat(range);

              if (value === 'check') {
                if (formats['list'] === 'checked' || formats['list'] === 'unchecked') {
                  this.quill.format('list', false, _quill2.default.sources.USER);
                } else {
                  this.quill.format('list', 'unchecked', _quill2.default.sources.USER);
                }
              } else {
                this.quill.format('list', value, _quill2.default.sources.USER);
              }
            }
          }
        };
        exports.default = Toolbar;
        exports.addControls = addControls;
        /***/
      },
      /* 58 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <polyline class=\"ql-even ql-stroke\" points=\"5 7 3 9 5 11\"></polyline> <polyline class=\"ql-even ql-stroke\" points=\"13 7 15 9 13 11\"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>";
        /***/
      },
      /* 59 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _picker = __webpack_require__(28);

        var _picker2 = _interopRequireDefault(_picker);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var ColorPicker = function (_Picker) {
          _inherits(ColorPicker, _Picker);

          function ColorPicker(select, label) {
            _classCallCheck(this, ColorPicker);

            var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, select));

            _this.label.innerHTML = label;

            _this.container.classList.add('ql-color-picker');

            [].slice.call(_this.container.querySelectorAll('.ql-picker-item'), 0, 7).forEach(function (item) {
              item.classList.add('ql-primary');
            });
            return _this;
          }

          _createClass(ColorPicker, [{
            key: 'buildItem',
            value: function buildItem(option) {
              var item = _get(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'buildItem', this).call(this, option);

              item.style.backgroundColor = option.getAttribute('value') || '';
              return item;
            }
          }, {
            key: 'selectItem',
            value: function selectItem(item, trigger) {
              _get(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'selectItem', this).call(this, item, trigger);

              var colorLabel = this.label.querySelector('.ql-color-label');
              var value = item ? item.getAttribute('data-value') || '' : '';

              if (colorLabel) {
                if (colorLabel.tagName === 'line') {
                  colorLabel.style.stroke = value;
                } else {
                  colorLabel.style.fill = value;
                }
              }
            }
          }]);

          return ColorPicker;
        }(_picker2.default);

        exports.default = ColorPicker;
        /***/
      },
      /* 60 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _picker = __webpack_require__(28);

        var _picker2 = _interopRequireDefault(_picker);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var IconPicker = function (_Picker) {
          _inherits(IconPicker, _Picker);

          function IconPicker(select, icons) {
            _classCallCheck(this, IconPicker);

            var _this = _possibleConstructorReturn(this, (IconPicker.__proto__ || Object.getPrototypeOf(IconPicker)).call(this, select));

            _this.container.classList.add('ql-icon-picker');

            [].forEach.call(_this.container.querySelectorAll('.ql-picker-item'), function (item) {
              item.innerHTML = icons[item.getAttribute('data-value') || ''];
            });
            _this.defaultItem = _this.container.querySelector('.ql-selected');

            _this.selectItem(_this.defaultItem);

            return _this;
          }

          _createClass(IconPicker, [{
            key: 'selectItem',
            value: function selectItem(item, trigger) {
              _get(IconPicker.prototype.__proto__ || Object.getPrototypeOf(IconPicker.prototype), 'selectItem', this).call(this, item, trigger);

              item = item || this.defaultItem;
              this.label.innerHTML = item.innerHTML;
            }
          }]);

          return IconPicker;
        }(_picker2.default);

        exports.default = IconPicker;
        /***/
      },
      /* 61 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var Tooltip = function () {
          function Tooltip(quill, boundsContainer) {
            var _this = this;

            _classCallCheck(this, Tooltip);

            this.quill = quill;
            this.boundsContainer = boundsContainer || document.body;
            this.root = quill.addContainer('ql-tooltip');
            this.root.innerHTML = this.constructor.TEMPLATE;

            if (this.quill.root === this.quill.scrollingContainer) {
              this.quill.root.addEventListener('scroll', function () {
                _this.root.style.marginTop = -1 * _this.quill.root.scrollTop + 'px';
              });
            }

            this.hide();
          }

          _createClass(Tooltip, [{
            key: 'hide',
            value: function hide() {
              this.root.classList.add('ql-hidden');
            }
          }, {
            key: 'position',
            value: function position(reference) {
              var left = reference.left + reference.width / 2 - this.root.offsetWidth / 2; // root.scrollTop should be 0 if scrollContainer !== root

              var top = reference.bottom + this.quill.root.scrollTop;
              this.root.style.left = left + 'px';
              this.root.style.top = top + 'px';
              this.root.classList.remove('ql-flip');
              var containerBounds = this.boundsContainer.getBoundingClientRect();
              var rootBounds = this.root.getBoundingClientRect();
              var shift = 0;

              if (rootBounds.right > containerBounds.right) {
                shift = containerBounds.right - rootBounds.right;
                this.root.style.left = left + shift + 'px';
              }

              if (rootBounds.left < containerBounds.left) {
                shift = containerBounds.left - rootBounds.left;
                this.root.style.left = left + shift + 'px';
              }

              if (rootBounds.bottom > containerBounds.bottom) {
                var height = rootBounds.bottom - rootBounds.top;
                var verticalShift = reference.bottom - reference.top + height;
                this.root.style.top = top - verticalShift + 'px';
                this.root.classList.add('ql-flip');
              }

              return shift;
            }
          }, {
            key: 'show',
            value: function show() {
              this.root.classList.remove('ql-editing');
              this.root.classList.remove('ql-hidden');
            }
          }]);

          return Tooltip;
        }();

        exports.default = Tooltip;
        /***/
      },
      /* 62 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _slicedToArray = function () {
          function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"]) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }

            return _arr;
          }

          return function (arr, i) {
            if (Array.isArray(arr)) {
              return arr;
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i);
            } else {
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _extend = __webpack_require__(3);

        var _extend2 = _interopRequireDefault(_extend);

        var _emitter = __webpack_require__(8);

        var _emitter2 = _interopRequireDefault(_emitter);

        var _base = __webpack_require__(43);

        var _base2 = _interopRequireDefault(_base);

        var _link = __webpack_require__(27);

        var _link2 = _interopRequireDefault(_link);

        var _selection = __webpack_require__(15);

        var _icons = __webpack_require__(41);

        var _icons2 = _interopRequireDefault(_icons);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var TOOLBAR_CONFIG = [[{
          header: ['1', '2', '3', false]
        }], ['bold', 'italic', 'underline', 'link'], [{
          list: 'ordered'
        }, {
          list: 'bullet'
        }], ['clean']];

        var SnowTheme = function (_BaseTheme) {
          _inherits(SnowTheme, _BaseTheme);

          function SnowTheme(quill, options) {
            _classCallCheck(this, SnowTheme);

            if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
              options.modules.toolbar.container = TOOLBAR_CONFIG;
            }

            var _this = _possibleConstructorReturn(this, (SnowTheme.__proto__ || Object.getPrototypeOf(SnowTheme)).call(this, quill, options));

            _this.quill.container.classList.add('ql-snow');

            return _this;
          }

          _createClass(SnowTheme, [{
            key: 'extendToolbar',
            value: function extendToolbar(toolbar) {
              toolbar.container.classList.add('ql-snow');
              this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), _icons2.default);
              this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), _icons2.default);
              this.tooltip = new SnowTooltip(this.quill, this.options.bounds);

              if (toolbar.container.querySelector('.ql-link')) {
                this.quill.keyboard.addBinding({
                  key: 'K',
                  shortKey: true
                }, function (range, context) {
                  toolbar.handlers['link'].call(toolbar, !context.format.link);
                });
              }
            }
          }]);

          return SnowTheme;
        }(_base2.default);

        SnowTheme.DEFAULTS = (0, _extend2.default)(true, {}, _base2.default.DEFAULTS, {
          modules: {
            toolbar: {
              handlers: {
                link: function link(value) {
                  if (value) {
                    var range = this.quill.getSelection();
                    if (range == null || range.length == 0) return;
                    var preview = this.quill.getText(range);

                    if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
                      preview = 'mailto:' + preview;
                    }

                    var tooltip = this.quill.theme.tooltip;
                    tooltip.edit('link', preview);
                  } else {
                    this.quill.format('link', false);
                  }
                }
              }
            }
          }
        });

        var SnowTooltip = function (_BaseTooltip) {
          _inherits(SnowTooltip, _BaseTooltip);

          function SnowTooltip(quill, bounds) {
            _classCallCheck(this, SnowTooltip);

            var _this2 = _possibleConstructorReturn(this, (SnowTooltip.__proto__ || Object.getPrototypeOf(SnowTooltip)).call(this, quill, bounds));

            _this2.preview = _this2.root.querySelector('a.ql-preview');
            return _this2;
          }

          _createClass(SnowTooltip, [{
            key: 'listen',
            value: function listen() {
              var _this3 = this;

              _get(SnowTooltip.prototype.__proto__ || Object.getPrototypeOf(SnowTooltip.prototype), 'listen', this).call(this);

              this.root.querySelector('a.ql-action').addEventListener('click', function (event) {
                if (_this3.root.classList.contains('ql-editing')) {
                  _this3.save();
                } else {
                  _this3.edit('link', _this3.preview.textContent);
                }

                event.preventDefault();
              });
              this.root.querySelector('a.ql-remove').addEventListener('click', function (event) {
                if (_this3.linkRange != null) {
                  var range = _this3.linkRange;

                  _this3.restoreFocus();

                  _this3.quill.formatText(range, 'link', false, _emitter2.default.sources.USER);

                  delete _this3.linkRange;
                }

                event.preventDefault();

                _this3.hide();
              });
              this.quill.on(_emitter2.default.events.SELECTION_CHANGE, function (range, oldRange, source) {
                if (range == null) return;

                if (range.length === 0 && source === _emitter2.default.sources.USER) {
                  var _quill$scroll$descend = _this3.quill.scroll.descendant(_link2.default, range.index),
                      _quill$scroll$descend2 = _slicedToArray(_quill$scroll$descend, 2),
                      link = _quill$scroll$descend2[0],
                      offset = _quill$scroll$descend2[1];

                  if (link != null) {
                    _this3.linkRange = new _selection.Range(range.index - offset, link.length());

                    var preview = _link2.default.formats(link.domNode);

                    _this3.preview.textContent = preview;

                    _this3.preview.setAttribute('href', preview);

                    _this3.show();

                    _this3.position(_this3.quill.getBounds(_this3.linkRange));

                    return;
                  }
                } else {
                  delete _this3.linkRange;
                }

                _this3.hide();
              });
            }
          }, {
            key: 'show',
            value: function show() {
              _get(SnowTooltip.prototype.__proto__ || Object.getPrototypeOf(SnowTooltip.prototype), 'show', this).call(this);

              this.root.removeAttribute('data-mode');
            }
          }]);

          return SnowTooltip;
        }(_base.BaseTooltip);

        SnowTooltip.TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join('');
        exports.default = SnowTheme;
        /***/
      },
      /* 63 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _core = __webpack_require__(29);

        var _core2 = _interopRequireDefault(_core);

        var _align = __webpack_require__(36);

        var _direction = __webpack_require__(38);

        var _indent = __webpack_require__(64);

        var _blockquote = __webpack_require__(65);

        var _blockquote2 = _interopRequireDefault(_blockquote);

        var _header = __webpack_require__(66);

        var _header2 = _interopRequireDefault(_header);

        var _list = __webpack_require__(67);

        var _list2 = _interopRequireDefault(_list);

        var _background = __webpack_require__(37);

        var _color = __webpack_require__(26);

        var _font = __webpack_require__(39);

        var _size = __webpack_require__(40);

        var _bold = __webpack_require__(56);

        var _bold2 = _interopRequireDefault(_bold);

        var _italic = __webpack_require__(68);

        var _italic2 = _interopRequireDefault(_italic);

        var _link = __webpack_require__(27);

        var _link2 = _interopRequireDefault(_link);

        var _script = __webpack_require__(69);

        var _script2 = _interopRequireDefault(_script);

        var _strike = __webpack_require__(70);

        var _strike2 = _interopRequireDefault(_strike);

        var _underline = __webpack_require__(71);

        var _underline2 = _interopRequireDefault(_underline);

        var _image = __webpack_require__(72);

        var _image2 = _interopRequireDefault(_image);

        var _video = __webpack_require__(73);

        var _video2 = _interopRequireDefault(_video);

        var _code = __webpack_require__(13);

        var _code2 = _interopRequireDefault(_code);

        var _formula = __webpack_require__(74);

        var _formula2 = _interopRequireDefault(_formula);

        var _syntax = __webpack_require__(75);

        var _syntax2 = _interopRequireDefault(_syntax);

        var _toolbar = __webpack_require__(57);

        var _toolbar2 = _interopRequireDefault(_toolbar);

        var _icons = __webpack_require__(41);

        var _icons2 = _interopRequireDefault(_icons);

        var _picker = __webpack_require__(28);

        var _picker2 = _interopRequireDefault(_picker);

        var _colorPicker = __webpack_require__(59);

        var _colorPicker2 = _interopRequireDefault(_colorPicker);

        var _iconPicker = __webpack_require__(60);

        var _iconPicker2 = _interopRequireDefault(_iconPicker);

        var _tooltip = __webpack_require__(61);

        var _tooltip2 = _interopRequireDefault(_tooltip);

        var _bubble = __webpack_require__(108);

        var _bubble2 = _interopRequireDefault(_bubble);

        var _snow = __webpack_require__(62);

        var _snow2 = _interopRequireDefault(_snow);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        _core2.default.register({
          'attributors/attribute/direction': _direction.DirectionAttribute,
          'attributors/class/align': _align.AlignClass,
          'attributors/class/background': _background.BackgroundClass,
          'attributors/class/color': _color.ColorClass,
          'attributors/class/direction': _direction.DirectionClass,
          'attributors/class/font': _font.FontClass,
          'attributors/class/size': _size.SizeClass,
          'attributors/style/align': _align.AlignStyle,
          'attributors/style/background': _background.BackgroundStyle,
          'attributors/style/color': _color.ColorStyle,
          'attributors/style/direction': _direction.DirectionStyle,
          'attributors/style/font': _font.FontStyle,
          'attributors/style/size': _size.SizeStyle
        }, true);

        _core2.default.register({
          'formats/align': _align.AlignClass,
          'formats/direction': _direction.DirectionClass,
          'formats/indent': _indent.IndentClass,
          'formats/background': _background.BackgroundStyle,
          'formats/color': _color.ColorStyle,
          'formats/font': _font.FontClass,
          'formats/size': _size.SizeClass,
          'formats/blockquote': _blockquote2.default,
          'formats/code-block': _code2.default,
          'formats/header': _header2.default,
          'formats/list': _list2.default,
          'formats/bold': _bold2.default,
          'formats/code': _code.Code,
          'formats/italic': _italic2.default,
          'formats/link': _link2.default,
          'formats/script': _script2.default,
          'formats/strike': _strike2.default,
          'formats/underline': _underline2.default,
          'formats/image': _image2.default,
          'formats/video': _video2.default,
          'formats/list/item': _list.ListItem,
          'modules/formula': _formula2.default,
          'modules/syntax': _syntax2.default,
          'modules/toolbar': _toolbar2.default,
          'themes/bubble': _bubble2.default,
          'themes/snow': _snow2.default,
          'ui/icons': _icons2.default,
          'ui/picker': _picker2.default,
          'ui/icon-picker': _iconPicker2.default,
          'ui/color-picker': _colorPicker2.default,
          'ui/tooltip': _tooltip2.default
        }, true);

        exports.default = _core2.default;
        /***/
      },
      /* 64 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.IndentClass = undefined;

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var IdentAttributor = function (_Parchment$Attributor) {
          _inherits(IdentAttributor, _Parchment$Attributor);

          function IdentAttributor() {
            _classCallCheck(this, IdentAttributor);

            return _possibleConstructorReturn(this, (IdentAttributor.__proto__ || Object.getPrototypeOf(IdentAttributor)).apply(this, arguments));
          }

          _createClass(IdentAttributor, [{
            key: 'add',
            value: function add(node, value) {
              if (value === '+1' || value === '-1') {
                var indent = this.value(node) || 0;
                value = value === '+1' ? indent + 1 : indent - 1;
              }

              if (value === 0) {
                this.remove(node);
                return true;
              } else {
                return _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'add', this).call(this, node, value);
              }
            }
          }, {
            key: 'canAdd',
            value: function canAdd(node, value) {
              return _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'canAdd', this).call(this, node, value) || _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'canAdd', this).call(this, node, parseInt(value));
            }
          }, {
            key: 'value',
            value: function value(node) {
              return parseInt(_get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'value', this).call(this, node)) || undefined; // Don't return NaN
            }
          }]);

          return IdentAttributor;
        }(_parchment2.default.Attributor.Class);

        var IndentClass = new IdentAttributor('indent', 'ql-indent', {
          scope: _parchment2.default.Scope.BLOCK,
          whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
        });
        exports.IndentClass = IndentClass;
        /***/
      },
      /* 65 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _block = __webpack_require__(4);

        var _block2 = _interopRequireDefault(_block);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Blockquote = function (_Block) {
          _inherits(Blockquote, _Block);

          function Blockquote() {
            _classCallCheck(this, Blockquote);

            return _possibleConstructorReturn(this, (Blockquote.__proto__ || Object.getPrototypeOf(Blockquote)).apply(this, arguments));
          }

          return Blockquote;
        }(_block2.default);

        Blockquote.blotName = 'blockquote';
        Blockquote.tagName = 'blockquote';
        exports.default = Blockquote;
        /***/
      },
      /* 66 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _block = __webpack_require__(4);

        var _block2 = _interopRequireDefault(_block);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Header = function (_Block) {
          _inherits(Header, _Block);

          function Header() {
            _classCallCheck(this, Header);

            return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
          }

          _createClass(Header, null, [{
            key: 'formats',
            value: function formats(domNode) {
              return this.tagName.indexOf(domNode.tagName) + 1;
            }
          }]);

          return Header;
        }(_block2.default);

        Header.blotName = 'header';
        Header.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
        exports.default = Header;
        /***/
      },
      /* 67 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = exports.ListItem = undefined;

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _block = __webpack_require__(4);

        var _block2 = _interopRequireDefault(_block);

        var _container = __webpack_require__(25);

        var _container2 = _interopRequireDefault(_container);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var ListItem = function (_Block) {
          _inherits(ListItem, _Block);

          function ListItem() {
            _classCallCheck(this, ListItem);

            return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
          }

          _createClass(ListItem, [{
            key: 'format',
            value: function format(name, value) {
              if (name === List.blotName && !value) {
                this.replaceWith(_parchment2.default.create(this.statics.scope));
              } else {
                _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'format', this).call(this, name, value);
              }
            }
          }, {
            key: 'remove',
            value: function remove() {
              if (this.prev == null && this.next == null) {
                this.parent.remove();
              } else {
                _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'remove', this).call(this);
              }
            }
          }, {
            key: 'replaceWith',
            value: function replaceWith(name, value) {
              this.parent.isolate(this.offset(this.parent), this.length());

              if (name === this.parent.statics.blotName) {
                this.parent.replaceWith(name, value);
                return this;
              } else {
                this.parent.unwrap();
                return _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'replaceWith', this).call(this, name, value);
              }
            }
          }], [{
            key: 'formats',
            value: function formats(domNode) {
              return domNode.tagName === this.tagName ? undefined : _get(ListItem.__proto__ || Object.getPrototypeOf(ListItem), 'formats', this).call(this, domNode);
            }
          }]);

          return ListItem;
        }(_block2.default);

        ListItem.blotName = 'list-item';
        ListItem.tagName = 'LI';

        var List = function (_Container) {
          _inherits(List, _Container);

          _createClass(List, null, [{
            key: 'create',
            value: function create(value) {
              var tagName = value === 'ordered' ? 'OL' : 'UL';

              var node = _get(List.__proto__ || Object.getPrototypeOf(List), 'create', this).call(this, tagName);

              if (value === 'checked' || value === 'unchecked') {
                node.setAttribute('data-checked', value === 'checked');
              }

              return node;
            }
          }, {
            key: 'formats',
            value: function formats(domNode) {
              if (domNode.tagName === 'OL') return 'ordered';

              if (domNode.tagName === 'UL') {
                if (domNode.hasAttribute('data-checked')) {
                  return domNode.getAttribute('data-checked') === 'true' ? 'checked' : 'unchecked';
                } else {
                  return 'bullet';
                }
              }

              return undefined;
            }
          }]);

          function List(domNode) {
            _classCallCheck(this, List);

            var _this2 = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, domNode));

            var listEventHandler = function listEventHandler(e) {
              if (e.target.parentNode !== domNode) return;

              var format = _this2.statics.formats(domNode);

              var blot = _parchment2.default.find(e.target);

              if (format === 'checked') {
                blot.format('list', 'unchecked');
              } else if (format === 'unchecked') {
                blot.format('list', 'checked');
              }
            };

            domNode.addEventListener('touchstart', listEventHandler);
            domNode.addEventListener('mousedown', listEventHandler);
            return _this2;
          }

          _createClass(List, [{
            key: 'format',
            value: function format(name, value) {
              if (this.children.length > 0) {
                this.children.tail.format(name, value);
              }
            }
          }, {
            key: 'formats',
            value: function formats() {
              // We don't inherit from FormatBlot
              return _defineProperty({}, this.statics.blotName, this.statics.formats(this.domNode));
            }
          }, {
            key: 'insertBefore',
            value: function insertBefore(blot, ref) {
              if (blot instanceof ListItem) {
                _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'insertBefore', this).call(this, blot, ref);
              } else {
                var index = ref == null ? this.length() : ref.offset(this);
                var after = this.split(index);
                after.parent.insertBefore(blot, after);
              }
            }
          }, {
            key: 'optimize',
            value: function optimize(context) {
              _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'optimize', this).call(this, context);

              var next = this.next;

              if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && next.domNode.tagName === this.domNode.tagName && next.domNode.getAttribute('data-checked') === this.domNode.getAttribute('data-checked')) {
                next.moveChildren(this);
                next.remove();
              }
            }
          }, {
            key: 'replace',
            value: function replace(target) {
              if (target.statics.blotName !== this.statics.blotName) {
                var item = _parchment2.default.create(this.statics.defaultChild);

                target.moveChildren(item);
                this.appendChild(item);
              }

              _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'replace', this).call(this, target);
            }
          }]);

          return List;
        }(_container2.default);

        List.blotName = 'list';
        List.scope = _parchment2.default.Scope.BLOCK_BLOT;
        List.tagName = ['OL', 'UL'];
        List.defaultChild = 'list-item';
        List.allowedChildren = [ListItem];
        exports.ListItem = ListItem;
        exports.default = List;
        /***/
      },
      /* 68 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _bold = __webpack_require__(56);

        var _bold2 = _interopRequireDefault(_bold);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Italic = function (_Bold) {
          _inherits(Italic, _Bold);

          function Italic() {
            _classCallCheck(this, Italic);

            return _possibleConstructorReturn(this, (Italic.__proto__ || Object.getPrototypeOf(Italic)).apply(this, arguments));
          }

          return Italic;
        }(_bold2.default);

        Italic.blotName = 'italic';
        Italic.tagName = ['EM', 'I'];
        exports.default = Italic;
        /***/
      },
      /* 69 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _inline = __webpack_require__(6);

        var _inline2 = _interopRequireDefault(_inline);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Script = function (_Inline) {
          _inherits(Script, _Inline);

          function Script() {
            _classCallCheck(this, Script);

            return _possibleConstructorReturn(this, (Script.__proto__ || Object.getPrototypeOf(Script)).apply(this, arguments));
          }

          _createClass(Script, null, [{
            key: 'create',
            value: function create(value) {
              if (value === 'super') {
                return document.createElement('sup');
              } else if (value === 'sub') {
                return document.createElement('sub');
              } else {
                return _get(Script.__proto__ || Object.getPrototypeOf(Script), 'create', this).call(this, value);
              }
            }
          }, {
            key: 'formats',
            value: function formats(domNode) {
              if (domNode.tagName === 'SUB') return 'sub';
              if (domNode.tagName === 'SUP') return 'super';
              return undefined;
            }
          }]);

          return Script;
        }(_inline2.default);

        Script.blotName = 'script';
        Script.tagName = ['SUB', 'SUP'];
        exports.default = Script;
        /***/
      },
      /* 70 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _inline = __webpack_require__(6);

        var _inline2 = _interopRequireDefault(_inline);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Strike = function (_Inline) {
          _inherits(Strike, _Inline);

          function Strike() {
            _classCallCheck(this, Strike);

            return _possibleConstructorReturn(this, (Strike.__proto__ || Object.getPrototypeOf(Strike)).apply(this, arguments));
          }

          return Strike;
        }(_inline2.default);

        Strike.blotName = 'strike';
        Strike.tagName = 'S';
        exports.default = Strike;
        /***/
      },
      /* 71 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _inline = __webpack_require__(6);

        var _inline2 = _interopRequireDefault(_inline);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Underline = function (_Inline) {
          _inherits(Underline, _Inline);

          function Underline() {
            _classCallCheck(this, Underline);

            return _possibleConstructorReturn(this, (Underline.__proto__ || Object.getPrototypeOf(Underline)).apply(this, arguments));
          }

          return Underline;
        }(_inline2.default);

        Underline.blotName = 'underline';
        Underline.tagName = 'U';
        exports.default = Underline;
        /***/
      },
      /* 72 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _link = __webpack_require__(27);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var ATTRIBUTES = ['alt', 'height', 'width'];

        var Image = function (_Parchment$Embed) {
          _inherits(Image, _Parchment$Embed);

          function Image() {
            _classCallCheck(this, Image);

            return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
          }

          _createClass(Image, [{
            key: 'format',
            value: function format(name, value) {
              if (ATTRIBUTES.indexOf(name) > -1) {
                if (value) {
                  this.domNode.setAttribute(name, value);
                } else {
                  this.domNode.removeAttribute(name);
                }
              } else {
                _get(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), 'format', this).call(this, name, value);
              }
            }
          }], [{
            key: 'create',
            value: function create(value) {
              var node = _get(Image.__proto__ || Object.getPrototypeOf(Image), 'create', this).call(this, value);

              if (typeof value === 'string') {
                node.setAttribute('src', this.sanitize(value));
              }

              return node;
            }
          }, {
            key: 'formats',
            value: function formats(domNode) {
              return ATTRIBUTES.reduce(function (formats, attribute) {
                if (domNode.hasAttribute(attribute)) {
                  formats[attribute] = domNode.getAttribute(attribute);
                }

                return formats;
              }, {});
            }
          }, {
            key: 'match',
            value: function match(url) {
              return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
            }
          }, {
            key: 'sanitize',
            value: function sanitize(url) {
              return (0, _link.sanitize)(url, ['http', 'https', 'data']) ? url : '//:0';
            }
          }, {
            key: 'value',
            value: function value(domNode) {
              return domNode.getAttribute('src');
            }
          }]);

          return Image;
        }(_parchment2.default.Embed);

        Image.blotName = 'image';
        Image.tagName = 'IMG';
        exports.default = Image;
        /***/
      },
      /* 73 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _block = __webpack_require__(4);

        var _link = __webpack_require__(27);

        var _link2 = _interopRequireDefault(_link);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var ATTRIBUTES = ['height', 'width'];

        var Video = function (_BlockEmbed) {
          _inherits(Video, _BlockEmbed);

          function Video() {
            _classCallCheck(this, Video);

            return _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).apply(this, arguments));
          }

          _createClass(Video, [{
            key: 'format',
            value: function format(name, value) {
              if (ATTRIBUTES.indexOf(name) > -1) {
                if (value) {
                  this.domNode.setAttribute(name, value);
                } else {
                  this.domNode.removeAttribute(name);
                }
              } else {
                _get(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'format', this).call(this, name, value);
              }
            }
          }], [{
            key: 'create',
            value: function create(value) {
              var node = _get(Video.__proto__ || Object.getPrototypeOf(Video), 'create', this).call(this, value);

              node.setAttribute('frameborder', '0');
              node.setAttribute('allowfullscreen', true);
              node.setAttribute('src', this.sanitize(value));
              return node;
            }
          }, {
            key: 'formats',
            value: function formats(domNode) {
              return ATTRIBUTES.reduce(function (formats, attribute) {
                if (domNode.hasAttribute(attribute)) {
                  formats[attribute] = domNode.getAttribute(attribute);
                }

                return formats;
              }, {});
            }
          }, {
            key: 'sanitize',
            value: function sanitize(url) {
              return _link2.default.sanitize(url);
            }
          }, {
            key: 'value',
            value: function value(domNode) {
              return domNode.getAttribute('src');
            }
          }]);

          return Video;
        }(_block.BlockEmbed);

        Video.blotName = 'video';
        Video.className = 'ql-video';
        Video.tagName = 'IFRAME';
        exports.default = Video;
        /***/
      },
      /* 74 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = exports.FormulaBlot = undefined;

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _embed = __webpack_require__(35);

        var _embed2 = _interopRequireDefault(_embed);

        var _quill = __webpack_require__(5);

        var _quill2 = _interopRequireDefault(_quill);

        var _module = __webpack_require__(9);

        var _module2 = _interopRequireDefault(_module);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var FormulaBlot = function (_Embed) {
          _inherits(FormulaBlot, _Embed);

          function FormulaBlot() {
            _classCallCheck(this, FormulaBlot);

            return _possibleConstructorReturn(this, (FormulaBlot.__proto__ || Object.getPrototypeOf(FormulaBlot)).apply(this, arguments));
          }

          _createClass(FormulaBlot, null, [{
            key: 'create',
            value: function create(value) {
              var node = _get(FormulaBlot.__proto__ || Object.getPrototypeOf(FormulaBlot), 'create', this).call(this, value);

              if (typeof value === 'string') {
                window.katex.render(value, node, {
                  throwOnError: false,
                  errorColor: '#f00'
                });
                node.setAttribute('data-value', value);
              }

              return node;
            }
          }, {
            key: 'value',
            value: function value(domNode) {
              return domNode.getAttribute('data-value');
            }
          }]);

          return FormulaBlot;
        }(_embed2.default);

        FormulaBlot.blotName = 'formula';
        FormulaBlot.className = 'ql-formula';
        FormulaBlot.tagName = 'SPAN';

        var Formula = function (_Module) {
          _inherits(Formula, _Module);

          _createClass(Formula, null, [{
            key: 'register',
            value: function register() {
              _quill2.default.register(FormulaBlot, true);
            }
          }]);

          function Formula() {
            _classCallCheck(this, Formula);

            var _this2 = _possibleConstructorReturn(this, (Formula.__proto__ || Object.getPrototypeOf(Formula)).call(this));

            if (window.katex == null) {
              throw new Error('Formula module requires KaTeX.');
            }

            return _this2;
          }

          return Formula;
        }(_module2.default);

        exports.FormulaBlot = FormulaBlot;
        exports.default = Formula;
        /***/
      },
      /* 75 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = exports.CodeToken = exports.CodeBlock = undefined;

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _parchment = __webpack_require__(0);

        var _parchment2 = _interopRequireDefault(_parchment);

        var _quill = __webpack_require__(5);

        var _quill2 = _interopRequireDefault(_quill);

        var _module = __webpack_require__(9);

        var _module2 = _interopRequireDefault(_module);

        var _code = __webpack_require__(13);

        var _code2 = _interopRequireDefault(_code);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var SyntaxCodeBlock = function (_CodeBlock) {
          _inherits(SyntaxCodeBlock, _CodeBlock);

          function SyntaxCodeBlock() {
            _classCallCheck(this, SyntaxCodeBlock);

            return _possibleConstructorReturn(this, (SyntaxCodeBlock.__proto__ || Object.getPrototypeOf(SyntaxCodeBlock)).apply(this, arguments));
          }

          _createClass(SyntaxCodeBlock, [{
            key: 'replaceWith',
            value: function replaceWith(block) {
              this.domNode.textContent = this.domNode.textContent;
              this.attach();

              _get(SyntaxCodeBlock.prototype.__proto__ || Object.getPrototypeOf(SyntaxCodeBlock.prototype), 'replaceWith', this).call(this, block);
            }
          }, {
            key: 'highlight',
            value: function highlight(_highlight) {
              var text = this.domNode.textContent;

              if (this.cachedText !== text) {
                if (text.trim().length > 0 || this.cachedText == null) {
                  this.domNode.innerHTML = _highlight(text);
                  this.domNode.normalize();
                  this.attach();
                }

                this.cachedText = text;
              }
            }
          }]);

          return SyntaxCodeBlock;
        }(_code2.default);

        SyntaxCodeBlock.className = 'ql-syntax';
        var CodeToken = new _parchment2.default.Attributor.Class('token', 'hljs', {
          scope: _parchment2.default.Scope.INLINE
        });

        var Syntax = function (_Module) {
          _inherits(Syntax, _Module);

          _createClass(Syntax, null, [{
            key: 'register',
            value: function register() {
              _quill2.default.register(CodeToken, true);

              _quill2.default.register(SyntaxCodeBlock, true);
            }
          }]);

          function Syntax(quill, options) {
            _classCallCheck(this, Syntax);

            var _this2 = _possibleConstructorReturn(this, (Syntax.__proto__ || Object.getPrototypeOf(Syntax)).call(this, quill, options));

            if (typeof _this2.options.highlight !== 'function') {
              throw new Error('Syntax module requires highlight.js. Please include the library on the page before Quill.');
            }

            var timer = null;

            _this2.quill.on(_quill2.default.events.SCROLL_OPTIMIZE, function () {
              clearTimeout(timer);
              timer = setTimeout(function () {
                _this2.highlight();

                timer = null;
              }, _this2.options.interval);
            });

            _this2.highlight();

            return _this2;
          }

          _createClass(Syntax, [{
            key: 'highlight',
            value: function highlight() {
              var _this3 = this;

              if (this.quill.selection.composing) return;
              this.quill.update(_quill2.default.sources.USER);
              var range = this.quill.getSelection();
              this.quill.scroll.descendants(SyntaxCodeBlock).forEach(function (code) {
                code.highlight(_this3.options.highlight);
              });
              this.quill.update(_quill2.default.sources.SILENT);

              if (range != null) {
                this.quill.setSelection(range, _quill2.default.sources.SILENT);
              }
            }
          }]);

          return Syntax;
        }(_module2.default);

        Syntax.DEFAULTS = {
          highlight: function () {
            if (window.hljs == null) return null;
            return function (text) {
              var result = window.hljs.highlightAuto(text);
              return result.value;
            };
          }(),
          interval: 1000
        };
        exports.CodeBlock = SyntaxCodeBlock;
        exports.CodeToken = CodeToken;
        exports.default = Syntax;
        /***/
      },
      /* 76 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>";
        /***/
      },
      /* 77 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>";
        /***/
      },
      /* 78 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>";
        /***/
      },
      /* 79 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>";
        /***/
      },
      /* 80 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <g class=\"ql-fill ql-color-label\"> <polygon points=\"6 6.868 6 6 5 6 5 7 5.942 7 6 6.868\"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points=\"6.817 5 6 5 6 6 6.38 6 6.817 5\"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points=\"4 11.439 4 11 3 11 3 12 3.755 12 4 11.439\"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points=\"4.63 10 4 10 4 11 4.192 11 4.63 10\"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points=\"13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174\"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points=\"12 6.868 12 6 11.62 6 12 6.868\"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points=\"12.933 9 13 9 13 8 12.495 8 12.933 9\"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points=\"5.5 13 9 5 12.5 13\"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>";
        /***/
      },
      /* 81 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=\"ql-fill ql-stroke\" height=3 width=3 x=4 y=5></rect> <rect class=\"ql-fill ql-stroke\" height=3 width=3 x=11 y=5></rect> <path class=\"ql-even ql-fill ql-stroke\" d=M7,8c0,4.031-3,5-3,5></path> <path class=\"ql-even ql-fill ql-stroke\" d=M14,8c0,4.031-3,5-3,5></path> </svg>";
        /***/
      },
      /* 82 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>";
        /***/
      },
      /* 83 */

      /***/
      function (module, exports) {
        module.exports = "<svg class=\"\" viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>";
        /***/
      },
      /* 84 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=\"ql-color-label ql-stroke ql-transparent\" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points=\"5.5 11 9 3 12.5 11\"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>";
        /***/
      },
      /* 85 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=\"ql-stroke ql-fill\" points=\"3 11 5 9 3 7 3 11\"></polygon> <line class=\"ql-stroke ql-fill\" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>";
        /***/
      },
      /* 86 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=\"ql-stroke ql-fill\" points=\"15 12 13 10 15 8 15 12\"></polygon> <line class=\"ql-stroke ql-fill\" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>";
        /***/
      },
      /* 87 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>";
        /***/
      },
      /* 88 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>";
        /***/
      },
      /* 89 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>";
        /***/
      },
      /* 90 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform=\"translate(24 18) rotate(-180)\"/> </svg>";
        /***/
      },
      /* 91 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>";
        /***/
      },
      /* 92 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewBox=\"0 0 18 18\"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>";
        /***/
      },
      /* 93 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewBox=\"0 0 18 18\"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>";
        /***/
      },
      /* 94 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>";
        /***/
      },
      /* 95 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class=\"ql-even ql-fill\" points=\"5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12\"></polyline> </svg>";
        /***/
      },
      /* 96 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=\"ql-fill ql-stroke\" points=\"3 7 3 11 5 9 3 7\"></polyline> </svg>";
        /***/
      },
      /* 97 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points=\"5 7 5 11 3 9 5 7\"></polyline> </svg>";
        /***/
      },
      /* 98 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class=\"ql-even ql-stroke\" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class=\"ql-even ql-stroke\" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>";
        /***/
      },
      /* 99 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class=\"ql-stroke ql-thin\" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class=\"ql-stroke ql-thin\" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class=\"ql-stroke ql-thin\" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>";
        /***/
      },
      /* 100 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>";
        /***/
      },
      /* 101 */

      /***/
      function (module, exports) {
        module.exports = "<svg class=\"\" viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points=\"3 4 4 5 6 3\"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points=\"3 14 4 15 6 13\"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points=\"3 9 4 10 6 8\"></polyline> </svg>";
        /***/
      },
      /* 102 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>";
        /***/
      },
      /* 103 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>";
        /***/
      },
      /* 104 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=\"ql-stroke ql-thin\" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>";
        /***/
      },
      /* 105 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>";
        /***/
      },
      /* 106 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>";
        /***/
      },
      /* 107 */

      /***/
      function (module, exports) {
        module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=ql-stroke points=\"7 11 9 13 11 11 7 11\"></polygon> <polygon class=ql-stroke points=\"7 7 9 5 11 7 7 7\"></polygon> </svg>";
        /***/
      },
      /* 108 */

      /***/
      function (module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = exports.BubbleTooltip = undefined;

        var _get = function get(object, property, receiver) {
          if (object === null) object = Function.prototype;
          var desc = Object.getOwnPropertyDescriptor(object, property);

          if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
              return undefined;
            } else {
              return get(parent, property, receiver);
            }
          } else if ("value" in desc) {
            return desc.value;
          } else {
            var getter = desc.get;

            if (getter === undefined) {
              return undefined;
            }

            return getter.call(receiver);
          }
        };

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var _extend = __webpack_require__(3);

        var _extend2 = _interopRequireDefault(_extend);

        var _emitter = __webpack_require__(8);

        var _emitter2 = _interopRequireDefault(_emitter);

        var _base = __webpack_require__(43);

        var _base2 = _interopRequireDefault(_base);

        var _selection = __webpack_require__(15);

        var _icons = __webpack_require__(41);

        var _icons2 = _interopRequireDefault(_icons);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var TOOLBAR_CONFIG = [['bold', 'italic', 'link'], [{
          header: 1
        }, {
          header: 2
        }, 'blockquote']];

        var BubbleTheme = function (_BaseTheme) {
          _inherits(BubbleTheme, _BaseTheme);

          function BubbleTheme(quill, options) {
            _classCallCheck(this, BubbleTheme);

            if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
              options.modules.toolbar.container = TOOLBAR_CONFIG;
            }

            var _this = _possibleConstructorReturn(this, (BubbleTheme.__proto__ || Object.getPrototypeOf(BubbleTheme)).call(this, quill, options));

            _this.quill.container.classList.add('ql-bubble');

            return _this;
          }

          _createClass(BubbleTheme, [{
            key: 'extendToolbar',
            value: function extendToolbar(toolbar) {
              this.tooltip = new BubbleTooltip(this.quill, this.options.bounds);
              this.tooltip.root.appendChild(toolbar.container);
              this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), _icons2.default);
              this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), _icons2.default);
            }
          }]);

          return BubbleTheme;
        }(_base2.default);

        BubbleTheme.DEFAULTS = (0, _extend2.default)(true, {}, _base2.default.DEFAULTS, {
          modules: {
            toolbar: {
              handlers: {
                link: function link(value) {
                  if (!value) {
                    this.quill.format('link', false);
                  } else {
                    this.quill.theme.tooltip.edit();
                  }
                }
              }
            }
          }
        });

        var BubbleTooltip = function (_BaseTooltip) {
          _inherits(BubbleTooltip, _BaseTooltip);

          function BubbleTooltip(quill, bounds) {
            _classCallCheck(this, BubbleTooltip);

            var _this2 = _possibleConstructorReturn(this, (BubbleTooltip.__proto__ || Object.getPrototypeOf(BubbleTooltip)).call(this, quill, bounds));

            _this2.quill.on(_emitter2.default.events.EDITOR_CHANGE, function (type, range, oldRange, source) {
              if (type !== _emitter2.default.events.SELECTION_CHANGE) return;

              if (range != null && range.length > 0 && source === _emitter2.default.sources.USER) {
                _this2.show(); // Lock our width so we will expand beyond our offsetParent boundaries


                _this2.root.style.left = '0px';
                _this2.root.style.width = '';
                _this2.root.style.width = _this2.root.offsetWidth + 'px';

                var lines = _this2.quill.getLines(range.index, range.length);

                if (lines.length === 1) {
                  _this2.position(_this2.quill.getBounds(range));
                } else {
                  var lastLine = lines[lines.length - 1];

                  var index = _this2.quill.getIndex(lastLine);

                  var length = Math.min(lastLine.length() - 1, range.index + range.length - index);

                  var _bounds = _this2.quill.getBounds(new _selection.Range(index, length));

                  _this2.position(_bounds);
                }
              } else if (document.activeElement !== _this2.textbox && _this2.quill.hasFocus()) {
                _this2.hide();
              }
            });

            return _this2;
          }

          _createClass(BubbleTooltip, [{
            key: 'listen',
            value: function listen() {
              var _this3 = this;

              _get(BubbleTooltip.prototype.__proto__ || Object.getPrototypeOf(BubbleTooltip.prototype), 'listen', this).call(this);

              this.root.querySelector('.ql-close').addEventListener('click', function () {
                _this3.root.classList.remove('ql-editing');
              });
              this.quill.on(_emitter2.default.events.SCROLL_OPTIMIZE, function () {
                // Let selection be restored by toolbar handlers before repositioning
                setTimeout(function () {
                  if (_this3.root.classList.contains('ql-hidden')) return;

                  var range = _this3.quill.getSelection();

                  if (range != null) {
                    _this3.position(_this3.quill.getBounds(range));
                  }
                }, 1);
              });
            }
          }, {
            key: 'cancel',
            value: function cancel() {
              this.show();
            }
          }, {
            key: 'position',
            value: function position(reference) {
              var shift = _get(BubbleTooltip.prototype.__proto__ || Object.getPrototypeOf(BubbleTooltip.prototype), 'position', this).call(this, reference);

              var arrow = this.root.querySelector('.ql-tooltip-arrow');
              arrow.style.marginLeft = '';
              if (shift === 0) return shift;
              arrow.style.marginLeft = -1 * shift - arrow.offsetWidth / 2 + 'px';
            }
          }]);

          return BubbleTooltip;
        }(_base.BaseTooltip);

        BubbleTooltip.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', '</div>'].join('');
        exports.BubbleTooltip = BubbleTooltip;
        exports.default = BubbleTheme;
        /***/
      },
      /* 109 */

      /***/
      function (module, exports, __webpack_require__) {
        module.exports = __webpack_require__(63);
        /***/
      }
      /******/
      ])["default"]
    );
  });
});

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function _invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
}

var warning = function () {};

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
} // /-- Inlined from fbjs --


var MIXINS_KEY = 'mixins'; // Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.

function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */
  var injectedMixins = [];
  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */

  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',
    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',
    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillMount`.
     *
     * @optional
     */
    UNSAFE_componentWillMount: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillReceiveProps`.
     *
     * @optional
     */
    UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillUpdate`.
     *
     * @optional
     */
    UNSAFE_componentWillUpdate: 'DEFINE_MANY',
    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };
  /**
   * Similar to ReactClassInterface but for static methods.
   */

  var ReactClassStaticInterface = {
    /**
     * This method is invoked after a component is instantiated and when it
     * receives new props. Return an object to update state in response to
     * prop changes. Return null to indicate no change to state.
     *
     * If an object is returned, its keys will be merged into the existing state.
     *
     * @return {object || null}
     * @optional
     */
    getDerivedStateFromProps: 'DEFINE_MANY_MERGED'
  };
  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */

  var RESERVED_SPEC_KEYS = {
    displayName: function (Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function (Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function (Constructor, childContextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }

      Constructor.childContextTypes = objectAssign({}, Constructor.childContextTypes, childContextTypes);
    },
    contextTypes: function (Constructor, contextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, contextTypes, 'context');
      }

      Constructor.contextTypes = objectAssign({}, Constructor.contextTypes, contextTypes);
    },

    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function (Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function (Constructor, propTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, propTypes, 'prop');
      }

      Constructor.propTypes = objectAssign({}, Constructor.propTypes, propTypes);
    },
    statics: function (Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function () {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (process.env.NODE_ENV !== 'production') {
          warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName);
        }
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null; // Disallow overriding of base class methods unless explicitly allowed.

    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(specPolicy === 'OVERRIDE_BASE', 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name);
    } // Disallow defining methods more than once unless explicitly allowed.


    if (isAlreadyDefined) {
      _invariant(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED', 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name);
    }
  }
  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */


  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (process.env.NODE_ENV !== 'production') {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        if (process.env.NODE_ENV !== 'production') {
          warning(isMixinValid, "%s: You're attempting to include a mixin that is either null " + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec);
        }
      }

      return;
    }

    _invariant(typeof spec !== 'function', "ReactClass: You're attempting to " + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.');

    _invariant(!isValidElement(spec), "ReactClass: You're attempting to " + 'use a component as a mixin. Instead, just use a regular object.');

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs; // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.

    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name]; // These cases should already be caught by validateMethodOverride.

            _invariant(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY'), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name); // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.


            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;

            if (process.env.NODE_ENV !== 'production') {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }

    for (var name in statics) {
      var property = statics[name];

      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = (name in RESERVED_SPEC_KEYS);

      _invariant(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name);

      var isAlreadyDefined = (name in Constructor);

      if (isAlreadyDefined) {
        var specPolicy = ReactClassStaticInterface.hasOwnProperty(name) ? ReactClassStaticInterface[name] : null;

        _invariant(specPolicy === 'DEFINE_MANY_MERGED', 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name);

        Constructor[name] = createMergedResultFunction(Constructor[name], property);
        return;
      }

      Constructor[name] = property;
    }
  }
  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */


  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(one && two && typeof one === 'object' && typeof two === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.');

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key);

        one[key] = two[key];
      }
    }

    return one;
  }
  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */


  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);

      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }

      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }
  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */


  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }
  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */


  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);

    if (process.env.NODE_ENV !== 'production') {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;

      boundMethod.bind = function (newThis) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        } // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.


        if (newThis !== component && newThis !== null) {
          if (process.env.NODE_ENV !== 'production') {
            warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName);
          }
        } else if (!args.length) {
          if (process.env.NODE_ENV !== 'production') {
            warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName);
          }

          return boundMethod;
        }

        var reboundMethod = _bind.apply(boundMethod, arguments);

        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }

    return boundMethod;
  }
  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */


  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;

    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function () {
      this.__isMounted = true;
    }
  };
  var IsMountedPostMixin = {
    componentWillUnmount: function () {
      this.__isMounted = false;
    }
  };
  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */

  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function (newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function () {
      if (process.env.NODE_ENV !== 'production') {
        warning(this.__didWarnIsMounted, '%s: isMounted is deprecated. Instead, make sure to clean up ' + 'subscriptions and pending requests in componentWillUnmount to ' + 'prevent memory leaks.', this.constructor && this.constructor.displayName || this.name || 'Component');
        this.__didWarnIsMounted = true;
      }

      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function () {};

  objectAssign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);
  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */


  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.
      if (process.env.NODE_ENV !== 'production') {
        warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory');
      } // Wire up auto-binding


      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
      this.state = null; // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;

      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }

      _invariant(typeof initialState === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent');

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];
    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin); // Initialize the defaultProps property after all mixins have been merged.

    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }

      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');

    if (process.env.NODE_ENV !== 'production') {
      warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component');
      warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component');
      warning(!Constructor.prototype.UNSAFE_componentWillRecieveProps, '%s has a method called UNSAFE_componentWillRecieveProps(). ' + 'Did you mean UNSAFE_componentWillReceiveProps()?', spec.displayName || 'A component');
    } // Reduce time spent doing lookups by setting these on the prototype.


    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

var factory_1 = factory;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

if (typeof React === 'undefined') {
  throw Error('create-react-class could not find the React object. If you are using script tags, ' + 'make sure that React is being loaded before create-react-class.');
} // Hack to grab NoopUpdateQueue from isomorphic React


var ReactNoopUpdateQueue = new React.Component().updater;
var createReactClass = factory_1(React.Component, React.isValidElement, ReactNoopUpdateQueue);

var QuillMixin = {
  /**
  Creates an editor on the given element. The editor will
  be passed the configuration, have its events bound,
  */
  createEditor: function ($el, config) {
    var editor = new quill($el, config);

    if (config.tabIndex !== undefined) {
      this.setEditorTabIndex(editor, config.tabIndex);
    }

    this.hookEditor(editor);
    return editor;
  },
  hookEditor: function (editor) {
    // Expose the editor on change events via a weaker,
    // unprivileged proxy object that does not allow
    // accidentally modifying editor state.
    var unprivilegedEditor = this.makeUnprivilegedEditor(editor);

    this.handleTextChange = function (delta, oldDelta, source) {
      if (this.onEditorChangeText) {
        this.onEditorChangeText(editor.root.innerHTML, delta, source, unprivilegedEditor);
        this.onEditorChangeSelection(editor.getSelection(), source, unprivilegedEditor);
      }
    }.bind(this);

    this.handleSelectionChange = function (range, oldRange, source) {
      if (this.onEditorChangeSelection) {
        this.onEditorChangeSelection(range, source, unprivilegedEditor);
      }
    }.bind(this);

    editor.on('editor-change', function (eventType, rangeOrDelta, oldRangeOrOldDelta, source) {
      if (eventType === quill.events.SELECTION_CHANGE) {
        this.handleSelectionChange(rangeOrDelta, oldRangeOrOldDelta, source);
      }

      if (eventType === quill.events.TEXT_CHANGE) {
        this.handleTextChange(rangeOrDelta, oldRangeOrOldDelta, source);
      }
    }.bind(this));
  },
  unhookEditor: function (editor) {
    editor.off('selection-change');
    editor.off('text-change');
  },
  setEditorReadOnly: function (editor, value) {
    value ? editor.disable() : editor.enable();
  },

  /*
  Replace the contents of the editor, but keep
  the previous selection hanging around so that
  the cursor won't move.
  */
  setEditorContents: function (editor, value) {
    var sel = editor.getSelection();

    if (typeof value === 'string') {
      editor.setContents(editor.clipboard.convert(value));
    } else {
      editor.setContents(value);
    }

    if (sel && editor.hasFocus()) this.setEditorSelection(editor, sel);
  },
  setEditorSelection: function (editor, range) {
    if (range) {
      // Validate bounds before applying.
      var length = editor.getLength();
      range.index = Math.max(0, Math.min(range.index, length - 1));
      range.length = Math.max(0, Math.min(range.length, length - 1 - range.index));
    }

    editor.setSelection(range);
  },
  setEditorTabIndex: function (editor, tabIndex) {
    if (editor.editor && editor.editor.scroll && editor.editor.scroll.domNode) {
      editor.editor.scroll.domNode.tabIndex = tabIndex;
    }
  },

  /*
  Returns an weaker, unprivileged proxy object that only
  exposes read-only accessors found on the editor instance,
  without any state-modificating methods.
  */
  makeUnprivilegedEditor: function (editor) {
    var e = editor;
    return {
      getLength: function () {
        return e.getLength.apply(e, arguments);
      },
      getText: function () {
        return e.getText.apply(e, arguments);
      },
      getHTML: function () {
        return e.root.innerHTML;
      },
      getContents: function () {
        return e.getContents.apply(e, arguments);
      },
      getSelection: function () {
        return e.getSelection.apply(e, arguments);
      },
      getBounds: function () {
        return e.getBounds.apply(e, arguments);
      }
    };
  }
};
var mixin = QuillMixin;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */

var arrayProto = Array.prototype;
/** Built-in value references. */

var splice = arrayProto.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */

function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `ListCache`.


ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;
var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */

function stackClear() {
  this.__data__ = new _ListCache();
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = _freeGlobal || freeSelf || Function('return this')();
var _root = root;

/** Built-in value references. */

var Symbol$1 = _root.Symbol;
var _Symbol = Symbol$1;

/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString$1 = objectProto$1.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */

var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */

var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */

var coreJsData = _root['__core-js_shared__'];
var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString$1 = funcProto$1.toString;
/** Used to check objects for own properties. */

var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }

  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */

function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */

var Map$1 = _getNative(_root, 'Map');
var _Map = Map$1;

/* Built-in method references that are verified to be native. */

var nativeCreate = _getNative(Object, 'create');
var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */

function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used for built-in method references. */

var objectProto$3 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet(key) {
  var data = this.__data__;

  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */

var objectProto$4 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? data[key] !== undefined : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `Hash`.


Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;
var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */

function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash(),
    'map': new (_Map || _ListCache)(),
    'string': new _Hash()
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */

function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */

function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `MapCache`.


MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;
var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */

var LARGE_ARRAY_SIZE = 200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */

function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof _ListCache) {
    var pairs = data.__data__;

    if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new _MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
} // Add methods to `Stack`.


Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;
var _Stack = Stack;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */

function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);

  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */

function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;
  this.__data__ = new _MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
} // Add methods to `SetCache`.


SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;
var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  } // Check that cyclic values are equal.


  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);

  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }

  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new _SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array); // Ignore non-index properties.

  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }

      result = false;
      break;
    } // Recursively compare arrays (susceptible to call stack limits).


    if (seen) {
      if (!_arraySome(other, function (othValue, othIndex) {
        if (!_cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }

  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/** Built-in value references. */

var Uint8Array = _root.Uint8Array;
var _Uint8Array = Uint8Array;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;
/** `Object#toString` result references. */

var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';
/** Used to convert symbols to primitives and strings. */

var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }

      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }

      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag:
      var convert = _mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked) {
        return stacked == other;
      }

      bitmask |= COMPARE_UNORDERED_FLAG$1; // Recursively compare objects (susceptible to call stack limits).

      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }

  }

  return false;
}

var _equalByTag = equalByTag;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}

var _arrayPush = arrayPush;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
var isArray_1 = isArray;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */

function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */

var objectProto$5 = Object.prototype;
/** Built-in value references. */

var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbols = !nativeGetSymbols ? stubArray_1 : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var _getSymbols = getSymbols;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

var _baseTimes = baseTimes;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */

var argsTag = '[object Arguments]';
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */

function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */

var objectProto$6 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */

var isArguments = _baseIsArguments(function () {
  return arguments;
}()) ? _baseIsArguments : function (value) {
  return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
};
var isArguments_1 = isArguments;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports = freeModule && freeModule.exports === freeExports;
  /** Built-in value references. */

  var Buffer = moduleExports ? _root.Buffer : undefined;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */

  var isBuffer = nativeIsBuffer || stubFalse_1;
  module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */

var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag$1 = '[object String]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */

function baseIsTypedArray(value) {
  return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports = freeModule && freeModule.exports === freeExports;
  /** Detect free variable `process` from Node.js. */

  var freeProcess = moduleExports && _freeGlobal.process;
  /** Used to access faster Node.js helpers. */

  var nodeUtil = function () {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      } // Legacy `process.binding('util')` for Node.js < 10.


      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }();

  module.exports = nodeUtil;
});

/* Node.js helper references. */

var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */

var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */

var objectProto$7 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    _isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$8;
  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeKeys = _overArg(Object.keys, Object);
var _nativeKeys = nativeKeys;

/** Used for built-in method references. */

var objectProto$9 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$6 = objectProto$9.hasOwnProperty;
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty$6.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}

var _baseKeys = baseKeys;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */

function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */

function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */

function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$2 = 1;
/** Used for built-in method references. */

var objectProto$a = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$7 = objectProto$a.hasOwnProperty;
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }

  var index = objLength;

  while (index--) {
    var key = objProps[index];

    if (!(isPartial ? key in other : hasOwnProperty$7.call(other, key))) {
      return false;
    }
  } // Check that cyclic values are equal.


  var objStacked = stack.get(object);
  var othStacked = stack.get(other);

  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }

  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;

  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    } // Recursively compare objects (susceptible to call stack limits).


    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }

    skipCtor || (skipCtor = key == 'constructor');
  }

  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }

  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/* Built-in method references that are verified to be native. */

var DataView = _getNative(_root, 'DataView');
var _DataView = DataView;

/* Built-in method references that are verified to be native. */

var Promise$1 = _getNative(_root, 'Promise');
var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */

var Set$1 = _getNative(_root, 'Set');
var _Set = Set$1;

/* Built-in method references that are verified to be native. */

var WeakMap$1 = _getNative(_root, 'WeakMap');
var _WeakMap = WeakMap$1;

/** `Object#toString` result references. */

var mapTag$2 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$2 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';
var dataViewTag$2 = '[object DataView]';
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

var getTag = _baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2 || _Map && getTag(new _Map()) != mapTag$2 || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag$2 || _WeakMap && getTag(new _WeakMap()) != weakMapTag$1) {
  getTag = function (value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;

        case mapCtorString:
          return mapTag$2;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag$2;

        case weakMapCtorString:
          return weakMapTag$1;
      }
    }

    return result;
  };
}

var _getTag = getTag;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$3 = 1;
/** `Object#toString` result references. */

var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    objectTag$2 = '[object Object]';
/** Used for built-in method references. */

var objectProto$b = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$8 = objectProto$b.hasOwnProperty;
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$1 : _getTag(object),
      othTag = othIsArr ? arrayTag$1 : _getTag(other);
  objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
  othTag = othTag == argsTag$2 ? objectTag$2 : othTag;
  var objIsObj = objTag == objectTag$2,
      othIsObj = othTag == objectTag$2,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }

    objIsArr = true;
    objIsObj = false;
  }

  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack());
    return objIsArr || isTypedArray_1(object) ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$8.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$8.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new _Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack || (stack = new _Stack());
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */

function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || !isObjectLike_1(value) && !isObjectLike_1(other)) {
    return value !== value && other !== other;
  }

  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;
/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */

function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }

  object = Object(object);

  while (index--) {
    var data = matchData[index];

    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }

  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack();

      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }

      if (!(result === undefined ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack) : result)) {
        return false;
      }
    }
  }

  return true;
}

var _baseIsMatch = baseIsMatch;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */

function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}

var _isStrictComparable = isStrictComparable;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */

function getMatchData(object) {
  var result = keys_1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];
    result[length] = [key, value, _isStrictComparable(value)];
  }

  return result;
}

var _getMatchData = getMatchData;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }

    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
  };
}

var _matchesStrictComparable = matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */

function baseMatches(source) {
  var matchData = _getMatchData(source);

  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }

  return function (object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;

/** `Object#toString` result references. */

var symbolTag$1 = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike_1(value) && _baseGetTag(value) == symbolTag$1;
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */

var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */

function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }

  var type = typeof value;

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol_1(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

var _isKey = isKey;

/** Error message constants. */

var FUNC_ERROR_TEXT = 'Expected a function';
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */

function memoize(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  var memoized = function () {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };

  memoized.cache = new (memoize.Cache || _MapCache)();
  return memoized;
} // Expose `MapCache`.


memoize.Cache = _MapCache;
var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */

var MAX_MEMOIZE_SIZE = 500;
/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */

function memoizeCapped(func) {
  var result = memoize_1(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }

    return key;
  });
  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */

var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/** Used to match backslashes in property paths. */

var reEscapeChar = /\\(\\)?/g;
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */

var stringToPath = _memoizeCapped(function (string) {
  var result = [];

  if (string.charCodeAt(0) === 46
  /* . */
  ) {
      result.push('');
    }

  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});
var _stringToPath = stringToPath;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

var _arrayMap = arrayMap;

/** Used as references for various `Number` constants. */

var INFINITY = 1 / 0;
/** Used to convert symbols to primitives and strings. */

var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }

  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */

function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */

function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }

  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */

var INFINITY$1 = 1 / 0;
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */

function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */

function baseGet(object, path) {
  path = _castPath(path, object);
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */

function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */

function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);
  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);

    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }

    object = object[key];
  }

  if (result || ++index != length) {
    return result;
  }

  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) && (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */

function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;

/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;
/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */

function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }

  return function (object) {
    var objValue = get_1(object, path);
    return objValue === undefined && objValue === srcValue ? hasIn_1(object, path) : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}

var _baseMatchesProperty = baseMatchesProperty;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity$1(value) {
  return value;
}

var identity_1 = identity$1;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */

function basePropertyDeep(path) {
  return function (object) {
    return _baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */

function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}

var property_1 = property;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */

function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }

  if (value == null) {
    return identity_1;
  }

  if (typeof value == 'object') {
    return isArray_1(value) ? _baseMatchesProperty(value[0], value[1]) : _baseMatches(value);
  }

  return property_1(value);
}

var _baseIteratee = baseIteratee;

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */

function createFind(findIndexFunc) {
  return function (collection, predicate, fromIndex) {
    var iterable = Object(collection);

    if (!isArrayLike_1(collection)) {
      var iteratee = _baseIteratee(predicate);
      collection = keys_1(collection);

      predicate = function (key) {
        return iteratee(iterable[key], key, iterable);
      };
    }

    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

var _createFind = createFind;

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }

  return -1;
}

var _baseFindIndex = baseFindIndex;

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;
/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */

function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}

  return index;
}

var _trimmedEndIndex = trimmedEndIndex;

/** Used to match leading whitespace. */

var reTrimStart = /^\s+/;
/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */

function baseTrim(string) {
  return string ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
}

var _baseTrim = baseTrim;

/** Used as references for various `Number` constants. */

var NAN = 0 / 0;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol_1(value)) {
    return NAN;
  }

  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = _baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

var toNumber_1 = toNumber;

/** Used as references for various `Number` constants. */

var INFINITY$2 = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */

function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }

  value = toNumber_1(value);

  if (value === INFINITY$2 || value === -INFINITY$2) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }

  return value === value ? value : 0;
}

var toFinite_1 = toFinite;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */

function toInteger(value) {
  var result = toFinite_1(value),
      remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}

var toInteger_1 = toInteger;

/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max;
/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */

function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return -1;
  }

  var index = fromIndex == null ? 0 : toInteger_1(fromIndex);

  if (index < 0) {
    index = nativeMax(length + index, 0);
  }

  return _baseFindIndex(array, _baseIteratee(predicate), index);
}

var findIndex_1 = findIndex;

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */

var find = _createFind(findIndex_1);
var find_1 = find;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];

      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }

    return object;
  };
}

var _createBaseFor = createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */

var baseFor = _createBaseFor();
var _baseFor = baseFor;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */

function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys_1);
}

var _baseForOwn = baseForOwn;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */

function createBaseEach(eachFunc, fromRight) {
  return function (collection, iteratee) {
    if (collection == null) {
      return collection;
    }

    if (!isArrayLike_1(collection)) {
      return eachFunc(collection, iteratee);
    }

    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }

    return collection;
  };
}

var _createBaseEach = createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */

var baseEach = _createBaseEach(_baseForOwn);
var _baseEach = baseEach;

/**
 * The base implementation of `_.some` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */

function baseSome(collection, predicate) {
  var result;
  _baseEach(collection, function (value, index, collection) {
    result = predicate(value, index, collection);
    return !result;
  });
  return !!result;
}

var _baseSome = baseSome;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */

function isIterateeCall(value, index, object) {
  if (!isObject_1(object)) {
    return false;
  }

  var type = typeof index;

  if (type == 'number' ? isArrayLike_1(object) && _isIndex(index, object.length) : type == 'string' && index in object) {
    return eq_1(object[index], value);
  }

  return false;
}

var _isIterateeCall = isIterateeCall;

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * _.some([null, 0, 'yes', false], Boolean);
 * // => true
 *
 * var users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.some(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.some(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.some(users, 'active');
 * // => true
 */

function some(collection, predicate, guard) {
  var func = isArray_1(collection) ? _arraySome : _baseSome;

  if (guard && _isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }

  return func(collection, _baseIteratee(predicate));
}

var some_1 = some;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */

function isEqual(value, other) {
  return _baseIsEqual(value, other);
}

var isEqual_1 = isEqual;

var reactDomFactories = createCommonjsModule(function (module, exports) {
  /**
   * Copyright (c) 2015-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (f) {
    {
      module.exports = f(React);
      /* global define */
    }
  })(function (React) {
    /**
     * Create a factory that creates HTML tag elements.
     */
    function createDOMFactory(type) {
      var factory = React.createElement.bind(null, type); // Expose the type on the factory and the prototype so that it can be
      // easily accessed on elements. E.g. `<Foo />.type === Foo`.
      // This should not be named `constructor` since this may not be the function
      // that created the element, and it may not even be a constructor.

      factory.type = type;
      return factory;
    }
    /**
     * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
     */

    var ReactDOMFactories = {
      a: createDOMFactory('a'),
      abbr: createDOMFactory('abbr'),
      address: createDOMFactory('address'),
      area: createDOMFactory('area'),
      article: createDOMFactory('article'),
      aside: createDOMFactory('aside'),
      audio: createDOMFactory('audio'),
      b: createDOMFactory('b'),
      base: createDOMFactory('base'),
      bdi: createDOMFactory('bdi'),
      bdo: createDOMFactory('bdo'),
      big: createDOMFactory('big'),
      blockquote: createDOMFactory('blockquote'),
      body: createDOMFactory('body'),
      br: createDOMFactory('br'),
      button: createDOMFactory('button'),
      canvas: createDOMFactory('canvas'),
      caption: createDOMFactory('caption'),
      cite: createDOMFactory('cite'),
      code: createDOMFactory('code'),
      col: createDOMFactory('col'),
      colgroup: createDOMFactory('colgroup'),
      data: createDOMFactory('data'),
      datalist: createDOMFactory('datalist'),
      dd: createDOMFactory('dd'),
      del: createDOMFactory('del'),
      details: createDOMFactory('details'),
      dfn: createDOMFactory('dfn'),
      dialog: createDOMFactory('dialog'),
      div: createDOMFactory('div'),
      dl: createDOMFactory('dl'),
      dt: createDOMFactory('dt'),
      em: createDOMFactory('em'),
      embed: createDOMFactory('embed'),
      fieldset: createDOMFactory('fieldset'),
      figcaption: createDOMFactory('figcaption'),
      figure: createDOMFactory('figure'),
      footer: createDOMFactory('footer'),
      form: createDOMFactory('form'),
      h1: createDOMFactory('h1'),
      h2: createDOMFactory('h2'),
      h3: createDOMFactory('h3'),
      h4: createDOMFactory('h4'),
      h5: createDOMFactory('h5'),
      h6: createDOMFactory('h6'),
      head: createDOMFactory('head'),
      header: createDOMFactory('header'),
      hgroup: createDOMFactory('hgroup'),
      hr: createDOMFactory('hr'),
      html: createDOMFactory('html'),
      i: createDOMFactory('i'),
      iframe: createDOMFactory('iframe'),
      img: createDOMFactory('img'),
      input: createDOMFactory('input'),
      ins: createDOMFactory('ins'),
      kbd: createDOMFactory('kbd'),
      keygen: createDOMFactory('keygen'),
      label: createDOMFactory('label'),
      legend: createDOMFactory('legend'),
      li: createDOMFactory('li'),
      link: createDOMFactory('link'),
      main: createDOMFactory('main'),
      map: createDOMFactory('map'),
      mark: createDOMFactory('mark'),
      menu: createDOMFactory('menu'),
      menuitem: createDOMFactory('menuitem'),
      meta: createDOMFactory('meta'),
      meter: createDOMFactory('meter'),
      nav: createDOMFactory('nav'),
      noscript: createDOMFactory('noscript'),
      object: createDOMFactory('object'),
      ol: createDOMFactory('ol'),
      optgroup: createDOMFactory('optgroup'),
      option: createDOMFactory('option'),
      output: createDOMFactory('output'),
      p: createDOMFactory('p'),
      param: createDOMFactory('param'),
      picture: createDOMFactory('picture'),
      pre: createDOMFactory('pre'),
      progress: createDOMFactory('progress'),
      q: createDOMFactory('q'),
      rp: createDOMFactory('rp'),
      rt: createDOMFactory('rt'),
      ruby: createDOMFactory('ruby'),
      s: createDOMFactory('s'),
      samp: createDOMFactory('samp'),
      script: createDOMFactory('script'),
      section: createDOMFactory('section'),
      select: createDOMFactory('select'),
      small: createDOMFactory('small'),
      source: createDOMFactory('source'),
      span: createDOMFactory('span'),
      strong: createDOMFactory('strong'),
      style: createDOMFactory('style'),
      sub: createDOMFactory('sub'),
      summary: createDOMFactory('summary'),
      sup: createDOMFactory('sup'),
      table: createDOMFactory('table'),
      tbody: createDOMFactory('tbody'),
      td: createDOMFactory('td'),
      textarea: createDOMFactory('textarea'),
      tfoot: createDOMFactory('tfoot'),
      th: createDOMFactory('th'),
      thead: createDOMFactory('thead'),
      time: createDOMFactory('time'),
      title: createDOMFactory('title'),
      tr: createDOMFactory('tr'),
      track: createDOMFactory('track'),
      u: createDOMFactory('u'),
      ul: createDOMFactory('ul'),
      var: createDOMFactory('var'),
      video: createDOMFactory('video'),
      wbr: createDOMFactory('wbr'),
      // SVG
      circle: createDOMFactory('circle'),
      clipPath: createDOMFactory('clipPath'),
      defs: createDOMFactory('defs'),
      ellipse: createDOMFactory('ellipse'),
      g: createDOMFactory('g'),
      image: createDOMFactory('image'),
      line: createDOMFactory('line'),
      linearGradient: createDOMFactory('linearGradient'),
      mask: createDOMFactory('mask'),
      path: createDOMFactory('path'),
      pattern: createDOMFactory('pattern'),
      polygon: createDOMFactory('polygon'),
      polyline: createDOMFactory('polyline'),
      radialGradient: createDOMFactory('radialGradient'),
      rect: createDOMFactory('rect'),
      stop: createDOMFactory('stop'),
      svg: createDOMFactory('svg'),
      text: createDOMFactory('text'),
      tspan: createDOMFactory('tspan')
    }; // due to wrapper and conditionals at the top, this will either become
    // `module.exports ReactDOMFactories` if that is available,
    // otherwise it will be defined via `define(['react'], ReactDOMFactories)`
    // if that is available,
    // otherwise it will be defined as global variable.

    return ReactDOMFactories;
  });
});

var QuillComponent = createReactClass({
  displayName: 'Quill',
  mixins: [mixin],
  propTypes: {
    id: propTypes.string,
    className: propTypes.string,
    theme: propTypes.string,
    style: propTypes.object,
    readOnly: propTypes.bool,
    value: propTypes.oneOfType([propTypes.string, propTypes.shape({
      ops: propTypes.array
    })]),
    defaultValue: propTypes.oneOfType([propTypes.string, propTypes.shape({
      ops: propTypes.array
    })]),
    placeholder: propTypes.string,
    tabIndex: propTypes.number,
    bounds: propTypes.oneOfType([propTypes.string, propTypes.element]),
    onChange: propTypes.func,
    onChangeSelection: propTypes.func,
    onFocus: propTypes.func,
    onBlur: propTypes.func,
    onKeyPress: propTypes.func,
    onKeyDown: propTypes.func,
    onKeyUp: propTypes.func,
    preserveWhitespace: propTypes.bool,
    modules: function (props) {
      var isNotObject = propTypes.object.apply(this, arguments);
      if (isNotObject) return isNotObject;
      if (props.modules && props.modules.toolbar && props.modules.toolbar[0] && props.modules.toolbar[0].type) return new Error('Since v1.0.0, React Quill will not create a custom toolbar for you ' + 'anymore. Create a toolbar explictly, or let Quill create one. ' + 'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100');
    },
    toolbar: function (props) {
      if ('toolbar' in props) return new Error('The `toolbar` prop has been deprecated. Use `modules.toolbar` instead. ' + 'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100');
    },
    formats: function (props) {
      var isNotArrayOfString = propTypes.arrayOf(propTypes.string).apply(this, arguments);
      if (isNotArrayOfString) return new Error('You cannot specify custom `formats` anymore. Use Parchment instead.  ' + 'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.');
    },
    styles: function (props) {
      if ('styles' in props) return new Error('The `styles` prop has been deprecated. Use custom stylesheets instead. ' + 'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.');
    },
    pollInterval: function (props) {
      if ('pollInterval' in props) return new Error('The `pollInterval` property does not have any effect anymore. ' + 'You can safely remove it from your props.' + 'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v100.');
    },
    children: function (props) {
      // Validate that the editor has only one child element and it is not a <textarea>
      var isNotASingleElement = propTypes.element.apply(this, arguments);
      if (isNotASingleElement) return new Error('The Quill editing area can only be composed of a single React element.');

      if (React.Children.count(props.children)) {
        var child = React.Children.only(props.children);
        if (child.type === 'textarea') return new Error('Quill does not support editing on a <textarea>. Use a <div> instead.');
      }
    }
  },

  /*
  Changing one of these props should cause a full re-render.
  */
  dirtyProps: ['modules', 'formats', 'bounds', 'theme', 'children'],

  /*
  Changing one of these props should cause a regular update.
  */
  cleanProps: ['id', 'className', 'style', 'placeholder', 'tabIndex', 'onChange', 'onChangeSelection', 'onFocus', 'onBlur', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
  getDefaultProps: function () {
    return {
      theme: 'snow',
      modules: {}
    };
  },

  /*
  We consider the component to be controlled if `value` is being sent in props.
  */
  isControlled: function () {
    return 'value' in this.props;
  },
  getInitialState: function () {
    return {
      generation: 0,
      value: this.isControlled() ? this.props.value : this.props.defaultValue
    };
  },
  componentWillReceiveProps: function (nextProps, nextState) {
    var editor = this.editor; // If the component is unmounted and mounted too quickly
    // an error is thrown in setEditorContents since editor is
    // still undefined. Must check if editor is undefined
    // before performing this call.

    if (!editor) return; // Update only if we've been passed a new `value`.
    // This leaves components using `defaultValue` alone.

    if ('value' in nextProps) {
      var currentContents = this.getEditorContents();
      var nextContents = nextProps.value;
      if (nextContents === this.lastDeltaChangeSet) throw new Error('You are passing the `delta` object from the `onChange` event back ' + 'as `value`. You most probably want `editor.getContents()` instead. ' + 'See: https://github.com/zenoamaro/react-quill#using-deltas'); // NOTE: Seeing that Quill is missing a way to prevent
      //       edits, we have to settle for a hybrid between
      //       controlled and uncontrolled mode. We can't prevent
      //       the change, but we'll still override content
      //       whenever `value` differs from current state.
      // NOTE: Comparing an HTML string and a Quill Delta will always trigger 
      //       a change, regardless of whether they represent the same document.

      if (!this.isEqualValue(nextContents, currentContents)) {
        this.setEditorContents(editor, nextContents);
      }
    } // We can update readOnly state in-place.


    if ('readOnly' in nextProps) {
      if (nextProps.readOnly !== this.props.readOnly) {
        this.setEditorReadOnly(editor, nextProps.readOnly);
      }
    } // If we need to regenerate the component, we can avoid a detailed
    // in-place update step, and just let everything rerender.


    if (this.shouldComponentRegenerate(nextProps, nextState)) {
      return this.regenerate();
    }
  },
  componentDidMount: function () {
    this.editor = this.createEditor(this.getEditingArea(), this.getEditorConfig()); // Restore editor from Quill's native formats in regeneration scenario

    if (this.quillDelta) {
      this.editor.setContents(this.quillDelta);
      this.editor.setSelection(this.quillSelection);
      this.editor.focus();
      this.quillDelta = this.quillSelection = null;
      return;
    }

    if (this.state.value) {
      this.setEditorContents(this.editor, this.state.value);
      return;
    }
  },
  componentWillUnmount: function () {
    var editor;

    if (editor = this.getEditor()) {
      this.unhookEditor(editor);
      this.editor = null;
    }
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    var self = this; // If the component has been regenerated, we already know we should update.

    if (this.state.generation !== nextState.generation) {
      return true;
    } // Compare props that require React updating the DOM.


    return some_1(this.cleanProps, function (prop) {
      // Note that `isEqual` compares deeply, making it safe to perform
      // non-immutable updates, at the cost of performance.
      return !isEqual_1(nextProps[prop], self.props[prop]);
    });
  },
  shouldComponentRegenerate: function (nextProps, nextState) {
    var self = this; // Whenever a `dirtyProp` changes, the editor needs reinstantiation.

    return some_1(this.dirtyProps, function (prop) {
      // Note that `isEqual` compares deeply, making it safe to perform
      // non-immutable updates, at the cost of performance.
      return !isEqual_1(nextProps[prop], self.props[prop]);
    });
  },

  /*
  If we could not update settings from the new props in-place, we have to tear
  down everything and re-render from scratch.
  */
  componentWillUpdate: function (nextProps, nextState) {
    if (this.state.generation !== nextState.generation) {
      this.componentWillUnmount();
    }
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.generation !== prevState.generation) {
      this.componentDidMount();
    }
  },
  getEditorConfig: function () {
    return {
      bounds: this.props.bounds,
      formats: this.props.formats,
      modules: this.props.modules,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly,
      scrollingContainer: this.props.scrollingContainer,
      tabIndex: this.props.tabIndex,
      theme: this.props.theme
    };
  },
  getEditor: function () {
    return this.editor;
  },
  getEditingArea: function () {
    return ReactDOM.findDOMNode(this.editingArea);
  },
  getEditorContents: function () {
    return this.state.value;
  },
  getEditorSelection: function () {
    return this.state.selection;
  },

  /*
  True if the value is a Delta instance or a Delta look-alike.
  */
  isDelta: function (value) {
    return value && value.ops;
  },

  /*
  Special comparison function that knows how to compare Deltas.
  */
  isEqualValue: function (value, nextValue) {
    if (this.isDelta(value) && this.isDelta(nextValue)) {
      return isEqual_1(value.ops, nextValue.ops);
    } else {
      return isEqual_1(value, nextValue);
    }
  },

  /*
  Regenerating the editor will cause the whole tree, including the container,
  to be cleaned up and re-rendered from scratch.
  */
  regenerate: function () {
    // Cache selection and contents in Quill's native format to be restored later
    this.quillDelta = this.editor.getContents();
    this.quillSelection = this.editor.getSelection();
    this.setState({
      generation: this.state.generation + 1
    });
  },

  /*
  Renders an editor area, unless it has been provided one to clone.
  */
  renderEditingArea: function () {
    var self = this;
    var children = this.props.children;
    var preserveWhitespace = this.props.preserveWhitespace;
    var properties = {
      key: this.state.generation,
      tabIndex: this.props.tabIndex,
      ref: function (element) {
        self.editingArea = element;
      }
    };
    var customElement = React.Children.count(children) ? React.Children.only(children) : null;
    var defaultElement = preserveWhitespace ? reactDomFactories.pre : reactDomFactories.div;
    var editingArea = customElement ? React.cloneElement(customElement, properties) : defaultElement(properties);
    return editingArea;
  },
  render: function () {
    return reactDomFactories.div({
      id: this.props.id,
      style: this.props.style,
      key: this.state.generation,
      className: ['quill'].concat(this.props.className).join(' '),
      onKeyPress: this.props.onKeyPress,
      onKeyDown: this.props.onKeyDown,
      onKeyUp: this.props.onKeyUp
    }, this.renderEditingArea());
  },
  onEditorChangeText: function (value, delta, source, editor) {
    var currentContents = this.getEditorContents(); // We keep storing the same type of value as what the user gives us,
    // so that value comparisons will be more stable and predictable.

    var nextContents = this.isDelta(currentContents) ? editor.getContents() : editor.getHTML();

    if (!this.isEqualValue(nextContents, currentContents)) {
      // Taint this `delta` object, so we can recognize whether the user
      // is trying to send it back as `value`, preventing a likely loop.
      this.lastDeltaChangeSet = delta;
      this.setState({
        value: nextContents
      });

      if (this.props.onChange) {
        this.props.onChange(value, delta, source, editor);
      }
    }
  },
  onEditorChangeSelection: function (nextSelection, source, editor) {
    var currentSelection = this.getEditorSelection();
    var hasGainedFocus = !currentSelection && nextSelection;
    var hasLostFocus = currentSelection && !nextSelection;

    if (isEqual_1(nextSelection, currentSelection)) {
      return;
    }

    this.setState({
      selection: nextSelection
    });

    if (this.props.onChangeSelection) {
      this.props.onChangeSelection(nextSelection, source, editor);
    }

    if (hasGainedFocus && this.props.onFocus) {
      this.props.onFocus(nextSelection, source, editor);
    } else if (hasLostFocus && this.props.onBlur) {
      this.props.onBlur(currentSelection, source, editor);
    }
  },
  focus: function () {
    this.editor.focus();
  },
  blur: function () {
    this.setEditorSelection(this.editor, null);
  }
});
var component = QuillComponent;

/** @license React v17.0.2
 * react-dom-server.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var q = 60106,
    r = 60107,
    u = 60108,
    z = 60114,
    B = 60109,
    aa = 60110,
    ba = 60112,
    D = 60113,
    ca = 60120,
    da = 60115,
    ea = 60116,
    fa = 60121,
    ha = 60117,
    ia = 60119,
    ja = 60129,
    ka = 60131;

if ("function" === typeof Symbol && Symbol.for) {
  var E = Symbol.for;
  q = E("react.portal");
  r = E("react.fragment");
  u = E("react.strict_mode");
  z = E("react.profiler");
  B = E("react.provider");
  aa = E("react.context");
  ba = E("react.forward_ref");
  D = E("react.suspense");
  ca = E("react.suspense_list");
  da = E("react.memo");
  ea = E("react.lazy");
  fa = E("react.block");
  ha = E("react.fundamental");
  ia = E("react.scope");
  ja = E("react.debug_trace_mode");
  ka = E("react.legacy_hidden");
}

function F(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;

  switch (a) {
    case r:
      return "Fragment";

    case q:
      return "Portal";

    case z:
      return "Profiler";

    case u:
      return "StrictMode";

    case D:
      return "Suspense";

    case ca:
      return "SuspenseList";
  }

  if ("object" === typeof a) switch (a.$$typeof) {
    case aa:
      return (a.displayName || "Context") + ".Consumer";

    case B:
      return (a._context.displayName || "Context") + ".Provider";

    case ba:
      var b = a.render;
      b = b.displayName || b.name || "";
      return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");

    case da:
      return F(a.type);

    case fa:
      return F(a._render);

    case ea:
      b = a._payload;
      a = a._init;

      try {
        return F(a(b));
      } catch (c) {}

  }
  return null;
}

var la = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    ma = {};

function I(a, b) {
  for (var c = a._threadCount | 0; c <= b; c++) a[c] = a._currentValue2, a._threadCount = c + 1;
}

function na(a, b, c, d) {
  if (d && (d = a.contextType, "object" === typeof d && null !== d)) return I(d, c), d[c];

  if (a = a.contextTypes) {
    c = {};

    for (var f in a) c[f] = b[f];

    b = c;
  } else b = ma;

  return b;
}

for (var J = new Uint16Array(16), K = 0; 15 > K; K++) J[K] = K + 1;

J[15] = 0;
var oa = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    pa = Object.prototype.hasOwnProperty,
    qa = {},
    ra = {};

function sa(a) {
  if (pa.call(ra, a)) return !0;
  if (pa.call(qa, a)) return !1;
  if (oa.test(a)) return ra[a] = !0;
  qa[a] = !0;
  return !1;
}

function ta(a, b, c, d) {
  if (null !== c && 0 === c.type) return !1;

  switch (typeof b) {
    case "function":
    case "symbol":
      return !0;

    case "boolean":
      if (d) return !1;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;

    default:
      return !1;
  }
}

function ua(a, b, c, d) {
  if (null === b || "undefined" === typeof b || ta(a, b, c, d)) return !0;
  if (d) return !1;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;

    case 4:
      return !1 === b;

    case 5:
      return isNaN(b);

    case 6:
      return isNaN(b) || 1 > b;
  }
  return !1;
}

function M(a, b, c, d, f, h, t) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = f;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = h;
  this.removeEmptyString = t;
}

var N = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
  N[a] = new M(a, 0, !1, a, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
  var b = a[0];
  N[b] = new M(b, 1, !1, a[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
  N[a] = new M(a, 2, !1, a.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (a) {
  N[a] = new M(a, 2, !1, a, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
  N[a] = new M(a, 3, !1, a.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function (a) {
  N[a] = new M(a, 3, !0, a, null, !1, !1);
});
["capture", "download"].forEach(function (a) {
  N[a] = new M(a, 4, !1, a, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (a) {
  N[a] = new M(a, 6, !1, a, null, !1, !1);
});
["rowSpan", "start"].forEach(function (a) {
  N[a] = new M(a, 5, !1, a.toLowerCase(), null, !1, !1);
});
var va = /[\-:]([a-z])/g;

function wa(a) {
  return a[1].toUpperCase();
}

"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
  var b = a.replace(va, wa);
  N[b] = new M(b, 1, !1, a, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
  var b = a.replace(va, wa);
  N[b] = new M(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
  var b = a.replace(va, wa);
  N[b] = new M(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (a) {
  N[a] = new M(a, 1, !1, a.toLowerCase(), null, !1, !1);
});
N.xlinkHref = new M("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (a) {
  N[a] = new M(a, 1, !1, a.toLowerCase(), null, !0, !0);
});
var xa = /["'&<>]/;

function O(a) {
  if ("boolean" === typeof a || "number" === typeof a) return "" + a;
  a = "" + a;
  var b = xa.exec(a);

  if (b) {
    var c = "",
        d,
        f = 0;

    for (d = b.index; d < a.length; d++) {
      switch (a.charCodeAt(d)) {
        case 34:
          b = "&quot;";
          break;

        case 38:
          b = "&amp;";
          break;

        case 39:
          b = "&#x27;";
          break;

        case 60:
          b = "&lt;";
          break;

        case 62:
          b = "&gt;";
          break;

        default:
          continue;
      }

      f !== d && (c += a.substring(f, d));
      f = d + 1;
      c += b;
    }

    a = f !== d ? c + a.substring(f, d) : c;
  }

  return a;
}

function ya(a, b) {
  var c = N.hasOwnProperty(a) ? N[a] : null;
  var d;
  if (d = "style" !== a) d = null !== c ? 0 === c.type : !(2 < a.length) || "o" !== a[0] && "O" !== a[0] || "n" !== a[1] && "N" !== a[1] ? !1 : !0;
  if (d || ua(a, b, c, !1)) return "";

  if (null !== c) {
    a = c.attributeName;
    d = c.type;
    if (3 === d || 4 === d && !0 === b) return a + '=""';
    c.sanitizeURL && (b = "" + b);
    return a + '="' + (O(b) + '"');
  }

  return sa(a) ? a + '="' + (O(b) + '"') : "";
}

function za(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}

var Aa = "function" === typeof Object.is ? Object.is : za,
    P = null,
    Q = null,
    R = null,
    S = !1,
    T = !1,
    U = null,
    V = 0;

function W() {
  if (null === P) throw Error(p(321));
  return P;
}

function Ba() {
  if (0 < V) throw Error(p(312));
  return {
    memoizedState: null,
    queue: null,
    next: null
  };
}

function Ca() {
  null === R ? null === Q ? (S = !1, Q = R = Ba()) : (S = !0, R = Q) : null === R.next ? (S = !1, R = R.next = Ba()) : (S = !0, R = R.next);
  return R;
}

function Da(a, b, c, d) {
  for (; T;) T = !1, V += 1, R = null, c = a(b, d);

  Ea();
  return c;
}

function Ea() {
  P = null;
  T = !1;
  Q = null;
  V = 0;
  R = U = null;
}

function Fa(a, b) {
  return "function" === typeof b ? b(a) : b;
}

function Ga(a, b, c) {
  P = W();
  R = Ca();

  if (S) {
    var d = R.queue;
    b = d.dispatch;

    if (null !== U && (c = U.get(d), void 0 !== c)) {
      U.delete(d);
      d = R.memoizedState;

      do d = a(d, c.action), c = c.next; while (null !== c);

      R.memoizedState = d;
      return [d, b];
    }

    return [R.memoizedState, b];
  }

  a = a === Fa ? "function" === typeof b ? b() : b : void 0 !== c ? c(b) : b;
  R.memoizedState = a;
  a = R.queue = {
    last: null,
    dispatch: null
  };
  a = a.dispatch = Ha.bind(null, P, a);
  return [R.memoizedState, a];
}

function Ia(a, b) {
  P = W();
  R = Ca();
  b = void 0 === b ? null : b;

  if (null !== R) {
    var c = R.memoizedState;

    if (null !== c && null !== b) {
      var d = c[1];

      a: if (null === d) d = !1;else {
        for (var f = 0; f < d.length && f < b.length; f++) if (!Aa(b[f], d[f])) {
          d = !1;
          break a;
        }

        d = !0;
      }

      if (d) return c[0];
    }
  }

  a = a();
  R.memoizedState = [a, b];
  return a;
}

function Ha(a, b, c) {
  if (!(25 > V)) throw Error(p(301));
  if (a === P) if (T = !0, a = {
    action: c,
    next: null
  }, null === U && (U = new Map()), c = U.get(b), void 0 === c) U.set(b, a);else {
    for (b = c; null !== b.next;) b = b.next;

    b.next = a;
  }
}

function Ja() {}

var X = null,
    Ka = {
  readContext: function (a) {
    var b = X.threadID;
    I(a, b);
    return a[b];
  },
  useContext: function (a) {
    W();
    var b = X.threadID;
    I(a, b);
    return a[b];
  },
  useMemo: Ia,
  useReducer: Ga,
  useRef: function (a) {
    P = W();
    R = Ca();
    var b = R.memoizedState;
    return null === b ? (a = {
      current: a
    }, R.memoizedState = a) : b;
  },
  useState: function (a) {
    return Ga(Fa, a);
  },
  useLayoutEffect: function () {},
  useCallback: function (a, b) {
    return Ia(function () {
      return a;
    }, b);
  },
  useImperativeHandle: Ja,
  useEffect: Ja,
  useDebugValue: Ja,
  useDeferredValue: function (a) {
    W();
    return a;
  },
  useTransition: function () {
    W();
    return [function (a) {
      a();
    }, !1];
  },
  useOpaqueIdentifier: function () {
    return (X.identifierPrefix || "") + "R:" + (X.uniqueID++).toString(36);
  },
  useMutableSource: function (a, b) {
    W();
    return b(a._source);
  }
},
    La = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};

function Ma(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";

    case "math":
      return "http://www.w3.org/1998/Math/MathML";

    default:
      return "http://www.w3.org/1999/xhtml";
  }
}

var Na = {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
},
    Oa = objectAssign({
  menuitem: !0
}, Na),
    Y = {
  animationIterationCount: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
},
    Pa = ["Webkit", "ms", "Moz", "O"];
Object.keys(Y).forEach(function (a) {
  Pa.forEach(function (b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    Y[b] = Y[a];
  });
});
var Qa = /([A-Z])/g,
    Ra = /^ms-/,
    Z = React.Children.toArray,
    Sa = la.ReactCurrentDispatcher,
    Ta = {
  listing: !0,
  pre: !0,
  textarea: !0
},
    Ua = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
    Va = {},
    Wa = {};

function Xa(a) {
  if (void 0 === a || null === a) return a;
  var b = "";
  React.Children.forEach(a, function (a) {
    null != a && (b += a);
  });
  return b;
}

var Ya = Object.prototype.hasOwnProperty,
    Za = {
  children: null,
  dangerouslySetInnerHTML: null,
  suppressContentEditableWarning: null,
  suppressHydrationWarning: null
};

function $a(a, b) {
  if (void 0 === a) throw Error(p(152, F(b) || "Component"));
}

function ab(a, b, c) {
  function d(d, h) {
    var e = h.prototype && h.prototype.isReactComponent,
        f = na(h, b, c, e),
        t = [],
        g = !1,
        n = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {
        if (null === t) return null;
      },
      enqueueReplaceState: function (a, c) {
        g = !0;
        t = [c];
      },
      enqueueSetState: function (a, c) {
        if (null === t) return null;
        t.push(c);
      }
    };

    if (e) {
      if (e = new h(d.props, f, n), "function" === typeof h.getDerivedStateFromProps) {
        var k = h.getDerivedStateFromProps.call(null, d.props, e.state);
        null != k && (e.state = objectAssign({}, e.state, k));
      }
    } else if (P = {}, e = h(d.props, f, n), e = Da(h, d.props, e, f), null == e || null == e.render) {
      a = e;
      $a(a, h);
      return;
    }

    e.props = d.props;
    e.context = f;
    e.updater = n;
    n = e.state;
    void 0 === n && (e.state = n = null);
    if ("function" === typeof e.UNSAFE_componentWillMount || "function" === typeof e.componentWillMount) if ("function" === typeof e.componentWillMount && "function" !== typeof h.getDerivedStateFromProps && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && "function" !== typeof h.getDerivedStateFromProps && e.UNSAFE_componentWillMount(), t.length) {
      n = t;
      var v = g;
      t = null;
      g = !1;
      if (v && 1 === n.length) e.state = n[0];else {
        k = v ? n[0] : e.state;
        var H = !0;

        for (v = v ? 1 : 0; v < n.length; v++) {
          var x = n[v];
          x = "function" === typeof x ? x.call(e, k, d.props, f) : x;
          null != x && (H ? (H = !1, k = objectAssign({}, k, x)) : objectAssign(k, x));
        }

        e.state = k;
      }
    } else t = null;
    a = e.render();
    $a(a, h);

    if ("function" === typeof e.getChildContext && (d = h.childContextTypes, "object" === typeof d)) {
      var y = e.getChildContext();

      for (var A in y) if (!(A in d)) throw Error(p(108, F(h) || "Unknown", A));
    }

    y && (b = objectAssign({}, b, y));
  }

  for (; React.isValidElement(a);) {
    var f = a,
        h = f.type;
    if ("function" !== typeof h) break;
    d(f, h);
  }

  return {
    child: a,
    context: b
  };
}

var bb = function () {
  function a(a, b, f) {
    React.isValidElement(a) ? a.type !== r ? a = [a] : (a = a.props.children, a = React.isValidElement(a) ? [a] : Z(a)) : a = Z(a);
    a = {
      type: null,
      domNamespace: La.html,
      children: a,
      childIndex: 0,
      context: ma,
      footer: ""
    };
    var c = J[0];

    if (0 === c) {
      var d = J;
      c = d.length;
      var g = 2 * c;
      if (!(65536 >= g)) throw Error(p(304));
      var e = new Uint16Array(g);
      e.set(d);
      J = e;
      J[0] = c + 1;

      for (d = c; d < g - 1; d++) J[d] = d + 1;

      J[g - 1] = 0;
    } else J[0] = J[c];

    this.threadID = c;
    this.stack = [a];
    this.exhausted = !1;
    this.currentSelectValue = null;
    this.previousWasTextNode = !1;
    this.makeStaticMarkup = b;
    this.suspenseDepth = 0;
    this.contextIndex = -1;
    this.contextStack = [];
    this.contextValueStack = [];
    this.uniqueID = 0;
    this.identifierPrefix = f && f.identifierPrefix || "";
  }

  var b = a.prototype;

  b.destroy = function () {
    if (!this.exhausted) {
      this.exhausted = !0;
      this.clearProviders();
      var a = this.threadID;
      J[a] = J[0];
      J[0] = a;
    }
  };

  b.pushProvider = function (a) {
    var b = ++this.contextIndex,
        c = a.type._context,
        h = this.threadID;
    I(c, h);
    var t = c[h];
    this.contextStack[b] = c;
    this.contextValueStack[b] = t;
    c[h] = a.props.value;
  };

  b.popProvider = function () {
    var a = this.contextIndex,
        b = this.contextStack[a],
        f = this.contextValueStack[a];
    this.contextStack[a] = null;
    this.contextValueStack[a] = null;
    this.contextIndex--;
    b[this.threadID] = f;
  };

  b.clearProviders = function () {
    for (var a = this.contextIndex; 0 <= a; a--) this.contextStack[a][this.threadID] = this.contextValueStack[a];
  };

  b.read = function (a) {
    if (this.exhausted) return null;
    var b = X;
    X = this;
    var c = Sa.current;
    Sa.current = Ka;

    try {
      for (var h = [""], t = !1; h[0].length < a;) {
        if (0 === this.stack.length) {
          this.exhausted = !0;
          var g = this.threadID;
          J[g] = J[0];
          J[0] = g;
          break;
        }

        var e = this.stack[this.stack.length - 1];

        if (t || e.childIndex >= e.children.length) {
          var L = e.footer;
          "" !== L && (this.previousWasTextNode = !1);
          this.stack.pop();
          if ("select" === e.type) this.currentSelectValue = null;else if (null != e.type && null != e.type.type && e.type.type.$$typeof === B) this.popProvider(e.type);else if (e.type === D) {
            this.suspenseDepth--;
            var G = h.pop();

            if (t) {
              t = !1;
              var C = e.fallbackFrame;
              if (!C) throw Error(p(303));
              this.stack.push(C);
              h[this.suspenseDepth] += "\x3c!--$!--\x3e";
              continue;
            } else h[this.suspenseDepth] += G;
          }
          h[this.suspenseDepth] += L;
        } else {
          var n = e.children[e.childIndex++],
              k = "";

          try {
            k += this.render(n, e.context, e.domNamespace);
          } catch (v) {
            if (null != v && "function" === typeof v.then) throw Error(p(294));
            throw v;
          } finally {}

          h.length <= this.suspenseDepth && h.push("");
          h[this.suspenseDepth] += k;
        }
      }

      return h[0];
    } finally {
      Sa.current = c, X = b, Ea();
    }
  };

  b.render = function (a, b, f) {
    if ("string" === typeof a || "number" === typeof a) {
      f = "" + a;
      if ("" === f) return "";
      if (this.makeStaticMarkup) return O(f);
      if (this.previousWasTextNode) return "\x3c!-- --\x3e" + O(f);
      this.previousWasTextNode = !0;
      return O(f);
    }

    b = ab(a, b, this.threadID);
    a = b.child;
    b = b.context;
    if (null === a || !1 === a) return "";

    if (!React.isValidElement(a)) {
      if (null != a && null != a.$$typeof) {
        f = a.$$typeof;
        if (f === q) throw Error(p(257));
        throw Error(p(258, f.toString()));
      }

      a = Z(a);
      this.stack.push({
        type: null,
        domNamespace: f,
        children: a,
        childIndex: 0,
        context: b,
        footer: ""
      });
      return "";
    }

    var c = a.type;
    if ("string" === typeof c) return this.renderDOM(a, b, f);

    switch (c) {
      case ka:
      case ja:
      case u:
      case z:
      case ca:
      case r:
        return a = Z(a.props.children), this.stack.push({
          type: null,
          domNamespace: f,
          children: a,
          childIndex: 0,
          context: b,
          footer: ""
        }), "";

      case D:
        throw Error(p(294));

      case ia:
        throw Error(p(343));
    }

    if ("object" === typeof c && null !== c) switch (c.$$typeof) {
      case ba:
        P = {};
        var d = c.render(a.props, a.ref);
        d = Da(c.render, a.props, d, a.ref);
        d = Z(d);
        this.stack.push({
          type: null,
          domNamespace: f,
          children: d,
          childIndex: 0,
          context: b,
          footer: ""
        });
        return "";

      case da:
        return a = [React.createElement(c.type, objectAssign({
          ref: a.ref
        }, a.props))], this.stack.push({
          type: null,
          domNamespace: f,
          children: a,
          childIndex: 0,
          context: b,
          footer: ""
        }), "";

      case B:
        return c = Z(a.props.children), f = {
          type: a,
          domNamespace: f,
          children: c,
          childIndex: 0,
          context: b,
          footer: ""
        }, this.pushProvider(a), this.stack.push(f), "";

      case aa:
        c = a.type;
        d = a.props;
        var g = this.threadID;
        I(c, g);
        c = Z(d.children(c[g]));
        this.stack.push({
          type: a,
          domNamespace: f,
          children: c,
          childIndex: 0,
          context: b,
          footer: ""
        });
        return "";

      case ha:
        throw Error(p(338));

      case ea:
        return c = a.type, d = c._init, c = d(c._payload), a = [React.createElement(c, objectAssign({
          ref: a.ref
        }, a.props))], this.stack.push({
          type: null,
          domNamespace: f,
          children: a,
          childIndex: 0,
          context: b,
          footer: ""
        }), "";
    }
    throw Error(p(130, null == c ? c : typeof c, ""));
  };

  b.renderDOM = function (a, b, f) {
    var c = a.type.toLowerCase();

    if (!Va.hasOwnProperty(c)) {
      if (!Ua.test(c)) throw Error(p(65, c));
      Va[c] = !0;
    }

    var d = a.props;
    if ("input" === c) d = objectAssign({
      type: void 0
    }, d, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: null != d.value ? d.value : d.defaultValue,
      checked: null != d.checked ? d.checked : d.defaultChecked
    });else if ("textarea" === c) {
      var g = d.value;

      if (null == g) {
        g = d.defaultValue;
        var e = d.children;

        if (null != e) {
          if (null != g) throw Error(p(92));

          if (Array.isArray(e)) {
            if (!(1 >= e.length)) throw Error(p(93));
            e = e[0];
          }

          g = "" + e;
        }

        null == g && (g = "");
      }

      d = objectAssign({}, d, {
        value: void 0,
        children: "" + g
      });
    } else if ("select" === c) this.currentSelectValue = null != d.value ? d.value : d.defaultValue, d = objectAssign({}, d, {
      value: void 0
    });else if ("option" === c) {
      e = this.currentSelectValue;
      var L = Xa(d.children);

      if (null != e) {
        var G = null != d.value ? d.value + "" : L;
        g = !1;
        if (Array.isArray(e)) for (var C = 0; C < e.length; C++) {
          if ("" + e[C] === G) {
            g = !0;
            break;
          }
        } else g = "" + e === G;
        d = objectAssign({
          selected: void 0,
          children: void 0
        }, d, {
          selected: g,
          children: L
        });
      }
    }

    if (g = d) {
      if (Oa[c] && (null != g.children || null != g.dangerouslySetInnerHTML)) throw Error(p(137, c));

      if (null != g.dangerouslySetInnerHTML) {
        if (null != g.children) throw Error(p(60));
        if (!("object" === typeof g.dangerouslySetInnerHTML && "__html" in g.dangerouslySetInnerHTML)) throw Error(p(61));
      }

      if (null != g.style && "object" !== typeof g.style) throw Error(p(62));
    }

    g = d;
    e = this.makeStaticMarkup;
    L = 1 === this.stack.length;
    G = "<" + a.type;

    b: if (-1 === c.indexOf("-")) C = "string" === typeof g.is;else switch (c) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        C = !1;
        break b;

      default:
        C = !0;
    }

    for (w in g) if (Ya.call(g, w)) {
      var n = g[w];

      if (null != n) {
        if ("style" === w) {
          var k = void 0,
              v = "",
              H = "";

          for (k in n) if (n.hasOwnProperty(k)) {
            var x = 0 === k.indexOf("--"),
                y = n[k];

            if (null != y) {
              if (x) var A = k;else if (A = k, Wa.hasOwnProperty(A)) A = Wa[A];else {
                var cb = A.replace(Qa, "-$1").toLowerCase().replace(Ra, "-ms-");
                A = Wa[A] = cb;
              }
              v += H + A + ":";
              H = k;
              x = null == y || "boolean" === typeof y || "" === y ? "" : x || "number" !== typeof y || 0 === y || Y.hasOwnProperty(H) && Y[H] ? ("" + y).trim() : y + "px";
              v += x;
              H = ";";
            }
          }

          n = v || null;
        }

        k = null;
        C ? Za.hasOwnProperty(w) || (k = w, k = sa(k) && null != n ? k + '="' + (O(n) + '"') : "") : k = ya(w, n);
        k && (G += " " + k);
      }
    }

    e || L && (G += ' data-reactroot=""');
    var w = G;
    g = "";
    Na.hasOwnProperty(c) ? w += "/>" : (w += ">", g = "</" + a.type + ">");

    a: {
      e = d.dangerouslySetInnerHTML;

      if (null != e) {
        if (null != e.__html) {
          e = e.__html;
          break a;
        }
      } else if (e = d.children, "string" === typeof e || "number" === typeof e) {
        e = O(e);
        break a;
      }

      e = null;
    }

    null != e ? (d = [], Ta.hasOwnProperty(c) && "\n" === e.charAt(0) && (w += "\n"), w += e) : d = Z(d.children);
    a = a.type;
    f = null == f || "http://www.w3.org/1999/xhtml" === f ? Ma(a) : "http://www.w3.org/2000/svg" === f && "foreignObject" === a ? "http://www.w3.org/1999/xhtml" : f;
    this.stack.push({
      domNamespace: f,
      type: c,
      children: d,
      childIndex: 0,
      context: b,
      footer: g
    });
    this.previousWasTextNode = !1;
    return w;
  };

  return a;
}();

var renderToNodeStream = function () {
  throw Error(p(207));
};

var renderToStaticMarkup = function (a, b) {
  a = new bb(a, !0, b);

  try {
    return a.read(Infinity);
  } finally {
    a.destroy();
  }
};

var renderToStaticNodeStream = function () {
  throw Error(p(208));
};

var renderToString = function (a, b) {
  a = new bb(a, !1, b);

  try {
    return a.read(Infinity);
  } finally {
    a.destroy();
  }
};

var version = "17.0.2";
var reactDomServer_browser_production_min = {
  renderToNodeStream: renderToNodeStream,
  renderToStaticMarkup: renderToStaticMarkup,
  renderToStaticNodeStream: renderToStaticNodeStream,
  renderToString: renderToString,
  version: version
};

/** @license React v17.0.2
 * react-dom-server.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var reactDomServer_browser_development = createCommonjsModule(function (module, exports) {

  if (process.env.NODE_ENV !== "production") {
    (function () {

      var React$1 = React;
      var _assign = objectAssign; // Do not require this module directly! Use normal `invariant` calls with
      // template literal strings. The messages will be replaced with error codes
      // during build.

      function formatProdErrorMessage(code) {
        var url = 'https://reactjs.org/docs/error-decoder.html?invariant=' + code;

        for (var i = 1; i < arguments.length; i++) {
          url += '&args[]=' + encodeURIComponent(arguments[i]);
        }

        return "Minified React error #" + code + "; visit " + url + " for the full message or " + 'use the non-minified dev environment for full errors and additional ' + 'helpful warnings.';
      } // TODO: this is special because it gets imported during build.


      var ReactVersion = '17.0.2';
      var ReactSharedInternals = React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED; // by calls to these methods by a Babel plugin.
      //
      // In PROD (or in packages without access to React internals),
      // they are left as they are instead.

      function warn(format) {
        {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          printWarning('warn', format, args);
        }
      }

      function error(format) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          printWarning('error', format, args);
        }
      }

      function printWarning(level, format, args) {
        // When changing this logic, you might want to also
        // update consoleWithStackDev.www.js as well.
        {
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame.getStackAddendum();

          if (stack !== '') {
            format += '%s';
            args = args.concat([stack]);
          }

          var argsWithFormat = args.map(function (item) {
            return '' + item;
          }); // Careful: RN currently depends on this prefix

          argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
          // breaks IE9: https://github.com/facebook/react/issues/13610
          // eslint-disable-next-line react-internal/no-production-logging

          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      } // ATTENTION
      var REACT_PORTAL_TYPE = 0xeaca;
      var REACT_FRAGMENT_TYPE = 0xeacb;
      var REACT_STRICT_MODE_TYPE = 0xeacc;
      var REACT_PROFILER_TYPE = 0xead2;
      var REACT_PROVIDER_TYPE = 0xeacd;
      var REACT_CONTEXT_TYPE = 0xeace;
      var REACT_FORWARD_REF_TYPE = 0xead0;
      var REACT_SUSPENSE_TYPE = 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = 0xead8;
      var REACT_MEMO_TYPE = 0xead3;
      var REACT_LAZY_TYPE = 0xead4;
      var REACT_BLOCK_TYPE = 0xead9;
      var REACT_FUNDAMENTAL_TYPE = 0xead5;
      var REACT_SCOPE_TYPE = 0xead7;
      var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
      var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

      if (typeof Symbol === 'function' && Symbol.for) {
        var symbolFor = Symbol.for;
        symbolFor('react.element');
        REACT_PORTAL_TYPE = symbolFor('react.portal');
        REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
        REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
        REACT_PROFILER_TYPE = symbolFor('react.profiler');
        REACT_PROVIDER_TYPE = symbolFor('react.provider');
        REACT_CONTEXT_TYPE = symbolFor('react.context');
        REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
        REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
        REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
        REACT_MEMO_TYPE = symbolFor('react.memo');
        REACT_LAZY_TYPE = symbolFor('react.lazy');
        REACT_BLOCK_TYPE = symbolFor('react.block');
        symbolFor('react.server.block');
        REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
        REACT_SCOPE_TYPE = symbolFor('react.scope');
        symbolFor('react.opaque.id');
        REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
        symbolFor('react.offscreen');
        REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
      }

      function getWrappedName(outerType, innerType, wrapperName) {
        var functionName = innerType.displayName || innerType.name || '';
        return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
      }

      function getContextName(type) {
        return type.displayName || 'Context';
      }

      function getComponentName(type) {
        if (type == null) {
          // Host root, text node or just invalid type.
          return null;
        }

        {
          if (typeof type.tag === 'number') {
            error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
          }
        }

        if (typeof type === 'function') {
          return type.displayName || type.name || null;
        }

        if (typeof type === 'string') {
          return type;
        }

        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return 'Fragment';

          case REACT_PORTAL_TYPE:
            return 'Portal';

          case REACT_PROFILER_TYPE:
            return 'Profiler';

          case REACT_STRICT_MODE_TYPE:
            return 'StrictMode';

          case REACT_SUSPENSE_TYPE:
            return 'Suspense';

          case REACT_SUSPENSE_LIST_TYPE:
            return 'SuspenseList';
        }

        if (typeof type === 'object') {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + '.Consumer';

            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + '.Provider';

            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, 'ForwardRef');

            case REACT_MEMO_TYPE:
              return getComponentName(type.type);

            case REACT_BLOCK_TYPE:
              return getComponentName(type._render);

            case REACT_LAZY_TYPE:
              {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;

                try {
                  return getComponentName(init(payload));
                } catch (x) {
                  return null;
                }
              }
          }
        }

        return null;
      } // Filter certain DOM attributes (e.g. src, href) if their values are empty strings.


      var enableSuspenseServerRenderer = false; // Helpers to patch console.logs to avoid logging during side-effect free
      // replaying on render function. This currently only patches the object
      // lazily which won't cover if the log function was extracted eagerly.
      // We could also eagerly patch the method.

      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;

      function disabledLog() {}

      disabledLog.__reactDisabledLog = true;

      function disableLogs() {
        {
          if (disabledDepth === 0) {
            /* eslint-disable react-internal/no-production-logging */
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            }; // $FlowFixMe Flow thinks console is immutable.

            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
            /* eslint-enable react-internal/no-production-logging */
          }

          disabledDepth++;
        }
      }

      function reenableLogs() {
        {
          disabledDepth--;

          if (disabledDepth === 0) {
            /* eslint-disable react-internal/no-production-logging */
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            }; // $FlowFixMe Flow thinks console is immutable.

            Object.defineProperties(console, {
              log: _assign({}, props, {
                value: prevLog
              }),
              info: _assign({}, props, {
                value: prevInfo
              }),
              warn: _assign({}, props, {
                value: prevWarn
              }),
              error: _assign({}, props, {
                value: prevError
              }),
              group: _assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: _assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: _assign({}, props, {
                value: prevGroupEnd
              })
            });
            /* eslint-enable react-internal/no-production-logging */
          }

          if (disabledDepth < 0) {
            error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
          }
        }
      }

      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;

      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === undefined) {
            // Extract the VM specific prefix used by each line.
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || '';
            }
          } // We use the prefix to ensure our stacks line up with native stack frames.


          return '\n' + prefix + name;
        }
      }

      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }

      function describeNativeComponentFrame(fn, construct) {
        // If something asked for a stack inside a fake render, it should get ignored.
        if (!fn || reentry) {
          return '';
        }

        {
          var frame = componentFrameCache.get(fn);

          if (frame !== undefined) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

        Error.prepareStackTrace = undefined;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
          // for warnings.

          ReactCurrentDispatcher.current = null;
          disableLogs();
        }

        try {
          // This should throw.
          if (construct) {
            // Something should be setting the props in the constructor.
            var Fake = function () {
              throw Error();
            }; // $FlowFixMe


            Object.defineProperty(Fake.prototype, 'props', {
              set: function () {
                // We use a throwing setter instead of frozen or non-writable props
                // because that won't throw in a non-strict mode function.
                throw Error();
              }
            });

            if (typeof Reflect === 'object' && Reflect.construct) {
              // We construct a different control for this case to include any extra
              // frames added by the construct call.
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }

              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }

              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }

            fn();
          }
        } catch (sample) {
          // This is inlined manually because closure doesn't do it for us.
          if (sample && control && typeof sample.stack === 'string') {
            // This extracts the first frame from the sample that isn't also in the control.
            // Skipping one frame that we assume is the frame that calls the two.
            var sampleLines = sample.stack.split('\n');
            var controlLines = control.stack.split('\n');
            var s = sampleLines.length - 1;
            var c = controlLines.length - 1;

            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
              // We expect at least one stack frame to be shared.
              // Typically this will be the root most one. However, stack frames may be
              // cut off due to maximum stack limits. In this case, one maybe cut off
              // earlier than the other. We assume that the sample is longer or the same
              // and there for cut off earlier. So we should find the root most frame in
              // the sample somewhere in the control.
              c--;
            }

            for (; s >= 1 && c >= 0; s--, c--) {
              // Next we find the first one that isn't the same which should be the
              // frame that called our sample function and the control.
              if (sampleLines[s] !== controlLines[c]) {
                // In V8, the first line is describing the message but other VMs don't.
                // If we're about to return the first line, and the control is also on the same
                // line, that's a pretty good indicator that our sample threw at same line as
                // the control. I.e. before we entered the sample frame. So we ignore this result.
                // This can happen if you passed a class to function component, or non-function.
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--; // We may still have similar intermediate frames from the construct call.
                    // The next one that isn't the same should be our match though.

                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                      var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');

                      {
                        if (typeof fn === 'function') {
                          componentFrameCache.set(fn, _frame);
                        }
                      } // Return the line we found.

                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }

                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        } // Fallback to just using the name if we couldn't make it throw.


        var name = fn ? fn.displayName || fn.name : '';
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
        {
          if (typeof fn === 'function') {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }

      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }

      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }

      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return '';
        }

        if (typeof type === 'function') {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }

        if (typeof type === 'string') {
          return describeBuiltInComponentFrame(type);
        }

        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame('Suspense');

          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame('SuspenseList');
        }

        if (typeof type === 'object') {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);

            case REACT_MEMO_TYPE:
              // Memo may contain any component type so we recursively resolve it.
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

            case REACT_BLOCK_TYPE:
              return describeFunctionComponentFrame(type._render);

            case REACT_LAZY_TYPE:
              {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;

                try {
                  // Lazy may contain any component type so we recursively resolve it.
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {}
              }
          }
        }

        return '';
      }

      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }

      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          // $FlowFixMe This is okay but Flow doesn't know it.
          var has = Function.call.bind(Object.prototype.hasOwnProperty);

          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
              // fail the render phase where it didn't fail before. So we log it.
              // After these have been cleaned up, we'll let them throw.

              try {
                // This is intentionally an invariant that gets caught. It's the same
                // behavior as without this statement except with a better message.
                if (typeof typeSpecs[typeSpecName] !== 'function') {
                  var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
                  err.name = 'Invariant Violation';
                  throw err;
                }

                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
              } catch (ex) {
                error$1 = ex;
              }

              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }

              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                // Only monitor this failure once because there tends to be a lot of the
                // same error.
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error('Failed %s type: %s', location, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }

      var didWarnAboutInvalidateContextType;
      {
        didWarnAboutInvalidateContextType = new Set();
      }
      var emptyObject = {};
      {
        Object.freeze(emptyObject);
      }

      function maskContext(type, context) {
        var contextTypes = type.contextTypes;

        if (!contextTypes) {
          return emptyObject;
        }

        var maskedContext = {};

        for (var contextName in contextTypes) {
          maskedContext[contextName] = context[contextName];
        }

        return maskedContext;
      }

      function checkContextTypes(typeSpecs, values, location) {
        {
          checkPropTypes(typeSpecs, values, location, 'Component');
        }
      }

      function validateContextBounds(context, threadID) {
        // If we don't have enough slots in this context to store this threadID,
        // fill it in without leaving any holes to ensure that the VM optimizes
        // this as non-holey index properties.
        // (Note: If `react` package is < 16.6, _threadCount is undefined.)
        for (var i = context._threadCount | 0; i <= threadID; i++) {
          // We assume that this is the same as the defaultValue which might not be
          // true if we're rendering inside a secondary renderer but they are
          // secondary because these use cases are very rare.
          context[i] = context._currentValue2;
          context._threadCount = i + 1;
        }
      }

      function processContext(type, context, threadID, isClass) {
        if (isClass) {
          var contextType = type.contextType;
          {
            if ('contextType' in type) {
              var isValid = // Allow null for conditional declaration
              contextType === null || contextType !== undefined && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === undefined; // Not a <Context.Consumer>

              if (!isValid && !didWarnAboutInvalidateContextType.has(type)) {
                didWarnAboutInvalidateContextType.add(type);
                var addendum = '';

                if (contextType === undefined) {
                  addendum = ' However, it is set to undefined. ' + 'This can be caused by a typo or by mixing up named and default imports. ' + 'This can also happen due to a circular dependency, so ' + 'try moving the createContext() call to a separate file.';
                } else if (typeof contextType !== 'object') {
                  addendum = ' However, it is set to a ' + typeof contextType + '.';
                } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                  addendum = ' Did you accidentally pass the Context.Provider instead?';
                } else if (contextType._context !== undefined) {
                  // <Context.Consumer>
                  addendum = ' Did you accidentally pass the Context.Consumer instead?';
                } else {
                  addendum = ' However, it is set to an object with keys {' + Object.keys(contextType).join(', ') + '}.';
                }

                error('%s defines an invalid contextType. ' + 'contextType should point to the Context object returned by React.createContext().%s', getComponentName(type) || 'Component', addendum);
              }
            }
          }

          if (typeof contextType === 'object' && contextType !== null) {
            validateContextBounds(contextType, threadID);
            return contextType[threadID];
          }

          {
            var maskedContext = maskContext(type, context);
            {
              if (type.contextTypes) {
                checkContextTypes(type.contextTypes, maskedContext, 'context');
              }
            }
            return maskedContext;
          }
        } else {
          {
            var _maskedContext = maskContext(type, context);

            {
              if (type.contextTypes) {
                checkContextTypes(type.contextTypes, _maskedContext, 'context');
              }
            }
            return _maskedContext;
          }
        }
      }

      var nextAvailableThreadIDs = new Uint16Array(16);

      for (var i = 0; i < 15; i++) {
        nextAvailableThreadIDs[i] = i + 1;
      }

      nextAvailableThreadIDs[15] = 0;

      function growThreadCountAndReturnNextAvailable() {
        var oldArray = nextAvailableThreadIDs;
        var oldSize = oldArray.length;
        var newSize = oldSize * 2;

        if (!(newSize <= 0x10000)) {
          {
            throw Error("Maximum number of concurrent React renderers exceeded. This can happen if you are not properly destroying the Readable provided by React. Ensure that you call .destroy() on it if you no longer want to read from it, and did not read to the end. If you use .pipe() this should be automatic.");
          }
        }

        var newArray = new Uint16Array(newSize);
        newArray.set(oldArray);
        nextAvailableThreadIDs = newArray;
        nextAvailableThreadIDs[0] = oldSize + 1;

        for (var _i = oldSize; _i < newSize - 1; _i++) {
          nextAvailableThreadIDs[_i] = _i + 1;
        }

        nextAvailableThreadIDs[newSize - 1] = 0;
        return oldSize;
      }

      function allocThreadID() {
        var nextID = nextAvailableThreadIDs[0];

        if (nextID === 0) {
          return growThreadCountAndReturnNextAvailable();
        }

        nextAvailableThreadIDs[0] = nextAvailableThreadIDs[nextID];
        return nextID;
      }

      function freeThreadID(id) {
        nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0];
        nextAvailableThreadIDs[0] = id;
      } // A reserved attribute.
      // It is handled by React separately and shouldn't be written to the DOM.


      var RESERVED = 0; // A simple string attribute.
      // Attributes that aren't in the filter are presumed to have this type.

      var STRING = 1; // A string attribute that accepts booleans in React. In HTML, these are called
      // "enumerated" attributes with "true" and "false" as possible values.
      // When true, it should be set to a "true" string.
      // When false, it should be set to a "false" string.

      var BOOLEANISH_STRING = 2; // A real boolean attribute.
      // When true, it should be present (set either to an empty string or its name).
      // When false, it should be omitted.

      var BOOLEAN = 3; // An attribute that can be used as a flag as well as with a value.
      // When true, it should be present (set either to an empty string or its name).
      // When false, it should be omitted.
      // For any other value, should be present with that value.

      var OVERLOADED_BOOLEAN = 4; // An attribute that must be numeric or parse as a numeric.
      // When falsy, it should be removed.

      var NUMERIC = 5; // An attribute that must be positive numeric or parse as a positive numeric.
      // When falsy, it should be removed.

      var POSITIVE_NUMERIC = 6;
      /* eslint-disable max-len */

      var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
      /* eslint-enable max-len */

      var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
      var ROOT_ATTRIBUTE_NAME = 'data-reactroot';
      var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var illegalAttributeNameCache = {};
      var validatedAttributeNameCache = {};

      function isAttributeNameSafe(attributeName) {
        if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
          return true;
        }

        if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
          return false;
        }

        if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
          validatedAttributeNameCache[attributeName] = true;
          return true;
        }

        illegalAttributeNameCache[attributeName] = true;
        {
          error('Invalid attribute name: `%s`', attributeName);
        }
        return false;
      }

      function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
        if (propertyInfo !== null) {
          return propertyInfo.type === RESERVED;
        }

        if (isCustomComponentTag) {
          return false;
        }

        if (name.length > 2 && (name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
          return true;
        }

        return false;
      }

      function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
        if (propertyInfo !== null && propertyInfo.type === RESERVED) {
          return false;
        }

        switch (typeof value) {
          case 'function': // $FlowIssue symbol is perfectly valid here

          case 'symbol':
            // eslint-disable-line
            return true;

          case 'boolean':
            {
              if (isCustomComponentTag) {
                return false;
              }

              if (propertyInfo !== null) {
                return !propertyInfo.acceptsBooleans;
              } else {
                var prefix = name.toLowerCase().slice(0, 5);
                return prefix !== 'data-' && prefix !== 'aria-';
              }
            }

          default:
            return false;
        }
      }

      function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
        if (value === null || typeof value === 'undefined') {
          return true;
        }

        if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) {
          return true;
        }

        if (isCustomComponentTag) {
          return false;
        }

        if (propertyInfo !== null) {
          switch (propertyInfo.type) {
            case BOOLEAN:
              return !value;

            case OVERLOADED_BOOLEAN:
              return value === false;

            case NUMERIC:
              return isNaN(value);

            case POSITIVE_NUMERIC:
              return isNaN(value) || value < 1;
          }
        }

        return false;
      }

      function getPropertyInfo(name) {
        return properties.hasOwnProperty(name) ? properties[name] : null;
      }

      function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL, removeEmptyString) {
        this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
        this.attributeName = attributeName;
        this.attributeNamespace = attributeNamespace;
        this.mustUseProperty = mustUseProperty;
        this.propertyName = name;
        this.type = type;
        this.sanitizeURL = sanitizeURL;
        this.removeEmptyString = removeEmptyString;
      } // When adding attributes to this list, be sure to also add them to
      // the `possibleStandardNames` module to ensure casing and incorrect
      // name warnings.


      var properties = {}; // These props are reserved by React. They shouldn't be written to the DOM.

      var reservedProps = ['children', 'dangerouslySetInnerHTML', // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      'defaultValue', 'defaultChecked', 'innerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'style'];
      reservedProps.forEach(function (name) {
        properties[name] = new PropertyInfoRecord(name, RESERVED, false, // mustUseProperty
        name, // attributeName
        null, // attributeNamespace
        false, // sanitizeURL
        false);
      }); // A few React string attributes have a different name.
      // This is a mapping from React prop names to the attribute names.

      [['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
        var name = _ref[0],
            attributeName = _ref[1];
        properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
        attributeName, // attributeName
        null, // attributeNamespace
        false, // sanitizeURL
        false);
      }); // These are "enumerated" HTML attributes that accept "true" and "false".
      // In React, we let users pass `true` and `false` even though technically
      // these aren't boolean attributes (they are coerced to strings).

      ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (name) {
        properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
        name.toLowerCase(), // attributeName
        null, // attributeNamespace
        false, // sanitizeURL
        false);
      }); // These are "enumerated" SVG attributes that accept "true" and "false".
      // In React, we let users pass `true` and `false` even though technically
      // these aren't boolean attributes (they are coerced to strings).
      // Since these are SVG attributes, their attribute names are case-sensitive.

      ['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (name) {
        properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
        name, // attributeName
        null, // attributeNamespace
        false, // sanitizeURL
        false);
      }); // These are HTML boolean attributes.

      ['allowFullScreen', 'async', // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'disablePictureInPicture', 'disableRemotePlayback', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless', // Microdata
      'itemScope'].forEach(function (name) {
        properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, // mustUseProperty
        name.toLowerCase(), // attributeName
        null, // attributeNamespace
        false, // sanitizeURL
        false);
      }); // These are the few React props that we set as DOM properties
      // rather than attributes. These are all booleans.

      ['checked', // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      'multiple', 'muted', 'selected' // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
      ].forEach(function (name) {
        properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, // mustUseProperty
        name, // attributeName
        null, // attributeNamespace
        false, // sanitizeURL
        false);
      }); // These are HTML attributes that are "overloaded booleans": they behave like
      // booleans, but can also accept a string value.

      ['capture', 'download' // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
      ].forEach(function (name) {
        properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, // mustUseProperty
        name, // attributeName
        null, // attributeNamespace
        false, // sanitizeURL
        false);
      }); // These are HTML attributes that must be positive numbers.

      ['cols', 'rows', 'size', 'span' // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
      ].forEach(function (name) {
        properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, // mustUseProperty
        name, // attributeName
        null, // attributeNamespace
        false, // sanitizeURL
        false);
      }); // These are HTML attributes that must be numbers.

      ['rowSpan', 'start'].forEach(function (name) {
        properties[name] = new PropertyInfoRecord(name, NUMERIC, false, // mustUseProperty
        name.toLowerCase(), // attributeName
        null, // attributeNamespace
        false, // sanitizeURL
        false);
      });
      var CAMELIZE = /[\-\:]([a-z])/g;

      var capitalize = function (token) {
        return token[1].toUpperCase();
      }; // This is a list of all SVG attributes that need special casing, namespacing,
      // or boolean value assignment. Regular attributes that just accept strings
      // and have the same names are omitted, just like in the HTML attribute filter.
      // Some of these attributes can be hard to find. This list was created by
      // scraping the MDN documentation.


      ['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height' // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
      ].forEach(function (attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
        attributeName, null, // attributeNamespace
        false, // sanitizeURL
        false);
      }); // String SVG attributes with the xlink namespace.

      ['xlink:actuate', 'xlink:arcrole', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type' // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
      ].forEach(function (attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
        attributeName, 'http://www.w3.org/1999/xlink', false, // sanitizeURL
        false);
      }); // String SVG attributes with the xml namespace.

      ['xml:base', 'xml:lang', 'xml:space' // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
      ].forEach(function (attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
        attributeName, 'http://www.w3.org/XML/1998/namespace', false, // sanitizeURL
        false);
      }); // These attribute exists both in HTML and SVG.
      // The attribute name is case-sensitive in SVG so we can't just use
      // the React name like we do for attributes that exist only in HTML.

      ['tabIndex', 'crossOrigin'].forEach(function (attributeName) {
        properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
        attributeName.toLowerCase(), // attributeName
        null, // attributeNamespace
        false, // sanitizeURL
        false);
      }); // These attributes accept URLs. These must not allow javascript: URLS.
      // These will also need to accept Trusted Types object in the future.

      var xlinkHref = 'xlinkHref';
      properties[xlinkHref] = new PropertyInfoRecord('xlinkHref', STRING, false, // mustUseProperty
      'xlink:href', 'http://www.w3.org/1999/xlink', true, // sanitizeURL
      false);
      ['src', 'href', 'action', 'formAction'].forEach(function (attributeName) {
        properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
        attributeName.toLowerCase(), // attributeName
        null, // attributeNamespace
        true, // sanitizeURL
        true);
      }); // and any newline or tab are filtered out as if they're not part of the URL.
      // https://url.spec.whatwg.org/#url-parsing
      // Tab or newline are defined as \r\n\t:
      // https://infra.spec.whatwg.org/#ascii-tab-or-newline
      // A C0 control is a code point in the range \u0000 NULL to \u001F
      // INFORMATION SEPARATOR ONE, inclusive:
      // https://infra.spec.whatwg.org/#c0-control-or-space

      /* eslint-disable max-len */

      var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
      var didWarn = false;

      function sanitizeURL(url) {
        {
          if (!didWarn && isJavaScriptProtocol.test(url)) {
            didWarn = true;
            error('A future version of React will block javascript: URLs as a security precaution. ' + 'Use event handlers instead if you can. If you need to generate unsafe HTML try ' + 'using dangerouslySetInnerHTML instead. React was passed %s.', JSON.stringify(url));
          }
        }
      } // code copied and modified from escape-html

      /**
       * Module variables.
       * @private
       */


      var matchHtmlRegExp = /["'&<>]/;
      /**
       * Escapes special characters and HTML entities in a given html string.
       *
       * @param  {string} string HTML string to escape for later insertion
       * @return {string}
       * @public
       */

      function escapeHtml(string) {
        var str = '' + string;
        var match = matchHtmlRegExp.exec(str);

        if (!match) {
          return str;
        }

        var escape;
        var html = '';
        var index;
        var lastIndex = 0;

        for (index = match.index; index < str.length; index++) {
          switch (str.charCodeAt(index)) {
            case 34:
              // "
              escape = '&quot;';
              break;

            case 38:
              // &
              escape = '&amp;';
              break;

            case 39:
              // '
              escape = '&#x27;'; // modified from escape-html; used to be '&#39'

              break;

            case 60:
              // <
              escape = '&lt;';
              break;

            case 62:
              // >
              escape = '&gt;';
              break;

            default:
              continue;
          }

          if (lastIndex !== index) {
            html += str.substring(lastIndex, index);
          }

          lastIndex = index + 1;
          html += escape;
        }

        return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
      } // end code copied and modified from escape-html

      /**
       * Escapes text to prevent scripting attacks.
       *
       * @param {*} text Text value to escape.
       * @return {string} An escaped string.
       */


      function escapeTextForBrowser(text) {
        if (typeof text === 'boolean' || typeof text === 'number') {
          // this shortcircuit helps perf for types that we know will never have
          // special characters, especially given that this function is used often
          // for numeric dom ids.
          return '' + text;
        }

        return escapeHtml(text);
      }
      /**
       * Escapes attribute value to prevent scripting attacks.
       *
       * @param {*} value Value to escape.
       * @return {string} An escaped string.
       */


      function quoteAttributeValueForBrowser(value) {
        return '"' + escapeTextForBrowser(value) + '"';
      }

      function createMarkupForRoot() {
        return ROOT_ATTRIBUTE_NAME + '=""';
      }
      /**
       * Creates markup for a property.
       *
       * @param {string} name
       * @param {*} value
       * @return {?string} Markup string, or null if the property was invalid.
       */


      function createMarkupForProperty(name, value) {
        var propertyInfo = getPropertyInfo(name);

        if (name !== 'style' && shouldIgnoreAttribute(name, propertyInfo, false)) {
          return '';
        }

        if (shouldRemoveAttribute(name, value, propertyInfo, false)) {
          return '';
        }

        if (propertyInfo !== null) {
          var attributeName = propertyInfo.attributeName;
          var type = propertyInfo.type;

          if (type === BOOLEAN || type === OVERLOADED_BOOLEAN && value === true) {
            return attributeName + '=""';
          } else {
            if (propertyInfo.sanitizeURL) {
              value = '' + value;
              sanitizeURL(value);
            }

            return attributeName + '=' + quoteAttributeValueForBrowser(value);
          }
        } else if (isAttributeNameSafe(name)) {
          return name + '=' + quoteAttributeValueForBrowser(value);
        }

        return '';
      }
      /**
       * Creates markup for a custom property.
       *
       * @param {string} name
       * @param {*} value
       * @return {string} Markup string, or empty string if the property was invalid.
       */


      function createMarkupForCustomAttribute(name, value) {
        if (!isAttributeNameSafe(name) || value == null) {
          return '';
        }

        return name + '=' + quoteAttributeValueForBrowser(value);
      }
      /**
       * inlined Object.is polyfill to avoid requiring consumers ship their own
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
       */


      function is(x, y) {
        return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
        ;
      }

      var objectIs = typeof Object.is === 'function' ? Object.is : is;
      var currentlyRenderingComponent = null;
      var firstWorkInProgressHook = null;
      var workInProgressHook = null; // Whether the work-in-progress hook is a re-rendered hook

      var isReRender = false; // Whether an update was scheduled during the currently executing render pass.

      var didScheduleRenderPhaseUpdate = false; // Lazily created map of render-phase updates

      var renderPhaseUpdates = null; // Counter to prevent infinite loops.

      var numberOfReRenders = 0;
      var RE_RENDER_LIMIT = 25;
      var isInHookUserCodeInDev = false; // In DEV, this is the name of the currently executing primitive hook

      var currentHookNameInDev;

      function resolveCurrentlyRenderingComponent() {
        if (!(currentlyRenderingComponent !== null)) {
          {
            throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
          }
        }

        {
          if (isInHookUserCodeInDev) {
            error('Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. ' + 'You can only call Hooks at the top level of your React function. ' + 'For more information, see ' + 'https://reactjs.org/link/rules-of-hooks');
          }
        }
        return currentlyRenderingComponent;
      }

      function areHookInputsEqual(nextDeps, prevDeps) {
        if (prevDeps === null) {
          {
            error('%s received a final argument during this render, but not during ' + 'the previous render. Even though the final argument is optional, ' + 'its type cannot change between renders.', currentHookNameInDev);
          }
          return false;
        }

        {
          // Don't bother comparing lengths in prod because these arrays should be
          // passed inline.
          if (nextDeps.length !== prevDeps.length) {
            error('The final argument passed to %s changed size between renders. The ' + 'order and size of this array must remain constant.\n\n' + 'Previous: %s\n' + 'Incoming: %s', currentHookNameInDev, "[" + nextDeps.join(', ') + "]", "[" + prevDeps.join(', ') + "]");
          }
        }

        for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
          if (objectIs(nextDeps[i], prevDeps[i])) {
            continue;
          }

          return false;
        }

        return true;
      }

      function createHook() {
        if (numberOfReRenders > 0) {
          {
            {
              throw Error("Rendered more hooks than during the previous render");
            }
          }
        }

        return {
          memoizedState: null,
          queue: null,
          next: null
        };
      }

      function createWorkInProgressHook() {
        if (workInProgressHook === null) {
          // This is the first hook in the list
          if (firstWorkInProgressHook === null) {
            isReRender = false;
            firstWorkInProgressHook = workInProgressHook = createHook();
          } else {
            // There's already a work-in-progress. Reuse it.
            isReRender = true;
            workInProgressHook = firstWorkInProgressHook;
          }
        } else {
          if (workInProgressHook.next === null) {
            isReRender = false; // Append to the end of the list

            workInProgressHook = workInProgressHook.next = createHook();
          } else {
            // There's already a work-in-progress. Reuse it.
            isReRender = true;
            workInProgressHook = workInProgressHook.next;
          }
        }

        return workInProgressHook;
      }

      function prepareToUseHooks(componentIdentity) {
        currentlyRenderingComponent = componentIdentity;
        {
          isInHookUserCodeInDev = false;
        } // The following should have already been reset
        // didScheduleRenderPhaseUpdate = false;
        // firstWorkInProgressHook = null;
        // numberOfReRenders = 0;
        // renderPhaseUpdates = null;
        // workInProgressHook = null;
      }

      function finishHooks(Component, props, children, refOrContext) {
        // This must be called after every function component to prevent hooks from
        // being used in classes.
        while (didScheduleRenderPhaseUpdate) {
          // Updates were scheduled during the render phase. They are stored in
          // the `renderPhaseUpdates` map. Call the component again, reusing the
          // work-in-progress hooks and applying the additional updates on top. Keep
          // restarting until no more updates are scheduled.
          didScheduleRenderPhaseUpdate = false;
          numberOfReRenders += 1; // Start over from the beginning of the list

          workInProgressHook = null;
          children = Component(props, refOrContext);
        }

        resetHooksState();
        return children;
      } // Reset the internal hooks state if an error occurs while rendering a component


      function resetHooksState() {
        {
          isInHookUserCodeInDev = false;
        }
        currentlyRenderingComponent = null;
        didScheduleRenderPhaseUpdate = false;
        firstWorkInProgressHook = null;
        numberOfReRenders = 0;
        renderPhaseUpdates = null;
        workInProgressHook = null;
      }

      function readContext(context, observedBits) {
        var threadID = currentPartialRenderer.threadID;
        validateContextBounds(context, threadID);
        {
          if (isInHookUserCodeInDev) {
            error('Context can only be read while React is rendering. ' + 'In classes, you can read it in the render method or getDerivedStateFromProps. ' + 'In function components, you can read it directly in the function body, but not ' + 'inside Hooks like useReducer() or useMemo().');
          }
        }
        return context[threadID];
      }

      function useContext(context, observedBits) {
        {
          currentHookNameInDev = 'useContext';
        }
        resolveCurrentlyRenderingComponent();
        var threadID = currentPartialRenderer.threadID;
        validateContextBounds(context, threadID);
        return context[threadID];
      }

      function basicStateReducer(state, action) {
        // $FlowFixMe: Flow doesn't like mixed types
        return typeof action === 'function' ? action(state) : action;
      }

      function useState(initialState) {
        {
          currentHookNameInDev = 'useState';
        }
        return useReducer(basicStateReducer, // useReducer has a special case to support lazy useState initializers
        initialState);
      }

      function useReducer(reducer, initialArg, init) {
        {
          if (reducer !== basicStateReducer) {
            currentHookNameInDev = 'useReducer';
          }
        }
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
        workInProgressHook = createWorkInProgressHook();

        if (isReRender) {
          // This is a re-render. Apply the new render phase updates to the previous
          // current hook.
          var queue = workInProgressHook.queue;
          var dispatch = queue.dispatch;

          if (renderPhaseUpdates !== null) {
            // Render phase updates are stored in a map of queue -> linked list
            var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

            if (firstRenderPhaseUpdate !== undefined) {
              renderPhaseUpdates.delete(queue);
              var newState = workInProgressHook.memoizedState;
              var update = firstRenderPhaseUpdate;

              do {
                // Process this render phase update. We don't have to check the
                // priority because it will always be the same as the current
                // render's.
                var action = update.action;
                {
                  isInHookUserCodeInDev = true;
                }
                newState = reducer(newState, action);
                {
                  isInHookUserCodeInDev = false;
                }
                update = update.next;
              } while (update !== null);

              workInProgressHook.memoizedState = newState;
              return [newState, dispatch];
            }
          }

          return [workInProgressHook.memoizedState, dispatch];
        } else {
          {
            isInHookUserCodeInDev = true;
          }
          var initialState;

          if (reducer === basicStateReducer) {
            // Special case for `useState`.
            initialState = typeof initialArg === 'function' ? initialArg() : initialArg;
          } else {
            initialState = init !== undefined ? init(initialArg) : initialArg;
          }

          {
            isInHookUserCodeInDev = false;
          }
          workInProgressHook.memoizedState = initialState;

          var _queue = workInProgressHook.queue = {
            last: null,
            dispatch: null
          };

          var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);

          return [workInProgressHook.memoizedState, _dispatch];
        }
      }

      function useMemo(nextCreate, deps) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
        workInProgressHook = createWorkInProgressHook();
        var nextDeps = deps === undefined ? null : deps;

        if (workInProgressHook !== null) {
          var prevState = workInProgressHook.memoizedState;

          if (prevState !== null) {
            if (nextDeps !== null) {
              var prevDeps = prevState[1];

              if (areHookInputsEqual(nextDeps, prevDeps)) {
                return prevState[0];
              }
            }
          }
        }

        {
          isInHookUserCodeInDev = true;
        }
        var nextValue = nextCreate();
        {
          isInHookUserCodeInDev = false;
        }
        workInProgressHook.memoizedState = [nextValue, nextDeps];
        return nextValue;
      }

      function useRef(initialValue) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
        workInProgressHook = createWorkInProgressHook();
        var previousRef = workInProgressHook.memoizedState;

        if (previousRef === null) {
          var ref = {
            current: initialValue
          };
          {
            Object.seal(ref);
          }
          workInProgressHook.memoizedState = ref;
          return ref;
        } else {
          return previousRef;
        }
      }

      function useLayoutEffect(create, inputs) {
        {
          currentHookNameInDev = 'useLayoutEffect';
          error('useLayoutEffect does nothing on the server, because its effect cannot ' + "be encoded into the server renderer's output format. This will lead " + 'to a mismatch between the initial, non-hydrated UI and the intended ' + 'UI. To avoid this, useLayoutEffect should only be used in ' + 'components that render exclusively on the client. ' + 'See https://reactjs.org/link/uselayouteffect-ssr for common fixes.');
        }
      }

      function dispatchAction(componentIdentity, queue, action) {
        if (!(numberOfReRenders < RE_RENDER_LIMIT)) {
          {
            throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          }
        }

        if (componentIdentity === currentlyRenderingComponent) {
          // This is a render phase update. Stash it in a lazily-created map of
          // queue -> linked list of updates. After this render pass, we'll restart
          // and apply the stashed updates on top of the work-in-progress hook.
          didScheduleRenderPhaseUpdate = true;
          var update = {
            action: action,
            next: null
          };

          if (renderPhaseUpdates === null) {
            renderPhaseUpdates = new Map();
          }

          var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

          if (firstRenderPhaseUpdate === undefined) {
            renderPhaseUpdates.set(queue, update);
          } else {
            // Append the update to the end of the list.
            var lastRenderPhaseUpdate = firstRenderPhaseUpdate;

            while (lastRenderPhaseUpdate.next !== null) {
              lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
            }

            lastRenderPhaseUpdate.next = update;
          }
        }
      }

      function useCallback(callback, deps) {
        return useMemo(function () {
          return callback;
        }, deps);
      } // TODO Decide on how to implement this hook for server rendering.
      // If a mutation occurs during render, consider triggering a Suspense boundary
      // and falling back to client rendering.


      function useMutableSource(source, getSnapshot, subscribe) {
        resolveCurrentlyRenderingComponent();
        return getSnapshot(source._source);
      }

      function useDeferredValue(value) {
        resolveCurrentlyRenderingComponent();
        return value;
      }

      function useTransition() {
        resolveCurrentlyRenderingComponent();

        var startTransition = function (callback) {
          callback();
        };

        return [startTransition, false];
      }

      function useOpaqueIdentifier() {
        return (currentPartialRenderer.identifierPrefix || '') + 'R:' + (currentPartialRenderer.uniqueID++).toString(36);
      }

      function noop() {}

      var currentPartialRenderer = null;

      function setCurrentPartialRenderer(renderer) {
        currentPartialRenderer = renderer;
      }

      var Dispatcher = {
        readContext: readContext,
        useContext: useContext,
        useMemo: useMemo,
        useReducer: useReducer,
        useRef: useRef,
        useState: useState,
        useLayoutEffect: useLayoutEffect,
        useCallback: useCallback,
        // useImperativeHandle is not run in the server environment
        useImperativeHandle: noop,
        // Effects are not run in the server environment.
        useEffect: noop,
        // Debugging effect
        useDebugValue: noop,
        useDeferredValue: useDeferredValue,
        useTransition: useTransition,
        useOpaqueIdentifier: useOpaqueIdentifier,
        // Subscriptions are not setup in a server environment.
        useMutableSource: useMutableSource
      };
      var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
      var MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
      var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
      var Namespaces = {
        html: HTML_NAMESPACE,
        mathml: MATH_NAMESPACE,
        svg: SVG_NAMESPACE
      }; // Assumes there is no parent namespace.

      function getIntrinsicNamespace(type) {
        switch (type) {
          case 'svg':
            return SVG_NAMESPACE;

          case 'math':
            return MATH_NAMESPACE;

          default:
            return HTML_NAMESPACE;
        }
      }

      function getChildNamespace(parentNamespace, type) {
        if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
          // No (or default) parent namespace: potential entry point.
          return getIntrinsicNamespace(type);
        }

        if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
          // We're leaving SVG.
          return HTML_NAMESPACE;
        } // By default, pass namespace below.


        return parentNamespace;
      }

      var hasReadOnlyValue = {
        button: true,
        checkbox: true,
        image: true,
        hidden: true,
        radio: true,
        reset: true,
        submit: true
      };

      function checkControlledValueProps(tagName, props) {
        {
          if (!(hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null)) {
            error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
          }

          if (!(props.onChange || props.readOnly || props.disabled || props.checked == null)) {
            error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
          }
        }
      } // For HTML, certain tags should omit their close tag. We keep a list for
      // those special-case tags.


      var omittedCloseTags = {
        area: true,
        base: true,
        br: true,
        col: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        keygen: true,
        link: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true // NOTE: menuitem's close tag should be omitted, but that causes problems.

      }; // `omittedCloseTags` except that `menuitem` should still have its closing tag.

      var voidElementTags = _assign({
        menuitem: true
      }, omittedCloseTags);

      var HTML = '__html';

      function assertValidProps(tag, props) {
        if (!props) {
          return;
        } // Note the use of `==` which checks for null or undefined.


        if (voidElementTags[tag]) {
          if (!(props.children == null && props.dangerouslySetInnerHTML == null)) {
            {
              throw Error(tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
            }
          }
        }

        if (props.dangerouslySetInnerHTML != null) {
          if (!(props.children == null)) {
            {
              throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            }
          }

          if (!(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML)) {
            {
              throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
            }
          }
        }

        {
          if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
            error('A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.');
          }
        }

        if (!(props.style == null || typeof props.style === 'object')) {
          {
            throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
          }
        }
      }
      /**
       * CSS properties which accept numbers but are not in units of "px".
       */


      var isUnitlessNumber = {
        animationIterationCount: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        // SVG-related properties
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      /**
       * @param {string} prefix vendor-specific prefix, eg: Webkit
       * @param {string} key style name, eg: transitionDuration
       * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
       * WebkitTransitionDuration
       */

      function prefixKey(prefix, key) {
        return prefix + key.charAt(0).toUpperCase() + key.substring(1);
      }
      /**
       * Support style names that may come passed in prefixed by adding permutations
       * of vendor prefixes.
       */


      var prefixes = ['Webkit', 'ms', 'Moz', 'O']; // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
      // infinite loop, because it iterates over the newly added props too.

      Object.keys(isUnitlessNumber).forEach(function (prop) {
        prefixes.forEach(function (prefix) {
          isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
        });
      });
      /**
       * Convert a value into the proper css writable value. The style name `name`
       * should be logical (no hyphens), as specified
       * in `CSSProperty.isUnitlessNumber`.
       *
       * @param {string} name CSS property name such as `topMargin`.
       * @param {*} value CSS property value such as `10px`.
       * @return {string} Normalized style value with dimensions applied.
       */

      function dangerousStyleValue(name, value, isCustomProperty) {
        // Note that we've removed escapeTextForBrowser() calls here since the
        // whole string will be escaped when the attribute is injected into
        // the markup. If you provide unsafe user data here they can inject
        // arbitrary CSS which may be problematic (I couldn't repro this):
        // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
        // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
        // This is not an XSS hole but instead a potential CSS injection issue
        // which has lead to a greater discussion about how we're going to
        // trust URLs moving forward. See #2115901
        var isEmpty = value == null || typeof value === 'boolean' || value === '';

        if (isEmpty) {
          return '';
        }

        if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
          return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
        }

        return ('' + value).trim();
      }

      var uppercasePattern = /([A-Z])/g;
      var msPattern = /^ms-/;
      /**
       * Hyphenates a camelcased CSS property name, for example:
       *
       *   > hyphenateStyleName('backgroundColor')
       *   < "background-color"
       *   > hyphenateStyleName('MozTransition')
       *   < "-moz-transition"
       *   > hyphenateStyleName('msTransition')
       *   < "-ms-transition"
       *
       * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
       * is converted to `-ms-`.
       */

      function hyphenateStyleName(name) {
        return name.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern, '-ms-');
      }

      function isCustomComponent(tagName, props) {
        if (tagName.indexOf('-') === -1) {
          return typeof props.is === 'string';
        }

        switch (tagName) {
          // These are reserved SVG and MathML elements.
          // We don't mind this list too much because we expect it to never grow.
          // The alternative is to track the namespace in a few places which is convoluted.
          // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
          case 'annotation-xml':
          case 'color-profile':
          case 'font-face':
          case 'font-face-src':
          case 'font-face-uri':
          case 'font-face-format':
          case 'font-face-name':
          case 'missing-glyph':
            return false;

          default:
            return true;
        }
      }

      var warnValidStyle = function () {};

      {
        // 'msTransform' is correct, but the other prefixes should be capitalized
        var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
        var msPattern$1 = /^-ms-/;
        var hyphenPattern = /-(.)/g; // style values shouldn't contain a semicolon

        var badStyleValueWithSemicolonPattern = /;\s*$/;
        var warnedStyleNames = {};
        var warnedStyleValues = {};
        var warnedForNaNValue = false;
        var warnedForInfinityValue = false;

        var camelize = function (string) {
          return string.replace(hyphenPattern, function (_, character) {
            return character.toUpperCase();
          });
        };

        var warnHyphenatedStyleName = function (name) {
          if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
            return;
          }

          warnedStyleNames[name] = true;
          error('Unsupported style property %s. Did you mean %s?', name, // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          camelize(name.replace(msPattern$1, 'ms-')));
        };

        var warnBadVendoredStyleName = function (name) {
          if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
            return;
          }

          warnedStyleNames[name] = true;
          error('Unsupported vendor-prefixed style property %s. Did you mean %s?', name, name.charAt(0).toUpperCase() + name.slice(1));
        };

        var warnStyleValueWithSemicolon = function (name, value) {
          if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
            return;
          }

          warnedStyleValues[value] = true;
          error("Style property values shouldn't contain a semicolon. " + 'Try "%s: %s" instead.', name, value.replace(badStyleValueWithSemicolonPattern, ''));
        };

        var warnStyleValueIsNaN = function (name, value) {
          if (warnedForNaNValue) {
            return;
          }

          warnedForNaNValue = true;
          error('`NaN` is an invalid value for the `%s` css style property.', name);
        };

        var warnStyleValueIsInfinity = function (name, value) {
          if (warnedForInfinityValue) {
            return;
          }

          warnedForInfinityValue = true;
          error('`Infinity` is an invalid value for the `%s` css style property.', name);
        };

        warnValidStyle = function (name, value) {
          if (name.indexOf('-') > -1) {
            warnHyphenatedStyleName(name);
          } else if (badVendoredStyleNamePattern.test(name)) {
            warnBadVendoredStyleName(name);
          } else if (badStyleValueWithSemicolonPattern.test(value)) {
            warnStyleValueWithSemicolon(name, value);
          }

          if (typeof value === 'number') {
            if (isNaN(value)) {
              warnStyleValueIsNaN(name, value);
            } else if (!isFinite(value)) {
              warnStyleValueIsInfinity(name, value);
            }
          }
        };
      }
      var warnValidStyle$1 = warnValidStyle;
      var ariaProperties = {
        'aria-current': 0,
        // state
        'aria-details': 0,
        'aria-disabled': 0,
        // state
        'aria-hidden': 0,
        // state
        'aria-invalid': 0,
        // state
        'aria-keyshortcuts': 0,
        'aria-label': 0,
        'aria-roledescription': 0,
        // Widget Attributes
        'aria-autocomplete': 0,
        'aria-checked': 0,
        'aria-expanded': 0,
        'aria-haspopup': 0,
        'aria-level': 0,
        'aria-modal': 0,
        'aria-multiline': 0,
        'aria-multiselectable': 0,
        'aria-orientation': 0,
        'aria-placeholder': 0,
        'aria-pressed': 0,
        'aria-readonly': 0,
        'aria-required': 0,
        'aria-selected': 0,
        'aria-sort': 0,
        'aria-valuemax': 0,
        'aria-valuemin': 0,
        'aria-valuenow': 0,
        'aria-valuetext': 0,
        // Live Region Attributes
        'aria-atomic': 0,
        'aria-busy': 0,
        'aria-live': 0,
        'aria-relevant': 0,
        // Drag-and-Drop Attributes
        'aria-dropeffect': 0,
        'aria-grabbed': 0,
        // Relationship Attributes
        'aria-activedescendant': 0,
        'aria-colcount': 0,
        'aria-colindex': 0,
        'aria-colspan': 0,
        'aria-controls': 0,
        'aria-describedby': 0,
        'aria-errormessage': 0,
        'aria-flowto': 0,
        'aria-labelledby': 0,
        'aria-owns': 0,
        'aria-posinset': 0,
        'aria-rowcount': 0,
        'aria-rowindex': 0,
        'aria-rowspan': 0,
        'aria-setsize': 0
      };
      var warnedProperties = {};
      var rARIA = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
      var rARIACamel = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');
      var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

      function validateProperty(tagName, name) {
        {
          if (hasOwnProperty$1.call(warnedProperties, name) && warnedProperties[name]) {
            return true;
          }

          if (rARIACamel.test(name)) {
            var ariaName = 'aria-' + name.slice(4).toLowerCase();
            var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null; // If this is an aria-* attribute, but is not listed in the known DOM
            // DOM properties, then it is an invalid aria-* attribute.

            if (correctName == null) {
              error('Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.', name);
              warnedProperties[name] = true;
              return true;
            } // aria-* attributes should be lowercase; suggest the lowercase version.


            if (name !== correctName) {
              error('Invalid ARIA attribute `%s`. Did you mean `%s`?', name, correctName);
              warnedProperties[name] = true;
              return true;
            }
          }

          if (rARIA.test(name)) {
            var lowerCasedName = name.toLowerCase();
            var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null; // If this is an aria-* attribute, but is not listed in the known DOM
            // DOM properties, then it is an invalid aria-* attribute.

            if (standardName == null) {
              warnedProperties[name] = true;
              return false;
            } // aria-* attributes should be lowercase; suggest the lowercase version.


            if (name !== standardName) {
              error('Unknown ARIA attribute `%s`. Did you mean `%s`?', name, standardName);
              warnedProperties[name] = true;
              return true;
            }
          }
        }
        return true;
      }

      function warnInvalidARIAProps(type, props) {
        {
          var invalidProps = [];

          for (var key in props) {
            var isValid = validateProperty(type, key);

            if (!isValid) {
              invalidProps.push(key);
            }
          }

          var unknownPropString = invalidProps.map(function (prop) {
            return '`' + prop + '`';
          }).join(', ');

          if (invalidProps.length === 1) {
            error('Invalid aria prop %s on <%s> tag. ' + 'For details, see https://reactjs.org/link/invalid-aria-props', unknownPropString, type);
          } else if (invalidProps.length > 1) {
            error('Invalid aria props %s on <%s> tag. ' + 'For details, see https://reactjs.org/link/invalid-aria-props', unknownPropString, type);
          }
        }
      }

      function validateProperties(type, props) {
        if (isCustomComponent(type, props)) {
          return;
        }

        warnInvalidARIAProps(type, props);
      }

      var didWarnValueNull = false;

      function validateProperties$1(type, props) {
        {
          if (type !== 'input' && type !== 'textarea' && type !== 'select') {
            return;
          }

          if (props != null && props.value === null && !didWarnValueNull) {
            didWarnValueNull = true;

            if (type === 'select' && props.multiple) {
              error('`value` prop on `%s` should not be null. ' + 'Consider using an empty array when `multiple` is set to `true` ' + 'to clear the component or `undefined` for uncontrolled components.', type);
            } else {
              error('`value` prop on `%s` should not be null. ' + 'Consider using an empty string to clear the component or `undefined` ' + 'for uncontrolled components.', type);
            }
          }
        }
      } // When adding attributes to the HTML or SVG allowed attribute list, be sure to
      // also add them to this module to ensure casing and incorrect name
      // warnings.


      var possibleStandardNames = {
        // HTML
        accept: 'accept',
        acceptcharset: 'acceptCharset',
        'accept-charset': 'acceptCharset',
        accesskey: 'accessKey',
        action: 'action',
        allowfullscreen: 'allowFullScreen',
        alt: 'alt',
        as: 'as',
        async: 'async',
        autocapitalize: 'autoCapitalize',
        autocomplete: 'autoComplete',
        autocorrect: 'autoCorrect',
        autofocus: 'autoFocus',
        autoplay: 'autoPlay',
        autosave: 'autoSave',
        capture: 'capture',
        cellpadding: 'cellPadding',
        cellspacing: 'cellSpacing',
        challenge: 'challenge',
        charset: 'charSet',
        checked: 'checked',
        children: 'children',
        cite: 'cite',
        class: 'className',
        classid: 'classID',
        classname: 'className',
        cols: 'cols',
        colspan: 'colSpan',
        content: 'content',
        contenteditable: 'contentEditable',
        contextmenu: 'contextMenu',
        controls: 'controls',
        controlslist: 'controlsList',
        coords: 'coords',
        crossorigin: 'crossOrigin',
        dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
        data: 'data',
        datetime: 'dateTime',
        default: 'default',
        defaultchecked: 'defaultChecked',
        defaultvalue: 'defaultValue',
        defer: 'defer',
        dir: 'dir',
        disabled: 'disabled',
        disablepictureinpicture: 'disablePictureInPicture',
        disableremoteplayback: 'disableRemotePlayback',
        download: 'download',
        draggable: 'draggable',
        enctype: 'encType',
        enterkeyhint: 'enterKeyHint',
        for: 'htmlFor',
        form: 'form',
        formmethod: 'formMethod',
        formaction: 'formAction',
        formenctype: 'formEncType',
        formnovalidate: 'formNoValidate',
        formtarget: 'formTarget',
        frameborder: 'frameBorder',
        headers: 'headers',
        height: 'height',
        hidden: 'hidden',
        high: 'high',
        href: 'href',
        hreflang: 'hrefLang',
        htmlfor: 'htmlFor',
        httpequiv: 'httpEquiv',
        'http-equiv': 'httpEquiv',
        icon: 'icon',
        id: 'id',
        innerhtml: 'innerHTML',
        inputmode: 'inputMode',
        integrity: 'integrity',
        is: 'is',
        itemid: 'itemID',
        itemprop: 'itemProp',
        itemref: 'itemRef',
        itemscope: 'itemScope',
        itemtype: 'itemType',
        keyparams: 'keyParams',
        keytype: 'keyType',
        kind: 'kind',
        label: 'label',
        lang: 'lang',
        list: 'list',
        loop: 'loop',
        low: 'low',
        manifest: 'manifest',
        marginwidth: 'marginWidth',
        marginheight: 'marginHeight',
        max: 'max',
        maxlength: 'maxLength',
        media: 'media',
        mediagroup: 'mediaGroup',
        method: 'method',
        min: 'min',
        minlength: 'minLength',
        multiple: 'multiple',
        muted: 'muted',
        name: 'name',
        nomodule: 'noModule',
        nonce: 'nonce',
        novalidate: 'noValidate',
        open: 'open',
        optimum: 'optimum',
        pattern: 'pattern',
        placeholder: 'placeholder',
        playsinline: 'playsInline',
        poster: 'poster',
        preload: 'preload',
        profile: 'profile',
        radiogroup: 'radioGroup',
        readonly: 'readOnly',
        referrerpolicy: 'referrerPolicy',
        rel: 'rel',
        required: 'required',
        reversed: 'reversed',
        role: 'role',
        rows: 'rows',
        rowspan: 'rowSpan',
        sandbox: 'sandbox',
        scope: 'scope',
        scoped: 'scoped',
        scrolling: 'scrolling',
        seamless: 'seamless',
        selected: 'selected',
        shape: 'shape',
        size: 'size',
        sizes: 'sizes',
        span: 'span',
        spellcheck: 'spellCheck',
        src: 'src',
        srcdoc: 'srcDoc',
        srclang: 'srcLang',
        srcset: 'srcSet',
        start: 'start',
        step: 'step',
        style: 'style',
        summary: 'summary',
        tabindex: 'tabIndex',
        target: 'target',
        title: 'title',
        type: 'type',
        usemap: 'useMap',
        value: 'value',
        width: 'width',
        wmode: 'wmode',
        wrap: 'wrap',
        // SVG
        about: 'about',
        accentheight: 'accentHeight',
        'accent-height': 'accentHeight',
        accumulate: 'accumulate',
        additive: 'additive',
        alignmentbaseline: 'alignmentBaseline',
        'alignment-baseline': 'alignmentBaseline',
        allowreorder: 'allowReorder',
        alphabetic: 'alphabetic',
        amplitude: 'amplitude',
        arabicform: 'arabicForm',
        'arabic-form': 'arabicForm',
        ascent: 'ascent',
        attributename: 'attributeName',
        attributetype: 'attributeType',
        autoreverse: 'autoReverse',
        azimuth: 'azimuth',
        basefrequency: 'baseFrequency',
        baselineshift: 'baselineShift',
        'baseline-shift': 'baselineShift',
        baseprofile: 'baseProfile',
        bbox: 'bbox',
        begin: 'begin',
        bias: 'bias',
        by: 'by',
        calcmode: 'calcMode',
        capheight: 'capHeight',
        'cap-height': 'capHeight',
        clip: 'clip',
        clippath: 'clipPath',
        'clip-path': 'clipPath',
        clippathunits: 'clipPathUnits',
        cliprule: 'clipRule',
        'clip-rule': 'clipRule',
        color: 'color',
        colorinterpolation: 'colorInterpolation',
        'color-interpolation': 'colorInterpolation',
        colorinterpolationfilters: 'colorInterpolationFilters',
        'color-interpolation-filters': 'colorInterpolationFilters',
        colorprofile: 'colorProfile',
        'color-profile': 'colorProfile',
        colorrendering: 'colorRendering',
        'color-rendering': 'colorRendering',
        contentscripttype: 'contentScriptType',
        contentstyletype: 'contentStyleType',
        cursor: 'cursor',
        cx: 'cx',
        cy: 'cy',
        d: 'd',
        datatype: 'datatype',
        decelerate: 'decelerate',
        descent: 'descent',
        diffuseconstant: 'diffuseConstant',
        direction: 'direction',
        display: 'display',
        divisor: 'divisor',
        dominantbaseline: 'dominantBaseline',
        'dominant-baseline': 'dominantBaseline',
        dur: 'dur',
        dx: 'dx',
        dy: 'dy',
        edgemode: 'edgeMode',
        elevation: 'elevation',
        enablebackground: 'enableBackground',
        'enable-background': 'enableBackground',
        end: 'end',
        exponent: 'exponent',
        externalresourcesrequired: 'externalResourcesRequired',
        fill: 'fill',
        fillopacity: 'fillOpacity',
        'fill-opacity': 'fillOpacity',
        fillrule: 'fillRule',
        'fill-rule': 'fillRule',
        filter: 'filter',
        filterres: 'filterRes',
        filterunits: 'filterUnits',
        floodopacity: 'floodOpacity',
        'flood-opacity': 'floodOpacity',
        floodcolor: 'floodColor',
        'flood-color': 'floodColor',
        focusable: 'focusable',
        fontfamily: 'fontFamily',
        'font-family': 'fontFamily',
        fontsize: 'fontSize',
        'font-size': 'fontSize',
        fontsizeadjust: 'fontSizeAdjust',
        'font-size-adjust': 'fontSizeAdjust',
        fontstretch: 'fontStretch',
        'font-stretch': 'fontStretch',
        fontstyle: 'fontStyle',
        'font-style': 'fontStyle',
        fontvariant: 'fontVariant',
        'font-variant': 'fontVariant',
        fontweight: 'fontWeight',
        'font-weight': 'fontWeight',
        format: 'format',
        from: 'from',
        fx: 'fx',
        fy: 'fy',
        g1: 'g1',
        g2: 'g2',
        glyphname: 'glyphName',
        'glyph-name': 'glyphName',
        glyphorientationhorizontal: 'glyphOrientationHorizontal',
        'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
        glyphorientationvertical: 'glyphOrientationVertical',
        'glyph-orientation-vertical': 'glyphOrientationVertical',
        glyphref: 'glyphRef',
        gradienttransform: 'gradientTransform',
        gradientunits: 'gradientUnits',
        hanging: 'hanging',
        horizadvx: 'horizAdvX',
        'horiz-adv-x': 'horizAdvX',
        horizoriginx: 'horizOriginX',
        'horiz-origin-x': 'horizOriginX',
        ideographic: 'ideographic',
        imagerendering: 'imageRendering',
        'image-rendering': 'imageRendering',
        in2: 'in2',
        in: 'in',
        inlist: 'inlist',
        intercept: 'intercept',
        k1: 'k1',
        k2: 'k2',
        k3: 'k3',
        k4: 'k4',
        k: 'k',
        kernelmatrix: 'kernelMatrix',
        kernelunitlength: 'kernelUnitLength',
        kerning: 'kerning',
        keypoints: 'keyPoints',
        keysplines: 'keySplines',
        keytimes: 'keyTimes',
        lengthadjust: 'lengthAdjust',
        letterspacing: 'letterSpacing',
        'letter-spacing': 'letterSpacing',
        lightingcolor: 'lightingColor',
        'lighting-color': 'lightingColor',
        limitingconeangle: 'limitingConeAngle',
        local: 'local',
        markerend: 'markerEnd',
        'marker-end': 'markerEnd',
        markerheight: 'markerHeight',
        markermid: 'markerMid',
        'marker-mid': 'markerMid',
        markerstart: 'markerStart',
        'marker-start': 'markerStart',
        markerunits: 'markerUnits',
        markerwidth: 'markerWidth',
        mask: 'mask',
        maskcontentunits: 'maskContentUnits',
        maskunits: 'maskUnits',
        mathematical: 'mathematical',
        mode: 'mode',
        numoctaves: 'numOctaves',
        offset: 'offset',
        opacity: 'opacity',
        operator: 'operator',
        order: 'order',
        orient: 'orient',
        orientation: 'orientation',
        origin: 'origin',
        overflow: 'overflow',
        overlineposition: 'overlinePosition',
        'overline-position': 'overlinePosition',
        overlinethickness: 'overlineThickness',
        'overline-thickness': 'overlineThickness',
        paintorder: 'paintOrder',
        'paint-order': 'paintOrder',
        panose1: 'panose1',
        'panose-1': 'panose1',
        pathlength: 'pathLength',
        patterncontentunits: 'patternContentUnits',
        patterntransform: 'patternTransform',
        patternunits: 'patternUnits',
        pointerevents: 'pointerEvents',
        'pointer-events': 'pointerEvents',
        points: 'points',
        pointsatx: 'pointsAtX',
        pointsaty: 'pointsAtY',
        pointsatz: 'pointsAtZ',
        prefix: 'prefix',
        preservealpha: 'preserveAlpha',
        preserveaspectratio: 'preserveAspectRatio',
        primitiveunits: 'primitiveUnits',
        property: 'property',
        r: 'r',
        radius: 'radius',
        refx: 'refX',
        refy: 'refY',
        renderingintent: 'renderingIntent',
        'rendering-intent': 'renderingIntent',
        repeatcount: 'repeatCount',
        repeatdur: 'repeatDur',
        requiredextensions: 'requiredExtensions',
        requiredfeatures: 'requiredFeatures',
        resource: 'resource',
        restart: 'restart',
        result: 'result',
        results: 'results',
        rotate: 'rotate',
        rx: 'rx',
        ry: 'ry',
        scale: 'scale',
        security: 'security',
        seed: 'seed',
        shaperendering: 'shapeRendering',
        'shape-rendering': 'shapeRendering',
        slope: 'slope',
        spacing: 'spacing',
        specularconstant: 'specularConstant',
        specularexponent: 'specularExponent',
        speed: 'speed',
        spreadmethod: 'spreadMethod',
        startoffset: 'startOffset',
        stddeviation: 'stdDeviation',
        stemh: 'stemh',
        stemv: 'stemv',
        stitchtiles: 'stitchTiles',
        stopcolor: 'stopColor',
        'stop-color': 'stopColor',
        stopopacity: 'stopOpacity',
        'stop-opacity': 'stopOpacity',
        strikethroughposition: 'strikethroughPosition',
        'strikethrough-position': 'strikethroughPosition',
        strikethroughthickness: 'strikethroughThickness',
        'strikethrough-thickness': 'strikethroughThickness',
        string: 'string',
        stroke: 'stroke',
        strokedasharray: 'strokeDasharray',
        'stroke-dasharray': 'strokeDasharray',
        strokedashoffset: 'strokeDashoffset',
        'stroke-dashoffset': 'strokeDashoffset',
        strokelinecap: 'strokeLinecap',
        'stroke-linecap': 'strokeLinecap',
        strokelinejoin: 'strokeLinejoin',
        'stroke-linejoin': 'strokeLinejoin',
        strokemiterlimit: 'strokeMiterlimit',
        'stroke-miterlimit': 'strokeMiterlimit',
        strokewidth: 'strokeWidth',
        'stroke-width': 'strokeWidth',
        strokeopacity: 'strokeOpacity',
        'stroke-opacity': 'strokeOpacity',
        suppresscontenteditablewarning: 'suppressContentEditableWarning',
        suppresshydrationwarning: 'suppressHydrationWarning',
        surfacescale: 'surfaceScale',
        systemlanguage: 'systemLanguage',
        tablevalues: 'tableValues',
        targetx: 'targetX',
        targety: 'targetY',
        textanchor: 'textAnchor',
        'text-anchor': 'textAnchor',
        textdecoration: 'textDecoration',
        'text-decoration': 'textDecoration',
        textlength: 'textLength',
        textrendering: 'textRendering',
        'text-rendering': 'textRendering',
        to: 'to',
        transform: 'transform',
        typeof: 'typeof',
        u1: 'u1',
        u2: 'u2',
        underlineposition: 'underlinePosition',
        'underline-position': 'underlinePosition',
        underlinethickness: 'underlineThickness',
        'underline-thickness': 'underlineThickness',
        unicode: 'unicode',
        unicodebidi: 'unicodeBidi',
        'unicode-bidi': 'unicodeBidi',
        unicoderange: 'unicodeRange',
        'unicode-range': 'unicodeRange',
        unitsperem: 'unitsPerEm',
        'units-per-em': 'unitsPerEm',
        unselectable: 'unselectable',
        valphabetic: 'vAlphabetic',
        'v-alphabetic': 'vAlphabetic',
        values: 'values',
        vectoreffect: 'vectorEffect',
        'vector-effect': 'vectorEffect',
        version: 'version',
        vertadvy: 'vertAdvY',
        'vert-adv-y': 'vertAdvY',
        vertoriginx: 'vertOriginX',
        'vert-origin-x': 'vertOriginX',
        vertoriginy: 'vertOriginY',
        'vert-origin-y': 'vertOriginY',
        vhanging: 'vHanging',
        'v-hanging': 'vHanging',
        videographic: 'vIdeographic',
        'v-ideographic': 'vIdeographic',
        viewbox: 'viewBox',
        viewtarget: 'viewTarget',
        visibility: 'visibility',
        vmathematical: 'vMathematical',
        'v-mathematical': 'vMathematical',
        vocab: 'vocab',
        widths: 'widths',
        wordspacing: 'wordSpacing',
        'word-spacing': 'wordSpacing',
        writingmode: 'writingMode',
        'writing-mode': 'writingMode',
        x1: 'x1',
        x2: 'x2',
        x: 'x',
        xchannelselector: 'xChannelSelector',
        xheight: 'xHeight',
        'x-height': 'xHeight',
        xlinkactuate: 'xlinkActuate',
        'xlink:actuate': 'xlinkActuate',
        xlinkarcrole: 'xlinkArcrole',
        'xlink:arcrole': 'xlinkArcrole',
        xlinkhref: 'xlinkHref',
        'xlink:href': 'xlinkHref',
        xlinkrole: 'xlinkRole',
        'xlink:role': 'xlinkRole',
        xlinkshow: 'xlinkShow',
        'xlink:show': 'xlinkShow',
        xlinktitle: 'xlinkTitle',
        'xlink:title': 'xlinkTitle',
        xlinktype: 'xlinkType',
        'xlink:type': 'xlinkType',
        xmlbase: 'xmlBase',
        'xml:base': 'xmlBase',
        xmllang: 'xmlLang',
        'xml:lang': 'xmlLang',
        xmlns: 'xmlns',
        'xml:space': 'xmlSpace',
        xmlnsxlink: 'xmlnsXlink',
        'xmlns:xlink': 'xmlnsXlink',
        xmlspace: 'xmlSpace',
        y1: 'y1',
        y2: 'y2',
        y: 'y',
        ychannelselector: 'yChannelSelector',
        z: 'z',
        zoomandpan: 'zoomAndPan'
      };

      var validateProperty$1 = function () {};

      {
        var warnedProperties$1 = {};
        var _hasOwnProperty = Object.prototype.hasOwnProperty;
        var EVENT_NAME_REGEX = /^on./;
        var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
        var rARIA$1 = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
        var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

        validateProperty$1 = function (tagName, name, value, eventRegistry) {
          if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
            return true;
          }

          var lowerCasedName = name.toLowerCase();

          if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
            error('React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');
            warnedProperties$1[name] = true;
            return true;
          } // We can't rely on the event system being injected on the server.


          if (eventRegistry != null) {
            var registrationNameDependencies = eventRegistry.registrationNameDependencies,
                possibleRegistrationNames = eventRegistry.possibleRegistrationNames;

            if (registrationNameDependencies.hasOwnProperty(name)) {
              return true;
            }

            var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;

            if (registrationName != null) {
              error('Invalid event handler property `%s`. Did you mean `%s`?', name, registrationName);
              warnedProperties$1[name] = true;
              return true;
            }

            if (EVENT_NAME_REGEX.test(name)) {
              error('Unknown event handler property `%s`. It will be ignored.', name);
              warnedProperties$1[name] = true;
              return true;
            }
          } else if (EVENT_NAME_REGEX.test(name)) {
            // If no event plugins have been injected, we are in a server environment.
            // So we can't tell if the event name is correct for sure, but we can filter
            // out known bad ones like `onclick`. We can't suggest a specific replacement though.
            if (INVALID_EVENT_NAME_REGEX.test(name)) {
              error('Invalid event handler property `%s`. ' + 'React events use the camelCase naming convention, for example `onClick`.', name);
            }

            warnedProperties$1[name] = true;
            return true;
          } // Let the ARIA attribute hook validate ARIA attributes


          if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
            return true;
          }

          if (lowerCasedName === 'innerhtml') {
            error('Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');
            warnedProperties$1[name] = true;
            return true;
          }

          if (lowerCasedName === 'aria') {
            error('The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');
            warnedProperties$1[name] = true;
            return true;
          }

          if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
            error('Received a `%s` for a string attribute `is`. If this is expected, cast ' + 'the value to a string.', typeof value);
            warnedProperties$1[name] = true;
            return true;
          }

          if (typeof value === 'number' && isNaN(value)) {
            error('Received NaN for the `%s` attribute. If this is expected, cast ' + 'the value to a string.', name);
            warnedProperties$1[name] = true;
            return true;
          }

          var propertyInfo = getPropertyInfo(name);
          var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED; // Known attributes should match the casing specified in the property config.

          if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
            var standardName = possibleStandardNames[lowerCasedName];

            if (standardName !== name) {
              error('Invalid DOM property `%s`. Did you mean `%s`?', name, standardName);
              warnedProperties$1[name] = true;
              return true;
            }
          } else if (!isReserved && name !== lowerCasedName) {
            // Unknown attributes should have lowercase casing since that's how they
            // will be cased anyway with server rendering.
            error('React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.', name, lowerCasedName);
            warnedProperties$1[name] = true;
            return true;
          }

          if (typeof value === 'boolean' && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
            if (value) {
              error('Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.', value, name, name, value, name);
            } else {
              error('Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
            }

            warnedProperties$1[name] = true;
            return true;
          } // Now that we've validated casing, do not validate
          // data types for reserved props


          if (isReserved) {
            return true;
          } // Warn when a known attribute is a bad type


          if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
            warnedProperties$1[name] = true;
            return false;
          } // Warn when passing the strings 'false' or 'true' into a boolean prop


          if ((value === 'false' || value === 'true') && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
            error('Received the string `%s` for the boolean attribute `%s`. ' + '%s ' + 'Did you mean %s={%s}?', value, name, value === 'false' ? 'The browser will interpret it as a truthy value.' : 'Although this works, it will not work as expected if you pass the string "false".', name, value);
            warnedProperties$1[name] = true;
            return true;
          }

          return true;
        };
      }

      var warnUnknownProperties = function (type, props, eventRegistry) {
        {
          var unknownProps = [];

          for (var key in props) {
            var isValid = validateProperty$1(type, key, props[key], eventRegistry);

            if (!isValid) {
              unknownProps.push(key);
            }
          }

          var unknownPropString = unknownProps.map(function (prop) {
            return '`' + prop + '`';
          }).join(', ');

          if (unknownProps.length === 1) {
            error('Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://reactjs.org/link/attribute-behavior ', unknownPropString, type);
          } else if (unknownProps.length > 1) {
            error('Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://reactjs.org/link/attribute-behavior ', unknownPropString, type);
          }
        }
      };

      function validateProperties$2(type, props, eventRegistry) {
        if (isCustomComponent(type, props)) {
          return;
        }

        warnUnknownProperties(type, props, eventRegistry);
      }

      var toArray = React$1.Children.toArray; // This is only used in DEV.
      // Each entry is `this.stack` from a currently executing renderer instance.
      // (There may be more than one because ReactDOMServer is reentrant).
      // Each stack is an array of frames which may contain nested stacks of elements.

      var currentDebugStacks = [];
      var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
      var ReactDebugCurrentFrame$1;
      var prevGetCurrentStackImpl = null;

      var getCurrentServerStackImpl = function () {
        return '';
      };

      var describeStackFrame = function (element) {
        return '';
      };

      var validatePropertiesInDevelopment = function (type, props) {};

      var pushCurrentDebugStack = function (stack) {};

      var pushElementToDebugStack = function (element) {};

      var popCurrentDebugStack = function () {};

      var hasWarnedAboutUsingContextAsConsumer = false;
      {
        ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

        validatePropertiesInDevelopment = function (type, props) {
          validateProperties(type, props);
          validateProperties$1(type, props);
          validateProperties$2(type, props, null);
        };

        describeStackFrame = function (element) {
          return describeUnknownElementTypeFrameInDEV(element.type, element._source, null);
        };

        pushCurrentDebugStack = function (stack) {
          currentDebugStacks.push(stack);

          if (currentDebugStacks.length === 1) {
            // We are entering a server renderer.
            // Remember the previous (e.g. client) global stack implementation.
            prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
            ReactDebugCurrentFrame$1.getCurrentStack = getCurrentServerStackImpl;
          }
        };

        pushElementToDebugStack = function (element) {
          // For the innermost executing ReactDOMServer call,
          var stack = currentDebugStacks[currentDebugStacks.length - 1]; // Take the innermost executing frame (e.g. <Foo>),

          var frame = stack[stack.length - 1]; // and record that it has one more element associated with it.

          frame.debugElementStack.push(element); // We only need this because we tail-optimize single-element
          // children and directly handle them in an inner loop instead of
          // creating separate frames for them.
        };

        popCurrentDebugStack = function () {
          currentDebugStacks.pop();

          if (currentDebugStacks.length === 0) {
            // We are exiting the server renderer.
            // Restore the previous (e.g. client) global stack implementation.
            ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
            prevGetCurrentStackImpl = null;
          }
        };

        getCurrentServerStackImpl = function () {
          if (currentDebugStacks.length === 0) {
            // Nothing is currently rendering.
            return '';
          } // ReactDOMServer is reentrant so there may be multiple calls at the same time.
          // Take the frames from the innermost call which is the last in the array.


          var frames = currentDebugStacks[currentDebugStacks.length - 1];
          var stack = ''; // Go through every frame in the stack from the innermost one.

          for (var i = frames.length - 1; i >= 0; i--) {
            var frame = frames[i]; // Every frame might have more than one debug element stack entry associated with it.
            // This is because single-child nesting doesn't create materialized frames.
            // Instead it would push them through `pushElementToDebugStack()`.

            var debugElementStack = frame.debugElementStack;

            for (var ii = debugElementStack.length - 1; ii >= 0; ii--) {
              stack += describeStackFrame(debugElementStack[ii]);
            }
          }

          return stack;
        };
      }
      var didWarnDefaultInputValue = false;
      var didWarnDefaultChecked = false;
      var didWarnDefaultSelectValue = false;
      var didWarnDefaultTextareaValue = false;
      var didWarnInvalidOptionChildren = false;
      var didWarnAboutNoopUpdateForComponent = {};
      var didWarnAboutBadClass = {};
      var didWarnAboutModulePatternComponent = {};
      var didWarnAboutDeprecatedWillMount = {};
      var didWarnAboutUndefinedDerivedState = {};
      var didWarnAboutUninitializedState = {};
      var valuePropNames = ['value', 'defaultValue'];
      var newlineEatingTags = {
        listing: true,
        pre: true,
        textarea: true
      }; // We accept any tag to be rendered but since this gets injected into arbitrary
      // HTML, we want to make sure that it's a safe tag.
      // http://www.w3.org/TR/REC-xml/#NT-Name

      var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset

      var validatedTagCache = {};

      function validateDangerousTag(tag) {
        if (!validatedTagCache.hasOwnProperty(tag)) {
          if (!VALID_TAG_REGEX.test(tag)) {
            {
              throw Error("Invalid tag: " + tag);
            }
          }

          validatedTagCache[tag] = true;
        }
      }

      var styleNameCache = {};

      var processStyleName = function (styleName) {
        if (styleNameCache.hasOwnProperty(styleName)) {
          return styleNameCache[styleName];
        }

        var result = hyphenateStyleName(styleName);
        styleNameCache[styleName] = result;
        return result;
      };

      function createMarkupForStyles(styles) {
        var serialized = '';
        var delimiter = '';

        for (var styleName in styles) {
          if (!styles.hasOwnProperty(styleName)) {
            continue;
          }

          var isCustomProperty = styleName.indexOf('--') === 0;
          var styleValue = styles[styleName];
          {
            if (!isCustomProperty) {
              warnValidStyle$1(styleName, styleValue);
            }
          }

          if (styleValue != null) {
            serialized += delimiter + (isCustomProperty ? styleName : processStyleName(styleName)) + ':';
            serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);
            delimiter = ';';
          }
        }

        return serialized || null;
      }

      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor;
          var componentName = _constructor && getComponentName(_constructor) || 'ReactClass';
          var warningKey = componentName + '.' + callerName;

          if (didWarnAboutNoopUpdateForComponent[warningKey]) {
            return;
          }

          error('%s(...): Can only update a mounting component. ' + 'This usually means you called %s() outside componentWillMount() on the server. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
          didWarnAboutNoopUpdateForComponent[warningKey] = true;
        }
      }

      function shouldConstruct$1(Component) {
        return Component.prototype && Component.prototype.isReactComponent;
      }

      function getNonChildrenInnerMarkup(props) {
        var innerHTML = props.dangerouslySetInnerHTML;

        if (innerHTML != null) {
          if (innerHTML.__html != null) {
            return innerHTML.__html;
          }
        } else {
          var content = props.children;

          if (typeof content === 'string' || typeof content === 'number') {
            return escapeTextForBrowser(content);
          }
        }

        return null;
      }

      function flattenTopLevelChildren(children) {
        if (!React$1.isValidElement(children)) {
          return toArray(children);
        }

        var element = children;

        if (element.type !== REACT_FRAGMENT_TYPE) {
          return [element];
        }

        var fragmentChildren = element.props.children;

        if (!React$1.isValidElement(fragmentChildren)) {
          return toArray(fragmentChildren);
        }

        var fragmentChildElement = fragmentChildren;
        return [fragmentChildElement];
      }

      function flattenOptionChildren(children) {
        if (children === undefined || children === null) {
          return children;
        }

        var content = ''; // Flatten children and warn if they aren't strings or numbers;
        // invalid types are ignored.

        React$1.Children.forEach(children, function (child) {
          if (child == null) {
            return;
          }

          content += child;
          {
            if (!didWarnInvalidOptionChildren && typeof child !== 'string' && typeof child !== 'number') {
              didWarnInvalidOptionChildren = true;
              error('Only strings and numbers are supported as <option> children.');
            }
          }
        });
        return content;
      }

      var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
      var STYLE = 'style';
      var RESERVED_PROPS = {
        children: null,
        dangerouslySetInnerHTML: null,
        suppressContentEditableWarning: null,
        suppressHydrationWarning: null
      };

      function createOpenTagMarkup(tagVerbatim, tagLowercase, props, namespace, makeStaticMarkup, isRootElement) {
        var ret = '<' + tagVerbatim;
        var isCustomComponent$1 = isCustomComponent(tagLowercase, props);

        for (var propKey in props) {
          if (!hasOwnProperty$2.call(props, propKey)) {
            continue;
          }

          var propValue = props[propKey];

          if (propValue == null) {
            continue;
          }

          if (propKey === STYLE) {
            propValue = createMarkupForStyles(propValue);
          }

          var markup = null;

          if (isCustomComponent$1) {
            if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
              markup = createMarkupForCustomAttribute(propKey, propValue);
            }
          } else {
            markup = createMarkupForProperty(propKey, propValue);
          }

          if (markup) {
            ret += ' ' + markup;
          }
        } // For static pages, no need to put React ID and checksum. Saves lots of
        // bytes.


        if (makeStaticMarkup) {
          return ret;
        }

        if (isRootElement) {
          ret += ' ' + createMarkupForRoot();
        }

        return ret;
      }

      function validateRenderResult(child, type) {
        if (child === undefined) {
          {
            {
              throw Error((getComponentName(type) || 'Component') + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.");
            }
          }
        }
      }

      function resolve(child, context, threadID) {
        while (React$1.isValidElement(child)) {
          // Safe because we just checked it's an element.
          var element = child;
          var Component = element.type;
          {
            pushElementToDebugStack(element);
          }

          if (typeof Component !== 'function') {
            break;
          }

          processChild(element, Component);
        } // Extra closure so queue and replace can be captured properly


        function processChild(element, Component) {
          var isClass = shouldConstruct$1(Component);
          var publicContext = processContext(Component, context, threadID, isClass);
          var queue = [];
          var replace = false;
          var updater = {
            isMounted: function (publicInstance) {
              return false;
            },
            enqueueForceUpdate: function (publicInstance) {
              if (queue === null) {
                warnNoop(publicInstance, 'forceUpdate');
                return null;
              }
            },
            enqueueReplaceState: function (publicInstance, completeState) {
              replace = true;
              queue = [completeState];
            },
            enqueueSetState: function (publicInstance, currentPartialState) {
              if (queue === null) {
                warnNoop(publicInstance, 'setState');
                return null;
              }

              queue.push(currentPartialState);
            }
          };
          var inst;

          if (isClass) {
            inst = new Component(element.props, publicContext, updater);

            if (typeof Component.getDerivedStateFromProps === 'function') {
              {
                if (inst.state === null || inst.state === undefined) {
                  var componentName = getComponentName(Component) || 'Unknown';

                  if (!didWarnAboutUninitializedState[componentName]) {
                    error('`%s` uses `getDerivedStateFromProps` but its initial state is ' + '%s. This is not recommended. Instead, define the initial state by ' + 'assigning an object to `this.state` in the constructor of `%s`. ' + 'This ensures that `getDerivedStateFromProps` arguments have a consistent shape.', componentName, inst.state === null ? 'null' : 'undefined', componentName);
                    didWarnAboutUninitializedState[componentName] = true;
                  }
                }
              }
              var partialState = Component.getDerivedStateFromProps.call(null, element.props, inst.state);
              {
                if (partialState === undefined) {
                  var _componentName = getComponentName(Component) || 'Unknown';

                  if (!didWarnAboutUndefinedDerivedState[_componentName]) {
                    error('%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. ' + 'You have returned undefined.', _componentName);
                    didWarnAboutUndefinedDerivedState[_componentName] = true;
                  }
                }
              }

              if (partialState != null) {
                inst.state = _assign({}, inst.state, partialState);
              }
            }
          } else {
            {
              if (Component.prototype && typeof Component.prototype.render === 'function') {
                var _componentName2 = getComponentName(Component) || 'Unknown';

                if (!didWarnAboutBadClass[_componentName2]) {
                  error("The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', _componentName2, _componentName2);
                  didWarnAboutBadClass[_componentName2] = true;
                }
              }
            }
            var componentIdentity = {};
            prepareToUseHooks(componentIdentity);
            inst = Component(element.props, publicContext, updater);
            inst = finishHooks(Component, element.props, inst, publicContext);
            {
              // Support for module components is deprecated and is removed behind a flag.
              // Whether or not it would crash later, we want to show a good message in DEV first.
              if (inst != null && inst.render != null) {
                var _componentName3 = getComponentName(Component) || 'Unknown';

                if (!didWarnAboutModulePatternComponent[_componentName3]) {
                  error('The <%s /> component appears to be a function component that returns a class instance. ' + 'Change %s to a class that extends React.Component instead. ' + "If you can't use a class try assigning the prototype on the function as a workaround. " + "`%s.prototype = React.Component.prototype`. Don't use an arrow function since it " + 'cannot be called with `new` by React.', _componentName3, _componentName3, _componentName3);
                  didWarnAboutModulePatternComponent[_componentName3] = true;
                }
              }
            } // If the flag is on, everything is assumed to be a function component.
            // Otherwise, we also do the unfortunate dynamic checks.

            if (inst == null || inst.render == null) {
              child = inst;
              validateRenderResult(child, Component);
              return;
            }
          }

          inst.props = element.props;
          inst.context = publicContext;
          inst.updater = updater;
          var initialState = inst.state;

          if (initialState === undefined) {
            inst.state = initialState = null;
          }

          if (typeof inst.UNSAFE_componentWillMount === 'function' || typeof inst.componentWillMount === 'function') {
            if (typeof inst.componentWillMount === 'function') {
              {
                if (inst.componentWillMount.__suppressDeprecationWarning !== true) {
                  var _componentName4 = getComponentName(Component) || 'Unknown';

                  if (!didWarnAboutDeprecatedWillMount[_componentName4]) {
                    warn( // keep this warning in sync with ReactStrictModeWarning.js
                    'componentWillMount has been renamed, and is not recommended for use. ' + 'See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n' + '* Move code from componentWillMount to componentDidMount (preferred in most cases) ' + 'or the constructor.\n' + '\nPlease update the following components: %s', _componentName4);
                    didWarnAboutDeprecatedWillMount[_componentName4] = true;
                  }
                }
              } // In order to support react-lifecycles-compat polyfilled components,
              // Unsafe lifecycles should not be invoked for any component with the new gDSFP.

              if (typeof Component.getDerivedStateFromProps !== 'function') {
                inst.componentWillMount();
              }
            }

            if (typeof inst.UNSAFE_componentWillMount === 'function' && typeof Component.getDerivedStateFromProps !== 'function') {
              // In order to support react-lifecycles-compat polyfilled components,
              // Unsafe lifecycles should not be invoked for any component with the new gDSFP.
              inst.UNSAFE_componentWillMount();
            }

            if (queue.length) {
              var oldQueue = queue;
              var oldReplace = replace;
              queue = null;
              replace = false;

              if (oldReplace && oldQueue.length === 1) {
                inst.state = oldQueue[0];
              } else {
                var nextState = oldReplace ? oldQueue[0] : inst.state;
                var dontMutate = true;

                for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
                  var partial = oldQueue[i];

                  var _partialState = typeof partial === 'function' ? partial.call(inst, nextState, element.props, publicContext) : partial;

                  if (_partialState != null) {
                    if (dontMutate) {
                      dontMutate = false;
                      nextState = _assign({}, nextState, _partialState);
                    } else {
                      _assign(nextState, _partialState);
                    }
                  }
                }

                inst.state = nextState;
              }
            } else {
              queue = null;
            }
          }

          child = inst.render();
          {
            if (child === undefined && inst.render._isMockFunction) {
              // This is probably bad practice. Consider warning here and
              // deprecating this convenience.
              child = null;
            }
          }
          validateRenderResult(child, Component);
          var childContext;
          {
            if (typeof inst.getChildContext === 'function') {
              var _childContextTypes = Component.childContextTypes;

              if (typeof _childContextTypes === 'object') {
                childContext = inst.getChildContext();

                for (var contextKey in childContext) {
                  if (!(contextKey in _childContextTypes)) {
                    {
                      throw Error((getComponentName(Component) || 'Unknown') + ".getChildContext(): key \"" + contextKey + "\" is not defined in childContextTypes.");
                    }
                  }
                }
              } else {
                {
                  error('%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', getComponentName(Component) || 'Unknown');
                }
              }
            }

            if (childContext) {
              context = _assign({}, context, childContext);
            }
          }
        }

        return {
          child: child,
          context: context
        };
      }

      var ReactDOMServerRenderer = /*#__PURE__*/function () {
        // TODO: type this more strictly:
        // DEV-only
        function ReactDOMServerRenderer(children, makeStaticMarkup, options) {
          var flatChildren = flattenTopLevelChildren(children);
          var topFrame = {
            type: null,
            // Assume all trees start in the HTML namespace (not totally true, but
            // this is what we did historically)
            domNamespace: Namespaces.html,
            children: flatChildren,
            childIndex: 0,
            context: emptyObject,
            footer: ''
          };
          {
            topFrame.debugElementStack = [];
          }
          this.threadID = allocThreadID();
          this.stack = [topFrame];
          this.exhausted = false;
          this.currentSelectValue = null;
          this.previousWasTextNode = false;
          this.makeStaticMarkup = makeStaticMarkup;
          this.suspenseDepth = 0; // Context (new API)

          this.contextIndex = -1;
          this.contextStack = [];
          this.contextValueStack = []; // useOpaqueIdentifier ID

          this.uniqueID = 0;
          this.identifierPrefix = options && options.identifierPrefix || '';
          {
            this.contextProviderStack = [];
          }
        }

        var _proto = ReactDOMServerRenderer.prototype;

        _proto.destroy = function destroy() {
          if (!this.exhausted) {
            this.exhausted = true;
            this.clearProviders();
            freeThreadID(this.threadID);
          }
        }
        /**
         * Note: We use just two stacks regardless of how many context providers you have.
         * Providers are always popped in the reverse order to how they were pushed
         * so we always know on the way down which provider you'll encounter next on the way up.
         * On the way down, we push the current provider, and its context value *before*
         * we mutated it, onto the stacks. Therefore, on the way up, we always know which
         * provider needs to be "restored" to which value.
         * https://github.com/facebook/react/pull/12985#issuecomment-396301248
         */
        ;

        _proto.pushProvider = function pushProvider(provider) {
          var index = ++this.contextIndex;
          var context = provider.type._context;
          var threadID = this.threadID;
          validateContextBounds(context, threadID);
          var previousValue = context[threadID]; // Remember which value to restore this context to on our way up.

          this.contextStack[index] = context;
          this.contextValueStack[index] = previousValue;
          {
            // Only used for push/pop mismatch warnings.
            this.contextProviderStack[index] = provider;
          } // Mutate the current value.

          context[threadID] = provider.props.value;
        };

        _proto.popProvider = function popProvider(provider) {
          var index = this.contextIndex;
          {
            if (index < 0 || provider !== this.contextProviderStack[index]) {
              error('Unexpected pop.');
            }
          }
          var context = this.contextStack[index];
          var previousValue = this.contextValueStack[index]; // "Hide" these null assignments from Flow by using `any`
          // because conceptually they are deletions--as long as we
          // promise to never access values beyond `this.contextIndex`.

          this.contextStack[index] = null;
          this.contextValueStack[index] = null;
          {
            this.contextProviderStack[index] = null;
          }
          this.contextIndex--; // Restore to the previous value we stored as we were walking down.
          // We've already verified that this context has been expanded to accommodate
          // this thread id, so we don't need to do it again.

          context[this.threadID] = previousValue;
        };

        _proto.clearProviders = function clearProviders() {
          // Restore any remaining providers on the stack to previous values
          for (var index = this.contextIndex; index >= 0; index--) {
            var context = this.contextStack[index];
            var previousValue = this.contextValueStack[index];
            context[this.threadID] = previousValue;
          }
        };

        _proto.read = function read(bytes) {
          if (this.exhausted) {
            return null;
          }

          var prevPartialRenderer = currentPartialRenderer;
          setCurrentPartialRenderer(this);
          var prevDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current = Dispatcher;

          try {
            // Markup generated within <Suspense> ends up buffered until we know
            // nothing in that boundary suspended
            var out = [''];
            var suspended = false;

            while (out[0].length < bytes) {
              if (this.stack.length === 0) {
                this.exhausted = true;
                freeThreadID(this.threadID);
                break;
              }

              var frame = this.stack[this.stack.length - 1];

              if (suspended || frame.childIndex >= frame.children.length) {
                var footer = frame.footer;

                if (footer !== '') {
                  this.previousWasTextNode = false;
                }

                this.stack.pop();

                if (frame.type === 'select') {
                  this.currentSelectValue = null;
                } else if (frame.type != null && frame.type.type != null && frame.type.type.$$typeof === REACT_PROVIDER_TYPE) {
                  var provider = frame.type;
                  this.popProvider(provider);
                } else if (frame.type === REACT_SUSPENSE_TYPE) {
                  this.suspenseDepth--;
                  var buffered = out.pop();

                  if (suspended) {
                    suspended = false; // If rendering was suspended at this boundary, render the fallbackFrame

                    var fallbackFrame = frame.fallbackFrame;

                    if (!fallbackFrame) {
                      {
                        throw Error(true ? "ReactDOMServer did not find an internal fallback frame for Suspense. This is a bug in React. Please file an issue." : formatProdErrorMessage(303));
                      }
                    }

                    this.stack.push(fallbackFrame);
                    out[this.suspenseDepth] += '<!--$!-->'; // Skip flushing output since we're switching to the fallback

                    continue;
                  } else {
                    out[this.suspenseDepth] += buffered;
                  }
                } // Flush output


                out[this.suspenseDepth] += footer;
                continue;
              }

              var child = frame.children[frame.childIndex++];
              var outBuffer = '';

              if (true) {
                pushCurrentDebugStack(this.stack); // We're starting work on this frame, so reset its inner stack.

                frame.debugElementStack.length = 0;
              }

              try {
                outBuffer += this.render(child, frame.context, frame.domNamespace);
              } catch (err) {
                if (err != null && typeof err.then === 'function') {
                  if (enableSuspenseServerRenderer) ; else {
                    if (!false) {
                      {
                        throw Error(true ? "ReactDOMServer does not yet support Suspense." : formatProdErrorMessage(294));
                      }
                    }
                  }
                } else {
                  throw err;
                }
              } finally {
                if (true) {
                  popCurrentDebugStack();
                }
              }

              if (out.length <= this.suspenseDepth) {
                out.push('');
              }

              out[this.suspenseDepth] += outBuffer;
            }

            return out[0];
          } finally {
            ReactCurrentDispatcher$1.current = prevDispatcher;
            setCurrentPartialRenderer(prevPartialRenderer);
            resetHooksState();
          }
        };

        _proto.render = function render(child, context, parentNamespace) {
          if (typeof child === 'string' || typeof child === 'number') {
            var text = '' + child;

            if (text === '') {
              return '';
            }

            if (this.makeStaticMarkup) {
              return escapeTextForBrowser(text);
            }

            if (this.previousWasTextNode) {
              return '<!-- -->' + escapeTextForBrowser(text);
            }

            this.previousWasTextNode = true;
            return escapeTextForBrowser(text);
          } else {
            var nextChild;

            var _resolve = resolve(child, context, this.threadID);

            nextChild = _resolve.child;
            context = _resolve.context;

            if (nextChild === null || nextChild === false) {
              return '';
            } else if (!React$1.isValidElement(nextChild)) {
              if (nextChild != null && nextChild.$$typeof != null) {
                // Catch unexpected special types early.
                var $$typeof = nextChild.$$typeof;

                if (!($$typeof !== REACT_PORTAL_TYPE)) {
                  {
                    throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
                  }
                } // Catch-all to prevent an infinite loop if React.Children.toArray() supports some new type.


                {
                  {
                    throw Error("Unknown element-like object type: " + $$typeof.toString() + ". This is likely a bug in React. Please file an issue.");
                  }
                }
              }

              var nextChildren = toArray(nextChild);
              var frame = {
                type: null,
                domNamespace: parentNamespace,
                children: nextChildren,
                childIndex: 0,
                context: context,
                footer: ''
              };
              {
                frame.debugElementStack = [];
              }
              this.stack.push(frame);
              return '';
            } // Safe because we just checked it's an element.


            var nextElement = nextChild;
            var elementType = nextElement.type;

            if (typeof elementType === 'string') {
              return this.renderDOM(nextElement, context, parentNamespace);
            }

            switch (elementType) {
              // TODO: LegacyHidden acts the same as a fragment. This only works
              // because we currently assume that every instance of LegacyHidden is
              // accompanied by a host component wrapper. In the hidden mode, the host
              // component is given a `hidden` attribute, which ensures that the
              // initial HTML is not visible. To support the use of LegacyHidden as a
              // true fragment, without an extra DOM node, we would have to hide the
              // initial HTML in some other way.
              case REACT_LEGACY_HIDDEN_TYPE:
              case REACT_DEBUG_TRACING_MODE_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_SUSPENSE_LIST_TYPE:
              case REACT_FRAGMENT_TYPE:
                {
                  var _nextChildren = toArray(nextChild.props.children);

                  var _frame = {
                    type: null,
                    domNamespace: parentNamespace,
                    children: _nextChildren,
                    childIndex: 0,
                    context: context,
                    footer: ''
                  };
                  {
                    _frame.debugElementStack = [];
                  }
                  this.stack.push(_frame);
                  return '';
                }

              case REACT_SUSPENSE_TYPE:
                {
                  {
                    {
                      {
                        throw Error("ReactDOMServer does not yet support Suspense.");
                      }
                    }
                  }
                }
              // eslint-disable-next-line-no-fallthrough

              case REACT_SCOPE_TYPE:
                {
                  {
                    {
                      throw Error("ReactDOMServer does not yet support scope components.");
                    }
                  }
                }
            }

            if (typeof elementType === 'object' && elementType !== null) {
              switch (elementType.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  {
                    var element = nextChild;

                    var _nextChildren5;

                    var componentIdentity = {};
                    prepareToUseHooks(componentIdentity);
                    _nextChildren5 = elementType.render(element.props, element.ref);
                    _nextChildren5 = finishHooks(elementType.render, element.props, _nextChildren5, element.ref);
                    _nextChildren5 = toArray(_nextChildren5);
                    var _frame5 = {
                      type: null,
                      domNamespace: parentNamespace,
                      children: _nextChildren5,
                      childIndex: 0,
                      context: context,
                      footer: ''
                    };
                    {
                      _frame5.debugElementStack = [];
                    }
                    this.stack.push(_frame5);
                    return '';
                  }

                case REACT_MEMO_TYPE:
                  {
                    var _element = nextChild;
                    var _nextChildren6 = [React$1.createElement(elementType.type, _assign({
                      ref: _element.ref
                    }, _element.props))];
                    var _frame6 = {
                      type: null,
                      domNamespace: parentNamespace,
                      children: _nextChildren6,
                      childIndex: 0,
                      context: context,
                      footer: ''
                    };
                    {
                      _frame6.debugElementStack = [];
                    }
                    this.stack.push(_frame6);
                    return '';
                  }

                case REACT_PROVIDER_TYPE:
                  {
                    var provider = nextChild;
                    var nextProps = provider.props;

                    var _nextChildren7 = toArray(nextProps.children);

                    var _frame7 = {
                      type: provider,
                      domNamespace: parentNamespace,
                      children: _nextChildren7,
                      childIndex: 0,
                      context: context,
                      footer: ''
                    };
                    {
                      _frame7.debugElementStack = [];
                    }
                    this.pushProvider(provider);
                    this.stack.push(_frame7);
                    return '';
                  }

                case REACT_CONTEXT_TYPE:
                  {
                    var reactContext = nextChild.type; // The logic below for Context differs depending on PROD or DEV mode. In
                    // DEV mode, we create a separate object for Context.Consumer that acts
                    // like a proxy to Context. This proxy object adds unnecessary code in PROD
                    // so we use the old behaviour (Context.Consumer references Context) to
                    // reduce size and overhead. The separate object references context via
                    // a property called "_context", which also gives us the ability to check
                    // in DEV mode if this property exists or not and warn if it does not.

                    {
                      if (reactContext._context === undefined) {
                        // This may be because it's a Context (rather than a Consumer).
                        // Or it may be because it's older React where they're the same thing.
                        // We only want to warn if we're sure it's a new React.
                        if (reactContext !== reactContext.Consumer) {
                          if (!hasWarnedAboutUsingContextAsConsumer) {
                            hasWarnedAboutUsingContextAsConsumer = true;
                            error('Rendering <Context> directly is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
                          }
                        }
                      } else {
                        reactContext = reactContext._context;
                      }
                    }
                    var _nextProps = nextChild.props;
                    var threadID = this.threadID;
                    validateContextBounds(reactContext, threadID);
                    var nextValue = reactContext[threadID];

                    var _nextChildren8 = toArray(_nextProps.children(nextValue));

                    var _frame8 = {
                      type: nextChild,
                      domNamespace: parentNamespace,
                      children: _nextChildren8,
                      childIndex: 0,
                      context: context,
                      footer: ''
                    };
                    {
                      _frame8.debugElementStack = [];
                    }
                    this.stack.push(_frame8);
                    return '';
                  }
                // eslint-disable-next-line-no-fallthrough

                case REACT_FUNDAMENTAL_TYPE:
                  {
                    {
                      {
                        throw Error("ReactDOMServer does not yet support the fundamental API.");
                      }
                    }
                  }
                // eslint-disable-next-line-no-fallthrough

                case REACT_LAZY_TYPE:
                  {
                    var _element2 = nextChild;
                    var lazyComponent = nextChild.type; // Attempt to initialize lazy component regardless of whether the
                    // suspense server-side renderer is enabled so synchronously
                    // resolved constructors are supported.

                    var payload = lazyComponent._payload;
                    var init = lazyComponent._init;
                    var result = init(payload);
                    var _nextChildren10 = [React$1.createElement(result, _assign({
                      ref: _element2.ref
                    }, _element2.props))];
                    var _frame10 = {
                      type: null,
                      domNamespace: parentNamespace,
                      children: _nextChildren10,
                      childIndex: 0,
                      context: context,
                      footer: ''
                    };
                    {
                      _frame10.debugElementStack = [];
                    }
                    this.stack.push(_frame10);
                    return '';
                  }
              }
            }

            var info = '';
            {
              var owner = nextElement._owner;

              if (elementType === undefined || typeof elementType === 'object' && elementType !== null && Object.keys(elementType).length === 0) {
                info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and " + 'named imports.';
              }

              var ownerName = owner ? getComponentName(owner) : null;

              if (ownerName) {
                info += '\n\nCheck the render method of `' + ownerName + '`.';
              }
            }
            {
              {
                throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (elementType == null ? elementType : typeof elementType) + "." + info);
              }
            }
          }
        };

        _proto.renderDOM = function renderDOM(element, context, parentNamespace) {
          var tag = element.type.toLowerCase();
          var namespace = parentNamespace;

          if (parentNamespace === Namespaces.html) {
            namespace = getIntrinsicNamespace(tag);
          }

          {
            if (namespace === Namespaces.html) {
              // Should this check be gated by parent namespace? Not sure we want to
              // allow <SVG> or <mATH>.
              if (tag !== element.type) {
                error('<%s /> is using incorrect casing. ' + 'Use PascalCase for React components, ' + 'or lowercase for HTML elements.', element.type);
              }
            }
          }
          validateDangerousTag(tag);
          var props = element.props;

          if (tag === 'input') {
            {
              checkControlledValueProps('input', props);

              if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnDefaultChecked) {
                error('%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components', 'A component', props.type);
                didWarnDefaultChecked = true;
              }

              if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultInputValue) {
                error('%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components', 'A component', props.type);
                didWarnDefaultInputValue = true;
              }
            }
            props = _assign({
              type: undefined
            }, props, {
              defaultChecked: undefined,
              defaultValue: undefined,
              value: props.value != null ? props.value : props.defaultValue,
              checked: props.checked != null ? props.checked : props.defaultChecked
            });
          } else if (tag === 'textarea') {
            {
              checkControlledValueProps('textarea', props);

              if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultTextareaValue) {
                error('Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components');
                didWarnDefaultTextareaValue = true;
              }
            }
            var initialValue = props.value;

            if (initialValue == null) {
              var defaultValue = props.defaultValue; // TODO (yungsters): Remove support for children content in <textarea>.

              var textareaChildren = props.children;

              if (textareaChildren != null) {
                {
                  error('Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
                }

                if (!(defaultValue == null)) {
                  {
                    throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
                  }
                }

                if (Array.isArray(textareaChildren)) {
                  if (!(textareaChildren.length <= 1)) {
                    {
                      throw Error("<textarea> can only have at most one child.");
                    }
                  }

                  textareaChildren = textareaChildren[0];
                }

                defaultValue = '' + textareaChildren;
              }

              if (defaultValue == null) {
                defaultValue = '';
              }

              initialValue = defaultValue;
            }

            props = _assign({}, props, {
              value: undefined,
              children: '' + initialValue
            });
          } else if (tag === 'select') {
            {
              checkControlledValueProps('select', props);

              for (var i = 0; i < valuePropNames.length; i++) {
                var propName = valuePropNames[i];

                if (props[propName] == null) {
                  continue;
                }

                var isArray = Array.isArray(props[propName]);

                if (props.multiple && !isArray) {
                  error('The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.', propName);
                } else if (!props.multiple && isArray) {
                  error('The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.', propName);
                }
              }

              if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultSelectValue) {
                error('Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://reactjs.org/link/controlled-components');
                didWarnDefaultSelectValue = true;
              }
            }
            this.currentSelectValue = props.value != null ? props.value : props.defaultValue;
            props = _assign({}, props, {
              value: undefined
            });
          } else if (tag === 'option') {
            var selected = null;
            var selectValue = this.currentSelectValue;
            var optionChildren = flattenOptionChildren(props.children);

            if (selectValue != null) {
              var value;

              if (props.value != null) {
                value = props.value + '';
              } else {
                value = optionChildren;
              }

              selected = false;

              if (Array.isArray(selectValue)) {
                // multiple
                for (var j = 0; j < selectValue.length; j++) {
                  if ('' + selectValue[j] === value) {
                    selected = true;
                    break;
                  }
                }
              } else {
                selected = '' + selectValue === value;
              }

              props = _assign({
                selected: undefined,
                children: undefined
              }, props, {
                selected: selected,
                children: optionChildren
              });
            }
          }

          {
            validatePropertiesInDevelopment(tag, props);
          }
          assertValidProps(tag, props);
          var out = createOpenTagMarkup(element.type, tag, props, namespace, this.makeStaticMarkup, this.stack.length === 1);
          var footer = '';

          if (omittedCloseTags.hasOwnProperty(tag)) {
            out += '/>';
          } else {
            out += '>';
            footer = '</' + element.type + '>';
          }

          var children;
          var innerMarkup = getNonChildrenInnerMarkup(props);

          if (innerMarkup != null) {
            children = [];

            if (newlineEatingTags.hasOwnProperty(tag) && innerMarkup.charAt(0) === '\n') {
              // text/html ignores the first character in these tags if it's a newline
              // Prefer to break application/xml over text/html (for now) by adding
              // a newline specifically to get eaten by the parser. (Alternately for
              // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
              // \r is normalized out by HTMLTextAreaElement#value.)
              // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
              // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
              // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
              // See: Parsing of "textarea" "listing" and "pre" elements
              //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
              out += '\n';
            }

            out += innerMarkup;
          } else {
            children = toArray(props.children);
          }

          var frame = {
            domNamespace: getChildNamespace(parentNamespace, element.type),
            type: tag,
            children: children,
            childIndex: 0,
            context: context,
            footer: footer
          };
          {
            frame.debugElementStack = [];
          }
          this.stack.push(frame);
          this.previousWasTextNode = false;
          return out;
        };

        return ReactDOMServerRenderer;
      }();
      /**
       * Render a ReactElement to its initial HTML. This should only be used on the
       * server.
       * See https://reactjs.org/docs/react-dom-server.html#rendertostring
       */


      function renderToString(element, options) {
        var renderer = new ReactDOMServerRenderer(element, false, options);

        try {
          var markup = renderer.read(Infinity);
          return markup;
        } finally {
          renderer.destroy();
        }
      }
      /**
       * Similar to renderToString, except this doesn't create extra DOM attributes
       * such as data-react-id that React uses internally.
       * See https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
       */


      function renderToStaticMarkup(element, options) {
        var renderer = new ReactDOMServerRenderer(element, true, options);

        try {
          var markup = renderer.read(Infinity);
          return markup;
        } finally {
          renderer.destroy();
        }
      }

      function renderToNodeStream() {
        {
          {
            throw Error("ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead.");
          }
        }
      }

      function renderToStaticNodeStream() {
        {
          {
            throw Error("ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.");
          }
        }
      }

      exports.renderToNodeStream = renderToNodeStream;
      exports.renderToStaticMarkup = renderToStaticMarkup;
      exports.renderToStaticNodeStream = renderToStaticNodeStream;
      exports.renderToString = renderToString;
      exports.version = ReactVersion;
    })();
  }
});

var server_browser = createCommonjsModule(function (module) {

  if (process.env.NODE_ENV === 'production') {
    module.exports = reactDomServer_browser_production_min;
  } else {
    module.exports = reactDomServer_browser_development;
  }
});

/*
QuillToolbar is deprecated. Consider switching to the official Quill
toolbar format, or providing your own toolbar instead. 
See https://quilljs.com/docs/modules/toolbar
*/

var defaultColors = ['rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)', 'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)', 'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)', 'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)', 'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)', 'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)', 'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)', 'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)', 'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)', 'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)', 'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)', 'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)'].map(function (color) {
  return {
    value: color
  };
});
var defaultItems = [{
  label: 'Formats',
  type: 'group',
  items: [{
    label: 'Font',
    type: 'font',
    items: [{
      label: 'Sans Serif',
      value: 'sans-serif',
      selected: true
    }, {
      label: 'Serif',
      value: 'serif'
    }, {
      label: 'Monospace',
      value: 'monospace'
    }]
  }, {
    label: 'Size',
    type: 'size',
    items: [{
      label: 'Small',
      value: '10px'
    }, {
      label: 'Normal',
      value: '13px',
      selected: true
    }, {
      label: 'Large',
      value: '18px'
    }, {
      label: 'Huge',
      value: '32px'
    }]
  }, {
    label: 'Alignment',
    type: 'align',
    items: [{
      label: '',
      value: '',
      selected: true
    }, {
      label: '',
      value: 'center'
    }, {
      label: '',
      value: 'right'
    }, {
      label: '',
      value: 'justify'
    }]
  }]
}, {
  label: 'Text',
  type: 'group',
  items: [{
    type: 'bold',
    label: 'Bold'
  }, {
    type: 'italic',
    label: 'Italic'
  }, {
    type: 'strike',
    label: 'Strike'
  }, {
    type: 'underline',
    label: 'Underline'
  }, {
    type: 'color',
    label: 'Color',
    items: defaultColors
  }, {
    type: 'background',
    label: 'Background color',
    items: defaultColors
  }, {
    type: 'link',
    label: 'Link'
  }]
}, {
  label: 'Blocks',
  type: 'group',
  items: [{
    type: 'list',
    value: 'bullet'
  }, {
    type: 'list',
    value: 'ordered'
  }]
}, {
  label: 'Blocks',
  type: 'group',
  items: [{
    type: 'image',
    label: 'Image'
  }]
}];
var QuillToolbar = createReactClass({
  displayName: 'Quill Toolbar',
  propTypes: {
    id: propTypes.string,
    className: propTypes.string,
    style: propTypes.object,
    items: propTypes.array
  },
  getDefaultProps: function () {
    return {
      items: defaultItems
    };
  },
  componentDidMount: function () {
    console.warn('QuillToolbar is deprecated. Consider switching to the official Quill ' + 'toolbar format, or providing your own toolbar instead. ' + 'See: https://github.com/zenoamaro/react-quill#upgrading-to-react-quill-v1-0-0');
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    return !isEqual_1(nextProps, this.props);
  },
  renderGroup: function (item, key) {
    return reactDomFactories.span({
      key: item.label || key,
      className: 'ql-formats'
    }, item.items.map(this.renderItem));
  },
  renderChoiceItem: function (item, key) {
    return reactDomFactories.option({
      key: item.label || item.value || key,
      value: item.value
    }, item.label);
  },
  renderChoices: function (item, key) {
    var choiceItems = item.items.map(this.renderChoiceItem);
    var selectedItem = find_1(item.items, function (item) {
      return item.selected;
    });
    var attrs = {
      key: item.label || key,
      title: item.label,
      className: 'ql-' + item.type,
      value: selectedItem.value
    };
    return reactDomFactories.select(attrs, choiceItems);
  },
  renderButton: function (item, key) {
    return reactDomFactories.button({
      type: 'button',
      key: item.label || item.value || key,
      value: item.value,
      className: 'ql-' + item.type,
      title: item.label
    }, item.children);
  },
  renderAction: function (item, key) {
    return reactDomFactories.button({
      key: item.label || item.value || key,
      className: 'ql-' + item.type,
      title: item.label
    }, item.children);
  },

  /* jshint maxcomplexity: false */
  renderItem: function (item, key) {
    switch (item.type) {
      case 'group':
        return this.renderGroup(item, key);

      case 'font':
      case 'header':
      case 'align':
      case 'size':
      case 'color':
      case 'background':
        return this.renderChoices(item, key);

      case 'bold':
      case 'italic':
      case 'underline':
      case 'strike':
      case 'link':
      case 'list':
      case 'bullet':
      case 'ordered':
      case 'indent':
      case 'image':
      case 'video':
        return this.renderButton(item, key);

      default:
        return this.renderAction(item, key);
    }
  },
  getClassName: function () {
    return 'quill-toolbar ' + (this.props.className || '');
  },
  render: function () {
    var children = this.props.items.map(this.renderItem);
    var html = children.map(server_browser.renderToStaticMarkup).join('');
    return reactDomFactories.div({
      id: this.props.id,
      className: this.getClassName(),
      style: this.props.style,
      dangerouslySetInnerHTML: {
        __html: html
      }
    });
  }
});
var toolbar = QuillToolbar;
QuillToolbar.defaultItems = defaultItems;
QuillToolbar.defaultColors = defaultColors;

/*
React-Quill v1.0.0
https://github.com/zenoamaro/react-quill
*/
var lib = component;
var _default = component;
var Quill_1 = quill;
var Mixin = mixin;
var Toolbar = toolbar;
lib.default = _default;
lib.Quill = Quill_1;
lib.Mixin = Mixin;
lib.Toolbar = Toolbar;

var toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }],
    ["image"],
    [{ align: [] }],
    ["clean"] // remove formatting button
];
var RitchEditor = /** @class */ (function (_super) {
    __extends(RitchEditor, _super);
    function RitchEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.quillRef = null;
        _this.module = {
            toolbar: {
                container: toolbarOptions,
                handlers: {
                    image: _this.imageHandler.bind(_this)
                }
            },
        };
        return _this;
    }
    RitchEditor.prototype.imageHandler = function (e, f) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var quill, range, image;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        quill = (_a = this.quillRef) === null || _a === void 0 ? void 0 : _a.getEditor();
                        if (!quill) {
                            return [2 /*return*/];
                        }
                        range = quill.getSelection(true);
                        return [4 /*yield*/, this.props.uploadImageHandler()];
                    case 1:
                        image = _b.sent();
                        if (image) {
                            quill.insertEmbed(range.index, "image", image);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RitchEditor.prototype.render = function () {
        var _this = this;
        return (jsxRuntime.jsx(lib, { ref: function (el) {
                _this.quillRef = el;
            }, value: this.props.content, theme: "snow", modules: this.module, onChange: function (e) { return _this.props.contentChanged(e); } }, void 0));
    };
    return RitchEditor;
}(React.Component));

var RichEditor = {
    schemeEditor: function () { return jsxRuntime.jsx(jsxRuntime.Fragment, {}, void 0); },
    fieldEditor: Rich,
    type: "rich-editor",
    name: "リッチエディタ",
    description: "自由入力の複数行テキストです。リッチエディタによる編集が可能です。APIからHTMLが取得できます。"
};
function Rich(props) {
    var _this = this;
    function handleChange(text) {
        props.onChange(props.field.field.clone({
            value: text
        }));
    }
    return (jsxRuntime.jsx(RitchEditor, { uploadImageHandler: function () { return __awaiter(_this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showMediaSelectionDialog()];
                    case 1:
                        media = _a.sent();
                        return [2 /*return*/, media ? "" + axios.defaults.baseURL + media : null];
                }
            });
        }); }, content: props.field.field.value, contentChanged: function (e) { return handleChange(e); } }, void 0));
}

var SelectEditor = {
    fieldEditor: Select,
    schemeEditor: SelectScheme,
    type: "select",
    name: "セレクトフィールド",
    description: "定義したリストの中から値を選択するフィールドです。"
};
function Select(props) {
    function handleChange(text) {
        props.onChange(props.field.field.clone({
            value: text
        }));
    }
    var selection = props.field.scheme.metadata.split(",");
    useEffect(function () {
        var _a;
        if (!props.field.field.value) {
            handleChange((_a = selection[0]) !== null && _a !== void 0 ? _a : "");
        }
    }, []);
    return (jsxRuntime.jsx(Select$1, __assign({ fullWidth: true, variant: "outlined", required: props.required, value: props.field.field.value, onChange: function (e) { return handleChange(e.target.value); } }, { children: selection.map(function (text) { return (jsxRuntime.jsx(MenuItem, __assign({ value: text }, { children: text }), void 0)); }) }), void 0));
}
function SelectScheme(props) {
    function handleChange(text) {
        props.onChange(props.scheme.clone({
            metadata: text
        }));
    }
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Typography, { children: "\u9078\u629E\u80A2" }, void 0),
            jsxRuntime.jsx(TextField, { fullWidth: true, rows: "4", multiline: true, variant: "filled", value: props.scheme.metadata, onChange: function (e) { return handleChange(e.target.value); }, helperText: "\u300C,\u300D\u30AB\u30F3\u30DE\u533A\u5207\u308A\u3067\u9078\u629E\u80A2\u3092\u8B2C\u529B\u3057\u3066\u304F\u3060\u3055\u3044" }, void 0)] }, void 0));
}

var SwitchEditor = {
    fieldEditor: Switch,
    schemeEditor: function () { return jsxRuntime.jsx(jsxRuntime.Fragment, {}, void 0); },
    type: "switch",
    name: "スイッチ",
    description: "スイッチでオン/オフを切り替えることができます。"
};
function Switch(props) {
    function handleChange(text) {
        props.onChange(props.field.field.clone({
            value: text
        }));
    }
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(Switch$1, { color: "primary", checked: props.field.field.value === "1", onChange: function (e) { return handleChange(e.target.checked ? "1" : "0"); } }, void 0) }, void 0));
}

var TextFieldEditor = {
    fieldEditor: Text$1,
    schemeEditor: function () { return jsxRuntime.jsx(jsxRuntime.Fragment, {}, void 0); },
    type: "text-field",
    name: "画像",
    description: "画像用のフィールドです。APIからは画像URLが返却されます。"
};
function Text$1(props) {
    function handleChange(text) {
        props.onChange(props.field.field.clone({
            value: text
        }));
    }
    return (jsxRuntime.jsx(ValidationTextField, { fullWidth: true, variant: "outlined", helperText: props.helperText, errorText: "\u7121\u52B9\u306A\u5024\u3067\u3059", required: props.required, rules: props.rule, value: props.field.field.value, textChanged: function (e) { return handleChange(e.value); } }, void 0));
}

var editors = {
    "text-area": TextareaEditor,
    "image": ImageEditor,
    "photo-gallery": PhotoGalleryEditor,
    "rich-editor": RichEditor,
    "select": SelectEditor,
    "switch": SwitchEditor,
    "text-field": TextFieldEditor
};

export { ValidationTextField as V, _inherits as _, _possibleConstructorReturn as a, _getPrototypeOf as b, editors as e, showMediaSelectionDialog as s };
