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

import { p as propTypes$2, w as withStyles, ar as requirePropFactory, a as _extends, _ as _objectWithoutProperties, c as clsx, n as makeStyles, k as jsxRuntime, R as Box, m as __assign, T as Typography, V as axios, I as IconButton, S as Select, a7 as MenuItem, i as __awaiter, j as __generator, g as __read, u as useTheme, X as schemeTypeDisplayNames, B as Button, ad as Fade, aa as _defineProperty, as as _createClass, at as _classCallCheck, au as _assertThisInitialized, L as _slicedToArray, M as _toConsumableArray, Y as Icon, a9 as __spreadArray, av as Scheme, P as Paper, aw as PostType, ax as Taxonomy, a2 as useRouteMatch, f as useHistory, s as services } from './index.lib-5a13d870.js';
import { forwardRef, createElement, useState, createContext, createRef, Component, useEffect } from 'react';
import { o as observer } from './mobxreact.esm-27492834.js';
import { F as FlexSpacer, m, u } from './ColorPalette-2db4de3a.js';
import { s as showDialogAsync } from './showDialog-efa64b8a.js';
import { V as ValidationTextField, e as editors, _ as _inherits, a as _possibleConstructorReturn, b as _getPrototypeOf } from './index-0f67661c.js';
import { F as FileCopy, W as WrappedTextBlock } from './WrappedTextBlock-aa49c795.js';
import { T as TextField } from './TextField-1793ccec.js';
import { findDOMNode } from 'react-dom';
import { c as confirmAsync } from './confirmAsync-a14cdd83.js';
import './index-b0d221d1.js';
import './Add-e4260604.js';
import './Switch-ec8867f0.js';

var SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var GRID_SIZES = ['auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function generateGrid(globalStyles, theme, breakpoint) {
  var styles = {};
  GRID_SIZES.forEach(function (size) {
    var key = "grid-".concat(breakpoint, "-").concat(size);

    if (size === true) {
      // For the auto layouting
      styles[key] = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: '100%'
      };
      return;
    }

    if (size === 'auto') {
      styles[key] = {
        flexBasis: 'auto',
        flexGrow: 0,
        maxWidth: 'none'
      };
      return;
    } // Keep 7 significant numbers.


    var width = "".concat(Math.round(size / 12 * 10e7) / 10e5, "%"); // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41

    styles[key] = {
      flexBasis: width,
      flexGrow: 0,
      maxWidth: width
    };
  }); // No need for a media query for the first size.

  if (breakpoint === 'xs') {
    _extends(globalStyles, styles);
  } else {
    globalStyles[theme.breakpoints.up(breakpoint)] = styles;
  }
}

function getOffset(val) {
  var div = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var parse = parseFloat(val);
  return "".concat(parse / div).concat(String(val).replace(String(parse), '') || 'px');
}

function generateGutter(theme, breakpoint) {
  var styles = {};
  SPACINGS.forEach(function (spacing) {
    var themeSpacing = theme.spacing(spacing);

    if (themeSpacing === 0) {
      return;
    }

    styles["spacing-".concat(breakpoint, "-").concat(spacing)] = {
      margin: "-".concat(getOffset(themeSpacing, 2)),
      width: "calc(100% + ".concat(getOffset(themeSpacing), ")"),
      '& > $item': {
        padding: getOffset(themeSpacing, 2)
      }
    };
  });
  return styles;
} // Default CSS values
// flex: '0 1 auto',
// flexDirection: 'row',
// alignItems: 'flex-start',
// flexWrap: 'nowrap',
// justifyContent: 'flex-start',


var styles = function styles(theme) {
  return _extends({
    /* Styles applied to the root element. */
    root: {},

    /* Styles applied to the root element if `container={true}`. */
    container: {
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%'
    },

    /* Styles applied to the root element if `item={true}`. */
    item: {
      boxSizing: 'border-box',
      margin: '0' // For instance, it's useful when used with a `figure` element.

    },

    /* Styles applied to the root element if `zeroMinWidth={true}`. */
    zeroMinWidth: {
      minWidth: 0
    },

    /* Styles applied to the root element if `direction="column"`. */
    'direction-xs-column': {
      flexDirection: 'column'
    },

    /* Styles applied to the root element if `direction="column-reverse"`. */
    'direction-xs-column-reverse': {
      flexDirection: 'column-reverse'
    },

    /* Styles applied to the root element if `direction="row-reverse"`. */
    'direction-xs-row-reverse': {
      flexDirection: 'row-reverse'
    },

    /* Styles applied to the root element if `wrap="nowrap"`. */
    'wrap-xs-nowrap': {
      flexWrap: 'nowrap'
    },

    /* Styles applied to the root element if `wrap="reverse"`. */
    'wrap-xs-wrap-reverse': {
      flexWrap: 'wrap-reverse'
    },

    /* Styles applied to the root element if `alignItems="center"`. */
    'align-items-xs-center': {
      alignItems: 'center'
    },

    /* Styles applied to the root element if `alignItems="flex-start"`. */
    'align-items-xs-flex-start': {
      alignItems: 'flex-start'
    },

    /* Styles applied to the root element if `alignItems="flex-end"`. */
    'align-items-xs-flex-end': {
      alignItems: 'flex-end'
    },

    /* Styles applied to the root element if `alignItems="baseline"`. */
    'align-items-xs-baseline': {
      alignItems: 'baseline'
    },

    /* Styles applied to the root element if `alignContent="center"`. */
    'align-content-xs-center': {
      alignContent: 'center'
    },

    /* Styles applied to the root element if `alignContent="flex-start"`. */
    'align-content-xs-flex-start': {
      alignContent: 'flex-start'
    },

    /* Styles applied to the root element if `alignContent="flex-end"`. */
    'align-content-xs-flex-end': {
      alignContent: 'flex-end'
    },

    /* Styles applied to the root element if `alignContent="space-between"`. */
    'align-content-xs-space-between': {
      alignContent: 'space-between'
    },

    /* Styles applied to the root element if `alignContent="space-around"`. */
    'align-content-xs-space-around': {
      alignContent: 'space-around'
    },

    /* Styles applied to the root element if `justify="center"`. */
    'justify-xs-center': {
      justifyContent: 'center'
    },

    /* Styles applied to the root element if `justify="flex-end"`. */
    'justify-xs-flex-end': {
      justifyContent: 'flex-end'
    },

    /* Styles applied to the root element if `justify="space-between"`. */
    'justify-xs-space-between': {
      justifyContent: 'space-between'
    },

    /* Styles applied to the root element if `justify="space-around"`. */
    'justify-xs-space-around': {
      justifyContent: 'space-around'
    },

    /* Styles applied to the root element if `justify="space-evenly"`. */
    'justify-xs-space-evenly': {
      justifyContent: 'space-evenly'
    }
  }, generateGutter(theme, 'xs'), theme.breakpoints.keys.reduce(function (accumulator, key) {
    // Use side effect over immutability for better performance.
    generateGrid(accumulator, theme, key);
    return accumulator;
  }, {}));
};
var Grid = /*#__PURE__*/forwardRef(function Grid(props, ref) {
  var _props$alignContent = props.alignContent,
      alignContent = _props$alignContent === void 0 ? 'stretch' : _props$alignContent,
      _props$alignItems = props.alignItems,
      alignItems = _props$alignItems === void 0 ? 'stretch' : _props$alignItems,
      classes = props.classes,
      classNameProp = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$container = props.container,
      container = _props$container === void 0 ? false : _props$container,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'row' : _props$direction,
      _props$item = props.item,
      item = _props$item === void 0 ? false : _props$item,
      _props$justify = props.justify,
      justify = _props$justify === void 0 ? 'flex-start' : _props$justify,
      _props$lg = props.lg,
      lg = _props$lg === void 0 ? false : _props$lg,
      _props$md = props.md,
      md = _props$md === void 0 ? false : _props$md,
      _props$sm = props.sm,
      sm = _props$sm === void 0 ? false : _props$sm,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? 0 : _props$spacing,
      _props$wrap = props.wrap,
      wrap = _props$wrap === void 0 ? 'wrap' : _props$wrap,
      _props$xl = props.xl,
      xl = _props$xl === void 0 ? false : _props$xl,
      _props$xs = props.xs,
      xs = _props$xs === void 0 ? false : _props$xs,
      _props$zeroMinWidth = props.zeroMinWidth,
      zeroMinWidth = _props$zeroMinWidth === void 0 ? false : _props$zeroMinWidth,
      other = _objectWithoutProperties(props, ["alignContent", "alignItems", "classes", "className", "component", "container", "direction", "item", "justify", "lg", "md", "sm", "spacing", "wrap", "xl", "xs", "zeroMinWidth"]);

  var className = clsx(classes.root, classNameProp, container && [classes.container, spacing !== 0 && classes["spacing-xs-".concat(String(spacing))]], item && classes.item, zeroMinWidth && classes.zeroMinWidth, direction !== 'row' && classes["direction-xs-".concat(String(direction))], wrap !== 'wrap' && classes["wrap-xs-".concat(String(wrap))], alignItems !== 'stretch' && classes["align-items-xs-".concat(String(alignItems))], alignContent !== 'stretch' && classes["align-content-xs-".concat(String(alignContent))], justify !== 'flex-start' && classes["justify-xs-".concat(String(justify))], xs !== false && classes["grid-xs-".concat(String(xs))], sm !== false && classes["grid-sm-".concat(String(sm))], md !== false && classes["grid-md-".concat(String(md))], lg !== false && classes["grid-lg-".concat(String(lg))], xl !== false && classes["grid-xl-".concat(String(xl))]);
  return /*#__PURE__*/createElement(Component, _extends({
    className: className,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Grid.propTypes = {
  /**
   * Defines the `align-content` style property.
   * It's applied for all screen sizes.
   */
  alignContent: propTypes$2.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around']),

  /**
   * Defines the `align-items` style property.
   * It's applied for all screen sizes.
   */
  alignItems: propTypes$2.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),

  /**
   * The content of the component.
   */
  children: propTypes$2.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: propTypes$2.object.isRequired,

  /**
   * @ignore
   */
  className: propTypes$2.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes$2
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   */
  container: propTypes$2.bool,

  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   */
  direction: propTypes$2.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),

  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   */
  item: propTypes$2.bool,

  /**
   * Defines the `justify-content` style property.
   * It is applied for all screen sizes.
   */
  justify: propTypes$2.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lg: propTypes$2.oneOf([false, 'auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   */
  md: propTypes$2.oneOf([false, 'auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   */
  sm: propTypes$2.oneOf([false, 'auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),

  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   */
  spacing: propTypes$2.oneOf(SPACINGS),

  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   */
  wrap: propTypes$2.oneOf(['nowrap', 'wrap', 'wrap-reverse']),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   */
  xl: propTypes$2.oneOf([false, 'auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   */
  xs: propTypes$2.oneOf([false, 'auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),

  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   */
  zeroMinWidth: propTypes$2.bool
} : void 0;
var StyledGrid = withStyles(styles, {
  name: 'MuiGrid'
})(Grid);

if (process.env.NODE_ENV !== 'production') {
  var requireProp = requirePropFactory('Grid');
  StyledGrid.propTypes = _extends({}, StyledGrid.propTypes, {
    alignContent: requireProp('container'),
    alignItems: requireProp('container'),
    direction: requireProp('container'),
    justify: requireProp('container'),
    lg: requireProp('item'),
    md: requireProp('item'),
    sm: requireProp('item'),
    spacing: requireProp('container'),
    wrap: requireProp('container'),
    xs: requireProp('item'),
    zeroMinWidth: requireProp('item')
  });
}

function PostTypeBasicSettingPanel(props) {
    var styles = useStyles();
    function handlePostTypeParamsChanged(key, value) {
        var _a;
        props.onChange(props.postType.clone({
            taxonomy: props.postType.taxonomy.clone((_a = {}, _a[key] = value, _a))
        }));
    }
    function copyToClipBoard(text) {
        var _a;
        (_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText(text);
    }
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(Box, __assign({ mt: 3, maxWidth: "960px", width: "100%" }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "h6" }, { children: "\u30BF\u30AF\u30BD\u30CE\u30DF\u30FC" }), void 0),
                    jsxRuntime.jsx(Typography, __assign({ color: "textSecondary", variant: "caption" }, { children: "\u30AF\u30BD\u30CE\u30DF\u30FC\u3068\u306F\u3001\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u5206\u985E\u3059\u308B\u305F\u3081\u306E\u6982\u5FF5\u3067\u3059\u3002\u300C\u30D6\u30ED\u30B0\u300D\u3001\u300C\u304A\u77E5\u3089\u305B\u300D\u3001\u300C\u30EC\u30D3\u30E5\u30FC\u300D\u306A\u3069\u306E\u3088\u3046\u306B\u76EE\u7684\u306B\u5FDC\u3058\u3066\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u5206\u985E\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002" }), void 0)] }), void 0),
            jsxRuntime.jsxs(Box, __assign({ mt: 2, display: "flex", alignItems: "center", width: "100%", maxWidth: "960px" }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "subtitle1", className: styles.itemTitle }, { children: "\u30BF\u30AF\u30BD\u30CE\u30DF\u30FC\u540D" }), void 0),
                    jsxRuntime.jsx(ValidationTextField, { required: true, placeholder: "\u4F8B\uFF1Ablogs", value: props.postType.taxonomy.name, style: { marginTop: "16px" }, rules: /^[A-Za-z0-9-_]*$/, fullWidth: true, helperText: "API\u306E\u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8\u306B\u306A\u308A\u307E\u3059", errorText: "\u82F1\u6570\u5B57\u304A\u3088\u3073-_\u306E\u307F", textChanged: function (e) { return handlePostTypeParamsChanged("name", e.value); } }, void 0)] }), void 0),
            jsxRuntime.jsxs(Box, __assign({ mt: 4, display: "flex", alignItems: "center", width: "100%", maxWidth: "960px" }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "subtitle1", className: styles.itemTitle }, { children: "\u30A8\u30F3\u30C9\u30DD\u30A4\u30F3\u30C8\u540D" }), void 0),
                    jsxRuntime.jsxs(Typography, __assign({ style: { width: "100%", maxWidth: "100%", wordBreak: "break-all" } }, { children: [axios.defaults.baseURL, "contents/", props.postType.taxonomy.name] }), void 0),
                    jsxRuntime.jsx(FlexSpacer, {}, void 0),
                    jsxRuntime.jsx(IconButton, __assign({ color: "primary", size: "small", onClick: function (_) { return copyToClipBoard(axios.defaults.baseURL + "contents/" + props.postType.taxonomy.name); } }, { children: jsxRuntime.jsx(FileCopy, { fontSize: "small" }, void 0) }), void 0)] }), void 0),
            jsxRuntime.jsxs(Box, __assign({ mt: 3, display: "flex", alignItems: "center", width: "100%", maxWidth: "960px" }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "subtitle1", className: styles.itemTitle }, { children: "\u8868\u793A\u540D" }), void 0),
                    jsxRuntime.jsx(ValidationTextField, { required: true, value: props.postType.taxonomy.displayName, style: { marginTop: "16px" }, placeholder: "\u4F8B\uFF1A\u30D6\u30ED\u30B0", helperText: "\u5165\u7A3F\u753B\u9762\u306B\u8868\u793A\u3059\u308B\u540D\u79F0\u3067\u3059\u3002\u5165\u7A3F\u8005\u306B\u3068\u3063\u3066\u308F\u304B\u308A\u3084\u3059\u3044\u8AAC\u660E\u3092\u5165\u529B\u3057\u307E\u3057\u3087\u3046\u3002", fullWidth: true, textChanged: function (e) { return handlePostTypeParamsChanged("displayName", e.value); } }, void 0)] }), void 0),
            jsxRuntime.jsxs(Box, __assign({ mt: 3, display: "flex", alignItems: "center", width: "100%", maxWidth: "960px" }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "subtitle1", className: styles.itemTitle }, { children: "\u5099\u8003" }), void 0),
                    jsxRuntime.jsx(ValidationTextField, { fullWidth: true, style: { marginTop: "24px" }, multiline: true, variant: "filled", placeholder: "\u4F8B\uFF1A\u30D6\u30ED\u30B0\u306E\u6295\u7A3F\u3067\u3059\u3002", rows: 4, helperText: "\u5165\u7A3F\u753B\u9762\u306B\u8868\u793A\u3059\u308B\u8AAC\u660E\u6587\u3067\u3059\u3002\u5165\u7A3F\u8005\u306B\u3068\u3063\u3066\u308F\u304B\u308A\u3084\u3059\u3044\u8AAC\u660E\u3092\u5165\u529B\u3057\u307E\u3057\u3087\u3046\u3002", value: props.postType.taxonomy.description, textChanged: function (e) { return handlePostTypeParamsChanged("description", e.value); } }, void 0)] }), void 0),
            jsxRuntime.jsxs(Box, __assign({ mt: 3, display: "flex", alignItems: "center", width: "100%", maxWidth: "960px" }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "subtitle1", className: styles.itemTitle }, { children: "\u8868\u793A\u5F62\u5F0F" }), void 0),
                    jsxRuntime.jsxs(Box, __assign({ width: "100%" }, { children: [jsxRuntime.jsxs(Select, __assign({ value: props.postType.displayFormat, fullWidth: true, onChange: function (e) { return props.onChange(props.postType.clone({ displayFormat: e.target.value })); } }, { children: [jsxRuntime.jsx(MenuItem, __assign({ value: "table" }, { children: "\u30C6\u30FC\u30D6\u30EB" }), void 0),
                                    jsxRuntime.jsx(MenuItem, __assign({ value: "card" }, { children: "\u30AB\u30FC\u30C9" }), void 0)] }), void 0),
                            jsxRuntime.jsx(Box, { mt: 1 }, void 0),
                            jsxRuntime.jsx(Typography, __assign({ color: "textSecondary", variant: "caption" }, { children: "\u4E00\u89A7\u8868\u793A\u306E\u969B\u306E\u8868\u793A\u5F62\u5F0F" }), void 0)] }), void 0)] }), void 0)] }, void 0));
}
var useStyles = makeStyles({
    itemTitle: {
        width: "320px"
    }
});

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

function SchemeEditor(props) {
    var scheme = props.scheme;
    var editor = editors[scheme.type];
    var Element = editor.schemeEditor;
    function handlePropertyChanged(key, value) {
        var _a;
        props.onChange(scheme.clone((_a = {},
            _a[key] = value,
            _a)));
    }
    if (Element) {
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(Box, __assign({ p: 3 }, { children: [jsxRuntime.jsx(Typography, __assign({ color: "primary" }, { children: editor.name }), void 0),
                        jsxRuntime.jsx(Typography, __assign({ variant: "caption", color: "textSecondary" }, { children: editor.description }), void 0)] }), void 0),
                jsxRuntime.jsxs(Box, __assign({ flex: "1 1 auto", p: 2, overflow: "auto", height: "60vh" }, { children: [jsxRuntime.jsxs(Box, __assign({ p: 1 }, { children: [jsxRuntime.jsx(Typography, __assign({ noWrap: true }, { children: "\u30D5\u30A3\u30FC\u30EB\u30C9\u540D" }), void 0),
                                jsxRuntime.jsx(Box, { mt: 1 }, void 0),
                                jsxRuntime.jsx(TextField, { placeholder: "\u4F8B\uFF1Atitle", fullWidth: true, helperText: "API\u3067\u53D6\u5F97\u3059\u308B\u969B\u306E\u30AD\u30FC\u540D\u306B\u306A\u308A\u307E\u3059", value: scheme.name, onChange: function (e) { return handlePropertyChanged("name", e.target.value); } }, void 0)] }), void 0),
                        jsxRuntime.jsxs(Box, __assign({ p: 1 }, { children: [jsxRuntime.jsx(Typography, __assign({ noWrap: true }, { children: "\u8868\u793A\u540D" }), void 0),
                                jsxRuntime.jsx(Box, { mt: 1 }, void 0),
                                jsxRuntime.jsx(TextField, { placeholder: "\u4F8B\uFF1A\u30BF\u30A4\u30C8\u30EB", helperText: "\u5165\u7A3F\u753B\u9762\u306B\u8868\u793A\u3059\u308B\u540D\u79F0\u3067\u3059\u3002\u5165\u7A3F\u8005\u306B\u3068\u3063\u3066\u308F\u304B\u308A\u3084\u3059\u3044\u8AAC\u660E\u3092\u5165\u529B\u3057\u307E\u3057\u3087\u3046\u3002", fullWidth: true, value: scheme.displayName, onChange: function (e) { return handlePropertyChanged("displayName", e.target.value); } }, void 0)] }), void 0),
                        jsxRuntime.jsx(Box, __assign({ p: 1 }, { children: jsxRuntime.jsx(Element, { scheme: scheme, onChange: props.onChange }, void 0) }), void 0),
                        jsxRuntime.jsxs(Box, __assign({ p: 1 }, { children: [jsxRuntime.jsx(Typography, __assign({ noWrap: true }, { children: "\u5099\u8003" }), void 0),
                                jsxRuntime.jsx(Box, { mt: 1 }, void 0),
                                jsxRuntime.jsx(TextField, { fullWidth: true, multiline: true, rows: "3", placeholder: "\u4F8B\uFF1A\u30D6\u30ED\u30B0\u306E\u30BF\u30A4\u30C8\u30EB\u3067\u3059\u3002", helperText: "\u5165\u7A3F\u753B\u9762\u306B\u8868\u793A\u3059\u308B\u8AAC\u660E\u6587\u3067\u3059\u3002\u5165\u7A3F\u8005\u306B\u3068\u3063\u3066\u308F\u304B\u308A\u3084\u3059\u3044\u8AAC\u660E\u3092\u5165\u529B\u3057\u307E\u3057\u3087\u3046\u3002", value: scheme.description, variant: "filled", onChange: function (e) { return handlePropertyChanged("description", e.target.value); } }, void 0)] }), void 0)] }), void 0)] }, void 0));
    }
    return jsxRuntime.jsx(jsxRuntime.Fragment, {}, void 0);
}

function FieldTypeEditDialog(props) {
    var _a = __read(useState(props.context), 2), scheme = _a[0], setScheme = _a[1];
    useTheme();
    var _b = __read(useState(false), 2), isChanged = _b[0], setIsChanged = _b[1];
    function handleClick(key) {
        setScheme(scheme.clone({
            type: key
        }));
    }
    return (jsxRuntime.jsxs(Box, __assign({ display: "flex" }, { children: [jsxRuntime.jsx(Box, __assign({ style: { background: "rgb(240,240,240)" } }, { children: jsxRuntime.jsx(Box, __assign({ width: "240px", p: 2 }, { children: Object.keys(schemeTypeDisplayNames).map(function (key) { return (jsxRuntime.jsx(Box, __assign({ p: 1 }, { children: jsxRuntime.jsx(Button, __assign({ fullWidth: true, color: "primary", variant: key === scheme.type ? "contained" : "text", onClick: function () { return handleClick(key); } }, { children: schemeTypeDisplayNames[key] }), void 0) }), void 0)); }) }), void 0) }), void 0),
            jsxRuntime.jsx(Fade, __assign({ timeout: 800, in: true }, { children: jsxRuntime.jsxs(Box, __assign({ flex: "1 1 auto", display: "flex", flexDirection: "column" }, { children: [jsxRuntime.jsx(SchemeEditor, { scheme: scheme, onChange: function (e) {
                                setScheme(e);
                                setIsChanged(true);
                            } }, void 0),
                        jsxRuntime.jsxs(Box, __assign({ p: 2, width: "100%", display: "flex" }, { children: [jsxRuntime.jsx(Box, { ml: "auto" }, void 0),
                                jsxRuntime.jsx(Button, __assign({ color: "primary", variant: "text", onClick: function () { return props.onClose(null); } }, { children: "Cancel" }), void 0),
                                jsxRuntime.jsx(Box, { ml: 1 }, void 0),
                                jsxRuntime.jsx(Button, __assign({ disabled: !(scheme.name && scheme.displayName) || !isChanged, color: "primary", variant: "contained", onClick: function () { return props.onClose(scheme); } }, { children: "Ok" }), void 0)] }), void 0)] }), void 0) }), scheme.type)] }), void 0));
}
function showFieldTypeEditDialogAsync(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showDialogAsync(FieldTypeEditDialog, params, {
                        maxWidth: "lg"
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

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
};

var browser = invariant;

var Manager = function () {
  function Manager() {
    _classCallCheck(this, Manager);

    _defineProperty(this, "refs", {});
  }

  _createClass(Manager, [{
    key: "add",
    value: function add(collection, ref) {
      if (!this.refs[collection]) {
        this.refs[collection] = [];
      }

      this.refs[collection].push(ref);
    }
  }, {
    key: "remove",
    value: function remove(collection, ref) {
      var index = this.getIndex(collection, ref);

      if (index !== -1) {
        this.refs[collection].splice(index, 1);
      }
    }
  }, {
    key: "isActive",
    value: function isActive() {
      return this.active;
    }
  }, {
    key: "getActive",
    value: function getActive() {
      var _this = this;

      return this.refs[this.active.collection].find(function (_ref) {
        var node = _ref.node;
        return node.sortableInfo.index == _this.active.index;
      });
    }
  }, {
    key: "getIndex",
    value: function getIndex(collection, ref) {
      return this.refs[collection].indexOf(ref);
    }
  }, {
    key: "getOrderedRefs",
    value: function getOrderedRefs() {
      var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.active.collection;
      return this.refs[collection].sort(sortByIndex);
    }
  }]);

  return Manager;
}();

function sortByIndex(_ref2, _ref3) {
  var index1 = _ref2.node.sortableInfo.index;
  var index2 = _ref3.node.sortableInfo.index;
  return index1 - index2;
}

function arrayMove(array, from, to) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof console !== 'undefined') {
      console.warn("Deprecation warning: arrayMove will no longer be exported by 'react-sortable-hoc' in the next major release. Please install the `array-move` package locally instead. https://www.npmjs.com/package/array-move");
    }
  }

  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

function omit(obj, keysToOmit) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (keysToOmit.indexOf(key) === -1) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}

var events = {
  end: ['touchend', 'touchcancel', 'mouseup'],
  move: ['touchmove', 'mousemove'],
  start: ['touchstart', 'mousedown']
};

var vendorPrefix = function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return '';
  }

  var styles = window.getComputedStyle(document.documentElement, '') || ['-moz-hidden-iframe'];
  var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];

  switch (pre) {
    case 'ms':
      return 'ms';

    default:
      return pre && pre.length ? pre[0].toUpperCase() + pre.substr(1) : '';
  }
}();

function setInlineStyles(node, styles) {
  Object.keys(styles).forEach(function (key) {
    node.style[key] = styles[key];
  });
}

function setTranslate3d(node, translate) {
  node.style["".concat(vendorPrefix, "Transform")] = translate == null ? '' : "translate3d(".concat(translate.x, "px,").concat(translate.y, "px,0)");
}

function setTransitionDuration(node, duration) {
  node.style["".concat(vendorPrefix, "TransitionDuration")] = duration == null ? '' : "".concat(duration, "ms");
}

function closest(el, fn) {
  while (el) {
    if (fn(el)) {
      return el;
    }

    el = el.parentNode;
  }

  return null;
}

function limit(min, max, value) {
  return Math.max(min, Math.min(value, max));
}

function getPixelValue(stringValue) {
  if (stringValue.substr(-2) === 'px') {
    return parseFloat(stringValue);
  }

  return 0;
}

function getElementMargin(element) {
  var style = window.getComputedStyle(element);
  return {
    bottom: getPixelValue(style.marginBottom),
    left: getPixelValue(style.marginLeft),
    right: getPixelValue(style.marginRight),
    top: getPixelValue(style.marginTop)
  };
}

function provideDisplayName(prefix, Component$$1) {
  var componentName = Component$$1.displayName || Component$$1.name;
  return componentName ? "".concat(prefix, "(").concat(componentName, ")") : prefix;
}

function getScrollAdjustedBoundingClientRect(node, scrollDelta) {
  var boundingClientRect = node.getBoundingClientRect();
  return {
    top: boundingClientRect.top + scrollDelta.top,
    left: boundingClientRect.left + scrollDelta.left
  };
}

function getPosition(event) {
  if (event.touches && event.touches.length) {
    return {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY
    };
  } else if (event.changedTouches && event.changedTouches.length) {
    return {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY
    };
  } else {
    return {
      x: event.pageX,
      y: event.pageY
    };
  }
}

function isTouchEvent(event) {
  return event.touches && event.touches.length || event.changedTouches && event.changedTouches.length;
}

function getEdgeOffset(node, parent) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    left: 0,
    top: 0
  };

  if (!node) {
    return undefined;
  }

  var nodeOffset = {
    left: offset.left + node.offsetLeft,
    top: offset.top + node.offsetTop
  };

  if (node.parentNode === parent) {
    return nodeOffset;
  }

  return getEdgeOffset(node.parentNode, parent, nodeOffset);
}

function getTargetIndex(newIndex, prevIndex, oldIndex) {
  if (newIndex < oldIndex && newIndex > prevIndex) {
    return newIndex - 1;
  } else if (newIndex > oldIndex && newIndex < prevIndex) {
    return newIndex + 1;
  } else {
    return newIndex;
  }
}

function getLockPixelOffset(_ref) {
  var lockOffset = _ref.lockOffset,
      width = _ref.width,
      height = _ref.height;
  var offsetX = lockOffset;
  var offsetY = lockOffset;
  var unit = 'px';

  if (typeof lockOffset === 'string') {
    var match = /^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(lockOffset);
    browser(match !== null, 'lockOffset value should be a number or a string of a ' + 'number followed by "px" or "%". Given %s', lockOffset);
    offsetX = parseFloat(lockOffset);
    offsetY = parseFloat(lockOffset);
    unit = match[1];
  }

  browser(isFinite(offsetX) && isFinite(offsetY), 'lockOffset value should be a finite. Given %s', lockOffset);

  if (unit === '%') {
    offsetX = offsetX * width / 100;
    offsetY = offsetY * height / 100;
  }

  return {
    x: offsetX,
    y: offsetY
  };
}

function getLockPixelOffsets(_ref2) {
  var height = _ref2.height,
      width = _ref2.width,
      lockOffset = _ref2.lockOffset;
  var offsets = Array.isArray(lockOffset) ? lockOffset : [lockOffset, lockOffset];
  browser(offsets.length === 2, 'lockOffset prop of SortableContainer should be a single ' + 'value or an array of exactly two values. Given %s', lockOffset);

  var _offsets = _slicedToArray(offsets, 2),
      minLockOffset = _offsets[0],
      maxLockOffset = _offsets[1];

  return [getLockPixelOffset({
    height: height,
    lockOffset: minLockOffset,
    width: width
  }), getLockPixelOffset({
    height: height,
    lockOffset: maxLockOffset,
    width: width
  })];
}

function isScrollable(el) {
  var computedStyle = window.getComputedStyle(el);
  var overflowRegex = /(auto|scroll)/;
  var properties = ['overflow', 'overflowX', 'overflowY'];
  return properties.find(function (property) {
    return overflowRegex.test(computedStyle[property]);
  });
}

function getScrollingParent(el) {
  if (!(el instanceof HTMLElement)) {
    return null;
  } else if (isScrollable(el)) {
    return el;
  } else {
    return getScrollingParent(el.parentNode);
  }
}

function getContainerGridGap(element) {
  var style = window.getComputedStyle(element);

  if (style.display === 'grid') {
    return {
      x: getPixelValue(style.gridColumnGap),
      y: getPixelValue(style.gridRowGap)
    };
  }

  return {
    x: 0,
    y: 0
  };
}

var KEYCODE = {
  TAB: 9,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};
var NodeType = {
  Anchor: 'A',
  Button: 'BUTTON',
  Canvas: 'CANVAS',
  Input: 'INPUT',
  Option: 'OPTION',
  Textarea: 'TEXTAREA',
  Select: 'SELECT'
};

function cloneNode(node) {
  var selector = 'input, textarea, select, canvas, [contenteditable]';
  var fields = node.querySelectorAll(selector);
  var clonedNode = node.cloneNode(true);

  var clonedFields = _toConsumableArray(clonedNode.querySelectorAll(selector));

  clonedFields.forEach(function (field, i) {
    if (field.type !== 'file') {
      field.value = fields[i].value;
    }

    if (field.type === 'radio' && field.name) {
      field.name = "__sortableClone__".concat(field.name);
    }

    if (field.tagName === NodeType.Canvas && fields[i].width > 0 && fields[i].height > 0) {
      var destCtx = field.getContext('2d');
      destCtx.drawImage(fields[i], 0, 0);
    }
  });
  return clonedNode;
}

function sortableHandle(WrappedComponent) {
  var _class, _temp;

  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    withRef: false
  };
  return _temp = _class = function (_React$Component) {
    _inherits(WithSortableHandle, _React$Component);

    function WithSortableHandle() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WithSortableHandle);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithSortableHandle)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "wrappedInstance", createRef());

      return _this;
    }

    _createClass(WithSortableHandle, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var node = findDOMNode(this);
        node.sortableHandle = true;
      }
    }, {
      key: "getWrappedInstance",
      value: function getWrappedInstance() {
        browser(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableHandle() call');
        return this.wrappedInstance.current;
      }
    }, {
      key: "render",
      value: function render() {
        var ref = config.withRef ? this.wrappedInstance : null;
        return createElement(WrappedComponent, _extends({
          ref: ref
        }, this.props));
      }
    }]);

    return WithSortableHandle;
  }(Component), _defineProperty(_class, "displayName", provideDisplayName('sortableHandle', WrappedComponent)), _temp;
}

function isSortableHandle(node) {
  return node.sortableHandle != null;
}

var AutoScroller = function () {
  function AutoScroller(container, onScrollCallback) {
    _classCallCheck(this, AutoScroller);

    this.container = container;
    this.onScrollCallback = onScrollCallback;
  }

  _createClass(AutoScroller, [{
    key: "clear",
    value: function clear() {
      if (this.interval == null) {
        return;
      }

      clearInterval(this.interval);
      this.interval = null;
    }
  }, {
    key: "update",
    value: function update(_ref) {
      var _this = this;

      var translate = _ref.translate,
          minTranslate = _ref.minTranslate,
          maxTranslate = _ref.maxTranslate,
          width = _ref.width,
          height = _ref.height;
      var direction = {
        x: 0,
        y: 0
      };
      var speed = {
        x: 1,
        y: 1
      };
      var acceleration = {
        x: 10,
        y: 10
      };
      var _this$container = this.container,
          scrollTop = _this$container.scrollTop,
          scrollLeft = _this$container.scrollLeft,
          scrollHeight = _this$container.scrollHeight,
          scrollWidth = _this$container.scrollWidth,
          clientHeight = _this$container.clientHeight,
          clientWidth = _this$container.clientWidth;
      var isTop = scrollTop === 0;
      var isBottom = scrollHeight - scrollTop - clientHeight === 0;
      var isLeft = scrollLeft === 0;
      var isRight = scrollWidth - scrollLeft - clientWidth === 0;

      if (translate.y >= maxTranslate.y - height / 2 && !isBottom) {
        direction.y = 1;
        speed.y = acceleration.y * Math.abs((maxTranslate.y - height / 2 - translate.y) / height);
      } else if (translate.x >= maxTranslate.x - width / 2 && !isRight) {
        direction.x = 1;
        speed.x = acceleration.x * Math.abs((maxTranslate.x - width / 2 - translate.x) / width);
      } else if (translate.y <= minTranslate.y + height / 2 && !isTop) {
        direction.y = -1;
        speed.y = acceleration.y * Math.abs((translate.y - height / 2 - minTranslate.y) / height);
      } else if (translate.x <= minTranslate.x + width / 2 && !isLeft) {
        direction.x = -1;
        speed.x = acceleration.x * Math.abs((translate.x - width / 2 - minTranslate.x) / width);
      }

      if (this.interval) {
        this.clear();
        this.isAutoScrolling = false;
      }

      if (direction.x !== 0 || direction.y !== 0) {
        this.interval = setInterval(function () {
          _this.isAutoScrolling = true;
          var offset = {
            left: speed.x * direction.x,
            top: speed.y * direction.y
          };
          _this.container.scrollTop += offset.top;
          _this.container.scrollLeft += offset.left;

          _this.onScrollCallback(offset);
        }, 5);
      }
    }
  }]);

  return AutoScroller;
}();

function defaultGetHelperDimensions(_ref) {
  var node = _ref.node;
  return {
    height: node.offsetHeight,
    width: node.offsetWidth
  };
}

function defaultShouldCancelStart(event) {
  var interactiveElements = [NodeType.Input, NodeType.Textarea, NodeType.Select, NodeType.Option, NodeType.Button];

  if (interactiveElements.indexOf(event.target.tagName) !== -1) {
    return true;
  }

  if (closest(event.target, function (el) {
    return el.contentEditable === 'true';
  })) {
    return true;
  }

  return false;
}

var propTypes = {
  axis: propTypes$2.oneOf(['x', 'y', 'xy']),
  contentWindow: propTypes$2.any,
  disableAutoscroll: propTypes$2.bool,
  distance: propTypes$2.number,
  getContainer: propTypes$2.func,
  getHelperDimensions: propTypes$2.func,
  helperClass: propTypes$2.string,
  helperContainer: propTypes$2.oneOfType([propTypes$2.func, typeof HTMLElement === 'undefined' ? propTypes$2.any : propTypes$2.instanceOf(HTMLElement)]),
  hideSortableGhost: propTypes$2.bool,
  keyboardSortingTransitionDuration: propTypes$2.number,
  lockAxis: propTypes$2.string,
  lockOffset: propTypes$2.oneOfType([propTypes$2.number, propTypes$2.string, propTypes$2.arrayOf(propTypes$2.oneOfType([propTypes$2.number, propTypes$2.string]))]),
  lockToContainerEdges: propTypes$2.bool,
  onSortEnd: propTypes$2.func,
  onSortMove: propTypes$2.func,
  onSortOver: propTypes$2.func,
  onSortStart: propTypes$2.func,
  pressDelay: propTypes$2.number,
  pressThreshold: propTypes$2.number,
  keyCodes: propTypes$2.shape({
    lift: propTypes$2.arrayOf(propTypes$2.number),
    drop: propTypes$2.arrayOf(propTypes$2.number),
    cancel: propTypes$2.arrayOf(propTypes$2.number),
    up: propTypes$2.arrayOf(propTypes$2.number),
    down: propTypes$2.arrayOf(propTypes$2.number)
  }),
  shouldCancelStart: propTypes$2.func,
  transitionDuration: propTypes$2.number,
  updateBeforeSortStart: propTypes$2.func,
  useDragHandle: propTypes$2.bool,
  useWindowAsScrollContainer: propTypes$2.bool
};
var defaultKeyCodes = {
  lift: [KEYCODE.SPACE],
  drop: [KEYCODE.SPACE],
  cancel: [KEYCODE.ESC],
  up: [KEYCODE.UP, KEYCODE.LEFT],
  down: [KEYCODE.DOWN, KEYCODE.RIGHT]
};
var defaultProps = {
  axis: 'y',
  disableAutoscroll: false,
  distance: 0,
  getHelperDimensions: defaultGetHelperDimensions,
  hideSortableGhost: true,
  lockOffset: '50%',
  lockToContainerEdges: false,
  pressDelay: 0,
  pressThreshold: 5,
  keyCodes: defaultKeyCodes,
  shouldCancelStart: defaultShouldCancelStart,
  transitionDuration: 300,
  useWindowAsScrollContainer: false
};
var omittedProps = Object.keys(propTypes);

function validateProps(props) {
  browser(!(props.distance && props.pressDelay), 'Attempted to set both `pressDelay` and `distance` on SortableContainer, you may only use one or the other, not both at the same time.');
}

function _finallyRethrows(body, finalizer) {
  try {
    var result = body();
  } catch (e) {
    return finalizer(true, e);
  }

  if (result && result.then) {
    return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
  }

  return finalizer(false, value);
}

var SortableContext = createContext({
  manager: {}
});

function sortableContainer(WrappedComponent) {
  var _class, _temp;

  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    withRef: false
  };
  return _temp = _class = function (_React$Component) {
    _inherits(WithSortableContainer, _React$Component);

    function WithSortableContainer(props) {
      var _this;

      _classCallCheck(this, WithSortableContainer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(WithSortableContainer).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleStart", function (event) {
        var _this$props = _this.props,
            distance = _this$props.distance,
            shouldCancelStart = _this$props.shouldCancelStart;

        if (event.button === 2 || shouldCancelStart(event)) {
          return;
        }

        _this.touched = true;
        _this.position = getPosition(event);
        var node = closest(event.target, function (el) {
          return el.sortableInfo != null;
        });

        if (node && node.sortableInfo && _this.nodeIsChild(node) && !_this.state.sorting) {
          var useDragHandle = _this.props.useDragHandle;
          var _node$sortableInfo = node.sortableInfo,
              index = _node$sortableInfo.index,
              collection = _node$sortableInfo.collection,
              disabled = _node$sortableInfo.disabled;

          if (disabled) {
            return;
          }

          if (useDragHandle && !closest(event.target, isSortableHandle)) {
            return;
          }

          _this.manager.active = {
            collection: collection,
            index: index
          };

          if (!isTouchEvent(event) && event.target.tagName === NodeType.Anchor) {
            event.preventDefault();
          }

          if (!distance) {
            if (_this.props.pressDelay === 0) {
              _this.handlePress(event);
            } else {
              _this.pressTimer = setTimeout(function () {
                return _this.handlePress(event);
              }, _this.props.pressDelay);
            }
          }
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "nodeIsChild", function (node) {
        return node.sortableInfo.manager === _this.manager;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMove", function (event) {
        var _this$props2 = _this.props,
            distance = _this$props2.distance,
            pressThreshold = _this$props2.pressThreshold;

        if (!_this.state.sorting && _this.touched && !_this._awaitingUpdateBeforeSortStart) {
          var position = getPosition(event);
          var delta = {
            x: _this.position.x - position.x,
            y: _this.position.y - position.y
          };
          var combinedDelta = Math.abs(delta.x) + Math.abs(delta.y);
          _this.delta = delta;

          if (!distance && (!pressThreshold || combinedDelta >= pressThreshold)) {
            clearTimeout(_this.cancelTimer);
            _this.cancelTimer = setTimeout(_this.cancel, 0);
          } else if (distance && combinedDelta >= distance && _this.manager.isActive()) {
            _this.handlePress(event);
          }
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEnd", function () {
        _this.touched = false;

        _this.cancel();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cancel", function () {
        var distance = _this.props.distance;
        var sorting = _this.state.sorting;

        if (!sorting) {
          if (!distance) {
            clearTimeout(_this.pressTimer);
          }

          _this.manager.active = null;
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePress", function (event) {
        try {
          var active = _this.manager.getActive();

          var _temp6 = function () {
            if (active) {
              var _temp7 = function _temp7() {
                var index = _node.sortableInfo.index;
                var margin = getElementMargin(_node);
                var gridGap = getContainerGridGap(_this.container);

                var containerBoundingRect = _this.scrollContainer.getBoundingClientRect();

                var dimensions = _getHelperDimensions({
                  index: index,
                  node: _node,
                  collection: _collection
                });

                _this.node = _node;
                _this.margin = margin;
                _this.gridGap = gridGap;
                _this.width = dimensions.width;
                _this.height = dimensions.height;
                _this.marginOffset = {
                  x: _this.margin.left + _this.margin.right + _this.gridGap.x,
                  y: Math.max(_this.margin.top, _this.margin.bottom, _this.gridGap.y)
                };
                _this.boundingClientRect = _node.getBoundingClientRect();
                _this.containerBoundingRect = containerBoundingRect;
                _this.index = index;
                _this.newIndex = index;
                _this.axis = {
                  x: _axis.indexOf('x') >= 0,
                  y: _axis.indexOf('y') >= 0
                };
                _this.offsetEdge = getEdgeOffset(_node, _this.container);

                if (_isKeySorting) {
                  _this.initialOffset = getPosition(_objectSpread({}, event, {
                    pageX: _this.boundingClientRect.left,
                    pageY: _this.boundingClientRect.top
                  }));
                } else {
                  _this.initialOffset = getPosition(event);
                }

                _this.initialScroll = {
                  left: _this.scrollContainer.scrollLeft,
                  top: _this.scrollContainer.scrollTop
                };
                _this.initialWindowScroll = {
                  left: window.pageXOffset,
                  top: window.pageYOffset
                };
                _this.helper = _this.helperContainer.appendChild(cloneNode(_node));
                setInlineStyles(_this.helper, {
                  boxSizing: 'border-box',
                  height: "".concat(_this.height, "px"),
                  left: "".concat(_this.boundingClientRect.left - margin.left, "px"),
                  pointerEvents: 'none',
                  position: 'fixed',
                  top: "".concat(_this.boundingClientRect.top - margin.top, "px"),
                  width: "".concat(_this.width, "px")
                });

                if (_isKeySorting) {
                  _this.helper.focus();
                }

                if (_hideSortableGhost) {
                  _this.sortableGhost = _node;
                  setInlineStyles(_node, {
                    opacity: 0,
                    visibility: 'hidden'
                  });
                }

                _this.minTranslate = {};
                _this.maxTranslate = {};

                if (_isKeySorting) {
                  var _ref = _useWindowAsScrollContainer ? {
                    top: 0,
                    left: 0,
                    width: _this.contentWindow.innerWidth,
                    height: _this.contentWindow.innerHeight
                  } : _this.containerBoundingRect,
                      containerTop = _ref.top,
                      containerLeft = _ref.left,
                      containerWidth = _ref.width,
                      containerHeight = _ref.height;

                  var containerBottom = containerTop + containerHeight;
                  var containerRight = containerLeft + containerWidth;

                  if (_this.axis.x) {
                    _this.minTranslate.x = containerLeft - _this.boundingClientRect.left;
                    _this.maxTranslate.x = containerRight - (_this.boundingClientRect.left + _this.width);
                  }

                  if (_this.axis.y) {
                    _this.minTranslate.y = containerTop - _this.boundingClientRect.top;
                    _this.maxTranslate.y = containerBottom - (_this.boundingClientRect.top + _this.height);
                  }
                } else {
                  if (_this.axis.x) {
                    _this.minTranslate.x = (_useWindowAsScrollContainer ? 0 : containerBoundingRect.left) - _this.boundingClientRect.left - _this.width / 2;
                    _this.maxTranslate.x = (_useWindowAsScrollContainer ? _this.contentWindow.innerWidth : containerBoundingRect.left + containerBoundingRect.width) - _this.boundingClientRect.left - _this.width / 2;
                  }

                  if (_this.axis.y) {
                    _this.minTranslate.y = (_useWindowAsScrollContainer ? 0 : containerBoundingRect.top) - _this.boundingClientRect.top - _this.height / 2;
                    _this.maxTranslate.y = (_useWindowAsScrollContainer ? _this.contentWindow.innerHeight : containerBoundingRect.top + containerBoundingRect.height) - _this.boundingClientRect.top - _this.height / 2;
                  }
                }

                if (_helperClass) {
                  _helperClass.split(' ').forEach(function (className) {
                    return _this.helper.classList.add(className);
                  });
                }

                _this.listenerNode = event.touches ? event.target : _this.contentWindow;

                if (_isKeySorting) {
                  _this.listenerNode.addEventListener('wheel', _this.handleKeyEnd, true);

                  _this.listenerNode.addEventListener('mousedown', _this.handleKeyEnd, true);

                  _this.listenerNode.addEventListener('keydown', _this.handleKeyDown);
                } else {
                  events.move.forEach(function (eventName) {
                    return _this.listenerNode.addEventListener(eventName, _this.handleSortMove, false);
                  });
                  events.end.forEach(function (eventName) {
                    return _this.listenerNode.addEventListener(eventName, _this.handleSortEnd, false);
                  });
                }

                _this.setState({
                  sorting: true,
                  sortingIndex: index
                });

                if (_onSortStart) {
                  _onSortStart({
                    node: _node,
                    index: index,
                    collection: _collection,
                    isKeySorting: _isKeySorting,
                    nodes: _this.manager.getOrderedRefs(),
                    helper: _this.helper
                  }, event);
                }

                if (_isKeySorting) {
                  _this.keyMove(0);
                }
              };

              var _this$props3 = _this.props,
                  _axis = _this$props3.axis,
                  _getHelperDimensions = _this$props3.getHelperDimensions,
                  _helperClass = _this$props3.helperClass,
                  _hideSortableGhost = _this$props3.hideSortableGhost,
                  updateBeforeSortStart = _this$props3.updateBeforeSortStart,
                  _onSortStart = _this$props3.onSortStart,
                  _useWindowAsScrollContainer = _this$props3.useWindowAsScrollContainer;
              var _node = active.node,
                  _collection = active.collection;
              var _isKeySorting = _this.manager.isKeySorting;

              var _temp8 = function () {
                if (typeof updateBeforeSortStart === 'function') {
                  _this._awaitingUpdateBeforeSortStart = true;

                  var _temp9 = _finallyRethrows(function () {
                    var index = _node.sortableInfo.index;
                    return Promise.resolve(updateBeforeSortStart({
                      collection: _collection,
                      index: index,
                      node: _node,
                      isKeySorting: _isKeySorting
                    }, event)).then(function () {});
                  }, function (_wasThrown, _result) {
                    _this._awaitingUpdateBeforeSortStart = false;
                    if (_wasThrown) throw _result;
                    return _result;
                  });

                  if (_temp9 && _temp9.then) return _temp9.then(function () {});
                }
              }();

              return _temp8 && _temp8.then ? _temp8.then(_temp7) : _temp7(_temp8);
            }
          }();

          return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {}) : void 0);
        } catch (e) {
          return Promise.reject(e);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSortMove", function (event) {
        var onSortMove = _this.props.onSortMove;

        if (typeof event.preventDefault === 'function' && event.cancelable) {
          event.preventDefault();
        }

        _this.updateHelperPosition(event);

        _this.animateNodes();

        _this.autoscroll();

        if (onSortMove) {
          onSortMove(event);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSortEnd", function (event) {
        var _this$props4 = _this.props,
            hideSortableGhost = _this$props4.hideSortableGhost,
            onSortEnd = _this$props4.onSortEnd;
        var _this$manager = _this.manager,
            collection = _this$manager.active.collection,
            isKeySorting = _this$manager.isKeySorting;

        var nodes = _this.manager.getOrderedRefs();

        if (_this.listenerNode) {
          if (isKeySorting) {
            _this.listenerNode.removeEventListener('wheel', _this.handleKeyEnd, true);

            _this.listenerNode.removeEventListener('mousedown', _this.handleKeyEnd, true);

            _this.listenerNode.removeEventListener('keydown', _this.handleKeyDown);
          } else {
            events.move.forEach(function (eventName) {
              return _this.listenerNode.removeEventListener(eventName, _this.handleSortMove);
            });
            events.end.forEach(function (eventName) {
              return _this.listenerNode.removeEventListener(eventName, _this.handleSortEnd);
            });
          }
        }

        _this.helper.parentNode.removeChild(_this.helper);

        if (hideSortableGhost && _this.sortableGhost) {
          setInlineStyles(_this.sortableGhost, {
            opacity: '',
            visibility: ''
          });
        }

        for (var i = 0, len = nodes.length; i < len; i++) {
          var _node2 = nodes[i];
          var el = _node2.node;
          _node2.edgeOffset = null;
          _node2.boundingClientRect = null;
          setTranslate3d(el, null);
          setTransitionDuration(el, null);
          _node2.translate = null;
        }

        _this.autoScroller.clear();

        _this.manager.active = null;
        _this.manager.isKeySorting = false;

        _this.setState({
          sorting: false,
          sortingIndex: null
        });

        if (typeof onSortEnd === 'function') {
          onSortEnd({
            collection: collection,
            newIndex: _this.newIndex,
            oldIndex: _this.index,
            isKeySorting: isKeySorting,
            nodes: nodes
          }, event);
        }

        _this.touched = false;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "autoscroll", function () {
        var disableAutoscroll = _this.props.disableAutoscroll;
        var isKeySorting = _this.manager.isKeySorting;

        if (disableAutoscroll) {
          _this.autoScroller.clear();

          return;
        }

        if (isKeySorting) {
          var translate = _objectSpread({}, _this.translate);

          var scrollX = 0;
          var scrollY = 0;

          if (_this.axis.x) {
            translate.x = Math.min(_this.maxTranslate.x, Math.max(_this.minTranslate.x, _this.translate.x));
            scrollX = _this.translate.x - translate.x;
          }

          if (_this.axis.y) {
            translate.y = Math.min(_this.maxTranslate.y, Math.max(_this.minTranslate.y, _this.translate.y));
            scrollY = _this.translate.y - translate.y;
          }

          _this.translate = translate;
          setTranslate3d(_this.helper, _this.translate);
          _this.scrollContainer.scrollLeft += scrollX;
          _this.scrollContainer.scrollTop += scrollY;
          return;
        }

        _this.autoScroller.update({
          height: _this.height,
          maxTranslate: _this.maxTranslate,
          minTranslate: _this.minTranslate,
          translate: _this.translate,
          width: _this.width
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onAutoScroll", function (offset) {
        _this.translate.x += offset.left;
        _this.translate.y += offset.top;

        _this.animateNodes();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyDown", function (event) {
        var keyCode = event.keyCode;
        var _this$props5 = _this.props,
            shouldCancelStart = _this$props5.shouldCancelStart,
            _this$props5$keyCodes = _this$props5.keyCodes,
            customKeyCodes = _this$props5$keyCodes === void 0 ? {} : _this$props5$keyCodes;

        var keyCodes = _objectSpread({}, defaultKeyCodes, customKeyCodes);

        if (_this.manager.active && !_this.manager.isKeySorting || !_this.manager.active && (!keyCodes.lift.includes(keyCode) || shouldCancelStart(event) || !_this.isValidSortingTarget(event))) {
          return;
        }

        event.stopPropagation();
        event.preventDefault();

        if (keyCodes.lift.includes(keyCode) && !_this.manager.active) {
          _this.keyLift(event);
        } else if (keyCodes.drop.includes(keyCode) && _this.manager.active) {
          _this.keyDrop(event);
        } else if (keyCodes.cancel.includes(keyCode)) {
          _this.newIndex = _this.manager.active.index;

          _this.keyDrop(event);
        } else if (keyCodes.up.includes(keyCode)) {
          _this.keyMove(-1);
        } else if (keyCodes.down.includes(keyCode)) {
          _this.keyMove(1);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "keyLift", function (event) {
        var target = event.target;
        var node = closest(target, function (el) {
          return el.sortableInfo != null;
        });
        var _node$sortableInfo2 = node.sortableInfo,
            index = _node$sortableInfo2.index,
            collection = _node$sortableInfo2.collection;
        _this.initialFocusedNode = target;
        _this.manager.isKeySorting = true;
        _this.manager.active = {
          index: index,
          collection: collection
        };

        _this.handlePress(event);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "keyMove", function (shift) {
        var nodes = _this.manager.getOrderedRefs();

        var lastIndex = nodes[nodes.length - 1].node.sortableInfo.index;
        var newIndex = _this.newIndex + shift;
        var prevIndex = _this.newIndex;

        if (newIndex < 0 || newIndex > lastIndex) {
          return;
        }

        _this.prevIndex = prevIndex;
        _this.newIndex = newIndex;
        var targetIndex = getTargetIndex(_this.newIndex, _this.prevIndex, _this.index);
        var target = nodes.find(function (_ref2) {
          var node = _ref2.node;
          return node.sortableInfo.index === targetIndex;
        });
        var targetNode = target.node;
        var scrollDelta = _this.containerScrollDelta;
        var targetBoundingClientRect = target.boundingClientRect || getScrollAdjustedBoundingClientRect(targetNode, scrollDelta);
        var targetTranslate = target.translate || {
          x: 0,
          y: 0
        };
        var targetPosition = {
          top: targetBoundingClientRect.top + targetTranslate.y - scrollDelta.top,
          left: targetBoundingClientRect.left + targetTranslate.x - scrollDelta.left
        };
        var shouldAdjustForSize = prevIndex < newIndex;
        var sizeAdjustment = {
          x: shouldAdjustForSize && _this.axis.x ? targetNode.offsetWidth - _this.width : 0,
          y: shouldAdjustForSize && _this.axis.y ? targetNode.offsetHeight - _this.height : 0
        };

        _this.handleSortMove({
          pageX: targetPosition.left + sizeAdjustment.x,
          pageY: targetPosition.top + sizeAdjustment.y,
          ignoreTransition: shift === 0
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "keyDrop", function (event) {
        _this.handleSortEnd(event);

        if (_this.initialFocusedNode) {
          _this.initialFocusedNode.focus();
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyEnd", function (event) {
        if (_this.manager.active) {
          _this.keyDrop(event);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isValidSortingTarget", function (event) {
        var useDragHandle = _this.props.useDragHandle;
        var target = event.target;
        var node = closest(target, function (el) {
          return el.sortableInfo != null;
        });
        return node && node.sortableInfo && !node.sortableInfo.disabled && (useDragHandle ? isSortableHandle(target) : target.sortableInfo);
      });

      var manager = new Manager();
      validateProps(props);
      _this.manager = manager;
      _this.wrappedInstance = createRef();
      _this.sortableContextValue = {
        manager: manager
      };
      _this.events = {
        end: _this.handleEnd,
        move: _this.handleMove,
        start: _this.handleStart
      };
      return _this;
    }

    _createClass(WithSortableContainer, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var useWindowAsScrollContainer = this.props.useWindowAsScrollContainer;
        var container = this.getContainer();
        Promise.resolve(container).then(function (containerNode) {
          _this2.container = containerNode;
          _this2.document = _this2.container.ownerDocument || document;
          var contentWindow = _this2.props.contentWindow || _this2.document.defaultView || window;
          _this2.contentWindow = typeof contentWindow === 'function' ? contentWindow() : contentWindow;
          _this2.scrollContainer = useWindowAsScrollContainer ? _this2.document.scrollingElement || _this2.document.documentElement : getScrollingParent(_this2.container) || _this2.container;
          _this2.autoScroller = new AutoScroller(_this2.scrollContainer, _this2.onAutoScroll);
          Object.keys(_this2.events).forEach(function (key) {
            return events[key].forEach(function (eventName) {
              return _this2.container.addEventListener(eventName, _this2.events[key], false);
            });
          });

          _this2.container.addEventListener('keydown', _this2.handleKeyDown);
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this3 = this;

        if (this.helper && this.helper.parentNode) {
          this.helper.parentNode.removeChild(this.helper);
        }

        if (!this.container) {
          return;
        }

        Object.keys(this.events).forEach(function (key) {
          return events[key].forEach(function (eventName) {
            return _this3.container.removeEventListener(eventName, _this3.events[key]);
          });
        });
        this.container.removeEventListener('keydown', this.handleKeyDown);
      }
    }, {
      key: "updateHelperPosition",
      value: function updateHelperPosition(event) {
        var _this$props6 = this.props,
            lockAxis = _this$props6.lockAxis,
            lockOffset = _this$props6.lockOffset,
            lockToContainerEdges = _this$props6.lockToContainerEdges,
            transitionDuration = _this$props6.transitionDuration,
            _this$props6$keyboard = _this$props6.keyboardSortingTransitionDuration,
            keyboardSortingTransitionDuration = _this$props6$keyboard === void 0 ? transitionDuration : _this$props6$keyboard;
        var isKeySorting = this.manager.isKeySorting;
        var ignoreTransition = event.ignoreTransition;
        var offset = getPosition(event);
        var translate = {
          x: offset.x - this.initialOffset.x,
          y: offset.y - this.initialOffset.y
        };
        translate.y -= window.pageYOffset - this.initialWindowScroll.top;
        translate.x -= window.pageXOffset - this.initialWindowScroll.left;
        this.translate = translate;

        if (lockToContainerEdges) {
          var _getLockPixelOffsets = getLockPixelOffsets({
            height: this.height,
            lockOffset: lockOffset,
            width: this.width
          }),
              _getLockPixelOffsets2 = _slicedToArray(_getLockPixelOffsets, 2),
              minLockOffset = _getLockPixelOffsets2[0],
              maxLockOffset = _getLockPixelOffsets2[1];

          var minOffset = {
            x: this.width / 2 - minLockOffset.x,
            y: this.height / 2 - minLockOffset.y
          };
          var maxOffset = {
            x: this.width / 2 - maxLockOffset.x,
            y: this.height / 2 - maxLockOffset.y
          };
          translate.x = limit(this.minTranslate.x + minOffset.x, this.maxTranslate.x - maxOffset.x, translate.x);
          translate.y = limit(this.minTranslate.y + minOffset.y, this.maxTranslate.y - maxOffset.y, translate.y);
        }

        if (lockAxis === 'x') {
          translate.y = 0;
        } else if (lockAxis === 'y') {
          translate.x = 0;
        }

        if (isKeySorting && keyboardSortingTransitionDuration && !ignoreTransition) {
          setTransitionDuration(this.helper, keyboardSortingTransitionDuration);
        }

        setTranslate3d(this.helper, translate);
      }
    }, {
      key: "animateNodes",
      value: function animateNodes() {
        var _this$props7 = this.props,
            transitionDuration = _this$props7.transitionDuration,
            hideSortableGhost = _this$props7.hideSortableGhost,
            onSortOver = _this$props7.onSortOver;
        var containerScrollDelta = this.containerScrollDelta,
            windowScrollDelta = this.windowScrollDelta;
        var nodes = this.manager.getOrderedRefs();
        var sortingOffset = {
          left: this.offsetEdge.left + this.translate.x + containerScrollDelta.left,
          top: this.offsetEdge.top + this.translate.y + containerScrollDelta.top
        };
        var isKeySorting = this.manager.isKeySorting;
        var prevIndex = this.newIndex;
        this.newIndex = null;

        for (var i = 0, len = nodes.length; i < len; i++) {
          var _node3 = nodes[i].node;
          var index = _node3.sortableInfo.index;
          var width = _node3.offsetWidth;
          var height = _node3.offsetHeight;
          var offset = {
            height: this.height > height ? height / 2 : this.height / 2,
            width: this.width > width ? width / 2 : this.width / 2
          };
          var mustShiftBackward = isKeySorting && index > this.index && index <= prevIndex;
          var mustShiftForward = isKeySorting && index < this.index && index >= prevIndex;
          var translate = {
            x: 0,
            y: 0
          };
          var edgeOffset = nodes[i].edgeOffset;

          if (!edgeOffset) {
            edgeOffset = getEdgeOffset(_node3, this.container);
            nodes[i].edgeOffset = edgeOffset;

            if (isKeySorting) {
              nodes[i].boundingClientRect = getScrollAdjustedBoundingClientRect(_node3, containerScrollDelta);
            }
          }

          var nextNode = i < nodes.length - 1 && nodes[i + 1];
          var prevNode = i > 0 && nodes[i - 1];

          if (nextNode && !nextNode.edgeOffset) {
            nextNode.edgeOffset = getEdgeOffset(nextNode.node, this.container);

            if (isKeySorting) {
              nextNode.boundingClientRect = getScrollAdjustedBoundingClientRect(nextNode.node, containerScrollDelta);
            }
          }

          if (index === this.index) {
            if (hideSortableGhost) {
              this.sortableGhost = _node3;
              setInlineStyles(_node3, {
                opacity: 0,
                visibility: 'hidden'
              });
            }

            continue;
          }

          if (transitionDuration) {
            setTransitionDuration(_node3, transitionDuration);
          }

          if (this.axis.x) {
            if (this.axis.y) {
              if (mustShiftForward || index < this.index && (sortingOffset.left + windowScrollDelta.left - offset.width <= edgeOffset.left && sortingOffset.top + windowScrollDelta.top <= edgeOffset.top + offset.height || sortingOffset.top + windowScrollDelta.top + offset.height <= edgeOffset.top)) {
                translate.x = this.width + this.marginOffset.x;

                if (edgeOffset.left + translate.x > this.containerBoundingRect.width - offset.width) {
                  if (nextNode) {
                    translate.x = nextNode.edgeOffset.left - edgeOffset.left;
                    translate.y = nextNode.edgeOffset.top - edgeOffset.top;
                  }
                }

                if (this.newIndex === null) {
                  this.newIndex = index;
                }
              } else if (mustShiftBackward || index > this.index && (sortingOffset.left + windowScrollDelta.left + offset.width >= edgeOffset.left && sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top || sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top + height)) {
                translate.x = -(this.width + this.marginOffset.x);

                if (edgeOffset.left + translate.x < this.containerBoundingRect.left + offset.width) {
                  if (prevNode) {
                    translate.x = prevNode.edgeOffset.left - edgeOffset.left;
                    translate.y = prevNode.edgeOffset.top - edgeOffset.top;
                  }
                }

                this.newIndex = index;
              }
            } else {
              if (mustShiftBackward || index > this.index && sortingOffset.left + windowScrollDelta.left + offset.width >= edgeOffset.left) {
                translate.x = -(this.width + this.marginOffset.x);
                this.newIndex = index;
              } else if (mustShiftForward || index < this.index && sortingOffset.left + windowScrollDelta.left <= edgeOffset.left + offset.width) {
                translate.x = this.width + this.marginOffset.x;

                if (this.newIndex == null) {
                  this.newIndex = index;
                }
              }
            }
          } else if (this.axis.y) {
            if (mustShiftBackward || index > this.index && sortingOffset.top + windowScrollDelta.top + offset.height >= edgeOffset.top) {
              translate.y = -(this.height + this.marginOffset.y);
              this.newIndex = index;
            } else if (mustShiftForward || index < this.index && sortingOffset.top + windowScrollDelta.top <= edgeOffset.top + offset.height) {
              translate.y = this.height + this.marginOffset.y;

              if (this.newIndex == null) {
                this.newIndex = index;
              }
            }
          }

          setTranslate3d(_node3, translate);
          nodes[i].translate = translate;
        }

        if (this.newIndex == null) {
          this.newIndex = this.index;
        }

        if (isKeySorting) {
          this.newIndex = prevIndex;
        }

        var oldIndex = isKeySorting ? this.prevIndex : prevIndex;

        if (onSortOver && this.newIndex !== oldIndex) {
          onSortOver({
            collection: this.manager.active.collection,
            index: this.index,
            newIndex: this.newIndex,
            oldIndex: oldIndex,
            isKeySorting: isKeySorting,
            nodes: nodes,
            helper: this.helper
          });
        }
      }
    }, {
      key: "getWrappedInstance",
      value: function getWrappedInstance() {
        browser(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableContainer() call');
        return this.wrappedInstance.current;
      }
    }, {
      key: "getContainer",
      value: function getContainer() {
        var getContainer = this.props.getContainer;

        if (typeof getContainer !== 'function') {
          return findDOMNode(this);
        }

        return getContainer(config.withRef ? this.getWrappedInstance() : undefined);
      }
    }, {
      key: "render",
      value: function render() {
        var ref = config.withRef ? this.wrappedInstance : null;
        return createElement(SortableContext.Provider, {
          value: this.sortableContextValue
        }, createElement(WrappedComponent, _extends({
          ref: ref
        }, omit(this.props, omittedProps))));
      }
    }, {
      key: "helperContainer",
      get: function get() {
        var helperContainer = this.props.helperContainer;

        if (typeof helperContainer === 'function') {
          return helperContainer();
        }

        return this.props.helperContainer || this.document.body;
      }
    }, {
      key: "containerScrollDelta",
      get: function get() {
        var useWindowAsScrollContainer = this.props.useWindowAsScrollContainer;

        if (useWindowAsScrollContainer) {
          return {
            left: 0,
            top: 0
          };
        }

        return {
          left: this.scrollContainer.scrollLeft - this.initialScroll.left,
          top: this.scrollContainer.scrollTop - this.initialScroll.top
        };
      }
    }, {
      key: "windowScrollDelta",
      get: function get() {
        return {
          left: this.contentWindow.pageXOffset - this.initialWindowScroll.left,
          top: this.contentWindow.pageYOffset - this.initialWindowScroll.top
        };
      }
    }]);

    return WithSortableContainer;
  }(Component), _defineProperty(_class, "displayName", provideDisplayName('sortableList', WrappedComponent)), _defineProperty(_class, "defaultProps", defaultProps), _defineProperty(_class, "propTypes", propTypes), _temp;
}

var propTypes$1 = {
  index: propTypes$2.number.isRequired,
  collection: propTypes$2.oneOfType([propTypes$2.number, propTypes$2.string]),
  disabled: propTypes$2.bool
};
var omittedProps$1 = Object.keys(propTypes$1);

function sortableElement(WrappedComponent) {
  var _class, _temp;

  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    withRef: false
  };
  return _temp = _class = function (_React$Component) {
    _inherits(WithSortableElement, _React$Component);

    function WithSortableElement() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WithSortableElement);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithSortableElement)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "wrappedInstance", createRef());

      return _this;
    }

    _createClass(WithSortableElement, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.register();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.node) {
          if (prevProps.index !== this.props.index) {
            this.node.sortableInfo.index = this.props.index;
          }

          if (prevProps.disabled !== this.props.disabled) {
            this.node.sortableInfo.disabled = this.props.disabled;
          }
        }

        if (prevProps.collection !== this.props.collection) {
          this.unregister(prevProps.collection);
          this.register();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unregister();
      }
    }, {
      key: "register",
      value: function register() {
        var _this$props = this.props,
            collection = _this$props.collection,
            disabled = _this$props.disabled,
            index = _this$props.index;
        var node = findDOMNode(this);
        node.sortableInfo = {
          collection: collection,
          disabled: disabled,
          index: index,
          manager: this.context.manager
        };
        this.node = node;
        this.ref = {
          node: node
        };
        this.context.manager.add(collection, this.ref);
      }
    }, {
      key: "unregister",
      value: function unregister() {
        var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.collection;
        this.context.manager.remove(collection, this.ref);
      }
    }, {
      key: "getWrappedInstance",
      value: function getWrappedInstance() {
        browser(config.withRef, 'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableElement() call');
        return this.wrappedInstance.current;
      }
    }, {
      key: "render",
      value: function render() {
        var ref = config.withRef ? this.wrappedInstance : null;
        return createElement(WrappedComponent, _extends({
          ref: ref
        }, omit(this.props, omittedProps$1)));
      }
    }]);

    return WithSortableElement;
  }(Component), _defineProperty(_class, "displayName", provideDisplayName('sortableElement', WrappedComponent)), _defineProperty(_class, "contextType", SortableContext), _defineProperty(_class, "propTypes", propTypes$1), _defineProperty(_class, "defaultProps", {
    collection: 0
  }), _temp;
}

/**
 * Provides scheme settings.
 * @param props props
 */
function SchemeSettingPanel(props) {
    useStyles$1();
    var postType = props.postType; props.onChange;
    var _a = __read(useState(0), 2), trigger = _a[0], setTrigger = _a[1];
    function addScheme() {
        return __awaiter(this, void 0, void 0, function () {
            var edited;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showFieldTypeEditDialogAsync(new Scheme({
                            schemeId: v4()
                        }))];
                    case 1:
                        edited = _a.sent();
                        if (!edited) {
                            return [2 /*return*/];
                        }
                        props.onChange && props.onChange(props.postType.clone({
                            taxonomy: props.postType.taxonomy.clone({
                                schemes: __spreadArray(__spreadArray([], __read(postType.taxonomy.schemes)), [
                                    edited
                                ])
                            })
                        }));
                        setTrigger(trigger + 1);
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleChangeScheme(scheme) {
        var schemes = postType.taxonomy.schemes;
        var _scheme = schemes.find(function (s) { return s.schemeId === scheme.schemeId; });
        if (_scheme) {
            var i = schemes.indexOf(_scheme);
            schemes[i] = scheme;
            props.onChange && props.onChange(props.postType.clone({
                taxonomy: props.postType.taxonomy.clone({
                    schemes: __spreadArray([], __read(schemes))
                })
            }));
        }
    }
    function handleSortScheme(from, to) {
        props.onChange && props.onChange(props.postType.clone({
            taxonomy: props.postType.taxonomy.clone({
                schemes: arrayMove(postType.taxonomy.schemes, from, to)
            })
        }));
    }
    function handleChangeFieldType(scheme) {
        return __awaiter(this, void 0, void 0, function () {
            var edited, schemes, _scheme, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showFieldTypeEditDialogAsync(scheme)];
                    case 1:
                        edited = _a.sent();
                        if (!edited) {
                            return [2 /*return*/];
                        }
                        schemes = postType.taxonomy.schemes;
                        _scheme = schemes.find(function (s) { return s.schemeId === edited.schemeId; });
                        if (_scheme) {
                            i = schemes.indexOf(_scheme);
                            schemes[i] = edited;
                            props.onChange && props.onChange(props.postType.clone({
                                taxonomy: props.postType.taxonomy.clone({
                                    schemes: __spreadArray([], __read(schemes))
                                })
                            }));
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleDelete(scheme, i) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, confirmAsync("フィールドを削除しますか？")];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        props.onChange && props.onChange(props.postType.clone({
                            taxonomy: props
                                .postType
                                .taxonomy
                                .clone({
                                schemes: __spreadArray([], __read(postType
                                    .taxonomy
                                    .schemes
                                    .filter(function (s) { return s !== scheme; })))
                            })
                        }));
                        setTrigger(trigger + 1);
                        return [2 /*return*/];
                }
            });
        });
    }
    var SortableItem = sortableElement(function (props) {
        return jsxRuntime.jsx(m, __assign({ flipId: props.value.schemeId, translate: true }, { children: jsxRuntime.jsx("div", __assign({ style: { padding: "4px" } }, { children: jsxRuntime.jsx(SchemeItem, { scheme: props.value, deletePresssed: function () { return props.deleteHandler(props.value, props.sortIndex); }, editPressed: function () { return props.changeFieldTypeHandler(props.value); }, onChange: function (s) { return props.changeSchemeHandler(s); } }, void 0) }), void 0) }), void 0);
    });
    var SortableList = sortableContainer(function (props) {
        return (jsxRuntime.jsx(u, __assign({ flipKey: "key_" + props.trigger }, { children: props.items.map(function (s, i) { return (jsxRuntime.jsx(SortableItem, { index: i, sortIndex: i, value: s, deleteHandler: function (s, i) { return props.deleteHandler(s, i); }, changeFieldTypeHandler: function (s) { return props.changeFieldTypeHandler(s); }, changeSchemeHandler: function (s) { return props.changeSchemeHandler(s); } }, "item-" + s.schemeId)); }) }), void 0));
    });
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(Box, __assign({ mt: 6, display: "flex", flexDirection: "column", maxWidth: "960px", width: "100%" }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "h6" }, { children: "API\u30B9\u30AD\u30FC\u30E0" }), void 0),
                jsxRuntime.jsx(Typography, __assign({ color: "textSecondary", variant: "caption" }, { children: "\u7BA1\u7406\u3059\u308B\u30B3\u30F3\u30C6\u30F3\u30C4\u306E\u30B9\u30AD\u30FC\u30E0\u3092\u5B9A\u7FA9\u3057\u307E\u3059\u3002" }), void 0),
                jsxRuntime.jsx(SortableList, { trigger: trigger, useDragHandle: true, items: postType.taxonomy.schemes, onSortEnd: function (_a) {
                        var oldIndex = _a.oldIndex, newIndex = _a.newIndex;
                        return handleSortScheme(oldIndex, newIndex);
                    }, deleteHandler: function (s, i) { return handleDelete(s); }, changeFieldTypeHandler: function (s) { return handleChangeFieldType(s); }, changeSchemeHandler: function (s) { return handleChangeScheme(s); } }, void 0),
                jsxRuntime.jsx(Box, { mt: 3 }, void 0),
                jsxRuntime.jsxs(Button, __assign({ onClick: addScheme }, { children: [jsxRuntime.jsx(Icon, { children: "add" }, void 0), "\u30B9\u30AD\u30FC\u30E0\u3092\u8FFD\u52A0"] }), void 0)] }), void 0) }, void 0));
}
var DragHandle = sortableHandle(function () { return jsxRuntime.jsx(Box, __assign({ style: { cursor: "pointer" }, width: "40px", display: "flex", alignItems: "center" }, { children: jsxRuntime.jsx(Icon, __assign({ fontSize: "small" }, { children: "reorder" }), void 0) }), void 0); });
/**
 * for a scheme editing.
 * @param props props
 */
function SchemeItem(props) {
    return (jsxRuntime.jsx(Paper, __assign({ style: { padding: "8px" } }, { children: jsxRuntime.jsxs(Box, __assign({ display: "flex" }, { children: [jsxRuntime.jsx(DragHandle, {}, void 0),
                jsxRuntime.jsx(Box, __assign({ flex: "1 1 auto", overflow: "hidden" }, { children: jsxRuntime.jsxs(StyledGrid, __assign({ container: true }, { children: [jsxRuntime.jsx(StyledGrid, __assign({ item: true, xs: 12, sm: 6, md: 3 }, { children: jsxRuntime.jsxs(Box, __assign({ p: 1 }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "caption", color: "textSecondary", noWrap: true }, { children: "\u30D5\u30A3\u30FC\u30EB\u30C9\u540D" }), void 0),
                                        jsxRuntime.jsx(Box, { mt: 1 }, void 0),
                                        jsxRuntime.jsx(Typography, __assign({ color: "primary", noWrap: true }, { children: props.scheme.name }), void 0)] }), void 0) }), void 0),
                            jsxRuntime.jsx(StyledGrid, __assign({ item: true, xs: 12, sm: 6, md: 3 }, { children: jsxRuntime.jsxs(Box, __assign({ p: 1 }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "caption", color: "textSecondary", noWrap: true }, { children: "\u8868\u793A\u540D" }), void 0),
                                        jsxRuntime.jsx(Box, { mt: 1 }, void 0),
                                        jsxRuntime.jsx(Typography, __assign({ color: "primary", noWrap: true }, { children: props.scheme.displayName }), void 0)] }), void 0) }), void 0),
                            jsxRuntime.jsx(StyledGrid, __assign({ item: true, xs: 12, sm: 6, md: 3 }, { children: jsxRuntime.jsxs(Box, __assign({ p: 1 }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "caption", color: "textSecondary", noWrap: true }, { children: "\u5099\u8003" }), void 0),
                                        jsxRuntime.jsx(Box, { mt: 1 }, void 0),
                                        jsxRuntime.jsx(WrappedTextBlock, __assign({ color: "textSecondary", row: 3, variant: "caption", fontSize: "12px" }, { children: props.scheme.description }), void 0)] }), void 0) }), void 0),
                            jsxRuntime.jsx(StyledGrid, __assign({ item: true, xs: 12, sm: 6, md: 3 }, { children: jsxRuntime.jsxs(Box, __assign({ p: 1 }, { children: [jsxRuntime.jsx(Typography, __assign({ variant: "caption", color: "textSecondary", noWrap: true }, { children: "\u30D5\u30A3\u30FC\u30EB\u30C9\u30BF\u30A4\u30D7" }), void 0),
                                        jsxRuntime.jsx(Box, { mt: 1 }, void 0),
                                        jsxRuntime.jsx(Typography, __assign({ color: "primary", noWrap: true }, { children: schemeTypeDisplayNames[props.scheme.type] }), void 0)] }), void 0) }), void 0)] }), void 0) }), void 0),
                jsxRuntime.jsxs(Box, __assign({ width: "60px", display: "flex", alignItems: "center", justifyContent: "flex-end" }, { children: [jsxRuntime.jsx(IconButton, __assign({ onClick: props.editPressed, size: "small", color: "primary" }, { children: jsxRuntime.jsx(Icon, { children: "edit" }, void 0) }), void 0),
                        jsxRuntime.jsx(IconButton, __assign({ onClick: props.deletePresssed, size: "small", color: "primary" }, { children: jsxRuntime.jsx(Icon, { children: "delete" }, void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
}
var useStyles$1 = makeStyles({
    itemTitle: {
        width: "320px"
    }
});

var PostTypeEditPage = observer(function () {
    var _a = __read(useState(new PostType({
        taxonomy: new Taxonomy({
            description: "",
            name: "",
            displayName: "",
            identifier: "",
            schemes: [],
            taxonomyId: ""
        })
    })), 2), postType = _a[0], setPostType = _a[1];
    var _b = __read(useState(false), 2), isNew = _b[0], setIsNew = _b[1];
    var _c = __read(useState(false), 2), isChanged = _c[0], setIsChanged = _c[1];
    var taxonomyName = useRouteMatch();
    var history = useHistory();
    function init() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, services.postManagementsService.fetchPostTypes()];
                    case 1:
                        _a.sent();
                        if (taxonomyName.params.taxonomy === "new") {
                            setIsNew(true);
                        }
                        else {
                            if (taxonomyName.params.taxonomy) {
                                services.postManagementsService.selectFromName(taxonomyName.params.taxonomy);
                            }
                            if (services.postManagementsService.selected) {
                                setPostType(services.postManagementsService.selected);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    useEffect(function () {
        init();
    }, []);
    function handleCreate() {
        var _a;
        console.log(postType);
        if (isNew) {
            services.postManagementsService.createPostTypeAsync({
                taxonomy: postType.taxonomy,
                displayFormat: postType.displayFormat
            });
        }
        else {
            services.postManagementsService.savePostTypeAsync({
                postTypeId: postType.postTypeId,
                taxonomy: postType.taxonomy,
                displayFormat: postType.displayFormat
            });
        }
        history.push("/posts/" + ((_a = services.postManagementsService.selected) === null || _a === void 0 ? void 0 : _a.taxonomy.name));
    }
    return jsxRuntime.jsxs(Box, __assign({ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", height: "100%", overflow: "auto", p: 3 }, { children: [jsxRuntime.jsx(Box, __assign({ mt: 4, display: "flex", alignItems: "center", maxWidth: "960px", width: "100%" }, { children: jsxRuntime.jsx(Typography, __assign({ variant: "h4" }, { children: isNew ? "投稿タイプを作成" : "投稿タイプを編集" }), void 0) }), void 0),
            jsxRuntime.jsx(PostTypeBasicSettingPanel, { postType: postType, onChange: function (p) {
                    setPostType(p);
                    setIsChanged(true);
                } }, void 0),
            jsxRuntime.jsx(SchemeSettingPanel, { postType: postType, onChange: function (p) {
                    setPostType(p);
                    setIsChanged(true);
                } }, void 0),
            jsxRuntime.jsx(Box, __assign({ mt: 4 }, { children: jsxRuntime.jsx(Button, __assign({ disabled: !(postType.taxonomy.name && postType.taxonomy.displayName) || !isChanged, color: "primary", onClick: function () { return handleCreate(); }, variant: "contained" }, { children: isNew ? "作成" : "保存" }), void 0) }), void 0)] }), void 0);
});

export default PostTypeEditPage;
