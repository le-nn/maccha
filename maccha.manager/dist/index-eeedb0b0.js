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

import { w as withStyles, a as _extends, aa as _defineProperty, _ as _objectWithoutProperties$1, Q as ButtonBase, c as clsx, e as capitalize, aE as unsupportedProp, p as propTypes, b as createSvgIcon, aF as debounce, u as useTheme, D as useEventCallback, aG as ownerWindow, aH as reactIs, x as refType, aA as createCommonjsModule, aI as getDefaultExportFromCjs } from './index.lib-1f5131ad.js';
import React, { forwardRef, createElement, useRef, useEffect, useState, useCallback, useImperativeHandle, Children, isValidElement, cloneElement } from 'react';

var styles = function styles(theme) {
  var _extends2;

  return {
    /* Styles applied to the root element. */
    root: _extends({}, theme.typography.button, (_extends2 = {
      maxWidth: 264,
      minWidth: 72,
      position: 'relative',
      boxSizing: 'border-box',
      minHeight: 48,
      flexShrink: 0,
      padding: '6px 12px'
    }, _defineProperty(_extends2, theme.breakpoints.up('sm'), {
      padding: '6px 24px'
    }), _defineProperty(_extends2, "overflow", 'hidden'), _defineProperty(_extends2, "whiteSpace", 'normal'), _defineProperty(_extends2, "textAlign", 'center'), _defineProperty(_extends2, theme.breakpoints.up('sm'), {
      minWidth: 160
    }), _extends2)),

    /* Styles applied to the root element if both `icon` and `label` are provided. */
    labelIcon: {
      minHeight: 72,
      paddingTop: 9,
      '& $wrapper > *:first-child': {
        marginBottom: 6
      }
    },

    /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="inherit"`. */
    textColorInherit: {
      color: 'inherit',
      opacity: 0.7,
      '&$selected': {
        opacity: 1
      },
      '&$disabled': {
        opacity: 0.5
      }
    },

    /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="primary"`. */
    textColorPrimary: {
      color: theme.palette.text.secondary,
      '&$selected': {
        color: theme.palette.primary.main
      },
      '&$disabled': {
        color: theme.palette.text.disabled
      }
    },

    /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="secondary"`. */
    textColorSecondary: {
      color: theme.palette.text.secondary,
      '&$selected': {
        color: theme.palette.secondary.main
      },
      '&$disabled': {
        color: theme.palette.text.disabled
      }
    },

    /* Pseudo-class applied to the root element if `selected={true}` (controlled by the Tabs component). */
    selected: {},

    /* Pseudo-class applied to the root element if `disabled={true}` (controlled by the Tabs component). */
    disabled: {},

    /* Styles applied to the root element if `fullWidth={true}` (controlled by the Tabs component). */
    fullWidth: {
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: 0,
      maxWidth: 'none'
    },

    /* Styles applied to the root element if `wrapped={true}`. */
    wrapped: {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 1.5
    },

    /* Styles applied to the `icon` and `label`'s wrapper element. */
    wrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'column'
    }
  };
};
var Tab = /*#__PURE__*/forwardRef(function Tab(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      fullWidth = props.fullWidth,
      icon = props.icon,
      indicator = props.indicator,
      label = props.label,
      onChange = props.onChange,
      onClick = props.onClick,
      onFocus = props.onFocus,
      selected = props.selected,
      selectionFollowsFocus = props.selectionFollowsFocus,
      _props$textColor = props.textColor,
      textColor = _props$textColor === void 0 ? 'inherit' : _props$textColor,
      value = props.value,
      _props$wrapped = props.wrapped,
      wrapped = _props$wrapped === void 0 ? false : _props$wrapped,
      other = _objectWithoutProperties$1(props, ["classes", "className", "disabled", "disableFocusRipple", "fullWidth", "icon", "indicator", "label", "onChange", "onClick", "onFocus", "selected", "selectionFollowsFocus", "textColor", "value", "wrapped"]);

  var handleClick = function handleClick(event) {
    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  var handleFocus = function handleFocus(event) {
    if (selectionFollowsFocus && !selected && onChange) {
      onChange(event, value);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  return /*#__PURE__*/createElement(ButtonBase, _extends({
    focusRipple: !disableFocusRipple,
    className: clsx(classes.root, classes["textColor".concat(capitalize(textColor))], className, disabled && classes.disabled, selected && classes.selected, label && icon && classes.labelIcon, fullWidth && classes.fullWidth, wrapped && classes.wrapped),
    ref: ref,
    role: "tab",
    "aria-selected": selected,
    disabled: disabled,
    onClick: handleClick,
    onFocus: handleFocus,
    tabIndex: selected ? 0 : -1
  }, other), /*#__PURE__*/createElement("span", {
    className: classes.wrapper
  }, icon, label), indicator);
});
process.env.NODE_ENV !== "production" ? Tab.propTypes = {
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: propTypes.object.isRequired,

  /**
   * @ignore
   */
  className: propTypes.string,

  /**
   * If `true`, the tab will be disabled.
   */
  disabled: propTypes.bool,

  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   */
  disableFocusRipple: propTypes.bool,

  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: propTypes.bool,

  /**
   * @ignore
   */
  fullWidth: propTypes.bool,

  /**
   * The icon element.
   */
  icon: propTypes.node,

  /**
   * @ignore
   * For server-side rendering consideration, we let the selected tab
   * render the indicator.
   */
  indicator: propTypes.node,

  /**
   * The label element.
   */
  label: propTypes.node,

  /**
   * @ignore
   */
  onChange: propTypes.func,

  /**
   * @ignore
   */
  onClick: propTypes.func,

  /**
   * @ignore
   */
  onFocus: propTypes.func,

  /**
   * @ignore
   */
  selected: propTypes.bool,

  /**
   * @ignore
   */
  selectionFollowsFocus: propTypes.bool,

  /**
   * @ignore
   */
  textColor: propTypes.oneOf(['secondary', 'primary', 'inherit']),

  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: propTypes.any,

  /**
   * Tab labels appear in a single row.
   * They can use a second line if needed.
   */
  wrapped: propTypes.bool
} : void 0;
var Tab$1 = withStyles(styles, {
  name: 'MuiTab'
})(Tab);

/**
 * @ignore - internal component.
 */

var KeyboardArrowLeft = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
}), 'KeyboardArrowLeft');

/**
 * @ignore - internal component.
 */

var KeyboardArrowRight = createSvgIcon( /*#__PURE__*/createElement("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
}), 'KeyboardArrowRight');

// Source from https://github.com/alitaheri/normalize-scroll-left
var cachedType;
/**
 * Based on the jquery plugin https://github.com/othree/jquery.rtl-scroll-type
 *
 * Types of scrollLeft, assuming scrollWidth=100 and direction is rtl.
 *
 * Type             | <- Most Left | Most Right -> | Initial
 * ---------------- | ------------ | ------------- | -------
 * default          | 0            | 100           | 100
 * negative (spec*) | -100         | 0             | 0
 * reverse          | 100          | 0             | 0
 *
 * Edge 85: default
 * Safari 14: negative
 * Chrome 85: negative
 * Firefox 81: negative
 * IE 11: reverse
 *
 * spec* https://drafts.csswg.org/cssom-view/#dom-window-scroll
 */

function detectScrollType() {
  if (cachedType) {
    return cachedType;
  }

  var dummy = document.createElement('div');
  var container = document.createElement('div');
  container.style.width = '10px';
  container.style.height = '1px';
  dummy.appendChild(container);
  dummy.dir = 'rtl';
  dummy.style.fontSize = '14px';
  dummy.style.width = '4px';
  dummy.style.height = '1px';
  dummy.style.position = 'absolute';
  dummy.style.top = '-1000px';
  dummy.style.overflow = 'scroll';
  document.body.appendChild(dummy);
  cachedType = 'reverse';

  if (dummy.scrollLeft > 0) {
    cachedType = 'default';
  } else {
    dummy.scrollLeft = 1;

    if (dummy.scrollLeft === 0) {
      cachedType = 'negative';
    }
  }

  document.body.removeChild(dummy);
  return cachedType;
} // Based on https://stackoverflow.com/a/24394376

function getNormalizedScrollLeft(element, direction) {
  var scrollLeft = element.scrollLeft; // Perform the calculations only when direction is rtl to avoid messing up the ltr bahavior

  if (direction !== 'rtl') {
    return scrollLeft;
  }

  var type = detectScrollType();

  switch (type) {
    case 'negative':
      return element.scrollWidth - element.clientWidth + scrollLeft;

    case 'reverse':
      return element.scrollWidth - element.clientWidth - scrollLeft;

    default:
      return scrollLeft;
  }
}

function easeInOutSin(time) {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}

function animate(property, element, to) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var cb = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};
  var _options$ease = options.ease,
      ease = _options$ease === void 0 ? easeInOutSin : _options$ease,
      _options$duration = options.duration,
      duration = _options$duration === void 0 ? 300 : _options$duration;
  var start = null;
  var from = element[property];
  var cancelled = false;

  var cancel = function cancel() {
    cancelled = true;
  };

  var step = function step(timestamp) {
    if (cancelled) {
      cb(new Error('Animation cancelled'));
      return;
    }

    if (start === null) {
      start = timestamp;
    }

    var time = Math.min(1, (timestamp - start) / duration);
    element[property] = ease(time) * (to - from) + from;

    if (time >= 1) {
      requestAnimationFrame(function () {
        cb(null);
      });
      return;
    }

    requestAnimationFrame(step);
  };

  if (from === to) {
    cb(new Error('Element already at target position'));
    return cancel;
  }

  requestAnimationFrame(step);
  return cancel;
}

var styles$1 = {
  width: 99,
  height: 99,
  position: 'absolute',
  top: -9999,
  overflow: 'scroll'
};
/**
 * @ignore - internal component.
 * The component originates from https://github.com/STORIS/react-scrollbar-size.
 * It has been moved into the core in order to minimize the bundle size.
 */

function ScrollbarSize(props) {
  var onChange = props.onChange,
      other = _objectWithoutProperties$1(props, ["onChange"]);

  var scrollbarHeight = useRef();
  var nodeRef = useRef(null);

  var setMeasurements = function setMeasurements() {
    scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
  };

  useEffect(function () {
    var handleResize = debounce(function () {
      var prevHeight = scrollbarHeight.current;
      setMeasurements();

      if (prevHeight !== scrollbarHeight.current) {
        onChange(scrollbarHeight.current);
      }
    });
    window.addEventListener('resize', handleResize);
    return function () {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [onChange]);
  useEffect(function () {
    setMeasurements();
    onChange(scrollbarHeight.current);
  }, [onChange]);
  return /*#__PURE__*/createElement("div", _extends({
    style: styles$1,
    ref: nodeRef
  }, other));
}
process.env.NODE_ENV !== "production" ? ScrollbarSize.propTypes = {
  onChange: propTypes.func.isRequired
} : void 0;

var styles$2 = function styles(theme) {
  return {
    root: {
      position: 'absolute',
      height: 2,
      bottom: 0,
      width: '100%',
      transition: theme.transitions.create()
    },
    colorPrimary: {
      backgroundColor: theme.palette.primary.main
    },
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main
    },
    vertical: {
      height: '100%',
      width: 2,
      right: 0
    }
  };
};
/**
 * @ignore - internal component.
 */

var TabIndicator = /*#__PURE__*/forwardRef(function TabIndicator(props, ref) {
  var classes = props.classes,
      className = props.className,
      color = props.color,
      orientation = props.orientation,
      other = _objectWithoutProperties$1(props, ["classes", "className", "color", "orientation"]);

  return /*#__PURE__*/createElement("span", _extends({
    className: clsx(classes.root, classes["color".concat(capitalize(color))], className, orientation === 'vertical' && classes.vertical),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? TabIndicator.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: propTypes.object.isRequired,

  /**
   * @ignore
   */
  className: propTypes.string,

  /**
   * @ignore
   * The color of the tab indicator.
   */
  color: propTypes.oneOf(['primary', 'secondary']).isRequired,

  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: propTypes.oneOf(['horizontal', 'vertical']).isRequired
} : void 0;
var TabIndicator$1 = withStyles(styles$2, {
  name: 'PrivateTabIndicator'
})(TabIndicator);

var styles$3 = {
  /* Styles applied to the root element. */
  root: {
    width: 40,
    flexShrink: 0,
    opacity: 0.8,
    '&$disabled': {
      opacity: 0
    }
  },

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    width: '100%',
    height: 40,
    '& svg': {
      transform: 'rotate(90deg)'
    }
  },

  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {}
};

var _ref = /*#__PURE__*/createElement(KeyboardArrowLeft, {
  fontSize: "small"
});

var _ref2 = /*#__PURE__*/createElement(KeyboardArrowRight, {
  fontSize: "small"
});

var TabScrollButton = /*#__PURE__*/forwardRef(function TabScrollButton(props, ref) {
  var classes = props.classes,
      classNameProp = props.className,
      direction = props.direction,
      orientation = props.orientation,
      disabled = props.disabled,
      other = _objectWithoutProperties$1(props, ["classes", "className", "direction", "orientation", "disabled"]);

  return /*#__PURE__*/createElement(ButtonBase, _extends({
    component: "div",
    className: clsx(classes.root, classNameProp, disabled && classes.disabled, orientation === 'vertical' && classes.vertical),
    ref: ref,
    role: null,
    tabIndex: null
  }, other), direction === 'left' ? _ref : _ref2);
});
process.env.NODE_ENV !== "production" ? TabScrollButton.propTypes = {
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
   * Which direction should the button indicate?
   */
  direction: propTypes.oneOf(['left', 'right']).isRequired,

  /**
   * If `true`, the element will be disabled.
   */
  disabled: propTypes.bool,

  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: propTypes.oneOf(['horizontal', 'vertical']).isRequired
} : void 0;
var TabScrollButton$1 = withStyles(styles$3, {
  name: 'MuiTabScrollButton'
})(TabScrollButton);

var styles$4 = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      overflow: 'hidden',
      minHeight: 48,
      WebkitOverflowScrolling: 'touch',
      // Add iOS momentum scrolling.
      display: 'flex'
    },

    /* Styles applied to the root element if `orientation="vertical"`. */
    vertical: {
      flexDirection: 'column'
    },

    /* Styles applied to the flex container element. */
    flexContainer: {
      display: 'flex'
    },

    /* Styles applied to the flex container element if `orientation="vertical"`. */
    flexContainerVertical: {
      flexDirection: 'column'
    },

    /* Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`. */
    centered: {
      justifyContent: 'center'
    },

    /* Styles applied to the tablist element. */
    scroller: {
      position: 'relative',
      display: 'inline-block',
      flex: '1 1 auto',
      whiteSpace: 'nowrap'
    },

    /* Styles applied to the tablist element if `!variant="scrollable"`. */
    fixed: {
      overflowX: 'hidden',
      width: '100%'
    },

    /* Styles applied to the tablist element if `variant="scrollable"`. */
    scrollable: {
      overflowX: 'scroll',
      // Hide dimensionless scrollbar on MacOS
      scrollbarWidth: 'none',
      // Firefox
      '&::-webkit-scrollbar': {
        display: 'none' // Safari + Chrome

      }
    },

    /* Styles applied to the `ScrollButtonComponent` component. */
    scrollButtons: {},

    /* Styles applied to the `ScrollButtonComponent` component if `scrollButtons="auto"` or scrollButtons="desktop"`. */
    scrollButtonsDesktop: _defineProperty({}, theme.breakpoints.down('xs'), {
      display: 'none'
    }),

    /* Styles applied to the `TabIndicator` component. */
    indicator: {}
  };
};
var Tabs = /*#__PURE__*/forwardRef(function Tabs(props, ref) {
  var ariaLabel = props['aria-label'],
      ariaLabelledBy = props['aria-labelledby'],
      action = props.action,
      _props$centered = props.centered,
      centered = _props$centered === void 0 ? false : _props$centered,
      childrenProp = props.children,
      classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$indicatorColor = props.indicatorColor,
      indicatorColor = _props$indicatorColor === void 0 ? 'secondary' : _props$indicatorColor,
      onChange = props.onChange,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
      _props$ScrollButtonCo = props.ScrollButtonComponent,
      ScrollButtonComponent = _props$ScrollButtonCo === void 0 ? TabScrollButton$1 : _props$ScrollButtonCo,
      _props$scrollButtons = props.scrollButtons,
      scrollButtons = _props$scrollButtons === void 0 ? 'auto' : _props$scrollButtons,
      selectionFollowsFocus = props.selectionFollowsFocus,
      _props$TabIndicatorPr = props.TabIndicatorProps,
      TabIndicatorProps = _props$TabIndicatorPr === void 0 ? {} : _props$TabIndicatorPr,
      TabScrollButtonProps = props.TabScrollButtonProps,
      _props$textColor = props.textColor,
      textColor = _props$textColor === void 0 ? 'inherit' : _props$textColor,
      value = props.value,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      other = _objectWithoutProperties$1(props, ["aria-label", "aria-labelledby", "action", "centered", "children", "classes", "className", "component", "indicatorColor", "onChange", "orientation", "ScrollButtonComponent", "scrollButtons", "selectionFollowsFocus", "TabIndicatorProps", "TabScrollButtonProps", "textColor", "value", "variant"]);

  var theme = useTheme();
  var scrollable = variant === 'scrollable';
  var isRtl = theme.direction === 'rtl';
  var vertical = orientation === 'vertical';
  var scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  var start = vertical ? 'top' : 'left';
  var end = vertical ? 'bottom' : 'right';
  var clientSize = vertical ? 'clientHeight' : 'clientWidth';
  var size = vertical ? 'height' : 'width';

  if (process.env.NODE_ENV !== 'production') {
    if (centered && scrollable) {
      console.error('Material-UI: You can not use the `centered={true}` and `variant="scrollable"` properties ' + 'at the same time on a `Tabs` component.');
    }
  }

  var _React$useState = useState(false),
      mounted = _React$useState[0],
      setMounted = _React$useState[1];

  var _React$useState2 = useState({}),
      indicatorStyle = _React$useState2[0],
      setIndicatorStyle = _React$useState2[1];

  var _React$useState3 = useState({
    start: false,
    end: false
  }),
      displayScroll = _React$useState3[0],
      setDisplayScroll = _React$useState3[1];

  var _React$useState4 = useState({
    overflow: 'hidden',
    marginBottom: null
  }),
      scrollerStyle = _React$useState4[0],
      setScrollerStyle = _React$useState4[1];

  var valueToIndex = new Map();
  var tabsRef = useRef(null);
  var tabListRef = useRef(null);

  var getTabsMeta = function getTabsMeta() {
    var tabsNode = tabsRef.current;
    var tabsMeta;

    if (tabsNode) {
      var rect = tabsNode.getBoundingClientRect(); // create a new object with ClientRect class props + scrollLeft

      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollLeftNormalized: getNormalizedScrollLeft(tabsNode, theme.direction),
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right
      };
    }

    var tabMeta;

    if (tabsNode && value !== false) {
      var _children = tabListRef.current.children;

      if (_children.length > 0) {
        var tab = _children[valueToIndex.get(value)];

        if (process.env.NODE_ENV !== 'production') {
          if (!tab) {
            console.error(["Material-UI: The value provided to the Tabs component is invalid.", "None of the Tabs' children match with `".concat(value, "`."), valueToIndex.keys ? "You can provide one of the following values: ".concat(Array.from(valueToIndex.keys()).join(', '), ".") : null].join('\n'));
          }
        }

        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }

    return {
      tabsMeta: tabsMeta,
      tabMeta: tabMeta
    };
  };

  var updateIndicatorState = useEventCallback(function () {
    var _newIndicatorStyle;

    var _getTabsMeta = getTabsMeta(),
        tabsMeta = _getTabsMeta.tabsMeta,
        tabMeta = _getTabsMeta.tabMeta;

    var startValue = 0;

    if (tabMeta && tabsMeta) {
      if (vertical) {
        startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
      } else {
        var correction = isRtl ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth : tabsMeta.scrollLeft;
        startValue = tabMeta.left - tabsMeta.left + correction;
      }
    }

    var newIndicatorStyle = (_newIndicatorStyle = {}, _defineProperty(_newIndicatorStyle, start, startValue), _defineProperty(_newIndicatorStyle, size, tabMeta ? tabMeta[size] : 0), _newIndicatorStyle);

    if (isNaN(indicatorStyle[start]) || isNaN(indicatorStyle[size])) {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      var dStart = Math.abs(indicatorStyle[start] - newIndicatorStyle[start]);
      var dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);

      if (dStart >= 1 || dSize >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });

  var scroll = function scroll(scrollValue) {
    animate(scrollStart, tabsRef.current, scrollValue);
  };

  var moveTabsScroll = function moveTabsScroll(delta) {
    var scrollValue = tabsRef.current[scrollStart];

    if (vertical) {
      scrollValue += delta;
    } else {
      scrollValue += delta * (isRtl ? -1 : 1); // Fix for Edge

      scrollValue *= isRtl && detectScrollType() === 'reverse' ? -1 : 1;
    }

    scroll(scrollValue);
  };

  var handleStartScrollClick = function handleStartScrollClick() {
    moveTabsScroll(-tabsRef.current[clientSize]);
  };

  var handleEndScrollClick = function handleEndScrollClick() {
    moveTabsScroll(tabsRef.current[clientSize]);
  };

  var handleScrollbarSizeChange = useCallback(function (scrollbarHeight) {
    setScrollerStyle({
      overflow: null,
      marginBottom: -scrollbarHeight
    });
  }, []);

  var getConditionalElements = function getConditionalElements() {
    var conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable ? /*#__PURE__*/createElement(ScrollbarSize, {
      className: classes.scrollable,
      onChange: handleScrollbarSizeChange
    }) : null;
    var scrollButtonsActive = displayScroll.start || displayScroll.end;
    var showScrollButtons = scrollable && (scrollButtons === 'auto' && scrollButtonsActive || scrollButtons === 'desktop' || scrollButtons === 'on');
    conditionalElements.scrollButtonStart = showScrollButtons ? /*#__PURE__*/createElement(ScrollButtonComponent, _extends({
      orientation: orientation,
      direction: isRtl ? 'right' : 'left',
      onClick: handleStartScrollClick,
      disabled: !displayScroll.start,
      className: clsx(classes.scrollButtons, scrollButtons !== 'on' && classes.scrollButtonsDesktop)
    }, TabScrollButtonProps)) : null;
    conditionalElements.scrollButtonEnd = showScrollButtons ? /*#__PURE__*/createElement(ScrollButtonComponent, _extends({
      orientation: orientation,
      direction: isRtl ? 'left' : 'right',
      onClick: handleEndScrollClick,
      disabled: !displayScroll.end,
      className: clsx(classes.scrollButtons, scrollButtons !== 'on' && classes.scrollButtonsDesktop)
    }, TabScrollButtonProps)) : null;
    return conditionalElements;
  };

  var scrollSelectedIntoView = useEventCallback(function () {
    var _getTabsMeta2 = getTabsMeta(),
        tabsMeta = _getTabsMeta2.tabsMeta,
        tabMeta = _getTabsMeta2.tabMeta;

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta[start] < tabsMeta[start]) {
      // left side of button is out of view
      var nextScrollStart = tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
      scroll(nextScrollStart);
    } else if (tabMeta[end] > tabsMeta[end]) {
      // right side of button is out of view
      var _nextScrollStart = tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);

      scroll(_nextScrollStart);
    }
  });
  var updateScrollButtonState = useEventCallback(function () {
    if (scrollable && scrollButtons !== 'off') {
      var _tabsRef$current = tabsRef.current,
          scrollTop = _tabsRef$current.scrollTop,
          scrollHeight = _tabsRef$current.scrollHeight,
          clientHeight = _tabsRef$current.clientHeight,
          scrollWidth = _tabsRef$current.scrollWidth,
          clientWidth = _tabsRef$current.clientWidth;
      var showStartScroll;
      var showEndScroll;

      if (vertical) {
        showStartScroll = scrollTop > 1;
        showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
      } else {
        var scrollLeft = getNormalizedScrollLeft(tabsRef.current, theme.direction); // use 1 for the potential rounding error with browser zooms.

        showStartScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
        showEndScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
      }

      if (showStartScroll !== displayScroll.start || showEndScroll !== displayScroll.end) {
        setDisplayScroll({
          start: showStartScroll,
          end: showEndScroll
        });
      }
    }
  });
  useEffect(function () {
    var handleResize = debounce(function () {
      updateIndicatorState();
      updateScrollButtonState();
    });
    var win = ownerWindow(tabsRef.current);
    win.addEventListener('resize', handleResize);
    return function () {
      handleResize.clear();
      win.removeEventListener('resize', handleResize);
    };
  }, [updateIndicatorState, updateScrollButtonState]);
  var handleTabsScroll = useCallback(debounce(function () {
    updateScrollButtonState();
  }));
  useEffect(function () {
    return function () {
      handleTabsScroll.clear();
    };
  }, [handleTabsScroll]);
  useEffect(function () {
    setMounted(true);
  }, []);
  useEffect(function () {
    updateIndicatorState();
    updateScrollButtonState();
  });
  useEffect(function () {
    scrollSelectedIntoView();
  }, [scrollSelectedIntoView, indicatorStyle]);
  useImperativeHandle(action, function () {
    return {
      updateIndicator: updateIndicatorState,
      updateScrollButtons: updateScrollButtonState
    };
  }, [updateIndicatorState, updateScrollButtonState]);
  var indicator = /*#__PURE__*/createElement(TabIndicator$1, _extends({
    className: classes.indicator,
    orientation: orientation,
    color: indicatorColor
  }, TabIndicatorProps, {
    style: _extends({}, indicatorStyle, TabIndicatorProps.style)
  }));
  var childIndex = 0;
  var children = Children.map(childrenProp, function (child) {
    if (! /*#__PURE__*/isValidElement(child)) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (reactIs.isFragment(child)) {
        console.error(["Material-UI: The Tabs component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    var childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    var selected = childValue === value;
    childIndex += 1;
    return /*#__PURE__*/cloneElement(child, {
      fullWidth: variant === 'fullWidth',
      indicator: selected && !mounted && indicator,
      selected: selected,
      selectionFollowsFocus: selectionFollowsFocus,
      onChange: onChange,
      textColor: textColor,
      value: childValue
    });
  });

  var handleKeyDown = function handleKeyDown(event) {
    var target = event.target; // Keyboard navigation assumes that [role="tab"] are siblings
    // though we might warn in the future about nested, interactive elements
    // as a a11y violation

    var role = target.getAttribute('role');

    if (role !== 'tab') {
      return;
    }

    var newFocusTarget = null;
    var previousItemKey = orientation !== "vertical" ? 'ArrowLeft' : 'ArrowUp';
    var nextItemKey = orientation !== "vertical" ? 'ArrowRight' : 'ArrowDown';

    if (orientation !== "vertical" && theme.direction === 'rtl') {
      // swap previousItemKey with nextItemKey
      previousItemKey = 'ArrowRight';
      nextItemKey = 'ArrowLeft';
    }

    switch (event.key) {
      case previousItemKey:
        newFocusTarget = target.previousElementSibling || tabListRef.current.lastChild;
        break;

      case nextItemKey:
        newFocusTarget = target.nextElementSibling || tabListRef.current.firstChild;
        break;

      case 'Home':
        newFocusTarget = tabListRef.current.firstChild;
        break;

      case 'End':
        newFocusTarget = tabListRef.current.lastChild;
        break;
    }

    if (newFocusTarget !== null) {
      newFocusTarget.focus();
      event.preventDefault();
    }
  };

  var conditionalElements = getConditionalElements();
  return /*#__PURE__*/createElement(Component, _extends({
    className: clsx(classes.root, className, vertical && classes.vertical),
    ref: ref
  }, other), conditionalElements.scrollButtonStart, conditionalElements.scrollbarSizeListener, /*#__PURE__*/createElement("div", {
    className: clsx(classes.scroller, scrollable ? classes.scrollable : classes.fixed),
    style: scrollerStyle,
    ref: tabsRef,
    onScroll: handleTabsScroll
  }, /*#__PURE__*/createElement("div", {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    className: clsx(classes.flexContainer, vertical && classes.flexContainerVertical, centered && !scrollable && classes.centered),
    onKeyDown: handleKeyDown,
    ref: tabListRef,
    role: "tablist"
  }, children), mounted && indicator), conditionalElements.scrollButtonEnd);
});
process.env.NODE_ENV !== "production" ? Tabs.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It supports two actions: `updateIndicator()` and `updateScrollButtons()`
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: refType,

  /**
   * The label for the Tabs as a string.
   */
  'aria-label': propTypes.string,

  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  'aria-labelledby': propTypes.string,

  /**
   * If `true`, the tabs will be centered.
   * This property is intended for large views.
   */
  centered: propTypes.bool,

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
  .elementType,

  /**
   * Determines the color of the indicator.
   */
  indicatorColor: propTypes.oneOf(['primary', 'secondary']),

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value We default to the index of the child (number)
   */
  onChange: propTypes.func,

  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: propTypes.oneOf(['horizontal', 'vertical']),

  /**
   * The component used to render the scroll buttons.
   */
  ScrollButtonComponent: propTypes.elementType,

  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `desktop` will only present them on medium and larger viewports.
   * - `on` will always present them.
   * - `off` will never present them.
   */
  scrollButtons: propTypes.oneOf(['auto', 'desktop', 'off', 'on']),

  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: propTypes.bool,

  /**
   * Props applied to the tab indicator element.
   */
  TabIndicatorProps: propTypes.object,

  /**
   * Props applied to the [`TabScrollButton`](/api/tab-scroll-button/) element.
   */
  TabScrollButtonProps: propTypes.object,

  /**
   * Determines the color of the `Tab`.
   */
  textColor: propTypes.oneOf(['inherit', 'primary', 'secondary']),

  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  value: propTypes.any,

  /**
   * Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  -`fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   */
  variant: propTypes.oneOf(['fullWidth', 'scrollable', 'standard'])
} : void 0;
var Tabs$1 = withStyles(styles$4, {
  name: 'MuiTabs'
})(Tabs);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var interopRequireDefault = _interopRequireDefault;

var _extends_1 = createCommonjsModule(function (module) {
  function _extends() {
    module.exports = _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  module.exports = _extends;
});

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var objectWithoutProperties = _objectWithoutProperties;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof2 = function _typeof2(obj) {
        return typeof obj;
      };
    } else {
      _typeof2 = function _typeof2(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof2(obj);
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
});

var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
});

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
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = process.env.NODE_ENV !== 'production';

var warning = function () {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);

    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
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

  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);

    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

var warning_1 = warning;

function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var interopRequireDefault$1 = _interopRequireDefault$1;

var checkIndexBounds_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _react = interopRequireDefault$1(React);

  var _warning = interopRequireDefault$1(warning_1);

  var checkIndexBounds = function checkIndexBounds(props) {
    var index = props.index,
        children = props.children;

    var childrenCount = _react.default.Children.count(children);

    process.env.NODE_ENV !== "production" ? (0, _warning.default)(index >= 0 && index <= childrenCount, "react-swipeable-view: the new index: ".concat(index, " is out of bounds: [0-").concat(childrenCount, "].")) : void 0;
  };

  var _default = checkIndexBounds;
  exports.default = _default;
});

var constant = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _default = {
    RESISTANCE_COEF: 0.6,
    // This value is closed to what browsers are using internally to
    // trigger a native scroll.
    UNCERTAINTY_THRESHOLD: 3 // px

  };
  exports.default = _default;
});

var _default = computeIndex;

var _react = interopRequireDefault$1(React);

var _constant = interopRequireDefault$1(constant);

function computeIndex(params) {
  var children = params.children,
      startIndex = params.startIndex,
      startX = params.startX,
      pageX = params.pageX,
      viewLength = params.viewLength,
      resistance = params.resistance;
  var indexMax = _react.default.Children.count(children) - 1;
  var index = startIndex + (startX - pageX) / viewLength;
  var newStartX;

  if (!resistance) {
    // Reset the starting point
    if (index < 0) {
      index = 0;
      newStartX = (index - startIndex) * viewLength + pageX;
    } else if (index > indexMax) {
      index = indexMax;
      newStartX = (index - startIndex) * viewLength + pageX;
    }
  } else if (index < 0) {
    index = Math.exp(index * _constant.default.RESISTANCE_COEF) - 1;
  } else if (index > indexMax) {
    index = indexMax + 1 - Math.exp((indexMax - index) * _constant.default.RESISTANCE_COEF);
  }

  return {
    index: index,
    startX: newStartX
  };
}

var computeIndex_1 = /*#__PURE__*/Object.defineProperty({
  default: _default
}, '__esModule', {
  value: true
});

var getDisplaySameSlide_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _react = interopRequireDefault$1(React);

  var getDisplaySameSlide = function getDisplaySameSlide(props, nextProps) {
    var displaySameSlide = false;

    var getChildrenKey = function getChildrenKey(child) {
      return child ? child.key : 'empty';
    };

    if (props.children.length && nextProps.children.length) {
      var oldKeys = _react.default.Children.map(props.children, getChildrenKey);

      var oldKey = oldKeys[props.index];

      if (oldKey !== null && oldKey !== undefined) {
        var newKeys = _react.default.Children.map(nextProps.children, getChildrenKey);

        var newKey = newKeys[nextProps.index];

        if (oldKey === newKey) {
          displaySameSlide = true;
        }
      }
    }

    return displaySameSlide;
  };

  var _default = getDisplaySameSlide;
  exports.default = _default;
});

var mod_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0; // Extended version of % with negative integer support.

  function mod(n, m) {
    var q = n % m;
    return q < 0 ? q + m : q;
  }

  var _default = mod;
  exports.default = _default;
});

var lib = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "checkIndexBounds", {
    enumerable: true,
    get: function get() {
      return _checkIndexBounds.default;
    }
  });
  Object.defineProperty(exports, "computeIndex", {
    enumerable: true,
    get: function get() {
      return _computeIndex.default;
    }
  });
  Object.defineProperty(exports, "constant", {
    enumerable: true,
    get: function get() {
      return _constant.default;
    }
  });
  Object.defineProperty(exports, "getDisplaySameSlide", {
    enumerable: true,
    get: function get() {
      return _getDisplaySameSlide.default;
    }
  });
  Object.defineProperty(exports, "mod", {
    enumerable: true,
    get: function get() {
      return _mod.default;
    }
  });

  var _checkIndexBounds = interopRequireDefault$1(checkIndexBounds_1);

  var _computeIndex = interopRequireDefault$1(computeIndex_1);

  var _constant = interopRequireDefault$1(constant);

  var _getDisplaySameSlide = interopRequireDefault$1(getDisplaySameSlide_1);

  var _mod = interopRequireDefault$1(mod_1);
});

var SwipeableViews_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getDomTreeShapes = getDomTreeShapes;
  exports.findNativeHandler = findNativeHandler;
  exports.default = void 0;

  var _extends2 = interopRequireDefault(_extends_1);

  var _objectWithoutProperties2 = interopRequireDefault(objectWithoutProperties);

  var _classCallCheck2 = interopRequireDefault(classCallCheck);

  var _createClass2 = interopRequireDefault(createClass);

  var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

  var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

  var _inherits2 = interopRequireDefault(inherits);

  var _react = interopRequireDefault(React);

  var _propTypes = interopRequireDefault(propTypes);

  var _warning = interopRequireDefault(warning_1);

  function addEventListener(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return {
      remove: function remove() {
        node.removeEventListener(event, handler, options);
      }
    };
  }

  var styles = {
    container: {
      direction: 'ltr',
      display: 'flex',
      willChange: 'transform'
    },
    slide: {
      width: '100%',
      WebkitFlexShrink: 0,
      flexShrink: 0,
      overflow: 'auto'
    }
  };
  var axisProperties = {
    root: {
      x: {
        overflowX: 'hidden'
      },
      'x-reverse': {
        overflowX: 'hidden'
      },
      y: {
        overflowY: 'hidden'
      },
      'y-reverse': {
        overflowY: 'hidden'
      }
    },
    flexDirection: {
      x: 'row',
      'x-reverse': 'row-reverse',
      y: 'column',
      'y-reverse': 'column-reverse'
    },
    transform: {
      x: function x(translate) {
        return "translate(".concat(-translate, "%, 0)");
      },
      'x-reverse': function xReverse(translate) {
        return "translate(".concat(translate, "%, 0)");
      },
      y: function y(translate) {
        return "translate(0, ".concat(-translate, "%)");
      },
      'y-reverse': function yReverse(translate) {
        return "translate(0, ".concat(translate, "%)");
      }
    },
    length: {
      x: 'width',
      'x-reverse': 'width',
      y: 'height',
      'y-reverse': 'height'
    },
    rotationMatrix: {
      x: {
        x: [1, 0],
        y: [0, 1]
      },
      'x-reverse': {
        x: [-1, 0],
        y: [0, 1]
      },
      y: {
        x: [0, 1],
        y: [1, 0]
      },
      'y-reverse': {
        x: [0, -1],
        y: [1, 0]
      }
    },
    scrollPosition: {
      x: 'scrollLeft',
      'x-reverse': 'scrollLeft',
      y: 'scrollTop',
      'y-reverse': 'scrollTop'
    },
    scrollLength: {
      x: 'scrollWidth',
      'x-reverse': 'scrollWidth',
      y: 'scrollHeight',
      'y-reverse': 'scrollHeight'
    },
    clientLength: {
      x: 'clientWidth',
      'x-reverse': 'clientWidth',
      y: 'clientHeight',
      'y-reverse': 'clientHeight'
    }
  };

  function createTransition(property, options) {
    var duration = options.duration,
        easeFunction = options.easeFunction,
        delay = options.delay;
    return "".concat(property, " ").concat(duration, " ").concat(easeFunction, " ").concat(delay);
  } // We are using a 2x2 rotation matrix.


  function applyRotationMatrix(touch, axis) {
    var rotationMatrix = axisProperties.rotationMatrix[axis];
    return {
      pageX: rotationMatrix.x[0] * touch.pageX + rotationMatrix.x[1] * touch.pageY,
      pageY: rotationMatrix.y[0] * touch.pageX + rotationMatrix.y[1] * touch.pageY
    };
  }

  function adaptMouse(event) {
    event.touches = [{
      pageX: event.pageX,
      pageY: event.pageY
    }];
    return event;
  }

  function getDomTreeShapes(element, rootNode) {
    var domTreeShapes = [];

    while (element && element !== rootNode) {
      // We reach a Swipeable View, no need to look higher in the dom tree.
      if (element.hasAttribute('data-swipeable')) {
        break;
      }

      var style = window.getComputedStyle(element);

      if ( // Ignore the scroll children if the element is absolute positioned.
      style.getPropertyValue('position') === 'absolute' || // Ignore the scroll children if the element has an overflowX hidden
      style.getPropertyValue('overflow-x') === 'hidden') {
        domTreeShapes = [];
      } else if (element.clientWidth > 0 && element.scrollWidth > element.clientWidth || element.clientHeight > 0 && element.scrollHeight > element.clientHeight) {
        // Ignore the nodes that have no width.
        // Keep elements with a scroll
        domTreeShapes.push({
          element: element,
          scrollWidth: element.scrollWidth,
          scrollHeight: element.scrollHeight,
          clientWidth: element.clientWidth,
          clientHeight: element.clientHeight,
          scrollLeft: element.scrollLeft,
          scrollTop: element.scrollTop
        });
      }

      element = element.parentNode;
    }

    return domTreeShapes;
  } // We can only have one node at the time claiming ownership for handling the swipe.
  // Otherwise, the UX would be confusing.
  // That's why we use a singleton here.


  var nodeWhoClaimedTheScroll = null;

  function findNativeHandler(params) {
    var domTreeShapes = params.domTreeShapes,
        pageX = params.pageX,
        startX = params.startX,
        axis = params.axis;
    return domTreeShapes.some(function (shape) {
      // Determine if we are going backward or forward.
      var goingForward = pageX >= startX;

      if (axis === 'x' || axis === 'y') {
        goingForward = !goingForward;
      }

      var scrollPosition = shape[axisProperties.scrollPosition[axis]];
      var areNotAtStart = scrollPosition > 0;
      var areNotAtEnd = scrollPosition + shape[axisProperties.clientLength[axis]] < shape[axisProperties.scrollLength[axis]];

      if (goingForward && areNotAtEnd || !goingForward && areNotAtStart) {
        nodeWhoClaimedTheScroll = shape.element;
        return true;
      }

      return false;
    });
  }

  var SwipeableViews = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2.default)(SwipeableViews, _React$Component);

    function SwipeableViews(props) {
      var _this;

      (0, _classCallCheck2.default)(this, SwipeableViews);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SwipeableViews).call(this, props));
      _this.rootNode = null;
      _this.containerNode = null;
      _this.ignoreNextScrollEvents = false;
      _this.viewLength = 0;
      _this.startX = 0;
      _this.lastX = 0;
      _this.vx = 0;
      _this.startY = 0;
      _this.isSwiping = undefined;
      _this.started = false;
      _this.startIndex = 0;
      _this.transitionListener = null;
      _this.touchMoveListener = null;
      _this.activeSlide = null;
      _this.indexCurrent = null;
      _this.firstRenderTimeout = null;

      _this.setRootNode = function (node) {
        _this.rootNode = node;
      };

      _this.setContainerNode = function (node) {
        _this.containerNode = node;
      };

      _this.setActiveSlide = function (node) {
        _this.activeSlide = node;

        _this.updateHeight();
      };

      _this.handleSwipeStart = function (event) {
        var axis = _this.props.axis;
        var touch = applyRotationMatrix(event.touches[0], axis);
        _this.viewLength = _this.rootNode.getBoundingClientRect()[axisProperties.length[axis]];
        _this.startX = touch.pageX;
        _this.lastX = touch.pageX;
        _this.vx = 0;
        _this.startY = touch.pageY;
        _this.isSwiping = undefined;
        _this.started = true;
        var computedStyle = window.getComputedStyle(_this.containerNode);
        var transform = computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');

        if (transform && transform !== 'none') {
          var transformValues = transform.split('(')[1].split(')')[0].split(',');
          var rootStyle = window.getComputedStyle(_this.rootNode);
          var tranformNormalized = applyRotationMatrix({
            pageX: parseInt(transformValues[4], 10),
            pageY: parseInt(transformValues[5], 10)
          }, axis);
          _this.startIndex = -tranformNormalized.pageX / (_this.viewLength - parseInt(rootStyle.paddingLeft, 10) - parseInt(rootStyle.paddingRight, 10)) || 0;
        }
      };

      _this.handleSwipeMove = function (event) {
        // The touch start event can be cancel.
        // Makes sure we set a starting point.
        if (!_this.started) {
          _this.handleTouchStart(event);

          return;
        } // We are not supposed to hanlde this touch move.


        if (nodeWhoClaimedTheScroll !== null && nodeWhoClaimedTheScroll !== _this.rootNode) {
          return;
        }

        var _this$props = _this.props,
            axis = _this$props.axis,
            children = _this$props.children,
            ignoreNativeScroll = _this$props.ignoreNativeScroll,
            onSwitching = _this$props.onSwitching,
            resistance = _this$props.resistance;
        var touch = applyRotationMatrix(event.touches[0], axis); // We don't know yet.

        if (_this.isSwiping === undefined) {
          var dx = Math.abs(touch.pageX - _this.startX);
          var dy = Math.abs(touch.pageY - _this.startY);
          var isSwiping = dx > dy && dx > lib.constant.UNCERTAINTY_THRESHOLD; // We let the parent handle the scroll.

          if (!resistance && (axis === 'y' || axis === 'y-reverse') && (_this.indexCurrent === 0 && _this.startX < touch.pageX || _this.indexCurrent === _react.default.Children.count(_this.props.children) - 1 && _this.startX > touch.pageX)) {
            _this.isSwiping = false;
            return;
          } // We are likely to be swiping, let's prevent the scroll event.


          if (dx > dy) {
            event.preventDefault();
          }

          if (isSwiping === true || dy > lib.constant.UNCERTAINTY_THRESHOLD) {
            _this.isSwiping = isSwiping;
            _this.startX = touch.pageX; // Shift the starting point.

            return; // Let's wait the next touch event to move something.
          }
        }

        if (_this.isSwiping !== true) {
          return;
        } // We are swiping, let's prevent the scroll event.


        event.preventDefault(); // Low Pass filter.

        _this.vx = _this.vx * 0.5 + (touch.pageX - _this.lastX) * 0.5;
        _this.lastX = touch.pageX;

        var _computeIndex = (0, lib.computeIndex)({
          children: children,
          resistance: resistance,
          pageX: touch.pageX,
          startIndex: _this.startIndex,
          startX: _this.startX,
          viewLength: _this.viewLength
        }),
            index = _computeIndex.index,
            startX = _computeIndex.startX; // Add support for native scroll elements.


        if (nodeWhoClaimedTheScroll === null && !ignoreNativeScroll) {
          var domTreeShapes = getDomTreeShapes(event.target, _this.rootNode);
          var hasFoundNativeHandler = findNativeHandler({
            domTreeShapes: domTreeShapes,
            startX: _this.startX,
            pageX: touch.pageX,
            axis: axis
          }); // We abort the touch move handler.

          if (hasFoundNativeHandler) {
            return;
          }
        } // We are moving toward the edges.


        if (startX) {
          _this.startX = startX;
        } else if (nodeWhoClaimedTheScroll === null) {
          nodeWhoClaimedTheScroll = _this.rootNode;
        }

        _this.setIndexCurrent(index);

        var callback = function callback() {
          if (onSwitching) {
            onSwitching(index, 'move');
          }
        };

        if (_this.state.displaySameSlide || !_this.state.isDragging) {
          _this.setState({
            displaySameSlide: false,
            isDragging: true
          }, callback);
        }

        callback();
      };

      _this.handleSwipeEnd = function () {
        nodeWhoClaimedTheScroll = null; // The touch start event can be cancel.
        // Makes sure that a starting point is set.

        if (!_this.started) {
          return;
        }

        _this.started = false;

        if (_this.isSwiping !== true) {
          return;
        }

        var indexLatest = _this.state.indexLatest;
        var indexCurrent = _this.indexCurrent;
        var delta = indexLatest - indexCurrent;
        var indexNew; // Quick movement

        if (Math.abs(_this.vx) > _this.props.threshold) {
          if (_this.vx > 0) {
            indexNew = Math.floor(indexCurrent);
          } else {
            indexNew = Math.ceil(indexCurrent);
          }
        } else if (Math.abs(delta) > _this.props.hysteresis) {
          // Some hysteresis with indexLatest.
          indexNew = delta > 0 ? Math.floor(indexCurrent) : Math.ceil(indexCurrent);
        } else {
          indexNew = indexLatest;
        }

        var indexMax = _react.default.Children.count(_this.props.children) - 1;

        if (indexNew < 0) {
          indexNew = 0;
        } else if (indexNew > indexMax) {
          indexNew = indexMax;
        }

        _this.setIndexCurrent(indexNew);

        _this.setState({
          indexLatest: indexNew,
          isDragging: false
        }, function () {
          if (_this.props.onSwitching) {
            _this.props.onSwitching(indexNew, 'end');
          }

          if (_this.props.onChangeIndex && indexNew !== indexLatest) {
            _this.props.onChangeIndex(indexNew, indexLatest, {
              reason: 'swipe'
            });
          } // Manually calling handleTransitionEnd in that case as isn't otherwise.


          if (indexCurrent === indexLatest) {
            _this.handleTransitionEnd();
          }
        });
      };

      _this.handleTouchStart = function (event) {
        if (_this.props.onTouchStart) {
          _this.props.onTouchStart(event);
        }

        _this.handleSwipeStart(event);
      };

      _this.handleTouchEnd = function (event) {
        if (_this.props.onTouchEnd) {
          _this.props.onTouchEnd(event);
        }

        _this.handleSwipeEnd(event);
      };

      _this.handleMouseDown = function (event) {
        if (_this.props.onMouseDown) {
          _this.props.onMouseDown(event);
        }

        event.persist();

        _this.handleSwipeStart(adaptMouse(event));
      };

      _this.handleMouseUp = function (event) {
        if (_this.props.onMouseUp) {
          _this.props.onMouseUp(event);
        }

        _this.handleSwipeEnd(adaptMouse(event));
      };

      _this.handleMouseLeave = function (event) {
        if (_this.props.onMouseLeave) {
          _this.props.onMouseLeave(event);
        } // Filter out events


        if (_this.started) {
          _this.handleSwipeEnd(adaptMouse(event));
        }
      };

      _this.handleMouseMove = function (event) {
        if (_this.props.onMouseMove) {
          _this.props.onMouseMove(event);
        } // Filter out events


        if (_this.started) {
          _this.handleSwipeMove(adaptMouse(event));
        }
      };

      _this.handleScroll = function (event) {
        if (_this.props.onScroll) {
          _this.props.onScroll(event);
        } // Ignore events bubbling up.


        if (event.target !== _this.rootNode) {
          return;
        }

        if (_this.ignoreNextScrollEvents) {
          _this.ignoreNextScrollEvents = false;
          return;
        }

        var indexLatest = _this.state.indexLatest;
        var indexNew = Math.ceil(event.target.scrollLeft / event.target.clientWidth) + indexLatest;
        _this.ignoreNextScrollEvents = true; // Reset the scroll position.

        event.target.scrollLeft = 0;

        if (_this.props.onChangeIndex && indexNew !== indexLatest) {
          _this.props.onChangeIndex(indexNew, indexLatest, {
            reason: 'focus'
          });
        }
      };

      _this.updateHeight = function () {
        if (_this.activeSlide !== null) {
          var child = _this.activeSlide.children[0];

          if (child !== undefined && child.offsetHeight !== undefined && _this.state.heightLatest !== child.offsetHeight) {
            _this.setState({
              heightLatest: child.offsetHeight
            });
          }
        }
      };

      if (process.env.NODE_ENV !== 'production') {
        (0, lib.checkIndexBounds)(props);
      }

      _this.state = {
        indexLatest: props.index,
        // Set to true as soon as the component is swiping.
        // It's the state counter part of this.isSwiping.
        isDragging: false,
        // Help with SSR logic and lazy loading logic.
        renderOnlyActive: !props.disableLazyLoading,
        heightLatest: 0,
        // Let the render method that we are going to display the same slide than previously.
        displaySameSlide: true
      };

      _this.setIndexCurrent(props.index);

      return _this;
    }

    (0, _createClass2.default)(SwipeableViews, [{
      key: "getChildContext",
      value: function getChildContext() {
        var _this2 = this;

        return {
          swipeableViews: {
            slideUpdateHeight: function slideUpdateHeight() {
              _this2.updateHeight();
            }
          }
        };
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this3 = this; // Subscribe to transition end events.


        this.transitionListener = addEventListener(this.containerNode, 'transitionend', function (event) {
          if (event.target !== _this3.containerNode) {
            return;
          }

          _this3.handleTransitionEnd();
        }); // Block the thread to handle that event.

        this.touchMoveListener = addEventListener(this.rootNode, 'touchmove', function (event) {
          // Handling touch events is disabled.
          if (_this3.props.disabled) {
            return;
          }

          _this3.handleSwipeMove(event);
        }, {
          passive: false
        });

        if (!this.props.disableLazyLoading) {
          this.firstRenderTimeout = setTimeout(function () {
            _this3.setState({
              renderOnlyActive: false
            });
          }, 0);
        } // Send all functions in an object if action param is set.


        if (this.props.action) {
          this.props.action({
            updateHeight: this.updateHeight
          });
        }
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var index = nextProps.index;

        if (typeof index === 'number' && index !== this.props.index) {
          if (process.env.NODE_ENV !== 'production') {
            (0, lib.checkIndexBounds)(nextProps);
          }

          this.setIndexCurrent(index);
          this.setState({
            // If true, we are going to change the children. We shoudn't animate it.
            displaySameSlide: (0, lib.getDisplaySameSlide)(this.props, nextProps),
            indexLatest: index
          });
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.transitionListener.remove();
        this.touchMoveListener.remove();
        clearTimeout(this.firstRenderTimeout);
      }
    }, {
      key: "setIndexCurrent",
      value: function setIndexCurrent(indexCurrent) {
        if (!this.props.animateTransitions && this.indexCurrent !== indexCurrent) {
          this.handleTransitionEnd();
        }

        this.indexCurrent = indexCurrent;

        if (this.containerNode) {
          var axis = this.props.axis;
          var transform = axisProperties.transform[axis](indexCurrent * 100);
          this.containerNode.style.WebkitTransform = transform;
          this.containerNode.style.transform = transform;
        }
      }
    }, {
      key: "handleTransitionEnd",
      value: function handleTransitionEnd() {
        if (!this.props.onTransitionEnd) {
          return;
        } // Filters out when changing the children


        if (this.state.displaySameSlide) {
          return;
        } // The rest callback is triggered when swiping. It's just noise.
        // We filter it out.


        if (!this.state.isDragging) {
          this.props.onTransitionEnd();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var _this$props2 = this.props;
            _this$props2.action;
            var animateHeight = _this$props2.animateHeight,
            animateTransitions = _this$props2.animateTransitions,
            axis = _this$props2.axis,
            children = _this$props2.children,
            containerStyleProp = _this$props2.containerStyle,
            disabled = _this$props2.disabled;
            _this$props2.disableLazyLoading;
            var enableMouseEvents = _this$props2.enableMouseEvents;
            _this$props2.hysteresis;
            _this$props2.ignoreNativeScroll;
            _this$props2.index;
            _this$props2.onChangeIndex;
            _this$props2.onSwitching;
            _this$props2.onTransitionEnd;
            _this$props2.resistance;
            var slideStyleProp = _this$props2.slideStyle,
            slideClassName = _this$props2.slideClassName,
            springConfig = _this$props2.springConfig,
            style = _this$props2.style;
            _this$props2.threshold;
            var other = (0, _objectWithoutProperties2.default)(_this$props2, ["action", "animateHeight", "animateTransitions", "axis", "children", "containerStyle", "disabled", "disableLazyLoading", "enableMouseEvents", "hysteresis", "ignoreNativeScroll", "index", "onChangeIndex", "onSwitching", "onTransitionEnd", "resistance", "slideStyle", "slideClassName", "springConfig", "style", "threshold"]);
        var _this$state = this.state,
            displaySameSlide = _this$state.displaySameSlide,
            heightLatest = _this$state.heightLatest,
            indexLatest = _this$state.indexLatest,
            isDragging = _this$state.isDragging,
            renderOnlyActive = _this$state.renderOnlyActive;
        var touchEvents = !disabled ? {
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        } : {};
        var mouseEvents = !disabled && enableMouseEvents ? {
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp,
          onMouseLeave: this.handleMouseLeave,
          onMouseMove: this.handleMouseMove
        } : {}; // There is no point to animate if we are already providing a height.

        process.env.NODE_ENV !== "production" ? (0, _warning.default)(!animateHeight || !containerStyleProp || !containerStyleProp.height, "react-swipeable-view: You are setting animateHeight to true but you are\nalso providing a custom height.\nThe custom height has a higher priority than the animateHeight property.\nSo animateHeight is most likely having no effect at all.") : void 0;
        var slideStyle = (0, _extends2.default)({}, styles.slide, slideStyleProp);
        var transition;
        var WebkitTransition;

        if (isDragging || !animateTransitions || displaySameSlide) {
          transition = 'all 0s ease 0s';
          WebkitTransition = 'all 0s ease 0s';
        } else {
          transition = createTransition('transform', springConfig);
          WebkitTransition = createTransition('-webkit-transform', springConfig);

          if (heightLatest !== 0) {
            var additionalTranstion = ", ".concat(createTransition('height', springConfig));
            transition += additionalTranstion;
            WebkitTransition += additionalTranstion;
          }
        }

        var containerStyle = {
          height: null,
          WebkitFlexDirection: axisProperties.flexDirection[axis],
          flexDirection: axisProperties.flexDirection[axis],
          WebkitTransition: WebkitTransition,
          transition: transition
        }; // Apply the styles for SSR considerations

        if (!renderOnlyActive) {
          var transform = axisProperties.transform[axis](this.indexCurrent * 100);
          containerStyle.WebkitTransform = transform;
          containerStyle.transform = transform;
        }

        if (animateHeight) {
          containerStyle.height = heightLatest;
        }

        return _react.default.createElement("div", (0, _extends2.default)({
          ref: this.setRootNode,
          style: (0, _extends2.default)({}, axisProperties.root[axis], style)
        }, other, touchEvents, mouseEvents, {
          onScroll: this.handleScroll
        }), _react.default.createElement("div", {
          ref: this.setContainerNode,
          style: (0, _extends2.default)({}, containerStyle, styles.container, containerStyleProp),
          className: "react-swipeable-view-container"
        }, _react.default.Children.map(children, function (child, indexChild) {
          if (renderOnlyActive && indexChild !== indexLatest) {
            return null;
          }

          process.env.NODE_ENV !== "production" ? (0, _warning.default)(_react.default.isValidElement(child), "react-swipeable-view: one of the children provided is invalid: ".concat(child, ".\nWe are expecting a valid React Element")) : void 0;
          var ref;
          var hidden = true;

          if (indexChild === indexLatest) {
            hidden = false;

            if (animateHeight) {
              ref = _this4.setActiveSlide;
              slideStyle.overflowY = 'hidden';
            }
          }

          return _react.default.createElement("div", {
            ref: ref,
            style: slideStyle,
            className: slideClassName,
            "aria-hidden": hidden,
            "data-swipeable": "true"
          }, child);
        })));
      }
    }]);
    return SwipeableViews;
  }(_react.default.Component); // Added as an ads for people using the React dev tools in production.
  // So they know, the tool used to build the awesome UI they
  // are looking at/retro engineering.


  SwipeableViews.displayName = 'ReactSwipableView';
  SwipeableViews.propTypes = process.env.NODE_ENV !== "production" ? {
    /**
     * This is callback property. It's called by the component on mount.
     * This is useful when you want to trigger an action programmatically.
     * It currently only supports updateHeight() action.
     *
     * @param {object} actions This object contains all posible actions
     * that can be triggered programmatically.
     */
    action: _propTypes.default.func,

    /**
     * If `true`, the height of the container will be animated to match the current slide height.
     * Animating another style property has a negative impact regarding performance.
     */
    animateHeight: _propTypes.default.bool,

    /**
     * If `false`, changes to the index prop will not cause an animated transition.
     */
    animateTransitions: _propTypes.default.bool,

    /**
     * The axis on which the slides will slide.
     */
    axis: _propTypes.default.oneOf(['x', 'x-reverse', 'y', 'y-reverse']),

    /**
     * Use this property to provide your slides.
     */
    children: _propTypes.default.node.isRequired,

    /**
     * This is the inlined style that will be applied
     * to each slide container.
     */
    containerStyle: _propTypes.default.object,

    /**
     * If `true`, it will disable touch events.
     * This is useful when you want to prohibit the user from changing slides.
     */
    disabled: _propTypes.default.bool,

    /**
     * This is the config used to disable lazyloding,
     * if `true` will render all the views in first rendering.
     */
    disableLazyLoading: _propTypes.default.bool,

    /**
     * If `true`, it will enable mouse events.
     * This will allow the user to perform the relevant swipe actions with a mouse.
     */
    enableMouseEvents: _propTypes.default.bool,

    /**
     * Configure hysteresis between slides. This value determines how far
     * should user swipe to switch slide.
     */
    hysteresis: _propTypes.default.number,

    /**
     * If `true`, it will ignore native scroll container.
     * It can be used to filter out false positive that blocks the swipe.
     */
    ignoreNativeScroll: _propTypes.default.bool,

    /**
     * This is the index of the slide to show.
     * This is useful when you want to change the default slide shown.
     * Or when you have tabs linked to each slide.
     */
    index: _propTypes.default.number,

    /**
     * This is callback prop. It's call by the
     * component when the shown slide change after a swipe made by the user.
     * This is useful when you have tabs linked to each slide.
     *
     * @param {integer} index This is the current index of the slide.
     * @param {integer} indexLatest This is the oldest index of the slide.
     * @param {object} meta Meta data containing more information about the event.
     */
    onChangeIndex: _propTypes.default.func,

    /**
     * @ignore
     */
    onMouseDown: _propTypes.default.func,

    /**
     * @ignore
     */
    onMouseLeave: _propTypes.default.func,

    /**
     * @ignore
     */
    onMouseMove: _propTypes.default.func,

    /**
     * @ignore
     */
    onMouseUp: _propTypes.default.func,

    /**
     * @ignore
     */
    onScroll: _propTypes.default.func,

    /**
     * This is callback prop. It's called by the
     * component when the slide switching.
     * This is useful when you want to implement something corresponding
     * to the current slide position.
     *
     * @param {integer} index This is the current index of the slide.
     * @param {string} type Can be either `move` or `end`.
     */
    onSwitching: _propTypes.default.func,

    /**
     * @ignore
     */
    onTouchEnd: _propTypes.default.func,

    /**
     * @ignore
     */
    onTouchMove: _propTypes.default.func,

    /**
     * @ignore
     */
    onTouchStart: _propTypes.default.func,

    /**
     * The callback that fires when the animation comes to a rest.
     * This is useful to defer CPU intensive task.
     */
    onTransitionEnd: _propTypes.default.func,

    /**
     * If `true`, it will add bounds effect on the edges.
     */
    resistance: _propTypes.default.bool,

    /**
     * This is the className that will be applied
     * on the slide component.
     */
    slideClassName: _propTypes.default.string,

    /**
     * This is the inlined style that will be applied
     * on the slide component.
     */
    slideStyle: _propTypes.default.object,

    /**
     * This is the config used to create CSS transitions.
     * This is useful to change the dynamic of the transition.
     */
    springConfig: _propTypes.default.shape({
      delay: _propTypes.default.string,
      duration: _propTypes.default.string,
      easeFunction: _propTypes.default.string
    }),

    /**
     * This is the inlined style that will be applied
     * on the root component.
     */
    style: _propTypes.default.object,

    /**
     * This is the threshold used for detecting a quick swipe.
     * If the computed speed is above this value, the index change.
     */
    threshold: _propTypes.default.number
  } : {};
  SwipeableViews.defaultProps = {
    animateHeight: false,
    animateTransitions: true,
    axis: 'x',
    disabled: false,
    disableLazyLoading: false,
    enableMouseEvents: false,
    hysteresis: 0.6,
    ignoreNativeScroll: false,
    index: 0,
    threshold: 5,
    springConfig: {
      duration: '0.35s',
      easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
      delay: '0s'
    },
    resistance: false
  };
  SwipeableViews.childContextTypes = {
    swipeableViews: _propTypes.default.shape({
      slideUpdateHeight: _propTypes.default.func
    })
  };
  var _default = SwipeableViews;
  exports.default = _default;
});

var lib$1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _SwipeableViews = interopRequireDefault(SwipeableViews_1);

  var _default = _SwipeableViews.default;
  exports.default = _default;
});
var SwipeableViews = /*@__PURE__*/getDefaultExportFromCjs(lib$1);

export { SwipeableViews as S, Tabs$1 as T, Tab$1 as a };
