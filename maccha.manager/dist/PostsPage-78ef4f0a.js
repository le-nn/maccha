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

import { _ as _objectWithoutProperties, C as useControlled, D as _slicedToArray, E as _toConsumableArray, a as _extends, b as createSvgIcon, w as withStyles, G as fade, u as useTheme, c as clsx, e as capitalize, J as ButtonBase, p as propTypes, k as jsxRuntime, T as Typography, m as __assign, f as useHistory, K as Box, I as IconButton, L as Divider, M as axios, N as List, Q as schemeTypeDisplayNames, n as makeStyles, R as Avatar, s as services, U as theme, V as useLocation, i as __awaiter, j as __generator, W as Icon, g as __read, B as Button, X as useRouteMatch, Y as ObserverComponent, Z as RoleType, $ as ListItem, a0 as ListItemText, a1 as Menu, a2 as MenuItem } from './index.lib-fcf45d4b.js';
import React, { createElement, forwardRef, useEffect, useState } from 'react';
import { F as FlexSpacer, I as ItemsWrapGrid } from './ColorPalette-317a1e72.js';
import { C as Checkbox, s as showDialogAsync } from './showDialog-eede1950.js';
import { F as FileCopy, W as WrappedTextBlock } from './WrappedTextBlock-2cd5504d.js';
import { o as observer } from './mobxreact.esm-ea1d7773.js';
import { p as postStatusTypeDisplay } from './PostStatusType-0da5394e.js';
import { C as Card } from './Card-eba0781b.js';
import { c as confirmAsync } from './confirmAsync-423c00d4.js';
import { T as TableContainer, a as Table, b as TableHead, c as TableRow, d as TableCell, e as TableBody } from './TableRow-83e4dd97.js';
import { F as Fab } from './Fab-eaf51f5e.js';
import { A as Add } from './Add-2a7a6091.js';
import 'react-dom';

function usePagination() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; // keep default values in sync with @default tags in Pagination.propTypes

  var _props$boundaryCount = props.boundaryCount,
      boundaryCount = _props$boundaryCount === void 0 ? 1 : _props$boundaryCount,
      _props$componentName = props.componentName,
      componentName = _props$componentName === void 0 ? 'usePagination' : _props$componentName,
      _props$count = props.count,
      count = _props$count === void 0 ? 1 : _props$count,
      _props$defaultPage = props.defaultPage,
      defaultPage = _props$defaultPage === void 0 ? 1 : _props$defaultPage,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$hideNextButton = props.hideNextButton,
      hideNextButton = _props$hideNextButton === void 0 ? false : _props$hideNextButton,
      _props$hidePrevButton = props.hidePrevButton,
      hidePrevButton = _props$hidePrevButton === void 0 ? false : _props$hidePrevButton,
      handleChange = props.onChange,
      pageProp = props.page,
      _props$showFirstButto = props.showFirstButton,
      showFirstButton = _props$showFirstButto === void 0 ? false : _props$showFirstButto,
      _props$showLastButton = props.showLastButton,
      showLastButton = _props$showLastButton === void 0 ? false : _props$showLastButton,
      _props$siblingCount = props.siblingCount,
      siblingCount = _props$siblingCount === void 0 ? 1 : _props$siblingCount,
      other = _objectWithoutProperties(props, ["boundaryCount", "componentName", "count", "defaultPage", "disabled", "hideNextButton", "hidePrevButton", "onChange", "page", "showFirstButton", "showLastButton", "siblingCount"]);

  var _useControlled = useControlled({
    controlled: pageProp,
    default: defaultPage,
    name: componentName,
    state: 'page'
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      page = _useControlled2[0],
      setPageState = _useControlled2[1];

  var handleClick = function handleClick(event, value) {
    if (!pageProp) {
      setPageState(value);
    }

    if (handleChange) {
      handleChange(event, value);
    }
  }; // https://dev.to/namirsab/comment/2050


  var range = function range(start, end) {
    var length = end - start + 1;
    return Array.from({
      length: length
    }, function (_, i) {
      return start + i;
    });
  };

  var startPages = range(1, Math.min(boundaryCount, count));
  var endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);
  var siblingsStart = Math.max(Math.min( // Natural start
  page - siblingCount, // Lower boundary when page is high
  count - boundaryCount - siblingCount * 2 - 1), // Greater than startPages
  boundaryCount + 2);
  var siblingsEnd = Math.min(Math.max( // Natural end
  page + siblingCount, // Upper boundary when page is low
  boundaryCount + siblingCount * 2 + 2), // Less than endPages
  endPages[0] - 2); // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']

  var itemList = [].concat(_toConsumableArray(showFirstButton ? ['first'] : []), _toConsumableArray(hidePrevButton ? [] : ['previous']), _toConsumableArray(startPages), _toConsumableArray(siblingsStart > boundaryCount + 2 ? ['start-ellipsis'] : boundaryCount + 1 < count - boundaryCount ? [boundaryCount + 1] : []), _toConsumableArray(range(siblingsStart, siblingsEnd)), _toConsumableArray(siblingsEnd < count - boundaryCount - 1 ? ['end-ellipsis'] : count - boundaryCount > boundaryCount ? [count - boundaryCount] : []), _toConsumableArray(endPages), _toConsumableArray(hideNextButton ? [] : ['next']), _toConsumableArray(showLastButton ? ['last'] : [])); // Map the button type to its page number

  var buttonPage = function buttonPage(type) {
    switch (type) {
      case 'first':
        return 1;

      case 'previous':
        return page - 1;

      case 'next':
        return page + 1;

      case 'last':
        return count;

      default:
        return null;
    }
  }; // Convert the basic item list to PaginationItem props objects


  var items = itemList.map(function (item) {
    return typeof item === 'number' ? {
      onClick: function onClick(event) {
        handleClick(event, item);
      },
      type: 'page',
      page: item,
      selected: item === page,
      disabled: disabled,
      'aria-current': item === page ? 'true' : undefined
    } : {
      onClick: function onClick(event) {
        handleClick(event, buttonPage(item));
      },
      type: item,
      page: buttonPage(item),
      selected: false,
      disabled: disabled || item.indexOf('ellipsis') === -1 && (item === 'next' || item === 'last' ? page >= count : page <= 1)
    };
  });
  return _extends({
    items: items
  }, other);
}

/**
 * @ignore - internal component.
 */

var FirstPageIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"
}), 'FirstPage');

/**
 * @ignore - internal component.
 */

var LastPageIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"
}), 'LastPage');

/**
 * @ignore - internal component.
 */

var NavigateBeforeIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
}), 'NavigateBefore');

/**
 * @ignore - internal component.
 */

var NavigateNextIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), 'NavigateNext');

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: _extends({}, theme.typography.body2, {
      borderRadius: 32 / 2,
      textAlign: 'center',
      boxSizing: 'border-box',
      minWidth: 32,
      height: 32,
      padding: '0 6px',
      margin: '0 3px',
      color: theme.palette.text.primary
    }),

    /* Styles applied to the root element if `type="page"`. */
    page: {
      transition: theme.transitions.create(['color', 'background-color'], {
        duration: theme.transitions.duration.short
      }),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      },
      '&$focusVisible': {
        backgroundColor: theme.palette.action.focus
      },
      '&$selected': {
        backgroundColor: theme.palette.action.selected,
        '&:hover, &$focusVisible': {
          backgroundColor: fade(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: theme.palette.action.selected
          }
        },
        '&$disabled': {
          opacity: 1,
          color: theme.palette.action.disabled,
          backgroundColor: theme.palette.action.selected
        }
      },
      '&$disabled': {
        opacity: theme.palette.action.disabledOpacity
      }
    },

    /* Styles applied applied to the root element if `size="small"`. */
    sizeSmall: {
      minWidth: 26,
      height: 26,
      borderRadius: 26 / 2,
      margin: '0 1px',
      padding: '0 4px',
      '& $icon': {
        fontSize: theme.typography.pxToRem(18)
      }
    },

    /* Styles applied applied to the root element if `size="large"`. */
    sizeLarge: {
      minWidth: 40,
      height: 40,
      borderRadius: 40 / 2,
      padding: '0 10px',
      fontSize: theme.typography.pxToRem(15),
      '& $icon': {
        fontSize: theme.typography.pxToRem(22)
      }
    },

    /* Styles applied to the root element if `variant="text"` and `color="primary"`. */
    textPrimary: {
      '&$selected': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        '&:hover, &$focusVisible': {
          backgroundColor: theme.palette.primary.dark,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: theme.palette.primary.main
          }
        },
        '&$disabled': {
          color: theme.palette.action.disabled
        }
      }
    },

    /* Styles applied to the root element if `variant="text"` and `color="secondary"`. */
    textSecondary: {
      '&$selected': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        '&:hover, &$focusVisible': {
          backgroundColor: theme.palette.secondary.dark,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: theme.palette.secondary.main
          }
        },
        '&$disabled': {
          color: theme.palette.action.disabled
        }
      }
    },

    /* Styles applied to the root element if `outlined="true"`. */
    outlined: {
      border: "1px solid ".concat(theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'),
      '&$selected': {
        '&$disabled': {
          border: "1px solid ".concat(theme.palette.action.disabledBackground)
        }
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
    outlinedPrimary: {
      '&$selected': {
        color: theme.palette.primary.main,
        border: "1px solid ".concat(fade(theme.palette.primary.main, 0.5)),
        backgroundColor: fade(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        '&:hover, &$focusVisible': {
          backgroundColor: fade(theme.palette.primary.main, theme.palette.action.activatedOpacity + theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        },
        '&$disabled': {
          color: theme.palette.action.disabled
        }
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
    outlinedSecondary: {
      '&$selected': {
        color: theme.palette.secondary.main,
        border: "1px solid ".concat(fade(theme.palette.secondary.main, 0.5)),
        backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.activatedOpacity),
        '&:hover, &$focusVisible': {
          backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.activatedOpacity + theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        },
        '&$disabled': {
          color: theme.palette.action.disabled
        }
      }
    },

    /* Styles applied to the root element if `rounded="true"`. */
    rounded: {
      borderRadius: theme.shape.borderRadius
    },

    /* Styles applied to the root element if `type="start-ellipsis"` or `type="end-ellipsis"`. */
    ellipsis: {
      height: 'auto',
      '&$disabled': {
        opacity: theme.palette.action.disabledOpacity
      }
    },

    /* Pseudo-class applied to the root element if keyboard focused. */
    focusVisible: {},

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Pseudo-class applied to the root element if `selected={true}`. */
    selected: {},

    /* Styles applied to the icon element. */
    icon: {
      fontSize: theme.typography.pxToRem(20),
      margin: '0 -8px'
    }
  };
};
var PaginationItem = /*#__PURE__*/forwardRef(function PaginationItem(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'standard' : _props$color,
      component = props.component,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      page = props.page,
      _props$selected = props.selected,
      selected = _props$selected === void 0 ? false : _props$selected,
      _props$shape = props.shape,
      shape = _props$shape === void 0 ? 'round' : _props$shape,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$type = props.type,
      type = _props$type === void 0 ? 'page' : _props$type,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'text' : _props$variant,
      other = _objectWithoutProperties(props, ["classes", "className", "color", "component", "disabled", "page", "selected", "shape", "size", "type", "variant"]);

  var theme = useTheme();
  var normalizedIcons = theme.direction === 'rtl' ? {
    previous: NavigateNextIcon,
    next: NavigateBeforeIcon,
    last: FirstPageIcon,
    first: LastPageIcon
  } : {
    previous: NavigateBeforeIcon,
    next: NavigateNextIcon,
    first: FirstPageIcon,
    last: LastPageIcon
  };
  var Icon = normalizedIcons[type];
  return type === 'start-ellipsis' || type === 'end-ellipsis' ? /*#__PURE__*/createElement("div", {
    ref: ref,
    className: clsx(classes.root, classes.ellipsis, disabled && classes.disabled, size !== 'medium' && classes["size".concat(capitalize(size))])
  }, "\u2026") : /*#__PURE__*/createElement(ButtonBase, _extends({
    ref: ref,
    component: component,
    disabled: disabled,
    focusVisibleClassName: classes.focusVisible,
    className: clsx(classes.root, classes.page, classes[variant], classes[shape], className, color !== 'standard' && classes["".concat(variant).concat(capitalize(color))], disabled && classes.disabled, selected && classes.selected, size !== 'medium' && classes["size".concat(capitalize(size))])
  }, other), type === 'page' && page, Icon ? /*#__PURE__*/createElement(Icon, {
    className: classes.icon
  }) : null);
});
process.env.NODE_ENV !== "production" ? PaginationItem.propTypes = {
  /**
   * @ignore
   */
  classes: propTypes.object.isRequired,

  /**
   * @ignore
   */
  className: propTypes.string,

  /**
   * The active color.
   */
  color: propTypes.oneOf(['standard', 'primary', 'secondary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * If `true`, the item will be disabled.
   */
  disabled: propTypes.bool,

  /**
   * The current page number.
   */
  page: propTypes.number,

  /**
   * If `true` the pagination item is selected.
   */
  selected: propTypes.bool,

  /**
   * The shape of the pagination item.
   */
  shape: propTypes.oneOf(['round', 'rounded']),

  /**
   * The size of the pagination item.
   */
  size: propTypes.oneOf(['small', 'medium', 'large']),

  /**
   * The type of pagination item.
   */
  type: propTypes.oneOf(['page', 'first', 'last', 'next', 'previous', 'start-ellipsis', 'end-ellipsis']),

  /**
   * The pagination item variant.
   */
  variant: propTypes.oneOf(['text', 'outlined'])
} : void 0;
var PaginationItem$1 = withStyles(styles, {
  name: 'MuiPaginationItem'
})(PaginationItem);

var styles$1 = {
  /* Styles applied to the root element. */
  root: {},

  /* Styles applied to the ul element. */
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none'
  }
};

function defaultGetAriaLabel(type, page, selected) {
  if (type === 'page') {
    return "".concat(selected ? '' : 'Go to ', "page ").concat(page);
  }

  return "Go to ".concat(type, " page");
}

var Pagination = /*#__PURE__*/forwardRef(function Pagination(props, ref) {
  props.boundaryCount;
      var classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'standard' : _props$color;
      props.count;
      props.defaultPage;
      props.disabled;
      var _props$getItemAriaLab = props.getItemAriaLabel,
      getItemAriaLabel = _props$getItemAriaLab === void 0 ? defaultGetAriaLabel : _props$getItemAriaLab;
      props.hideNextButton;
      props.hidePrevButton;
      props.onChange;
      props.page;
      var _props$renderItem = props.renderItem,
      renderItem = _props$renderItem === void 0 ? function (item) {
    return /*#__PURE__*/createElement(PaginationItem$1, item);
  } : _props$renderItem,
      _props$shape = props.shape,
      shape = _props$shape === void 0 ? 'round' : _props$shape;
      props.showFirstButton;
      props.showLastButton;
      props.siblingCount;
      var _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'text' : _props$variant,
      other = _objectWithoutProperties(props, ["boundaryCount", "classes", "className", "color", "count", "defaultPage", "disabled", "getItemAriaLabel", "hideNextButton", "hidePrevButton", "onChange", "page", "renderItem", "shape", "showFirstButton", "showLastButton", "siblingCount", "size", "variant"]);

  var _usePagination = usePagination(_extends({}, props, {
    componentName: 'Pagination'
  })),
      items = _usePagination.items;

  return /*#__PURE__*/createElement("nav", _extends({
    "aria-label": "pagination navigation",
    className: clsx(classes.root, className),
    ref: ref
  }, other), /*#__PURE__*/createElement("ul", {
    className: classes.ul
  }, items.map(function (item, index) {
    return /*#__PURE__*/createElement("li", {
      key: index
    }, renderItem(_extends({}, item, {
      color: color,
      'aria-label': getItemAriaLabel(item.type, item.page, item.selected),
      shape: shape,
      size: size,
      variant: variant
    })));
  })));
}); // @default tags synced with default values from usePagination

process.env.NODE_ENV !== "production" ? Pagination.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount: propTypes.number,

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
   * The active color.
   */
  color: propTypes.oneOf(['primary', 'secondary', 'standard']),

  /**
   * The total number of pages.
   * @default 1
   */
  count: propTypes.number,

  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage: propTypes.number,

  /**
   * If `true`, the pagination component will be disabled.
   * @default false
   */
  disabled: propTypes.bool,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @param {bool} selected If true, the current page is selected.
   * @returns {string}
   */
  getItemAriaLabel: propTypes.func,

  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton: propTypes.bool,

  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton: propTypes.bool,

  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange: propTypes.func,

  /**
   * The current page.
   */
  page: propTypes.number,

  /**
   * Render the item.
   *
   * @param {PaginationRenderItemParams} params The props to spread on a PaginationItem.
   * @returns {ReactNode}
   */
  renderItem: propTypes.func,

  /**
   * The shape of the pagination items.
   */
  shape: propTypes.oneOf(['round', 'rounded']),

  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: propTypes.bool,

  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: propTypes.bool,

  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount: propTypes.number,

  /**
   * The size of the pagination component.
   */
  size: propTypes.oneOf(['large', 'medium', 'small']),

  /**
   * The variant to use.
   */
  variant: propTypes.oneOf(['outlined', 'text'])
} : void 0;
var Pagination$1 = withStyles(styles$1, {
  name: 'MuiPagination'
})(Pagination);

var EditIcon = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
}), 'Edit');

var MoreVert = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
}), 'MoreVert');

function DateTimeText(props) {
    var _a;
    var date = props.date, showTime = props.showTime;
    return (jsxRuntime.jsxs(Typography, __assign({}, props, { style: { fontSize: props.fontSize } }, { children: [date === null || date === void 0 ? void 0 : date.getFullYear(),
            jsxRuntime.jsx("small", { children: " \u5E74" }, void 0),
            ((_a = date === null || date === void 0 ? void 0 : date.getMonth()) !== null && _a !== void 0 ? _a : 0) + 1,
            jsxRuntime.jsx("small", { children: "\u6708" }, void 0),
            date === null || date === void 0 ? void 0 : date.getDate(),
            jsxRuntime.jsx("small", { children: "\u65E5" }, void 0),
            showTime && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [date === null || date === void 0 ? void 0 : date.getHours(),
                    jsxRuntime.jsx("small", { children: "\u6642" }, void 0),
                    date === null || date === void 0 ? void 0 : date.getMinutes(),
                    jsxRuntime.jsx("small", { children: "\u5206" }, void 0)] }, void 0))] }), void 0));
}

function PostTypeSettingPanel(props) {
    var postType = props.postType;
    var history = useHistory();
    function handleEdit() {
        history.push("/posts/" + postType.taxonomy.name + "/edit");
    }
    function copyToClipBoard(text) {
        var _a;
        (_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText(text);
    }
    return (jsxRuntime.jsxs(Box, __assign({ p: 2 }, { children: [jsxRuntime.jsxs(Box, __assign({ display: "flex", width: "100%", alignItems: "center" }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "h6" }, { children: "\u6295\u7A3F\u8A2D\u5B9A" }), void 0),
                    jsxRuntime.jsx(Box, { flex: "1 1 auto" }, void 0),
                    jsxRuntime.jsx(IconButton, __assign({ color: "primary", onClick: handleEdit }, { children: jsxRuntime.jsx(EditIcon, {}, void 0) }), void 0)] }), void 0),
            jsxRuntime.jsx(Divider, {}, void 0),
            jsxRuntime.jsxs(Box, __assign({ mt: 1 }, { children: [jsxRuntime.jsxs(Box, __assign({ display: "flex" }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "overline", color: "textSecondary" }, { children: "\u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8" }), void 0),
                            jsxRuntime.jsx(FlexSpacer, {}, void 0),
                            jsxRuntime.jsx(IconButton, __assign({ color: "primary", size: "small", onClick: function (_) { return copyToClipBoard(axios.defaults.baseURL + "contents/" + props.postType.taxonomy.name); } }, { children: jsxRuntime.jsx(FileCopy, { fontSize: "small" }, void 0) }), void 0)] }), void 0),
                    jsxRuntime.jsxs(Typography, __assign({ style: { wordBreak: "break-all" } }, { children: [axios.defaults.baseURL, "contents/", props.postType.taxonomy.name] }), void 0)] }), void 0),
            jsxRuntime.jsxs(Box, __assign({ mt: 1 }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "overline", color: "textSecondary" }, { children: "\u540D\u79F0" }), void 0),
                    jsxRuntime.jsx(Typography, __assign({ noWrap: true }, { children: postType.taxonomy.name }), void 0)] }), void 0),
            jsxRuntime.jsxs(Box, __assign({ mt: 1 }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "overline", color: "textSecondary" }, { children: "\u8868\u793A\u540D" }), void 0),
                    jsxRuntime.jsx(Typography, __assign({ noWrap: true }, { children: postType.taxonomy.displayName }), void 0)] }), void 0),
            jsxRuntime.jsxs(Box, __assign({ mt: 1 }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "overline", color: "textSecondary" }, { children: "\u5099\u8003" }), void 0),
                    jsxRuntime.jsx(Typography, __assign({ noWrap: true }, { children: postType.taxonomy.description }), void 0)] }), void 0),
            jsxRuntime.jsxs(Box, __assign({ mt: 1 }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "overline", color: "textSecondary" }, { children: "\u30B9\u30AD\u30FC\u30E0" }), void 0),
                    jsxRuntime.jsx(Divider, {}, void 0),
                    postType.taxonomy.schemes.length ?
                        jsxRuntime.jsx(List, { children: postType.taxonomy.schemes.map(function (s) {
                                var _a;
                                return (jsxRuntime.jsxs(Box, __assign({ mb: 1 }, { children: [jsxRuntime.jsx(Box, { children: jsxRuntime.jsx(Typography, __assign({ variant: "body2", style: { fontSize: "12px" }, color: "textSecondary", noWrap: true }, { children: s.name ? s.name : "　" }), void 0) }, void 0),
                                        jsxRuntime.jsx(Box, { children: jsxRuntime.jsx(Typography, __assign({ variant: "body2", style: { fontSize: "12px" }, color: "textSecondary", noWrap: true }, { children: s.displayName ? s.displayName : "　" }), void 0) }, void 0),
                                        jsxRuntime.jsx(Box, { children: jsxRuntime.jsx(Typography, __assign({ color: "primary", variant: "subtitle2", noWrap: true }, { children: (_a = schemeTypeDisplayNames[s.type]) !== null && _a !== void 0 ? _a : "　" }), void 0) }, void 0),
                                        jsxRuntime.jsx(Box, { children: jsxRuntime.jsx(Typography, __assign({ style: { fontSize: "11px" }, variant: "caption", color: "textSecondary" }, { children: s.description }), void 0) }, void 0),
                                        jsxRuntime.jsx(Box, { mt: 1 }, void 0),
                                        jsxRuntime.jsx(Divider, {}, void 0)] }), void 0));
                            }) }, void 0)
                        :
                            jsxRuntime.jsx(Typography, __assign({ color: "textSecondary", variant: "caption" }, { children: "\u30B9\u30AD\u30FC\u30E0\u304C\u3042\u308A\u307E\u305B\u3093" }), void 0)] }), void 0)] }), void 0));
}

function PostCard(props) {
    var _a;
    var classes = useStyles();
    var content = props.content; props.deletePresed; props.editPressed; props.previewPressed;
    return (jsxRuntime.jsx(Card, __assign({ className: classes.card, elevation: 5 }, { children: jsxRuntime.jsxs(Box, __assign({ display: "flex", flexDirection: "column", height: "100%" }, { children: [jsxRuntime.jsxs(Box, __assign({ className: classes.profile }, { children: [jsxRuntime.jsx(Avatar, __assign({ src: axios.defaults.baseURL + services.authService.loginInfo.avatar, style: {
                                width: "32px",
                                height: "32px",
                                background: theme.palette.primary.main
                            } }, { children: content.createdBy.name[0] }), void 0),
                        jsxRuntime.jsx(Typography, __assign({ className: classes.profileText, variant: "h6", noWrap: true }, { children: props.content.createdBy.name }), void 0)] }), void 0),
                jsxRuntime.jsx("img", { alt: content.title, src: content.thumbnail ? axios.defaults.baseURL + content.thumbnail : "", height: "148px", style: {
                        objectFit: "cover",
                        background: "rgba(127, 127, 127, 0.1"
                    } }, void 0),
                jsxRuntime.jsxs(Box, __assign({ p: 2, flex: "1 1 auto", zIndex: "1", display: "flex", flexDirection: "column" }, { children: [jsxRuntime.jsx(Box, __assign({ position: "relative", display: "flex", width: "100%" }, { children: jsxRuntime.jsx(Box, { className: classes.menuButton }, void 0) }), void 0),
                        jsxRuntime.jsx(Box, __assign({ className: classes.title }, { children: jsxRuntime.jsx(WrappedTextBlock, __assign({ color: "inherit", variant: "h6", noWrap: true, row: 2 }, { children: content.title }), void 0) }), void 0),
                        jsxRuntime.jsx(Box, __assign({ height: "72px", mt: 1 }, { children: jsxRuntime.jsx(WrappedTextBlock, __assign({ color: "textSecondary", row: 3, variant: "caption", fontSize: "10px" }, { children: content.description.substr(0, 1024).replace(/<[^>]*>?/gm, "").replace(/&[^;]*;?/gm, "") }), void 0) }), void 0),
                        jsxRuntime.jsxs(Box, __assign({ display: "flex", alignItems: "center" }, { children: [jsxRuntime.jsx(Box, { children: jsxRuntime.jsx(Typography, __assign({ variant: "caption" }, { children: postStatusTypeDisplay[props.content.status] }), void 0) }, void 0),
                                jsxRuntime.jsx(FlexSpacer, {}, void 0)] }), void 0),
                        jsxRuntime.jsx(Box, __assign({ display: "flex" }, { children: jsxRuntime.jsx(DateTimeText, { showTime: true, color: "textSecondary", fontSize: "12px", date: ((_a = props.content.publishIn) !== null && _a !== void 0 ? _a : props.content.createdAt).toJSDate() }, void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
}
var useStyles = makeStyles({
    card: {
        width: "100%",
        height: "348px",
        borderRadius: "0px",
        position: "relative"
    },
    img: {
        width: "100%",
        height: "160px",
        objectFit: "cover"
    },
    title: {},
    menuButton: {
        position: "absolute",
        right: "36px",
        top: "-40px"
    },
    profile: {
        height: "28px",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: "8px",
        left: "8px",
        right: "8px",
        bottom: "8px"
    },
    profileText: {
        marginLeft: "8px",
        color: "white",
        width: "200%",
        textShadow: "1px 1px 4px #bbbbbb"
    }
});

function PostSearchPagingBar(props) {
    var n = props.count / props.fetch;
    var count = Number.isInteger(n) ? n : Math.floor(props.count / props.fetch) + 1;
    return jsxRuntime.jsxs("div", { children: [props.count, " \u4EF6\u4E2D", Math.min(props.offset + 1, props.count), " - ", Math.min(props.offset + props.fetch, props.count), jsxRuntime.jsx(Pagination$1, { color: "primary", count: count, page: props.offset / props.fetch + 1, onChange: function (_, v) { return props.onChange({
                    offset: (v - 1) * props.fetch,
                    fetch: props.fetch
                }); } }, void 0)] }, void 0);
}

var PostListPanel = observer(function (props) {
    var _a, _b, _c, _d;
    var history = useHistory();
    var location = useLocation();
    var query = new URLSearchParams(location.search);
    useEffect(function () {
        var _a;
        var page = Number((_a = query.get("page")) !== null && _a !== void 0 ? _a : 1);
        var postType = services.postManagementsService.selected;
        services.postsService.setSearchOption(__assign(__assign({}, services.postsService.searchOption), { offset: services.postsService.searchOption.fetch * (page - 1), fetch: (postType === null || postType === void 0 ? void 0 : postType.displayFormat) === "card" ? 30 : 60 }));
        searchAsync();
    }, [services.postManagementsService.selected]);
    function searchAsync() {
        return __awaiter(this, void 0, void 0, function () {
            var selected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selected = services.postManagementsService.selected;
                        if (!selected) return [3 /*break*/, 2];
                        return [4 /*yield*/, services.postsService.searchPostsAsync(selected.taxonomy.name)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    function handleChangePage(e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                history.replace(location.pathname + "?page=" + ((e.offset / e.fetch) + 1));
                return [2 /*return*/];
            });
        });
    }
    function onDeletePresed(post) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var selected;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, confirmAsync("削除しますか?")];
                    case 1:
                        if (!_c.sent()) return [3 /*break*/, 3];
                        selected = services.postManagementsService.selected;
                        return [4 /*yield*/, services.postsService.deleteFromId((_b = (_a = services.postManagementsService.selected) === null || _a === void 0 ? void 0 : _a.taxonomy.name) !== null && _b !== void 0 ? _b : "", post.contentId)];
                    case 2:
                        _c.sent();
                        if (selected) {
                            services.postsService.searchPostsAsync(selected.taxonomy.name);
                        }
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function onEditPressed(post) {
        var selected = services.postManagementsService.selected;
        if (selected) {
            history.push("/posts/" + selected.taxonomy.name + "/" + post.contentId + "/edit");
        }
    }
    function onPreviewPressed(contentId) {
        var selected = services.postManagementsService.selected;
        if (selected) {
            history.push("/posts/" + selected.taxonomy.name + "/" + contentId);
        }
    }
    return (jsxRuntime.jsxs(Box, __assign({ height: "100%", display: "flex", flexDirection: "column" }, { children: [jsxRuntime.jsxs(Box, { children: [jsxRuntime.jsxs(Box, __assign({ p: 2, display: "flex", alignItems: "center", flexWrap: "wrap" }, { children: [jsxRuntime.jsx(Typography, { children: "\u4E00\u89A7" }, void 0),
                            jsxRuntime.jsx(Box, { flex: "1 1 auto" }, void 0),
                            jsxRuntime.jsx(PostSearchPagingBar, { offset: services.postsService.searchOption.offset, count: services.postsService.hitCount, fetch: services.postsService.searchOption.fetch, onChange: function (e) { return handleChangePage(e); } }, void 0)] }), void 0),
                    jsxRuntime.jsx(Box, __assign({ mx: 2 }, { children: jsxRuntime.jsx(Divider, {}, void 0) }), void 0)] }, void 0),
            jsxRuntime.jsxs(Box, __assign({ display: "flex", flex: "1 1 auto", overflow: "auto", p: 1 }, { children: [((_a = services.postManagementsService.selected) === null || _a === void 0 ? void 0 : _a.displayFormat) === "card" &&
                        jsxRuntime.jsx(ItemsWrapGrid, { items: services.postsService.posts.map(function (item) { return ({ id: item.contentId, content: item }); }), itemSlot: function (item) { return jsxRuntime.jsx(PostCard, { previewPressed: function () { return onPreviewPressed(item.content.contentId); }, deletePresed: function () { return onDeletePresed(item.content); }, editPressed: function () { return onEditPressed(item.content); }, content: item.content }, item.id); } }, void 0),
                    ((_b = services.postManagementsService.selected) === null || _b === void 0 ? void 0 : _b.displayFormat) === "table" &&
                        jsxRuntime.jsx(PostSearchView, { previewPressed: function (c) { return onPreviewPressed(c.contentId); }, deletePresed: function (c) { return onDeletePresed(c); }, editPressed: function (c) { return onEditPressed(c); }, contents: services.postsService.posts, schemes: (_d = (_c = services.postManagementsService.selected) === null || _c === void 0 ? void 0 : _c.taxonomy.schemes) !== null && _d !== void 0 ? _d : [] }, void 0)] }), void 0)] }), void 0));
});
function PostSearchView(props) {
    var theme = useTheme();
    return (jsxRuntime.jsx(TableContainer, { children: jsxRuntime.jsxs(Table, __assign({ stickyHeader: true, "aria-label": "sticky table" }, { children: [jsxRuntime.jsx(TableHead, { children: jsxRuntime.jsxs(TableRow, { children: [jsxRuntime.jsx(TableCell, {}, void 0),
                            jsxRuntime.jsx(TableCell, { children: "\u30BF\u30A4\u30C8\u30EB" }, void 0),
                            jsxRuntime.jsx(TableCell, { children: "\u4F5C\u6210\u8005" }, void 0),
                            jsxRuntime.jsx(TableCell, { children: "\u30B5\u30E0\u30CD\u30A4\u30EB" }, void 0),
                            jsxRuntime.jsx(TableCell, { children: "\u30E1\u30BF\u30C7\u30FC\u30BF" }, void 0),
                            jsxRuntime.jsx(TableCell, { children: "\u5099\u8003" }, void 0),
                            jsxRuntime.jsx(TableCell, { children: "\u516C\u958B\u65E5\u6642" }, void 0),
                            jsxRuntime.jsx(TableCell, { children: "\u30B9\u30C6\u30FC\u30BF\u30B9" }, void 0),
                            jsxRuntime.jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: "\u5099\u8003" }), void 0),
                            jsxRuntime.jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: "\u8A73\u7D30" }), void 0),
                            props.schemes.map(function (s) { return jsxRuntime.jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: s.displayName }), s.schemeId); }),
                            jsxRuntime.jsx(TableCell, { style: { textAlign: "center" } }, void 0)] }, void 0) }, void 0),
                jsxRuntime.jsx(TableBody, { children: props.contents.map(function (c) {
                        var _a;
                        return (jsxRuntime.jsxs(TableRow, { children: [jsxRuntime.jsx(TableCell, __assign({ padding: "checkbox" }, { children: jsxRuntime.jsx(Checkbox, { color: "primary" }, void 0) }), void 0),
                                jsxRuntime.jsx(TableCell, { children: c.title }, void 0),
                                jsxRuntime.jsx(TableCell, { children: jsxRuntime.jsxs(Box, __assign({ display: "flex" }, { children: [jsxRuntime.jsx(Avatar, __assign({ src: axios.defaults.baseURL + services.authService.loginInfo.avatar, style: {
                                                    width: "32px",
                                                    height: "32px",
                                                    background: theme.palette.primary.main
                                                } }, { children: c.createdBy.name[0] }), void 0),
                                            jsxRuntime.jsx(Typography, __assign({ variant: "h6", noWrap: true }, { children: c.createdBy.name }), void 0)] }), void 0) }, void 0),
                                jsxRuntime.jsx(TableCell, { children: jsxRuntime.jsx("img", { alt: c.title, src: c.thumbnail, height: "38px", style: {
                                            objectFit: "cover",
                                            background: "rgba(127, 127, 127, 0.1"
                                        } }, void 0) }, void 0),
                                jsxRuntime.jsx(TableCell, { children: c.metadata }, void 0),
                                jsxRuntime.jsx(TableCell, { children: c.description }, void 0),
                                jsxRuntime.jsx(TableCell, { children: jsxRuntime.jsx(DateTimeText, { showTime: true, color: "textSecondary", fontSize: "12px", date: ((_a = c.publishIn) !== null && _a !== void 0 ? _a : c.createdAt).toJSDate() }, void 0) }, void 0),
                                jsxRuntime.jsx(TableCell, { children: jsxRuntime.jsx(Typography, __assign({ variant: "caption" }, { children: postStatusTypeDisplay[c.status] }), void 0) }, void 0),
                                c.fields.map(function (f) { return jsxRuntime.jsx(TableCell, __assign({ style: { textAlign: "center" } }, { children: f.value }), f.fieldId); }),
                                jsxRuntime.jsx(TableCell, { children: jsxRuntime.jsxs(Box, __assign({ display: "flex" }, { children: [jsxRuntime.jsx(IconButton, { children: jsxRuntime.jsx(Icon, { children: "preview" }, void 0) }, void 0),
                                            jsxRuntime.jsx(IconButton, { children: jsxRuntime.jsx(Icon, { children: "edit" }, void 0) }, void 0),
                                            jsxRuntime.jsx(IconButton, { children: jsxRuntime.jsx(Icon, { children: "delete" }, void 0) }, void 0)] }), void 0) }, void 0)] }, c.contentId));
                    }) }, void 0)] }), void 0) }, void 0));
}

/**
 * select media or upload Dialog.
 * @param props props
 */
function ConfirmPostTypeDialog(props) {
    var _a = __read(useState(false), 2), confirm = _a[0], setConfirm = _a[1];
    return (jsxRuntime.jsxs(Box, __assign({ p: 2 }, { children: [jsxRuntime.jsx(Box, { children: jsxRuntime.jsx(Typography, __assign({ variant: "h6" }, { children: props.context.message }), void 0) }, void 0),
            jsxRuntime.jsx(Box, __assign({ mt: 1 }, { children: jsxRuntime.jsx(Typography, __assign({ variant: "overline", style: { color: theme.palette.grey[500] } }, { children: "\u6295\u7A3F\u30BF\u30A4\u30D7\u3068\u7D10\u3065\u3044\u3066\u3044\u308B\u6295\u7A3F\u304C\u3059\u3079\u3066\u524A\u9664\u3055\u308C\u307E\u3059\u304C\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F" }), void 0) }), void 0),
            jsxRuntime.jsxs(Box, { children: [jsxRuntime.jsx(Checkbox, { checked: confirm, onChange: function (e) { return setConfirm(e.target.checked); } }, void 0), "\u78BA\u8A8D\u3057\u307E\u3057\u305F"] }, void 0),
            jsxRuntime.jsxs(Box, __assign({ marginTop: "24px", display: "flex" }, { children: [jsxRuntime.jsx(Button, __assign({ variant: "text", color: "primary", style: { marginLeft: "auto" }, onClick: function () { return props.onClose(false); } }, { children: "Cancel" }), void 0),
                    jsxRuntime.jsx(Button, __assign({ disabled: !confirm, variant: "contained", style: { marginLeft: "12px" }, onClick: function () { return props.onClose(true); }, color: "primary" }, { children: "Ok" }), void 0)] }), void 0)] }), void 0));
}
function confirmDeletePostTypeAsync(message) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showDialogAsync(ConfirmPostTypeDialog, { message: message }, {
                        maxWidth: "lg"
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

function PostsPage() {
    var _this = this;
    var classes = useStyles$1();
    var routeMatch = useRouteMatch();
    var history = useHistory();
    var _a = __read(React.useState(null), 2), anchorEl = _a[0], setAnchorEl = _a[1];
    var _b = __read(useState(null), 2), postTypeContext = _b[0], setPostTypeContext = _b[1];
    useEffect(function () {
        services.postManagementsService.fetchPostTypes().then(function () {
            var selected = services.postManagementsService.selected;
            if (selected) {
                if (!routeMatch.params.taxonomy) {
                    history.replace("/posts/" + selected.taxonomy.name);
                }
                else {
                    services.postManagementsService.selectFromName(routeMatch.params.taxonomy);
                }
            }
        });
    }, [history, routeMatch]);
    var handleNewPost = function () {
        var selected = services.postManagementsService.selected;
        if (selected) {
            history.push("/posts/" + selected.taxonomy.name + "/new/edit");
        }
    };
    var onAddPostTypeClicked = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            history.push("/posts/new/edit");
            return [2 /*return*/];
        });
    }); };
    function onEditClicked() {
        if (postTypeContext) {
            history.push("/posts/" + postTypeContext.taxonomy.name + "/edit");
        }
    }
    var onPostTypeListClicked = function (index) {
        services.postManagementsService.selectFromIndex(index);
        var selected = services.postManagementsService.selected;
        if (selected) {
            setTimeout(function () { return history.replace("/posts/" + selected.taxonomy.name); }, 10);
        }
        console.log(selected);
    };
    var onPostTypeMenu = function (event, postType) {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setPostTypeContext(postType);
    };
    var onRemovePostTypeClicked = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handleCloseMenu();
                    if (!postTypeContext) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, confirmDeletePostTypeAsync(postTypeContext.taxonomy.displayName + "\u3092\u672C\u5F53\u306B\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F")];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    return [4 /*yield*/, services.postManagementsService.removeAsync(postTypeContext.postTypeId)];
                case 2:
                    _a.sent();
                    console.log(services.postManagementsService.postTypes);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleCloseMenu = function () {
        setAnchorEl(null);
    };
    return jsxRuntime.jsx(ObserverComponent, { children: (function () {
            var postManagementsService = services.postManagementsService, authService = services.authService;
            if (!authService.loginInfo.identifier) {
                return (jsxRuntime.jsx(Box, __assign({ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }, { children: jsxRuntime.jsx(Typography, __assign({ variant: "h5", style: { color: theme.palette.error.main } }, { children: "WEB\u30B5\u30A4\u30C8\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044" }), void 0) }), void 0));
            }
            return (jsxRuntime.jsxs(Box, __assign({ height: "100%", display: "flex" }, { children: [jsxRuntime.jsxs(Box, __assign({ p: 0, width: "200px", minWidth: "200px", maxWidth: "200px", overflow: "auto" }, { children: [jsxRuntime.jsxs(Button, __assign({ disabled: !(authService.loginInfo.role >= RoleType.Edit), onClick: onAddPostTypeClicked, color: "primary", variant: "contained", style: {
                                    borderRadius: "18px",
                                    margin: "8px", marginTop: "16px"
                                } }, { children: [jsxRuntime.jsx(Icon, { children: "add" }, void 0), "\u6295\u7A3F\u30BF\u30A4\u30D7\u3092\u8FFD\u52A0"] }), void 0),
                            jsxRuntime.jsx(List, __assign({ component: "nav", className: classes.postTypeBar, "aria-label": "contacts" }, { children: postManagementsService.postTypes.map(function (t, i) {
                                    var _a;
                                    return (jsxRuntime.jsxs(ListItem, __assign({ button: true, className: ((_a = postManagementsService.selected) === null || _a === void 0 ? void 0 : _a.taxonomy.name) === t.taxonomy.name ? classes.activeItem : "", onClick: function () { return onPostTypeListClicked(i); } }, { children: [jsxRuntime.jsx(ListItemText, { primary: t.taxonomy.displayName }, void 0),
                                            authService.loginInfo.role >= RoleType.Edit && (jsxRuntime.jsx(IconButton, __assign({ size: "small", onClick: function (e) { return onPostTypeMenu(e, t); } }, { children: jsxRuntime.jsx(MoreVert, {}, void 0) }), void 0))] }), t.taxonomy.name));
                                }) }), void 0),
                            jsxRuntime.jsxs(Menu, __assign({ id: "long-menu", anchorEl: anchorEl, keepMounted: true, open: !!anchorEl, onClose: handleCloseMenu, PaperProps: {
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: "20ch",
                                    },
                                } }, { children: [jsxRuntime.jsx(MenuItem, __assign({ onClick: function () { return onEditClicked(); } }, { children: "\u7DE8\u96C6" }), void 0),
                                    jsxRuntime.jsx(Divider, {}, void 0),
                                    jsxRuntime.jsx(MenuItem, __assign({ onClick: onRemovePostTypeClicked }, { children: "\u524A\u9664" }), void 0)] }), void 0)] }), void 0),
                    jsxRuntime.jsx(Divider, { orientation: "vertical" }, void 0),
                    jsxRuntime.jsxs(Box, __assign({ flex: "1 1 auto", position: "relative", overflow: "hidden", height: "100%" }, { children: [jsxRuntime.jsx(PostListPanel, {}, void 0),
                            jsxRuntime.jsx(Fab, __assign({ disabled: !services.postManagementsService.selected || !(authService.loginInfo.role >= RoleType.Post), style: {
                                    position: "absolute",
                                    zIndex: 9999,
                                    right: "24px",
                                    bottom: "24px"
                                }, onClick: function () { return handleNewPost(); }, color: "primary" }, { children: jsxRuntime.jsx(Add, {}, void 0) }), void 0)] }), void 0),
                    jsxRuntime.jsx(Divider, { orientation: "vertical" }, void 0),
                    jsxRuntime.jsx(Box, __assign({ minWidth: "220px", maxWidth: "220px", height: "100%", overflow: "auto" }, { children: services.postManagementsService.selected &&
                            jsxRuntime.jsx(PostTypeSettingPanel, { postType: services.postManagementsService.selected }, void 0) }), void 0)] }), void 0));
        }) }, void 0);
}
var useStyles$1 = makeStyles({
    postTypeBar: {
        width: "100%",
        flex: "1 1 auto",
    },
    container: {
        height: "100%"
    },
    activeItem: {
        background: theme.palette.primary.main + "!important",
    }
});

export default PostsPage;
