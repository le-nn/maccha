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

import { b as createSvgIcon, w as withStyles, G as fade, aQ as emphasize, _ as _objectWithoutProperties, aR as useForkRef, c as clsx, e as capitalize, a as _extends, p as propTypes, az as unsupportedProp, J as ButtonBase, n as makeStyles, i as __awaiter, j as __generator, m as __assign, g as __read, h as useObserver, k as jsxRuntime, K as Box, T as Typography, S as Select, aP as displayRoles, a2 as MenuItem, Z as RoleType, a0 as ListItemText, B as Button, s as services, u as useTheme, aM as Toolbar, P as Paper, aS as InputBase, I as IconButton, R as Avatar, M as axios, W as Icon, aT as User } from './index.lib-fcf45d4b.js';
import React, { createElement, forwardRef, useRef, isValidElement, cloneElement, useState, useEffect } from 'react';
import { s as showDialogAsync, C as Checkbox } from './showDialog-eede1950.js';
import { T as TextField } from './TextField-ff451be2.js';
import { S as Switch } from './Switch-282d039c.js';
import { S as Search } from './Search-0331bc91.js';
import { A as Add } from './Add-2a7a6091.js';
import { T as TableContainer, a as Table, b as TableHead, c as TableRow, d as TableCell, e as TableBody } from './TableRow-83e4dd97.js';
import 'react-dom';

/**
 * @ignore - internal component.
 */

var CancelIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), 'Cancel');

var styles = function styles(theme) {
  var backgroundColor = theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700];
  var deleteIconColor = fade(theme.palette.text.primary, 0.26);
  return {
    /* Styles applied to the root element. */
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(13),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor: backgroundColor,
      borderRadius: 32 / 2,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create(['background-color', 'box-shadow']),
      // label will inherit this from root, then `clickable` class overrides this for both
      cursor: 'default',
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      textDecoration: 'none',
      border: 'none',
      // Remove `button` border
      padding: 0,
      // Remove `button` padding
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      '&$disabled': {
        opacity: 0.5,
        pointerEvents: 'none'
      },
      '& $avatar': {
        marginLeft: 5,
        marginRight: -6,
        width: 24,
        height: 24,
        color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
        fontSize: theme.typography.pxToRem(12)
      },
      '& $avatarColorPrimary': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark
      },
      '& $avatarColorSecondary': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.dark
      },
      '& $avatarSmall': {
        marginLeft: 4,
        marginRight: -4,
        width: 18,
        height: 18,
        fontSize: theme.typography.pxToRem(10)
      }
    },

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      height: 24
    },

    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },

    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText
    },

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the root element if `onClick` is defined or `clickable={true}`. */
    clickable: {
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08)
      },
      '&:active': {
        boxShadow: theme.shadows[1]
      }
    },

    /* Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`. */
    clickableColorPrimary: {
      '&:hover, &:focus': {
        backgroundColor: emphasize(theme.palette.primary.main, 0.08)
      }
    },

    /* Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`. */
    clickableColorSecondary: {
      '&:hover, &:focus': {
        backgroundColor: emphasize(theme.palette.secondary.main, 0.08)
      }
    },

    /* Styles applied to the root element if `onDelete` is defined. */
    deletable: {
      '&:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08)
      }
    },

    /* Styles applied to the root element if `onDelete` and `color="primary"` is defined. */
    deletableColorPrimary: {
      '&:focus': {
        backgroundColor: emphasize(theme.palette.primary.main, 0.2)
      }
    },

    /* Styles applied to the root element if `onDelete` and `color="secondary"` is defined. */
    deletableColorSecondary: {
      '&:focus': {
        backgroundColor: emphasize(theme.palette.secondary.main, 0.2)
      }
    },

    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      backgroundColor: 'transparent',
      border: "1px solid ".concat(theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'),
      '$clickable&:hover, $clickable&:focus, $deletable&:focus': {
        backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity)
      },
      '& $avatar': {
        marginLeft: 4
      },
      '& $avatarSmall': {
        marginLeft: 2
      },
      '& $icon': {
        marginLeft: 4
      },
      '& $iconSmall': {
        marginLeft: 2
      },
      '& $deleteIcon': {
        marginRight: 5
      },
      '& $deleteIconSmall': {
        marginRight: 3
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
    outlinedPrimary: {
      color: theme.palette.primary.main,
      border: "1px solid ".concat(theme.palette.primary.main),
      '$clickable&:hover, $clickable&:focus, $deletable&:focus': {
        backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity)
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
    outlinedSecondary: {
      color: theme.palette.secondary.main,
      border: "1px solid ".concat(theme.palette.secondary.main),
      '$clickable&:hover, $clickable&:focus, $deletable&:focus': {
        backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity)
      }
    },
    // TODO v5: remove

    /* Styles applied to the `avatar` element. */
    avatar: {},

    /* Styles applied to the `avatar` element if `size="small"`. */
    avatarSmall: {},

    /* Styles applied to the `avatar` element if `color="primary"`. */
    avatarColorPrimary: {},

    /* Styles applied to the `avatar` element if `color="secondary"`. */
    avatarColorSecondary: {},

    /* Styles applied to the `icon` element. */
    icon: {
      color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
      marginLeft: 5,
      marginRight: -6
    },

    /* Styles applied to the `icon` element if `size="small"`. */
    iconSmall: {
      width: 18,
      height: 18,
      marginLeft: 4,
      marginRight: -4
    },

    /* Styles applied to the `icon` element if `color="primary"`. */
    iconColorPrimary: {
      color: 'inherit'
    },

    /* Styles applied to the `icon` element if `color="secondary"`. */
    iconColorSecondary: {
      color: 'inherit'
    },

    /* Styles applied to the label `span` element. */
    label: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingLeft: 12,
      paddingRight: 12,
      whiteSpace: 'nowrap'
    },

    /* Styles applied to the label `span` element if `size="small"`. */
    labelSmall: {
      paddingLeft: 8,
      paddingRight: 8
    },

    /* Styles applied to the `deleteIcon` element. */
    deleteIcon: {
      WebkitTapHighlightColor: 'transparent',
      color: deleteIconColor,
      height: 22,
      width: 22,
      cursor: 'pointer',
      margin: '0 5px 0 -6px',
      '&:hover': {
        color: fade(deleteIconColor, 0.4)
      }
    },

    /* Styles applied to the `deleteIcon` element if `size="small"`. */
    deleteIconSmall: {
      height: 16,
      width: 16,
      marginRight: 4,
      marginLeft: -4
    },

    /* Styles applied to the deleteIcon element if `color="primary"` and `variant="default"`. */
    deleteIconColorPrimary: {
      color: fade(theme.palette.primary.contrastText, 0.7),
      '&:hover, &:active': {
        color: theme.palette.primary.contrastText
      }
    },

    /* Styles applied to the deleteIcon element if `color="secondary"` and `variant="default"`. */
    deleteIconColorSecondary: {
      color: fade(theme.palette.secondary.contrastText, 0.7),
      '&:hover, &:active': {
        color: theme.palette.secondary.contrastText
      }
    },

    /* Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`. */
    deleteIconOutlinedColorPrimary: {
      color: fade(theme.palette.primary.main, 0.7),
      '&:hover, &:active': {
        color: theme.palette.primary.main
      }
    },

    /* Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`. */
    deleteIconOutlinedColorSecondary: {
      color: fade(theme.palette.secondary.main, 0.7),
      '&:hover, &:active': {
        color: theme.palette.secondary.main
      }
    }
  };
};

function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete';
}
/**
 * Chips represent complex entities in small blocks, such as a contact.
 */


var Chip = /*#__PURE__*/forwardRef(function Chip(props, ref) {
  var avatarProp = props.avatar,
      classes = props.classes,
      className = props.className,
      clickableProp = props.clickable,
      _props$color = props.color,
      color = _props$color === void 0 ? 'default' : _props$color,
      ComponentProp = props.component,
      deleteIconProp = props.deleteIcon,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      iconProp = props.icon,
      label = props.label,
      onClick = props.onClick,
      onDelete = props.onDelete,
      onKeyDown = props.onKeyDown,
      onKeyUp = props.onKeyUp,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'default' : _props$variant,
      other = _objectWithoutProperties(props, ["avatar", "classes", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant"]);

  var chipRef = useRef(null);
  var handleRef = useForkRef(chipRef, ref);

  var handleDeleteIconClick = function handleDeleteIconClick(event) {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();

    if (onDelete) {
      onDelete(event);
    }
  };

  var handleKeyDown = function handleKeyDown(event) {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) {
      // will be handled in keyUp, otherwise some browsers
      // might init navigation
      event.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  var handleKeyUp = function handleKeyUp(event) {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target) {
      if (onDelete && isDeleteKeyboardEvent(event)) {
        onDelete(event);
      } else if (event.key === 'Escape' && chipRef.current) {
        chipRef.current.blur();
      }
    }

    if (onKeyUp) {
      onKeyUp(event);
    }
  };

  var clickable = clickableProp !== false && onClick ? true : clickableProp;
  var small = size === 'small';
  var Component = ComponentProp || (clickable ? ButtonBase : 'div');
  var moreProps = Component === ButtonBase ? {
    component: 'div'
  } : {};
  var deleteIcon = null;

  if (onDelete) {
    var customClasses = clsx(color !== 'default' && (variant === "default" ? classes["deleteIconColor".concat(capitalize(color))] : classes["deleteIconOutlinedColor".concat(capitalize(color))]), small && classes.deleteIconSmall);
    deleteIcon = deleteIconProp && /*#__PURE__*/isValidElement(deleteIconProp) ? /*#__PURE__*/cloneElement(deleteIconProp, {
      className: clsx(deleteIconProp.props.className, classes.deleteIcon, customClasses),
      onClick: handleDeleteIconClick
    }) : /*#__PURE__*/createElement(CancelIcon, {
      className: clsx(classes.deleteIcon, customClasses),
      onClick: handleDeleteIconClick
    });
  }

  var avatar = null;

  if (avatarProp && /*#__PURE__*/isValidElement(avatarProp)) {
    avatar = /*#__PURE__*/cloneElement(avatarProp, {
      className: clsx(classes.avatar, avatarProp.props.className, small && classes.avatarSmall, color !== 'default' && classes["avatarColor".concat(capitalize(color))])
    });
  }

  var icon = null;

  if (iconProp && /*#__PURE__*/isValidElement(iconProp)) {
    icon = /*#__PURE__*/cloneElement(iconProp, {
      className: clsx(classes.icon, iconProp.props.className, small && classes.iconSmall, color !== 'default' && classes["iconColor".concat(capitalize(color))])
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    if (avatar && icon) {
      console.error('Material-UI: The Chip component can not handle the avatar ' + 'and the icon prop at the same time. Pick one.');
    }
  }

  return /*#__PURE__*/createElement(Component, _extends({
    role: clickable || onDelete ? 'button' : undefined,
    className: clsx(classes.root, className, color !== 'default' && [classes["color".concat(capitalize(color))], clickable && classes["clickableColor".concat(capitalize(color))], onDelete && classes["deletableColor".concat(capitalize(color))]], variant !== "default" && [classes.outlined, {
      'primary': classes.outlinedPrimary,
      'secondary': classes.outlinedSecondary
    }[color]], disabled && classes.disabled, small && classes.sizeSmall, clickable && classes.clickable, onDelete && classes.deletable),
    "aria-disabled": disabled ? true : undefined,
    tabIndex: clickable || onDelete ? 0 : undefined,
    onClick: onClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    ref: handleRef
  }, moreProps, other), avatar || icon, /*#__PURE__*/createElement("span", {
    className: clsx(classes.label, small && classes.labelSmall)
  }, label), deleteIcon);
});
process.env.NODE_ENV !== "production" ? Chip.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Avatar element.
   */
  avatar: propTypes.element,

  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,

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
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If false, the chip will not be clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   */
  clickable: propTypes.bool,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: propTypes.oneOf(['default', 'primary', 'secondary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: propTypes.element,

  /**
   * If `true`, the chip should be displayed in a disabled state.
   */
  disabled: propTypes.bool,

  /**
   * Icon element.
   */
  icon: propTypes.element,

  /**
   * The content of the label.
   */
  label: propTypes.node,

  /**
   * @ignore
   */
  onClick: propTypes.func,

  /**
   * Callback function fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete: propTypes.func,

  /**
   * @ignore
   */
  onKeyDown: propTypes.func,

  /**
   * @ignore
   */
  onKeyUp: propTypes.func,

  /**
   * The size of the chip.
   */
  size: propTypes.oneOf(['medium', 'small']),

  /**
   * The variant to use.
   */
  variant: propTypes.oneOf(['default', 'outlined'])
} : void 0;
var Chip$1 = withStyles(styles, {
  name: 'MuiChip'
})(Chip);

function UserDetailDialog(props) {
    useStyles();
    var _a = __read(useState(props.context), 2), user = _a[0], setUser = _a[1];
    var _b = __read(useState(false), 2), canClose = _b[0], setCanClose = _b[1];
    var _c = __read(useState(null), 2), nameErrorMessage = _c[0], setNameErrorMessage = _c[1];
    var _d = __read(useState(null), 2), emailErrorMessage = _d[0], setEmailErrorMessage = _d[1];
    var _e = __read(useState(null), 2), passwordErrorMessage = _e[0], setPasswordErrorMessage = _e[1];
    var _f = __read(useState(null), 2), confirmErrorMessage = _f[0], setConfirmErrorMessage = _f[1];
    var _g = __read(useState(null), 2), confirmPassword = _g[0], setConfirmPassword = _g[1];
    function confirm() {
        // edit mode doesn't need password.
        if (props.context.password === undefined) {
            return true;
        }
        if (confirmPassword !== user.password) {
            setConfirmErrorMessage("一致しません");
            setCanClose(false);
            return false;
        }
        setConfirmErrorMessage(null);
        setCanClose(true);
        return true;
    }
    function setConfirmPasswordParam(value) {
        setConfirmPassword(value);
        if (user.name && user.email && value === user.password) {
            setConfirmErrorMessage(null);
            setCanClose(true);
        }
        else if (value === user.password) {
            setConfirmErrorMessage(null);
            setCanClose(false);
        }
        else {
            setConfirmErrorMessage("一致しません");
            setCanClose(false);
        }
    }
    function setUserParam(key, value) {
        var _a;
        setUser(__assign(__assign({}, user), (_a = {}, _a[key] = value, _a)));
        if (key === "name") {
            if (!value.length) {
                setNameErrorMessage("入力してください");
                setCanClose(false);
            }
            else if (user.email && confirm()) {
                setNameErrorMessage(null);
                setCanClose(true);
            }
            else {
                setNameErrorMessage(null);
            }
        }
        else if (key === "email") {
            if (!value.length) {
                setEmailErrorMessage("入力してください");
                setCanClose(false);
            }
            else if (/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/.test(value) === false) {
                setEmailErrorMessage("無効なメールアドレスです");
                setCanClose(false);
            }
            else if (user.name && confirm()) {
                setEmailErrorMessage(null);
                setCanClose(true);
            }
            else {
                setEmailErrorMessage(null);
            }
        }
        else if (key === "password") {
            if (/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/.test(value) === false) {
                setPasswordErrorMessage("無効な文字が含まれています");
                setCanClose(false);
            }
            else if (user.name && user.email && value === confirmPassword) {
                setConfirmErrorMessage(null);
                setCanClose(true);
            }
            else if (value === confirmPassword) {
                setConfirmErrorMessage(null);
                setCanClose(false);
            }
            else {
                setConfirmErrorMessage("一致しません");
                setCanClose(false);
            }
        }
        else {
            setCanClose(true);
        }
    }
    return useObserver(function () {
        var webSiteManagementsService = services.webSiteManagementsService;
        return (jsxRuntime.jsxs(Box, __assign({ p: 3, display: "flex", height: "100%", flexDirection: "column", justifyContent: "space-between" }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "h5" }, { children: "\u30E6\u30FC\u30B6\u30FC\u7DE8\u96C6" }), void 0),
                jsxRuntime.jsxs(Box, { children: [jsxRuntime.jsx(Typography, __assign({ style: { marginTop: "24px" } }, { children: "\u540D\u524D" }), void 0),
                        jsxRuntime.jsx(TextField, { fullWidth: true, placeholder: "John Do", value: user.name, style: { borderBottomWidth: "2px" }, onChange: function (e) { return setUserParam("name", e.target.value); }, error: !!nameErrorMessage, helperText: !!nameErrorMessage ? nameErrorMessage : "表示名" }, void 0),
                        jsxRuntime.jsx(Typography, __assign({ style: { marginTop: "24px" } }, { children: "E-Mail" }), void 0),
                        jsxRuntime.jsx(TextField, { fullWidth: true, placeholder: "hoge@example.com", value: user.email, error: !!emailErrorMessage, helperText: !!emailErrorMessage ? emailErrorMessage : "メールアドレス", onChange: function (e) { return setUserParam("email", e.target.value); } }, void 0),
                        props.context.password !== undefined && jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Typography, __assign({ style: { marginTop: "24px" } }, { children: "Password" }), void 0),
                                jsxRuntime.jsx(TextField, { fullWidth: true, type: "password", value: user.password, error: !!passwordErrorMessage, helperText: !!passwordErrorMessage ? passwordErrorMessage : "パスワード", onChange: function (e) { return setUserParam("password", e.target.value); } }, void 0),
                                jsxRuntime.jsx(TextField, { fullWidth: true, type: "password", value: confirmPassword, error: !!confirmErrorMessage, helperText: !!confirmErrorMessage ? confirmErrorMessage : "確認", onChange: function (e) { return setConfirmPasswordParam(e.target.value); } }, void 0)] }, void 0),
                        jsxRuntime.jsx(Typography, __assign({ style: { marginTop: "24px" } }, { children: "\u6A29\u9650" }), void 0),
                        jsxRuntime.jsx(Select, __assign({ fullWidth: true, value: user.role, onChange: function (e) {
                                setUser(__assign(__assign({}, user), { role: Number(e.target.value) }));
                                setCanClose(true);
                            } }, { children: Object.keys(displayRoles).map(function (role, key) { return jsxRuntime.jsx(MenuItem, __assign({ value: role }, { children: displayRoles[role] }), key); }) }), void 0),
                        jsxRuntime.jsx(Typography, __assign({ style: { marginTop: "24px" } }, { children: "\u6709\u52B9\u6027" }), void 0),
                        jsxRuntime.jsx(Switch, { checked: user.isActive, color: "primary", onChange: function (e) {
                                setUser(__assign(__assign({}, user), { isActive: !user.isActive }));
                                setCanClose(true);
                            } }, void 0),
                        user.role !== RoleType.Admin &&
                            jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Typography, __assign({ style: { marginTop: "24px" } }, { children: "\u8A31\u53EF\u3059\u308B\u30B5\u30A4\u30C8" }), void 0),
                                    jsxRuntime.jsx(Select, __assign({ fullWidth: true, multiple: true, value: user.identifiers, onChange: function (e) {
                                            setUser(__assign(__assign({}, user), { identifiers: e.target.value }));
                                            setCanClose(true);
                                        }, renderValue: function (selected) { return (jsxRuntime.jsx("div", { children: selected.map(function (value, key) {
                                                var _a;
                                                return (jsxRuntime.jsx(Chip$1, { color: "primary", style: { marginLeft: "4px" }, label: (_a = webSiteManagementsService.webSites.find(function (w) { return w.webSiteId === value; })) === null || _a === void 0 ? void 0 : _a.name }, key));
                                            }) }, void 0)); } }, { children: webSiteManagementsService.webSites.map(function (site, key) { return (jsxRuntime.jsxs(MenuItem, __assign({ value: site.webSiteId }, { children: [jsxRuntime.jsx(Checkbox, { color: "primary", checked: user.identifiers.includes(site.webSiteId) }, void 0),
                                                jsxRuntime.jsxs(ListItemText, { children: [site.name, " - ", site.displayName] }, void 0)] }), key)); }) }), void 0)] }, void 0)] }, void 0),
                jsxRuntime.jsxs(Box, __assign({ marginTop: "24px", marginBottom: "12px", display: "flex" }, { children: [jsxRuntime.jsx(Button, __assign({ variant: "text", color: "primary", style: { marginLeft: "auto" }, onClick: function () { return props.onClose(undefined); } }, { children: "Cancel" }), void 0),
                        jsxRuntime.jsx(Button, __assign({ disabled: !canClose, variant: "contained", style: { marginLeft: "12px" }, onClick: function () { return props.onClose(user); }, color: "primary" }, { children: "Ok" }), void 0)] }), void 0)] }), void 0));
    });
}
function showUserDetailsDialogAsync(user, isNew) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isNew) return [3 /*break*/, 2];
                    return [4 /*yield*/, showDialogAsync(UserDetailDialog, __assign({ password: "" }, user))];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [4 /*yield*/, showDialogAsync(UserDetailDialog, user)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var useStyles = makeStyles({
    root: {},
});

function UsersPage() {
    var _this = this;
    var classes = useStyles$1();
    var _a = __read(React.useState([]), 2); _a[0]; _a[1];
    var _b = __read(React.useState(0), 2); _b[0]; _b[1];
    var _c = __read(React.useState(false), 2); _c[0]; _c[1];
    var _d = __read(React.useState(5), 2); _d[0]; _d[1];
    var theme = useTheme();
    useEffect(function () {
        services.usersService.fetchUesrsAsync();
    }, []);
    var createAsync = function () { return __awaiter(_this, void 0, void 0, function () {
        var user;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, showUserDetailsDialogAsync(new User("", "", "", RoleType.Subscribe, true, services.authService.loginInfo.identifier ?
                        [services.authService.loginInfo.identifier] :
                        [], ""), true)];
                case 1:
                    user = _b.sent();
                    if (!user) return [3 /*break*/, 3];
                    return [4 /*yield*/, services.usersService.createNewUserAsync({
                            email: user.email,
                            isActive: user.isActive,
                            name: user.name,
                            role: user.role,
                            identifiers: user.identifiers,
                            password: (_a = user.password) !== null && _a !== void 0 ? _a : ""
                        })];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var editEsync = function (user) { return __awaiter(_this, void 0, void 0, function () {
        var edited;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showUserDetailsDialogAsync(user)];
                case 1:
                    edited = _a.sent();
                    if (!edited) return [3 /*break*/, 3];
                    return [4 /*yield*/, services.usersService.saveUserAsync(edited)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return useObserver(function () {
        var usersService = services.usersService;
        return (jsxRuntime.jsxs(Box, __assign({ p: 2, height: "100%", display: "flex", flexDirection: "column" }, { children: [jsxRuntime.jsxs(Toolbar, __assign({ style: { paddingRight: "0" } }, { children: [jsxRuntime.jsxs(Paper, __assign({ style: { marginLeft: "auto" }, elevation: 2 }, { children: [jsxRuntime.jsx(InputBase, { style: {
                                        marginLeft: theme.spacing(2),
                                        flex: 1,
                                    }, placeholder: "\u691C\u7D22", inputProps: { "aria-label": "検索" } }, void 0),
                                jsxRuntime.jsx(IconButton, __assign({ type: "submit", style: { padding: "10px" }, "aria-label": "search" }, { children: jsxRuntime.jsx(Search, {}, void 0) }), void 0)] }), void 0),
                        jsxRuntime.jsxs(Button, __assign({ variant: "contained", style: {
                                marginLeft: "8px",
                                height: "44px",
                                borderRadius: "22px"
                            }, color: "primary", onClick: function () { return createAsync(); } }, { children: [jsxRuntime.jsx(Add, {}, void 0), "\u8FFD\u52A0"] }), void 0)] }), void 0),
                jsxRuntime.jsx(Paper, __assign({ className: classes.root, elevation: 2 }, { children: jsxRuntime.jsx(TableContainer, __assign({ className: classes.container }, { children: jsxRuntime.jsxs(Table, __assign({ stickyHeader: true, "aria-label": "sticky table" }, { children: [jsxRuntime.jsx(TableHead, { children: jsxRuntime.jsxs(TableRow, { children: [jsxRuntime.jsx(TableCell, {}, void 0),
                                            jsxRuntime.jsx(TableCell, {}, void 0),
                                            jsxRuntime.jsx(TableCell, { children: "Name" }, void 0),
                                            jsxRuntime.jsx(TableCell, { children: "E-Mail" }, void 0),
                                            jsxRuntime.jsx(TableCell, __assign({ width: "500px" }, { children: "Web Site" }), void 0),
                                            jsxRuntime.jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: "Role" }), void 0),
                                            jsxRuntime.jsx(TableCell, { children: "Enabled" }, void 0),
                                            jsxRuntime.jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: "Detail" }), void 0)] }, void 0) }, void 0),
                                jsxRuntime.jsx(TableBody, { children: usersService.users.map(function (user, i) { return (jsxRuntime.jsxs(TableRow, { children: [jsxRuntime.jsx(TableCell, __assign({ padding: "checkbox" }, { children: jsxRuntime.jsx(Checkbox, { color: "primary" }, void 0) }), void 0),
                                            jsxRuntime.jsx(TableCell, { children: jsxRuntime.jsx(Avatar, { src: axios.defaults.baseURL + user.avatar, alt: user.name }, void 0) }, void 0),
                                            jsxRuntime.jsx(TableCell, { children: user.name }, void 0),
                                            jsxRuntime.jsx(TableCell, { children: user.email }, void 0),
                                            jsxRuntime.jsx(TableCell, { children: jsxRuntime.jsx(Box, __assign({ style: { display: "flex", flexWrap: "wrap" } }, { children: user.role === RoleType.Admin ?
                                                        jsxRuntime.jsx(Box, __assign({ padding: "4px" }, { children: jsxRuntime.jsx(Chip$1, { color: "primary", label: "\u7BA1\u7406\u8005" }, void 0) }), void 0)
                                                        :
                                                            user.identifiers.slice(0, 6).map(function (identifier) { return (jsxRuntime.jsx(Box, __assign({ padding: "4px" }, { children: jsxRuntime.jsx(Chip$1, { color: "primary", label: identifier }, void 0) }), void 0)); }) }), void 0) }, void 0),
                                            jsxRuntime.jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: displayRoles[user.role] }), void 0),
                                            jsxRuntime.jsx(TableCell, { children: user.isActive ? "有効" : "無効" }, void 0),
                                            jsxRuntime.jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: jsxRuntime.jsx(IconButton, __assign({ onClick: function () { return editEsync(user); } }, { children: jsxRuntime.jsx(Icon, { children: "list" }, void 0) }), void 0) }), void 0)] }, user.email)); }) }, void 0)] }), void 0) }), void 0) }), void 0)] }), void 0));
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
        height: "100%",
    },
});

export default UsersPage;
