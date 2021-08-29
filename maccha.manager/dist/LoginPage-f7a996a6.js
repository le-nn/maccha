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

import { w as withStyles, _ as _objectWithoutProperties, a as _extends, c as clsx, p as propTypes, b as createSvgIcon, d as darken, l as lighten, P as Paper, e as capitalize, I as IconButton, T as Typography, u as useTheme, f as useHistory, g as __read, h as useObserver, i as __awaiter, j as __generator, k as jsxRuntime, H as Hidden, m as __assign, B as Button, n as makeStyles, s as services } from './index.lib-1f5131ad.js';
import { forwardRef, createElement, useState, useEffect } from 'react';
import { C as Card } from './Card-5614d531.js';
import { T as TextField } from './TextField-126ba979.js';
import { I as InputAdornment } from './InputAdornment-93b59426.js';
import 'react-dom';

var styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: 8
  },

  /* Styles applied to the root element if `disableSpacing={false}`. */
  spacing: {
    '& > :not(:first-child)': {
      marginLeft: 8
    }
  }
};
var CardActions = /*#__PURE__*/forwardRef(function CardActions(props, ref) {
  var _props$disableSpacing = props.disableSpacing,
      disableSpacing = _props$disableSpacing === void 0 ? false : _props$disableSpacing,
      classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ["disableSpacing", "classes", "className"]);

  return /*#__PURE__*/createElement("div", _extends({
    className: clsx(classes.root, className, !disableSpacing && classes.spacing),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? CardActions.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: propTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: propTypes.object,

  /**
   * @ignore
   */
  className: propTypes.string,

  /**
   * If `true`, the actions do not have additional margin.
   */
  disableSpacing: propTypes.bool
} : void 0;
var CardActions$1 = withStyles(styles, {
  name: 'MuiCardActions'
})(CardActions);

var styles$1 = {
  /* Styles applied to the root element. */
  root: {
    padding: 16,
    '&:last-child': {
      paddingBottom: 24
    }
  }
};
var CardContent = /*#__PURE__*/forwardRef(function CardContent(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      other = _objectWithoutProperties(props, ["classes", "className", "component"]);

  return /*#__PURE__*/createElement(Component, _extends({
    className: clsx(classes.root, className),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? CardContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: propTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: propTypes.object,

  /**
   * @ignore
   */
  className: propTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes
  /* @typescript-to-proptypes-ignore */
  .elementType
} : void 0;
var CardContent$1 = withStyles(styles$1, {
  name: 'MuiCardContent'
})(CardContent);

/**
 * @ignore - internal component.
 */

var SuccessOutlinedIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
}), 'SuccessOutlined');

/**
 * @ignore - internal component.
 */

var ReportProblemOutlinedIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
}), 'ReportProblemOutlined');

/**
 * @ignore - internal component.
 */

var ErrorOutlineIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), 'ErrorOutline');

/**
 * @ignore - internal component.
 */

var InfoOutlinedIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
}), 'InfoOutlined');

/**
 * @ignore - internal component.
 */

var CloseIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), 'Close');

var styles$2 = function styles(theme) {
  var getColor = theme.palette.type === 'light' ? darken : lighten;
  var getBackgroundColor = theme.palette.type === 'light' ? lighten : darken;
  return {
    /* Styles applied to the root element. */
    root: _extends({}, theme.typography.body2, {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'transparent',
      display: 'flex',
      padding: '6px 16px'
    }),

    /* Styles applied to the root element if `variant="standard"` and `color="success"`. */
    standardSuccess: {
      color: getColor(theme.palette.success.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.success.main, 0.9),
      '& $icon': {
        color: theme.palette.success.main
      }
    },

    /* Styles applied to the root element if `variant="standard"` and `color="info"`. */
    standardInfo: {
      color: getColor(theme.palette.info.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.info.main, 0.9),
      '& $icon': {
        color: theme.palette.info.main
      }
    },

    /* Styles applied to the root element if `variant="standard"` and `color="warning"`. */
    standardWarning: {
      color: getColor(theme.palette.warning.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.warning.main, 0.9),
      '& $icon': {
        color: theme.palette.warning.main
      }
    },

    /* Styles applied to the root element if `variant="standard"` and `color="error"`. */
    standardError: {
      color: getColor(theme.palette.error.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.error.main, 0.9),
      '& $icon': {
        color: theme.palette.error.main
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="success"`. */
    outlinedSuccess: {
      color: getColor(theme.palette.success.main, 0.6),
      border: "1px solid ".concat(theme.palette.success.main),
      '& $icon': {
        color: theme.palette.success.main
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="info"`. */
    outlinedInfo: {
      color: getColor(theme.palette.info.main, 0.6),
      border: "1px solid ".concat(theme.palette.info.main),
      '& $icon': {
        color: theme.palette.info.main
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="warning"`. */
    outlinedWarning: {
      color: getColor(theme.palette.warning.main, 0.6),
      border: "1px solid ".concat(theme.palette.warning.main),
      '& $icon': {
        color: theme.palette.warning.main
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="error"`. */
    outlinedError: {
      color: getColor(theme.palette.error.main, 0.6),
      border: "1px solid ".concat(theme.palette.error.main),
      '& $icon': {
        color: theme.palette.error.main
      }
    },

    /* Styles applied to the root element if `variant="filled"` and `color="success"`. */
    filledSuccess: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.success.main
    },

    /* Styles applied to the root element if `variant="filled"` and `color="info"`. */
    filledInfo: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.info.main
    },

    /* Styles applied to the root element if `variant="filled"` and `color="warning"`. */
    filledWarning: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.warning.main
    },

    /* Styles applied to the root element if `variant="filled"` and `color="error"`. */
    filledError: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.error.main
    },

    /* Styles applied to the icon wrapper element. */
    icon: {
      marginRight: 12,
      padding: '7px 0',
      display: 'flex',
      fontSize: 22,
      opacity: 0.9
    },

    /* Styles applied to the message wrapper element. */
    message: {
      padding: '8px 0'
    },

    /* Styles applied to the action wrapper element if `action` is provided. */
    action: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: 16,
      marginRight: -8
    }
  };
};
var defaultIconMapping = {
  success: /*#__PURE__*/createElement(SuccessOutlinedIcon, {
    fontSize: "inherit"
  }),
  warning: /*#__PURE__*/createElement(ReportProblemOutlinedIcon, {
    fontSize: "inherit"
  }),
  error: /*#__PURE__*/createElement(ErrorOutlineIcon, {
    fontSize: "inherit"
  }),
  info: /*#__PURE__*/createElement(InfoOutlinedIcon, {
    fontSize: "inherit"
  })
};

var _ref = /*#__PURE__*/createElement(CloseIcon, {
  fontSize: "small"
});

var Alert = /*#__PURE__*/forwardRef(function Alert(props, ref) {
  var action = props.action,
      children = props.children,
      classes = props.classes,
      className = props.className,
      _props$closeText = props.closeText,
      closeText = _props$closeText === void 0 ? 'Close' : _props$closeText,
      color = props.color,
      icon = props.icon,
      _props$iconMapping = props.iconMapping,
      iconMapping = _props$iconMapping === void 0 ? defaultIconMapping : _props$iconMapping,
      onClose = props.onClose,
      _props$role = props.role,
      role = _props$role === void 0 ? 'alert' : _props$role,
      _props$severity = props.severity,
      severity = _props$severity === void 0 ? 'success' : _props$severity,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      other = _objectWithoutProperties(props, ["action", "children", "classes", "className", "closeText", "color", "icon", "iconMapping", "onClose", "role", "severity", "variant"]);

  return /*#__PURE__*/createElement(Paper, _extends({
    role: role,
    square: true,
    elevation: 0,
    className: clsx(classes.root, classes["".concat(variant).concat(capitalize(color || severity))], className),
    ref: ref
  }, other), icon !== false ? /*#__PURE__*/createElement("div", {
    className: classes.icon
  }, icon || iconMapping[severity] || defaultIconMapping[severity]) : null, /*#__PURE__*/createElement("div", {
    className: classes.message
  }, children), action != null ? /*#__PURE__*/createElement("div", {
    className: classes.action
  }, action) : null, action == null && onClose ? /*#__PURE__*/createElement("div", {
    className: classes.action
  }, /*#__PURE__*/createElement(IconButton, {
    size: "small",
    "aria-label": closeText,
    title: closeText,
    color: "inherit",
    onClick: onClose
  }, _ref)) : null);
});
process.env.NODE_ENV !== "production" ? Alert.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: propTypes.node,

  /**
   * The content of the component.
   */
  children: propTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: propTypes.object,

  /**
   * @ignore
   */
  className: propTypes.string,

  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  closeText: propTypes.string,

  /**
   * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
   */
  color: propTypes.oneOf(['error', 'info', 'success', 'warning']),

  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   */
  icon: propTypes.node,

  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: propTypes.shape({
    error: propTypes.node,
    info: propTypes.node,
    success: propTypes.node,
    warning: propTypes.node
  }),

  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: propTypes.func,

  /**
   * The ARIA role attribute of the element.
   */
  role: propTypes.string,

  /**
   * The severity of the alert. This defines the color and icon used.
   */
  severity: propTypes.oneOf(['error', 'info', 'success', 'warning']),

  /**
   * The variant to use.
   */
  variant: propTypes.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
var Alert$1 = withStyles(styles$2, {
  name: 'MuiAlert'
})(Alert);

var styles$3 = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      fontWeight: theme.typography.fontWeightMedium,
      marginTop: -2
    }
  };
};
var AlertTitle = /*#__PURE__*/forwardRef(function AlertTitle(props, ref) {
  var classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ["classes", "className"]);

  return /*#__PURE__*/createElement(Typography, _extends({
    gutterBottom: true,
    component: "div",
    ref: ref,
    className: clsx(classes.root, className)
  }, other));
});
process.env.NODE_ENV !== "production" ? AlertTitle.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: propTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: propTypes.object,

  /**
   * @ignore
   */
  className: propTypes.string
} : void 0;
var AlertTitle$1 = withStyles(styles$3, {
  name: 'MuiAlertTitle'
})(AlertTitle);

var AccountCircle = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
}), 'AccountCircle');

var VpnKey = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
}), 'VpnKey');

function LoginPage() {
    var _this = this;
    var classes = useStyles();
    var theme = useTheme();
    useHistory();
    var _a = __read(useState(""), 2), email = _a[0], setEmail = _a[1];
    var _b = __read(useState(""), 2), password = _b[0], setPassword = _b[1];
    var _c = __read(useState(false), 2), isShowError = _c[0], setIsShowError = _c[1];
    useEffect(function () {
        function onEnter(e) {
            if (e.key === "Enter") {
                loginAsync();
            }
        }
        document.addEventListener("keydown", onEnter);
        return function () { return document.removeEventListener("keydown", onEnter); };
    });
    var loginAsync = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, services.authService.login(email, password)];
                case 1:
                    _b.sent();
                    if (services.authService.isLogin) {
                        window.location.assign("/");
                    }
                    else {
                        setIsShowError(true);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _b.sent();
                    setIsShowError(true);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return useObserver(function () {
        return (jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx(Hidden, { smUp: true, implementation: "js" }, void 0),
                jsxRuntime.jsx(Hidden, __assign({ xsDown: true, implementation: "js" }, { children: jsxRuntime.jsxs(Card, __assign({ elevation: 2, className: classes.card }, { children: [jsxRuntime.jsxs(CardContent$1, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "h4" }, { children: "\u30ED\u30B0\u30A4\u30F3" }), void 0),
                                    jsxRuntime.jsx(TextField, { label: "\u30ED\u30B0\u30A4\u30F3ID", style: { marginTop: "64px" }, fullWidth: true, value: email, type: "email", onChange: function (e) { return setEmail(e.target.value); }, InputProps: {
                                            startAdornment: (jsxRuntime.jsx(InputAdornment, __assign({ position: "end" }, { children: jsxRuntime.jsx(AccountCircle, {}, void 0) }), void 0)),
                                        } }, void 0),
                                    jsxRuntime.jsx(TextField, { label: "\u30D1\u30B9\u30EF\u30FC\u30C9", style: { marginTop: "36px" }, fullWidth: true, type: "password", value: password, onChange: function (e) { return setPassword(e.target.value); }, InputProps: {
                                            startAdornment: (jsxRuntime.jsx(InputAdornment, __assign({ position: "end" }, { children: jsxRuntime.jsx(VpnKey, {}, void 0) }), void 0)),
                                        } }, void 0)] }, void 0),
                            jsxRuntime.jsx(CardActions$1, __assign({ style: { marginTop: "36px" } }, { children: jsxRuntime.jsx(Button, __assign({ variant: "contained", color: "primary", fullWidth: true, onClick: function () {
                                        loginAsync();
                                    } }, { children: "\u30ED\u30B0\u30A4\u30F3" }), void 0) }), void 0),
                            isShowError && (jsxRuntime.jsxs(Alert$1, __assign({ severity: "error", style: { marginRight: "8px", marginLeft: "8px", marginTop: "24px", color: theme.palette.error.dark } }, { children: [jsxRuntime.jsx(AlertTitle$1, { children: "\u30ED\u30B0\u30A4\u30F3\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002" }, void 0), "\u30E6\u30FC\u30B6\u30FC\u540D\u3068\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044"] }), void 0))] }), void 0) }), void 0)] }, void 0));
    });
}
var useStyles = makeStyles({
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

export default LoginPage;
