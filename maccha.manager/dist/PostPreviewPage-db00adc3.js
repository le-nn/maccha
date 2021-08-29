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

import { k as jsxRuntime, a3 as ObserverComponent, m as __assign, R as Box, T as Typography, u as useTheme, V as axios, g as __read, ac as Backdrop, n as makeStyles, s as services, a2 as useRouteMatch, f as useHistory, Y as Icon } from './index.lib-751d07a4.js';
import { useState, useEffect } from 'react';
import { u, P as PhotoGridView, m } from './ColorPalette-2d4946f1.js';
import './showDialog-4459d515.js';
import './style-fa5f813c.js';
import { F as Fab } from './Fab-875bd991.js';
import 'react-dom';

function PostPreviewPanel() {
    var postEditService = services.postEditService, postManagementsService = services.postManagementsService;
    return jsxRuntime.jsx(ObserverComponent, { children: function () {
            var _a, _b, _c, _d;
            var content = postEditService.content;
            var schemes = (_c = (_b = (_a = postManagementsService.selected) === null || _a === void 0 ? void 0 : _a.taxonomy) === null || _b === void 0 ? void 0 : _b.schemes.reduce(function (x, y) {
                var _a;
                return (__assign(__assign({}, x), (_a = {}, _a[y.schemeId] = y, _a)));
            }, {})) !== null && _c !== void 0 ? _c : {};
            return content && (jsxRuntime.jsx(Box, __assign({ position: "relative", className: "post", maxWidth: "100%", width: "780px" }, { children: jsxRuntime.jsxs(Box, __assign({ mt: 3, display: "flex", mx: "auto", flexDirection: "column", alignItems: "center", px: 3, mb: 20, width: "100%" }, { children: [jsxRuntime.jsx(Typography, __assign({ color: "textSecondary" }, { children: ((_d = content.publishIn) !== null && _d !== void 0 ? _d : content.createdAt).toFormat("y.M.d") }), void 0),
                        jsxRuntime.jsx(Typography, __assign({ variant: "h1", style: { marginTop: "16px" } }, { children: content.title }), void 0),
                        content.thumbnail && jsxRuntime.jsx(Box, __assign({ mt: 3, width: "100%" }, { children: jsxRuntime.jsx("img", { alt: content.title, src: content.thumbnail, style: {
                                    width: "100%",
                                    objectFit: "cover",
                                    maxHeight: "480px"
                                } }, void 0) }), void 0),
                        content.fields.map(function (f) { return (jsxRuntime.jsx(Box, __assign({ mt: 3, width: "100%" }, { children: jsxRuntime.jsx(FieldRenderer, { scheme: schemes[f.schemeId], field: f }, void 0) }), f.fieldId)); })] }), void 0) }), void 0));
        } }, void 0);
}
function FieldRenderer(props) {
    var them = useTheme();
    if (!props.scheme) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, {}, void 0);
    }
    if (props.scheme.type === "photo-gallery") {
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "h5", style: {
                        marginTop: "16px",
                        paddingLeft: "8px",
                        borderLeft: "4px solid " + them.palette.primary.main
                    } }, { children: props.scheme.displayName }), void 0),
                jsxRuntime.jsx(Box, __assign({ mt: 2 }, { children: jsxRuntime.jsx(PhotoGalleryPreview, { images: props.field.value.split(",").filter(function (x) { return !!x; }) }, void 0) }), void 0)] }, void 0));
    }
    if (props.scheme.type === "image") {
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "h5", style: {
                        marginTop: "16px",
                        paddingLeft: "8px",
                        borderLeft: "4px solid " + them.palette.primary.main
                    } }, { children: props.scheme.displayName }), void 0),
                jsxRuntime.jsx(Box, __assign({ mt: 2 }, { children: jsxRuntime.jsx("img", { alt: props.field.value, src: axios.defaults.baseURL + props.field.value }, void 0) }), void 0)] }, void 0));
    }
    if (props.scheme.type === "text-field") {
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "h5", style: {
                        marginTop: "16px",
                        paddingLeft: "8px",
                        borderLeft: "4px solid " + them.palette.primary.main
                    } }, { children: props.scheme.displayName }), void 0),
                jsxRuntime.jsx(Box, __assign({ mt: 2 }, { children: jsxRuntime.jsx(Typography, __assign({ variant: "body1" }, { children: props.field.value }), void 0) }), void 0)] }, void 0));
    }
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "h5", style: {
                    marginTop: "16px",
                    paddingLeft: "8px",
                    borderLeft: "4px solid " + them.palette.primary.main
                } }, { children: props.scheme.displayName }), void 0),
            jsxRuntime.jsx(Box, __assign({ mt: 2 }, { children: jsxRuntime.jsx("div", { style: { width: "100%", wordBreak: "break-all", whiteSpace: "pre-wrap" }, dangerouslySetInnerHTML: { __html: props.field.value } }, void 0) }), void 0)] }, void 0));
}
function PhotoGalleryPreview(props) {
    var classes = useStyle();
    var _a = __read(useState(""), 2), path = _a[0], setPath = _a[1];
    var _b = __read(useState(null), 2), selected = _b[0], setSelected = _b[1];
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(Box, __assign({ my: 2, display: "flex", flexWrap: "wrap", width: "100%" }, { children: jsxRuntime.jsxs(u, __assign({ flipKey: selected }, { children: [jsxRuntime.jsx(PhotoGridView, { images: props.images, disableSelection: true, invoked: function (path) {
                            setSelected(path);
                            setPath(path);
                        }, baseUrl: axios.defaults.baseURL }, void 0),
                    jsxRuntime.jsx(Backdrop, { style: { zIndex: 9999 }, open: !!selected, onClick: function () { return setSelected(null); } }, void 0),
                    selected &&
                        jsxRuntime.jsx(m, __assign({ flipId: selected !== null && selected !== void 0 ? selected : "" }, { children: jsxRuntime.jsx("div", __assign({ onClick: function () { return setSelected(null); }, style: {
                                    zIndex: 99999,
                                    height: "80%",
                                    width: "80%",
                                    position: "fixed",
                                    top: "0",
                                    left: "0",
                                    right: "0",
                                    bottom: "0",
                                    margin: "auto"
                                } }, { children: jsxRuntime.jsx("img", { src: axios.defaults.baseURL + path, alt: path, className: classes.img }, void 0) }), void 0) }), void 0)] }), void 0) }), void 0) }, void 0);
}
var useStyle = makeStyles({
    imgContainer: {
        height: "160px",
    },
    img: {
        height: "100%",
        width: "100%",
        objectFit: "contain"
    }
});

function PostPreviewPage() {
    var postEditService = services.postEditService, postManagementsService = services.postManagementsService;
    var match = useRouteMatch();
    var hisptory = useHistory();
    function handleEdit() {
        var content = postEditService.content;
        if (content || postEditService.taxonomy) {
            hisptory.push("/posts/" + postEditService.taxonomy + "/" + (content === null || content === void 0 ? void 0 : content.contentId) + "/edit");
        }
    }
    useEffect(function () {
        postEditService.clear();
        postEditService.fetchAsync(match.params.taxonomy, match.params.contentId);
        postManagementsService.fetchPostTypes(match.params.taxonomy);
    }, []);
    return (jsxRuntime.jsx(ObserverComponent, { children: function () {
            return (jsxRuntime.jsxs(Box, __assign({ overflow: "auto", height: "100%", display: "flex", flexDirection: "column", position: "relative", alignItems: "center", width: "100%" }, { children: [jsxRuntime.jsx(PostPreviewPanel, {}, void 0),
                    jsxRuntime.jsx(Fab, __assign({ color: "primary", onClick: function () { return handleEdit(); }, style: { right: "40px", bottom: "40px", position: "fixed" } }, { children: jsxRuntime.jsx(Icon, { children: "edit" }, void 0) }), void 0)] }), void 0));
        } }, void 0));
}

export default PostPreviewPage;
