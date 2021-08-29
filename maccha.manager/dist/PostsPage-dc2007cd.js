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

import { C as useForkRef, D as useEventCallback, E as ownerDocument, G as elementAcceptingRef, p as propTypes, J as exactProp, _ as _objectWithoutProperties, K as useControlled, L as _slicedToArray, M as _toConsumableArray, a as _extends, b as createSvgIcon, w as withStyles, N as fade, u as useTheme, c as clsx, e as capitalize, Q as ButtonBase, k as jsxRuntime, T as Typography, m as __assign, f as useHistory, R as Box, I as IconButton, U as Divider, V as axios, W as List, X as schemeTypeDisplayNames, n as makeStyles, g as __read, Y as Icon, Z as Avatar, s as services, $ as theme, a0 as RoleType, a1 as useLocation, i as __awaiter, j as __generator, B as Button, a2 as useRouteMatch, a3 as ObserverComponent, a4 as ListItem, a5 as ListItemText, a6 as Menu, a7 as MenuItem } from './index.lib-1f5131ad.js';
import React, { useRef, useEffect, useCallback, createElement, Fragment, cloneElement, forwardRef, useMemo, useState, useLayoutEffect as useLayoutEffect$1, createContext, useContext, Children } from 'react';
import { F as FlexSpacer, I as ItemsWrapGrid } from './ColorPalette-c5cb26d4.js';
import { C as Checkbox, s as showDialogAsync } from './showDialog-6a8ab36a.js';
import { F as FileCopy, W as WrappedTextBlock } from './WrappedTextBlock-3185930c.js';
import { o as observer } from './mobxreact.esm-7c238465.js';
import { findDOMNode, unstable_batchedUpdates } from 'react-dom';
import { F as Fab } from './Fab-5b9eaec9.js';
import { p as postStatusTypeDisplay } from './PostStatusType-90c0804e.js';
import { C as Card } from './Card-5614d531.js';
import { c as confirmAsync } from './confirmAsync-f11e65b8.js';
import { T as TableContainer, a as Table, b as TableHead, c as TableRow, d as TableCell, e as TableBody } from './TableRow-1ca010a1.js';
import { A as Add } from './Add-7407fb1e.js';

function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}

function clickedRootScrollbar(event) {
  return document.documentElement.clientWidth < event.clientX || document.documentElement.clientHeight < event.clientY;
}
/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */


function ClickAwayListener(props) {
  var children = props.children,
      _props$disableReactTr = props.disableReactTree,
      disableReactTree = _props$disableReactTr === void 0 ? false : _props$disableReactTr,
      _props$mouseEvent = props.mouseEvent,
      mouseEvent = _props$mouseEvent === void 0 ? 'onClick' : _props$mouseEvent,
      onClickAway = props.onClickAway,
      _props$touchEvent = props.touchEvent,
      touchEvent = _props$touchEvent === void 0 ? 'onTouchEnd' : _props$touchEvent;
  var movedRef = useRef(false);
  var nodeRef = useRef(null);
  var activatedRef = useRef(false);
  var syntheticEventRef = useRef(false);
  useEffect(function () {
    // Ensure that this component is not "activated" synchronously.
    // https://github.com/facebook/react/issues/20074
    setTimeout(function () {
      activatedRef.current = true;
    }, 0);
    return function () {
      activatedRef.current = false;
    };
  }, []); // can be removed once we drop support for non ref forwarding class components

  var handleOwnRef = useCallback(function (instance) {
    // #StrictMode ready
    nodeRef.current = findDOMNode(instance);
  }, []);
  var handleRef = useForkRef(children.ref, handleOwnRef); // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviours like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.

  var handleClickAway = useEventCallback(function (event) {
    // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.
    var insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false; // 1. IE 11 support, which trigger the handleClickAway even after the unbind
    // 2. The child might render null.
    // 3. Behave like a blur listener.

    if (!activatedRef.current || !nodeRef.current || clickedRootScrollbar(event)) {
      return;
    } // Do not act if user performed touchmove


    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    var insideDOM; // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js

    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      // TODO v6 remove dead logic https://caniuse.com/#search=composedPath.
      var doc = ownerDocument(nodeRef.current);
      insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }

    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  }); // Keep track of mouse/touch events that bubbled up through the portal.

  var createHandleSynthetic = function createHandleSynthetic(handlerName) {
    return function (event) {
      syntheticEventRef.current = true;
      var childrenPropsHandler = children.props[handlerName];

      if (childrenPropsHandler) {
        childrenPropsHandler(event);
      }
    };
  };

  var childrenProps = {
    ref: handleRef
  };

  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }

  useEffect(function () {
    if (touchEvent !== false) {
      var mappedTouchEvent = mapEventPropToEvent(touchEvent);
      var doc = ownerDocument(nodeRef.current);

      var handleTouchMove = function handleTouchMove() {
        movedRef.current = true;
      };

      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);
      return function () {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [handleClickAway, touchEvent]);

  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }

  useEffect(function () {
    if (mouseEvent !== false) {
      var mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      var doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);
      return function () {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }

    return undefined;
  }, [handleClickAway, mouseEvent]);
  return /*#__PURE__*/createElement(Fragment, null, /*#__PURE__*/cloneElement(children, childrenProps));
}

process.env.NODE_ENV !== "production" ? ClickAwayListener.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The wrapped element.
   */
  children: elementAcceptingRef.isRequired,

  /**
   * If `true`, the React tree is ignored and only the DOM tree is considered.
   * This prop changes how portaled elements are handled.
   */
  disableReactTree: propTypes.bool,

  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: propTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp', false]),

  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: propTypes.func.isRequired,

  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: propTypes.oneOf(['onTouchEnd', 'onTouchStart', false])
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  ClickAwayListener['propTypes' + ''] = exactProp(ClickAwayListener.propTypes);
}

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

// refs, but then host hooks / components could not opt out of renders.
// This could've been exported to its own module, but the current build doesn't
// seem to work with module imports and I had no more time to spend on this...

function useResolvedElement(subscriber, refOrElement) {
  var _ref; // The default ref has to be non-conditionally declared here whether or not
  // it'll be used as that's how hooks work.
  // @see https://reactjs.org/docs/hooks-rules.html#explanation


  var ref = null; // Default ref

  var refElement = useRef(null);
  var callbackRefElement = useRef(null);
  var refCallback = useCallback(function (element) {
    callbackRefElement.current = element;
    callSubscriber();
  }, []);
  var lastReportedElementRef = useRef(null);
  var cleanupRef = useRef();

  var callSubscriber = function callSubscriber() {
    var element = null;

    if (callbackRefElement.current) {
      element = callbackRefElement.current;
    } else if (refElement.current) {
      element = refElement.current;
    } else if (refOrElement instanceof HTMLElement) {
      element = refOrElement;
    }

    if (lastReportedElementRef.current === element) {
      return;
    }

    if (cleanupRef.current) {
      cleanupRef.current(); // Making sure the cleanup is not called accidentally multiple times.

      cleanupRef.current = null;
    }

    lastReportedElementRef.current = element; // Only calling the subscriber, if there's an actual element to report.

    if (element) {
      cleanupRef.current = subscriber(element);
    }
  };

  if (refOrElement && !(refOrElement instanceof HTMLElement)) {
    // Overriding the default ref with the given one
    ref = refOrElement;
  } // On each render, we check whether a ref changed, or if we got a new raw
  // element.


  useEffect(function () {
    // Note that this does not mean that "element" will necessarily be whatever
    // the ref currently holds. It'll simply "update" `element` each render to
    // the current ref value, but there's no guarantee that the ref value will
    // not change later without a render.
    // This may or may not be a problem depending on the specific use case.
    if (ref) {
      refElement.current = ref.current;
    }

    callSubscriber();
  }, [ref, (_ref = ref) == null ? void 0 : _ref.current, refOrElement]);
  return refCallback;
}

function useResizeObserver(opts) {
  if (opts === void 0) {
    opts = {};
  } // Saving the callback as a ref. With this, I don't need to put onResize in the
  // effect dep array, and just passing in an anonymous function without memoising
  // will not reinstantiate the hook's ResizeObserver


  var onResize = opts.onResize;
  var onResizeRef = useRef(undefined);
  onResizeRef.current = onResize; // Using a single instance throughout the hook's lifetime

  var resizeObserverRef = useRef();

  var _useState = useState({
    width: undefined,
    height: undefined
  }),
      size = _useState[0],
      setSize = _useState[1]; // In certain edge cases the RO might want to report a size change just after
  // the component unmounted.


  var didUnmount = useRef(false);
  useEffect(function () {
    return function () {
      didUnmount.current = true;
    };
  }, []); // Using a ref to track the previous width / height to avoid unnecessary renders

  var previous = useRef({
    width: undefined,
    height: undefined
  }); // This block is kinda like a useEffect, only it's called whenever a new
  // element could be resolved based on the ref option. It also has a cleanup
  // function.

  var refCallback = useResolvedElement(function (element) {
    // Initialising the RO instance
    if (!resizeObserverRef.current) {
      // Saving a single instance, used by the hook from this point on.
      resizeObserverRef.current = new ResizeObserver(function (entries) {
        if (!Array.isArray(entries)) {
          return;
        } // Since we only observe the one element, we don't need to loop over the
        // array


        if (!entries.length) {
          return;
        }

        var entry = entries[0]; // `Math.round` is in line with how CSS resolves sub-pixel values

        var newWidth = Math.round(entry.contentRect.width);
        var newHeight = Math.round(entry.contentRect.height);

        if (previous.current.width !== newWidth || previous.current.height !== newHeight) {
          var newSize = {
            width: newWidth,
            height: newHeight
          };

          if (onResizeRef.current) {
            onResizeRef.current(newSize);
          } else {
            previous.current.width = newWidth;
            previous.current.height = newHeight;

            if (!didUnmount.current) {
              setSize(newSize);
            }
          }
        }
      });
    }

    resizeObserverRef.current.observe(element);
    return function () {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(element);
      }
    };
  }, opts.ref);
  return useMemo(function () {
    return {
      ref: refCallback,
      width: size.width,
      height: size.height
    };
  }, [refCallback, size ? size.width : null, size ? size.height : null]);
}

let updateQueue = makeQueue();

const raf = fn => schedule(fn, updateQueue);

let writeQueue = makeQueue();

raf.write = fn => schedule(fn, writeQueue);

let onStartQueue = makeQueue();

raf.onStart = fn => schedule(fn, onStartQueue);

let onFrameQueue = makeQueue();

raf.onFrame = fn => schedule(fn, onFrameQueue);

let onFinishQueue = makeQueue();

raf.onFinish = fn => schedule(fn, onFinishQueue);

let timeouts = [];

raf.setTimeout = (handler, ms) => {
  let time = raf.now() + ms;

  let cancel = () => {
    let i = timeouts.findIndex(t => t.cancel == cancel);
    if (~i) timeouts.splice(i, 1);
    __raf.count -= ~i ? 1 : 0;
  };

  let timeout = {
    time,
    handler,
    cancel
  };
  timeouts.splice(findTimeout(time), 0, timeout);
  __raf.count += 1;
  start();
  return timeout;
};

let findTimeout = time => ~(~timeouts.findIndex(t => t.time > time) || ~timeouts.length);

raf.cancel = fn => {
  updateQueue.delete(fn);
  writeQueue.delete(fn);
};

raf.sync = fn => {
  sync = true;
  raf.batchedUpdates(fn);
  sync = false;
};

raf.throttle = fn => {
  let lastArgs;

  function queuedFn() {
    try {
      fn(...lastArgs);
    } finally {
      lastArgs = null;
    }
  }

  function throttled(...args) {
    lastArgs = args;
    raf.onStart(queuedFn);
  }

  throttled.handler = fn;

  throttled.cancel = () => {
    onStartQueue.delete(queuedFn);
    lastArgs = null;
  };

  return throttled;
};

let nativeRaf = typeof window != "undefined" ? window.requestAnimationFrame : () => {};

raf.use = impl => nativeRaf = impl;

raf.now = typeof performance != "undefined" ? () => performance.now() : Date.now;

raf.batchedUpdates = fn => fn();

raf.catch = console.error;
let ts = -1;
let sync = false;

function schedule(fn, queue) {
  if (sync) {
    queue.delete(fn);
    fn(0);
  } else {
    queue.add(fn);
    start();
  }
}

function start() {
  if (ts < 0) {
    ts = 0;
    nativeRaf(loop);
  }
}

function loop() {
  if (~ts) {
    nativeRaf(loop);
    raf.batchedUpdates(update);
  }
}

function update() {
  let prevTs = ts;
  ts = raf.now();
  let count = findTimeout(ts);

  if (count) {
    eachSafely(timeouts.splice(0, count), t => t.handler());
    __raf.count -= count;
  }

  onStartQueue.flush();
  updateQueue.flush(prevTs ? Math.min(64, ts - prevTs) : 16.667);
  onFrameQueue.flush();
  writeQueue.flush();
  onFinishQueue.flush();
}

function makeQueue() {
  let next = new Set();
  let current = next;
  return {
    add(fn) {
      __raf.count += current == next && !next.has(fn) ? 1 : 0;
      next.add(fn);
    },

    delete(fn) {
      __raf.count -= current == next && next.has(fn) ? 1 : 0;
      return next.delete(fn);
    },

    flush(arg) {
      if (current.size) {
        next = new Set();
        __raf.count -= current.size;
        eachSafely(current, fn => fn(arg) && next.add(fn));
        __raf.count += next.size;
        current = next;
      }
    }

  };
}

function eachSafely(values, each) {
  values.forEach(value => {
    try {
      each(value);
    } catch (e) {
      raf.catch(e);
    }
  });
}

const __raf = {
  count: 0,

  clear() {
    ts = -1;
    timeouts = [];
    onStartQueue = makeQueue();
    updateQueue = makeQueue();
    onFrameQueue = makeQueue();
    writeQueue = makeQueue();
    onFinishQueue = makeQueue();
    __raf.count = 0;
  }

};

function noop() {}

const defineHidden = (obj, key, value) => Object.defineProperty(obj, key, {
  value,
  writable: true,
  configurable: true
});

const is = {
  arr: Array.isArray,
  obj: a => !!a && a.constructor.name === "Object",
  fun: a => typeof a === "function",
  str: a => typeof a === "string",
  num: a => typeof a === "number",
  und: a => a === void 0
};

function isEqual(a, b) {
  if (is.arr(a)) {
    if (!is.arr(b) || a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }

  return a === b;
}

const each = (obj, fn) => obj.forEach(fn);

function eachProp(obj, fn, ctx) {
  for (const key in obj) {
    fn.call(ctx, obj[key], key);
  }
}

const toArray = a => is.und(a) ? [] : is.arr(a) ? a : [a];

function flush(queue, iterator) {
  if (queue.size) {
    const items = Array.from(queue);
    queue.clear();
    each(items, iterator);
  }
}

const flushCalls = (queue, ...args) => flush(queue, fn => fn(...args));

let createStringInterpolator;
let to;
let colors = null;
let skipAnimation = false;
let willAdvance = noop;

const assign = globals => {
  if (globals.to) to = globals.to;
  if (globals.now) raf.now = globals.now;
  if (globals.colors !== void 0) colors = globals.colors;
  if (globals.skipAnimation != null) skipAnimation = globals.skipAnimation;
  if (globals.createStringInterpolator) createStringInterpolator = globals.createStringInterpolator;
  if (globals.requestAnimationFrame) raf.use(globals.requestAnimationFrame);
  if (globals.batchedUpdates) raf.batchedUpdates = globals.batchedUpdates;
  if (globals.willAdvance) willAdvance = globals.willAdvance;
};

var globals = /*#__PURE__*/Object.freeze({
  __proto__: null,

  get createStringInterpolator() {
    return createStringInterpolator;
  },

  get to() {
    return to;
  },

  get colors() {
    return colors;
  },

  get skipAnimation() {
    return skipAnimation;
  },

  get willAdvance() {
    return willAdvance;
  },

  assign: assign
});
const startQueue = new Set();
let currentFrame = [];
let prevFrame = [];
let priority = 0;
const frameLoop = {
  get idle() {
    return !startQueue.size && !currentFrame.length;
  },

  start(animation) {
    if (priority > animation.priority) {
      startQueue.add(animation);
      raf.onStart(flushStartQueue);
    } else {
      startSafely(animation);
      raf(advance);
    }
  },

  advance,

  sort(animation) {
    if (priority) {
      raf.onFrame(() => frameLoop.sort(animation));
    } else {
      const prevIndex = currentFrame.indexOf(animation);

      if (~prevIndex) {
        currentFrame.splice(prevIndex, 1);
        startUnsafely(animation);
      }
    }
  },

  clear() {
    currentFrame = [];
    startQueue.clear();
  }

};

function flushStartQueue() {
  startQueue.forEach(startSafely);
  startQueue.clear();
  raf(advance);
}

function startSafely(animation) {
  if (!currentFrame.includes(animation)) startUnsafely(animation);
}

function startUnsafely(animation) {
  currentFrame.splice(findIndex(currentFrame, other => other.priority > animation.priority), 0, animation);
}

function advance(dt) {
  const nextFrame = prevFrame;

  for (let i = 0; i < currentFrame.length; i++) {
    const animation = currentFrame[i];
    priority = animation.priority;

    if (!animation.idle) {
      willAdvance(animation);
      animation.advance(dt);

      if (!animation.idle) {
        nextFrame.push(animation);
      }
    }
  }

  priority = 0;
  prevFrame = currentFrame;
  prevFrame.length = 0;
  currentFrame = nextFrame;
  return currentFrame.length > 0;
}

function findIndex(arr, test) {
  const index = arr.findIndex(test);
  return index < 0 ? arr.length : index;
}

const colors$1 = {
  transparent: 0,
  aliceblue: 4042850303,
  antiquewhite: 4209760255,
  aqua: 16777215,
  aquamarine: 2147472639,
  azure: 4043309055,
  beige: 4126530815,
  bisque: 4293182719,
  black: 255,
  blanchedalmond: 4293643775,
  blue: 65535,
  blueviolet: 2318131967,
  brown: 2771004159,
  burlywood: 3736635391,
  burntsienna: 3934150143,
  cadetblue: 1604231423,
  chartreuse: 2147418367,
  chocolate: 3530104575,
  coral: 4286533887,
  cornflowerblue: 1687547391,
  cornsilk: 4294499583,
  crimson: 3692313855,
  cyan: 16777215,
  darkblue: 35839,
  darkcyan: 9145343,
  darkgoldenrod: 3095792639,
  darkgray: 2846468607,
  darkgreen: 6553855,
  darkgrey: 2846468607,
  darkkhaki: 3182914559,
  darkmagenta: 2332068863,
  darkolivegreen: 1433087999,
  darkorange: 4287365375,
  darkorchid: 2570243327,
  darkred: 2332033279,
  darksalmon: 3918953215,
  darkseagreen: 2411499519,
  darkslateblue: 1211993087,
  darkslategray: 793726975,
  darkslategrey: 793726975,
  darkturquoise: 13554175,
  darkviolet: 2483082239,
  deeppink: 4279538687,
  deepskyblue: 12582911,
  dimgray: 1768516095,
  dimgrey: 1768516095,
  dodgerblue: 512819199,
  firebrick: 2988581631,
  floralwhite: 4294635775,
  forestgreen: 579543807,
  fuchsia: 4278255615,
  gainsboro: 3705462015,
  ghostwhite: 4177068031,
  gold: 4292280575,
  goldenrod: 3668254975,
  gray: 2155905279,
  green: 8388863,
  greenyellow: 2919182335,
  grey: 2155905279,
  honeydew: 4043305215,
  hotpink: 4285117695,
  indianred: 3445382399,
  indigo: 1258324735,
  ivory: 4294963455,
  khaki: 4041641215,
  lavender: 3873897215,
  lavenderblush: 4293981695,
  lawngreen: 2096890111,
  lemonchiffon: 4294626815,
  lightblue: 2916673279,
  lightcoral: 4034953471,
  lightcyan: 3774873599,
  lightgoldenrodyellow: 4210742015,
  lightgray: 3553874943,
  lightgreen: 2431553791,
  lightgrey: 3553874943,
  lightpink: 4290167295,
  lightsalmon: 4288707327,
  lightseagreen: 548580095,
  lightskyblue: 2278488831,
  lightslategray: 2005441023,
  lightslategrey: 2005441023,
  lightsteelblue: 2965692159,
  lightyellow: 4294959359,
  lime: 16711935,
  limegreen: 852308735,
  linen: 4210091775,
  magenta: 4278255615,
  maroon: 2147483903,
  mediumaquamarine: 1724754687,
  mediumblue: 52735,
  mediumorchid: 3126187007,
  mediumpurple: 2473647103,
  mediumseagreen: 1018393087,
  mediumslateblue: 2070474495,
  mediumspringgreen: 16423679,
  mediumturquoise: 1221709055,
  mediumvioletred: 3340076543,
  midnightblue: 421097727,
  mintcream: 4127193855,
  mistyrose: 4293190143,
  moccasin: 4293178879,
  navajowhite: 4292783615,
  navy: 33023,
  oldlace: 4260751103,
  olive: 2155872511,
  olivedrab: 1804477439,
  orange: 4289003775,
  orangered: 4282712319,
  orchid: 3664828159,
  palegoldenrod: 4008225535,
  palegreen: 2566625535,
  paleturquoise: 2951671551,
  palevioletred: 3681588223,
  papayawhip: 4293907967,
  peachpuff: 4292524543,
  peru: 3448061951,
  pink: 4290825215,
  plum: 3718307327,
  powderblue: 2967529215,
  purple: 2147516671,
  rebeccapurple: 1714657791,
  red: 4278190335,
  rosybrown: 3163525119,
  royalblue: 1097458175,
  saddlebrown: 2336560127,
  salmon: 4202722047,
  sandybrown: 4104413439,
  seagreen: 780883967,
  seashell: 4294307583,
  sienna: 2689740287,
  silver: 3233857791,
  skyblue: 2278484991,
  slateblue: 1784335871,
  slategray: 1887473919,
  slategrey: 1887473919,
  snow: 4294638335,
  springgreen: 16744447,
  steelblue: 1182971135,
  tan: 3535047935,
  teal: 8421631,
  thistle: 3636451583,
  tomato: 4284696575,
  turquoise: 1088475391,
  violet: 4001558271,
  wheat: 4125012991,
  white: 4294967295,
  whitesmoke: 4126537215,
  yellow: 4294902015,
  yellowgreen: 2597139199
};
const NUMBER = "[-+]?\\d*\\.?\\d+";
const PERCENTAGE = NUMBER + "%";

function call(...parts) {
  return "\\(\\s*(" + parts.join(")\\s*,\\s*(") + ")\\s*\\)";
}

const rgb = new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER));
const rgba = new RegExp("rgba" + call(NUMBER, NUMBER, NUMBER, NUMBER));
const hsl = new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE));
const hsla = new RegExp("hsla" + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
const hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
const hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
const hex6 = /^#([0-9a-fA-F]{6})$/;
const hex8 = /^#([0-9a-fA-F]{8})$/;

function normalizeColor(color) {
  let match;

  if (typeof color === "number") {
    return color >>> 0 === color && color >= 0 && color <= 4294967295 ? color : null;
  }

  if (match = hex6.exec(color)) return parseInt(match[1] + "ff", 16) >>> 0;

  if (colors && colors[color] !== void 0) {
    return colors[color];
  }

  if (match = rgb.exec(color)) {
    return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | 255) >>> 0;
  }

  if (match = rgba.exec(color)) {
    return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | parse1(match[4])) >>> 0;
  }

  if (match = hex3.exec(color)) {
    return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + "ff", 16) >>> 0;
  }

  if (match = hex8.exec(color)) return parseInt(match[1], 16) >>> 0;

  if (match = hex4.exec(color)) {
    return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + match[4] + match[4], 16) >>> 0;
  }

  if (match = hsl.exec(color)) {
    return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 255) >>> 0;
  }

  if (match = hsla.exec(color)) {
    return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | parse1(match[4])) >>> 0;
  }

  return null;
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(h, s, l) {
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);
  return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
}

function parse255(str) {
  const int = parseInt(str, 10);
  if (int < 0) return 0;
  if (int > 255) return 255;
  return int;
}

function parse360(str) {
  const int = parseFloat(str);
  return (int % 360 + 360) % 360 / 360;
}

function parse1(str) {
  const num = parseFloat(str);
  if (num < 0) return 0;
  if (num > 1) return 255;
  return Math.round(num * 255);
}

function parsePercentage(str) {
  const int = parseFloat(str);
  if (int < 0) return 0;
  if (int > 100) return 1;
  return int / 100;
}

function colorToRgba(input) {
  let int32Color = normalizeColor(input);
  if (int32Color === null) return input;
  int32Color = int32Color || 0;
  let r = (int32Color & 4278190080) >>> 24;
  let g = (int32Color & 16711680) >>> 16;
  let b = (int32Color & 65280) >>> 8;
  let a = (int32Color & 255) / 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const createInterpolator = (range, output, extrapolate) => {
  if (is.fun(range)) {
    return range;
  }

  if (is.arr(range)) {
    return createInterpolator({
      range,
      output,
      extrapolate
    });
  }

  if (is.str(range.output[0])) {
    return createStringInterpolator(range);
  }

  const config = range;
  const outputRange = config.output;
  const inputRange = config.range || [0, 1];
  const extrapolateLeft = config.extrapolateLeft || config.extrapolate || "extend";
  const extrapolateRight = config.extrapolateRight || config.extrapolate || "extend";

  const easing = config.easing || (t => t);

  return input => {
    const range2 = findRange(input, inputRange);
    return interpolate(input, inputRange[range2], inputRange[range2 + 1], outputRange[range2], outputRange[range2 + 1], easing, extrapolateLeft, extrapolateRight, config.map);
  };
};

function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
  let result = map ? map(input) : input;

  if (result < inputMin) {
    if (extrapolateLeft === "identity") return result;else if (extrapolateLeft === "clamp") result = inputMin;
  }

  if (result > inputMax) {
    if (extrapolateRight === "identity") return result;else if (extrapolateRight === "clamp") result = inputMax;
  }

  if (outputMin === outputMax) return outputMin;
  if (inputMin === inputMax) return input <= inputMin ? outputMin : outputMax;
  if (inputMin === -Infinity) result = -result;else if (inputMax === Infinity) result = result - inputMin;else result = (result - inputMin) / (inputMax - inputMin);
  result = easing(result);
  if (outputMin === -Infinity) result = -result;else if (outputMax === Infinity) result = result + outputMin;else result = result * (outputMax - outputMin) + outputMin;
  return result;
}

function findRange(input, inputRange) {
  for (var i = 1; i < inputRange.length - 1; ++i) if (inputRange[i] >= input) break;

  return i - 1;
}

const $get = Symbol.for("FluidValue.get");
const $observers = Symbol.for("FluidValue.observers");

const hasFluidValue = arg => Boolean(arg && arg[$get]);

const getFluidValue = arg => arg && arg[$get] ? arg[$get]() : arg;

const getFluidObservers = target => target[$observers] || null;

function callFluidObserver(observer, event) {
  if (observer.eventObserved) {
    observer.eventObserved(event);
  } else {
    observer(event);
  }
}

function callFluidObservers(target, event) {
  let observers = target[$observers];

  if (observers) {
    observers.forEach(observer => {
      callFluidObserver(observer, event);
    });
  }
}

class FluidValue {
  constructor(get) {
    if (!get && !(get = this.get)) {
      throw Error("Unknown getter");
    }

    setFluidGetter(this, get);
  }

}

const setFluidGetter = (target, get) => setHidden(target, $get, get);

function addFluidObserver(target, observer) {
  if (target[$get]) {
    let observers = target[$observers];

    if (!observers) {
      setHidden(target, $observers, observers = new Set());
    }

    if (!observers.has(observer)) {
      observers.add(observer);

      if (target.observerAdded) {
        target.observerAdded(observers.size, observer);
      }
    }
  }

  return observer;
}

function removeFluidObserver(target, observer) {
  let observers = target[$observers];

  if (observers && observers.has(observer)) {
    const count = observers.size - 1;

    if (count) {
      observers.delete(observer);
    } else {
      target[$observers] = null;
    }

    if (target.observerRemoved) {
      target.observerRemoved(count, observer);
    }
  }
}

const setHidden = (target, key, value) => Object.defineProperty(target, key, {
  value,
  writable: true,
  configurable: true
});

const numberRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
const colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
let namedColorRegex;
const rgbaRegex = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi;

const rgbaRound = (_, p1, p2, p3, p4) => `rgba(${Math.round(p1)}, ${Math.round(p2)}, ${Math.round(p3)}, ${p4})`;

const createStringInterpolator$1 = config => {
  if (!namedColorRegex) namedColorRegex = colors ? new RegExp(`(${Object.keys(colors).join("|")})`, "g") : /^\b$/;
  const output = config.output.map(value => getFluidValue(value).replace(colorRegex, colorToRgba).replace(namedColorRegex, colorToRgba));
  const keyframes = output.map(value => value.match(numberRegex).map(Number));
  const outputRanges = keyframes[0].map((_, i) => keyframes.map(values => {
    if (!(i in values)) {
      throw Error('The arity of each "output" value must be equal');
    }

    return values[i];
  }));
  const interpolators = outputRanges.map(output2 => createInterpolator({ ...config,
    output: output2
  }));
  return input => {
    let i = 0;
    return output[0].replace(numberRegex, () => String(interpolators[i++](input))).replace(rgbaRegex, rgbaRound);
  };
};

const prefix = "react-spring: ";

const once = fn => {
  const func = fn;
  let called = false;

  if (typeof func != "function") {
    throw new TypeError(`${prefix}once requires a function parameter`);
  }

  return (...args) => {
    if (!called) {
      func(...args);
      called = true;
    }
  };
};

const warnInterpolate = once(console.warn);

function deprecateInterpolate() {
  warnInterpolate(`${prefix}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}

const warnDirectCall = once(console.warn);

function deprecateDirectCall() {
  warnDirectCall(`${prefix}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead)`);
}

function isAnimatedString(value) {
  return is.str(value) && (value[0] == "#" || /\d/.test(value) || value in (colors || {}));
}

const useOnce = effect => useEffect(effect, emptyDeps);

const emptyDeps = [];

function useForceUpdate() {
  const update = useState()[1];
  const mounted = useState(makeMountedRef)[0];
  useOnce(mounted.unmount);
  return () => {
    if (mounted.current) {
      update({});
    }
  };
}

function makeMountedRef() {
  const mounted = {
    current: true,
    unmount: () => () => {
      mounted.current = false;
    }
  };
  return mounted;
}

function useMemoOne(getResult, inputs) {
  const [initial] = useState(() => ({
    inputs,
    result: getResult()
  }));
  const committed = useRef();
  const prevCache = committed.current;
  let cache = prevCache;

  if (cache) {
    const useCache = Boolean(inputs && cache.inputs && areInputsEqual(inputs, cache.inputs));

    if (!useCache) {
      cache = {
        inputs,
        result: getResult()
      };
    }
  } else {
    cache = initial;
  }

  useEffect(() => {
    committed.current = cache;

    if (prevCache == initial) {
      initial.inputs = initial.result = void 0;
    }
  }, [cache]);
  return cache.result;
}

function areInputsEqual(next, prev) {
  if (next.length !== prev.length) {
    return false;
  }

  for (let i = 0; i < next.length; i++) {
    if (next[i] !== prev[i]) {
      return false;
    }
  }

  return true;
}

function usePrev(value) {
  const prevRef = useRef();
  useEffect(() => {
    prevRef.current = value;
  });
  return prevRef.current;
}

const useLayoutEffect = typeof window !== "undefined" && window.document && window.document.createElement ? useLayoutEffect$1 : useEffect;

const $node = Symbol.for("Animated:node");

const isAnimated = value => !!value && value[$node] === value;

const getAnimated = owner => owner && owner[$node];

const setAnimated = (owner, node) => defineHidden(owner, $node, node);

const getPayload = owner => owner && owner[$node] && owner[$node].getPayload();

class Animated {
  constructor() {
    setAnimated(this, this);
  }

  getPayload() {
    return this.payload || [];
  }

}

class AnimatedValue extends Animated {
  constructor(_value) {
    super();
    this._value = _value;
    this.done = true;
    this.durationProgress = 0;

    if (is.num(this._value)) {
      this.lastPosition = this._value;
    }
  }

  static create(value) {
    return new AnimatedValue(value);
  }

  getPayload() {
    return [this];
  }

  getValue() {
    return this._value;
  }

  setValue(value, step) {
    if (is.num(value)) {
      this.lastPosition = value;

      if (step) {
        value = Math.round(value / step) * step;

        if (this.done) {
          this.lastPosition = value;
        }
      }
    }

    if (this._value === value) {
      return false;
    }

    this._value = value;
    return true;
  }

  reset() {
    const {
      done
    } = this;
    this.done = false;

    if (is.num(this._value)) {
      this.elapsedTime = 0;
      this.durationProgress = 0;
      this.lastPosition = this._value;
      if (done) this.lastVelocity = null;
      this.v0 = null;
    }
  }

}

class AnimatedString extends AnimatedValue {
  constructor(value) {
    super(0);
    this._string = null;
    this._toString = createInterpolator({
      output: [value, value]
    });
  }

  static create(value) {
    return new AnimatedString(value);
  }

  getValue() {
    let value = this._string;
    return value == null ? this._string = this._toString(this._value) : value;
  }

  setValue(value) {
    if (is.str(value)) {
      if (value == this._string) {
        return false;
      }

      this._string = value;
      this._value = 1;
    } else if (super.setValue(value)) {
      this._string = null;
    } else {
      return false;
    }

    return true;
  }

  reset(goal) {
    if (goal) {
      this._toString = createInterpolator({
        output: [this.getValue(), goal]
      });
    }

    this._value = 0;
    super.reset();
  }

}

const TreeContext = {
  dependencies: null
};

class AnimatedObject extends Animated {
  constructor(source) {
    super();
    this.source = source;
    this.setValue(source);
  }

  getValue(animated) {
    const values = {};
    eachProp(this.source, (source, key) => {
      if (isAnimated(source)) {
        values[key] = source.getValue(animated);
      } else if (hasFluidValue(source)) {
        values[key] = getFluidValue(source);
      } else if (!animated) {
        values[key] = source;
      }
    });
    return values;
  }

  setValue(source) {
    this.source = source;
    this.payload = this._makePayload(source);
  }

  reset() {
    if (this.payload) {
      each(this.payload, node => node.reset());
    }
  }

  _makePayload(source) {
    if (source) {
      const payload = new Set();
      eachProp(source, this._addToPayload, payload);
      return Array.from(payload);
    }
  }

  _addToPayload(source) {
    if (TreeContext.dependencies && hasFluidValue(source)) {
      TreeContext.dependencies.add(source);
    }

    const payload = getPayload(source);

    if (payload) {
      each(payload, node => this.add(node));
    }
  }

}

class AnimatedArray extends AnimatedObject {
  constructor(source) {
    super(source);
  }

  static create(source) {
    return new AnimatedArray(source);
  }

  getValue() {
    return this.source.map(node => node.getValue());
  }

  setValue(source) {
    const payload = this.getPayload();

    if (source.length == payload.length) {
      return payload.some((node, i) => node.setValue(source[i]));
    }

    super.setValue(source.map(makeAnimated));
    return true;
  }

}

function makeAnimated(value) {
  const nodeType = isAnimatedString(value) ? AnimatedString : AnimatedValue;
  return nodeType.create(value);
}

function getAnimatedType(value) {
  const parentNode = getAnimated(value);
  return parentNode ? parentNode.constructor : is.arr(value) ? AnimatedArray : isAnimatedString(value) ? AnimatedString : AnimatedValue;
}

const withAnimated = (Component, host) => {
  const hasInstance = !is.fun(Component) || Component.prototype && Component.prototype.isReactComponent;
  return forwardRef((givenProps, givenRef) => {
    const instanceRef = useRef(null);
    const ref = hasInstance && useCallback(value => {
      instanceRef.current = updateRef(givenRef, value);
    }, [givenRef]);
    const [props, deps] = getAnimatedState(givenProps, host);
    const forceUpdate = useForceUpdate();

    const callback = () => {
      const instance = instanceRef.current;

      if (hasInstance && !instance) {
        return;
      }

      const didUpdate = instance ? host.applyAnimatedValues(instance, props.getValue(true)) : false;

      if (didUpdate === false) {
        forceUpdate();
      }
    };

    const observer = new PropsObserver(callback, deps);
    const observerRef = useRef();
    useLayoutEffect(() => {
      const lastObserver = observerRef.current;
      observerRef.current = observer;
      each(deps, dep => addFluidObserver(dep, observer));

      if (lastObserver) {
        each(lastObserver.deps, dep => removeFluidObserver(dep, lastObserver));
        raf.cancel(lastObserver.update);
      }
    });
    useEffect(callback, []);
    useOnce(() => () => {
      const observer2 = observerRef.current;
      each(observer2.deps, dep => removeFluidObserver(dep, observer2));
    });
    const usedProps = host.getComponentProps(props.getValue());
    return /* @__PURE__ */createElement(Component, { ...usedProps,
      ref
    });
  });
};

class PropsObserver {
  constructor(update, deps) {
    this.update = update;
    this.deps = deps;
  }

  eventObserved(event) {
    if (event.type == "change") {
      raf.write(this.update);
    }
  }

}

function getAnimatedState(props, host) {
  const dependencies = new Set();
  TreeContext.dependencies = dependencies;
  if (props.style) props = { ...props,
    style: host.createAnimatedStyle(props.style)
  };
  props = new AnimatedObject(props);
  TreeContext.dependencies = null;
  return [props, dependencies];
}

function updateRef(ref, value) {
  if (ref) {
    if (is.fun(ref)) ref(value);else ref.current = value;
  }

  return value;
}

const cacheKey = Symbol.for("AnimatedComponent");

const createHost = (components, {
  applyAnimatedValues = () => false,
  createAnimatedStyle = style => new AnimatedObject(style),
  getComponentProps = props => props
} = {}) => {
  const hostConfig = {
    applyAnimatedValues,
    createAnimatedStyle,
    getComponentProps
  };

  const animated = Component => {
    const displayName = getDisplayName(Component) || "Anonymous";

    if (is.str(Component)) {
      Component = animated[Component] || (animated[Component] = withAnimated(Component, hostConfig));
    } else {
      Component = Component[cacheKey] || (Component[cacheKey] = withAnimated(Component, hostConfig));
    }

    Component.displayName = `Animated(${displayName})`;
    return Component;
  };

  eachProp(components, (Component, key) => {
    if (is.arr(components)) {
      key = getDisplayName(Component);
    }

    animated[key] = animated(Component);
  });
  return {
    animated
  };
};

const getDisplayName = arg => is.str(arg) ? arg : arg && is.str(arg.displayName) ? arg.displayName : is.fun(arg) && arg.name || null;

function callProp(value, ...args) {
  return is.fun(value) ? value(...args) : value;
}

const matchProp = (value, key) => value === true || !!(key && value && (is.fun(value) ? value(key) : toArray(value).includes(key)));

const resolveProp = (prop, key) => is.obj(prop) ? key && prop[key] : prop;

const getDefaultProp = (props, key) => props.default === true ? props[key] : props.default ? props.default[key] : void 0;

const noopTransform = value => value;

const getDefaultProps = (props, transform = noopTransform) => {
  let keys = DEFAULT_PROPS;

  if (props.default && props.default !== true) {
    props = props.default;
    keys = Object.keys(props);
  }

  const defaults = {};

  for (const key of keys) {
    const value = transform(props[key], key);

    if (!is.und(value)) {
      defaults[key] = value;
    }
  }

  return defaults;
};

const DEFAULT_PROPS = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"];
const RESERVED_PROPS = {
  config: 1,
  from: 1,
  to: 1,
  ref: 1,
  loop: 1,
  reset: 1,
  pause: 1,
  cancel: 1,
  reverse: 1,
  immediate: 1,
  default: 1,
  delay: 1,
  onProps: 1,
  onStart: 1,
  onChange: 1,
  onPause: 1,
  onResume: 1,
  onRest: 1,
  onResolve: 1,
  items: 1,
  trail: 1,
  sort: 1,
  expires: 1,
  initial: 1,
  enter: 1,
  update: 1,
  leave: 1,
  children: 1,
  onDestroyed: 1,
  keys: 1,
  callId: 1,
  parentId: 1
};

function getForwardProps(props) {
  const forward = {};
  let count = 0;
  eachProp(props, (value, prop) => {
    if (!RESERVED_PROPS[prop]) {
      forward[prop] = value;
      count++;
    }
  });

  if (count) {
    return forward;
  }
}

function inferTo(props) {
  const to = getForwardProps(props);

  if (to) {
    const out = {
      to
    };
    eachProp(props, (val, key) => key in to || (out[key] = val));
    return out;
  }

  return { ...props
  };
}

function computeGoal(value) {
  value = getFluidValue(value);
  return is.arr(value) ? value.map(computeGoal) : isAnimatedString(value) ? globals.createStringInterpolator({
    range: [0, 1],
    output: [value, value]
  })(1) : value;
}

function hasProps(props) {
  for (const _ in props) return true;

  return false;
}

function isAsyncTo(to) {
  return is.fun(to) || is.arr(to) && is.obj(to[0]);
}

function detachRefs(ctrl, ref) {
  var _a;

  (_a = ctrl.ref) == null ? void 0 : _a.delete(ctrl);
  ref == null ? void 0 : ref.delete(ctrl);
}

function replaceRef(ctrl, ref) {
  var _a;

  if (ref && ctrl.ref !== ref) {
    (_a = ctrl.ref) == null ? void 0 : _a.delete(ctrl);
    ref.add(ctrl);
    ctrl.ref = ref;
  }
}

const config = {
  default: {
    tension: 170,
    friction: 26
  },
  gentle: {
    tension: 120,
    friction: 14
  },
  wobbly: {
    tension: 180,
    friction: 12
  },
  stiff: {
    tension: 210,
    friction: 20
  },
  slow: {
    tension: 280,
    friction: 60
  },
  molasses: {
    tension: 280,
    friction: 120
  }
};

const linear = t => t;

const defaults = { ...config.default,
  mass: 1,
  damping: 1,
  easing: linear,
  clamp: false
};

class AnimationConfig {
  constructor() {
    this.velocity = 0;
    Object.assign(this, defaults);
  }

}

function mergeConfig(config, newConfig, defaultConfig) {
  if (defaultConfig) {
    defaultConfig = { ...defaultConfig
    };
    sanitizeConfig(defaultConfig, newConfig);
    newConfig = { ...defaultConfig,
      ...newConfig
    };
  }

  sanitizeConfig(config, newConfig);
  Object.assign(config, newConfig);

  for (const key in defaults) {
    if (config[key] == null) {
      config[key] = defaults[key];
    }
  }

  let {
    mass,
    frequency,
    damping
  } = config;

  if (!is.und(frequency)) {
    if (frequency < 0.01) frequency = 0.01;
    if (damping < 0) damping = 0;
    config.tension = Math.pow(2 * Math.PI / frequency, 2) * mass;
    config.friction = 4 * Math.PI * damping * mass / frequency;
  }

  return config;
}

function sanitizeConfig(config, props) {
  if (!is.und(props.decay)) {
    config.duration = void 0;
  } else {
    const isTensionConfig = !is.und(props.tension) || !is.und(props.friction);

    if (isTensionConfig || !is.und(props.frequency) || !is.und(props.damping) || !is.und(props.mass)) {
      config.duration = void 0;
      config.decay = void 0;
    }

    if (isTensionConfig) {
      config.frequency = void 0;
    }
  }
}

const emptyArray = [];

class Animation {
  constructor() {
    this.changed = false;
    this.values = emptyArray;
    this.toValues = null;
    this.fromValues = emptyArray;
    this.config = new AnimationConfig();
    this.immediate = false;
  }

}

function scheduleProps(callId, {
  key,
  props,
  defaultProps,
  state,
  actions
}) {
  return new Promise((resolve, reject) => {
    var _a;

    let delay;
    let timeout;
    let cancel = matchProp((_a = props.cancel) != null ? _a : defaultProps == null ? void 0 : defaultProps.cancel, key);

    if (cancel) {
      onStart();
    } else {
      if (!is.und(props.pause)) {
        state.paused = matchProp(props.pause, key);
      }

      let pause = defaultProps == null ? void 0 : defaultProps.pause;

      if (pause !== true) {
        pause = state.paused || matchProp(pause, key);
      }

      delay = callProp(props.delay || 0, key);

      if (pause) {
        state.resumeQueue.add(onResume);
        actions.pause();
      } else {
        actions.resume();
        onResume();
      }
    }

    function onPause() {
      state.resumeQueue.add(onResume);
      state.timeouts.delete(timeout);
      timeout.cancel();
      delay = timeout.time - raf.now();
    }

    function onResume() {
      if (delay > 0) {
        timeout = raf.setTimeout(onStart, delay);
        state.pauseQueue.add(onPause);
        state.timeouts.add(timeout);
      } else {
        onStart();
      }
    }

    function onStart() {
      state.pauseQueue.delete(onPause);
      state.timeouts.delete(timeout);

      if (callId <= (state.cancelId || 0)) {
        cancel = true;
      }

      try {
        actions.start({ ...props,
          callId,
          cancel
        }, resolve);
      } catch (err) {
        reject(err);
      }
    }
  });
}

const getCombinedResult = (target, results) => results.length == 1 ? results[0] : results.some(result => result.cancelled) ? getCancelledResult(target.get()) : results.every(result => result.noop) ? getNoopResult(target.get()) : getFinishedResult(target.get(), results.every(result => result.finished));

const getNoopResult = value => ({
  value,
  noop: true,
  finished: true,
  cancelled: false
});

const getFinishedResult = (value, finished, cancelled = false) => ({
  value,
  finished,
  cancelled
});

const getCancelledResult = value => ({
  value,
  cancelled: true,
  finished: false
});

function runAsync(to, props, state, target) {
  const {
    callId,
    parentId,
    onRest
  } = props;
  const {
    asyncTo: prevTo,
    promise: prevPromise
  } = state;

  if (!parentId && to === prevTo && !props.reset) {
    return prevPromise;
  }

  return state.promise = (async () => {
    state.asyncId = callId;
    state.asyncTo = to;
    const defaultProps = getDefaultProps(props, (value, key) => key === "onRest" ? void 0 : value);
    let preventBail;
    let bail;
    const bailPromise = new Promise((resolve, reject) => (preventBail = resolve, bail = reject));

    const bailIfEnded = bailSignal => {
      const bailResult = callId <= (state.cancelId || 0) && getCancelledResult(target) || callId !== state.asyncId && getFinishedResult(target, false);

      if (bailResult) {
        bailSignal.result = bailResult;
        bail(bailSignal);
        throw bailSignal;
      }
    };

    const animate = (arg1, arg2) => {
      const bailSignal = new BailSignal();
      const skipAnimationSignal = new SkipAniamtionSignal();
      return (async () => {
        if (globals.skipAnimation) {
          stopAsync(state);
          skipAnimationSignal.result = getFinishedResult(target, false);
          bail(skipAnimationSignal);
          throw skipAnimationSignal;
        }

        bailIfEnded(bailSignal);
        const props2 = is.obj(arg1) ? { ...arg1
        } : { ...arg2,
          to: arg1
        };
        props2.parentId = callId;
        eachProp(defaultProps, (value, key) => {
          if (is.und(props2[key])) {
            props2[key] = value;
          }
        });
        const result2 = await target.start(props2);
        bailIfEnded(bailSignal);

        if (state.paused) {
          await new Promise(resume => {
            state.resumeQueue.add(resume);
          });
        }

        return result2;
      })();
    };

    let result;

    if (globals.skipAnimation) {
      stopAsync(state);
      return getFinishedResult(target, false);
    }

    try {
      let animating;

      if (is.arr(to)) {
        animating = (async queue => {
          for (const props2 of queue) {
            await animate(props2);
          }
        })(to);
      } else {
        animating = Promise.resolve(to(animate, target.stop.bind(target)));
      }

      await Promise.all([animating.then(preventBail), bailPromise]);
      result = getFinishedResult(target.get(), true, false);
    } catch (err) {
      if (err instanceof BailSignal) {
        result = err.result;
      } else if (err instanceof SkipAniamtionSignal) {
        result = err.result;
      } else {
        throw err;
      }
    } finally {
      if (callId == state.asyncId) {
        state.asyncId = parentId;
        state.asyncTo = parentId ? prevTo : void 0;
        state.promise = parentId ? prevPromise : void 0;
      }
    }

    if (is.fun(onRest)) {
      raf.batchedUpdates(() => {
        onRest(result, target, target.item);
      });
    }

    return result;
  })();
}

function stopAsync(state, cancelId) {
  flush(state.timeouts, t => t.cancel());
  state.pauseQueue.clear();
  state.resumeQueue.clear();
  state.asyncId = state.asyncTo = state.promise = void 0;
  if (cancelId) state.cancelId = cancelId;
}

class BailSignal extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise.");
  }

}

class SkipAniamtionSignal extends Error {
  constructor() {
    super("SkipAnimationSignal");
  }

}

const isFrameValue = value => value instanceof FrameValue;

let nextId = 1;

class FrameValue extends FluidValue {
  constructor() {
    super(...arguments);
    this.id = nextId++;
    this._priority = 0;
  }

  get priority() {
    return this._priority;
  }

  set priority(priority) {
    if (this._priority != priority) {
      this._priority = priority;

      this._onPriorityChange(priority);
    }
  }

  get() {
    const node = getAnimated(this);
    return node && node.getValue();
  }

  to(...args) {
    return globals.to(this, args);
  }

  interpolate(...args) {
    deprecateInterpolate();
    return globals.to(this, args);
  }

  toJSON() {
    return this.get();
  }

  observerAdded(count) {
    if (count == 1) this._attach();
  }

  observerRemoved(count) {
    if (count == 0) this._detach();
  }

  _attach() {}

  _detach() {}

  _onChange(value, idle = false) {
    callFluidObservers(this, {
      type: "change",
      parent: this,
      value,
      idle
    });
  }

  _onPriorityChange(priority) {
    if (!this.idle) {
      frameLoop.sort(this);
    }

    callFluidObservers(this, {
      type: "priority",
      parent: this,
      priority
    });
  }

}

const $P = Symbol.for("SpringPhase");
const HAS_ANIMATED = 1;
const IS_ANIMATING = 2;
const IS_PAUSED = 4;

const hasAnimated = target => (target[$P] & HAS_ANIMATED) > 0;

const isAnimating = target => (target[$P] & IS_ANIMATING) > 0;

const isPaused = target => (target[$P] & IS_PAUSED) > 0;

const setActiveBit = (target, active) => active ? target[$P] |= IS_ANIMATING | HAS_ANIMATED : target[$P] &= ~IS_ANIMATING;

const setPausedBit = (target, paused) => paused ? target[$P] |= IS_PAUSED : target[$P] &= ~IS_PAUSED;

class SpringValue extends FrameValue {
  constructor(arg1, arg2) {
    super();
    this.animation = new Animation();
    this.defaultProps = {};
    this._state = {
      paused: false,
      pauseQueue: new Set(),
      resumeQueue: new Set(),
      timeouts: new Set()
    };
    this._pendingCalls = new Set();
    this._lastCallId = 0;
    this._lastToId = 0;
    this._memoizedDuration = 0;

    if (!is.und(arg1) || !is.und(arg2)) {
      const props = is.obj(arg1) ? { ...arg1
      } : { ...arg2,
        from: arg1
      };

      if (is.und(props.default)) {
        props.default = true;
      }

      this.start(props);
    }
  }

  get idle() {
    return !(isAnimating(this) || this._state.asyncTo) || isPaused(this);
  }

  get goal() {
    return getFluidValue(this.animation.to);
  }

  get velocity() {
    const node = getAnimated(this);
    return node instanceof AnimatedValue ? node.lastVelocity || 0 : node.getPayload().map(node2 => node2.lastVelocity || 0);
  }

  get hasAnimated() {
    return hasAnimated(this);
  }

  get isAnimating() {
    return isAnimating(this);
  }

  get isPaused() {
    return isPaused(this);
  }

  advance(dt) {
    let idle = true;
    let changed = false;
    const anim = this.animation;
    let {
      config,
      toValues
    } = anim;
    const payload = getPayload(anim.to);

    if (!payload && hasFluidValue(anim.to)) {
      toValues = toArray(getFluidValue(anim.to));
    }

    anim.values.forEach((node2, i) => {
      if (node2.done) return;
      const to = node2.constructor == AnimatedString ? 1 : payload ? payload[i].lastPosition : toValues[i];
      let finished = anim.immediate;
      let position = to;

      if (!finished) {
        position = node2.lastPosition;

        if (config.tension <= 0) {
          node2.done = true;
          return;
        }

        let elapsed = node2.elapsedTime += dt;
        const from = anim.fromValues[i];
        const v0 = node2.v0 != null ? node2.v0 : node2.v0 = is.arr(config.velocity) ? config.velocity[i] : config.velocity;
        let velocity;

        if (!is.und(config.duration)) {
          let p = 1;

          if (config.duration > 0) {
            if (this._memoizedDuration !== config.duration) {
              this._memoizedDuration = config.duration;

              if (node2.durationProgress > 0) {
                node2.elapsedTime = config.duration * node2.durationProgress;
                elapsed = node2.elapsedTime += dt;
              }
            }

            p = (config.progress || 0) + elapsed / this._memoizedDuration;
            p = p > 1 ? 1 : p < 0 ? 0 : p;
            node2.durationProgress = p;
          }

          position = from + config.easing(p) * (to - from);
          velocity = (position - node2.lastPosition) / dt;
          finished = p == 1;
        } else if (config.decay) {
          const decay = config.decay === true ? 0.998 : config.decay;
          const e = Math.exp(-(1 - decay) * elapsed);
          position = from + v0 / (1 - decay) * (1 - e);
          finished = Math.abs(node2.lastPosition - position) < 0.1;
          velocity = v0 * e;
        } else {
          velocity = node2.lastVelocity == null ? v0 : node2.lastVelocity;
          const precision = config.precision || (from == to ? 5e-3 : Math.min(1, Math.abs(to - from) * 1e-3));
          const restVelocity = config.restVelocity || precision / 10;
          const bounceFactor = config.clamp ? 0 : config.bounce;
          const canBounce = !is.und(bounceFactor);
          const isGrowing = from == to ? node2.v0 > 0 : from < to;
          let isMoving;
          let isBouncing = false;
          const step = 1;
          const numSteps = Math.ceil(dt / step);

          for (let n = 0; n < numSteps; ++n) {
            isMoving = Math.abs(velocity) > restVelocity;

            if (!isMoving) {
              finished = Math.abs(to - position) <= precision;

              if (finished) {
                break;
              }
            }

            if (canBounce) {
              isBouncing = position == to || position > to == isGrowing;

              if (isBouncing) {
                velocity = -velocity * bounceFactor;
                position = to;
              }
            }

            const springForce = -config.tension * 1e-6 * (position - to);
            const dampingForce = -config.friction * 1e-3 * velocity;
            const acceleration = (springForce + dampingForce) / config.mass;
            velocity = velocity + acceleration * step;
            position = position + velocity * step;
          }
        }

        node2.lastVelocity = velocity;

        if (Number.isNaN(position)) {
          console.warn(`Got NaN while animating:`, this);
          finished = true;
        }
      }

      if (payload && !payload[i].done) {
        finished = false;
      }

      if (finished) {
        node2.done = true;
      } else {
        idle = false;
      }

      if (node2.setValue(position, config.round)) {
        changed = true;
      }
    });
    const node = getAnimated(this);

    if (idle) {
      const value = getFluidValue(anim.to);

      if (node.setValue(value) || changed) {
        this._onChange(value);
      }

      this._stop();
    } else if (changed) {
      this._onChange(node.getValue());
    }
  }

  set(value) {
    raf.batchedUpdates(() => {
      this._stop();

      this._focus(value);

      this._set(value);
    });
    return this;
  }

  pause() {
    this._update({
      pause: true
    });
  }

  resume() {
    this._update({
      pause: false
    });
  }

  finish() {
    if (isAnimating(this)) {
      const {
        to,
        config
      } = this.animation;
      raf.batchedUpdates(() => {
        this._onStart();

        if (!config.decay) {
          this._set(to, false);
        }

        this._stop();
      });
    }

    return this;
  }

  update(props) {
    const queue = this.queue || (this.queue = []);
    queue.push(props);
    return this;
  }

  start(to, arg2) {
    let queue;

    if (!is.und(to)) {
      queue = [is.obj(to) ? to : { ...arg2,
        to
      }];
    } else {
      queue = this.queue || [];
      this.queue = [];
    }

    return Promise.all(queue.map(props => this._update(props))).then(results => getCombinedResult(this, results));
  }

  stop(cancel) {
    const {
      to
    } = this.animation;

    this._focus(this.get());

    stopAsync(this._state, cancel && this._lastCallId);
    raf.batchedUpdates(() => this._stop(to, cancel));
    return this;
  }

  reset() {
    this._update({
      reset: true
    });
  }

  eventObserved(event) {
    if (event.type == "change") {
      this._start();
    } else if (event.type == "priority") {
      this.priority = event.priority + 1;
    }
  }

  _prepareNode(props) {
    const key = this.key || "";
    let {
      to,
      from
    } = props;
    to = is.obj(to) ? to[key] : to;

    if (to == null || isAsyncTo(to)) {
      to = void 0;
    }

    from = is.obj(from) ? from[key] : from;

    if (from == null) {
      from = void 0;
    }

    const range = {
      to,
      from
    };

    if (!hasAnimated(this)) {
      if (props.reverse) [to, from] = [from, to];
      from = getFluidValue(from);

      if (!is.und(from)) {
        this._set(from);
      } else if (!getAnimated(this)) {
        this._set(to);
      }
    }

    return range;
  }

  _update({ ...props
  }, isLoop) {
    const {
      key,
      defaultProps
    } = this;
    if (props.default) Object.assign(defaultProps, getDefaultProps(props, (value, prop) => /^on/.test(prop) ? resolveProp(value, key) : value));
    mergeActiveFn(this, props, "onProps");
    sendEvent(this, "onProps", props, this);

    const range = this._prepareNode(props);

    if (Object.isFrozen(this)) {
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    }

    const state = this._state;
    return scheduleProps(++this._lastCallId, {
      key,
      props,
      defaultProps,
      state,
      actions: {
        pause: () => {
          if (!isPaused(this)) {
            setPausedBit(this, true);
            flushCalls(state.pauseQueue);
            sendEvent(this, "onPause", getFinishedResult(this, checkFinished(this, this.animation.to)), this);
          }
        },
        resume: () => {
          if (isPaused(this)) {
            setPausedBit(this, false);

            if (isAnimating(this)) {
              this._resume();
            }

            flushCalls(state.resumeQueue);
            sendEvent(this, "onResume", getFinishedResult(this, checkFinished(this, this.animation.to)), this);
          }
        },
        start: this._merge.bind(this, range)
      }
    }).then(result => {
      if (props.loop && result.finished && !(isLoop && result.noop)) {
        const nextProps = createLoopUpdate(props);

        if (nextProps) {
          return this._update(nextProps, true);
        }
      }

      return result;
    });
  }

  _merge(range, props, resolve) {
    if (props.cancel) {
      this.stop(true);
      return resolve(getCancelledResult(this));
    }

    const hasToProp = !is.und(range.to);
    const hasFromProp = !is.und(range.from);

    if (hasToProp || hasFromProp) {
      if (props.callId > this._lastToId) {
        this._lastToId = props.callId;
      } else {
        return resolve(getCancelledResult(this));
      }
    }

    const {
      key,
      defaultProps,
      animation: anim
    } = this;
    const {
      to: prevTo,
      from: prevFrom
    } = anim;
    let {
      to = prevTo,
      from = prevFrom
    } = range;

    if (hasFromProp && !hasToProp && (!props.default || is.und(to))) {
      to = from;
    }

    if (props.reverse) [to, from] = [from, to];
    const hasFromChanged = !isEqual(from, prevFrom);

    if (hasFromChanged) {
      anim.from = from;
    }

    from = getFluidValue(from);
    const hasToChanged = !isEqual(to, prevTo);

    if (hasToChanged) {
      this._focus(to);
    }

    const hasAsyncTo = isAsyncTo(props.to);
    const {
      config
    } = anim;
    const {
      decay,
      velocity
    } = config;

    if (hasToProp || hasFromProp) {
      config.velocity = 0;
    }

    if (props.config && !hasAsyncTo) {
      mergeConfig(config, callProp(props.config, key), props.config !== defaultProps.config ? callProp(defaultProps.config, key) : void 0);
    }

    let node = getAnimated(this);

    if (!node || is.und(to)) {
      return resolve(getFinishedResult(this, true));
    }

    const reset = is.und(props.reset) ? hasFromProp && !props.default : !is.und(from) && matchProp(props.reset, key);
    const value = reset ? from : this.get();
    const goal = computeGoal(to);
    const isAnimatable = is.num(goal) || is.arr(goal) || isAnimatedString(goal);
    const immediate = !hasAsyncTo && (!isAnimatable || matchProp(defaultProps.immediate || props.immediate, key));

    if (hasToChanged) {
      const nodeType = getAnimatedType(to);

      if (nodeType !== node.constructor) {
        if (immediate) {
          node = this._set(goal);
        } else throw Error(`Cannot animate between ${node.constructor.name} and ${nodeType.name}, as the "to" prop suggests`);
      }
    }

    const goalType = node.constructor;
    let started = hasFluidValue(to);
    let finished = false;

    if (!started) {
      const hasValueChanged = reset || !hasAnimated(this) && hasFromChanged;

      if (hasToChanged || hasValueChanged) {
        finished = isEqual(computeGoal(value), goal);
        started = !finished;
      }

      if (!isEqual(config.decay, decay) || !isEqual(config.velocity, velocity)) {
        started = true;
      }
    }

    if (finished && isAnimating(this)) {
      if (anim.changed && !reset) {
        started = true;
      } else if (!started) {
        this._stop(prevTo);
      }
    }

    if (!hasAsyncTo) {
      if (started || hasFluidValue(prevTo)) {
        anim.values = node.getPayload();
        anim.toValues = hasFluidValue(to) ? null : goalType == AnimatedString ? [1] : toArray(goal);
      }

      if (anim.immediate != immediate) {
        anim.immediate = immediate;

        if (!immediate && !reset) {
          this._set(prevTo);
        }
      }

      if (started) {
        const {
          onRest
        } = anim;
        each(ACTIVE_EVENTS, type => mergeActiveFn(this, props, type));
        const result = getFinishedResult(this, checkFinished(this, prevTo));
        flushCalls(this._pendingCalls, result);

        this._pendingCalls.add(resolve);

        if (anim.changed) raf.batchedUpdates(() => {
          var _a;

          anim.changed = !reset;
          onRest == null ? void 0 : onRest(result, this);

          if (reset) {
            callProp(defaultProps.onRest, result);
          } else {
            (_a = anim.onStart) == null ? void 0 : _a.call(anim, result, this);
          }
        });
      }
    }

    if (reset) {
      this._set(value);
    }

    if (hasAsyncTo) {
      resolve(runAsync(props.to, props, this._state, this));
    } else if (started) {
      this._start();
    } else if (isAnimating(this) && !hasToChanged) {
      this._pendingCalls.add(resolve);
    } else {
      resolve(getNoopResult(value));
    }
  }

  _focus(value) {
    const anim = this.animation;

    if (value !== anim.to) {
      if (getFluidObservers(this)) {
        this._detach();
      }

      anim.to = value;

      if (getFluidObservers(this)) {
        this._attach();
      }
    }
  }

  _attach() {
    let priority = 0;
    const {
      to
    } = this.animation;

    if (hasFluidValue(to)) {
      addFluidObserver(to, this);

      if (isFrameValue(to)) {
        priority = to.priority + 1;
      }
    }

    this.priority = priority;
  }

  _detach() {
    const {
      to
    } = this.animation;

    if (hasFluidValue(to)) {
      removeFluidObserver(to, this);
    }
  }

  _set(arg, idle = true) {
    const value = getFluidValue(arg);

    if (!is.und(value)) {
      const oldNode = getAnimated(this);

      if (!oldNode || !isEqual(value, oldNode.getValue())) {
        const nodeType = getAnimatedType(value);

        if (!oldNode || oldNode.constructor != nodeType) {
          setAnimated(this, nodeType.create(value));
        } else {
          oldNode.setValue(value);
        }

        if (oldNode) {
          raf.batchedUpdates(() => {
            this._onChange(value, idle);
          });
        }
      }
    }

    return getAnimated(this);
  }

  _onStart() {
    const anim = this.animation;

    if (!anim.changed) {
      anim.changed = true;
      sendEvent(this, "onStart", getFinishedResult(this, checkFinished(this, anim.to)), this);
    }
  }

  _onChange(value, idle) {
    if (!idle) {
      this._onStart();

      callProp(this.animation.onChange, value, this);
    }

    callProp(this.defaultProps.onChange, value, this);

    super._onChange(value, idle);
  }

  _start() {
    const anim = this.animation;
    getAnimated(this).reset(getFluidValue(anim.to));

    if (!anim.immediate) {
      anim.fromValues = anim.values.map(node => node.lastPosition);
    }

    if (!isAnimating(this)) {
      setActiveBit(this, true);

      if (!isPaused(this)) {
        this._resume();
      }
    }
  }

  _resume() {
    if (globals.skipAnimation) {
      this.finish();
    } else {
      frameLoop.start(this);
    }
  }

  _stop(goal, cancel) {
    if (isAnimating(this)) {
      setActiveBit(this, false);
      const anim = this.animation;
      each(anim.values, node => {
        node.done = true;
      });

      if (anim.toValues) {
        anim.onChange = anim.onPause = anim.onResume = void 0;
      }

      callFluidObservers(this, {
        type: "idle",
        parent: this
      });
      const result = cancel ? getCancelledResult(this.get()) : getFinishedResult(this.get(), checkFinished(this, goal != null ? goal : anim.to));
      flushCalls(this._pendingCalls, result);

      if (anim.changed) {
        anim.changed = false;
        sendEvent(this, "onRest", result, this);
      }
    }
  }

}

function checkFinished(target, to) {
  const goal = computeGoal(to);
  const value = computeGoal(target.get());
  return isEqual(value, goal);
}

function createLoopUpdate(props, loop = props.loop, to = props.to) {
  let loopRet = callProp(loop);

  if (loopRet) {
    const overrides = loopRet !== true && inferTo(loopRet);
    const reverse = (overrides || props).reverse;
    const reset = !overrides || overrides.reset;
    return createUpdate({ ...props,
      loop,
      default: false,
      pause: void 0,
      to: !reverse || isAsyncTo(to) ? to : void 0,
      from: reset ? props.from : void 0,
      reset,
      ...overrides
    });
  }
}

function createUpdate(props) {
  const {
    to,
    from
  } = props = inferTo(props);
  const keys = new Set();
  if (is.obj(to)) findDefined(to, keys);
  if (is.obj(from)) findDefined(from, keys);
  props.keys = keys.size ? Array.from(keys) : null;
  return props;
}

function declareUpdate(props) {
  const update = createUpdate(props);

  if (is.und(update.default)) {
    update.default = getDefaultProps(update);
  }

  return update;
}

function findDefined(values, keys) {
  eachProp(values, (value, key) => value != null && keys.add(key));
}

const ACTIVE_EVENTS = ["onStart", "onRest", "onChange", "onPause", "onResume"];

function mergeActiveFn(target, props, type) {
  target.animation[type] = props[type] !== getDefaultProp(props, type) ? resolveProp(props[type], target.key) : void 0;
}

function sendEvent(target, type, ...args) {
  var _a, _b, _c, _d;

  (_b = (_a = target.animation)[type]) == null ? void 0 : _b.call(_a, ...args);
  (_d = (_c = target.defaultProps)[type]) == null ? void 0 : _d.call(_c, ...args);
}

const BATCHED_EVENTS = ["onStart", "onChange", "onRest"];
let nextId$1 = 1;

class Controller {
  constructor(props, flush2) {
    this.id = nextId$1++;
    this.springs = {};
    this.queue = [];
    this._lastAsyncId = 0;
    this._active = new Set();
    this._changed = new Set();
    this._started = false;
    this._state = {
      paused: false,
      pauseQueue: new Set(),
      resumeQueue: new Set(),
      timeouts: new Set()
    };
    this._events = {
      onStart: new Map(),
      onChange: new Map(),
      onRest: new Map()
    };
    this._onFrame = this._onFrame.bind(this);

    if (flush2) {
      this._flush = flush2;
    }

    if (props) {
      this.start({
        default: true,
        ...props
      });
    }
  }

  get idle() {
    return !this._state.asyncTo && Object.values(this.springs).every(spring => spring.idle);
  }

  get item() {
    return this._item;
  }

  set item(item) {
    this._item = item;
  }

  get() {
    const values = {};
    this.each((spring, key) => values[key] = spring.get());
    return values;
  }

  set(values) {
    for (const key in values) {
      const value = values[key];

      if (!is.und(value)) {
        this.springs[key].set(value);
      }
    }
  }

  update(props) {
    if (props) {
      this.queue.push(createUpdate(props));
    }

    return this;
  }

  start(props) {
    let {
      queue
    } = this;

    if (props) {
      queue = toArray(props).map(createUpdate);
    } else {
      this.queue = [];
    }

    if (this._flush) {
      return this._flush(this, queue);
    }

    prepareKeys(this, queue);
    return flushUpdateQueue(this, queue);
  }

  stop(arg, keys) {
    if (arg !== !!arg) {
      keys = arg;
    }

    if (keys) {
      const springs = this.springs;
      each(toArray(keys), key => springs[key].stop(!!arg));
    } else {
      stopAsync(this._state, this._lastAsyncId);
      this.each(spring => spring.stop(!!arg));
    }

    return this;
  }

  pause(keys) {
    if (is.und(keys)) {
      this.start({
        pause: true
      });
    } else {
      const springs = this.springs;
      each(toArray(keys), key => springs[key].pause());
    }

    return this;
  }

  resume(keys) {
    if (is.und(keys)) {
      this.start({
        pause: false
      });
    } else {
      const springs = this.springs;
      each(toArray(keys), key => springs[key].resume());
    }

    return this;
  }

  each(iterator) {
    eachProp(this.springs, iterator);
  }

  _onFrame() {
    const {
      onStart,
      onChange,
      onRest
    } = this._events;
    const active = this._active.size > 0;

    if (active && !this._started) {
      this._started = true;
      flush(onStart, ([onStart2, result]) => {
        result.value = this.get();
        onStart2(result, this, this._item);
      });
    }

    const idle = !active && this._started;
    const changed = this._changed.size > 0 && onChange.size;
    const values = changed || idle && onRest.size ? this.get() : null;

    if (changed) {
      flush(onChange, ([onChange2, result]) => {
        result.value = values;
        onChange2(result, this, this._item);
      });
    }

    if (idle) {
      this._started = false;
      flush(onRest, ([onRest2, result]) => {
        result.value = values;
        onRest2(result, this, this._item);
      });
    }
  }

  eventObserved(event) {
    if (event.type == "change") {
      this._changed.add(event.parent);

      if (!event.idle) {
        this._active.add(event.parent);
      }
    } else if (event.type == "idle") {
      this._active.delete(event.parent);
    } else return;

    raf.onFrame(this._onFrame);
  }

}

function flushUpdateQueue(ctrl, queue) {
  return Promise.all(queue.map(props => flushUpdate(ctrl, props))).then(results => getCombinedResult(ctrl, results));
}

async function flushUpdate(ctrl, props, isLoop) {
  const {
    keys,
    to,
    from,
    loop,
    onRest,
    onResolve
  } = props;
  const defaults = is.obj(props.default) && props.default;

  if (loop) {
    props.loop = false;
  }

  if (to === false) props.to = null;
  if (from === false) props.from = null;
  const asyncTo = is.arr(to) || is.fun(to) ? to : void 0;

  if (asyncTo) {
    props.to = void 0;
    props.onRest = void 0;

    if (defaults) {
      defaults.onRest = void 0;
    }
  } else {
    each(BATCHED_EVENTS, key => {
      const handler = props[key];

      if (is.fun(handler)) {
        const queue = ctrl["_events"][key];

        props[key] = ({
          finished,
          cancelled
        }) => {
          const result2 = queue.get(handler);

          if (result2) {
            if (!finished) result2.finished = false;
            if (cancelled) result2.cancelled = true;
          } else {
            queue.set(handler, {
              value: null,
              finished: finished || false,
              cancelled: cancelled || false
            });
          }
        };

        if (defaults) {
          defaults[key] = props[key];
        }
      }
    });
  }

  const state = ctrl["_state"];

  if (props.pause === !state.paused) {
    state.paused = props.pause;
    flushCalls(props.pause ? state.pauseQueue : state.resumeQueue);
  } else if (state.paused) {
    props.pause = true;
  }

  const promises = (keys || Object.keys(ctrl.springs)).map(key => ctrl.springs[key].start(props));
  const cancel = props.cancel === true || getDefaultProp(props, "cancel") === true;

  if (asyncTo || cancel && state.asyncId) {
    promises.push(scheduleProps(++ctrl["_lastAsyncId"], {
      props,
      state,
      actions: {
        pause: noop,
        resume: noop,

        start(props2, resolve) {
          if (cancel) {
            stopAsync(state, ctrl["_lastAsyncId"]);
            resolve(getCancelledResult(ctrl));
          } else {
            props2.onRest = onRest;
            resolve(runAsync(asyncTo, props2, state, ctrl));
          }
        }

      }
    }));
  }

  if (state.paused) {
    await new Promise(resume => {
      state.resumeQueue.add(resume);
    });
  }

  const result = getCombinedResult(ctrl, await Promise.all(promises));

  if (loop && result.finished && !(isLoop && result.noop)) {
    const nextProps = createLoopUpdate(props, loop, to);

    if (nextProps) {
      prepareKeys(ctrl, [nextProps]);
      return flushUpdate(ctrl, nextProps, true);
    }
  }

  if (onResolve) {
    raf.batchedUpdates(() => onResolve(result, ctrl, ctrl.item));
  }

  return result;
}

function getSprings(ctrl, props) {
  const springs = { ...ctrl.springs
  };

  if (props) {
    each(toArray(props), props2 => {
      if (is.und(props2.keys)) {
        props2 = createUpdate(props2);
      }

      if (!is.obj(props2.to)) {
        props2 = { ...props2,
          to: void 0
        };
      }

      prepareSprings(springs, props2, key => {
        return createSpring(key);
      });
    });
  }

  return springs;
}

function setSprings(ctrl, springs) {
  eachProp(springs, (spring, key) => {
    if (!ctrl.springs[key]) {
      ctrl.springs[key] = spring;
      addFluidObserver(spring, ctrl);
    }
  });
}

function createSpring(key, observer) {
  const spring = new SpringValue();
  spring.key = key;

  if (observer) {
    addFluidObserver(spring, observer);
  }

  return spring;
}

function prepareSprings(springs, props, create) {
  if (props.keys) {
    each(props.keys, key => {
      const spring = springs[key] || (springs[key] = create(key));
      spring["_prepareNode"](props);
    });
  }
}

function prepareKeys(ctrl, queue) {
  each(queue, props => {
    prepareSprings(ctrl.springs, props, key => {
      return createSpring(key, ctrl);
    });
  });
}

const SpringContext = ({
  children,
  ...props
}) => {
  const inherited = useContext(ctx);
  const pause = props.pause || !!inherited.pause,
        immediate = props.immediate || !!inherited.immediate;
  props = useMemoOne(() => ({
    pause,
    immediate
  }), [pause, immediate]);
  const {
    Provider
  } = ctx;
  return /* @__PURE__ */createElement(Provider, {
    value: props
  }, children);
};

const ctx = makeContext(SpringContext, {});
SpringContext.Provider = ctx.Provider;
SpringContext.Consumer = ctx.Consumer;

function makeContext(target, init) {
  Object.assign(target, createContext(init));
  target.Provider._context = target;
  target.Consumer._context = target;
  return target;
}

class SpringRef extends Function {
  constructor() {
    super("return arguments.callee._call.apply(arguments.callee, arguments)");
    this.current = [];
  }

  _call(props) {
    deprecateDirectCall();
    this.start(props);
  }

  set(values) {
    each(this.current, ctrl => ctrl.set(values));
  }

  start(props) {
    const results = [];
    each(this.current, (ctrl, i) => {
      if (is.und(props)) {
        results.push(ctrl.start());
      } else {
        const update = this._getProps(props, ctrl, i);

        if (update) {
          results.push(ctrl.start(update));
        }
      }
    });
    return results;
  }

  update(props) {
    each(this.current, (ctrl, i) => ctrl.update(this._getProps(props, ctrl, i)));
    return this;
  }

  add(ctrl) {
    if (!this.current.includes(ctrl)) {
      this.current.push(ctrl);
    }
  }

  delete(ctrl) {
    const i = this.current.indexOf(ctrl);
    if (~i) this.current.splice(i, 1);
  }

  _getProps(arg, ctrl, index) {
    return is.fun(arg) ? arg(index, ctrl) : arg;
  }

}

each(["stop", "pause", "resume"], key => {
  SpringRef.prototype[key] = function () {
    each(this.current, ctrl => ctrl[key](...arguments));
    return this;
  };
});

function useSprings(length, props, deps) {
  const propsFn = is.fun(props) && props;
  if (propsFn && !deps) deps = [];
  const ref = useMemo(() => propsFn || arguments.length == 3 ? new SpringRef() : void 0, []);
  const layoutId = useRef(0);
  const forceUpdate = useForceUpdate();
  const state = useMemo(() => ({
    ctrls: [],
    queue: [],

    flush(ctrl, updates2) {
      const springs2 = getSprings(ctrl, updates2);
      const canFlushSync = layoutId.current > 0 && !state.queue.length && !Object.keys(springs2).some(key => !ctrl.springs[key]);
      return canFlushSync ? flushUpdateQueue(ctrl, updates2) : new Promise(resolve => {
        setSprings(ctrl, springs2);
        state.queue.push(() => {
          resolve(flushUpdateQueue(ctrl, updates2));
        });
        forceUpdate();
      });
    }

  }), []);
  const ctrls = [...state.ctrls];
  const updates = [];
  const prevLength = usePrev(length) || 0;
  const oldCtrls = ctrls.slice(length, prevLength);
  useMemo(() => {
    ctrls.length = length;
    declareUpdates(prevLength, length);
  }, [length]);
  useMemo(() => {
    declareUpdates(0, Math.min(prevLength, length));
  }, deps);

  function declareUpdates(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      const ctrl = ctrls[i] || (ctrls[i] = new Controller(null, state.flush));
      const update = propsFn ? propsFn(i, ctrl) : props[i];

      if (update) {
        updates[i] = declareUpdate(update);
      }
    }
  }

  const springs = ctrls.map((ctrl, i) => getSprings(ctrl, updates[i]));
  const context = useContext(SpringContext);
  const prevContext = usePrev(context);
  const hasContext = context !== prevContext && hasProps(context);
  useLayoutEffect(() => {
    layoutId.current++;
    state.ctrls = ctrls;
    const {
      queue
    } = state;

    if (queue.length) {
      state.queue = [];
      each(queue, cb => cb());
    }

    each(oldCtrls, ctrl => {
      detachRefs(ctrl, ref);
      ctrl.stop(true);
    });
    each(ctrls, (ctrl, i) => {
      const values2 = springs[i];
      setSprings(ctrl, values2);
      ref == null ? void 0 : ref.add(ctrl);

      if (hasContext) {
        ctrl.start({
          default: context
        });
      }

      const update = updates[i];

      if (update) {
        replaceRef(ctrl, update.ref);

        if (ctrl.ref) {
          ctrl.queue.push(update);
        } else {
          ctrl.start(update);
        }
      }
    });
  });
  useOnce(() => () => {
    each(state.ctrls, ctrl => ctrl.stop(true));
  });
  const values = springs.map(x => ({ ...x
  }));
  return ref ? [values, ref] : values;
}

function useSpring(props, deps) {
  const isFn = is.fun(props);
  const [[values], ref] = useSprings(1, isFn ? props : [props], isFn ? deps || [] : deps);
  return isFn || arguments.length == 2 ? [values, ref] : values;
}

class Interpolation extends FrameValue {
  constructor(source, args) {
    super();
    this.source = source;
    this.idle = true;
    this._active = new Set();
    this.calc = createInterpolator(...args);

    const value = this._get();

    const nodeType = getAnimatedType(value);
    setAnimated(this, nodeType.create(value));
  }

  advance(_dt) {
    const value = this._get();

    const oldValue = this.get();

    if (!isEqual(value, oldValue)) {
      getAnimated(this).setValue(value);

      this._onChange(value, this.idle);
    }

    if (!this.idle && checkIdle(this._active)) {
      becomeIdle(this);
    }
  }

  _get() {
    const inputs = is.arr(this.source) ? this.source.map(getFluidValue) : toArray(getFluidValue(this.source));
    return this.calc(...inputs);
  }

  _start() {
    if (this.idle && !checkIdle(this._active)) {
      this.idle = false;
      each(getPayload(this), node => {
        node.done = false;
      });

      if (globals.skipAnimation) {
        raf.batchedUpdates(() => this.advance());
        becomeIdle(this);
      } else {
        frameLoop.start(this);
      }
    }
  }

  _attach() {
    let priority = 1;
    each(toArray(this.source), source => {
      if (hasFluidValue(source)) {
        addFluidObserver(source, this);
      }

      if (isFrameValue(source)) {
        if (!source.idle) {
          this._active.add(source);
        }

        priority = Math.max(priority, source.priority + 1);
      }
    });
    this.priority = priority;

    this._start();
  }

  _detach() {
    each(toArray(this.source), source => {
      if (hasFluidValue(source)) {
        removeFluidObserver(source, this);
      }
    });

    this._active.clear();

    becomeIdle(this);
  }

  eventObserved(event) {
    if (event.type == "change") {
      if (event.idle) {
        this.advance();
      } else {
        this._active.add(event.parent);

        this._start();
      }
    } else if (event.type == "idle") {
      this._active.delete(event.parent);
    } else if (event.type == "priority") {
      this.priority = toArray(this.source).reduce((highest, parent) => Math.max(highest, (isFrameValue(parent) ? parent.priority : 0) + 1), 0);
    }
  }

}

function isIdle(source) {
  return source.idle !== false;
}

function checkIdle(active) {
  return !active.size || Array.from(active).every(isIdle);
}

function becomeIdle(self) {
  if (!self.idle) {
    self.idle = true;
    each(getPayload(self), node => {
      node.done = true;
    });
    callFluidObservers(self, {
      type: "idle",
      parent: self
    });
  }
}

globals.assign({
  createStringInterpolator: createStringInterpolator$1,
  to: (source, args) => new Interpolation(source, args)
});

const isCustomPropRE = /^--/;

function dangerousStyleValue(name, value) {
  if (value == null || typeof value === "boolean" || value === "") return "";
  if (typeof value === "number" && value !== 0 && !isCustomPropRE.test(name) && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) return value + "px";
  return ("" + value).trim();
}

const attributeCache = {};

function applyAnimatedValues(instance, props) {
  if (!instance.nodeType || !instance.setAttribute) {
    return false;
  }

  const isFilterElement = instance.nodeName === "filter" || instance.parentNode && instance.parentNode.nodeName === "filter";
  const {
    style,
    children,
    scrollTop,
    scrollLeft,
    ...attributes
  } = props;
  const values = Object.values(attributes);
  const names = Object.keys(attributes).map(name => isFilterElement || instance.hasAttribute(name) ? name : attributeCache[name] || (attributeCache[name] = name.replace(/([A-Z])/g, n => "-" + n.toLowerCase())));

  if (children !== void 0) {
    instance.textContent = children;
  }

  for (let name in style) {
    if (style.hasOwnProperty(name)) {
      const value = dangerousStyleValue(name, style[name]);
      if (name === "float") name = "cssFloat";else if (isCustomPropRE.test(name)) {
        instance.style.setProperty(name, value);
      } else {
        instance.style[name] = value;
      }
    }
  }

  names.forEach((name, i) => {
    instance.setAttribute(name, values[i]);
  });

  if (scrollTop !== void 0) {
    instance.scrollTop = scrollTop;
  }

  if (scrollLeft !== void 0) {
    instance.scrollLeft = scrollLeft;
  }
}

let isUnitlessNumber = {
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
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

const prefixKey = (prefix, key) => prefix + key.charAt(0).toUpperCase() + key.substring(1);

const prefixes = ["Webkit", "Ms", "Moz", "O"];
isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop) => {
  prefixes.forEach(prefix => acc[prefixKey(prefix, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber);
const domTransforms = /^(matrix|translate|scale|rotate|skew)/;
const pxTransforms = /^(translate)/;
const degTransforms = /^(rotate|skew)/;

const addUnit = (value, unit) => is.num(value) && value !== 0 ? value + unit : value;

const isValueIdentity = (value, id) => is.arr(value) ? value.every(v => isValueIdentity(v, id)) : is.num(value) ? value === id : parseFloat(value) === id;

class AnimatedStyle extends AnimatedObject {
  constructor({
    x,
    y,
    z,
    ...style
  }) {
    const inputs = [];
    const transforms = [];

    if (x || y || z) {
      inputs.push([x || 0, y || 0, z || 0]);
      transforms.push(xyz => [`translate3d(${xyz.map(v => addUnit(v, "px")).join(",")})`, isValueIdentity(xyz, 0)]);
    }

    eachProp(style, (value, key) => {
      if (key === "transform") {
        inputs.push([value || ""]);
        transforms.push(transform => [transform, transform === ""]);
      } else if (domTransforms.test(key)) {
        delete style[key];
        if (is.und(value)) return;
        const unit = pxTransforms.test(key) ? "px" : degTransforms.test(key) ? "deg" : "";
        inputs.push(toArray(value));
        transforms.push(key === "rotate3d" ? ([x2, y2, z2, deg]) => [`rotate3d(${x2},${y2},${z2},${addUnit(deg, unit)})`, isValueIdentity(deg, 0)] : input => [`${key}(${input.map(v => addUnit(v, unit)).join(",")})`, isValueIdentity(input, key.startsWith("scale") ? 1 : 0)]);
      }
    });

    if (inputs.length) {
      style.transform = new FluidTransform(inputs, transforms);
    }

    super(style);
  }

}

class FluidTransform extends FluidValue {
  constructor(inputs, transforms) {
    super();
    this.inputs = inputs;
    this.transforms = transforms;
    this._value = null;
  }

  get() {
    return this._value || (this._value = this._get());
  }

  _get() {
    let transform = "";
    let identity = true;
    each(this.inputs, (input, i) => {
      const arg1 = getFluidValue(input[0]);
      const [t, id] = this.transforms[i](is.arr(arg1) ? arg1 : input.map(getFluidValue));
      transform += " " + t;
      identity = identity && id;
    });
    return identity ? "none" : transform;
  }

  observerAdded(count) {
    if (count == 1) each(this.inputs, input => each(input, value => hasFluidValue(value) && addFluidObserver(value, this)));
  }

  observerRemoved(count) {
    if (count == 0) each(this.inputs, input => each(input, value => hasFluidValue(value) && removeFluidObserver(value, this)));
  }

  eventObserved(event) {
    if (event.type == "change") {
      this._value = null;
    }

    callFluidObservers(this, event);
  }

}

const primitives = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"];
globals.assign({
  batchedUpdates: unstable_batchedUpdates,
  createStringInterpolator: createStringInterpolator$1,
  colors: colors$1
});
const host = createHost(primitives, {
  applyAnimatedValues: applyAnimatedValues,
  createAnimatedStyle: style => new AnimatedStyle(style),
  getComponentProps: ({
    scrollTop,
    scrollLeft,
    ...props
  }) => props
});
const animated = host.animated;

function Orbit(props) {
    var orbitRadius = props.orbitRadius, planetWidth = props.planetWidth, planetHeight = props.planetHeight, open = props.open, tension = props.tension, friction = props.friction, mass = props.mass;
    var classes = useStyles(props);
    var theme = useTheme();
    var position = useSpring({
        reverse: !open,
        from: getInitalOrbitPosition(planetWidth, planetHeight),
        to: getFinalOrbitPosition(planetWidth, planetHeight, orbitRadius),
        config: { mass: mass, tension: tension, friction: friction },
    });
    return jsxRuntime.jsx(animated.div, { className: classes.orbit, style: __assign(__assign({}, position), { boxShadow: theme.shadows[props.elevation], background: props.color }) }, void 0);
}
function getInitalOrbitPosition(planetWidth, planetHeight) {
    return {
        width: 0,
        height: 0,
        top: planetWidth / 2,
        left: planetHeight / 2,
        opacity: 0,
    };
}
function getFinalOrbitPosition(planetWidth, planetHeight, orbitRadius) {
    return {
        width: orbitRadius * 2,
        height: orbitRadius * 2,
        top: 0 - orbitRadius + planetHeight / 2,
        left: 0 - orbitRadius + planetWidth / 2,
        opacity: 1,
    };
}
var orbitDefaultStyle = {
    position: "absolute",
    borderRadius: "100%",
    zIndex: 0,
};
var useStyles = makeStyles({
    orbit: function (props) {
        return props.orbitStyle ? props.orbitStyle(orbitDefaultStyle) : orbitDefaultStyle;
    },
});

function Satellite(props) {
    var children = props.children, index = props.index, satelliteCount = props.satelliteCount, open = props.open, planetWidth = props.planetWidth, planetHeight = props.planetHeight, tension = props.tension, friction = props.friction, mass = props.mass, orbitRadius = props.orbitRadius, rotation = props.rotation, orientation = props.orientation, angle = props.angle;
    var classes = useStyles$1(props);
    var _a = useResizeObserver(), ref = _a.ref, _b = _a.height, height = _b === void 0 ? 0 : _b, _c = _a.width, width = _c === void 0 ? 0 : _c;
    var position = useSpring({
        reverse: !open,
        from: getInitalSatellitePosition(width, height, planetWidth, planetHeight),
        to: getFinalSatellitePosition(index, satelliteCount, width, height, planetWidth, planetHeight, orbitRadius, rotation, angle, orientation),
        config: { mass: mass, tension: tension, friction: friction },
    });
    return (jsxRuntime.jsx(animated.div, __assign({ className: classes.root, style: position }, { children: jsxRuntime.jsx("div", __assign({ ref: ref }, { children: children }), void 0) }), void 0));
}
function getFinalSatellitePosition(index, satelliteCount, width, height, planetWidth, planetHeight, orbitRadius, rotation, deg, orientation) {
    var _a = getFinalDeltaPositions(index, satelliteCount, width, height, orbitRadius, rotation, deg), deltaX = _a.deltaX, deltaY = _a.deltaY, angle = _a.angle;
    var transform = {};
    switch (orientation) {
        case "OUTSIDE":
            transform = { transform: "rotate(" + angle + "deg)" };
            break;
        case "INSIDE":
            transform = { transform: "rotate(" + (angle + 180) + "deg)" };
            break;
        case "READABLE":
            transform =
                angle > 90 && angle < 270
                    ? { transform: "rotate(" + (angle + 180) + "deg)" }
                    : { transform: "rotate(" + angle + "deg)" };
            break;
        default:
            transform = { transform: "rotate(" + 0 + "deg)" };
    }
    return __assign({ top: planetHeight / 2 + deltaX, left: planetWidth / 2 - deltaY, opacity: 1 }, transform);
}
function getInitalSatellitePosition(width, height, planetWidth, planetHeight) {
    return {
        top: planetHeight / 2 - height / 2,
        left: planetWidth / 2 - width / 2,
        opacity: 0,
    };
}
function getFinalDeltaPositions(index, satelliteCount, width, height, orbitRadius, rotation, angle) {
    var SEPARATION_ANGLE = angle / satelliteCount;
    var FAN_ANGLE = (satelliteCount - 1) * SEPARATION_ANGLE;
    var BASE_ANGLE = (180 - FAN_ANGLE) / 2 + 90 + rotation;
    var TARGET_ANGLE = BASE_ANGLE + index * SEPARATION_ANGLE;
    return {
        deltaX: orbitRadius * Math.cos(toRadians(TARGET_ANGLE)) - height / 2,
        deltaY: orbitRadius * Math.sin(toRadians(TARGET_ANGLE)) + width / 2,
        angle: TARGET_ANGLE,
    };
}
var useStyles$1 = makeStyles({
    root: function (props) { return ({
        position: "absolute",
        zIndex: props.open ? 2 : 0,
    }); },
});
// UTILITY FUNCTIONS
var DEG_TO_RAD = 0.0174533;
function toRadians(degrees) {
    return degrees * DEG_TO_RAD;
}

var DEFAULT_MASS = 1;
var DEFAULT_TENSTION = 500;
var DEFAULT_FRICTION = 17;
var DEFAULT_ROTATION = 0;
var DEFAULT_OBITRADIUS = 90;
var DEFAULT_RADIUS = 60;
function Planet(props) {
    var centerContent = props.centerContent, children = props.children, open = props.open, onClick = props.onClick, mass = props.mass, tension = props.tension, friction = props.friction, orbitRadius = props.orbitRadius, radius = props.radius, rotation = props.rotation, orbitStyle = props.orbitStyle, hideOrbit = props.hideOrbit, onClose = props.onClose, autoClose = props.autoClose, angle = props.angle, color = props.color, dragableSatellites = props.dragableSatellites, dragRadiusSatellites = props.dragRadiusSatellites, elevation = props.elevation, satelliteOrientation = props.satelliteOrientation;
    var classes = useStyles$2(props);
    var _a = useResizeObserver(), ref = _a.ref, _b = _a.height, height = _b === void 0 ? 0 : _b, _c = _a.width, width = _c === void 0 ? 0 : _c;
    var _d = __read(useState(!!open), 2), _open = _d[0], setOpen = _d[1];
    useEffect(function () {
        if (!!open !== _open) {
            setOpen(!!open);
        }
    }, [open]);
    var satellites = [];
    var satelliteCount = Children.count(children);
    Children.forEach(children, function (c, i) {
        satellites[i] = function () { return (jsxRuntime.jsx(Satellite, __assign({ angle: angle !== null && angle !== void 0 ? angle : 360, index: i, open: _open, satelliteCount: satelliteCount, planetHeight: height, planetWidth: width, mass: mass ? mass : DEFAULT_MASS, friction: friction ? friction : DEFAULT_FRICTION, tension: tension ? tension : DEFAULT_TENSTION, orbitRadius: radius ? radius : DEFAULT_RADIUS, rotation: rotation ? rotation : DEFAULT_ROTATION, dragable: !!dragableSatellites, dragRadius: dragRadiusSatellites, orientation: satelliteOrientation }, { children: c }), i)); };
    });
    var onPlanet = function (e) {
        if (onClick) {
            onClick(e);
        }
        else {
            if (_open && autoClose) {
                setOpen(false);
                if (onClose) {
                    onClose(e);
                }
            }
            else {
                setOpen(true);
            }
        }
    };
    var onClickAway = function (e) {
        if (autoClose && _open) {
            setOpen(false);
        }
        if (onClose && _open) {
            onClose(e);
        }
    };
    return (jsxRuntime.jsx(ClickAwayListener, __assign({ onClickAway: onClickAway }, { children: jsxRuntime.jsxs("div", __assign({ className: classes.root }, { children: [!hideOrbit && _open && (jsxRuntime.jsx(Orbit, { elevation: elevation !== null && elevation !== void 0 ? elevation : 2, color: color !== null && color !== void 0 ? color : "transpalent", open: _open, orbitStyle: orbitStyle, planetHeight: height, planetWidth: width, mass: mass ? mass : DEFAULT_MASS, friction: friction ? friction : DEFAULT_FRICTION, tension: tension ? tension : DEFAULT_TENSTION, orbitRadius: orbitRadius ? orbitRadius : DEFAULT_OBITRADIUS }, void 0)),
                _open && (jsxRuntime.jsx(jsxRuntime.Fragment, { children: satellites.map(function (e) { return e(); }) }, void 0)),
                jsxRuntime.jsx("div", __assign({ className: classes.planetContent, onClick: onPlanet }, { children: jsxRuntime.jsx("div", __assign({ ref: ref }, { children: centerContent }), void 0) }), void 0)] }), void 0) }), void 0));
}
var useStyles$2 = makeStyles({
    root: {
        position: "relative",
    },
    planetContent: {
        position: "absolute",
        zIndex: 1,
    },
});

function PostCardMenu(props) {
    var _a = __read(useState(false), 2), isMenuOpened = _a[0], setIsMenuOpened = _a[1];
    var theme = useTheme();
    var deletePresed = props.deletePresed, editPressed = props.editPressed, previewPressed = props.previewPressed;
    return (jsxRuntime.jsxs(Planet, __assign({ color: theme.palette.secondary.light, autoClose: true, angle: 270, rotation: -90, orbitRadius: 72, radius: 72 * 0.6666, onClose: function () { return setIsMenuOpened(false); }, centerContent: jsxRuntime.jsx(Fab, __assign({ color: "secondary", size: "small", onClick: function () { return setIsMenuOpened(true); }, style: {
                boxShadow: isMenuOpened ? "none" : undefined,
                filter: isMenuOpened ? "Brightness(0.8)" : undefined
            } }, { children: jsxRuntime.jsx(Icon, { children: "toc" }, void 0) }), void 0) }, { children: [!props.disableDeleteButton && jsxRuntime.jsx(IconButton, __assign({ disabled: props.disableDeleteButton, color: "inherit", style: { color: "white" }, size: "small", onClick: function () { return deletePresed(); } }, { children: jsxRuntime.jsx(Icon, { children: "delete" }, void 0) }), void 0),
            jsxRuntime.jsx(IconButton, __assign({ color: "inherit", style: { color: "white" }, size: "small", onClick: function () { return previewPressed(); } }, { children: jsxRuntime.jsx(Icon, { children: "visibility" }, void 0) }), void 0),
            !props.disableEditButton && jsxRuntime.jsx(IconButton, __assign({ disabled: props.disableEditButton, color: "inherit", style: { color: "white" }, size: "small", onClick: function () { return editPressed(); } }, { children: jsxRuntime.jsx(Icon, { children: "edit" }, void 0) }), void 0)] }), void 0));
}

function PostCard(props) {
    var _a;
    var classes = useStyles$3();
    var content = props.content, deletePresed = props.deletePresed, editPressed = props.editPressed, previewPressed = props.previewPressed;
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
                jsxRuntime.jsxs(Box, __assign({ p: 2, flex: "1 1 auto", zIndex: "1", display: "flex", flexDirection: "column" }, { children: [jsxRuntime.jsx(Box, __assign({ position: "relative", display: "flex", width: "100%" }, { children: jsxRuntime.jsx(Box, __assign({ className: classes.menuButton }, { children: jsxRuntime.jsx(PostCardMenu, { previewPressed: previewPressed, deletePresed: deletePresed, editPressed: editPressed, disableDeleteButton: services.authService.loginInfo.role <= RoleType.Post &&
                                        content.createdBy.name !== services.authService.loginInfo.name, disableEditButton: services.authService.loginInfo.role <= RoleType.Post &&
                                        content.createdBy.name !== services.authService.loginInfo.name }, void 0) }), void 0) }), void 0),
                        jsxRuntime.jsx(Box, __assign({ className: classes.title }, { children: jsxRuntime.jsx(WrappedTextBlock, __assign({ color: "inherit", variant: "h6", noWrap: true, row: 2 }, { children: content.title }), void 0) }), void 0),
                        jsxRuntime.jsx(Box, __assign({ height: "72px", mt: 1 }, { children: jsxRuntime.jsx(WrappedTextBlock, __assign({ color: "textSecondary", row: 3, variant: "caption", fontSize: "10px" }, { children: content.description.substr(0, 1024).replace(/<[^>]*>?/gm, "").replace(/&[^;]*;?/gm, "") }), void 0) }), void 0),
                        jsxRuntime.jsxs(Box, __assign({ display: "flex", alignItems: "center" }, { children: [jsxRuntime.jsx(Box, { children: jsxRuntime.jsx(Typography, __assign({ variant: "caption" }, { children: postStatusTypeDisplay[props.content.status] }), void 0) }, void 0),
                                jsxRuntime.jsx(FlexSpacer, {}, void 0)] }), void 0),
                        jsxRuntime.jsx(Box, __assign({ display: "flex" }, { children: jsxRuntime.jsx(DateTimeText, { showTime: true, color: "textSecondary", fontSize: "12px", date: ((_a = props.content.publishIn) !== null && _a !== void 0 ? _a : props.content.createdAt).toJSDate() }, void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
}
var useStyles$3 = makeStyles({
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
    var classes = useStyles$4();
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
var useStyles$4 = makeStyles({
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
