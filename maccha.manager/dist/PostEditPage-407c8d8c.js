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

import { aJ as _inheritsLoose, aK as _objectWithoutPropertiesLoose, aL as Transition, a as _extends, aM as classNamesShape, p as propTypes, n as makeStyles, w as withStyles, _ as _objectWithoutProperties, c as clsx, B as Button, af as createStyles, aN as Popover, I as IconButton, T as Typography, aO as SvgIcon, at as _classCallCheck, as as _createClass, aP as TransitionGroup, u as useTheme, aa as _defineProperty, L as _slicedToArray, N as fade, aQ as Toolbar, aA as createCommonjsModule, aI as getDefaultExportFromCjs, a2 as useRouteMatch, f as useHistory, g as __read, k as jsxRuntime, R as Box, m as __assign, S as Select, a7 as MenuItem, U as Divider, aR as StatusType, aS as DateTime_1, V as axios, i as __awaiter, j as __generator, Y as Icon, s as services, a3 as ObserverComponent } from './index.lib-fcbd3dfd.js';
import React, { createContext, useMemo, createElement, useContext, useEffect, useLayoutEffect, Fragment, useRef, Component, useCallback, cloneElement, memo, forwardRef, useState, useDebugValue } from 'react';
import { c as confirmAsync } from './confirmAsync-5da1581e.js';
import { _ as _inherits, a as _possibleConstructorReturn, b as _getPrototypeOf, s as showMediaSelectionDialog, e as editors } from './index-cbff7fd0.js';
import { a as postStatusTypes } from './PostStatusType-46fd11ad.js';
import { a as Dialog, b as DialogContent, c as DialogActions } from './showDialog-7310d02a.js';
import { C as CircularProgress } from './ColorPalette-143c647b.js';
import { I as InputAdornment } from './InputAdornment-9742992a.js';
import { T as TextField } from './TextField-65867e0e.js';
import './style-fa5f813c.js';
import 'react-dom';
import './index-bf1946b4.js';
import './Add-d9b63b49.js';
import './Switch-ce04320b.js';

function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!hasClass(element, className)) if (typeof element.className === 'string') element.className = element.className + " " + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + " " + className);
}

function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}

function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === 'string') {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
  }
}

var _addClass = function addClass$1(node, classes) {
  return node && classes && classes.split(' ').forEach(function (c) {
    return addClass(node, c);
  });
};

var removeClass$1 = function removeClass$1(node, classes) {
  return node && classes && classes.split(' ').forEach(function (c) {
    return removeClass(node, c);
  });
};
/**
 * A transition component inspired by the excellent
 * [ng-animate](https://docs.angularjs.org/api/ngAnimate) library, you should
 * use it if you're using CSS transitions or animations. It's built upon the
 * [`Transition`](https://reactcommunity.org/react-transition-group/transition)
 * component, so it inherits all of its props.
 *
 * `CSSTransition` applies a pair of class names during the `appear`, `enter`,
 * and `exit` states of the transition. The first class is applied and then a
 * second `*-active` class in order to activate the CSS transition. After the
 * transition, matching `*-done` class names are applied to persist the
 * transition state.
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <CSSTransition in={inProp} timeout={200} classNames="my-node">
 *         <div>
 *           {"I'll receive my-node-* classes"}
 *         </div>
 *       </CSSTransition>
 *       <button type="button" onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the `in` prop is set to `true`, the child component will first receive
 * the class `example-enter`, then the `example-enter-active` will be added in
 * the next tick. `CSSTransition` [forces a
 * reflow](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
 * between before adding the `example-enter-active`. This is an important trick
 * because it allows us to transition between `example-enter` and
 * `example-enter-active` even though they were added immediately one after
 * another. Most notably, this is what makes it possible for us to animate
 * _appearance_.
 *
 * ```css
 * .my-node-enter {
 *   opacity: 0;
 * }
 * .my-node-enter-active {
 *   opacity: 1;
 *   transition: opacity 200ms;
 * }
 * .my-node-exit {
 *   opacity: 1;
 * }
 * .my-node-exit-active {
 *   opacity: 0;
 *   transition: opacity 200ms;
 * }
 * ```
 *
 * `*-active` classes represent which styles you want to animate **to**, so it's
 * important to add `transition` declaration only to them, otherwise transitions
 * might not behave as intended! This might not be obvious when the transitions
 * are symmetrical, i.e. when `*-enter-active` is the same as `*-exit`, like in
 * the example above (minus `transition`), but it becomes apparent in more
 * complex transitions.
 *
 * **Note**: If you're using the
 * [`appear`](http://reactcommunity.org/react-transition-group/transition#Transition-prop-appear)
 * prop, make sure to define styles for `.appear-*` classes as well.
 */


var CSSTransition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(CSSTransition, _React$Component);

  function CSSTransition() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.appliedClasses = {
      appear: {},
      enter: {},
      exit: {}
    };

    _this.onEnter = function (maybeNode, maybeAppearing) {
      var _this$resolveArgument = _this.resolveArguments(maybeNode, maybeAppearing),
          node = _this$resolveArgument[0],
          appearing = _this$resolveArgument[1];

      _this.removeClasses(node, 'exit');

      _this.addClass(node, appearing ? 'appear' : 'enter', 'base');

      if (_this.props.onEnter) {
        _this.props.onEnter(maybeNode, maybeAppearing);
      }
    };

    _this.onEntering = function (maybeNode, maybeAppearing) {
      var _this$resolveArgument2 = _this.resolveArguments(maybeNode, maybeAppearing),
          node = _this$resolveArgument2[0],
          appearing = _this$resolveArgument2[1];

      var type = appearing ? 'appear' : 'enter';

      _this.addClass(node, type, 'active');

      if (_this.props.onEntering) {
        _this.props.onEntering(maybeNode, maybeAppearing);
      }
    };

    _this.onEntered = function (maybeNode, maybeAppearing) {
      var _this$resolveArgument3 = _this.resolveArguments(maybeNode, maybeAppearing),
          node = _this$resolveArgument3[0],
          appearing = _this$resolveArgument3[1];

      var type = appearing ? 'appear' : 'enter';

      _this.removeClasses(node, type);

      _this.addClass(node, type, 'done');

      if (_this.props.onEntered) {
        _this.props.onEntered(maybeNode, maybeAppearing);
      }
    };

    _this.onExit = function (maybeNode) {
      var _this$resolveArgument4 = _this.resolveArguments(maybeNode),
          node = _this$resolveArgument4[0];

      _this.removeClasses(node, 'appear');

      _this.removeClasses(node, 'enter');

      _this.addClass(node, 'exit', 'base');

      if (_this.props.onExit) {
        _this.props.onExit(maybeNode);
      }
    };

    _this.onExiting = function (maybeNode) {
      var _this$resolveArgument5 = _this.resolveArguments(maybeNode),
          node = _this$resolveArgument5[0];

      _this.addClass(node, 'exit', 'active');

      if (_this.props.onExiting) {
        _this.props.onExiting(maybeNode);
      }
    };

    _this.onExited = function (maybeNode) {
      var _this$resolveArgument6 = _this.resolveArguments(maybeNode),
          node = _this$resolveArgument6[0];

      _this.removeClasses(node, 'exit');

      _this.addClass(node, 'exit', 'done');

      if (_this.props.onExited) {
        _this.props.onExited(maybeNode);
      }
    };

    _this.resolveArguments = function (maybeNode, maybeAppearing) {
      return _this.props.nodeRef ? [_this.props.nodeRef.current, maybeNode] // here `maybeNode` is actually `appearing`
      : [maybeNode, maybeAppearing];
    };

    _this.getClassNames = function (type) {
      var classNames = _this.props.classNames;
      var isStringClassNames = typeof classNames === 'string';
      var prefix = isStringClassNames && classNames ? classNames + "-" : '';
      var baseClassName = isStringClassNames ? "" + prefix + type : classNames[type];
      var activeClassName = isStringClassNames ? baseClassName + "-active" : classNames[type + "Active"];
      var doneClassName = isStringClassNames ? baseClassName + "-done" : classNames[type + "Done"];
      return {
        baseClassName: baseClassName,
        activeClassName: activeClassName,
        doneClassName: doneClassName
      };
    };

    return _this;
  }

  var _proto = CSSTransition.prototype;

  _proto.addClass = function addClass(node, type, phase) {
    var className = this.getClassNames(type)[phase + "ClassName"];

    var _this$getClassNames = this.getClassNames('enter'),
        doneClassName = _this$getClassNames.doneClassName;

    if (type === 'appear' && phase === 'done' && doneClassName) {
      className += " " + doneClassName;
    } // This is for to force a repaint,
    // which is necessary in order to transition styles when adding a class name.


    if (phase === 'active') {
      /* eslint-disable no-unused-expressions */
      node && node.scrollTop;
    }

    if (className) {
      this.appliedClasses[type][phase] = className;

      _addClass(node, className);
    }
  };

  _proto.removeClasses = function removeClasses(node, type) {
    var _this$appliedClasses$ = this.appliedClasses[type],
        baseClassName = _this$appliedClasses$.base,
        activeClassName = _this$appliedClasses$.active,
        doneClassName = _this$appliedClasses$.done;
    this.appliedClasses[type] = {};

    if (baseClassName) {
      removeClass$1(node, baseClassName);
    }

    if (activeClassName) {
      removeClass$1(node, activeClassName);
    }

    if (doneClassName) {
      removeClass$1(node, doneClassName);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props;
        _this$props.classNames;
        var props = _objectWithoutPropertiesLoose(_this$props, ["classNames"]);

    return /*#__PURE__*/React.createElement(Transition, _extends({}, props, {
      onEnter: this.onEnter,
      onEntered: this.onEntered,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }));
  };

  return CSSTransition;
}(React.Component);

CSSTransition.defaultProps = {
  classNames: ''
};
CSSTransition.propTypes = process.env.NODE_ENV !== "production" ? _extends({}, Transition.propTypes, {
  /**
   * The animation classNames applied to the component as it appears, enters,
   * exits or has finished the transition. A single name can be provided, which
   * will be suffixed for each stage, e.g. `classNames="fade"` applies:
   *
   * - `fade-appear`, `fade-appear-active`, `fade-appear-done`
   * - `fade-enter`, `fade-enter-active`, `fade-enter-done`
   * - `fade-exit`, `fade-exit-active`, `fade-exit-done`
   *
   * A few details to note about how these classes are applied:
   *
   * 1. They are _joined_ with the ones that are already defined on the child
   *    component, so if you want to add some base styles, you can use
   *    `className` without worrying that it will be overridden.
   *
   * 2. If the transition component mounts with `in={false}`, no classes are
   *    applied yet. You might be expecting `*-exit-done`, but if you think
   *    about it, a component cannot finish exiting if it hasn't entered yet.
   *
   * 2. `fade-appear-done` and `fade-enter-done` will _both_ be applied. This
   *    allows you to define different behavior for when appearing is done and
   *    when regular entering is done, using selectors like
   *    `.fade-enter-done:not(.fade-appear-done)`. For example, you could apply
   *    an epic entrance animation when element first appears in the DOM using
   *    [Animate.css](https://daneden.github.io/animate.css/). Otherwise you can
   *    simply use `fade-enter-done` for defining both cases.
   *
   * Each individual classNames can also be specified independently like:
   *
   * ```js
   * classNames={{
   *  appear: 'my-appear',
   *  appearActive: 'my-active-appear',
   *  appearDone: 'my-done-appear',
   *  enter: 'my-enter',
   *  enterActive: 'my-active-enter',
   *  enterDone: 'my-done-enter',
   *  exit: 'my-exit',
   *  exitActive: 'my-active-exit',
   *  exitDone: 'my-done-exit',
   * }}
   * ```
   *
   * If you want to set these classes using CSS Modules:
   *
   * ```js
   * import styles from './styles.css';
   * ```
   *
   * you might want to use camelCase in your CSS file, that way could simply
   * spread them instead of listing them one by one:
   *
   * ```js
   * classNames={{ ...styles }}
   * ```
   *
   * @type {string | {
   *  appear?: string,
   *  appearActive?: string,
   *  appearDone?: string,
   *  enter?: string,
   *  enterActive?: string,
   *  enterDone?: string,
   *  exit?: string,
   *  exitActive?: string,
   *  exitDone?: string,
   * }}
   */
  classNames: classNamesShape,

  /**
   * A `<Transition>` callback fired immediately after the 'enter' or 'appear' class is
   * applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEnter: propTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'enter-active' or
   * 'appear-active' class is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: propTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'enter' or
   * 'appear' classes are **removed** and the `done` class is added to the DOM node.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntered: propTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit' class is
   * applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement)
   */
  onExit: propTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit-active' is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement)
   */
  onExiting: propTypes.func,

  /**
   * A `<Transition>` callback fired immediately after the 'exit' classes
   * are **removed** and the `exit-done` class is added to the DOM node.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement)
   */
  onExited: propTypes.func
}) : {};

var MuiPickersContext = createContext(null);

var MuiPickersUtilsProvider = function MuiPickersUtilsProvider(_ref) {
  var Utils = _ref.utils,
      children = _ref.children,
      locale = _ref.locale,
      libInstance = _ref.libInstance;
  var utils = useMemo(function () {
    return new Utils({
      locale: locale,
      instance: libInstance
    });
  }, [Utils, libInstance, locale]);
  return createElement(MuiPickersContext.Provider, {
    value: utils,
    children: children
  });
};

process.env.NODE_ENV !== "production" ? MuiPickersUtilsProvider.propTypes = {
  utils: propTypes.func.isRequired,
  locale: propTypes.oneOfType([propTypes.object, propTypes.string]),
  children: propTypes.oneOfType([propTypes.element.isRequired, propTypes.arrayOf(propTypes.element.isRequired)]).isRequired
} : void 0;

var checkUtils = function checkUtils(utils) {
  if (!utils) {
    // tslint:disable-next-line
    throw new Error('Can not find utils in context. You either a) forgot to wrap your component tree in MuiPickersUtilsProvider; or b) mixed named and direct file imports.  Recommendation: use named imports from the module index.');
  }
};

function useUtils() {
  var utils = useContext(MuiPickersContext);
  checkUtils(utils);
  return utils;
}

/** Use it instead of .includes method for IE support */

function arrayIncludes(array, itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(function (item) {
      return array.indexOf(item) !== -1;
    });
  }

  return array.indexOf(itemOrItems) !== -1;
}

var DIALOG_WIDTH = 310;
var DIALOG_WIDTH_WIDER = 325;
var VIEW_HEIGHT = 305;
var useStyles = makeStyles(function (theme) {
  return {
    staticWrapperRoot: {
      overflow: 'hidden',
      minWidth: DIALOG_WIDTH,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper
    }
  };
}, {
  name: 'MuiPickersStaticWrapper'
});

var StaticWrapper = function StaticWrapper(_ref) {
  var children = _ref.children;
  var classes = useStyles();
  return createElement("div", {
    className: classes.staticWrapperRoot,
    children: children
  });
};

var ModalDialog = function ModalDialog(_ref) {
  var children = _ref.children,
      classes = _ref.classes,
      onAccept = _ref.onAccept,
      onDismiss = _ref.onDismiss,
      onClear = _ref.onClear,
      onSetToday = _ref.onSetToday,
      okLabel = _ref.okLabel,
      cancelLabel = _ref.cancelLabel,
      clearLabel = _ref.clearLabel,
      todayLabel = _ref.todayLabel,
      clearable = _ref.clearable,
      showTodayButton = _ref.showTodayButton;
      _ref.showTabs;
      var wider = _ref.wider,
      other = _objectWithoutProperties(_ref, ["children", "classes", "onAccept", "onDismiss", "onClear", "onSetToday", "okLabel", "cancelLabel", "clearLabel", "todayLabel", "clearable", "showTodayButton", "showTabs", "wider"]);

  return createElement(Dialog, _extends({
    role: "dialog",
    onClose: onDismiss,
    classes: {
      paper: clsx(classes.dialogRoot, wider && classes.dialogRootWider)
    }
  }, other), createElement(DialogContent, {
    children: children,
    className: classes.dialog
  }), createElement(DialogActions, {
    classes: {
      root: clsx((clearable || showTodayButton) && classes.withAdditionalAction)
    }
  }, clearable && createElement(Button, {
    color: "primary",
    onClick: onClear
  }, clearLabel), showTodayButton && createElement(Button, {
    color: "primary",
    onClick: onSetToday
  }, todayLabel), cancelLabel && createElement(Button, {
    color: "primary",
    onClick: onDismiss
  }, cancelLabel), okLabel && createElement(Button, {
    color: "primary",
    onClick: onAccept
  }, okLabel)));
};

ModalDialog.displayName = 'ModalDialog';
var styles = createStyles({
  dialogRoot: {
    minWidth: DIALOG_WIDTH
  },
  dialogRootWider: {
    minWidth: DIALOG_WIDTH_WIDER
  },
  dialog: {
    '&:first-child': {
      padding: 0
    }
  },
  withAdditionalAction: {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/dmtrKovalenko/material-ui-pickers/pull/267
    justifyContent: 'flex-start',
    '& > *:first-child': {
      marginRight: 'auto'
    }
  }
});
var ModalDialog$1 = withStyles(styles, {
  name: 'MuiPickersModal'
})(ModalDialog);
var useIsomorphicEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function runKeyHandler(e, keyHandlers) {
  var handler = keyHandlers[e.key];

  if (handler) {
    handler(); // if event was handled prevent other side effects (e.g. page scroll)

    e.preventDefault();
  }
}

function useKeyDown(active, keyHandlers) {
  var keyHandlersRef = useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;
  useIsomorphicEffect(function () {
    if (active) {
      var handleKeyDown = function handleKeyDown(event) {
        runKeyHandler(event, keyHandlersRef.current);
      };

      window.addEventListener('keydown', handleKeyDown);
      return function () {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [active]);
}

var ModalWrapper = function ModalWrapper(_ref) {
  var open = _ref.open,
      children = _ref.children,
      okLabel = _ref.okLabel,
      cancelLabel = _ref.cancelLabel,
      clearLabel = _ref.clearLabel,
      todayLabel = _ref.todayLabel,
      showTodayButton = _ref.showTodayButton,
      clearable = _ref.clearable,
      DialogProps = _ref.DialogProps,
      showTabs = _ref.showTabs,
      wider = _ref.wider,
      InputComponent = _ref.InputComponent,
      DateInputProps = _ref.DateInputProps,
      onClear = _ref.onClear,
      onAccept = _ref.onAccept,
      onDismiss = _ref.onDismiss,
      onSetToday = _ref.onSetToday,
      other = _objectWithoutProperties(_ref, ["open", "children", "okLabel", "cancelLabel", "clearLabel", "todayLabel", "showTodayButton", "clearable", "DialogProps", "showTabs", "wider", "InputComponent", "DateInputProps", "onClear", "onAccept", "onDismiss", "onSetToday"]);

  useKeyDown(open, {
    Enter: onAccept
  });
  return createElement(Fragment, null, createElement(InputComponent, _extends({}, other, DateInputProps)), createElement(ModalDialog$1, _extends({
    wider: wider,
    showTabs: showTabs,
    open: open,
    onClear: onClear,
    onAccept: onAccept,
    onDismiss: onDismiss,
    onSetToday: onSetToday,
    clearLabel: clearLabel,
    todayLabel: todayLabel,
    okLabel: okLabel,
    cancelLabel: cancelLabel,
    clearable: clearable,
    showTodayButton: showTodayButton,
    children: children
  }, DialogProps)));
};

process.env.NODE_ENV !== "production" ? ModalWrapper.propTypes = {
  okLabel: propTypes.node,
  cancelLabel: propTypes.node,
  clearLabel: propTypes.node,
  clearable: propTypes.bool,
  todayLabel: propTypes.node,
  showTodayButton: propTypes.bool,
  DialogProps: propTypes.object
} : void 0;
ModalWrapper.defaultProps = {
  okLabel: 'OK',
  cancelLabel: 'Cancel',
  clearLabel: 'Clear',
  todayLabel: 'Today',
  clearable: false,
  showTodayButton: false
};

var InlineWrapper = function InlineWrapper(_ref) {
  var open = _ref.open;
      _ref.wider;
      var children = _ref.children,
      PopoverProps = _ref.PopoverProps;
      _ref.onClear;
      var onDismiss = _ref.onDismiss;
      _ref.onSetToday;
      var onAccept = _ref.onAccept;
      _ref.showTabs;
      var DateInputProps = _ref.DateInputProps,
      InputComponent = _ref.InputComponent,
      other = _objectWithoutProperties(_ref, ["open", "wider", "children", "PopoverProps", "onClear", "onDismiss", "onSetToday", "onAccept", "showTabs", "DateInputProps", "InputComponent"]);

  var ref = useRef();
  useKeyDown(open, {
    Enter: onAccept
  });
  return createElement(Fragment, null, createElement(InputComponent, _extends({}, other, DateInputProps, {
    inputRef: ref
  })), createElement(Popover, _extends({
    open: open,
    onClose: onDismiss,
    anchorEl: ref.current,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    children: children
  }, PopoverProps)));
};

process.env.NODE_ENV !== "production" ? InlineWrapper.propTypes = {
  onOpen: propTypes.func,
  onClose: propTypes.func,
  PopoverProps: propTypes.object
} : void 0;

function getWrapperFromVariant(variant) {
  switch (variant) {
    case 'inline':
      return InlineWrapper;

    case 'static':
      return StaticWrapper;

    default:
      return ModalWrapper;
  }
}

var VariantContext = createContext(null);

var Wrapper = function Wrapper(_ref) {
  var variant = _ref.variant,
      props = _objectWithoutProperties(_ref, ["variant"]);

  var Component = getWrapperFromVariant(variant);
  return createElement(VariantContext.Provider, {
    value: variant || 'dialog'
  }, createElement(Component, props));
};

var Rifm = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Rifm, _React$Component);

  function Rifm(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this._state = null;
    _this._del = false;

    _this._handleChange = function (evt) {
      if (process.env.NODE_ENV !== 'production') {
        if (evt.target.type === 'number') {
          console.error('Rifm does not support input type=number, use type=tel instead.');
          return;
        }
      } // FUTURE: use evt.nativeEvent.inputType for del event, see comments at onkeydown


      var stateValue = _this.state.value;
      var value = evt.target.value;
      var input = evt.target;
      var op = value.length > stateValue.length;
      var del = _this._del;

      var noOp = stateValue === _this.props.format(value);

      _this.setState({
        value: value,
        local: true
      }, function () {
        var selectionStart = input.selectionStart;
        var refuse = _this.props.refuse || /[^\d]+/g;
        var before = value.substr(0, selectionStart).replace(refuse, '');
        _this._state = {
          input: input,
          before: before,
          op: op,
          di: del && noOp,
          del: del
        };

        if (_this.props.replace && _this.props.replace(stateValue) && op && !noOp) {
          var start = -1;

          for (var i = 0; i !== before.length; ++i) {
            start = Math.max(start, value.toLowerCase().indexOf(before[i].toLowerCase(), start + 1));
          }

          var c = value.substr(start + 1).replace(refuse, '')[0];
          start = value.indexOf(c, start + 1);
          value = "" + value.substr(0, start) + value.substr(start + 1);
        }

        var fv = _this.props.format(value);

        if (stateValue === fv) {
          _this.setState({
            value: value
          });
        } else {
          _this.props.onChange(fv);
        }
      });
    };

    _this._hKD = function (evt) {
      if (evt.code === 'Delete') {
        _this._del = true;
      }
    };

    _this._hKU = function (evt) {
      if (evt.code === 'Delete') {
        _this._del = false;
      }
    };

    _this.state = {
      value: props.value,
      local: true
    };
    return _this;
  }

  Rifm.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    return {
      value: state.local ? state.value : props.value,
      local: false
    };
  };

  var _proto = Rifm.prototype;

  _proto.render = function render() {
    var _handleChange = this._handleChange,
        value = this.state.value,
        children = this.props.children;
    return children({
      value: value,
      onChange: _handleChange
    });
  } // delete when  https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/inputType will be supported by all major browsers
  ;

  _proto.componentWillUnmount = function componentWillUnmount() {
    document.removeEventListener('keydown', this._hKD);
    document.removeEventListener('keyup', this._hKU);
  } // delete when  https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/inputType will be supported by all major browsers
  ;

  _proto.componentDidMount = function componentDidMount() {
    document.addEventListener('keydown', this._hKD);
    document.addEventListener('keyup', this._hKU);
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _state = this._state;

    if (_state) {
      var value = this.state.value;
      var start = -1;

      for (var i = 0; i !== _state.before.length; ++i) {
        start = Math.max(start, value.toLowerCase().indexOf(_state.before[i].toLowerCase(), start + 1));
      } // format usually looks better without this


      if (this.props.replace && (_state.op || _state.del && !_state.di)) {
        while (value[start + 1] && (this.props.refuse || /[^\d]+/).test(value[start + 1])) {
          start += 1;
        }
      }

      _state.input.selectionStart = _state.input.selectionEnd = start + 1 + (_state.di ? 1 : 0);
    }

    this._state = null;
  };

  return Rifm;
}(Component);

var useStyles$1 = makeStyles(function (theme) {
  return {
    day: {
      width: 36,
      height: 36,
      fontSize: theme.typography.caption.fontSize,
      margin: '0 2px',
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium,
      padding: 0
    },
    hidden: {
      opacity: 0,
      pointerEvents: 'none'
    },
    current: {
      color: theme.palette.primary.main,
      fontWeight: 600
    },
    daySelected: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      }
    },
    dayDisabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint
    }
  };
}, {
  name: 'MuiPickersDay'
});

var Day = function Day(_ref) {
  var children = _ref.children,
      disabled = _ref.disabled,
      hidden = _ref.hidden,
      current = _ref.current,
      selected = _ref.selected,
      other = _objectWithoutProperties(_ref, ["children", "disabled", "hidden", "current", "selected"]);

  var classes = useStyles$1();
  var className = clsx(classes.day, hidden && classes.hidden, current && classes.current, selected && classes.daySelected, disabled && classes.dayDisabled);
  return createElement(IconButton, _extends({
    className: className,
    tabIndex: hidden || disabled ? -1 : 0
  }, other), createElement(Typography, {
    variant: "body2",
    color: "inherit"
  }, children));
};

Day.displayName = 'Day';
process.env.NODE_ENV !== "production" ? Day.propTypes = {
  current: propTypes.bool,
  disabled: propTypes.bool,
  hidden: propTypes.bool,
  selected: propTypes.bool
} : void 0;
Day.defaultProps = {
  disabled: false,
  hidden: false,
  current: false,
  selected: false
};

var findClosestEnabledDate = function findClosestEnabledDate(_ref) {
  var date = _ref.date,
      utils = _ref.utils,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      disableFuture = _ref.disableFuture,
      disablePast = _ref.disablePast,
      shouldDisableDate = _ref.shouldDisableDate;
  var today = utils.startOfDay(utils.date());

  if (disablePast && utils.isBefore(minDate, today)) {
    minDate = today;
  }

  if (disableFuture && utils.isAfter(maxDate, today)) {
    maxDate = today;
  }

  var forward = date;
  var backward = date;

  if (utils.isBefore(date, minDate)) {
    forward = utils.date(minDate);
    backward = null;
  }

  if (utils.isAfter(date, maxDate)) {
    if (backward) {
      backward = utils.date(maxDate);
    }

    forward = null;
  }

  while (forward || backward) {
    if (forward && utils.isAfter(forward, maxDate)) {
      forward = null;
    }

    if (backward && utils.isBefore(backward, minDate)) {
      backward = null;
    }

    if (forward) {
      if (!shouldDisableDate(forward)) {
        return forward;
      }

      forward = utils.addDays(forward, 1);
    }

    if (backward) {
      if (!shouldDisableDate(backward)) {
        return backward;
      }

      backward = utils.addDays(backward, -1);
    }
  } // fallback to today if no enabled days


  return utils.date();
};

var isYearOnlyView = function isYearOnlyView(views) {
  return views.length === 1 && views[0] === 'year';
};

var isYearAndMonthViews = function isYearAndMonthViews(views) {
  return views.length === 2 && arrayIncludes(views, 'month') && arrayIncludes(views, 'year');
};

var getFormatByViews = function getFormatByViews(views, utils) {
  if (isYearOnlyView(views)) {
    return utils.yearFormat;
  }

  if (isYearAndMonthViews(views)) {
    return utils.yearMonthFormat;
  }

  return utils.dateFormat;
};

var DayWrapper = function DayWrapper(_ref) {
  var children = _ref.children,
      value = _ref.value,
      disabled = _ref.disabled,
      onSelect = _ref.onSelect,
      dayInCurrentMonth = _ref.dayInCurrentMonth,
      other = _objectWithoutProperties(_ref, ["children", "value", "disabled", "onSelect", "dayInCurrentMonth"]);

  var handleClick = useCallback(function () {
    return onSelect(value);
  }, [onSelect, value]);
  return createElement("div", _extends({
    role: "presentation",
    onClick: dayInCurrentMonth && !disabled ? handleClick : undefined,
    onKeyPress: dayInCurrentMonth && !disabled ? handleClick : undefined
  }, other), children);
};

var animationDuration = 350;
var useStyles$2 = makeStyles(function (theme) {
  var slideTransition = theme.transitions.create('transform', {
    duration: animationDuration,
    easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)'
  });
  return {
    transitionContainer: {
      display: 'block',
      position: 'relative',
      '& > *': {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0
      }
    },
    'slideEnter-left': {
      willChange: 'transform',
      transform: 'translate(100%)'
    },
    'slideEnter-right': {
      willChange: 'transform',
      transform: 'translate(-100%)'
    },
    slideEnterActive: {
      transform: 'translate(0%)',
      transition: slideTransition
    },
    slideExit: {
      transform: 'translate(0%)'
    },
    'slideExitActiveLeft-left': {
      willChange: 'transform',
      transform: 'translate(-200%)',
      transition: slideTransition
    },
    'slideExitActiveLeft-right': {
      willChange: 'transform',
      transform: 'translate(200%)',
      transition: slideTransition
    }
  };
}, {
  name: 'MuiPickersSlideTransition'
});

var SlideTransition = function SlideTransition(_ref) {
  var children = _ref.children,
      transKey = _ref.transKey,
      slideDirection = _ref.slideDirection,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className;
  var classes = useStyles$2();
  var transitionClasses = {
    exit: classes.slideExit,
    enterActive: classes.slideEnterActive,
    // @ts-ignore
    enter: classes['slideEnter-' + slideDirection],
    // @ts-ignore
    exitActive: classes['slideExitActiveLeft-' + slideDirection]
  };
  return createElement(TransitionGroup, {
    className: clsx(classes.transitionContainer, className),
    childFactory: function childFactory(element) {
      return cloneElement(element, {
        classNames: transitionClasses
      });
    }
  }, createElement(CSSTransition, {
    mountOnEnter: true,
    unmountOnExit: true,
    key: transKey + slideDirection,
    timeout: animationDuration,
    classNames: transitionClasses,
    children: children
  }));
};

var ArrowLeftIcon = function ArrowLeftIcon(props) {
  return React.createElement(SvgIcon, props, React.createElement("path", {
    d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
  }), React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }));
};

var ArrowRightIcon = function ArrowRightIcon(props) {
  return React.createElement(SvgIcon, props, React.createElement("path", {
    d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
  }), React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }));
};

var useStyles$1$1 = makeStyles(function (theme) {
  return {
    switchHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(1)
    },
    transitionContainer: {
      width: '100%',
      overflow: 'hidden',
      height: 23
    },
    iconButton: {
      zIndex: 1,
      backgroundColor: theme.palette.background.paper
    },
    daysHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: 16
    },
    dayLabel: {
      width: 36,
      margin: '0 2px',
      textAlign: 'center',
      color: theme.palette.text.hint
    }
  };
}, {
  name: 'MuiPickersCalendarHeader'
});

var CalendarHeader = function CalendarHeader(_ref) {
  var currentMonth = _ref.currentMonth,
      onMonthChange = _ref.onMonthChange,
      leftArrowIcon = _ref.leftArrowIcon,
      rightArrowIcon = _ref.rightArrowIcon,
      leftArrowButtonProps = _ref.leftArrowButtonProps,
      rightArrowButtonProps = _ref.rightArrowButtonProps,
      disablePrevMonth = _ref.disablePrevMonth,
      disableNextMonth = _ref.disableNextMonth,
      slideDirection = _ref.slideDirection;
  var utils = useUtils();
  var classes = useStyles$1$1();
  var theme = useTheme();
  var rtl = theme.direction === 'rtl';

  var selectNextMonth = function selectNextMonth() {
    return onMonthChange(utils.getNextMonth(currentMonth), 'left');
  };

  var selectPreviousMonth = function selectPreviousMonth() {
    return onMonthChange(utils.getPreviousMonth(currentMonth), 'right');
  };

  return createElement("div", null, createElement("div", {
    className: classes.switchHeader
  }, createElement(IconButton, _extends({}, leftArrowButtonProps, {
    disabled: disablePrevMonth,
    onClick: selectPreviousMonth,
    className: classes.iconButton
  }), rtl ? rightArrowIcon : leftArrowIcon), createElement(SlideTransition, {
    slideDirection: slideDirection,
    transKey: currentMonth.toString(),
    className: classes.transitionContainer
  }, createElement(Typography, {
    align: "center",
    variant: "body1"
  }, utils.getCalendarHeaderText(currentMonth))), createElement(IconButton, _extends({}, rightArrowButtonProps, {
    disabled: disableNextMonth,
    onClick: selectNextMonth,
    className: classes.iconButton
  }), rtl ? leftArrowIcon : rightArrowIcon)), createElement("div", {
    className: classes.daysHeader
  }, utils.getWeekdays().map(function (day, index) {
    return createElement(Typography, {
      key: index // eslint-disable-line react/no-array-index-key
      ,
      variant: "caption",
      className: classes.dayLabel
    }, day);
  })));
};

CalendarHeader.displayName = 'CalendarHeader';
process.env.NODE_ENV !== "production" ? CalendarHeader.propTypes = {
  leftArrowIcon: propTypes.node,
  rightArrowIcon: propTypes.node,
  disablePrevMonth: propTypes.bool,
  disableNextMonth: propTypes.bool
} : void 0;
CalendarHeader.defaultProps = {
  leftArrowIcon: createElement(ArrowLeftIcon, null),
  rightArrowIcon: createElement(ArrowRightIcon, null),
  disablePrevMonth: false,
  disableNextMonth: false
};

var withUtils = function withUtils() {
  return function (Component) {
    var WithUtils = function WithUtils(props) {
      var utils = useUtils();
      return createElement(Component, _extends({
        utils: utils
      }, props));
    };

    WithUtils.displayName = "WithUtils(".concat(Component.displayName || Component.name, ")");
    return WithUtils;
  };
};

var KeyDownListener = function KeyDownListener(_ref) {
  var onKeyDown = _ref.onKeyDown;
  useEffect(function () {
    window.addEventListener('keydown', onKeyDown);
    return function () {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
  return null;
};

var Calendar = /*#__PURE__*/function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Calendar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      slideDirection: 'left',
      currentMonth: _this.props.utils.startOfMonth(_this.props.date),
      loadingQueue: 0
    };

    _this.pushToLoadingQueue = function () {
      var loadingQueue = _this.state.loadingQueue + 1;

      _this.setState({
        loadingQueue: loadingQueue
      });
    };

    _this.popFromLoadingQueue = function () {
      var loadingQueue = _this.state.loadingQueue;
      loadingQueue = loadingQueue <= 0 ? 0 : loadingQueue - 1;

      _this.setState({
        loadingQueue: loadingQueue
      });
    };

    _this.handleChangeMonth = function (newMonth, slideDirection) {
      _this.setState({
        currentMonth: newMonth,
        slideDirection: slideDirection
      });

      if (_this.props.onMonthChange) {
        var returnVal = _this.props.onMonthChange(newMonth);

        if (returnVal) {
          _this.pushToLoadingQueue();

          returnVal.then(function () {
            _this.popFromLoadingQueue();
          });
        }
      }
    };

    _this.validateMinMaxDate = function (day) {
      var _this$props = _this.props,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate,
          utils = _this$props.utils,
          disableFuture = _this$props.disableFuture,
          disablePast = _this$props.disablePast;
      var now = utils.date();
      return Boolean(disableFuture && utils.isAfterDay(day, now) || disablePast && utils.isBeforeDay(day, now) || minDate && utils.isBeforeDay(day, utils.date(minDate)) || maxDate && utils.isAfterDay(day, utils.date(maxDate)));
    };

    _this.shouldDisablePrevMonth = function () {
      var _this$props2 = _this.props,
          utils = _this$props2.utils,
          disablePast = _this$props2.disablePast,
          minDate = _this$props2.minDate;
      var now = utils.date();
      var firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, utils.date(minDate)) ? now : utils.date(minDate));
      return !utils.isBefore(firstEnabledMonth, _this.state.currentMonth);
    };

    _this.shouldDisableNextMonth = function () {
      var _this$props3 = _this.props,
          utils = _this$props3.utils,
          disableFuture = _this$props3.disableFuture,
          maxDate = _this$props3.maxDate;
      var now = utils.date();
      var lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, utils.date(maxDate)) ? now : utils.date(maxDate));
      return !utils.isAfter(lastEnabledMonth, _this.state.currentMonth);
    };

    _this.shouldDisableDate = function (day) {
      var shouldDisableDate = _this.props.shouldDisableDate;
      return _this.validateMinMaxDate(day) || Boolean(shouldDisableDate && shouldDisableDate(day));
    };

    _this.handleDaySelect = function (day) {
      var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var _this$props4 = _this.props,
          date = _this$props4.date,
          utils = _this$props4.utils;

      _this.props.onChange(utils.mergeDateAndTime(day, date), isFinish);
    };

    _this.moveToDay = function (day) {
      var utils = _this.props.utils;

      if (day && !_this.shouldDisableDate(day)) {
        if (utils.getMonth(day) !== utils.getMonth(_this.state.currentMonth)) {
          _this.handleChangeMonth(utils.startOfMonth(day), 'left');
        }

        _this.handleDaySelect(day, false);
      }
    };

    _this.handleKeyDown = function (event) {
      var _this$props5 = _this.props,
          theme = _this$props5.theme,
          date = _this$props5.date,
          utils = _this$props5.utils;
      runKeyHandler(event, {
        ArrowUp: function ArrowUp() {
          return _this.moveToDay(utils.addDays(date, -7));
        },
        ArrowDown: function ArrowDown() {
          return _this.moveToDay(utils.addDays(date, 7));
        },
        ArrowLeft: function ArrowLeft() {
          return _this.moveToDay(utils.addDays(date, theme.direction === 'ltr' ? -1 : 1));
        },
        ArrowRight: function ArrowRight() {
          return _this.moveToDay(utils.addDays(date, theme.direction === 'ltr' ? 1 : -1));
        }
      });
    };

    _this.renderWeeks = function () {
      var _this$props6 = _this.props,
          utils = _this$props6.utils,
          classes = _this$props6.classes;
      var weeks = utils.getWeekArray(_this.state.currentMonth);
      return weeks.map(function (week) {
        return createElement("div", {
          key: "week-".concat(week[0].toString()),
          className: classes.week
        }, _this.renderDays(week));
      });
    };

    _this.renderDays = function (week) {
      var _this$props7 = _this.props,
          date = _this$props7.date,
          renderDay = _this$props7.renderDay,
          utils = _this$props7.utils;
      var now = utils.date();
      var selectedDate = utils.startOfDay(date);
      var currentMonthNumber = utils.getMonth(_this.state.currentMonth);
      return week.map(function (day) {
        var disabled = _this.shouldDisableDate(day);

        var isDayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;
        var dayComponent = createElement(Day, {
          disabled: disabled,
          current: utils.isSameDay(day, now),
          hidden: !isDayInCurrentMonth,
          selected: utils.isSameDay(selectedDate, day)
        }, utils.getDayText(day));

        if (renderDay) {
          dayComponent = renderDay(day, selectedDate, isDayInCurrentMonth, dayComponent);
        }

        return createElement(DayWrapper, {
          value: day,
          key: day.toString(),
          disabled: disabled,
          dayInCurrentMonth: isDayInCurrentMonth,
          onSelect: _this.handleDaySelect
        }, dayComponent);
      });
    };

    return _this;
  }

  _createClass(Calendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props8 = this.props,
          date = _this$props8.date,
          minDate = _this$props8.minDate,
          maxDate = _this$props8.maxDate,
          utils = _this$props8.utils,
          disablePast = _this$props8.disablePast,
          disableFuture = _this$props8.disableFuture;

      if (this.shouldDisableDate(date)) {
        var closestEnabledDate = findClosestEnabledDate({
          date: date,
          utils: utils,
          minDate: utils.date(minDate),
          maxDate: utils.date(maxDate),
          disablePast: Boolean(disablePast),
          disableFuture: Boolean(disableFuture),
          shouldDisableDate: this.shouldDisableDate
        });
        this.handleDaySelect(closestEnabledDate, false);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          currentMonth = _this$state.currentMonth,
          slideDirection = _this$state.slideDirection;
      var _this$props9 = this.props,
          classes = _this$props9.classes,
          allowKeyboardControl = _this$props9.allowKeyboardControl,
          leftArrowButtonProps = _this$props9.leftArrowButtonProps,
          leftArrowIcon = _this$props9.leftArrowIcon,
          rightArrowButtonProps = _this$props9.rightArrowButtonProps,
          rightArrowIcon = _this$props9.rightArrowIcon,
          loadingIndicator = _this$props9.loadingIndicator;
      var loadingElement = loadingIndicator ? loadingIndicator : createElement(CircularProgress, null);
      return createElement(Fragment, null, allowKeyboardControl && this.context !== 'static' && createElement(KeyDownListener, {
        onKeyDown: this.handleKeyDown
      }), createElement(CalendarHeader, {
        currentMonth: currentMonth,
        slideDirection: slideDirection,
        onMonthChange: this.handleChangeMonth,
        leftArrowIcon: leftArrowIcon,
        leftArrowButtonProps: leftArrowButtonProps,
        rightArrowIcon: rightArrowIcon,
        rightArrowButtonProps: rightArrowButtonProps,
        disablePrevMonth: this.shouldDisablePrevMonth(),
        disableNextMonth: this.shouldDisableNextMonth()
      }), createElement(SlideTransition, {
        slideDirection: slideDirection,
        transKey: currentMonth.toString(),
        className: classes.transitionContainer
      }, createElement(Fragment, null, this.state.loadingQueue > 0 && createElement("div", {
        className: classes.progressContainer
      }, loadingElement) || createElement("div", null, this.renderWeeks()))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, state) {
      var utils = nextProps.utils,
          nextDate = nextProps.date;

      if (!utils.isEqual(nextDate, state.lastDate)) {
        var nextMonth = utils.getMonth(nextDate);
        var lastDate = state.lastDate || nextDate;
        var lastMonth = utils.getMonth(lastDate);
        return {
          lastDate: nextDate,
          currentMonth: nextProps.utils.startOfMonth(nextDate),
          // prettier-ignore
          slideDirection: nextMonth === lastMonth ? state.slideDirection : utils.isAfterDay(nextDate, lastDate) ? 'left' : 'right'
        };
      }

      return null;
    }
  }]);

  return Calendar;
}(Component);

Calendar.contextType = VariantContext;
process.env.NODE_ENV !== "production" ? Calendar.propTypes = {
  renderDay: propTypes.func,
  shouldDisableDate: propTypes.func,
  allowKeyboardControl: propTypes.bool
} : void 0;
Calendar.defaultProps = {
  minDate: new Date('1900-01-01'),
  maxDate: new Date('2100-01-01'),
  disablePast: false,
  disableFuture: false,
  allowKeyboardControl: true
};

var styles$1 = function styles(theme) {
  return {
    transitionContainer: {
      minHeight: 36 * 6,
      marginTop: theme.spacing(1.5)
    },
    progressContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    week: {
      display: 'flex',
      justifyContent: 'center'
    }
  };
};

var Calendar$1 = withStyles(styles$1, {
  name: 'MuiPickersCalendar',
  withTheme: true
})(withUtils()(Calendar));

var ClockType;

(function (ClockType) {
  ClockType["HOURS"] = "hours";
  ClockType["MINUTES"] = "minutes";
  ClockType["SECONDS"] = "seconds";
})(ClockType || (ClockType = {}));

var ClockType$1 = ClockType;

var ClockPointer = /*#__PURE__*/function (_React$Component) {
  _inherits(ClockPointer, _React$Component);

  function ClockPointer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ClockPointer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ClockPointer)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      toAnimateTransform: false,
      previousType: undefined
    };

    _this.getAngleStyle = function () {
      var _this$props = _this.props,
          value = _this$props.value,
          isInner = _this$props.isInner,
          type = _this$props.type;
      var max = type === ClockType$1.HOURS ? 12 : 60;
      var angle = 360 / max * value;

      if (type === ClockType$1.HOURS && value > 12) {
        angle -= 360; // round up angle to max 360 degrees
      }

      return {
        height: isInner ? '26%' : '40%',
        transform: "rotateZ(".concat(angle, "deg)")
      };
    };

    return _this;
  }

  _createClass(ClockPointer, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          hasSelected = _this$props2.hasSelected;
      return createElement("div", {
        style: this.getAngleStyle(),
        className: clsx(classes.pointer, this.state.toAnimateTransform && classes.animateTransform)
      }, createElement("div", {
        className: clsx(classes.thumb, hasSelected && classes.noPoint)
      }));
    }
  }]);

  return ClockPointer;
}(Component);

ClockPointer.getDerivedStateFromProps = function (nextProps, state) {
  if (nextProps.type !== state.previousType) {
    return {
      toAnimateTransform: true,
      previousType: nextProps.type
    };
  }

  return {
    toAnimateTransform: false,
    previousType: nextProps.type
  };
};

var styles$2 = function styles(theme) {
  return createStyles({
    pointer: {
      width: 2,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      left: 'calc(50% - 1px)',
      bottom: '50%',
      transformOrigin: 'center bottom 0px'
    },
    animateTransform: {
      transition: theme.transitions.create(['transform', 'height'])
    },
    thumb: {
      width: 4,
      height: 4,
      backgroundColor: theme.palette.primary.contrastText,
      borderRadius: '100%',
      position: 'absolute',
      top: -21,
      left: -15,
      border: "14px solid ".concat(theme.palette.primary.main),
      boxSizing: 'content-box'
    },
    noPoint: {
      backgroundColor: theme.palette.primary.main
    }
  });
};

var ClockPointer$1 = withStyles(styles$2, {
  name: 'MuiPickersClockPointer'
})(ClockPointer);
var center = {
  x: 260 / 2,
  y: 260 / 2
};
var basePoint = {
  x: center.x,
  y: 0
};
var cx = basePoint.x - center.x;
var cy = basePoint.y - center.y;

var rad2deg = function rad2deg(rad) {
  return rad * 57.29577951308232;
};

var getAngleValue = function getAngleValue(step, offsetX, offsetY) {
  var x = offsetX - center.x;
  var y = offsetY - center.y;
  var atan = Math.atan2(cx, cy) - Math.atan2(x, y);
  var deg = rad2deg(atan);
  deg = Math.round(deg / step) * step;
  deg %= 360;
  var value = Math.floor(deg / step) || 0;
  var delta = Math.pow(x, 2) + Math.pow(y, 2);
  var distance = Math.sqrt(delta);
  return {
    value: value,
    distance: distance
  };
};

var getHours = function getHours(offsetX, offsetY, ampm) {
  var _getAngleValue = getAngleValue(30, offsetX, offsetY),
      value = _getAngleValue.value,
      distance = _getAngleValue.distance;

  value = value || 12;

  if (!ampm) {
    if (distance < 90) {
      value += 12;
      value %= 24;
    }
  } else {
    value %= 12;
  }

  return value;
};

var getMinutes = function getMinutes(offsetX, offsetY) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var angleStep = step * 6;

  var _getAngleValue2 = getAngleValue(angleStep, offsetX, offsetY),
      value = _getAngleValue2.value;

  value = value * step % 60;
  return value;
};

var getMeridiem = function getMeridiem(date, utils) {
  return utils.getHours(date) >= 12 ? 'pm' : 'am';
};

var convertToMeridiem = function convertToMeridiem(time, meridiem, ampm, utils) {
  if (ampm) {
    var currentMeridiem = utils.getHours(time) >= 12 ? 'pm' : 'am';

    if (currentMeridiem !== meridiem) {
      var hours = meridiem === 'am' ? utils.getHours(time) - 12 : utils.getHours(time) + 12;
      return utils.setHours(time, hours);
    }
  }

  return time;
};

var Clock = /*#__PURE__*/function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Clock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Clock)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.isMoving = false;

    _this.handleTouchMove = function (e) {
      _this.isMoving = true;

      _this.setTime(e);
    };

    _this.handleTouchEnd = function (e) {
      if (_this.isMoving) {
        _this.setTime(e, true);

        _this.isMoving = false;
      }
    };

    _this.handleMove = function (e) {
      e.preventDefault();
      e.stopPropagation(); // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari

      var isButtonPressed = typeof e.buttons === 'undefined' ? e.nativeEvent.which === 1 : e.buttons === 1;

      if (isButtonPressed) {
        _this.setTime(e.nativeEvent, false);
      }
    };

    _this.handleMouseUp = function (e) {
      if (_this.isMoving) {
        _this.isMoving = false;
      }

      _this.setTime(e.nativeEvent, true);
    };

    _this.hasSelected = function () {
      var _this$props = _this.props,
          type = _this$props.type,
          value = _this$props.value;

      if (type === ClockType$1.HOURS) {
        return true;
      }

      return value % 5 === 0;
    };

    return _this;
  }

  _createClass(Clock, [{
    key: "setTime",
    value: function setTime(e) {
      var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var offsetX = e.offsetX,
          offsetY = e.offsetY;

      if (typeof offsetX === 'undefined') {
        var rect = e.target.getBoundingClientRect();
        offsetX = e.changedTouches[0].clientX - rect.left;
        offsetY = e.changedTouches[0].clientY - rect.top;
      }

      var value = this.props.type === ClockType$1.SECONDS || this.props.type === ClockType$1.MINUTES ? getMinutes(offsetX, offsetY, this.props.minutesStep) : getHours(offsetX, offsetY, Boolean(this.props.ampm));
      this.props.onChange(value, isFinish);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          value = _this$props2.value,
          children = _this$props2.children,
          type = _this$props2.type,
          ampm = _this$props2.ampm;
      var isPointerInner = !ampm && type === ClockType$1.HOURS && (value < 1 || value > 12);
      return createElement("div", {
        className: classes.container
      }, createElement("div", {
        className: classes.clock
      }, createElement("div", {
        role: "menu",
        tabIndex: -1,
        className: classes.squareMask,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd,
        onMouseUp: this.handleMouseUp,
        onMouseMove: this.handleMove
      }), createElement("div", {
        className: classes.pin
      }), createElement(ClockPointer$1, {
        type: type,
        value: value,
        isInner: isPointerInner,
        hasSelected: this.hasSelected()
      }), children));
    }
  }]);

  return Clock;
}(Component);

process.env.NODE_ENV !== "production" ? Clock.propTypes = {
  type: propTypes.oneOf(Object.keys(ClockType$1).map(function (key) {
    return ClockType$1[key];
  })).isRequired,
  value: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
  children: propTypes.arrayOf(propTypes.node).isRequired,
  ampm: propTypes.bool,
  minutesStep: propTypes.number,
  innerRef: propTypes.any
} : void 0;
Clock.defaultProps = {
  ampm: false,
  minutesStep: 1
};

var styles$1$1 = function styles(theme) {
  return createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      margin: "".concat(theme.spacing(2), "px 0 ").concat(theme.spacing(1), "px")
    },
    clock: {
      backgroundColor: 'rgba(0,0,0,.07)',
      borderRadius: '50%',
      height: 260,
      width: 260,
      position: 'relative',
      pointerEvents: 'none'
    },
    squareMask: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'auto',
      outline: 'none',
      touchActions: 'none',
      userSelect: 'none',
      '&:active': {
        cursor: 'move'
      }
    },
    pin: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  });
};

var Clock$1 = withStyles(styles$1$1, {
  name: 'MuiPickersClock'
})(Clock);

var positions = {
  0: [0, 40],
  1: [55, 19.6],
  2: [94.4, 59.5],
  3: [109, 114],
  4: [94.4, 168.5],
  5: [54.5, 208.4],
  6: [0, 223],
  7: [-54.5, 208.4],
  8: [-94.4, 168.5],
  9: [-109, 114],
  10: [-94.4, 59.5],
  11: [-54.5, 19.6],
  12: [0, 5],
  13: [36.9, 49.9],
  14: [64, 77],
  15: [74, 114],
  16: [64, 151],
  17: [37, 178],
  18: [0, 188],
  19: [-37, 178],
  20: [-64, 151],
  21: [-74, 114],
  22: [-64, 77],
  23: [-37, 50]
};
var useStyles$3 = makeStyles(function (theme) {
  var size = theme.spacing(4);
  return {
    clockNumber: {
      width: size,
      height: 32,
      userSelect: 'none',
      position: 'absolute',
      left: "calc((100% - ".concat(typeof size === 'number' ? "".concat(size, "px") : size, ") / 2)"),
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      color: theme.palette.type === 'light' ? theme.palette.text.primary : theme.palette.text.hint
    },
    clockNumberSelected: {
      color: theme.palette.primary.contrastText
    }
  };
}, {
  name: 'MuiPickersClockNumber'
});

var ClockNumber = function ClockNumber(_ref) {
  var selected = _ref.selected,
      label = _ref.label,
      index = _ref.index,
      isInner = _ref.isInner;
  var classes = useStyles$3();
  var className = clsx(classes.clockNumber, selected && classes.clockNumberSelected);
  var transformStyle = useMemo(function () {
    var position = positions[index];
    return {
      transform: "translate(".concat(position[0], "px, ").concat(position[1], "px")
    };
  }, [index]);
  return createElement(Typography, {
    component: "span",
    className: className,
    variant: isInner ? 'body2' : 'body1',
    style: transformStyle,
    children: label
  });
};

var getHourNumbers = function getHourNumbers(_ref) {
  var ampm = _ref.ampm,
      utils = _ref.utils,
      date = _ref.date;
  var currentHours = utils.getHours(date);
  var hourNumbers = [];
  var startHour = ampm ? 1 : 0;
  var endHour = ampm ? 12 : 23;

  var isSelected = function isSelected(hour) {
    if (ampm) {
      if (hour === 12) {
        return currentHours === 12 || currentHours === 0;
      }

      return currentHours === hour || currentHours - 12 === hour;
    }

    return currentHours === hour;
  };

  for (var hour = startHour; hour <= endHour; hour += 1) {
    var label = hour.toString();

    if (hour === 0) {
      label = '00';
    }

    var props = {
      index: hour,
      label: utils.formatNumber(label),
      selected: isSelected(hour),
      isInner: !ampm && (hour === 0 || hour > 12)
    };
    hourNumbers.push(createElement(ClockNumber, _extends({
      key: hour
    }, props)));
  }

  return hourNumbers;
};

var getMinutesNumbers = function getMinutesNumbers(_ref2) {
  var value = _ref2.value,
      utils = _ref2.utils;
  var f = utils.formatNumber;
  return [createElement(ClockNumber, {
    label: f('00'),
    selected: value === 0,
    index: 12,
    key: 12
  }), createElement(ClockNumber, {
    label: f('05'),
    selected: value === 5,
    index: 1,
    key: 1
  }), createElement(ClockNumber, {
    label: f('10'),
    selected: value === 10,
    index: 2,
    key: 2
  }), createElement(ClockNumber, {
    label: f('15'),
    selected: value === 15,
    index: 3,
    key: 3
  }), createElement(ClockNumber, {
    label: f('20'),
    selected: value === 20,
    index: 4,
    key: 4
  }), createElement(ClockNumber, {
    label: f('25'),
    selected: value === 25,
    index: 5,
    key: 5
  }), createElement(ClockNumber, {
    label: f('30'),
    selected: value === 30,
    index: 6,
    key: 6
  }), createElement(ClockNumber, {
    label: f('35'),
    selected: value === 35,
    index: 7,
    key: 7
  }), createElement(ClockNumber, {
    label: f('40'),
    selected: value === 40,
    index: 8,
    key: 8
  }), createElement(ClockNumber, {
    label: f('45'),
    selected: value === 45,
    index: 9,
    key: 9
  }), createElement(ClockNumber, {
    label: f('50'),
    selected: value === 50,
    index: 10,
    key: 10
  }), createElement(ClockNumber, {
    label: f('55'),
    selected: value === 55,
    index: 11,
    key: 11
  })];
};

var ClockView = function ClockView(_ref) {
  var type = _ref.type,
      onHourChange = _ref.onHourChange,
      onMinutesChange = _ref.onMinutesChange,
      onSecondsChange = _ref.onSecondsChange,
      ampm = _ref.ampm,
      date = _ref.date,
      minutesStep = _ref.minutesStep;
  var utils = useUtils();
  var viewProps = useMemo(function () {
    switch (type) {
      case ClockType$1.HOURS:
        return {
          value: utils.getHours(date),
          children: getHourNumbers({
            date: date,
            utils: utils,
            ampm: Boolean(ampm)
          }),
          onChange: function onChange(value, isFinish) {
            var currentMeridiem = getMeridiem(date, utils);
            var updatedTimeWithMeridiem = convertToMeridiem(utils.setHours(date, value), currentMeridiem, Boolean(ampm), utils);
            onHourChange(updatedTimeWithMeridiem, isFinish);
          }
        };

      case ClockType$1.MINUTES:
        var minutesValue = utils.getMinutes(date);
        return {
          value: minutesValue,
          children: getMinutesNumbers({
            value: minutesValue,
            utils: utils
          }),
          onChange: function onChange(value, isFinish) {
            var updatedTime = utils.setMinutes(date, value);
            onMinutesChange(updatedTime, isFinish);
          }
        };

      case ClockType$1.SECONDS:
        var secondsValue = utils.getSeconds(date);
        return {
          value: secondsValue,
          children: getMinutesNumbers({
            value: secondsValue,
            utils: utils
          }),
          onChange: function onChange(value, isFinish) {
            var updatedTime = utils.setSeconds(date, value);
            onSecondsChange(updatedTime, isFinish);
          }
        };

      default:
        throw new Error('You must provide the type for TimePickerView');
    }
  }, [ampm, date, onHourChange, onMinutesChange, onSecondsChange, type, utils]);
  return createElement(Clock$1, _extends({
    type: type,
    ampm: ampm,
    minutesStep: minutesStep
  }, viewProps));
};

ClockView.displayName = 'TimePickerView';
process.env.NODE_ENV !== "production" ? ClockView.propTypes = {
  date: propTypes.object.isRequired,
  onHourChange: propTypes.func.isRequired,
  onMinutesChange: propTypes.func.isRequired,
  onSecondsChange: propTypes.func.isRequired,
  ampm: propTypes.bool,
  minutesStep: propTypes.number,
  type: propTypes.oneOf(Object.keys(ClockType$1).map(function (key) {
    return ClockType$1[key];
  })).isRequired
} : void 0;
ClockView.defaultProps = {
  ampm: true,
  minutesStep: 1
};
memo(ClockView);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

propTypes.oneOfType([propTypes.object, propTypes.string, propTypes.number, propTypes.instanceOf(Date)]);
propTypes.oneOf(['year', 'month', 'day']);
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

var timePickerDefaultProps = {
  ampm: true,
  invalidDateMessage: 'Invalid Time Format'
};
var datePickerDefaultProps = {
  minDate: new Date('1900-01-01'),
  maxDate: new Date('2100-01-01'),
  invalidDateMessage: 'Invalid Date Format',
  minDateMessage: 'Date should not be before minimal date',
  maxDateMessage: 'Date should not be after maximal date',
  allowKeyboardControl: true
};

_objectSpread({}, timePickerDefaultProps, {}, datePickerDefaultProps, {
  showTabs: true
});

function useViews(views, openTo, onChange) {
  var _React$useState = useState(openTo && arrayIncludes(views, openTo) ? openTo : views[0]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      openView = _React$useState2[0],
      setOpenView = _React$useState2[1];

  var handleChangeAndOpenNext = useCallback(function (date, isFinish) {
    var nextViewToOpen = views[views.indexOf(openView) + 1];

    if (isFinish && nextViewToOpen) {
      // do not close picker if needs to show next view
      onChange(date, false);
      setOpenView(nextViewToOpen);
      return;
    }

    onChange(date, Boolean(isFinish));
  }, [onChange, openView, views]);
  return {
    handleChangeAndOpenNext: handleChangeAndOpenNext,
    openView: openView,
    setOpenView: setOpenView
  };
}

var useStyles$4 = makeStyles(function (theme) {
  return {
    root: {
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      '&:focus': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    yearSelected: {
      margin: '10px 0',
      fontWeight: theme.typography.fontWeightMedium
    },
    yearDisabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint
    }
  };
}, {
  name: 'MuiPickersYear'
});

var Year = function Year(_ref) {
  var onSelect = _ref.onSelect,
      forwardedRef = _ref.forwardedRef,
      value = _ref.value,
      selected = _ref.selected,
      disabled = _ref.disabled,
      children = _ref.children,
      other = _objectWithoutProperties(_ref, ["onSelect", "forwardedRef", "value", "selected", "disabled", "children"]);

  var classes = useStyles$4();
  var handleClick = useCallback(function () {
    return onSelect(value);
  }, [onSelect, value]);
  return createElement(Typography, _extends({
    role: "button",
    component: "div",
    tabIndex: disabled ? -1 : 0,
    onClick: handleClick,
    onKeyPress: handleClick,
    color: selected ? 'primary' : undefined,
    variant: selected ? 'h5' : 'subtitle1',
    children: children,
    ref: forwardedRef,
    className: clsx(classes.root, selected && classes.yearSelected, disabled && classes.yearDisabled)
  }, other));
};

Year.displayName = 'Year';
var Year$1 = forwardRef(function (props, ref) {
  return createElement(Year, _extends({}, props, {
    forwardedRef: ref
  }));
});
var useStyles$1$2 = makeStyles({
  container: {
    height: 300,
    overflowY: 'auto'
  }
}, {
  name: 'MuiPickersYearSelection'
});

var YearSelection = function YearSelection(_ref) {
  var date = _ref.date,
      onChange = _ref.onChange,
      onYearChange = _ref.onYearChange,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      disablePast = _ref.disablePast,
      disableFuture = _ref.disableFuture,
      animateYearScrolling = _ref.animateYearScrolling;
  var utils = useUtils();
  var classes = useStyles$1$2();
  var currentVariant = useContext(VariantContext);
  var selectedYearRef = useRef(null);
  useEffect(function () {
    if (selectedYearRef.current && selectedYearRef.current.scrollIntoView) {
      try {
        selectedYearRef.current.scrollIntoView({
          block: currentVariant === 'static' ? 'nearest' : 'center',
          behavior: animateYearScrolling ? 'smooth' : 'auto'
        });
      } catch (e) {
        // call without arguments in case when scrollIntoView works improperly (e.g. Firefox 52-57)
        selectedYearRef.current.scrollIntoView();
      }
    }
  }, []); // eslint-disable-line

  var currentYear = utils.getYear(date);
  var onYearSelect = useCallback(function (year) {
    var newDate = utils.setYear(date, year);

    if (onYearChange) {
      onYearChange(newDate);
    }

    onChange(newDate, true);
  }, [date, onChange, onYearChange, utils]);
  return createElement("div", {
    className: classes.container
  }, utils.getYearRange(minDate, maxDate).map(function (year) {
    var yearNumber = utils.getYear(year);
    var selected = yearNumber === currentYear;
    return createElement(Year$1, {
      key: utils.getYearText(year),
      selected: selected,
      value: yearNumber,
      onSelect: onYearSelect,
      ref: selected ? selectedYearRef : undefined,
      disabled: Boolean(disablePast && utils.isBeforeYear(year, utils.date()) || disableFuture && utils.isAfterYear(year, utils.date()))
    }, utils.getYearText(year));
  }));
};

var useStyles$2$1 = makeStyles(function (theme) {
  return {
    root: {
      flex: '1 0 33.33%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      height: 75,
      transition: theme.transitions.create('font-size', {
        duration: '100ms'
      }),
      '&:focus': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    monthSelected: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium
    },
    monthDisabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint
    }
  };
}, {
  name: 'MuiPickersMonth'
});

var Month = function Month(_ref) {
  var selected = _ref.selected,
      onSelect = _ref.onSelect,
      disabled = _ref.disabled,
      value = _ref.value,
      children = _ref.children,
      other = _objectWithoutProperties(_ref, ["selected", "onSelect", "disabled", "value", "children"]);

  var classes = useStyles$2$1();
  var handleSelection = useCallback(function () {
    onSelect(value);
  }, [onSelect, value]);
  return createElement(Typography, _extends({
    role: "button",
    component: "div",
    className: clsx(classes.root, selected && classes.monthSelected, disabled && classes.monthDisabled),
    tabIndex: disabled ? -1 : 0,
    onClick: handleSelection,
    onKeyPress: handleSelection,
    color: selected ? 'primary' : undefined,
    variant: selected ? 'h5' : 'subtitle1',
    children: children
  }, other));
};

Month.displayName = 'Month';
var useStyles$3$1 = makeStyles({
  container: {
    width: 310,
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'stretch'
  }
}, {
  name: 'MuiPickersMonthSelection'
});

var MonthSelection = function MonthSelection(_ref) {
  var disablePast = _ref.disablePast,
      disableFuture = _ref.disableFuture,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      date = _ref.date,
      onMonthChange = _ref.onMonthChange,
      onChange = _ref.onChange;
  var utils = useUtils();
  var classes = useStyles$3$1();
  var currentMonth = utils.getMonth(date);

  var shouldDisableMonth = function shouldDisableMonth(month) {
    var now = utils.date();
    var utilMinDate = utils.date(minDate);
    var utilMaxDate = utils.date(maxDate);
    var firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, utilMinDate) ? now : utilMinDate);
    var lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, utilMaxDate) ? now : utilMaxDate);
    var isBeforeFirstEnabled = utils.isBefore(month, firstEnabledMonth);
    var isAfterLastEnabled = utils.isAfter(month, lastEnabledMonth);
    return isBeforeFirstEnabled || isAfterLastEnabled;
  };

  var onMonthSelect = useCallback(function (month) {
    var newDate = utils.setMonth(date, month);
    onChange(newDate, true);

    if (onMonthChange) {
      onMonthChange(newDate);
    }
  }, [date, onChange, onMonthChange, utils]);
  return createElement("div", {
    className: classes.container
  }, utils.getMonthArray(date).map(function (month) {
    var monthNumber = utils.getMonth(month);
    var monthText = utils.format(month, 'MMM');
    return createElement(Month, {
      key: monthText,
      value: monthNumber,
      selected: monthNumber === currentMonth,
      onSelect: onMonthSelect,
      disabled: shouldDisableMonth(month)
    }, monthText);
  }));
};

var getOrientation = function getOrientation() {
  if (typeof window === 'undefined') {
    return 'portrait';
  }

  if (window.screen && window.screen.orientation && window.screen.orientation.angle) {
    return Math.abs(window.screen.orientation.angle) === 90 ? 'landscape' : 'portrait';
  } // Support IOS safari


  if (window.orientation) {
    return Math.abs(Number(window.orientation)) === 90 ? 'landscape' : 'portrait';
  }

  return 'portrait';
};

function useIsLandscape(customOrientation) {
  var _React$useState = useState(getOrientation()),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      orientation = _React$useState2[0],
      setOrientation = _React$useState2[1];

  var eventHandler = useCallback(function () {
    return setOrientation(getOrientation());
  }, []);
  useIsomorphicEffect(function () {
    window.addEventListener('orientationchange', eventHandler);
    return function () {
      return window.removeEventListener('orientationchange', eventHandler);
    };
  }, [eventHandler]);
  var orientationToUse = customOrientation || orientation;
  return orientationToUse === 'landscape';
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var viewsMap = {
  year: YearSelection,
  month: MonthSelection,
  date: Calendar$1,
  hours: ClockView,
  minutes: ClockView,
  seconds: ClockView
};
var useStyles$4$1 = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  containerLandscape: {
    flexDirection: 'row'
  },
  pickerView: {
    overflowX: 'hidden',
    minHeight: VIEW_HEIGHT,
    minWidth: DIALOG_WIDTH,
    maxWidth: DIALOG_WIDTH_WIDER,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  pickerViewLandscape: {
    padding: '0 8px'
  }
}, {
  name: 'MuiPickersBasePicker'
});

var Picker = function Picker(_ref) {
  var date = _ref.date,
      views = _ref.views,
      disableToolbar = _ref.disableToolbar,
      onChange = _ref.onChange,
      openTo = _ref.openTo,
      unparsedMinDate = _ref.minDate,
      unparsedMaxDate = _ref.maxDate,
      ToolbarComponent = _ref.ToolbarComponent,
      orientation = _ref.orientation,
      rest = _objectWithoutProperties(_ref, ["date", "views", "disableToolbar", "onChange", "openTo", "minDate", "maxDate", "ToolbarComponent", "orientation"]);

  var utils = useUtils();
  var classes = useStyles$4$1();
  var isLandscape = useIsLandscape(orientation);

  var _useViews = useViews(views, openTo, onChange),
      openView = _useViews.openView,
      setOpenView = _useViews.setOpenView,
      handleChangeAndOpenNext = _useViews.handleChangeAndOpenNext;

  var minDate = useMemo(function () {
    return utils.date(unparsedMinDate);
  }, [unparsedMinDate, utils]);
  var maxDate = useMemo(function () {
    return utils.date(unparsedMaxDate);
  }, [unparsedMaxDate, utils]);
  return createElement("div", {
    className: clsx(classes.container, isLandscape && classes.containerLandscape)
  }, !disableToolbar && createElement(ToolbarComponent, _extends({}, rest, {
    views: views,
    isLandscape: isLandscape,
    date: date,
    onChange: onChange,
    setOpenView: setOpenView,
    openView: openView
  })), createElement("div", {
    className: clsx(classes.pickerView, isLandscape && classes.pickerViewLandscape)
  }, openView === 'year' && createElement(YearSelection, _extends({}, rest, {
    date: date,
    onChange: handleChangeAndOpenNext,
    minDate: minDate,
    maxDate: maxDate
  })), openView === 'month' && createElement(MonthSelection, _extends({}, rest, {
    date: date,
    onChange: handleChangeAndOpenNext,
    minDate: minDate,
    maxDate: maxDate
  })), openView === 'date' && createElement(Calendar$1, _extends({}, rest, {
    date: date,
    onChange: handleChangeAndOpenNext,
    minDate: minDate,
    maxDate: maxDate
  })), (openView === 'hours' || openView === 'minutes' || openView === 'seconds') && createElement(ClockView, _extends({}, rest, {
    date: date,
    type: openView,
    onHourChange: handleChangeAndOpenNext,
    onMinutesChange: handleChangeAndOpenNext,
    onSecondsChange: handleChangeAndOpenNext
  }))));
};

Picker.defaultProps = _objectSpread$1({}, datePickerDefaultProps, {
  views: Object.keys(viewsMap)
});

var useStyles$5 = makeStyles(function (theme) {
  var textColor = theme.palette.type === 'light' ? theme.palette.primary.contrastText : theme.palette.getContrastText(theme.palette.background["default"]);
  return {
    toolbarTxt: {
      color: fade(textColor, 0.54)
    },
    toolbarBtnSelected: {
      color: textColor
    }
  };
}, {
  name: 'MuiPickersToolbarText'
});

var ToolbarText = function ToolbarText(_ref) {
  var selected = _ref.selected,
      label = _ref.label,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className,
      other = _objectWithoutProperties(_ref, ["selected", "label", "className"]);

  var classes = useStyles$5();
  return createElement(Typography, _extends({
    children: label,
    className: clsx(classes.toolbarTxt, className, selected && classes.toolbarBtnSelected)
  }, other));
};

var ToolbarButton = function ToolbarButton(_ref) {
  var classes = _ref.classes,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className,
      label = _ref.label,
      selected = _ref.selected,
      variant = _ref.variant,
      align = _ref.align,
      typographyClassName = _ref.typographyClassName,
      other = _objectWithoutProperties(_ref, ["classes", "className", "label", "selected", "variant", "align", "typographyClassName"]);

  return createElement(Button, _extends({
    variant: "text",
    className: clsx(classes.toolbarBtn, className)
  }, other), createElement(ToolbarText, {
    align: align,
    className: typographyClassName,
    variant: variant,
    label: label,
    selected: selected
  }));
};

process.env.NODE_ENV !== "production" ? ToolbarButton.propTypes = {
  selected: propTypes.bool.isRequired,
  label: propTypes.string.isRequired,
  classes: propTypes.any.isRequired,
  className: propTypes.string,
  innerRef: propTypes.any
} : void 0;
ToolbarButton.defaultProps = {
  className: ''
};
var styles$3 = createStyles({
  toolbarBtn: {
    padding: 0,
    minWidth: '16px',
    textTransform: 'none'
  }
});
var ToolbarButton$1 = withStyles(styles$3, {
  name: 'MuiPickersToolbarButton'
})(ToolbarButton);
var useStyles$1$3 = makeStyles(function (theme) {
  return {
    toolbar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 100,
      backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.background["default"]
    },
    toolbarLandscape: {
      height: 'auto',
      maxWidth: 150,
      padding: 8,
      justifyContent: 'flex-start'
    }
  };
}, {
  name: 'MuiPickersToolbar'
});

var PickerToolbar = function PickerToolbar(_ref) {
  var children = _ref.children,
      isLandscape = _ref.isLandscape,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? null : _ref$className,
      other = _objectWithoutProperties(_ref, ["children", "isLandscape", "className"]);

  var classes = useStyles$1$3();
  return createElement(Toolbar, _extends({
    className: clsx(classes.toolbar, className, isLandscape && classes.toolbarLandscape)
  }, other), children);
};

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$2(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var PureDateInput = function PureDateInput(_ref) {
  var inputValue = _ref.inputValue,
      inputVariant = _ref.inputVariant,
      validationError = _ref.validationError,
      InputProps = _ref.InputProps,
      onOpen = _ref.openPicker,
      _ref$TextFieldCompone = _ref.TextFieldComponent,
      TextFieldComponent = _ref$TextFieldCompone === void 0 ? TextField : _ref$TextFieldCompone,
      other = _objectWithoutProperties(_ref, ["inputValue", "inputVariant", "validationError", "InputProps", "openPicker", "TextFieldComponent"]);

  var PureDateInputProps = useMemo(function () {
    return _objectSpread$2({}, InputProps, {
      readOnly: true
    });
  }, [InputProps]);
  return createElement(TextFieldComponent, _extends({
    error: Boolean(validationError),
    helperText: validationError
  }, other, {
    // do not overridable
    onClick: onOpen,
    value: inputValue,
    variant: inputVariant,
    InputProps: PureDateInputProps,
    onKeyDown: function onKeyDown(e) {
      // space
      if (e.keyCode === 32) {
        e.stopPropagation();
        onOpen();
      }
    }
  }));
};

PureDateInput.displayName = 'PureDateInput';

var KeyboardIcon = function KeyboardIcon(props) {
  return React.createElement(SvgIcon, props, React.createElement("path", {
    d: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
  }), React.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0z"
  }));
};

var getDisplayDate = function getDisplayDate(value, format, utils, isEmpty, _ref) {
  var invalidLabel = _ref.invalidLabel,
      emptyLabel = _ref.emptyLabel,
      labelFunc = _ref.labelFunc;
  var date = utils.date(value);

  if (labelFunc) {
    return labelFunc(isEmpty ? null : date, invalidLabel);
  }

  if (isEmpty) {
    return emptyLabel || '';
  }

  return utils.isValid(date) ? utils.format(date, format) : invalidLabel;
};

var getComparisonMaxDate = function getComparisonMaxDate(utils, strictCompareDates, date) {
  if (strictCompareDates) {
    return date;
  }

  return utils.endOfDay(date);
};

var getComparisonMinDate = function getComparisonMinDate(utils, strictCompareDates, date) {
  if (strictCompareDates) {
    return date;
  }

  return utils.startOfDay(date);
};

var validate = function validate(value, utils, _ref2) {
  var maxDate = _ref2.maxDate,
      minDate = _ref2.minDate,
      disablePast = _ref2.disablePast,
      disableFuture = _ref2.disableFuture,
      maxDateMessage = _ref2.maxDateMessage,
      minDateMessage = _ref2.minDateMessage,
      invalidDateMessage = _ref2.invalidDateMessage,
      strictCompareDates = _ref2.strictCompareDates;
  var parsedValue = utils.date(value); // if null - do not show error

  if (value === null) {
    return '';
  }

  if (!utils.isValid(value)) {
    return invalidDateMessage;
  }

  if (maxDate && utils.isAfter(parsedValue, getComparisonMaxDate(utils, !!strictCompareDates, utils.date(maxDate)))) {
    return maxDateMessage;
  }

  if (disableFuture && utils.isAfter(parsedValue, getComparisonMaxDate(utils, !!strictCompareDates, utils.date()))) {
    return maxDateMessage;
  }

  if (minDate && utils.isBefore(parsedValue, getComparisonMinDate(utils, !!strictCompareDates, utils.date(minDate)))) {
    return minDateMessage;
  }

  if (disablePast && utils.isBefore(parsedValue, getComparisonMinDate(utils, !!strictCompareDates, utils.date()))) {
    return minDateMessage;
  }

  return '';
};

function pick12hOr24hFormat(userFormat) {
  var ampm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var formats = arguments.length > 2 ? arguments[2] : undefined;

  if (userFormat) {
    return userFormat;
  }

  return ampm ? formats['12h'] : formats['24h'];
}

function makeMaskFromFormat(format, numberMaskChar) {
  return format.replace(/[a-z]/gi, numberMaskChar);
}

var maskedDateFormatter = function maskedDateFormatter(mask, numberMaskChar, refuse) {
  return function (value) {
    var result = '';
    var parsed = value.replace(refuse, '');

    if (parsed === '') {
      return parsed;
    }

    var i = 0;
    var n = 0;

    while (i < mask.length) {
      var maskChar = mask[i];

      if (maskChar === numberMaskChar && n < parsed.length) {
        var parsedChar = parsed[n];
        result += parsedChar;
        n += 1;
      } else {
        result += maskChar;
      }

      i += 1;
    }

    return result;
  };
};

function ownKeys$1$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$1$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1$1(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1$1(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var KeyboardDateInput = function KeyboardDateInput(_ref) {
  var inputValue = _ref.inputValue,
      inputVariant = _ref.inputVariant,
      validationError = _ref.validationError,
      KeyboardButtonProps = _ref.KeyboardButtonProps,
      InputAdornmentProps = _ref.InputAdornmentProps,
      onOpen = _ref.openPicker,
      onChange = _ref.onChange,
      InputProps = _ref.InputProps,
      mask = _ref.mask,
      _ref$maskChar = _ref.maskChar,
      maskChar = _ref$maskChar === void 0 ? '_' : _ref$maskChar,
      _ref$refuse = _ref.refuse,
      refuse = _ref$refuse === void 0 ? /[^\d]+/gi : _ref$refuse,
      format = _ref.format,
      keyboardIcon = _ref.keyboardIcon,
      disabled = _ref.disabled,
      rifmFormatter = _ref.rifmFormatter,
      _ref$TextFieldCompone = _ref.TextFieldComponent,
      TextFieldComponent = _ref$TextFieldCompone === void 0 ? TextField : _ref$TextFieldCompone,
      other = _objectWithoutProperties(_ref, ["inputValue", "inputVariant", "validationError", "KeyboardButtonProps", "InputAdornmentProps", "openPicker", "onChange", "InputProps", "mask", "maskChar", "refuse", "format", "keyboardIcon", "disabled", "rifmFormatter", "TextFieldComponent"]);

  var inputMask = mask || makeMaskFromFormat(format, maskChar); // prettier-ignore

  var formatter = useMemo(function () {
    return maskedDateFormatter(inputMask, maskChar, refuse);
  }, [inputMask, maskChar, refuse]);
  var position = InputAdornmentProps && InputAdornmentProps.position ? InputAdornmentProps.position : 'end';

  var handleChange = function handleChange(text) {
    var finalString = text === '' || text === inputMask ? null : text;
    onChange(finalString);
  };

  return createElement(Rifm, {
    key: inputMask,
    value: inputValue,
    onChange: handleChange,
    refuse: refuse,
    format: rifmFormatter || formatter
  }, function (_ref2) {
    var onChange = _ref2.onChange,
        value = _ref2.value;
    return createElement(TextFieldComponent, _extends({
      disabled: disabled,
      error: Boolean(validationError),
      helperText: validationError
    }, other, {
      value: value,
      onChange: onChange,
      variant: inputVariant,
      InputProps: _objectSpread$1$1({}, InputProps, _defineProperty({}, "".concat(position, "Adornment"), createElement(InputAdornment, _extends({
        position: position
      }, InputAdornmentProps), createElement(IconButton, _extends({
        disabled: disabled
      }, KeyboardButtonProps, {
        onClick: onOpen
      }), keyboardIcon))))
    }));
  });
};

KeyboardDateInput.defaultProps = {
  keyboardIcon: createElement(KeyboardIcon, null)
};

function useOpenState(_ref) {
  var open = _ref.open,
      onOpen = _ref.onOpen,
      onClose = _ref.onClose;
  var setIsOpenState = null;

  if (open === undefined || open === null) {
    // The component is uncontrolled, so we need to give it its own state.
    var _useState = useState(false);

    var _useState2 = _slicedToArray(_useState, 2);

    open = _useState2[0];
    setIsOpenState = _useState2[1];
  } // prettier-ignore


  var setIsOpen = useCallback(function (newIsOpen) {
    setIsOpenState && setIsOpenState(newIsOpen);
    return newIsOpen ? onOpen && onOpen() : onClose && onClose();
  }, [onOpen, onClose, setIsOpenState]);
  return {
    isOpen: open,
    setIsOpen: setIsOpen
  };
}

var useValueToDate = function useValueToDate(utils, _ref) {
  var value = _ref.value,
      initialFocusedDate = _ref.initialFocusedDate;
  var nowRef = useRef(utils.date());
  var date = utils.date(value || initialFocusedDate || nowRef.current);
  return date && utils.isValid(date) ? date : nowRef.current;
};

function useDateValues(props, options) {
  var utils = useUtils();
  var date = useValueToDate(utils, props);
  var format = props.format || options.getDefaultFormat();
  return {
    date: date,
    format: format
  };
}

function usePickerState(props, options) {
  var autoOk = props.autoOk,
      disabled = props.disabled,
      readOnly = props.readOnly,
      onAccept = props.onAccept,
      _onChange = props.onChange,
      onError = props.onError,
      value = props.value,
      variant = props.variant;
  var utils = useUtils();

  var _useOpenState = useOpenState(props),
      isOpen = _useOpenState.isOpen,
      setIsOpen = _useOpenState.setIsOpen;

  var _useDateValues = useDateValues(props, options),
      date = _useDateValues.date,
      format = _useDateValues.format;

  var _useState = useState(date),
      _useState2 = _slicedToArray(_useState, 2),
      pickerDate = _useState2[0],
      setPickerDate = _useState2[1];

  useEffect(function () {
    // if value was changed in closed state - treat it as accepted
    if (!isOpen && !utils.isEqual(pickerDate, date)) {
      setPickerDate(date);
    }
  }, [date, isOpen, pickerDate, utils]);
  var acceptDate = useCallback(function (acceptedDate) {
    _onChange(acceptedDate);

    if (onAccept) {
      onAccept(acceptedDate);
    }

    setIsOpen(false);
  }, [onAccept, _onChange, setIsOpen]);
  var wrapperProps = useMemo(function () {
    return {
      format: format,
      open: isOpen,
      onClear: function onClear() {
        return acceptDate(null);
      },
      onAccept: function onAccept() {
        return acceptDate(pickerDate);
      },
      onSetToday: function onSetToday() {
        return setPickerDate(utils.date());
      },
      onDismiss: function onDismiss() {
        setIsOpen(false);
      }
    };
  }, [acceptDate, format, isOpen, pickerDate, setIsOpen, utils]);
  var pickerProps = useMemo(function () {
    return {
      date: pickerDate,
      onChange: function onChange(newDate) {
        var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        setPickerDate(newDate);

        if (isFinish && autoOk) {
          acceptDate(newDate);
          return;
        } // simulate autoOk, but do not close the modal


        if (variant === 'inline' || variant === 'static') {
          _onChange(newDate);

          onAccept && onAccept(newDate);
        }
      }
    };
  }, [acceptDate, autoOk, onAccept, _onChange, pickerDate, variant]);
  var validationError = validate(value, utils, props);
  useEffect(function () {
    if (onError) {
      onError(validationError, value);
    }
  }, [onError, validationError, value]);
  var inputValue = getDisplayDate(date, format, utils, value === null, props);
  var inputProps = useMemo(function () {
    return {
      inputValue: inputValue,
      validationError: validationError,
      openPicker: function openPicker() {
        return !readOnly && !disabled && setIsOpen(true);
      }
    };
  }, [disabled, inputValue, readOnly, setIsOpen, validationError]);
  var pickerState = {
    pickerProps: pickerProps,
    inputProps: inputProps,
    wrapperProps: wrapperProps
  };
  useDebugValue(pickerState);
  return pickerState;
}

function ownKeys$2$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$2$1(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2$1(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function parseInputString(value, utils, format) {
  try {
    return utils.parse(value, format);
  } catch (_unused) {
    return null;
  }
}

function useKeyboardPickerState(props, options) {
  var _props$format = props.format,
      format = _props$format === void 0 ? options.getDefaultFormat() : _props$format,
      inputValue = props.inputValue,
      _onChange = props.onChange,
      value = props.value;
  var utils = useUtils();
  var displayDate = getDisplayDate(value, format, utils, value === null, props);

  var _useState = useState(displayDate),
      _useState2 = _slicedToArray(_useState, 2),
      innerInputValue = _useState2[0],
      setInnerInputValue = _useState2[1];

  var dateValue = inputValue ? parseInputString(inputValue, utils, format) : value;
  useEffect(function () {
    if (value === null || utils.isValid(value)) {
      setInnerInputValue(displayDate);
    }
  }, [displayDate, setInnerInputValue, utils, value]);
  var handleKeyboardChange = useCallback(function (date) {
    _onChange(date, date === null ? null : utils.format(date, format));
  }, [format, _onChange, utils]);

  var _usePickerState = usePickerState( // Extend props interface
  _objectSpread$2$1({}, props, {
    value: dateValue,
    onChange: handleKeyboardChange
  }), options),
      innerInputProps = _usePickerState.inputProps,
      wrapperProps = _usePickerState.wrapperProps,
      pickerProps = _usePickerState.pickerProps;

  var inputProps = useMemo(function () {
    return _objectSpread$2$1({}, innerInputProps, {
      // reuse validation and open/close logic
      format: wrapperProps.format,
      inputValue: inputValue || innerInputValue,
      onChange: function onChange(value) {
        setInnerInputValue(value || '');
        var date = value === null ? null : utils.parse(value, wrapperProps.format);

        _onChange(date, value);
      }
    });
  }, [innerInputProps, innerInputValue, inputValue, _onChange, utils, wrapperProps.format]);
  return {
    inputProps: inputProps,
    wrapperProps: wrapperProps,
    pickerProps: pickerProps
  };
}

function makePickerWithState(_ref) {
  var Input = _ref.Input,
      useState = _ref.useState,
      useOptions = _ref.useOptions,
      getCustomProps = _ref.getCustomProps,
      DefaultToolbarComponent = _ref.DefaultToolbarComponent;

  function PickerWithState(props) {
    var allowKeyboardControl = props.allowKeyboardControl,
        ampm = props.ampm,
        animateYearScrolling = props.animateYearScrolling;
        props.autoOk;
        var dateRangeIcon = props.dateRangeIcon,
        disableFuture = props.disableFuture,
        disablePast = props.disablePast,
        disableToolbar = props.disableToolbar;
        props.emptyLabel;
        props.format;
        props.forwardedRef;
        var hideTabs = props.hideTabs;
        props.initialFocusedDate;
        props.invalidDateMessage;
        props.invalidLabel;
        props.labelFunc;
        var leftArrowButtonProps = props.leftArrowButtonProps,
        leftArrowIcon = props.leftArrowIcon,
        loadingIndicator = props.loadingIndicator,
        maxDate = props.maxDate;
        props.maxDateMessage;
        var minDate = props.minDate;
        props.minDateMessage;
        var minutesStep = props.minutesStep;
        props.onAccept;
        props.onChange;
        props.onClose;
        var onMonthChange = props.onMonthChange;
        props.onOpen;
        var onYearChange = props.onYearChange,
        openTo = props.openTo,
        orientation = props.orientation,
        renderDay = props.renderDay,
        rightArrowButtonProps = props.rightArrowButtonProps,
        rightArrowIcon = props.rightArrowIcon,
        shouldDisableDate = props.shouldDisableDate,
        strictCompareDates = props.strictCompareDates,
        timeIcon = props.timeIcon,
        _props$ToolbarCompone = props.ToolbarComponent,
        ToolbarComponent = _props$ToolbarCompone === void 0 ? DefaultToolbarComponent : _props$ToolbarCompone;
        props.value;
        var variant = props.variant,
        views = props.views,
        other = _objectWithoutProperties(props, ["allowKeyboardControl", "ampm", "animateYearScrolling", "autoOk", "dateRangeIcon", "disableFuture", "disablePast", "disableToolbar", "emptyLabel", "format", "forwardedRef", "hideTabs", "initialFocusedDate", "invalidDateMessage", "invalidLabel", "labelFunc", "leftArrowButtonProps", "leftArrowIcon", "loadingIndicator", "maxDate", "maxDateMessage", "minDate", "minDateMessage", "minutesStep", "onAccept", "onChange", "onClose", "onMonthChange", "onOpen", "onYearChange", "openTo", "orientation", "renderDay", "rightArrowButtonProps", "rightArrowIcon", "shouldDisableDate", "strictCompareDates", "timeIcon", "ToolbarComponent", "value", "variant", "views"]);

    var injectedProps = getCustomProps ? getCustomProps(props) : {};
    var options = useOptions(props);

    var _useState = useState(props, options),
        pickerProps = _useState.pickerProps,
        inputProps = _useState.inputProps,
        wrapperProps = _useState.wrapperProps;

    return createElement(Wrapper, _extends({
      variant: variant,
      InputComponent: Input,
      DateInputProps: inputProps
    }, injectedProps, wrapperProps, other), createElement(Picker, _extends({}, pickerProps, {
      allowKeyboardControl: allowKeyboardControl,
      ampm: ampm,
      animateYearScrolling: animateYearScrolling,
      dateRangeIcon: dateRangeIcon,
      disableFuture: disableFuture,
      disablePast: disablePast,
      disableToolbar: disableToolbar,
      hideTabs: hideTabs,
      leftArrowButtonProps: leftArrowButtonProps,
      leftArrowIcon: leftArrowIcon,
      loadingIndicator: loadingIndicator,
      maxDate: maxDate,
      minDate: minDate,
      minutesStep: minutesStep,
      onMonthChange: onMonthChange,
      onYearChange: onYearChange,
      openTo: openTo,
      orientation: orientation,
      renderDay: renderDay,
      rightArrowButtonProps: rightArrowButtonProps,
      rightArrowIcon: rightArrowIcon,
      shouldDisableDate: shouldDisableDate,
      strictCompareDates: strictCompareDates,
      timeIcon: timeIcon,
      ToolbarComponent: ToolbarComponent,
      views: views
    })));
  }

  return PickerWithState;
}

var useStyles$6 = makeStyles({
  toolbar: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  toolbarLandscape: {
    padding: 16
  },
  dateLandscape: {
    marginRight: 16
  }
}, {
  name: 'MuiPickersDatePickerRoot'
});

var DatePickerToolbar = function DatePickerToolbar(_ref) {
  var date = _ref.date,
      views = _ref.views,
      setOpenView = _ref.setOpenView,
      isLandscape = _ref.isLandscape,
      openView = _ref.openView;
  var utils = useUtils();
  var classes = useStyles$6();
  var isYearOnly = useMemo(function () {
    return isYearOnlyView(views);
  }, [views]);
  var isYearAndMonth = useMemo(function () {
    return isYearAndMonthViews(views);
  }, [views]);
  return createElement(PickerToolbar, {
    isLandscape: isLandscape,
    className: clsx(!isYearOnly && classes.toolbar, isLandscape && classes.toolbarLandscape)
  }, createElement(ToolbarButton$1, {
    variant: isYearOnly ? 'h3' : 'subtitle1',
    onClick: function onClick() {
      return setOpenView('year');
    },
    selected: openView === 'year',
    label: utils.getYearText(date)
  }), !isYearOnly && !isYearAndMonth && createElement(ToolbarButton$1, {
    variant: "h4",
    selected: openView === 'date',
    onClick: function onClick() {
      return setOpenView('date');
    },
    align: isLandscape ? 'left' : 'center',
    label: utils.getDatePickerHeaderText(date),
    className: clsx(isLandscape && classes.dateLandscape)
  }), isYearAndMonth && createElement(ToolbarButton$1, {
    variant: "h4",
    onClick: function onClick() {
      return setOpenView('month');
    },
    selected: openView === 'month',
    label: utils.getMonthText(date)
  }));
};

function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$3(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$3(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var defaultProps = _objectSpread$3({}, datePickerDefaultProps, {
  openTo: 'date',
  views: ['year', 'date']
});

function useOptions(props) {
  var utils = useUtils();
  return {
    getDefaultFormat: function getDefaultFormat() {
      return getFormatByViews(props.views, utils);
    }
  };
}

var DatePicker = makePickerWithState({
  useOptions: useOptions,
  Input: PureDateInput,
  useState: usePickerState,
  DefaultToolbarComponent: DatePickerToolbar
});
var KeyboardDatePicker = makePickerWithState({
  useOptions: useOptions,
  Input: KeyboardDateInput,
  useState: useKeyboardPickerState,
  DefaultToolbarComponent: DatePickerToolbar
});
DatePicker.defaultProps = defaultProps;
KeyboardDatePicker.defaultProps = defaultProps;

var useStyles$7 = makeStyles({
  toolbarLandscape: {
    flexWrap: 'wrap'
  },
  toolbarAmpmLeftPadding: {
    paddingLeft: 50
  },
  separator: {
    margin: '0 4px 0 2px',
    cursor: 'default'
  },
  hourMinuteLabel: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  hourMinuteLabelAmpmLandscape: {
    marginTop: 'auto'
  },
  hourMinuteLabelReverse: {
    flexDirection: 'row-reverse'
  },
  ampmSelection: {
    marginLeft: 20,
    marginRight: -20,
    display: 'flex',
    flexDirection: 'column'
  },
  ampmLandscape: {
    margin: '4px 0 auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexBasis: '100%'
  },
  ampmSelectionWithSeconds: {
    marginLeft: 15,
    marginRight: 10
  },
  ampmLabel: {
    fontSize: 18
  }
}, {
  name: 'MuiPickersTimePickerToolbar'
});

function useMeridiemMode(date, ampm, onChange) {
  var utils = useUtils();
  var meridiemMode = getMeridiem(date, utils);
  var handleMeridiemChange = useCallback(function (mode) {
    var timeWithMeridiem = convertToMeridiem(date, mode, Boolean(ampm), utils);
    onChange(timeWithMeridiem, false);
  }, [ampm, date, onChange, utils]);
  return {
    meridiemMode: meridiemMode,
    handleMeridiemChange: handleMeridiemChange
  };
}

var TimePickerToolbar = function TimePickerToolbar(_ref) {
  var date = _ref.date,
      views = _ref.views,
      ampm = _ref.ampm,
      openView = _ref.openView,
      onChange = _ref.onChange,
      isLandscape = _ref.isLandscape,
      setOpenView = _ref.setOpenView;
  var utils = useUtils();
  var theme = useTheme();
  var classes = useStyles$7();

  var _useMeridiemMode = useMeridiemMode(date, ampm, onChange),
      meridiemMode = _useMeridiemMode.meridiemMode,
      handleMeridiemChange = _useMeridiemMode.handleMeridiemChange;

  var clockTypographyVariant = isLandscape ? 'h3' : 'h2';
  return createElement(PickerToolbar, {
    isLandscape: isLandscape,
    className: clsx(isLandscape ? classes.toolbarLandscape : ampm && classes.toolbarAmpmLeftPadding)
  }, createElement("div", {
    className: clsx(classes.hourMinuteLabel, ampm && isLandscape && classes.hourMinuteLabelAmpmLandscape, {
      rtl: classes.hourMinuteLabelReverse
    }[theme.direction])
  }, arrayIncludes(views, 'hours') && createElement(ToolbarButton$1, {
    variant: clockTypographyVariant,
    onClick: function onClick() {
      return setOpenView(ClockType$1.HOURS);
    },
    selected: openView === ClockType$1.HOURS,
    label: utils.getHourText(date, Boolean(ampm))
  }), arrayIncludes(views, ['hours', 'minutes']) && createElement(ToolbarText, {
    label: ":",
    variant: clockTypographyVariant,
    selected: false,
    className: classes.separator
  }), arrayIncludes(views, 'minutes') && createElement(ToolbarButton$1, {
    variant: clockTypographyVariant,
    onClick: function onClick() {
      return setOpenView(ClockType$1.MINUTES);
    },
    selected: openView === ClockType$1.MINUTES,
    label: utils.getMinuteText(date)
  }), arrayIncludes(views, ['minutes', 'seconds']) && createElement(ToolbarText, {
    variant: "h2",
    label: ":",
    selected: false,
    className: classes.separator
  }), arrayIncludes(views, 'seconds') && createElement(ToolbarButton$1, {
    variant: "h2",
    onClick: function onClick() {
      return setOpenView(ClockType$1.SECONDS);
    },
    selected: openView === ClockType$1.SECONDS,
    label: utils.getSecondText(date)
  })), ampm && createElement("div", {
    className: clsx(classes.ampmSelection, isLandscape && classes.ampmLandscape, arrayIncludes(views, 'seconds') && classes.ampmSelectionWithSeconds)
  }, createElement(ToolbarButton$1, {
    disableRipple: true,
    variant: "subtitle1",
    selected: meridiemMode === 'am',
    typographyClassName: classes.ampmLabel,
    label: utils.getMeridiemText('am'),
    onClick: function onClick() {
      return handleMeridiemChange('am');
    }
  }), createElement(ToolbarButton$1, {
    disableRipple: true,
    variant: "subtitle1",
    selected: meridiemMode === 'pm',
    typographyClassName: classes.ampmLabel,
    label: utils.getMeridiemText('pm'),
    onClick: function onClick() {
      return handleMeridiemChange('pm');
    }
  })));
};

function ownKeys$4(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$4(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$4(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var defaultProps$1 = _objectSpread$4({}, timePickerDefaultProps, {
  openTo: 'hours',
  views: ['hours', 'minutes']
});

function useOptions$1(props) {
  var utils = useUtils();
  return {
    getDefaultFormat: function getDefaultFormat() {
      return pick12hOr24hFormat(props.format, props.ampm, {
        '12h': utils.time12hFormat,
        '24h': utils.time24hFormat
      });
    }
  };
}

var TimePicker = makePickerWithState({
  useOptions: useOptions$1,
  Input: PureDateInput,
  useState: usePickerState,
  DefaultToolbarComponent: TimePickerToolbar
});
var KeyboardTimePicker = makePickerWithState({
  useOptions: useOptions$1,
  Input: KeyboardDateInput,
  useState: useKeyboardPickerState,
  DefaultToolbarComponent: TimePickerToolbar,
  getCustomProps: function getCustomProps(props) {
    return {
      refuse: props.ampm ? /[^\dap]+/gi : /[^\d]+/gi
    };
  }
});
TimePicker.defaultProps = defaultProps$1;
KeyboardTimePicker.defaultProps = defaultProps$1;

var toInteger_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toInteger;

  function toInteger(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
      return NaN;
    }

    var number = Number(dirtyNumber);

    if (isNaN(number)) {
      return number;
    }

    return number < 0 ? Math.ceil(number) : Math.floor(number);
  }

  module.exports = exports.default;
});

var requiredArgs_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = requiredArgs;

  function requiredArgs(required, args) {
    if (args.length < required) {
      throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
    }
  }

  module.exports = exports.default;
});

var toDate_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toDate;

  var _index = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name toDate
   * @category Common Helpers
   * @summary Convert the given argument to an instance of Date.
   *
   * @description
   * Convert the given argument to an instance of Date.
   *
   * If the argument is an instance of Date, the function returns its clone.
   *
   * If the argument is a number, it is treated as a timestamp.
   *
   * If the argument is none of the above, the function returns Invalid Date.
   *
   * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
   *
   * @param {Date|Number} argument - the value to convert
   * @returns {Date} the parsed date in the local time zone
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // Clone the date:
   * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
   * //=> Tue Feb 11 2014 11:30:30
   *
   * @example
   * // Convert the timestamp to date:
   * const result = toDate(1392098430000)
   * //=> Tue Feb 11 2014 11:30:30
   */


  function toDate(argument) {
    (0, _index.default)(1, arguments);
    var argStr = Object.prototype.toString.call(argument); // Clone the date

    if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      return new Date(argument.getTime());
    } else if (typeof argument === 'number' || argStr === '[object Number]') {
      return new Date(argument);
    } else {
      if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
        // eslint-disable-next-line no-console
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

        console.warn(new Error().stack);
      }

      return new Date(NaN);
    }
  }

  module.exports = exports.default;
});

var addDays_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addDays;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name addDays
   * @category Day Helpers
   * @summary Add the specified number of days to the given date.
   *
   * @description
   * Add the specified number of days to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the days added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 10 days to 1 September 2014:
   * const result = addDays(new Date(2014, 8, 1), 10)
   * //=> Thu Sep 11 2014 00:00:00
   */


  function addDays(dirtyDate, dirtyAmount) {
    (0, _index3.default)(2, arguments);
    var date = (0, _index2.default)(dirtyDate);
    var amount = (0, _index.default)(dirtyAmount);

    if (isNaN(amount)) {
      return new Date(NaN);
    }

    if (!amount) {
      // If 0 days, no-op to avoid changing times in the hour before end of DST
      return date;
    }

    date.setDate(date.getDate() + amount);
    return date;
  }

  module.exports = exports.default;
});
var addDays = /*@__PURE__*/getDefaultExportFromCjs(addDays_1);

var addMilliseconds_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addMilliseconds;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name addMilliseconds
   * @category Millisecond Helpers
   * @summary Add the specified number of milliseconds to the given date.
   *
   * @description
   * Add the specified number of milliseconds to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the milliseconds added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
   * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
   * //=> Thu Jul 10 2014 12:45:30.750
   */


  function addMilliseconds(dirtyDate, dirtyAmount) {
    (0, _index3.default)(2, arguments);
    var timestamp = (0, _index2.default)(dirtyDate).getTime();
    var amount = (0, _index.default)(dirtyAmount);
    return new Date(timestamp + amount);
  }

  module.exports = exports.default;
});

var addSeconds_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addSeconds;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(addMilliseconds_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name addSeconds
   * @category Second Helpers
   * @summary Add the specified number of seconds to the given date.
   *
   * @description
   * Add the specified number of seconds to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of seconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the seconds added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 30 seconds to 10 July 2014 12:45:00:
   * const result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
   * //=> Thu Jul 10 2014 12:45:30
   */


  function addSeconds(dirtyDate, dirtyAmount) {
    (0, _index3.default)(2, arguments);
    var amount = (0, _index.default)(dirtyAmount);
    return (0, _index2.default)(dirtyDate, amount * 1000);
  }

  module.exports = exports.default;
});
var addSeconds = /*@__PURE__*/getDefaultExportFromCjs(addSeconds_1);

var addMinutes_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addMinutes;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(addMilliseconds_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MILLISECONDS_IN_MINUTE = 60000;
  /**
   * @name addMinutes
   * @category Minute Helpers
   * @summary Add the specified number of minutes to the given date.
   *
   * @description
   * Add the specified number of minutes to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of minutes to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the minutes added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 30 minutes to 10 July 2014 12:00:00:
   * const result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
   * //=> Thu Jul 10 2014 12:30:00
   */

  function addMinutes(dirtyDate, dirtyAmount) {
    (0, _index3.default)(2, arguments);
    var amount = (0, _index.default)(dirtyAmount);
    return (0, _index2.default)(dirtyDate, amount * MILLISECONDS_IN_MINUTE);
  }

  module.exports = exports.default;
});
var addMinutes = /*@__PURE__*/getDefaultExportFromCjs(addMinutes_1);

var addHours_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addHours;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(addMilliseconds_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MILLISECONDS_IN_HOUR = 3600000;
  /**
   * @name addHours
   * @category Hour Helpers
   * @summary Add the specified number of hours to the given date.
   *
   * @description
   * Add the specified number of hours to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of hours to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the hours added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 2 hours to 10 July 2014 23:00:00:
   * const result = addHours(new Date(2014, 6, 10, 23, 0), 2)
   * //=> Fri Jul 11 2014 01:00:00
   */

  function addHours(dirtyDate, dirtyAmount) {
    (0, _index3.default)(2, arguments);
    var amount = (0, _index.default)(dirtyAmount);
    return (0, _index2.default)(dirtyDate, amount * MILLISECONDS_IN_HOUR);
  }

  module.exports = exports.default;
});
var addHours = /*@__PURE__*/getDefaultExportFromCjs(addHours_1);

var addWeeks_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addWeeks;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(addDays_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name addWeeks
   * @category Week Helpers
   * @summary Add the specified number of weeks to the given date.
   *
   * @description
   * Add the specified number of week to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of weeks to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the weeks added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 4 weeks to 1 September 2014:
   * const result = addWeeks(new Date(2014, 8, 1), 4)
   * //=> Mon Sep 29 2014 00:00:00
   */


  function addWeeks(dirtyDate, dirtyAmount) {
    (0, _index3.default)(2, arguments);
    var amount = (0, _index.default)(dirtyAmount);
    var days = amount * 7;
    return (0, _index2.default)(dirtyDate, days);
  }

  module.exports = exports.default;
});
var addWeeks = /*@__PURE__*/getDefaultExportFromCjs(addWeeks_1);

var addMonths_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addMonths;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name addMonths
   * @category Month Helpers
   * @summary Add the specified number of months to the given date.
   *
   * @description
   * Add the specified number of months to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of months to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the months added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 5 months to 1 September 2014:
   * const result = addMonths(new Date(2014, 8, 1), 5)
   * //=> Sun Feb 01 2015 00:00:00
   */


  function addMonths(dirtyDate, dirtyAmount) {
    (0, _index3.default)(2, arguments);
    var date = (0, _index2.default)(dirtyDate);
    var amount = (0, _index.default)(dirtyAmount);

    if (isNaN(amount)) {
      return new Date(NaN);
    }

    if (!amount) {
      // If 0 months, no-op to avoid changing times in the hour before end of DST
      return date;
    }

    var dayOfMonth = date.getDate(); // The JS Date object supports date math by accepting out-of-bounds values for
    // month, day, etc. For example, new Date(2020, 1, 0) returns 31 Dec 2019 and
    // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
    // want except that dates will wrap around the end of a month, meaning that
    // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
    // we'll default to the end of the desired month by adding 1 to the desired
    // month and using a date of 0 to back up one day to the end of the desired
    // month.

    var endOfDesiredMonth = new Date(date.getTime());
    endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
    var daysInMonth = endOfDesiredMonth.getDate();

    if (dayOfMonth >= daysInMonth) {
      // If we're already at the end of the month, then this is the correct date
      // and we're done.
      return endOfDesiredMonth;
    } else {
      // Otherwise, we now know that setting the original day-of-month value won't
      // cause an overflow, so set the desired day-of-month. Note that we can't
      // just set the date of `endOfDesiredMonth` because that object may have had
      // its time changed in the unusual case where where a DST transition was on
      // the last day of the month and its local time was in the hour skipped or
      // repeated next to a DST transition.  So we use `date` instead which is
      // guaranteed to still have the original time.
      date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
      return date;
    }
  }

  module.exports = exports.default;
});
var addMonths = /*@__PURE__*/getDefaultExportFromCjs(addMonths_1);

var addYears_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addYears;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(addMonths_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name addYears
   * @category Year Helpers
   * @summary Add the specified number of years to the given date.
   *
   * @description
   * Add the specified number of years to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of years to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the years added
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Add 5 years to 1 September 2014:
   * const result = addYears(new Date(2014, 8, 1), 5)
   * //=> Sun Sep 01 2019 00:00:00
   */


  function addYears(dirtyDate, dirtyAmount) {
    (0, _index3.default)(2, arguments);
    var amount = (0, _index.default)(dirtyAmount);
    return (0, _index2.default)(dirtyDate, amount * 12);
  }

  module.exports = exports.default;
});
var addYears = /*@__PURE__*/getDefaultExportFromCjs(addYears_1);

var differenceInCalendarYears_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = differenceInCalendarYears;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name differenceInCalendarYears
   * @category Year Helpers
   * @summary Get the number of calendar years between the given dates.
   *
   * @description
   * Get the number of calendar years between the given dates.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of calendar years
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many calendar years are between 31 December 2013 and 11 February 2015?
   * var result = differenceInCalendarYears(
   *   new Date(2015, 1, 11),
   *   new Date(2013, 11, 31)
   * )
   * //=> 2
   */


  function differenceInCalendarYears(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var dateLeft = (0, _index.default)(dirtyDateLeft);
    var dateRight = (0, _index.default)(dirtyDateRight);
    return dateLeft.getFullYear() - dateRight.getFullYear();
  }

  module.exports = exports.default;
});

var compareAsc_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = compareAsc;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name compareAsc
   * @category Common Helpers
   * @summary Compare the two dates and return -1, 0 or 1.
   *
   * @description
   * Compare the two dates and return 1 if the first date is after the second,
   * -1 if the first date is before the second or 0 if dates are equal.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the first date to compare
   * @param {Date|Number} dateRight - the second date to compare
   * @returns {Number} the result of the comparison
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Compare 11 February 1987 and 10 July 1989:
   * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
   * //=> -1
   *
   * @example
   * // Sort the array of dates:
   * const result = [
   *   new Date(1995, 6, 2),
   *   new Date(1987, 1, 11),
   *   new Date(1989, 6, 10)
   * ].sort(compareAsc)
   * //=> [
   * //   Wed Feb 11 1987 00:00:00,
   * //   Mon Jul 10 1989 00:00:00,
   * //   Sun Jul 02 1995 00:00:00
   * // ]
   */


  function compareAsc(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var dateLeft = (0, _index.default)(dirtyDateLeft);
    var dateRight = (0, _index.default)(dirtyDateRight);
    var diff = dateLeft.getTime() - dateRight.getTime();

    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1; // Return 0 if diff is 0; return NaN if diff is NaN
    } else {
      return diff;
    }
  }

  module.exports = exports.default;
});

var differenceInYears_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = differenceInYears;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(differenceInCalendarYears_1);

  var _index3 = _interopRequireDefault(compareAsc_1);

  var _index4 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name differenceInYears
   * @category Year Helpers
   * @summary Get the number of full years between the given dates.
   *
   * @description
   * Get the number of full years between the given dates.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of full years
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many full years are between 31 December 2013 and 11 February 2015?
   * var result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
   * //=> 1
   */


  function differenceInYears(dirtyDateLeft, dirtyDateRight) {
    (0, _index4.default)(2, arguments);
    var dateLeft = (0, _index.default)(dirtyDateLeft);
    var dateRight = (0, _index.default)(dirtyDateRight);
    var sign = (0, _index3.default)(dateLeft, dateRight);
    var difference = Math.abs((0, _index2.default)(dateLeft, dateRight)); // Set both dates to a valid leap year for accurate comparison when dealing
    // with leap days

    dateLeft.setFullYear('1584');
    dateRight.setFullYear('1584'); // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
    // If so, result must be decreased by 1 in absolute value

    var isLastYearNotFull = (0, _index3.default)(dateLeft, dateRight) === -sign;
    var result = sign * (difference - isLastYearNotFull); // Prevent negative zero

    return result === 0 ? 0 : result;
  }

  module.exports = exports.default;
});
var differenceInYears = /*@__PURE__*/getDefaultExportFromCjs(differenceInYears_1);

var differenceInCalendarMonths_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = differenceInCalendarMonths;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name differenceInCalendarMonths
   * @category Month Helpers
   * @summary Get the number of calendar months between the given dates.
   *
   * @description
   * Get the number of calendar months between the given dates.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of calendar months
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many calendar months are between 31 January 2014 and 1 September 2014?
   * var result = differenceInCalendarMonths(
   *   new Date(2014, 8, 1),
   *   new Date(2014, 0, 31)
   * )
   * //=> 8
   */


  function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var dateLeft = (0, _index.default)(dirtyDateLeft);
    var dateRight = (0, _index.default)(dirtyDateRight);
    var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
    var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
    return yearDiff * 12 + monthDiff;
  }

  module.exports = exports.default;
});

var endOfDay_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = endOfDay;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name endOfDay
   * @category Day Helpers
   * @summary Return the end of a day for the given date.
   *
   * @description
   * Return the end of a day for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @returns {Date} the end of a day
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // The end of a day for 2 September 2014 11:55:00:
   * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Sep 02 2014 23:59:59.999
   */


  function endOfDay(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    date.setHours(23, 59, 59, 999);
    return date;
  }

  module.exports = exports.default;
});
var endOfDay = /*@__PURE__*/getDefaultExportFromCjs(endOfDay_1);

var endOfMonth_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = endOfMonth;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name endOfMonth
   * @category Month Helpers
   * @summary Return the end of a month for the given date.
   *
   * @description
   * Return the end of a month for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @returns {Date} the end of a month
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // The end of a month for 2 September 2014 11:55:00:
   * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Sep 30 2014 23:59:59.999
   */


  function endOfMonth(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var month = date.getMonth();
    date.setFullYear(date.getFullYear(), month + 1, 0);
    date.setHours(23, 59, 59, 999);
    return date;
  }

  module.exports = exports.default;
});
var endOfMonth = /*@__PURE__*/getDefaultExportFromCjs(endOfMonth_1);

var isLastDayOfMonth_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isLastDayOfMonth;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(endOfDay_1);

  var _index3 = _interopRequireDefault(endOfMonth_1);

  var _index4 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name isLastDayOfMonth
   * @category Month Helpers
   * @summary Is the given date the last day of a month?
   *
   * @description
   * Is the given date the last day of a month?
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to check
   * @returns {Boolean} the date is the last day of a month
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // Is 28 February 2014 the last day of a month?
   * var result = isLastDayOfMonth(new Date(2014, 1, 28))
   * //=> true
   */


  function isLastDayOfMonth(dirtyDate) {
    (0, _index4.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    return (0, _index2.default)(date).getTime() === (0, _index3.default)(date).getTime();
  }

  module.exports = exports.default;
});

var differenceInMonths_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = differenceInMonths;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(differenceInCalendarMonths_1);

  var _index3 = _interopRequireDefault(compareAsc_1);

  var _index4 = _interopRequireDefault(requiredArgs_1);

  var _index5 = _interopRequireDefault(isLastDayOfMonth_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name differenceInMonths
   * @category Month Helpers
   * @summary Get the number of full months between the given dates.
   *
   * @description
   * Get the number of full months between the given dates.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of full months
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many full months are between 31 January 2014 and 1 September 2014?
   * var result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
   * //=> 7
   */


  function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
    (0, _index4.default)(2, arguments);
    var dateLeft = (0, _index.default)(dirtyDateLeft);
    var dateRight = (0, _index.default)(dirtyDateRight);
    var sign = (0, _index3.default)(dateLeft, dateRight);
    var difference = Math.abs((0, _index2.default)(dateLeft, dateRight)); // This will check if the date is end of Feb and assign a higher end of month date
    // to compare it with Jan

    if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
      dateLeft.setDate(30);
    }

    dateLeft.setMonth(dateLeft.getMonth() - sign * difference); // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
    // If so, result must be decreased by 1 in absolute value

    var isLastMonthNotFull = (0, _index3.default)(dateLeft, dateRight) === -sign; // Check for cases of one full calendar month

    if ((0, _index5.default)((0, _index.default)(dirtyDateLeft)) && difference === 1 && (0, _index3.default)(dirtyDateLeft, dateRight) === 1) {
      isLastMonthNotFull = false;
    }

    var result = sign * (difference - isLastMonthNotFull); // Prevent negative zero

    return result === 0 ? 0 : result;
  }

  module.exports = exports.default;
});
var differenceInMonths = /*@__PURE__*/getDefaultExportFromCjs(differenceInMonths_1);

var differenceInQuarters_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = differenceInQuarters;

  var _index = _interopRequireDefault(differenceInMonths_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name differenceInQuarters
   * @category Quarter Helpers
   * @summary Get the number of full quarters between the given dates.
   *
   * @description
   * Get the number of full quarters between the given dates.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of full quarters
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many full quarters are between 31 December 2013 and 2 July 2014?
   * var result = differenceInQuarters(new Date(2014, 6, 2), new Date(2013, 11, 31))
   * //=> 2
   */


  function differenceInQuarters(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var diff = (0, _index.default)(dirtyDateLeft, dirtyDateRight) / 3;
    return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
  }

  module.exports = exports.default;
});
var differenceInQuarters = /*@__PURE__*/getDefaultExportFromCjs(differenceInQuarters_1);

var getTimezoneOffsetInMilliseconds_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getTimezoneOffsetInMilliseconds;
  var MILLISECONDS_IN_MINUTE = 60000;

  function getDateMillisecondsPart(date) {
    return date.getTime() % MILLISECONDS_IN_MINUTE;
  }
  /**
   * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
   * They usually appear for dates that denote time before the timezones were introduced
   * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
   * and GMT+01:00:00 after that date)
   *
   * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
   * which would lead to incorrect calculations.
   *
   * This function returns the timezone offset in milliseconds that takes seconds in account.
   */


  function getTimezoneOffsetInMilliseconds(dirtyDate) {
    var date = new Date(dirtyDate.getTime());
    var baseTimezoneOffset = Math.ceil(date.getTimezoneOffset());
    date.setSeconds(0, 0);
    var hasNegativeUTCOffset = baseTimezoneOffset > 0;
    var millisecondsPartOfTimezoneOffset = hasNegativeUTCOffset ? (MILLISECONDS_IN_MINUTE + getDateMillisecondsPart(date)) % MILLISECONDS_IN_MINUTE : getDateMillisecondsPart(date);
    return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset;
  }

  module.exports = exports.default;
});

var startOfDay_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfDay;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name startOfDay
   * @category Day Helpers
   * @summary Return the start of a day for the given date.
   *
   * @description
   * Return the start of a day for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @returns {Date} the start of a day
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // The start of a day for 2 September 2014 11:55:00:
   * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Tue Sep 02 2014 00:00:00
   */


  function startOfDay(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  module.exports = exports.default;
});
var startOfDay = /*@__PURE__*/getDefaultExportFromCjs(startOfDay_1);

var differenceInCalendarDays_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = differenceInCalendarDays;

  var _index = _interopRequireDefault(getTimezoneOffsetInMilliseconds_1);

  var _index2 = _interopRequireDefault(startOfDay_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MILLISECONDS_IN_DAY = 86400000;
  /**
   * @name differenceInCalendarDays
   * @category Day Helpers
   * @summary Get the number of calendar days between the given dates.
   *
   * @description
   * Get the number of calendar days between the given dates. This means that the times are removed
   * from the dates and then the difference in days is calculated.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of calendar days
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many calendar days are between
   * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
   * var result = differenceInCalendarDays(
   *   new Date(2012, 6, 2, 0, 0),
   *   new Date(2011, 6, 2, 23, 0)
   * )
   * //=> 366
   * // How many calendar days are between
   * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
   * var result = differenceInCalendarDays(
   *   new Date(2011, 6, 3, 0, 1),
   *   new Date(2011, 6, 2, 23, 59)
   * )
   * //=> 1
   */

  function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
    (0, _index3.default)(2, arguments);
    var startOfDayLeft = (0, _index2.default)(dirtyDateLeft);
    var startOfDayRight = (0, _index2.default)(dirtyDateRight);
    var timestampLeft = startOfDayLeft.getTime() - (0, _index.default)(startOfDayLeft);
    var timestampRight = startOfDayRight.getTime() - (0, _index.default)(startOfDayRight); // Round the number of days to the nearest integer
    // because the number of milliseconds in a day is not constant
    // (e.g. it's different in the day of the daylight saving time clock shift)

    return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
  }

  module.exports = exports.default;
});

var differenceInDays_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = differenceInDays;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(differenceInCalendarDays_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // Like `compareAsc` but uses local time not UTC, which is needed
  // for accurate equality comparisons of UTC timestamps that end up
  // having the same representation in local time, e.g. one hour before
  // DST ends vs. the instant that DST ends.


  function compareLocalAsc(dateLeft, dateRight) {
    var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();

    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1; // Return 0 if diff is 0; return NaN if diff is NaN
    } else {
      return diff;
    }
  }
  /**
   * @name differenceInDays
   * @category Day Helpers
   * @summary Get the number of full days between the given dates.
   *
   * @description
   * Get the number of full day periods between two dates. Fractional days are
   * truncated towards zero.
   *
   * One "full day" is the distance between a local time in one day to the same
   * local time on the next or previous day. A full day can sometimes be less than
   * or more than 24 hours if a daylight savings change happens between two dates.
   *
   * To ignore DST and only measure exact 24-hour periods, use this instead:
   * `Math.floor(differenceInHours(dateLeft, dateRight)/24)|0`.
   *
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of full days according to the local timezone
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many full days are between
   * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
   * var result = differenceInDays(
   *   new Date(2012, 6, 2, 0, 0),
   *   new Date(2011, 6, 2, 23, 0)
   * )
   * //=> 365
   * // How many full days are between
   * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
   * var result = differenceInDays(
   *   new Date(2011, 6, 3, 0, 1),
   *   new Date(2011, 6, 2, 23, 59)
   * )
   * //=> 0
   * // How many full days are between
   * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
   * // Note: because local time is used, the
   * // result will always be 92 days, even in
   * // time zones where DST starts and the
   * // period has only 92*24-1 hours.
   * var result = differenceInDays(
   *   new Date(2020, 5, 1),
   *   new Date(2020, 2, 1)
   * )
  //=> 92
   */


  function differenceInDays(dirtyDateLeft, dirtyDateRight) {
    (0, _index3.default)(2, arguments);
    var dateLeft = (0, _index.default)(dirtyDateLeft);
    var dateRight = (0, _index.default)(dirtyDateRight);
    var sign = compareLocalAsc(dateLeft, dateRight);
    var difference = Math.abs((0, _index2.default)(dateLeft, dateRight));
    dateLeft.setDate(dateLeft.getDate() - sign * difference); // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
    // If so, result must be decreased by 1 in absolute value

    var isLastDayNotFull = compareLocalAsc(dateLeft, dateRight) === -sign;
    var result = sign * (difference - isLastDayNotFull); // Prevent negative zero

    return result === 0 ? 0 : result;
  }

  module.exports = exports.default;
});
var differenceInDays = /*@__PURE__*/getDefaultExportFromCjs(differenceInDays_1);

var differenceInWeeks_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = differenceInWeeks;

  var _index = _interopRequireDefault(differenceInDays_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name differenceInWeeks
   * @category Week Helpers
   * @summary Get the number of full weeks between the given dates.
   *
   * @description
   * Get the number of full weeks between two dates. Fractional weeks are
   * truncated towards zero.
   *
   * One "full week" is the distance between a local time in one day to the same
   * local time 7 days earlier or later. A full week can sometimes be less than
   * or more than 7*24 hours if a daylight savings change happens between two dates.
   *
   * To ignore DST and only measure exact 7*24-hour periods, use this instead:
   * `Math.floor(differenceInHours(dateLeft, dateRight)/(7*24))|0`.
   *
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of full weeks
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many full weeks are between 5 July 2014 and 20 July 2014?
   * var result = differenceInWeeks(new Date(2014, 6, 20), new Date(2014, 6, 5))
   * //=> 2
   *
   * // How many full weeks are between
   * // 1 March 2020 0:00 and 6 June 2020 0:00 ?
   * // Note: because local time is used, the
   * // result will always be 8 weeks (54 days),
   * // even if DST starts and the period has
   * // only 54*24-1 hours.
   * var result = differenceInWeeks(
   *   new Date(2020, 5, 1),
   *   new Date(2020, 2, 6)
   * )
   * //=> 8
   */


  function differenceInWeeks(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var diff = (0, _index.default)(dirtyDateLeft, dirtyDateRight) / 7;
    return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
  }

  module.exports = exports.default;
});
var differenceInWeeks = /*@__PURE__*/getDefaultExportFromCjs(differenceInWeeks_1);

var differenceInMilliseconds_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = differenceInMilliseconds;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name differenceInMilliseconds
   * @category Millisecond Helpers
   * @summary Get the number of milliseconds between the given dates.
   *
   * @description
   * Get the number of milliseconds between the given dates.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of milliseconds
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many milliseconds are between
   * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
   * var result = differenceInMilliseconds(
   *   new Date(2014, 6, 2, 12, 30, 21, 700),
   *   new Date(2014, 6, 2, 12, 30, 20, 600)
   * )
   * //=> 1100
   */


  function differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var dateLeft = (0, _index.default)(dirtyDateLeft);
    var dateRight = (0, _index.default)(dirtyDateRight);
    return dateLeft.getTime() - dateRight.getTime();
  }

  module.exports = exports.default;
});
var differenceInMilliseconds = /*@__PURE__*/getDefaultExportFromCjs(differenceInMilliseconds_1);

var differenceInHours_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = differenceInHours;

  var _index = _interopRequireDefault(differenceInMilliseconds_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MILLISECONDS_IN_HOUR = 3600000;
  /**
   * @name differenceInHours
   * @category Hour Helpers
   * @summary Get the number of hours between the given dates.
   *
   * @description
   * Get the number of hours between the given dates.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of hours
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
   * var result = differenceInHours(
   *   new Date(2014, 6, 2, 19, 0),
   *   new Date(2014, 6, 2, 6, 50)
   * )
   * //=> 12
   */

  function differenceInHours(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var diff = (0, _index.default)(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_HOUR;
    return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
  }

  module.exports = exports.default;
});
var differenceInHours = /*@__PURE__*/getDefaultExportFromCjs(differenceInHours_1);

var differenceInMinutes_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = differenceInMinutes;

  var _index = _interopRequireDefault(differenceInMilliseconds_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MILLISECONDS_IN_MINUTE = 60000;
  /**
   * @name differenceInMinutes
   * @category Minute Helpers
   * @summary Get the number of minutes between the given dates.
   *
   * @description
   * Get the signed number of full (rounded towards 0) minutes between the given dates.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of minutes
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
   * var result = differenceInMinutes(
   *   new Date(2014, 6, 2, 12, 20, 0),
   *   new Date(2014, 6, 2, 12, 7, 59)
   * )
   * //=> 12
   *
   * @example
   * // How many minutes are from 10:01:59 to 10:00:00
   * var result = differenceInMinutes(
   *   new Date(2000, 0, 1, 10, 0, 0),
   *   new Date(2000, 0, 1, 10, 1, 59)
   * )
   * //=> -1
   */

  function differenceInMinutes(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var diff = (0, _index.default)(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_MINUTE;
    return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
  }

  module.exports = exports.default;
});
var differenceInMinutes = /*@__PURE__*/getDefaultExportFromCjs(differenceInMinutes_1);

var differenceInSeconds_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = differenceInSeconds;

  var _index = _interopRequireDefault(differenceInMilliseconds_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name differenceInSeconds
   * @category Second Helpers
   * @summary Get the number of seconds between the given dates.
   *
   * @description
   * Get the number of seconds between the given dates.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the later date
   * @param {Date|Number} dateRight - the earlier date
   * @returns {Number} the number of seconds
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // How many seconds are between
   * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
   * var result = differenceInSeconds(
   *   new Date(2014, 6, 2, 12, 30, 20, 0),
   *   new Date(2014, 6, 2, 12, 30, 7, 999)
   * )
   * //=> 12
   */


  function differenceInSeconds(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var diff = (0, _index.default)(dirtyDateLeft, dirtyDateRight) / 1000;
    return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
  }

  module.exports = exports.default;
});
var differenceInSeconds = /*@__PURE__*/getDefaultExportFromCjs(differenceInSeconds_1);

var eachDayOfInterval_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = eachDayOfInterval;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name eachDayOfInterval
   * @category Interval Helpers
   * @summary Return the array of dates within the specified time interval.
   *
   * @description
   * Return the array of dates within the specified time interval.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * - The function was renamed from `eachDay` to `eachDayOfInterval`.
   *   This change was made to mirror the use of the word "interval" in standard ISO 8601:2004 terminology:
   *
   *   ```
   *   2.1.3
   *   time interval
   *   part of the time axis limited by two instants
   *   ```
   *
   *   Also, this function now accepts an object with `start` and `end` properties
   *   instead of two arguments as an interval.
   *   This function now throws `RangeError` if the start of the interval is after its end
   *   or if any date in the interval is `Invalid Date`.
   *
   *   ```javascript
   *   // Before v2.0.0
   *
   *   eachDay(new Date(2014, 0, 10), new Date(2014, 0, 20))
   *
   *   // v2.0.0 onward
   *
   *   eachDayOfInterval(
   *     { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
   *   )
   *   ```
   *
   * @param {Interval} interval - the interval. See [Interval]{@link docs/types/Interval}
   * @param {Object} [options] - an object with options.
   * @param {Number} [options.step=1] - the step to increment by. The value should be more than 1.
   * @returns {Date[]} the array with starts of days from the day of the interval start to the day of the interval end
   * @throws {TypeError} 1 argument required
   * @throws {RangeError} `options.step` must be a number greater than 1
   * @throws {RangeError} The start of an interval cannot be after its end
   * @throws {RangeError} Date in interval cannot be `Invalid Date`
   *
   * @example
   * // Each day between 6 October 2014 and 10 October 2014:
   * const result = eachDayOfInterval({
   *   start: new Date(2014, 9, 6),
   *   end: new Date(2014, 9, 10)
   * })
   * //=> [
   * //   Mon Oct 06 2014 00:00:00,
   * //   Tue Oct 07 2014 00:00:00,
   * //   Wed Oct 08 2014 00:00:00,
   * //   Thu Oct 09 2014 00:00:00,
   * //   Fri Oct 10 2014 00:00:00
   * // ]
   */


  function eachDayOfInterval(dirtyInterval, options) {
    (0, _index2.default)(1, arguments);
    var interval = dirtyInterval || {};
    var startDate = (0, _index.default)(interval.start);
    var endDate = (0, _index.default)(interval.end);
    var endTime = endDate.getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

    if (!(startDate.getTime() <= endTime)) {
      throw new RangeError('Invalid interval');
    }

    var dates = [];
    var currentDate = startDate;
    currentDate.setHours(0, 0, 0, 0);
    var step = options && 'step' in options ? Number(options.step) : 1;
    if (step < 1 || isNaN(step)) throw new RangeError('`options.step` must be a number greater than 1');

    while (currentDate.getTime() <= endTime) {
      dates.push((0, _index.default)(currentDate));
      currentDate.setDate(currentDate.getDate() + step);
      currentDate.setHours(0, 0, 0, 0);
    }

    return dates;
  }

  module.exports = exports.default;
});
var eachDayOfInterval = /*@__PURE__*/getDefaultExportFromCjs(eachDayOfInterval_1);

var endOfWeek_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = endOfWeek;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(toInteger_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name endOfWeek
   * @category Week Helpers
   * @summary Return the end of a week for the given date.
   *
   * @description
   * Return the end of a week for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @param {Object} [options] - an object with options.
   * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
   * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
   * @returns {Date} the end of a week
   * @throws {TypeError} 1 argument required
   * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
   *
   * @example
   * // The end of a week for 2 September 2014 11:55:00:
   * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Sat Sep 06 2014 23:59:59.999
   *
   * @example
   * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
   * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
   * //=> Sun Sep 07 2014 23:59:59.999
   */


  function endOfWeek(dirtyDate, dirtyOptions) {
    (0, _index3.default)(1, arguments);
    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index2.default)(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index2.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }

    var date = (0, _index.default)(dirtyDate);
    var day = date.getDay();
    var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
    date.setDate(date.getDate() + diff);
    date.setHours(23, 59, 59, 999);
    return date;
  }

  module.exports = exports.default;
});
var endOfWeek = /*@__PURE__*/getDefaultExportFromCjs(endOfWeek_1);

var endOfYear_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = endOfYear;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name endOfYear
   * @category Year Helpers
   * @summary Return the end of a year for the given date.
   *
   * @description
   * Return the end of a year for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @returns {Date} the end of a year
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // The end of a year for 2 September 2014 11:55:00:
   * var result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
   * //=> Wed Dec 31 2014 23:59:59.999
   */


  function endOfYear(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var year = date.getFullYear();
    date.setFullYear(year + 1, 0, 0);
    date.setHours(23, 59, 59, 999);
    return date;
  }

  module.exports = exports.default;
});
var endOfYear = /*@__PURE__*/getDefaultExportFromCjs(endOfYear_1);

var isValid_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isValid;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name isValid
   * @category Common Helpers
   * @summary Is the given date valid?
   *
   * @description
   * Returns false if argument is Invalid Date and true otherwise.
   * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
   * Invalid Date is a Date, whose time value is NaN.
   *
   * Time value of Date: http://es5.github.io/#x15.9.1.1
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * - Now `isValid` doesn't throw an exception
   *   if the first argument is not an instance of Date.
   *   Instead, argument is converted beforehand using `toDate`.
   *
   *   Examples:
   *
   *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |
   *   |---------------------------|---------------|---------------|
   *   | `new Date()`              | `true`        | `true`        |
   *   | `new Date('2016-01-01')`  | `true`        | `true`        |
   *   | `new Date('')`            | `false`       | `false`       |
   *   | `new Date(1488370835081)` | `true`        | `true`        |
   *   | `new Date(NaN)`           | `false`       | `false`       |
   *   | `'2016-01-01'`            | `TypeError`   | `false`       |
   *   | `''`                      | `TypeError`   | `false`       |
   *   | `1488370835081`           | `TypeError`   | `true`        |
   *   | `NaN`                     | `TypeError`   | `false`       |
   *
   *   We introduce this change to make *date-fns* consistent with ECMAScript behavior
   *   that try to coerce arguments to the expected type
   *   (which is also the case with other *date-fns* functions).
   *
   * @param {*} date - the date to check
   * @returns {Boolean} the date is valid
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // For the valid date:
   * var result = isValid(new Date(2014, 1, 31))
   * //=> true
   *
   * @example
   * // For the value, convertable into a date:
   * var result = isValid(1393804800000)
   * //=> true
   *
   * @example
   * // For the invalid date:
   * var result = isValid(new Date(''))
   * //=> false
   */


  function isValid(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    return !isNaN(date);
  }

  module.exports = exports.default;
});
var isValid = /*@__PURE__*/getDefaultExportFromCjs(isValid_1);

var formatDistance_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = formatDistance;
  var formatDistanceLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },
    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },
    halfAMinute: 'half a minute',
    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },
    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },
    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },
    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },
    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },
    aboutXWeeks: {
      one: 'about 1 week',
      other: 'about {{count}} weeks'
    },
    xWeeks: {
      one: '1 week',
      other: '{{count}} weeks'
    },
    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },
    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },
    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },
    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },
    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },
    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  };

  function formatDistance(token, count, options) {
    options = options || {};
    var result;

    if (typeof formatDistanceLocale[token] === 'string') {
      result = formatDistanceLocale[token];
    } else if (count === 1) {
      result = formatDistanceLocale[token].one;
    } else {
      result = formatDistanceLocale[token].other.replace('{{count}}', count);
    }

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result;
      } else {
        return result + ' ago';
      }
    }

    return result;
  }

  module.exports = exports.default;
});

var buildFormatLongFn_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildFormatLongFn;

  function buildFormatLongFn(args) {
    return function (dirtyOptions) {
      var options = dirtyOptions || {};
      var width = options.width ? String(options.width) : args.defaultWidth;
      var format = args.formats[width] || args.formats[args.defaultWidth];
      return format;
    };
  }

  module.exports = exports.default;
});

var formatLong_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _index = _interopRequireDefault(buildFormatLongFn_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var dateFormats = {
    full: 'EEEE, MMMM do, y',
    long: 'MMMM do, y',
    medium: 'MMM d, y',
    short: 'MM/dd/yyyy'
  };
  var timeFormats = {
    full: 'h:mm:ss a zzzz',
    long: 'h:mm:ss a z',
    medium: 'h:mm:ss a',
    short: 'h:mm a'
  };
  var dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: '{{date}}, {{time}}',
    short: '{{date}}, {{time}}'
  };
  var formatLong = {
    date: (0, _index.default)({
      formats: dateFormats,
      defaultWidth: 'full'
    }),
    time: (0, _index.default)({
      formats: timeFormats,
      defaultWidth: 'full'
    }),
    dateTime: (0, _index.default)({
      formats: dateTimeFormats,
      defaultWidth: 'full'
    })
  };
  var _default = formatLong;
  exports.default = _default;
  module.exports = exports.default;
});

var formatRelative_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = formatRelative;
  var formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: 'P'
  };

  function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
  }

  module.exports = exports.default;
});

var buildLocalizeFn_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildLocalizeFn;

  function buildLocalizeFn(args) {
    return function (dirtyIndex, dirtyOptions) {
      var options = dirtyOptions || {};
      var context = options.context ? String(options.context) : 'standalone';
      var valuesArray;

      if (context === 'formatting' && args.formattingValues) {
        var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        var width = options.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        var _defaultWidth = args.defaultWidth;

        var _width = options.width ? String(options.width) : args.defaultWidth;

        valuesArray = args.values[_width] || args.values[_defaultWidth];
      }

      var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
      return valuesArray[index];
    };
  }

  module.exports = exports.default;
});

var localize_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _index = _interopRequireDefault(buildLocalizeFn_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var eraValues = {
    narrow: ['B', 'A'],
    abbreviated: ['BC', 'AD'],
    wide: ['Before Christ', 'Anno Domini']
  };
  var quarterValues = {
    narrow: ['1', '2', '3', '4'],
    abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
    wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'] // Note: in English, the names of days of the week and months are capitalized.
    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
    // Generally, formatted dates should look like they are in the middle of a sentence,
    // e.g. in Spanish language the weekdays and months should be in the lowercase.

  };
  var monthValues = {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };
  var dayValues = {
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  };
  var dayPeriodValues = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'morning',
      afternoon: 'afternoon',
      evening: 'evening',
      night: 'night'
    }
  };
  var formattingDayPeriodValues = {
    narrow: {
      am: 'a',
      pm: 'p',
      midnight: 'mi',
      noon: 'n',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    },
    abbreviated: {
      am: 'AM',
      pm: 'PM',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    },
    wide: {
      am: 'a.m.',
      pm: 'p.m.',
      midnight: 'midnight',
      noon: 'noon',
      morning: 'in the morning',
      afternoon: 'in the afternoon',
      evening: 'in the evening',
      night: 'at night'
    }
  };

  function ordinalNumber(dirtyNumber, _dirtyOptions) {
    var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
    // if they are different for different grammatical genders,
    // use `options.unit`:
    //
    //   var options = dirtyOptions || {}
    //   var unit = String(options.unit)
    //
    // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
    // 'day', 'hour', 'minute', 'second'

    var rem100 = number % 100;

    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + 'st';

        case 2:
          return number + 'nd';

        case 3:
          return number + 'rd';
      }
    }

    return number + 'th';
  }

  var localize = {
    ordinalNumber: ordinalNumber,
    era: (0, _index.default)({
      values: eraValues,
      defaultWidth: 'wide'
    }),
    quarter: (0, _index.default)({
      values: quarterValues,
      defaultWidth: 'wide',
      argumentCallback: function (quarter) {
        return Number(quarter) - 1;
      }
    }),
    month: (0, _index.default)({
      values: monthValues,
      defaultWidth: 'wide'
    }),
    day: (0, _index.default)({
      values: dayValues,
      defaultWidth: 'wide'
    }),
    dayPeriod: (0, _index.default)({
      values: dayPeriodValues,
      defaultWidth: 'wide',
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: 'wide'
    })
  };
  var _default = localize;
  exports.default = _default;
  module.exports = exports.default;
});

var buildMatchPatternFn_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildMatchPatternFn;

  function buildMatchPatternFn(args) {
    return function (dirtyString, dirtyOptions) {
      var string = String(dirtyString);
      var options = dirtyOptions || {};
      var matchResult = string.match(args.matchPattern);

      if (!matchResult) {
        return null;
      }

      var matchedString = matchResult[0];
      var parseResult = string.match(args.parsePattern);

      if (!parseResult) {
        return null;
      }

      var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      return {
        value: value,
        rest: string.slice(matchedString.length)
      };
    };
  }

  module.exports = exports.default;
});

var buildMatchFn_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildMatchFn;

  function buildMatchFn(args) {
    return function (dirtyString, dirtyOptions) {
      var string = String(dirtyString);
      var options = dirtyOptions || {};
      var width = options.width;
      var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      var matchResult = string.match(matchPattern);

      if (!matchResult) {
        return null;
      }

      var matchedString = matchResult[0];
      var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      var value;

      if (Object.prototype.toString.call(parsePatterns) === '[object Array]') {
        value = findIndex(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        });
      } else {
        value = findKey(parsePatterns, function (pattern) {
          return pattern.test(matchedString);
        });
      }

      value = args.valueCallback ? args.valueCallback(value) : value;
      value = options.valueCallback ? options.valueCallback(value) : value;
      return {
        value: value,
        rest: string.slice(matchedString.length)
      };
    };
  }

  function findKey(object, predicate) {
    for (var key in object) {
      if (object.hasOwnProperty(key) && predicate(object[key])) {
        return key;
      }
    }
  }

  function findIndex(array, predicate) {
    for (var key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
  }

  module.exports = exports.default;
});

var match_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _index = _interopRequireDefault(buildMatchPatternFn_1);

  var _index2 = _interopRequireDefault(buildMatchFn_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  var parseOrdinalNumberPattern = /\d+/i;
  var matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  var parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };
  var matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  var parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  var matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  var parseMonthPatterns = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  };
  var matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  var parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  var matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  var parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  var match = {
    ordinalNumber: (0, _index.default)({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: function (value) {
        return parseInt(value, 10);
      }
    }),
    era: (0, _index2.default)({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseEraPatterns,
      defaultParseWidth: 'any'
    }),
    quarter: (0, _index2.default)({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: 'any',
      valueCallback: function (index) {
        return index + 1;
      }
    }),
    month: (0, _index2.default)({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: 'any'
    }),
    day: (0, _index2.default)({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parseDayPatterns,
      defaultParseWidth: 'any'
    }),
    dayPeriod: (0, _index2.default)({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: 'any',
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: 'any'
    })
  };
  var _default = match;
  exports.default = _default;
  module.exports = exports.default;
});

var enUS = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _index = _interopRequireDefault(formatDistance_1);

  var _index2 = _interopRequireDefault(formatLong_1);

  var _index3 = _interopRequireDefault(formatRelative_1);

  var _index4 = _interopRequireDefault(localize_1);

  var _index5 = _interopRequireDefault(match_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @type {Locale}
   * @category Locales
   * @summary English locale (United States).
   * @language English
   * @iso-639-2 eng
   * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
   * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
   */


  var locale = {
    code: 'en-US',
    formatDistance: _index.default,
    formatLong: _index2.default,
    formatRelative: _index3.default,
    localize: _index4.default,
    match: _index5.default,
    options: {
      weekStartsOn: 0
      /* Sunday */
      ,
      firstWeekContainsDate: 1
    }
  };
  var _default = locale;
  exports.default = _default;
  module.exports = exports.default;
});
var defaultLocale = /*@__PURE__*/getDefaultExportFromCjs(enUS);

var subMilliseconds_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = subMilliseconds;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(addMilliseconds_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name subMilliseconds
   * @category Millisecond Helpers
   * @summary Subtract the specified number of milliseconds from the given date.
   *
   * @description
   * Subtract the specified number of milliseconds from the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
   * @returns {Date} the new date with the milliseconds subtracted
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
   * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
   * //=> Thu Jul 10 2014 12:45:29.250
   */


  function subMilliseconds(dirtyDate, dirtyAmount) {
    (0, _index3.default)(2, arguments);
    var amount = (0, _index.default)(dirtyAmount);
    return (0, _index2.default)(dirtyDate, -amount);
  }

  module.exports = exports.default;
});

var addLeadingZeros_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addLeadingZeros;

  function addLeadingZeros(number, targetLength) {
    var sign = number < 0 ? '-' : '';
    var output = Math.abs(number).toString();

    while (output.length < targetLength) {
      output = '0' + output;
    }

    return sign + output;
  }

  module.exports = exports.default;
});

var lightFormatters = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _index = _interopRequireDefault(addLeadingZeros_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /*
   * |     | Unit                           |     | Unit                           |
   * |-----|--------------------------------|-----|--------------------------------|
   * |  a  | AM, PM                         |  A* |                                |
   * |  d  | Day of month                   |  D  |                                |
   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
   * |  m  | Minute                         |  M  | Month                          |
   * |  s  | Second                         |  S  | Fraction of second             |
   * |  y  | Year (abs)                     |  Y  |                                |
   *
   * Letters marked by * are not implemented but reserved by Unicode standard.
   */


  var formatters = {
    // Year
    y: function (date, token) {
      // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
      // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
      // |----------|-------|----|-------|-------|-------|
      // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
      // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
      // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
      // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
      // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
      var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return (0, _index.default)(token === 'yy' ? year % 100 : year, token.length);
    },
    // Month
    M: function (date, token) {
      var month = date.getUTCMonth();
      return token === 'M' ? String(month + 1) : (0, _index.default)(month + 1, 2);
    },
    // Day of the month
    d: function (date, token) {
      return (0, _index.default)(date.getUTCDate(), token.length);
    },
    // AM or PM
    a: function (date, token) {
      var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';

      switch (token) {
        case 'a':
        case 'aa':
          return dayPeriodEnumValue.toUpperCase();

        case 'aaa':
          return dayPeriodEnumValue;

        case 'aaaaa':
          return dayPeriodEnumValue[0];

        case 'aaaa':
        default:
          return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
      }
    },
    // Hour [1-12]
    h: function (date, token) {
      return (0, _index.default)(date.getUTCHours() % 12 || 12, token.length);
    },
    // Hour [0-23]
    H: function (date, token) {
      return (0, _index.default)(date.getUTCHours(), token.length);
    },
    // Minute
    m: function (date, token) {
      return (0, _index.default)(date.getUTCMinutes(), token.length);
    },
    // Second
    s: function (date, token) {
      return (0, _index.default)(date.getUTCSeconds(), token.length);
    },
    // Fraction of second
    S: function (date, token) {
      var numberOfDigits = token.length;
      var milliseconds = date.getUTCMilliseconds();
      var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
      return (0, _index.default)(fractionalSeconds, token.length);
    }
  };
  var _default = formatters;
  exports.default = _default;
  module.exports = exports.default;
});

var getUTCDayOfYear_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getUTCDayOfYear;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MILLISECONDS_IN_DAY = 86400000; // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376

  function getUTCDayOfYear(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var timestamp = date.getTime();
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
    var startOfYearTimestamp = date.getTime();
    var difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
  }

  module.exports = exports.default;
});

var startOfUTCISOWeek_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfUTCISOWeek;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376


  function startOfUTCISOWeek(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var weekStartsOn = 1;
    var date = (0, _index.default)(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  module.exports = exports.default;
});

var getUTCISOWeekYear_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getUTCISOWeekYear;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(startOfUTCISOWeek_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376


  function getUTCISOWeekYear(dirtyDate) {
    (0, _index3.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var year = date.getUTCFullYear();
    var fourthOfJanuaryOfNextYear = new Date(0);
    fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = (0, _index2.default)(fourthOfJanuaryOfNextYear);
    var fourthOfJanuaryOfThisYear = new Date(0);
    fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = (0, _index2.default)(fourthOfJanuaryOfThisYear);

    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }

  module.exports = exports.default;
});

var startOfUTCISOWeekYear_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfUTCISOWeekYear;

  var _index = _interopRequireDefault(getUTCISOWeekYear_1);

  var _index2 = _interopRequireDefault(startOfUTCISOWeek_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376


  function startOfUTCISOWeekYear(dirtyDate) {
    (0, _index3.default)(1, arguments);
    var year = (0, _index.default)(dirtyDate);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(year, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    var date = (0, _index2.default)(fourthOfJanuary);
    return date;
  }

  module.exports = exports.default;
});

var getUTCISOWeek_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getUTCISOWeek;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(startOfUTCISOWeek_1);

  var _index3 = _interopRequireDefault(startOfUTCISOWeekYear_1);

  var _index4 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376

  function getUTCISOWeek(dirtyDate) {
    (0, _index4.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var diff = (0, _index2.default)(date).getTime() - (0, _index3.default)(date).getTime(); // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)

    return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
  }

  module.exports = exports.default;
});

var startOfUTCWeek_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfUTCWeek;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376


  function startOfUTCWeek(dirtyDate, dirtyOptions) {
    (0, _index3.default)(1, arguments);
    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index.default)(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }

    var date = (0, _index2.default)(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  module.exports = exports.default;
});

var getUTCWeekYear_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getUTCWeekYear;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(startOfUTCWeek_1);

  var _index4 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376


  function getUTCWeekYear(dirtyDate, dirtyOptions) {
    (0, _index4.default)(1, arguments);
    var date = (0, _index2.default)(dirtyDate, dirtyOptions);
    var year = date.getUTCFullYear();
    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index.default)(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index.default)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
    }

    var firstWeekOfNextYear = new Date(0);
    firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = (0, _index3.default)(firstWeekOfNextYear, dirtyOptions);
    var firstWeekOfThisYear = new Date(0);
    firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = (0, _index3.default)(firstWeekOfThisYear, dirtyOptions);

    if (date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }

  module.exports = exports.default;
});

var startOfUTCWeekYear_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfUTCWeekYear;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(getUTCWeekYear_1);

  var _index3 = _interopRequireDefault(startOfUTCWeek_1);

  var _index4 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376


  function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
    (0, _index4.default)(1, arguments);
    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index.default)(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index.default)(options.firstWeekContainsDate);
    var year = (0, _index2.default)(dirtyDate, dirtyOptions);
    var firstWeek = new Date(0);
    firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setUTCHours(0, 0, 0, 0);
    var date = (0, _index3.default)(firstWeek, dirtyOptions);
    return date;
  }

  module.exports = exports.default;
});

var getUTCWeek_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getUTCWeek;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(startOfUTCWeek_1);

  var _index3 = _interopRequireDefault(startOfUTCWeekYear_1);

  var _index4 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376

  function getUTCWeek(dirtyDate, options) {
    (0, _index4.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var diff = (0, _index2.default)(date, options).getTime() - (0, _index3.default)(date, options).getTime(); // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)

    return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
  }

  module.exports = exports.default;
});

var formatters_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _index = _interopRequireDefault(lightFormatters);

  var _index2 = _interopRequireDefault(getUTCDayOfYear_1);

  var _index3 = _interopRequireDefault(getUTCISOWeek_1);

  var _index4 = _interopRequireDefault(getUTCISOWeekYear_1);

  var _index5 = _interopRequireDefault(getUTCWeek_1);

  var _index6 = _interopRequireDefault(getUTCWeekYear_1);

  var _index7 = _interopRequireDefault(addLeadingZeros_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var dayPeriodEnum = {
    am: 'am',
    pm: 'pm',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* | Milliseconds in day            |
     * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
     * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
     * |  d  | Day of month                   |  D  | Day of year                    |
     * |  e  | Local day of week              |  E  | Day of week                    |
     * |  f  |                                |  F* | Day of week in month           |
     * |  g* | Modified Julian day            |  G  | Era                            |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  i! | ISO day of week                |  I! | ISO week of year               |
     * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
     * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
     * |  l* | (deprecated)                   |  L  | Stand-alone month              |
     * |  m  | Minute                         |  M  | Month                          |
     * |  n  |                                |  N  |                                |
     * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
     * |  p! | Long localized time            |  P! | Long localized date            |
     * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
     * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
     * |  u  | Extended year                  |  U* | Cyclic year                    |
     * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
     * |  w  | Local week of year             |  W* | Week of month                  |
     * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
     * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
     * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     *
     * Letters marked by ! are non-standard, but implemented by date-fns:
     * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
     * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
     *   i.e. 7 for Sunday, 1 for Monday, etc.
     * - `I` is ISO week of year, as opposed to `w` which is local week of year.
     * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
     *   `R` is supposed to be used in conjunction with `I` and `i`
     *   for universal ISO week-numbering date, whereas
     *   `Y` is supposed to be used in conjunction with `w` and `e`
     *   for week-numbering date specific to the locale.
     * - `P` is long localized date format
     * - `p` is long localized time format
     */

  };
  var formatters = {
    // Era
    G: function (date, token, localize) {
      var era = date.getUTCFullYear() > 0 ? 1 : 0;

      switch (token) {
        // AD, BC
        case 'G':
        case 'GG':
        case 'GGG':
          return localize.era(era, {
            width: 'abbreviated'
          });
        // A, B

        case 'GGGGG':
          return localize.era(era, {
            width: 'narrow'
          });
        // Anno Domini, Before Christ

        case 'GGGG':
        default:
          return localize.era(era, {
            width: 'wide'
          });
      }
    },
    // Year
    y: function (date, token, localize) {
      // Ordinal number
      if (token === 'yo') {
        var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return localize.ordinalNumber(year, {
          unit: 'year'
        });
      }

      return _index.default.y(date, token);
    },
    // Local week-numbering year
    Y: function (date, token, localize, options) {
      var signedWeekYear = (0, _index6.default)(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)

      var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year

      if (token === 'YY') {
        var twoDigitYear = weekYear % 100;
        return (0, _index7.default)(twoDigitYear, 2);
      } // Ordinal number


      if (token === 'Yo') {
        return localize.ordinalNumber(weekYear, {
          unit: 'year'
        });
      } // Padding


      return (0, _index7.default)(weekYear, token.length);
    },
    // ISO week-numbering year
    R: function (date, token) {
      var isoWeekYear = (0, _index4.default)(date); // Padding

      return (0, _index7.default)(isoWeekYear, token.length);
    },
    // Extended year. This is a single number designating the year of this calendar system.
    // The main difference between `y` and `u` localizers are B.C. years:
    // | Year | `y` | `u` |
    // |------|-----|-----|
    // | AC 1 |   1 |   1 |
    // | BC 1 |   1 |   0 |
    // | BC 2 |   2 |  -1 |
    // Also `yy` always returns the last two digits of a year,
    // while `uu` pads single digit years to 2 characters and returns other years unchanged.
    u: function (date, token) {
      var year = date.getUTCFullYear();
      return (0, _index7.default)(year, token.length);
    },
    // Quarter
    Q: function (date, token, localize) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

      switch (token) {
        // 1, 2, 3, 4
        case 'Q':
          return String(quarter);
        // 01, 02, 03, 04

        case 'QQ':
          return (0, _index7.default)(quarter, 2);
        // 1st, 2nd, 3rd, 4th

        case 'Qo':
          return localize.ordinalNumber(quarter, {
            unit: 'quarter'
          });
        // Q1, Q2, Q3, Q4

        case 'QQQ':
          return localize.quarter(quarter, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)

        case 'QQQQQ':
          return localize.quarter(quarter, {
            width: 'narrow',
            context: 'formatting'
          });
        // 1st quarter, 2nd quarter, ...

        case 'QQQQ':
        default:
          return localize.quarter(quarter, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Stand-alone quarter
    q: function (date, token, localize) {
      var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

      switch (token) {
        // 1, 2, 3, 4
        case 'q':
          return String(quarter);
        // 01, 02, 03, 04

        case 'qq':
          return (0, _index7.default)(quarter, 2);
        // 1st, 2nd, 3rd, 4th

        case 'qo':
          return localize.ordinalNumber(quarter, {
            unit: 'quarter'
          });
        // Q1, Q2, Q3, Q4

        case 'qqq':
          return localize.quarter(quarter, {
            width: 'abbreviated',
            context: 'standalone'
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)

        case 'qqqqq':
          return localize.quarter(quarter, {
            width: 'narrow',
            context: 'standalone'
          });
        // 1st quarter, 2nd quarter, ...

        case 'qqqq':
        default:
          return localize.quarter(quarter, {
            width: 'wide',
            context: 'standalone'
          });
      }
    },
    // Month
    M: function (date, token, localize) {
      var month = date.getUTCMonth();

      switch (token) {
        case 'M':
        case 'MM':
          return _index.default.M(date, token);
        // 1st, 2nd, ..., 12th

        case 'Mo':
          return localize.ordinalNumber(month + 1, {
            unit: 'month'
          });
        // Jan, Feb, ..., Dec

        case 'MMM':
          return localize.month(month, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // J, F, ..., D

        case 'MMMMM':
          return localize.month(month, {
            width: 'narrow',
            context: 'formatting'
          });
        // January, February, ..., December

        case 'MMMM':
        default:
          return localize.month(month, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Stand-alone month
    L: function (date, token, localize) {
      var month = date.getUTCMonth();

      switch (token) {
        // 1, 2, ..., 12
        case 'L':
          return String(month + 1);
        // 01, 02, ..., 12

        case 'LL':
          return (0, _index7.default)(month + 1, 2);
        // 1st, 2nd, ..., 12th

        case 'Lo':
          return localize.ordinalNumber(month + 1, {
            unit: 'month'
          });
        // Jan, Feb, ..., Dec

        case 'LLL':
          return localize.month(month, {
            width: 'abbreviated',
            context: 'standalone'
          });
        // J, F, ..., D

        case 'LLLLL':
          return localize.month(month, {
            width: 'narrow',
            context: 'standalone'
          });
        // January, February, ..., December

        case 'LLLL':
        default:
          return localize.month(month, {
            width: 'wide',
            context: 'standalone'
          });
      }
    },
    // Local week of year
    w: function (date, token, localize, options) {
      var week = (0, _index5.default)(date, options);

      if (token === 'wo') {
        return localize.ordinalNumber(week, {
          unit: 'week'
        });
      }

      return (0, _index7.default)(week, token.length);
    },
    // ISO week of year
    I: function (date, token, localize) {
      var isoWeek = (0, _index3.default)(date);

      if (token === 'Io') {
        return localize.ordinalNumber(isoWeek, {
          unit: 'week'
        });
      }

      return (0, _index7.default)(isoWeek, token.length);
    },
    // Day of the month
    d: function (date, token, localize) {
      if (token === 'do') {
        return localize.ordinalNumber(date.getUTCDate(), {
          unit: 'date'
        });
      }

      return _index.default.d(date, token);
    },
    // Day of year
    D: function (date, token, localize) {
      var dayOfYear = (0, _index2.default)(date);

      if (token === 'Do') {
        return localize.ordinalNumber(dayOfYear, {
          unit: 'dayOfYear'
        });
      }

      return (0, _index7.default)(dayOfYear, token.length);
    },
    // Day of week
    E: function (date, token, localize) {
      var dayOfWeek = date.getUTCDay();

      switch (token) {
        // Tue
        case 'E':
        case 'EE':
        case 'EEE':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // T

        case 'EEEEE':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu

        case 'EEEEEE':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting'
          });
        // Tuesday

        case 'EEEE':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Local day of week
    e: function (date, token, localize, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

      switch (token) {
        // Numerical value (Nth day of week with current locale or weekStartsOn)
        case 'e':
          return String(localDayOfWeek);
        // Padded numerical value

        case 'ee':
          return (0, _index7.default)(localDayOfWeek, 2);
        // 1st, 2nd, ..., 7th

        case 'eo':
          return localize.ordinalNumber(localDayOfWeek, {
            unit: 'day'
          });

        case 'eee':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // T

        case 'eeeee':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu

        case 'eeeeee':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting'
          });
        // Tuesday

        case 'eeee':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Stand-alone local day of week
    c: function (date, token, localize, options) {
      var dayOfWeek = date.getUTCDay();
      var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

      switch (token) {
        // Numerical value (same as in `e`)
        case 'c':
          return String(localDayOfWeek);
        // Padded numerical value

        case 'cc':
          return (0, _index7.default)(localDayOfWeek, token.length);
        // 1st, 2nd, ..., 7th

        case 'co':
          return localize.ordinalNumber(localDayOfWeek, {
            unit: 'day'
          });

        case 'ccc':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'standalone'
          });
        // T

        case 'ccccc':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'standalone'
          });
        // Tu

        case 'cccccc':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'standalone'
          });
        // Tuesday

        case 'cccc':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'standalone'
          });
      }
    },
    // ISO day of week
    i: function (date, token, localize) {
      var dayOfWeek = date.getUTCDay();
      var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

      switch (token) {
        // 2
        case 'i':
          return String(isoDayOfWeek);
        // 02

        case 'ii':
          return (0, _index7.default)(isoDayOfWeek, token.length);
        // 2nd

        case 'io':
          return localize.ordinalNumber(isoDayOfWeek, {
            unit: 'day'
          });
        // Tue

        case 'iii':
          return localize.day(dayOfWeek, {
            width: 'abbreviated',
            context: 'formatting'
          });
        // T

        case 'iiiii':
          return localize.day(dayOfWeek, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu

        case 'iiiiii':
          return localize.day(dayOfWeek, {
            width: 'short',
            context: 'formatting'
          });
        // Tuesday

        case 'iiii':
        default:
          return localize.day(dayOfWeek, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // AM or PM
    a: function (date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';

      switch (token) {
        case 'a':
        case 'aa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          });

        case 'aaa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          }).toLowerCase();

        case 'aaaaa':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'aaaa':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // AM, PM, midnight, noon
    b: function (date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;

      if (hours === 12) {
        dayPeriodEnumValue = dayPeriodEnum.noon;
      } else if (hours === 0) {
        dayPeriodEnumValue = dayPeriodEnum.midnight;
      } else {
        dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
      }

      switch (token) {
        case 'b':
        case 'bb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          });

        case 'bbb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          }).toLowerCase();

        case 'bbbbb':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'bbbb':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // in the morning, in the afternoon, in the evening, at night
    B: function (date, token, localize) {
      var hours = date.getUTCHours();
      var dayPeriodEnumValue;

      if (hours >= 17) {
        dayPeriodEnumValue = dayPeriodEnum.evening;
      } else if (hours >= 12) {
        dayPeriodEnumValue = dayPeriodEnum.afternoon;
      } else if (hours >= 4) {
        dayPeriodEnumValue = dayPeriodEnum.morning;
      } else {
        dayPeriodEnumValue = dayPeriodEnum.night;
      }

      switch (token) {
        case 'B':
        case 'BB':
        case 'BBB':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'abbreviated',
            context: 'formatting'
          });

        case 'BBBBB':
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'BBBB':
        default:
          return localize.dayPeriod(dayPeriodEnumValue, {
            width: 'wide',
            context: 'formatting'
          });
      }
    },
    // Hour [1-12]
    h: function (date, token, localize) {
      if (token === 'ho') {
        var hours = date.getUTCHours() % 12;
        if (hours === 0) hours = 12;
        return localize.ordinalNumber(hours, {
          unit: 'hour'
        });
      }

      return _index.default.h(date, token);
    },
    // Hour [0-23]
    H: function (date, token, localize) {
      if (token === 'Ho') {
        return localize.ordinalNumber(date.getUTCHours(), {
          unit: 'hour'
        });
      }

      return _index.default.H(date, token);
    },
    // Hour [0-11]
    K: function (date, token, localize) {
      var hours = date.getUTCHours() % 12;

      if (token === 'Ko') {
        return localize.ordinalNumber(hours, {
          unit: 'hour'
        });
      }

      return (0, _index7.default)(hours, token.length);
    },
    // Hour [1-24]
    k: function (date, token, localize) {
      var hours = date.getUTCHours();
      if (hours === 0) hours = 24;

      if (token === 'ko') {
        return localize.ordinalNumber(hours, {
          unit: 'hour'
        });
      }

      return (0, _index7.default)(hours, token.length);
    },
    // Minute
    m: function (date, token, localize) {
      if (token === 'mo') {
        return localize.ordinalNumber(date.getUTCMinutes(), {
          unit: 'minute'
        });
      }

      return _index.default.m(date, token);
    },
    // Second
    s: function (date, token, localize) {
      if (token === 'so') {
        return localize.ordinalNumber(date.getUTCSeconds(), {
          unit: 'second'
        });
      }

      return _index.default.s(date, token);
    },
    // Fraction of second
    S: function (date, token) {
      return _index.default.S(date, token);
    },
    // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
    X: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();

      if (timezoneOffset === 0) {
        return 'Z';
      }

      switch (token) {
        // Hours and optional minutes
        case 'X':
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        // Hours, minutes and optional seconds without `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XX`

        case 'XXXX':
        case 'XX':
          // Hours and minutes without `:` delimiter
          return formatTimezone(timezoneOffset);
        // Hours, minutes and optional seconds with `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XXX`

        case 'XXXXX':
        case 'XXX': // Hours and minutes with `:` delimiter

        default:
          return formatTimezone(timezoneOffset, ':');
      }
    },
    // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
    x: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();

      switch (token) {
        // Hours and optional minutes
        case 'x':
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        // Hours, minutes and optional seconds without `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xx`

        case 'xxxx':
        case 'xx':
          // Hours and minutes without `:` delimiter
          return formatTimezone(timezoneOffset);
        // Hours, minutes and optional seconds with `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xxx`

        case 'xxxxx':
        case 'xxx': // Hours and minutes with `:` delimiter

        default:
          return formatTimezone(timezoneOffset, ':');
      }
    },
    // Timezone (GMT)
    O: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();

      switch (token) {
        // Short
        case 'O':
        case 'OO':
        case 'OOO':
          return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
        // Long

        case 'OOOO':
        default:
          return 'GMT' + formatTimezone(timezoneOffset, ':');
      }
    },
    // Timezone (specific non-location)
    z: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timezoneOffset = originalDate.getTimezoneOffset();

      switch (token) {
        // Short
        case 'z':
        case 'zz':
        case 'zzz':
          return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
        // Long

        case 'zzzz':
        default:
          return 'GMT' + formatTimezone(timezoneOffset, ':');
      }
    },
    // Seconds timestamp
    t: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = Math.floor(originalDate.getTime() / 1000);
      return (0, _index7.default)(timestamp, token.length);
    },
    // Milliseconds timestamp
    T: function (date, token, _localize, options) {
      var originalDate = options._originalDate || date;
      var timestamp = originalDate.getTime();
      return (0, _index7.default)(timestamp, token.length);
    }
  };

  function formatTimezoneShort(offset, dirtyDelimiter) {
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;

    if (minutes === 0) {
      return sign + String(hours);
    }

    var delimiter = dirtyDelimiter || '';
    return sign + String(hours) + delimiter + (0, _index7.default)(minutes, 2);
  }

  function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
    if (offset % 60 === 0) {
      var sign = offset > 0 ? '-' : '+';
      return sign + (0, _index7.default)(Math.abs(offset) / 60, 2);
    }

    return formatTimezone(offset, dirtyDelimiter);
  }

  function formatTimezone(offset, dirtyDelimiter) {
    var delimiter = dirtyDelimiter || '';
    var sign = offset > 0 ? '-' : '+';
    var absOffset = Math.abs(offset);
    var hours = (0, _index7.default)(Math.floor(absOffset / 60), 2);
    var minutes = (0, _index7.default)(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
  }

  var _default = formatters;
  exports.default = _default;
  module.exports = exports.default;
});

var longFormatters_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  function dateLongFormatter(pattern, formatLong) {
    switch (pattern) {
      case 'P':
        return formatLong.date({
          width: 'short'
        });

      case 'PP':
        return formatLong.date({
          width: 'medium'
        });

      case 'PPP':
        return formatLong.date({
          width: 'long'
        });

      case 'PPPP':
      default:
        return formatLong.date({
          width: 'full'
        });
    }
  }

  function timeLongFormatter(pattern, formatLong) {
    switch (pattern) {
      case 'p':
        return formatLong.time({
          width: 'short'
        });

      case 'pp':
        return formatLong.time({
          width: 'medium'
        });

      case 'ppp':
        return formatLong.time({
          width: 'long'
        });

      case 'pppp':
      default:
        return formatLong.time({
          width: 'full'
        });
    }
  }

  function dateTimeLongFormatter(pattern, formatLong) {
    var matchResult = pattern.match(/(P+)(p+)?/);
    var datePattern = matchResult[1];
    var timePattern = matchResult[2];

    if (!timePattern) {
      return dateLongFormatter(pattern, formatLong);
    }

    var dateTimeFormat;

    switch (datePattern) {
      case 'P':
        dateTimeFormat = formatLong.dateTime({
          width: 'short'
        });
        break;

      case 'PP':
        dateTimeFormat = formatLong.dateTime({
          width: 'medium'
        });
        break;

      case 'PPP':
        dateTimeFormat = formatLong.dateTime({
          width: 'long'
        });
        break;

      case 'PPPP':
      default:
        dateTimeFormat = formatLong.dateTime({
          width: 'full'
        });
        break;
    }

    return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
  }

  var longFormatters = {
    p: timeLongFormatter,
    P: dateTimeLongFormatter
  };
  var _default = longFormatters;
  exports.default = _default;
  module.exports = exports.default;
});
var longFormatters = /*@__PURE__*/getDefaultExportFromCjs(longFormatters_1);

var isProtectedDayOfYearToken_1 = isProtectedDayOfYearToken;
var isProtectedWeekYearToken_1 = isProtectedWeekYearToken;
var throwProtectedError_1 = throwProtectedError;
var protectedDayOfYearTokens = ['D', 'DD'];
var protectedWeekYearTokens = ['YY', 'YYYY'];

function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}

function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}

function throwProtectedError(token, format, input) {
  if (token === 'YYYY') {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'YY') {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'D') {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'DD') {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  }
}

var protectedTokens = /*#__PURE__*/Object.defineProperty({
  isProtectedDayOfYearToken: isProtectedDayOfYearToken_1,
  isProtectedWeekYearToken: isProtectedWeekYearToken_1,
  throwProtectedError: throwProtectedError_1
}, '__esModule', {
  value: true
});

var format_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = format;

  var _index = _interopRequireDefault(isValid_1);

  var _index2 = _interopRequireDefault(enUS);

  var _index3 = _interopRequireDefault(subMilliseconds_1);

  var _index4 = _interopRequireDefault(toDate_1);

  var _index5 = _interopRequireDefault(formatters_1);

  var _index6 = _interopRequireDefault(longFormatters_1);

  var _index7 = _interopRequireDefault(getTimezoneOffsetInMilliseconds_1);

  var _index9 = _interopRequireDefault(toInteger_1);

  var _index10 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // This RegExp consists of three parts separated by `|`:
  // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
  //   (one of the certain letters followed by `o`)
  // - (\w)\1* matches any sequences of the same letter
  // - '' matches two quote characters in a row
  // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
  //   except a single quote symbol, which ends the sequence.
  //   Two quote characters do not end the sequence.
  //   If there is no matching single quote
  //   then the sequence will continue until the end of the string.
  // - . matches any single character unmatched by previous parts of the RegExps


  var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
  // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

  var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  var escapedStringRegExp = /^'([^]*?)'?$/;
  var doubleQuoteRegExp = /''/g;
  var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
  /**
   * @name format
   * @category Common Helpers
   * @summary Format the date.
   *
   * @description
   * Return the formatted date string in the given format. The result may vary by locale.
   *
   * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
   * > See: https://git.io/fxCyr
   *
   * The characters wrapped between two single quotes characters (') are escaped.
   * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
   * (see the last example)
   *
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   * with a few additions (see note 7 below the table).
   *
   * Accepted patterns:
   * | Unit                            | Pattern | Result examples                   | Notes |
   * |---------------------------------|---------|-----------------------------------|-------|
   * | Era                             | G..GGG  | AD, BC                            |       |
   * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
   * |                                 | GGGGG   | A, B                              |       |
   * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
   * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
   * |                                 | yy      | 44, 01, 00, 17                    | 5     |
   * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
   * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
   * |                                 | yyyyy   | ...                               | 3,5   |
   * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
   * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
   * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
   * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
   * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
   * |                                 | YYYYY   | ...                               | 3,5   |
   * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
   * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
   * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
   * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
   * |                                 | RRRRR   | ...                               | 3,5,7 |
   * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
   * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
   * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
   * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
   * |                                 | uuuuu   | ...                               | 3,5   |
   * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
   * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
   * |                                 | QQ      | 01, 02, 03, 04                    |       |
   * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
   * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
   * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
   * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
   * |                                 | qq      | 01, 02, 03, 04                    |       |
   * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
   * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
   * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
   * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
   * |                                 | MM      | 01, 02, ..., 12                   |       |
   * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
   * |                                 | MMMM    | January, February, ..., December  | 2     |
   * |                                 | MMMMM   | J, F, ..., D                      |       |
   * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
   * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
   * |                                 | LL      | 01, 02, ..., 12                   |       |
   * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
   * |                                 | LLLL    | January, February, ..., December  | 2     |
   * |                                 | LLLLL   | J, F, ..., D                      |       |
   * | Local week of year              | w       | 1, 2, ..., 53                     |       |
   * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
   * |                                 | ww      | 01, 02, ..., 53                   |       |
   * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
   * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
   * |                                 | II      | 01, 02, ..., 53                   | 7     |
   * | Day of month                    | d       | 1, 2, ..., 31                     |       |
   * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
   * |                                 | dd      | 01, 02, ..., 31                   |       |
   * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
   * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
   * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
   * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
   * |                                 | DDDD    | ...                               | 3     |
   * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
   * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
   * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
   * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
   * |                                 | ii      | 01, 02, ..., 07                   | 7     |
   * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
   * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
   * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
   * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |
   * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
   * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
   * |                                 | ee      | 02, 03, ..., 01                   |       |
   * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
   * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
   * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
   * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
   * |                                 | cc      | 02, 03, ..., 01                   |       |
   * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
   * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
   * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | AM, PM                          | a..aa   | AM, PM                            |       |
   * |                                 | aaa     | am, pm                            |       |
   * |                                 | aaaa    | a.m., p.m.                        | 2     |
   * |                                 | aaaaa   | a, p                              |       |
   * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
   * |                                 | bbb     | am, pm, noon, midnight            |       |
   * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
   * |                                 | bbbbb   | a, p, n, mi                       |       |
   * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
   * |                                 | BBBB    | at night, in the morning, ...     | 2     |
   * |                                 | BBBBB   | at night, in the morning, ...     |       |
   * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
   * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
   * |                                 | hh      | 01, 02, ..., 11, 12               |       |
   * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
   * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
   * |                                 | HH      | 00, 01, 02, ..., 23               |       |
   * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
   * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
   * |                                 | KK      | 01, 02, ..., 11, 00               |       |
   * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
   * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
   * |                                 | kk      | 24, 01, 02, ..., 23               |       |
   * | Minute                          | m       | 0, 1, ..., 59                     |       |
   * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
   * |                                 | mm      | 00, 01, ..., 59                   |       |
   * | Second                          | s       | 0, 1, ..., 59                     |       |
   * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
   * |                                 | ss      | 00, 01, ..., 59                   |       |
   * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
   * |                                 | SS      | 00, 01, ..., 99                   |       |
   * |                                 | SSS     | 000, 0001, ..., 999               |       |
   * |                                 | SSSS    | ...                               | 3     |
   * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
   * |                                 | XX      | -0800, +0530, Z                   |       |
   * |                                 | XXX     | -08:00, +05:30, Z                 |       |
   * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
   * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
   * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
   * |                                 | xx      | -0800, +0530, +0000               |       |
   * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
   * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
   * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
   * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
   * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
   * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
   * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
   * | Seconds timestamp               | t       | 512969520                         | 7     |
   * |                                 | tt      | ...                               | 3,7   |
   * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
   * |                                 | TT      | ...                               | 3,7   |
   * | Long localized date             | P       | 04/29/1453                        | 7     |
   * |                                 | PP      | Apr 29, 1453                      | 7     |
   * |                                 | PPP     | April 29th, 1453                  | 7     |
   * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
   * | Long localized time             | p       | 12:00 AM                          | 7     |
   * |                                 | pp      | 12:00:00 AM                       | 7     |
   * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
   * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
   * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
   * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
   * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
   * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
   * Notes:
   * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
   *    are the same as "stand-alone" units, but are different in some languages.
   *    "Formatting" units are declined according to the rules of the language
   *    in the context of a date. "Stand-alone" units are always nominative singular:
   *
   *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
   *
   *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
   *
   * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
   *    the single quote characters (see below).
   *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
   *    the output will be the same as default pattern for this unit, usually
   *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
   *    are marked with "2" in the last column of the table.
   *
   *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
   *
   *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
   *
   * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
   *    The output will be padded with zeros to match the length of the pattern.
   *
   *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
   *
   * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
   *    These tokens represent the shortest form of the quarter.
   *
   * 5. The main difference between `y` and `u` patterns are B.C. years:
   *
   *    | Year | `y` | `u` |
   *    |------|-----|-----|
   *    | AC 1 |   1 |   1 |
   *    | BC 1 |   1 |   0 |
   *    | BC 2 |   2 |  -1 |
   *
   *    Also `yy` always returns the last two digits of a year,
   *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
   *
   *    | Year | `yy` | `uu` |
   *    |------|------|------|
   *    | 1    |   01 |   01 |
   *    | 14   |   14 |   14 |
   *    | 376  |   76 |  376 |
   *    | 1453 |   53 | 1453 |
   *
   *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
   *    except local week-numbering years are dependent on `options.weekStartsOn`
   *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
   *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
   *
   * 6. Specific non-location timezones are currently unavailable in `date-fns`,
   *    so right now these tokens fall back to GMT timezones.
   *
   * 7. These patterns are not in the Unicode Technical Standard #35:
   *    - `i`: ISO day of week
   *    - `I`: ISO week of year
   *    - `R`: ISO week-numbering year
   *    - `t`: seconds timestamp
   *    - `T`: milliseconds timestamp
   *    - `o`: ordinal number modifier
   *    - `P`: long localized date
   *    - `p`: long localized time
   *
   * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
   *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
   *
   * 9. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
   *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * - The second argument is now required for the sake of explicitness.
   *
   *   ```javascript
   *   // Before v2.0.0
   *   format(new Date(2016, 0, 1))
   *
   *   // v2.0.0 onward
   *   format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
   *   ```
   *
   * - New format string API for `format` function
   *   which is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
   *   See [this post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.
   *
   * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.
   *
   * @param {Date|Number} date - the original date
   * @param {String} format - the string of tokens
   * @param {Object} [options] - an object with options.
   * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
   * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
   * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
   * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
   *   see: https://git.io/fxCyr
   * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
   *   see: https://git.io/fxCyr
   * @returns {String} the formatted date string
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} `date` must not be Invalid Date
   * @throws {RangeError} `options.locale` must contain `localize` property
   * @throws {RangeError} `options.locale` must contain `formatLong` property
   * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
   * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
   * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
   * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
   * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
   * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
   * @throws {RangeError} format string contains an unescaped latin alphabet character
   *
   * @example
   * // Represent 11 February 2014 in middle-endian format:
   * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
   * //=> '02/11/2014'
   *
   * @example
   * // Represent 2 July 2014 in Esperanto:
   * import { eoLocale } from 'date-fns/locale/eo'
   * var result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
   *   locale: eoLocale
   * })
   * //=> '2-a de julio 2014'
   *
   * @example
   * // Escape string by single quote characters:
   * var result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
   * //=> "3 o'clock"
   */

  function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
    (0, _index10.default)(2, arguments);
    var formatStr = String(dirtyFormatStr);
    var options = dirtyOptions || {};
    var locale = options.locale || _index2.default;
    var localeFirstWeekContainsDate = locale.options && locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index9.default)(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index9.default)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
    }

    var localeWeekStartsOn = locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index9.default)(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index9.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }

    if (!locale.localize) {
      throw new RangeError('locale must contain localize property');
    }

    if (!locale.formatLong) {
      throw new RangeError('locale must contain formatLong property');
    }

    var originalDate = (0, _index4.default)(dirtyDate);

    if (!(0, _index.default)(originalDate)) {
      throw new RangeError('Invalid time value');
    } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
    // This ensures that when UTC functions will be implemented, locales will be compatible with them.
    // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376


    var timezoneOffset = (0, _index7.default)(originalDate);
    var utcDate = (0, _index3.default)(originalDate, timezoneOffset);
    var formatterOptions = {
      firstWeekContainsDate: firstWeekContainsDate,
      weekStartsOn: weekStartsOn,
      locale: locale,
      _originalDate: originalDate
    };
    var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
      var firstCharacter = substring[0];

      if (firstCharacter === 'p' || firstCharacter === 'P') {
        var longFormatter = _index6.default[firstCharacter];
        return longFormatter(substring, locale.formatLong, formatterOptions);
      }

      return substring;
    }).join('').match(formattingTokensRegExp).map(function (substring) {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return "'";
      }

      var firstCharacter = substring[0];

      if (firstCharacter === "'") {
        return cleanEscapedString(substring);
      }

      var formatter = _index5.default[firstCharacter];

      if (formatter) {
        if (!options.useAdditionalWeekYearTokens && (0, protectedTokens.isProtectedWeekYearToken)(substring)) {
          (0, protectedTokens.throwProtectedError)(substring, dirtyFormatStr, dirtyDate);
        }

        if (!options.useAdditionalDayOfYearTokens && (0, protectedTokens.isProtectedDayOfYearToken)(substring)) {
          (0, protectedTokens.throwProtectedError)(substring, dirtyFormatStr, dirtyDate);
        }

        return formatter(utcDate, substring, locale.localize, formatterOptions);
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
      }

      return substring;
    }).join('');
    return result;
  }

  function cleanEscapedString(input) {
    return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
  }

  module.exports = exports.default;
});
var format = /*@__PURE__*/getDefaultExportFromCjs(format_1);

var getHours_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getHours;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name getHours
   * @category Hour Helpers
   * @summary Get the hours of the given date.
   *
   * @description
   * Get the hours of the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the given date
   * @returns {Number} the hours
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // Get the hours of 29 February 2012 11:45:00:
   * const result = getHours(new Date(2012, 1, 29, 11, 45))
   * //=> 11
   */


  function getHours(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var hours = date.getHours();
    return hours;
  }

  module.exports = exports.default;
});
var getHours$1 = /*@__PURE__*/getDefaultExportFromCjs(getHours_1);

var getSeconds_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getSeconds;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name getSeconds
   * @category Second Helpers
   * @summary Get the seconds of the given date.
   *
   * @description
   * Get the seconds of the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the given date
   * @returns {Number} the seconds
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // Get the seconds of 29 February 2012 11:45:05.123:
   * const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
   * //=> 5
   */


  function getSeconds(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var seconds = date.getSeconds();
    return seconds;
  }

  module.exports = exports.default;
});
var getSeconds = /*@__PURE__*/getDefaultExportFromCjs(getSeconds_1);

var getYear_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getYear;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name getYear
   * @category Year Helpers
   * @summary Get the year of the given date.
   *
   * @description
   * Get the year of the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the given date
   * @returns {Number} the year
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // Which year is 2 July 2014?
   * const result = getYear(new Date(2014, 6, 2))
   * //=> 2014
   */


  function getYear(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var year = date.getFullYear();
    return year;
  }

  module.exports = exports.default;
});
var getYear = /*@__PURE__*/getDefaultExportFromCjs(getYear_1);

var isAfter_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isAfter;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name isAfter
   * @category Common Helpers
   * @summary Is the first date after the second one?
   *
   * @description
   * Is the first date after the second one?
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date that should be after the other one to return true
   * @param {Date|Number} dateToCompare - the date to compare with
   * @returns {Boolean} the first date is after the second date
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Is 10 July 1989 after 11 February 1987?
   * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
   * //=> true
   */


  function isAfter(dirtyDate, dirtyDateToCompare) {
    (0, _index2.default)(2, arguments);
    var date = (0, _index.default)(dirtyDate);
    var dateToCompare = (0, _index.default)(dirtyDateToCompare);
    return date.getTime() > dateToCompare.getTime();
  }

  module.exports = exports.default;
});
var isAfter = /*@__PURE__*/getDefaultExportFromCjs(isAfter_1);

var isBefore_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isBefore;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name isBefore
   * @category Common Helpers
   * @summary Is the first date before the second one?
   *
   * @description
   * Is the first date before the second one?
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date that should be before the other one to return true
   * @param {Date|Number} dateToCompare - the date to compare with
   * @returns {Boolean} the first date is before the second date
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Is 10 July 1989 before 11 February 1987?
   * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
   * //=> false
   */


  function isBefore(dirtyDate, dirtyDateToCompare) {
    (0, _index2.default)(2, arguments);
    var date = (0, _index.default)(dirtyDate);
    var dateToCompare = (0, _index.default)(dirtyDateToCompare);
    return date.getTime() < dateToCompare.getTime();
  }

  module.exports = exports.default;
});
var isBefore = /*@__PURE__*/getDefaultExportFromCjs(isBefore_1);

var isEqual_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isEqual;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name isEqual
   * @category Common Helpers
   * @summary Are the given dates equal?
   *
   * @description
   * Are the given dates equal?
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the first date to compare
   * @param {Date|Number} dateRight - the second date to compare
   * @returns {Boolean} the dates are equal
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
   * var result = isEqual(
   *   new Date(2014, 6, 2, 6, 30, 45, 0),
   *   new Date(2014, 6, 2, 6, 30, 45, 500)
   * )
   * //=> false
   */


  function isEqual(dirtyLeftDate, dirtyRightDate) {
    (0, _index2.default)(2, arguments);
    var dateLeft = (0, _index.default)(dirtyLeftDate);
    var dateRight = (0, _index.default)(dirtyRightDate);
    return dateLeft.getTime() === dateRight.getTime();
  }

  module.exports = exports.default;
});
var isEqual = /*@__PURE__*/getDefaultExportFromCjs(isEqual_1);

var isSameDay_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isSameDay;

  var _index = _interopRequireDefault(startOfDay_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name isSameDay
   * @category Day Helpers
   * @summary Are the given dates in the same day?
   *
   * @description
   * Are the given dates in the same day?
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the first date to check
   * @param {Date|Number} dateRight - the second date to check
   * @returns {Boolean} the dates are in the same day
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
   * var result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
   * //=> true
   */


  function isSameDay(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var dateLeftStartOfDay = (0, _index.default)(dirtyDateLeft);
    var dateRightStartOfDay = (0, _index.default)(dirtyDateRight);
    return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
  }

  module.exports = exports.default;
});
var isSameDay = /*@__PURE__*/getDefaultExportFromCjs(isSameDay_1);

var isSameYear_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isSameYear;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name isSameYear
   * @category Year Helpers
   * @summary Are the given dates in the same year?
   *
   * @description
   * Are the given dates in the same year?
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the first date to check
   * @param {Date|Number} dateRight - the second date to check
   * @returns {Boolean} the dates are in the same year
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Are 2 September 2014 and 25 September 2014 in the same year?
   * var result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
   * //=> true
   */


  function isSameYear(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var dateLeft = (0, _index.default)(dirtyDateLeft);
    var dateRight = (0, _index.default)(dirtyDateRight);
    return dateLeft.getFullYear() === dateRight.getFullYear();
  }

  module.exports = exports.default;
});
var isSameYear = /*@__PURE__*/getDefaultExportFromCjs(isSameYear_1);

var isSameMonth_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isSameMonth;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name isSameMonth
   * @category Month Helpers
   * @summary Are the given dates in the same month?
   *
   * @description
   * Are the given dates in the same month?
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the first date to check
   * @param {Date|Number} dateRight - the second date to check
   * @returns {Boolean} the dates are in the same month
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Are 2 September 2014 and 25 September 2014 in the same month?
   * var result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
   * //=> true
   */


  function isSameMonth(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var dateLeft = (0, _index.default)(dirtyDateLeft);
    var dateRight = (0, _index.default)(dirtyDateRight);
    return dateLeft.getFullYear() === dateRight.getFullYear() && dateLeft.getMonth() === dateRight.getMonth();
  }

  module.exports = exports.default;
});
var isSameMonth = /*@__PURE__*/getDefaultExportFromCjs(isSameMonth_1);

var startOfHour_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfHour;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name startOfHour
   * @category Hour Helpers
   * @summary Return the start of an hour for the given date.
   *
   * @description
   * Return the start of an hour for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @returns {Date} the start of an hour
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // The start of an hour for 2 September 2014 11:55:00:
   * const result = startOfHour(new Date(2014, 8, 2, 11, 55))
   * //=> Tue Sep 02 2014 11:00:00
   */


  function startOfHour(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    date.setMinutes(0, 0, 0);
    return date;
  }

  module.exports = exports.default;
});

var isSameHour_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isSameHour;

  var _index = _interopRequireDefault(startOfHour_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name isSameHour
   * @category Hour Helpers
   * @summary Are the given dates in the same hour?
   *
   * @description
   * Are the given dates in the same hour?
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} dateLeft - the first date to check
   * @param {Date|Number} dateRight - the second date to check
   * @returns {Boolean} the dates are in the same hour
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
   * var result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 6, 30))
   * //=> true
   */


  function isSameHour(dirtyDateLeft, dirtyDateRight) {
    (0, _index2.default)(2, arguments);
    var dateLeftStartOfHour = (0, _index.default)(dirtyDateLeft);
    var dateRightStartOfHour = (0, _index.default)(dirtyDateRight);
    return dateLeftStartOfHour.getTime() === dateRightStartOfHour.getTime();
  }

  module.exports = exports.default;
});
var isSameHour = /*@__PURE__*/getDefaultExportFromCjs(isSameHour_1);

var assign_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assign;

  function assign(target, dirtyObject) {
    if (target == null) {
      throw new TypeError('assign requires that input parameter not be null or undefined');
    }

    dirtyObject = dirtyObject || {};

    for (var property in dirtyObject) {
      if (dirtyObject.hasOwnProperty(property)) {
        target[property] = dirtyObject[property];
      }
    }

    return target;
  }

  module.exports = exports.default;
});

var setUTCDay_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setUTCDay;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376


  function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
    (0, _index3.default)(2, arguments);
    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index.default)(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }

    var date = (0, _index2.default)(dirtyDate);
    var day = (0, _index.default)(dirtyDay);
    var currentDay = date.getUTCDay();
    var remainder = day % 7;
    var dayIndex = (remainder + 7) % 7;
    var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
  }

  module.exports = exports.default;
});

var setUTCISODay_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setUTCISODay;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376


  function setUTCISODay(dirtyDate, dirtyDay) {
    (0, _index3.default)(2, arguments);
    var day = (0, _index.default)(dirtyDay);

    if (day % 7 === 0) {
      day = day - 7;
    }

    var weekStartsOn = 1;
    var date = (0, _index2.default)(dirtyDate);
    var currentDay = date.getUTCDay();
    var remainder = day % 7;
    var dayIndex = (remainder + 7) % 7;
    var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
  }

  module.exports = exports.default;
});

var setUTCISOWeek_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setUTCISOWeek;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(getUTCISOWeek_1);

  var _index4 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376


  function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
    (0, _index4.default)(2, arguments);
    var date = (0, _index2.default)(dirtyDate);
    var isoWeek = (0, _index.default)(dirtyISOWeek);
    var diff = (0, _index3.default)(date) - isoWeek;
    date.setUTCDate(date.getUTCDate() - diff * 7);
    return date;
  }

  module.exports = exports.default;
});

var setUTCWeek_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setUTCWeek;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(getUTCWeek_1);

  var _index4 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  } // This function will be a part of public API when UTC function will be implemented.
  // See issue: https://github.com/date-fns/date-fns/issues/376


  function setUTCWeek(dirtyDate, dirtyWeek, options) {
    (0, _index4.default)(2, arguments);
    var date = (0, _index2.default)(dirtyDate);
    var week = (0, _index.default)(dirtyWeek);
    var diff = (0, _index3.default)(date, options) - week;
    date.setUTCDate(date.getUTCDate() - diff * 7);
    return date;
  }

  module.exports = exports.default;
});

var parsers_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _index = _interopRequireDefault(getUTCWeekYear_1);

  var _index2 = _interopRequireDefault(setUTCDay_1);

  var _index3 = _interopRequireDefault(setUTCISODay_1);

  var _index4 = _interopRequireDefault(setUTCISOWeek_1);

  var _index5 = _interopRequireDefault(setUTCWeek_1);

  var _index6 = _interopRequireDefault(startOfUTCISOWeek_1);

  var _index7 = _interopRequireDefault(startOfUTCWeek_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MILLISECONDS_IN_HOUR = 3600000;
  var MILLISECONDS_IN_MINUTE = 60000;
  var MILLISECONDS_IN_SECOND = 1000;
  var numericPatterns = {
    month: /^(1[0-2]|0?\d)/,
    // 0 to 12
    date: /^(3[0-1]|[0-2]?\d)/,
    // 0 to 31
    dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
    // 0 to 366
    week: /^(5[0-3]|[0-4]?\d)/,
    // 0 to 53
    hour23h: /^(2[0-3]|[0-1]?\d)/,
    // 0 to 23
    hour24h: /^(2[0-4]|[0-1]?\d)/,
    // 0 to 24
    hour11h: /^(1[0-1]|0?\d)/,
    // 0 to 11
    hour12h: /^(1[0-2]|0?\d)/,
    // 0 to 12
    minute: /^[0-5]?\d/,
    // 0 to 59
    second: /^[0-5]?\d/,
    // 0 to 59
    singleDigit: /^\d/,
    // 0 to 9
    twoDigits: /^\d{1,2}/,
    // 0 to 99
    threeDigits: /^\d{1,3}/,
    // 0 to 999
    fourDigits: /^\d{1,4}/,
    // 0 to 9999
    anyDigitsSigned: /^-?\d+/,
    singleDigitSigned: /^-?\d/,
    // 0 to 9, -0 to -9
    twoDigitsSigned: /^-?\d{1,2}/,
    // 0 to 99, -0 to -99
    threeDigitsSigned: /^-?\d{1,3}/,
    // 0 to 999, -0 to -999
    fourDigitsSigned: /^-?\d{1,4}/ // 0 to 9999, -0 to -9999

  };
  var timezonePatterns = {
    basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
    basic: /^([+-])(\d{2})(\d{2})|Z/,
    basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
    extended: /^([+-])(\d{2}):(\d{2})|Z/,
    extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
  };

  function parseNumericPattern(pattern, string, valueCallback) {
    var matchResult = string.match(pattern);

    if (!matchResult) {
      return null;
    }

    var value = parseInt(matchResult[0], 10);
    return {
      value: valueCallback ? valueCallback(value) : value,
      rest: string.slice(matchResult[0].length)
    };
  }

  function parseTimezonePattern(pattern, string) {
    var matchResult = string.match(pattern);

    if (!matchResult) {
      return null;
    } // Input is 'Z'


    if (matchResult[0] === 'Z') {
      return {
        value: 0,
        rest: string.slice(1)
      };
    }

    var sign = matchResult[1] === '+' ? 1 : -1;
    var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
    var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
    var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
    return {
      value: sign * (hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * MILLISECONDS_IN_SECOND),
      rest: string.slice(matchResult[0].length)
    };
  }

  function parseAnyDigitsSigned(string, valueCallback) {
    return parseNumericPattern(numericPatterns.anyDigitsSigned, string, valueCallback);
  }

  function parseNDigits(n, string, valueCallback) {
    switch (n) {
      case 1:
        return parseNumericPattern(numericPatterns.singleDigit, string, valueCallback);

      case 2:
        return parseNumericPattern(numericPatterns.twoDigits, string, valueCallback);

      case 3:
        return parseNumericPattern(numericPatterns.threeDigits, string, valueCallback);

      case 4:
        return parseNumericPattern(numericPatterns.fourDigits, string, valueCallback);

      default:
        return parseNumericPattern(new RegExp('^\\d{1,' + n + '}'), string, valueCallback);
    }
  }

  function parseNDigitsSigned(n, string, valueCallback) {
    switch (n) {
      case 1:
        return parseNumericPattern(numericPatterns.singleDigitSigned, string, valueCallback);

      case 2:
        return parseNumericPattern(numericPatterns.twoDigitsSigned, string, valueCallback);

      case 3:
        return parseNumericPattern(numericPatterns.threeDigitsSigned, string, valueCallback);

      case 4:
        return parseNumericPattern(numericPatterns.fourDigitsSigned, string, valueCallback);

      default:
        return parseNumericPattern(new RegExp('^-?\\d{1,' + n + '}'), string, valueCallback);
    }
  }

  function dayPeriodEnumToHours(enumValue) {
    switch (enumValue) {
      case 'morning':
        return 4;

      case 'evening':
        return 17;

      case 'pm':
      case 'noon':
      case 'afternoon':
        return 12;

      case 'am':
      case 'midnight':
      case 'night':
      default:
        return 0;
    }
  }

  function normalizeTwoDigitYear(twoDigitYear, currentYear) {
    var isCommonEra = currentYear > 0; // Absolute number of the current year:
    // 1 -> 1 AC
    // 0 -> 1 BC
    // -1 -> 2 BC

    var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
    var result;

    if (absCurrentYear <= 50) {
      result = twoDigitYear || 100;
    } else {
      var rangeEnd = absCurrentYear + 50;
      var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
      var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
      result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
    }

    return isCommonEra ? result : 1 - result;
  }

  var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // User for validation

  function isLeapYearIndex(year) {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
  }
  /*
   * |     | Unit                           |     | Unit                           |
   * |-----|--------------------------------|-----|--------------------------------|
   * |  a  | AM, PM                         |  A* | Milliseconds in day            |
   * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
   * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
   * |  d  | Day of month                   |  D  | Day of year                    |
   * |  e  | Local day of week              |  E  | Day of week                    |
   * |  f  |                                |  F* | Day of week in month           |
   * |  g* | Modified Julian day            |  G  | Era                            |
   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
   * |  i! | ISO day of week                |  I! | ISO week of year               |
   * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
   * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
   * |  l* | (deprecated)                   |  L  | Stand-alone month              |
   * |  m  | Minute                         |  M  | Month                          |
   * |  n  |                                |  N  |                                |
   * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
   * |  p  |                                |  P  |                                |
   * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
   * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
   * |  s  | Second                         |  S  | Fraction of second             |
   * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
   * |  u  | Extended year                  |  U* | Cyclic year                    |
   * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
   * |  w  | Local week of year             |  W* | Week of month                  |
   * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
   * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
   * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
   *
   * Letters marked by * are not implemented but reserved by Unicode standard.
   *
   * Letters marked by ! are non-standard, but implemented by date-fns:
   * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
   * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
   *   i.e. 7 for Sunday, 1 for Monday, etc.
   * - `I` is ISO week of year, as opposed to `w` which is local week of year.
   * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
   *   `R` is supposed to be used in conjunction with `I` and `i`
   *   for universal ISO week-numbering date, whereas
   *   `Y` is supposed to be used in conjunction with `w` and `e`
   *   for week-numbering date specific to the locale.
   */


  var parsers = {
    // Era
    G: {
      priority: 140,
      parse: function (string, token, match, _options) {
        switch (token) {
          // AD, BC
          case 'G':
          case 'GG':
          case 'GGG':
            return match.era(string, {
              width: 'abbreviated'
            }) || match.era(string, {
              width: 'narrow'
            });
          // A, B

          case 'GGGGG':
            return match.era(string, {
              width: 'narrow'
            });
          // Anno Domini, Before Christ

          case 'GGGG':
          default:
            return match.era(string, {
              width: 'wide'
            }) || match.era(string, {
              width: 'abbreviated'
            }) || match.era(string, {
              width: 'narrow'
            });
        }
      },
      set: function (date, flags, value, _options) {
        flags.era = value;
        date.setUTCFullYear(value, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['R', 'u', 't', 'T']
    },
    // Year
    y: {
      // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
      // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
      // |----------|-------|----|-------|-------|-------|
      // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
      // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
      // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
      // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
      // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
      priority: 130,
      parse: function (string, token, match, _options) {
        var valueCallback = function (year) {
          return {
            year: year,
            isTwoDigitYear: token === 'yy'
          };
        };

        switch (token) {
          case 'y':
            return parseNDigits(4, string, valueCallback);

          case 'yo':
            return match.ordinalNumber(string, {
              unit: 'year',
              valueCallback: valueCallback
            });

          default:
            return parseNDigits(token.length, string, valueCallback);
        }
      },
      validate: function (_date, value, _options) {
        return value.isTwoDigitYear || value.year > 0;
      },
      set: function (date, flags, value, _options) {
        var currentYear = date.getUTCFullYear();

        if (value.isTwoDigitYear) {
          var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
          date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
          date.setUTCHours(0, 0, 0, 0);
          return date;
        }

        var year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
        date.setUTCFullYear(year, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['Y', 'R', 'u', 'w', 'I', 'i', 'e', 'c', 't', 'T']
    },
    // Local week-numbering year
    Y: {
      priority: 130,
      parse: function (string, token, match, _options) {
        var valueCallback = function (year) {
          return {
            year: year,
            isTwoDigitYear: token === 'YY'
          };
        };

        switch (token) {
          case 'Y':
            return parseNDigits(4, string, valueCallback);

          case 'Yo':
            return match.ordinalNumber(string, {
              unit: 'year',
              valueCallback: valueCallback
            });

          default:
            return parseNDigits(token.length, string, valueCallback);
        }
      },
      validate: function (_date, value, _options) {
        return value.isTwoDigitYear || value.year > 0;
      },
      set: function (date, flags, value, options) {
        var currentYear = (0, _index.default)(date, options);

        if (value.isTwoDigitYear) {
          var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
          date.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
          date.setUTCHours(0, 0, 0, 0);
          return (0, _index7.default)(date, options);
        }

        var year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
        date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
        date.setUTCHours(0, 0, 0, 0);
        return (0, _index7.default)(date, options);
      },
      incompatibleTokens: ['y', 'R', 'u', 'Q', 'q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']
    },
    // ISO week-numbering year
    R: {
      priority: 130,
      parse: function (string, token, _match, _options) {
        if (token === 'R') {
          return parseNDigitsSigned(4, string);
        }

        return parseNDigitsSigned(token.length, string);
      },
      set: function (_date, _flags, value, _options) {
        var firstWeekOfYear = new Date(0);
        firstWeekOfYear.setUTCFullYear(value, 0, 4);
        firstWeekOfYear.setUTCHours(0, 0, 0, 0);
        return (0, _index6.default)(firstWeekOfYear);
      },
      incompatibleTokens: ['G', 'y', 'Y', 'u', 'Q', 'q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']
    },
    // Extended year
    u: {
      priority: 130,
      parse: function (string, token, _match, _options) {
        if (token === 'u') {
          return parseNDigitsSigned(4, string);
        }

        return parseNDigitsSigned(token.length, string);
      },
      set: function (date, _flags, value, _options) {
        date.setUTCFullYear(value, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['G', 'y', 'Y', 'R', 'w', 'I', 'i', 'e', 'c', 't', 'T']
    },
    // Quarter
    Q: {
      priority: 120,
      parse: function (string, token, match, _options) {
        switch (token) {
          // 1, 2, 3, 4
          case 'Q':
          case 'QQ':
            // 01, 02, 03, 04
            return parseNDigits(token.length, string);
          // 1st, 2nd, 3rd, 4th

          case 'Qo':
            return match.ordinalNumber(string, {
              unit: 'quarter'
            });
          // Q1, Q2, Q3, Q4

          case 'QQQ':
            return match.quarter(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.quarter(string, {
              width: 'narrow',
              context: 'formatting'
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)

          case 'QQQQQ':
            return match.quarter(string, {
              width: 'narrow',
              context: 'formatting'
            });
          // 1st quarter, 2nd quarter, ...

          case 'QQQQ':
          default:
            return match.quarter(string, {
              width: 'wide',
              context: 'formatting'
            }) || match.quarter(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.quarter(string, {
              width: 'narrow',
              context: 'formatting'
            });
        }
      },
      validate: function (_date, value, _options) {
        return value >= 1 && value <= 4;
      },
      set: function (date, _flags, value, _options) {
        date.setUTCMonth((value - 1) * 3, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['Y', 'R', 'q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']
    },
    // Stand-alone quarter
    q: {
      priority: 120,
      parse: function (string, token, match, _options) {
        switch (token) {
          // 1, 2, 3, 4
          case 'q':
          case 'qq':
            // 01, 02, 03, 04
            return parseNDigits(token.length, string);
          // 1st, 2nd, 3rd, 4th

          case 'qo':
            return match.ordinalNumber(string, {
              unit: 'quarter'
            });
          // Q1, Q2, Q3, Q4

          case 'qqq':
            return match.quarter(string, {
              width: 'abbreviated',
              context: 'standalone'
            }) || match.quarter(string, {
              width: 'narrow',
              context: 'standalone'
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)

          case 'qqqqq':
            return match.quarter(string, {
              width: 'narrow',
              context: 'standalone'
            });
          // 1st quarter, 2nd quarter, ...

          case 'qqqq':
          default:
            return match.quarter(string, {
              width: 'wide',
              context: 'standalone'
            }) || match.quarter(string, {
              width: 'abbreviated',
              context: 'standalone'
            }) || match.quarter(string, {
              width: 'narrow',
              context: 'standalone'
            });
        }
      },
      validate: function (_date, value, _options) {
        return value >= 1 && value <= 4;
      },
      set: function (date, _flags, value, _options) {
        date.setUTCMonth((value - 1) * 3, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['Y', 'R', 'Q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']
    },
    // Month
    M: {
      priority: 110,
      parse: function (string, token, match, _options) {
        var valueCallback = function (value) {
          return value - 1;
        };

        switch (token) {
          // 1, 2, ..., 12
          case 'M':
            return parseNumericPattern(numericPatterns.month, string, valueCallback);
          // 01, 02, ..., 12

          case 'MM':
            return parseNDigits(2, string, valueCallback);
          // 1st, 2nd, ..., 12th

          case 'Mo':
            return match.ordinalNumber(string, {
              unit: 'month',
              valueCallback: valueCallback
            });
          // Jan, Feb, ..., Dec

          case 'MMM':
            return match.month(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.month(string, {
              width: 'narrow',
              context: 'formatting'
            });
          // J, F, ..., D

          case 'MMMMM':
            return match.month(string, {
              width: 'narrow',
              context: 'formatting'
            });
          // January, February, ..., December

          case 'MMMM':
          default:
            return match.month(string, {
              width: 'wide',
              context: 'formatting'
            }) || match.month(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.month(string, {
              width: 'narrow',
              context: 'formatting'
            });
        }
      },
      validate: function (_date, value, _options) {
        return value >= 0 && value <= 11;
      },
      set: function (date, _flags, value, _options) {
        date.setUTCMonth(value, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['Y', 'R', 'q', 'Q', 'L', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
    },
    // Stand-alone month
    L: {
      priority: 110,
      parse: function (string, token, match, _options) {
        var valueCallback = function (value) {
          return value - 1;
        };

        switch (token) {
          // 1, 2, ..., 12
          case 'L':
            return parseNumericPattern(numericPatterns.month, string, valueCallback);
          // 01, 02, ..., 12

          case 'LL':
            return parseNDigits(2, string, valueCallback);
          // 1st, 2nd, ..., 12th

          case 'Lo':
            return match.ordinalNumber(string, {
              unit: 'month',
              valueCallback: valueCallback
            });
          // Jan, Feb, ..., Dec

          case 'LLL':
            return match.month(string, {
              width: 'abbreviated',
              context: 'standalone'
            }) || match.month(string, {
              width: 'narrow',
              context: 'standalone'
            });
          // J, F, ..., D

          case 'LLLLL':
            return match.month(string, {
              width: 'narrow',
              context: 'standalone'
            });
          // January, February, ..., December

          case 'LLLL':
          default:
            return match.month(string, {
              width: 'wide',
              context: 'standalone'
            }) || match.month(string, {
              width: 'abbreviated',
              context: 'standalone'
            }) || match.month(string, {
              width: 'narrow',
              context: 'standalone'
            });
        }
      },
      validate: function (_date, value, _options) {
        return value >= 0 && value <= 11;
      },
      set: function (date, _flags, value, _options) {
        date.setUTCMonth(value, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
    },
    // Local week of year
    w: {
      priority: 100,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 'w':
            return parseNumericPattern(numericPatterns.week, string);

          case 'wo':
            return match.ordinalNumber(string, {
              unit: 'week'
            });

          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function (_date, value, _options) {
        return value >= 1 && value <= 53;
      },
      set: function (date, _flags, value, options) {
        return (0, _index7.default)((0, _index5.default)(date, value, options), options);
      },
      incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']
    },
    // ISO week of year
    I: {
      priority: 100,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 'I':
            return parseNumericPattern(numericPatterns.week, string);

          case 'Io':
            return match.ordinalNumber(string, {
              unit: 'week'
            });

          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function (_date, value, _options) {
        return value >= 1 && value <= 53;
      },
      set: function (date, _flags, value, options) {
        return (0, _index6.default)((0, _index4.default)(date, value, options), options);
      },
      incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']
    },
    // Day of the month
    d: {
      priority: 90,
      subPriority: 1,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 'd':
            return parseNumericPattern(numericPatterns.date, string);

          case 'do':
            return match.ordinalNumber(string, {
              unit: 'date'
            });

          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function (date, value, _options) {
        var year = date.getUTCFullYear();
        var isLeapYear = isLeapYearIndex(year);
        var month = date.getUTCMonth();

        if (isLeapYear) {
          return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
        } else {
          return value >= 1 && value <= DAYS_IN_MONTH[month];
        }
      },
      set: function (date, _flags, value, _options) {
        date.setUTCDate(value);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['Y', 'R', 'q', 'Q', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
    },
    // Day of year
    D: {
      priority: 90,
      subPriority: 1,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 'D':
          case 'DD':
            return parseNumericPattern(numericPatterns.dayOfYear, string);

          case 'Do':
            return match.ordinalNumber(string, {
              unit: 'date'
            });

          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function (date, value, _options) {
        var year = date.getUTCFullYear();
        var isLeapYear = isLeapYearIndex(year);

        if (isLeapYear) {
          return value >= 1 && value <= 366;
        } else {
          return value >= 1 && value <= 365;
        }
      },
      set: function (date, _flags, value, _options) {
        date.setUTCMonth(0, value);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'L', 'w', 'I', 'd', 'E', 'i', 'e', 'c', 't', 'T']
    },
    // Day of week
    E: {
      priority: 90,
      parse: function (string, token, match, _options) {
        switch (token) {
          // Tue
          case 'E':
          case 'EE':
          case 'EEE':
            return match.day(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.day(string, {
              width: 'short',
              context: 'formatting'
            }) || match.day(string, {
              width: 'narrow',
              context: 'formatting'
            });
          // T

          case 'EEEEE':
            return match.day(string, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tu

          case 'EEEEEE':
            return match.day(string, {
              width: 'short',
              context: 'formatting'
            }) || match.day(string, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tuesday

          case 'EEEE':
          default:
            return match.day(string, {
              width: 'wide',
              context: 'formatting'
            }) || match.day(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.day(string, {
              width: 'short',
              context: 'formatting'
            }) || match.day(string, {
              width: 'narrow',
              context: 'formatting'
            });
        }
      },
      validate: function (_date, value, _options) {
        return value >= 0 && value <= 6;
      },
      set: function (date, _flags, value, options) {
        date = (0, _index2.default)(date, value, options);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['D', 'i', 'e', 'c', 't', 'T']
    },
    // Local day of week
    e: {
      priority: 90,
      parse: function (string, token, match, options) {
        var valueCallback = function (value) {
          var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
          return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
        };

        switch (token) {
          // 3
          case 'e':
          case 'ee':
            // 03
            return parseNDigits(token.length, string, valueCallback);
          // 3rd

          case 'eo':
            return match.ordinalNumber(string, {
              unit: 'day',
              valueCallback: valueCallback
            });
          // Tue

          case 'eee':
            return match.day(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.day(string, {
              width: 'short',
              context: 'formatting'
            }) || match.day(string, {
              width: 'narrow',
              context: 'formatting'
            });
          // T

          case 'eeeee':
            return match.day(string, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tu

          case 'eeeeee':
            return match.day(string, {
              width: 'short',
              context: 'formatting'
            }) || match.day(string, {
              width: 'narrow',
              context: 'formatting'
            });
          // Tuesday

          case 'eeee':
          default:
            return match.day(string, {
              width: 'wide',
              context: 'formatting'
            }) || match.day(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.day(string, {
              width: 'short',
              context: 'formatting'
            }) || match.day(string, {
              width: 'narrow',
              context: 'formatting'
            });
        }
      },
      validate: function (_date, value, _options) {
        return value >= 0 && value <= 6;
      },
      set: function (date, _flags, value, options) {
        date = (0, _index2.default)(date, value, options);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'c', 't', 'T']
    },
    // Stand-alone local day of week
    c: {
      priority: 90,
      parse: function (string, token, match, options) {
        var valueCallback = function (value) {
          var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
          return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
        };

        switch (token) {
          // 3
          case 'c':
          case 'cc':
            // 03
            return parseNDigits(token.length, string, valueCallback);
          // 3rd

          case 'co':
            return match.ordinalNumber(string, {
              unit: 'day',
              valueCallback: valueCallback
            });
          // Tue

          case 'ccc':
            return match.day(string, {
              width: 'abbreviated',
              context: 'standalone'
            }) || match.day(string, {
              width: 'short',
              context: 'standalone'
            }) || match.day(string, {
              width: 'narrow',
              context: 'standalone'
            });
          // T

          case 'ccccc':
            return match.day(string, {
              width: 'narrow',
              context: 'standalone'
            });
          // Tu

          case 'cccccc':
            return match.day(string, {
              width: 'short',
              context: 'standalone'
            }) || match.day(string, {
              width: 'narrow',
              context: 'standalone'
            });
          // Tuesday

          case 'cccc':
          default:
            return match.day(string, {
              width: 'wide',
              context: 'standalone'
            }) || match.day(string, {
              width: 'abbreviated',
              context: 'standalone'
            }) || match.day(string, {
              width: 'short',
              context: 'standalone'
            }) || match.day(string, {
              width: 'narrow',
              context: 'standalone'
            });
        }
      },
      validate: function (_date, value, _options) {
        return value >= 0 && value <= 6;
      },
      set: function (date, _flags, value, options) {
        date = (0, _index2.default)(date, value, options);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'e', 't', 'T']
    },
    // ISO day of week
    i: {
      priority: 90,
      parse: function (string, token, match, _options) {
        var valueCallback = function (value) {
          if (value === 0) {
            return 7;
          }

          return value;
        };

        switch (token) {
          // 2
          case 'i':
          case 'ii':
            // 02
            return parseNDigits(token.length, string);
          // 2nd

          case 'io':
            return match.ordinalNumber(string, {
              unit: 'day'
            });
          // Tue

          case 'iii':
            return match.day(string, {
              width: 'abbreviated',
              context: 'formatting',
              valueCallback: valueCallback
            }) || match.day(string, {
              width: 'short',
              context: 'formatting',
              valueCallback: valueCallback
            }) || match.day(string, {
              width: 'narrow',
              context: 'formatting',
              valueCallback: valueCallback
            });
          // T

          case 'iiiii':
            return match.day(string, {
              width: 'narrow',
              context: 'formatting',
              valueCallback: valueCallback
            });
          // Tu

          case 'iiiiii':
            return match.day(string, {
              width: 'short',
              context: 'formatting',
              valueCallback: valueCallback
            }) || match.day(string, {
              width: 'narrow',
              context: 'formatting',
              valueCallback: valueCallback
            });
          // Tuesday

          case 'iiii':
          default:
            return match.day(string, {
              width: 'wide',
              context: 'formatting',
              valueCallback: valueCallback
            }) || match.day(string, {
              width: 'abbreviated',
              context: 'formatting',
              valueCallback: valueCallback
            }) || match.day(string, {
              width: 'short',
              context: 'formatting',
              valueCallback: valueCallback
            }) || match.day(string, {
              width: 'narrow',
              context: 'formatting',
              valueCallback: valueCallback
            });
        }
      },
      validate: function (_date, value, _options) {
        return value >= 1 && value <= 7;
      },
      set: function (date, _flags, value, options) {
        date = (0, _index3.default)(date, value, options);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'E', 'e', 'c', 't', 'T']
    },
    // AM or PM
    a: {
      priority: 80,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 'a':
          case 'aa':
          case 'aaa':
            return match.dayPeriod(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.dayPeriod(string, {
              width: 'narrow',
              context: 'formatting'
            });

          case 'aaaaa':
            return match.dayPeriod(string, {
              width: 'narrow',
              context: 'formatting'
            });

          case 'aaaa':
          default:
            return match.dayPeriod(string, {
              width: 'wide',
              context: 'formatting'
            }) || match.dayPeriod(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.dayPeriod(string, {
              width: 'narrow',
              context: 'formatting'
            });
        }
      },
      set: function (date, _flags, value, _options) {
        date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['b', 'B', 'H', 'K', 'k', 't', 'T']
    },
    // AM, PM, midnight
    b: {
      priority: 80,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 'b':
          case 'bb':
          case 'bbb':
            return match.dayPeriod(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.dayPeriod(string, {
              width: 'narrow',
              context: 'formatting'
            });

          case 'bbbbb':
            return match.dayPeriod(string, {
              width: 'narrow',
              context: 'formatting'
            });

          case 'bbbb':
          default:
            return match.dayPeriod(string, {
              width: 'wide',
              context: 'formatting'
            }) || match.dayPeriod(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.dayPeriod(string, {
              width: 'narrow',
              context: 'formatting'
            });
        }
      },
      set: function (date, _flags, value, _options) {
        date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['a', 'B', 'H', 'K', 'k', 't', 'T']
    },
    // in the morning, in the afternoon, in the evening, at night
    B: {
      priority: 80,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 'B':
          case 'BB':
          case 'BBB':
            return match.dayPeriod(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.dayPeriod(string, {
              width: 'narrow',
              context: 'formatting'
            });

          case 'BBBBB':
            return match.dayPeriod(string, {
              width: 'narrow',
              context: 'formatting'
            });

          case 'BBBB':
          default:
            return match.dayPeriod(string, {
              width: 'wide',
              context: 'formatting'
            }) || match.dayPeriod(string, {
              width: 'abbreviated',
              context: 'formatting'
            }) || match.dayPeriod(string, {
              width: 'narrow',
              context: 'formatting'
            });
        }
      },
      set: function (date, _flags, value, _options) {
        date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['a', 'b', 't', 'T']
    },
    // Hour [1-12]
    h: {
      priority: 70,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 'h':
            return parseNumericPattern(numericPatterns.hour12h, string);

          case 'ho':
            return match.ordinalNumber(string, {
              unit: 'hour'
            });

          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function (_date, value, _options) {
        return value >= 1 && value <= 12;
      },
      set: function (date, _flags, value, _options) {
        var isPM = date.getUTCHours() >= 12;

        if (isPM && value < 12) {
          date.setUTCHours(value + 12, 0, 0, 0);
        } else if (!isPM && value === 12) {
          date.setUTCHours(0, 0, 0, 0);
        } else {
          date.setUTCHours(value, 0, 0, 0);
        }

        return date;
      },
      incompatibleTokens: ['H', 'K', 'k', 't', 'T']
    },
    // Hour [0-23]
    H: {
      priority: 70,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 'H':
            return parseNumericPattern(numericPatterns.hour23h, string);

          case 'Ho':
            return match.ordinalNumber(string, {
              unit: 'hour'
            });

          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function (_date, value, _options) {
        return value >= 0 && value <= 23;
      },
      set: function (date, _flags, value, _options) {
        date.setUTCHours(value, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['a', 'b', 'h', 'K', 'k', 't', 'T']
    },
    // Hour [0-11]
    K: {
      priority: 70,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 'K':
            return parseNumericPattern(numericPatterns.hour11h, string);

          case 'Ko':
            return match.ordinalNumber(string, {
              unit: 'hour'
            });

          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function (_date, value, _options) {
        return value >= 0 && value <= 11;
      },
      set: function (date, _flags, value, _options) {
        var isPM = date.getUTCHours() >= 12;

        if (isPM && value < 12) {
          date.setUTCHours(value + 12, 0, 0, 0);
        } else {
          date.setUTCHours(value, 0, 0, 0);
        }

        return date;
      },
      incompatibleTokens: ['a', 'b', 'h', 'H', 'k', 't', 'T']
    },
    // Hour [1-24]
    k: {
      priority: 70,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 'k':
            return parseNumericPattern(numericPatterns.hour24h, string);

          case 'ko':
            return match.ordinalNumber(string, {
              unit: 'hour'
            });

          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function (_date, value, _options) {
        return value >= 1 && value <= 24;
      },
      set: function (date, _flags, value, _options) {
        var hours = value <= 24 ? value % 24 : value;
        date.setUTCHours(hours, 0, 0, 0);
        return date;
      },
      incompatibleTokens: ['a', 'b', 'h', 'H', 'K', 't', 'T']
    },
    // Minute
    m: {
      priority: 60,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 'm':
            return parseNumericPattern(numericPatterns.minute, string);

          case 'mo':
            return match.ordinalNumber(string, {
              unit: 'minute'
            });

          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function (_date, value, _options) {
        return value >= 0 && value <= 59;
      },
      set: function (date, _flags, value, _options) {
        date.setUTCMinutes(value, 0, 0);
        return date;
      },
      incompatibleTokens: ['t', 'T']
    },
    // Second
    s: {
      priority: 50,
      parse: function (string, token, match, _options) {
        switch (token) {
          case 's':
            return parseNumericPattern(numericPatterns.second, string);

          case 'so':
            return match.ordinalNumber(string, {
              unit: 'second'
            });

          default:
            return parseNDigits(token.length, string);
        }
      },
      validate: function (_date, value, _options) {
        return value >= 0 && value <= 59;
      },
      set: function (date, _flags, value, _options) {
        date.setUTCSeconds(value, 0);
        return date;
      },
      incompatibleTokens: ['t', 'T']
    },
    // Fraction of second
    S: {
      priority: 30,
      parse: function (string, token, _match, _options) {
        var valueCallback = function (value) {
          return Math.floor(value * Math.pow(10, -token.length + 3));
        };

        return parseNDigits(token.length, string, valueCallback);
      },
      set: function (date, _flags, value, _options) {
        date.setUTCMilliseconds(value);
        return date;
      },
      incompatibleTokens: ['t', 'T']
    },
    // Timezone (ISO-8601. +00:00 is `'Z'`)
    X: {
      priority: 10,
      parse: function (string, token, _match, _options) {
        switch (token) {
          case 'X':
            return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);

          case 'XX':
            return parseTimezonePattern(timezonePatterns.basic, string);

          case 'XXXX':
            return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);

          case 'XXXXX':
            return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);

          case 'XXX':
          default:
            return parseTimezonePattern(timezonePatterns.extended, string);
        }
      },
      set: function (date, flags, value, _options) {
        if (flags.timestampIsSet) {
          return date;
        }

        return new Date(date.getTime() - value);
      },
      incompatibleTokens: ['t', 'T', 'x']
    },
    // Timezone (ISO-8601)
    x: {
      priority: 10,
      parse: function (string, token, _match, _options) {
        switch (token) {
          case 'x':
            return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);

          case 'xx':
            return parseTimezonePattern(timezonePatterns.basic, string);

          case 'xxxx':
            return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);

          case 'xxxxx':
            return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);

          case 'xxx':
          default:
            return parseTimezonePattern(timezonePatterns.extended, string);
        }
      },
      set: function (date, flags, value, _options) {
        if (flags.timestampIsSet) {
          return date;
        }

        return new Date(date.getTime() - value);
      },
      incompatibleTokens: ['t', 'T', 'X']
    },
    // Seconds timestamp
    t: {
      priority: 40,
      parse: function (string, _token, _match, _options) {
        return parseAnyDigitsSigned(string);
      },
      set: function (_date, _flags, value, _options) {
        return [new Date(value * 1000), {
          timestampIsSet: true
        }];
      },
      incompatibleTokens: '*'
    },
    // Milliseconds timestamp
    T: {
      priority: 20,
      parse: function (string, _token, _match, _options) {
        return parseAnyDigitsSigned(string);
      },
      set: function (_date, _flags, value, _options) {
        return [new Date(value), {
          timestampIsSet: true
        }];
      },
      incompatibleTokens: '*'
    }
  };
  var _default = parsers;
  exports.default = _default;
  module.exports = exports.default;
});

var parse_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = parse;

  var _index = _interopRequireDefault(enUS);

  var _index2 = _interopRequireDefault(subMilliseconds_1);

  var _index3 = _interopRequireDefault(toDate_1);

  var _index4 = _interopRequireDefault(assign_1);

  var _index5 = _interopRequireDefault(longFormatters_1);

  var _index6 = _interopRequireDefault(getTimezoneOffsetInMilliseconds_1);

  var _index8 = _interopRequireDefault(toInteger_1);

  var _index9 = _interopRequireDefault(parsers_1);

  var _index10 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var TIMEZONE_UNIT_PRIORITY = 10; // This RegExp consists of three parts separated by `|`:
  // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
  //   (one of the certain letters followed by `o`)
  // - (\w)\1* matches any sequences of the same letter
  // - '' matches two quote characters in a row
  // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
  //   except a single quote symbol, which ends the sequence.
  //   Two quote characters do not end the sequence.
  //   If there is no matching single quote
  //   then the sequence will continue until the end of the string.
  // - . matches any single character unmatched by previous parts of the RegExps

  var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
  // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

  var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  var escapedStringRegExp = /^'([^]*?)'?$/;
  var doubleQuoteRegExp = /''/g;
  var notWhitespaceRegExp = /\S/;
  var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
  /**
   * @name parse
   * @category Common Helpers
   * @summary Parse the date.
   *
   * @description
   * Return the date parsed from string using the given format string.
   *
   * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
   * > See: https://git.io/fxCyr
   *
   * The characters in the format string wrapped between two single quotes characters (') are escaped.
   * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
   *
   * Format of the format string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   * with a few additions (see note 5 below the table).
   *
   * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
   * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
   *
   * ```javascript
   * parse('23 AM', 'HH a', new Date())
   * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
   * ```
   *
   * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
   *
   * Accepted format string patterns:
   * | Unit                            |Prior| Pattern | Result examples                   | Notes |
   * |---------------------------------|-----|---------|-----------------------------------|-------|
   * | Era                             | 140 | G..GGG  | AD, BC                            |       |
   * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
   * |                                 |     | GGGGG   | A, B                              |       |
   * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
   * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
   * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
   * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
   * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
   * |                                 |     | yyyyy   | ...                               | 2,4   |
   * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
   * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
   * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
   * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
   * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
   * |                                 |     | YYYYY   | ...                               | 2,4   |
   * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
   * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
   * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
   * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
   * |                                 |     | RRRRR   | ...                               | 2,4,5 |
   * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
   * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
   * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
   * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
   * |                                 |     | uuuuu   | ...                               | 2,4   |
   * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
   * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
   * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
   * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
   * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
   * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
   * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
   * |                                 |     | qq      | 01, 02, 03, 04                    |       |
   * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
   * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
   * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
   * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
   * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
   * |                                 |     | MM      | 01, 02, ..., 12                   |       |
   * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
   * |                                 |     | MMMM    | January, February, ..., December  | 2     |
   * |                                 |     | MMMMM   | J, F, ..., D                      |       |
   * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
   * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
   * |                                 |     | LL      | 01, 02, ..., 12                   |       |
   * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
   * |                                 |     | LLLL    | January, February, ..., December  | 2     |
   * |                                 |     | LLLLL   | J, F, ..., D                      |       |
   * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
   * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
   * |                                 |     | ww      | 01, 02, ..., 53                   |       |
   * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
   * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
   * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
   * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
   * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
   * |                                 |     | dd      | 01, 02, ..., 31                   |       |
   * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
   * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
   * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
   * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
   * |                                 |     | DDDD    | ...                               | 2     |
   * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
   * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
   * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
   * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
   * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
   * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
   * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
   * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
   * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 5     |
   * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
   * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
   * |                                 |     | ee      | 02, 03, ..., 01                   |       |
   * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
   * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
   * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
   * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
   * |                                 |     | cc      | 02, 03, ..., 01                   |       |
   * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
   * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
   * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
   * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
   * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
   * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
   * |                                 |     | aaaaa   | a, p                              |       |
   * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
   * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
   * |                                 |     | bbbbb   | a, p, n, mi                       |       |
   * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
   * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
   * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
   * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
   * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
   * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
   * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
   * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
   * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
   * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
   * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
   * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
   * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
   * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
   * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
   * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
   * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
   * |                                 |     | mm      | 00, 01, ..., 59                   |       |
   * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
   * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
   * |                                 |     | ss      | 00, 01, ..., 59                   |       |
   * | Seconds timestamp               |  40 | t       | 512969520                         |       |
   * |                                 |     | tt      | ...                               | 2     |
   * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
   * |                                 |     | SS      | 00, 01, ..., 99                   |       |
   * |                                 |     | SSS     | 000, 0001, ..., 999               |       |
   * |                                 |     | SSSS    | ...                               | 2     |
   * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
   * |                                 |     | TT      | ...                               | 2     |
   * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
   * |                                 |     | XX      | -0800, +0530, Z                   |       |
   * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
   * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
   * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
   * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
   * |                                 |     | xx      | -0800, +0530, +0000               |       |
   * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
   * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
   * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
   * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
   * |                                 |     | PP      | May 29, 1453                      |       |
   * |                                 |     | PPP     | May 29th, 1453                    |       |
   * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
   * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
   * |                                 |     | pp      | 12:00:00 AM                       |       |
   * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
   * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
   * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
   * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
   * Notes:
   * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
   *    are the same as "stand-alone" units, but are different in some languages.
   *    "Formatting" units are declined according to the rules of the language
   *    in the context of a date. "Stand-alone" units are always nominative singular.
   *    In `format` function, they will produce different result:
   *
   *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
   *
   *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
   *
   *    `parse` will try to match both formatting and stand-alone units interchangably.
   *
   * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
   *    the single quote characters (see below).
   *    If the sequence is longer than listed in table:
   *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
   *      as wide as the sequence
   *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
   *      These variations are marked with "2" in the last column of the table.
   *
   * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
   *    These tokens represent the shortest form of the quarter.
   *
   * 4. The main difference between `y` and `u` patterns are B.C. years:
   *
   *    | Year | `y` | `u` |
   *    |------|-----|-----|
   *    | AC 1 |   1 |   1 |
   *    | BC 1 |   1 |   0 |
   *    | BC 2 |   2 |  -1 |
   *
   *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
   *
   *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
   *
   *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
   *
   *    while `uu` will just assign the year as is:
   *
   *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
   *
   *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
   *
   *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
   *    except local week-numbering years are dependent on `options.weekStartsOn`
   *    and `options.firstWeekContainsDate` (compare [setISOWeekYear]{@link https://date-fns.org/docs/setISOWeekYear}
   *    and [setWeekYear]{@link https://date-fns.org/docs/setWeekYear}).
   *
   * 5. These patterns are not in the Unicode Technical Standard #35:
   *    - `i`: ISO day of week
   *    - `I`: ISO week of year
   *    - `R`: ISO week-numbering year
   *    - `o`: ordinal number modifier
   *    - `P`: long localized date
   *    - `p`: long localized time
   *
   * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
   *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
   *
   * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
   *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
   *
   * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
   *    on the given locale.
   *
   *    using `en-US` locale: `P` => `MM/dd/yyyy`
   *    using `en-US` locale: `p` => `hh:mm a`
   *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
   *    using `pt-BR` locale: `p` => `HH:mm`
   *
   * Values will be assigned to the date in the descending order of its unit's priority.
   * Units of an equal priority overwrite each other in the order of appearance.
   *
   * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
   * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
   *
   * `referenceDate` must be passed for correct work of the function.
   * If you're not sure which `referenceDate` to supply, create a new instance of Date:
   * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
   * In this case parsing will be done in the context of the current date.
   * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
   * then `Invalid Date` will be returned.
   *
   * The result may vary by locale.
   *
   * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
   *
   * If parsing failed, `Invalid Date` will be returned.
   * Invalid Date is a Date, whose time value is NaN.
   * Time value of Date: http://es5.github.io/#x15.9.1.1
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * - Old `parse` was renamed to `toDate`.
   *   Now `parse` is a new function which parses a string using a provided format.
   *
   *   ```javascript
   *   // Before v2.0.0
   *   parse('2016-01-01')
   *
   *   // v2.0.0 onward (toDate no longer accepts a string)
   *   toDate(1392098430000) // Unix to timestamp
   *   toDate(new Date(2014, 1, 11, 11, 30, 30)) // Cloning the date
   *   parse('2016-01-01', 'yyyy-MM-dd', new Date())
   *   ```
   *
   * @param {String} dateString - the string to parse
   * @param {String} formatString - the string of tokens
   * @param {Date|Number} referenceDate - defines values missing from the parsed dateString
   * @param {Object} [options] - an object with options.
   * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
   * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
   * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
   * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
   *   see: https://git.io/fxCyr
   * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
   *   see: https://git.io/fxCyr
   * @returns {Date} the parsed date
   * @throws {TypeError} 3 arguments required
   * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
   * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
   * @throws {RangeError} `options.locale` must contain `match` property
   * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
   * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
   * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
   * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
   * @throws {RangeError} format string contains an unescaped latin alphabet character
   *
   * @example
   * // Parse 11 February 2014 from middle-endian format:
   * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
   * //=> Tue Feb 11 2014 00:00:00
   *
   * @example
   * // Parse 28th of February in Esperanto locale in the context of 2010 year:
   * import eo from 'date-fns/locale/eo'
   * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
   *   locale: eo
   * })
   * //=> Sun Feb 28 2010 00:00:00
   */

  function parse(dirtyDateString, dirtyFormatString, dirtyReferenceDate, dirtyOptions) {
    (0, _index10.default)(3, arguments);
    var dateString = String(dirtyDateString);
    var formatString = String(dirtyFormatString);
    var options = dirtyOptions || {};
    var locale = options.locale || _index.default;

    if (!locale.match) {
      throw new RangeError('locale must contain match property');
    }

    var localeFirstWeekContainsDate = locale.options && locale.options.firstWeekContainsDate;
    var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index8.default)(localeFirstWeekContainsDate);
    var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index8.default)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
      throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
    }

    var localeWeekStartsOn = locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index8.default)(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index8.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }

    if (formatString === '') {
      if (dateString === '') {
        return (0, _index3.default)(dirtyReferenceDate);
      } else {
        return new Date(NaN);
      }
    }

    var subFnOptions = {
      firstWeekContainsDate: firstWeekContainsDate,
      weekStartsOn: weekStartsOn,
      locale: locale // If timezone isn't specified, it will be set to the system timezone

    };
    var setters = [{
      priority: TIMEZONE_UNIT_PRIORITY,
      subPriority: -1,
      set: dateToSystemTimezone,
      index: 0
    }];
    var i;
    var tokens = formatString.match(longFormattingTokensRegExp).map(function (substring) {
      var firstCharacter = substring[0];

      if (firstCharacter === 'p' || firstCharacter === 'P') {
        var longFormatter = _index5.default[firstCharacter];
        return longFormatter(substring, locale.formatLong, subFnOptions);
      }

      return substring;
    }).join('').match(formattingTokensRegExp);
    var usedTokens = [];

    for (i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (!options.useAdditionalWeekYearTokens && (0, protectedTokens.isProtectedWeekYearToken)(token)) {
        (0, protectedTokens.throwProtectedError)(token, formatString, dirtyDateString);
      }

      if (!options.useAdditionalDayOfYearTokens && (0, protectedTokens.isProtectedDayOfYearToken)(token)) {
        (0, protectedTokens.throwProtectedError)(token, formatString, dirtyDateString);
      }

      var firstCharacter = token[0];
      var parser = _index9.default[firstCharacter];

      if (parser) {
        var incompatibleTokens = parser.incompatibleTokens;

        if (Array.isArray(incompatibleTokens)) {
          var incompatibleToken = void 0;

          for (var _i = 0; _i < usedTokens.length; _i++) {
            var usedToken = usedTokens[_i].token;

            if (incompatibleTokens.indexOf(usedToken) !== -1 || usedToken === firstCharacter) {
              incompatibleToken = usedTokens[_i];
              break;
            }
          }

          if (incompatibleToken) {
            throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
          }
        } else if (parser.incompatibleTokens === '*' && usedTokens.length) {
          throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
        }

        usedTokens.push({
          token: firstCharacter,
          fullToken: token
        });
        var parseResult = parser.parse(dateString, token, locale.match, subFnOptions);

        if (!parseResult) {
          return new Date(NaN);
        }

        setters.push({
          priority: parser.priority,
          subPriority: parser.subPriority || 0,
          set: parser.set,
          validate: parser.validate,
          value: parseResult.value,
          index: setters.length
        });
        dateString = parseResult.rest;
      } else {
        if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
          throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
        } // Replace two single quote characters with one single quote character


        if (token === "''") {
          token = "'";
        } else if (firstCharacter === "'") {
          token = cleanEscapedString(token);
        } // Cut token from string, or, if string doesn't match the token, return Invalid Date


        if (dateString.indexOf(token) === 0) {
          dateString = dateString.slice(token.length);
        } else {
          return new Date(NaN);
        }
      }
    } // Check if the remaining input contains something other than whitespace


    if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
      return new Date(NaN);
    }

    var uniquePrioritySetters = setters.map(function (setter) {
      return setter.priority;
    }).sort(function (a, b) {
      return b - a;
    }).filter(function (priority, index, array) {
      return array.indexOf(priority) === index;
    }).map(function (priority) {
      return setters.filter(function (setter) {
        return setter.priority === priority;
      }).sort(function (a, b) {
        return b.subPriority - a.subPriority;
      });
    }).map(function (setterArray) {
      return setterArray[0];
    });
    var date = (0, _index3.default)(dirtyReferenceDate);

    if (isNaN(date)) {
      return new Date(NaN);
    } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
    // This ensures that when UTC functions will be implemented, locales will be compatible with them.
    // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/37


    var utcDate = (0, _index2.default)(date, (0, _index6.default)(date));
    var flags = {};

    for (i = 0; i < uniquePrioritySetters.length; i++) {
      var setter = uniquePrioritySetters[i];

      if (setter.validate && !setter.validate(utcDate, setter.value, subFnOptions)) {
        return new Date(NaN);
      }

      var result = setter.set(utcDate, flags, setter.value, subFnOptions); // Result is tuple (date, flags)

      if (result[0]) {
        utcDate = result[0];
        (0, _index4.default)(flags, result[1]); // Result is date
      } else {
        utcDate = result;
      }
    }

    return utcDate;
  }

  function dateToSystemTimezone(date, flags) {
    if (flags.timestampIsSet) {
      return date;
    }

    var convertedDate = new Date(0);
    convertedDate.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    convertedDate.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
    return convertedDate;
  }

  function cleanEscapedString(input) {
    return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
  }

  module.exports = exports.default;
});
var dateFnsParse = /*@__PURE__*/getDefaultExportFromCjs(parse_1);

var setHours_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setHours;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name setHours
   * @category Hour Helpers
   * @summary Set the hours to the given date.
   *
   * @description
   * Set the hours to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} hours - the hours of the new date
   * @returns {Date} the new date with the hours set
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Set 4 hours to 1 September 2014 11:30:00:
   * var result = setHours(new Date(2014, 8, 1, 11, 30), 4)
   * //=> Mon Sep 01 2014 04:30:00
   */


  function setHours(dirtyDate, dirtyHours) {
    (0, _index3.default)(2, arguments);
    var date = (0, _index2.default)(dirtyDate);
    var hours = (0, _index.default)(dirtyHours);
    date.setHours(hours);
    return date;
  }

  module.exports = exports.default;
});
var setHours = /*@__PURE__*/getDefaultExportFromCjs(setHours_1);

var setMinutes_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setMinutes;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name setMinutes
   * @category Minute Helpers
   * @summary Set the minutes to the given date.
   *
   * @description
   * Set the minutes to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} minutes - the minutes of the new date
   * @returns {Date} the new date with the minutes set
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Set 45 minutes to 1 September 2014 11:30:40:
   * var result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
   * //=> Mon Sep 01 2014 11:45:40
   */


  function setMinutes(dirtyDate, dirtyMinutes) {
    (0, _index3.default)(2, arguments);
    var date = (0, _index2.default)(dirtyDate);
    var minutes = (0, _index.default)(dirtyMinutes);
    date.setMinutes(minutes);
    return date;
  }

  module.exports = exports.default;
});
var setMinutes = /*@__PURE__*/getDefaultExportFromCjs(setMinutes_1);

var getDaysInMonth_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getDaysInMonth;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name getDaysInMonth
   * @category Month Helpers
   * @summary Get the number of days in a month of the given date.
   *
   * @description
   * Get the number of days in a month of the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the given date
   * @returns {Number} the number of days in a month
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // How many days are in February 2000?
   * const result = getDaysInMonth(new Date(2000, 1))
   * //=> 29
   */


  function getDaysInMonth(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var year = date.getFullYear();
    var monthIndex = date.getMonth();
    var lastDayOfMonth = new Date(0);
    lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
    lastDayOfMonth.setHours(0, 0, 0, 0);
    return lastDayOfMonth.getDate();
  }

  module.exports = exports.default;
});
var getDaysInMonth = /*@__PURE__*/getDefaultExportFromCjs(getDaysInMonth_1);

var setMonth_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setMonth;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(getDaysInMonth_1);

  var _index4 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name setMonth
   * @category Month Helpers
   * @summary Set the month to the given date.
   *
   * @description
   * Set the month to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} month - the month of the new date
   * @returns {Date} the new date with the month set
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Set February to 1 September 2014:
   * var result = setMonth(new Date(2014, 8, 1), 1)
   * //=> Sat Feb 01 2014 00:00:00
   */


  function setMonth(dirtyDate, dirtyMonth) {
    (0, _index4.default)(2, arguments);
    var date = (0, _index2.default)(dirtyDate);
    var month = (0, _index.default)(dirtyMonth);
    var year = date.getFullYear();
    var day = date.getDate();
    var dateWithDesiredMonth = new Date(0);
    dateWithDesiredMonth.setFullYear(year, month, 15);
    dateWithDesiredMonth.setHours(0, 0, 0, 0);
    var daysInMonth = (0, _index3.default)(dateWithDesiredMonth); // Set the last day of the new month
    // if the original date was the last day of the longer month

    date.setMonth(month, Math.min(day, daysInMonth));
    return date;
  }

  module.exports = exports.default;
});
var setMonth = /*@__PURE__*/getDefaultExportFromCjs(setMonth_1);

var getDay_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getDay;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name getDay
   * @category Weekday Helpers
   * @summary Get the day of the week of the given date.
   *
   * @description
   * Get the day of the week of the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the given date
   * @returns {0|1|2|3|4|5|6} the day of week, 0 represents Sunday
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // Which day of the week is 29 February 2012?
   * const result = getDay(new Date(2012, 1, 29))
   * //=> 3
   */


  function getDay(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    var day = date.getDay();
    return day;
  }

  module.exports = exports.default;
});
var getDay = /*@__PURE__*/getDefaultExportFromCjs(getDay_1);

var setSeconds_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setSeconds;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name setSeconds
   * @category Second Helpers
   * @summary Set the seconds to the given date.
   *
   * @description
   * Set the seconds to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} seconds - the seconds of the new date
   * @returns {Date} the new date with the seconds set
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Set 45 seconds to 1 September 2014 11:30:40:
   * var result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
   * //=> Mon Sep 01 2014 11:30:45
   */


  function setSeconds(dirtyDate, dirtySeconds) {
    (0, _index3.default)(2, arguments);
    var date = (0, _index2.default)(dirtyDate);
    var seconds = (0, _index.default)(dirtySeconds);
    date.setSeconds(seconds);
    return date;
  }

  module.exports = exports.default;
});
var setSeconds = /*@__PURE__*/getDefaultExportFromCjs(setSeconds_1);

var setYear_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setYear;

  var _index = _interopRequireDefault(toInteger_1);

  var _index2 = _interopRequireDefault(toDate_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name setYear
   * @category Year Helpers
   * @summary Set the year to the given date.
   *
   * @description
   * Set the year to the given date.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the date to be changed
   * @param {Number} year - the year of the new date
   * @returns {Date} the new date with the year set
   * @throws {TypeError} 2 arguments required
   *
   * @example
   * // Set year 2013 to 1 September 2014:
   * var result = setYear(new Date(2014, 8, 1), 2013)
   * //=> Sun Sep 01 2013 00:00:00
   */


  function setYear(dirtyDate, dirtyYear) {
    (0, _index3.default)(2, arguments);
    var date = (0, _index2.default)(dirtyDate);
    var year = (0, _index.default)(dirtyYear); // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date

    if (isNaN(date)) {
      return new Date(NaN);
    }

    date.setFullYear(year);
    return date;
  }

  module.exports = exports.default;
});
var setYear = /*@__PURE__*/getDefaultExportFromCjs(setYear_1);

var startOfMonth_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfMonth;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name startOfMonth
   * @category Month Helpers
   * @summary Return the start of a month for the given date.
   *
   * @description
   * Return the start of a month for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @returns {Date} the start of a month
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // The start of a month for 2 September 2014 11:55:00:
   * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Mon Sep 01 2014 00:00:00
   */


  function startOfMonth(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var date = (0, _index.default)(dirtyDate);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  module.exports = exports.default;
});
var startOfMonth = /*@__PURE__*/getDefaultExportFromCjs(startOfMonth_1);

var startOfWeek_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfWeek;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(toInteger_1);

  var _index3 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name startOfWeek
   * @category Week Helpers
   * @summary Return the start of a week for the given date.
   *
   * @description
   * Return the start of a week for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @param {Object} [options] - an object with options.
   * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
   * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
   * @returns {Date} the start of a week
   * @throws {TypeError} 1 argument required
   * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
   *
   * @example
   * // The start of a week for 2 September 2014 11:55:00:
   * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
   * //=> Sun Aug 31 2014 00:00:00
   *
   * @example
   * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
   * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
   * //=> Mon Sep 01 2014 00:00:00
   */


  function startOfWeek(dirtyDate, dirtyOptions) {
    (0, _index3.default)(1, arguments);
    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index2.default)(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index2.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
      throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }

    var date = (0, _index.default)(dirtyDate);
    var day = date.getDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setDate(date.getDate() - diff);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  module.exports = exports.default;
});
var startOfWeek = /*@__PURE__*/getDefaultExportFromCjs(startOfWeek_1);

var startOfYear_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startOfYear;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name startOfYear
   * @category Year Helpers
   * @summary Return the start of a year for the given date.
   *
   * @description
   * Return the start of a year for the given date.
   * The result will be in the local timezone.
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * @param {Date|Number} date - the original date
   * @returns {Date} the start of a year
   * @throws {TypeError} 1 argument required
   *
   * @example
   * // The start of a year for 2 September 2014 11:55:00:
   * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
   * //=> Wed Jan 01 2014 00:00:00
   */


  function startOfYear(dirtyDate) {
    (0, _index2.default)(1, arguments);
    var cleanDate = (0, _index.default)(dirtyDate);
    var date = new Date(0);
    date.setFullYear(cleanDate.getFullYear(), 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  module.exports = exports.default;
});
var startOfYear = /*@__PURE__*/getDefaultExportFromCjs(startOfYear_1);

var isWithinInterval_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isWithinInterval;

  var _index = _interopRequireDefault(toDate_1);

  var _index2 = _interopRequireDefault(requiredArgs_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * @name isWithinInterval
   * @category Interval Helpers
   * @summary Is the given date within the interval?
   *
   * @description
   * Is the given date within the interval? (Including start and end.)
   *
   * ### v2.0.0 breaking changes:
   *
   * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
   *
   * - The function was renamed from `isWithinRange` to `isWithinInterval`.
   *   This change was made to mirror the use of the word "interval" in standard ISO 8601:2004 terminology:
   *
   *   ```
   *   2.1.3
   *   time interval
   *   part of the time axis limited by two instants
   *   ```
   *
   *   Also, this function now accepts an object with `start` and `end` properties
   *   instead of two arguments as an interval.
   *   This function now throws `RangeError` if the start of the interval is after its end
   *   or if any date in the interval is `Invalid Date`.
   *
   *   ```javascript
   *   // Before v2.0.0
   *
   *   isWithinRange(
   *     new Date(2014, 0, 3),
   *     new Date(2014, 0, 1), new Date(2014, 0, 7)
   *   )
   *
   *   // v2.0.0 onward
   *
   *   isWithinInterval(
   *     new Date(2014, 0, 3),
   *     { start: new Date(2014, 0, 1), end: new Date(2014, 0, 7) }
   *   )
   *   ```
   *
   * @param {Date|Number} date - the date to check
   * @param {Interval} interval - the interval to check
   * @returns {Boolean} the date is within the interval
   * @throws {TypeError} 2 arguments required
   * @throws {RangeError} The start of an interval cannot be after its end
   * @throws {RangeError} Date in interval cannot be `Invalid Date`
   *
   * @example
   * // For the date within the interval:
   * isWithinInterval(new Date(2014, 0, 3), {
   *   start: new Date(2014, 0, 1),
   *   end: new Date(2014, 0, 7)
   * })
   * //=> true
   *
   * @example
   * // For the date outside of the interval:
   * isWithinInterval(new Date(2014, 0, 10), {
   *   start: new Date(2014, 0, 1),
   *   end: new Date(2014, 0, 7)
   * })
   * //=> false
   *
   * @example
   * // For date equal to interval start:
   * isWithinInterval(date, { start, end: date }) // => true
   *
   * @example
   * // For date equal to interval end:
   * isWithinInterval(date, { start: date, end }) // => true
   */


  function isWithinInterval(dirtyDate, dirtyInterval) {
    (0, _index2.default)(2, arguments);
    var interval = dirtyInterval || {};
    var time = (0, _index.default)(dirtyDate).getTime();
    var startTime = (0, _index.default)(interval.start).getTime();
    var endTime = (0, _index.default)(interval.end).getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

    if (!(startTime <= endTime)) {
      throw new RangeError('Invalid interval');
    }

    return time >= startTime && time <= endTime;
  }

  module.exports = exports.default;
});
var isWithinInterval = /*@__PURE__*/getDefaultExportFromCjs(isWithinInterval_1);

var defaultFormats = {
  dayOfMonth: "d",
  fullDate: "PP",
  fullDateWithWeekday: "PPPP",
  fullDateTime: "PP p",
  fullDateTime12h: "PP hh:mm aaa",
  fullDateTime24h: "PP HH:mm",
  fullTime: "p",
  fullTime12h: "hh:mm aaa",
  fullTime24h: "HH:mm",
  hours12h: "hh",
  hours24h: "HH",
  keyboardDate: "P",
  keyboardDateTime: "P p",
  keyboardDateTime12h: "P hh:mm aaa",
  keyboardDateTime24h: "P HH:mm",
  minutes: "mm",
  month: "LLLL",
  monthAndDate: "MMMM d",
  monthAndYear: "LLLL yyyy",
  monthShort: "MMM",
  weekday: "EEEE",
  weekdayShort: "EEE",
  normalDate: "d MMMM",
  normalDateWithWeekday: "EEE, MMM d",
  seconds: "ss",
  shortDate: "MMM d",
  year: "yyyy"
};

var DateFnsUtils =
/** @class */
function () {
  function DateFnsUtils(_a) {
    var _this = this;

    var _b = _a === void 0 ? {} : _a,
        locale = _b.locale,
        formats = _b.formats;

    this.lib = "date-fns"; // Note: date-fns input types are more lenient than this adapter, so we need to expose our more
    // strict signature and delegate to the more lenient signature. Otherwise, we have downstream type errors upon usage.

    this.is12HourCycleInCurrentLocale = function () {
      if (_this.locale) {
        return /a/.test(_this.locale.formatLong.time());
      } // By default date-fns is using en-US locale with am/pm enabled


      return true;
    };

    this.getFormatHelperText = function (format) {
      // @see https://github.com/date-fns/date-fns/blob/master/src/format/index.js#L31
      var longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
      var locale = _this.locale || defaultLocale;
      return format.match(longFormatRegexp).map(function (token) {
        var firstCharacter = token[0];

        if (firstCharacter === "p" || firstCharacter === "P") {
          var longFormatter = longFormatters[firstCharacter];
          return longFormatter(token, locale.formatLong, {});
        }

        return token;
      }).join("").replace(/(aaa|aa|a)/g, "(a|p)m").toLocaleLowerCase();
    };

    this.getCurrentLocaleCode = function () {
      var _a;

      return ((_a = _this.locale) === null || _a === void 0 ? void 0 : _a.code) || "en-US";
    };

    this.addSeconds = function (value, count) {
      return addSeconds(value, count);
    };

    this.addMinutes = function (value, count) {
      return addMinutes(value, count);
    };

    this.addHours = function (value, count) {
      return addHours(value, count);
    };

    this.addDays = function (value, count) {
      return addDays(value, count);
    };

    this.addWeeks = function (value, count) {
      return addWeeks(value, count);
    };

    this.addMonths = function (value, count) {
      return addMonths(value, count);
    };

    this.isValid = function (value) {
      return isValid(_this.date(value));
    };

    this.getDiff = function (value, comparing, unit) {
      switch (unit) {
        case "years":
          return differenceInYears(value, _this.date(comparing));

        case "quarters":
          return differenceInQuarters(value, _this.date(comparing));

        case "months":
          return differenceInMonths(value, _this.date(comparing));

        case "weeks":
          return differenceInWeeks(value, _this.date(comparing));

        case "days":
          return differenceInDays(value, _this.date(comparing));

        case "hours":
          return differenceInHours(value, _this.date(comparing));

        case "minutes":
          return differenceInMinutes(value, _this.date(comparing));

        case "seconds":
          return differenceInSeconds(value, _this.date(comparing));

        default:
          {
            return differenceInMilliseconds(value, _this.date(comparing));
          }
      }
    };

    this.isAfter = function (value, comparing) {
      return isAfter(value, comparing);
    };

    this.isBefore = function (value, comparing) {
      return isBefore(value, comparing);
    };

    this.startOfDay = function (value) {
      return startOfDay(value);
    };

    this.endOfDay = function (value) {
      return endOfDay(value);
    };

    this.getHours = function (value) {
      return getHours$1(value);
    };

    this.setHours = function (value, count) {
      return setHours(value, count);
    };

    this.setMinutes = function (value, count) {
      return setMinutes(value, count);
    };

    this.getSeconds = function (value) {
      return getSeconds(value);
    };

    this.setSeconds = function (value, count) {
      return setSeconds(value, count);
    };

    this.isSameDay = function (value, comparing) {
      return isSameDay(value, comparing);
    };

    this.isSameMonth = function (value, comparing) {
      return isSameMonth(value, comparing);
    };

    this.isSameYear = function (value, comparing) {
      return isSameYear(value, comparing);
    };

    this.isSameHour = function (value, comparing) {
      return isSameHour(value, comparing);
    };

    this.startOfMonth = function (value) {
      return startOfMonth(value);
    };

    this.endOfMonth = function (value) {
      return endOfMonth(value);
    };

    this.startOfWeek = function (value) {
      return startOfWeek(value, {
        locale: _this.locale
      });
    };

    this.endOfWeek = function (value) {
      return endOfWeek(value, {
        locale: _this.locale
      });
    };

    this.getYear = function (value) {
      return getYear(value);
    };

    this.setYear = function (value, count) {
      return setYear(value, count);
    };

    this.date = function (value) {
      if (typeof value === "undefined") {
        return new Date();
      }

      if (value === null) {
        return null;
      }

      return new Date(value);
    };

    this.toJsDate = function (value) {
      return value;
    };

    this.parse = function (value, formatString) {
      if (value === "") {
        return null;
      }

      return dateFnsParse(value, formatString, new Date(), {
        locale: _this.locale
      });
    };

    this.format = function (date, formatKey) {
      return _this.formatByString(date, _this.formats[formatKey]);
    };

    this.formatByString = function (date, formatString) {
      return format(date, formatString, {
        locale: _this.locale
      });
    };

    this.isEqual = function (date, comparing) {
      if (date === null && comparing === null) {
        return true;
      }

      return isEqual(date, comparing);
    };

    this.isNull = function (date) {
      return date === null;
    };

    this.isAfterDay = function (date, value) {
      return isAfter(date, endOfDay(value));
    };

    this.isBeforeDay = function (date, value) {
      return isBefore(date, startOfDay(value));
    };

    this.isBeforeYear = function (date, value) {
      return isBefore(date, startOfYear(value));
    };

    this.isAfterYear = function (date, value) {
      return isAfter(date, endOfYear(value));
    };

    this.isWithinRange = function (date, _a) {
      var start = _a[0],
          end = _a[1];
      return isWithinInterval(date, {
        start: start,
        end: end
      });
    };

    this.formatNumber = function (numberToFormat) {
      return numberToFormat;
    };

    this.getMinutes = function (date) {
      return date.getMinutes();
    };

    this.getMonth = function (date) {
      return date.getMonth();
    };

    this.getDaysInMonth = function (date) {
      return getDaysInMonth(date);
    };

    this.setMonth = function (date, count) {
      return setMonth(date, count);
    };

    this.getMeridiemText = function (ampm) {
      return ampm === "am" ? "AM" : "PM";
    };

    this.getNextMonth = function (date) {
      return addMonths(date, 1);
    };

    this.getPreviousMonth = function (date) {
      return addMonths(date, -1);
    };

    this.getMonthArray = function (date) {
      var firstMonth = startOfYear(date);
      var monthArray = [firstMonth];

      while (monthArray.length < 12) {
        var prevMonth = monthArray[monthArray.length - 1];
        monthArray.push(_this.getNextMonth(prevMonth));
      }

      return monthArray;
    };

    this.mergeDateAndTime = function (date, time) {
      return _this.setSeconds(_this.setMinutes(_this.setHours(date, _this.getHours(time)), _this.getMinutes(time)), _this.getSeconds(time));
    };

    this.getWeekdays = function () {
      var now = new Date();
      return eachDayOfInterval({
        start: startOfWeek(now, {
          locale: _this.locale
        }),
        end: endOfWeek(now, {
          locale: _this.locale
        })
      }).map(function (day) {
        return _this.formatByString(day, "EEEEEE");
      });
    };

    this.getWeekArray = function (date) {
      var start = startOfWeek(startOfMonth(date), {
        locale: _this.locale
      });
      var end = endOfWeek(endOfMonth(date), {
        locale: _this.locale
      });
      var count = 0;
      var current = start;
      var nestedWeeks = [];
      var lastDay = null;

      while (isBefore(current, end)) {
        var weekNumber = Math.floor(count / 7);
        nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
        var day = getDay(current);

        if (lastDay !== day) {
          lastDay = day;
          nestedWeeks[weekNumber].push(current);
          count += 1;
        }

        current = addDays(current, 1);
      }

      return nestedWeeks;
    };

    this.getYearRange = function (start, end) {
      var startDate = startOfYear(start);
      var endDate = endOfYear(end);
      var years = [];
      var current = startDate;

      while (isBefore(current, endDate)) {
        years.push(current);
        current = addYears(current, 1);
      }

      return years;
    };

    this.locale = locale;
    this.formats = Object.assign({}, defaultFormats, formats);
  }

  return DateFnsUtils;
}();

/**
 * Post settings edit panel.
 * @param props Props
 */
function PostEditOptionPanel(props) {
    var _a, _b;
    var contentEditContext = props.contentEditContext;
    var matches = useRouteMatch();
    var history = useHistory();
    var _c = __read(useState(!!props.contentEditContext.publishIn), 2), isReservationed = _c[0]; _c[1];
    function setcontentEditContextParam(key, value) {
        var _a;
        services.postEditService.setContent(contentEditContext.clone((_a = {}, _a[key] = value, _a)));
    }
    function selectMedia() {
        return __awaiter(this, void 0, void 0, function () {
            var path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, showMediaSelectionDialog()];
                    case 1:
                        path = _a.sent();
                        if (path) {
                            setcontentEditContextParam("thumbnail", path);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function publishAsync() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, confirmAsync("記事を公開しますがよろしいですか？", {
                            description: ""
                        })];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        if (!isReservationed) {
                            setcontentEditContextParam("publishIn", null);
                        }
                        services.postEditService.saveAsync();
                        history.push("/posts/" + matches.params.taxonomy);
                        return [2 /*return*/];
                }
            });
        });
    }
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(Box, __assign({ width: "100%", display: "flex", mt: 1 }, { children: [jsxRuntime.jsx(Select, __assign({ color: "primary", style: { flex: "1 1 auto" }, value: contentEditContext.status, onChange: function (e) { return setcontentEditContextParam("status", e.target.value); } }, { children: postStatusTypes.map(function (t) { return (jsxRuntime.jsx(MenuItem, __assign({ value: t.value }, { children: t.display }), t.value)); }) }), void 0),
                    jsxRuntime.jsx(Button, __assign({ style: { marginLeft: "8px" }, onClick: publishAsync, color: "primary", variant: "contained" }, { children: "\u6295\u7A3F" }), void 0)] }), void 0),
            jsxRuntime.jsx(Box, __assign({ mt: 3 }, { children: jsxRuntime.jsx(Divider, {}, void 0) }), void 0),
            contentEditContext.status !== StatusType.Drafting && (jsxRuntime.jsxs(Box, __assign({ width: "100%", mt: 3 }, { children: [jsxRuntime.jsx(Typography, __assign({ color: "textSecondary" }, { children: "\u516C\u958B\u6642\u9593\u4E88\u7D04" }), void 0),
                    isReservationed && jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(MuiPickersUtilsProvider, __assign({ utils: DateFnsUtils }, { children: [jsxRuntime.jsx(KeyboardDatePicker, { margin: "normal", id: "date-picker-dialog", label: "\u516C\u958B\u65E5", format: "MM/dd/yyyy", value: (_a = contentEditContext.publishIn) === null || _a === void 0 ? void 0 : _a.toJSDate(), onChange: function (e) { var _a; return setcontentEditContextParam("publishIn", DateTime_1.fromISO((_a = e === null || e === void 0 ? void 0 : e.toISOString()) !== null && _a !== void 0 ? _a : "")); }, KeyboardButtonProps: {
                                        "aria-label": "change date",
                                    } }, void 0),
                                jsxRuntime.jsx(KeyboardTimePicker, { margin: "normal", id: "time-picker", label: "\u516C\u958B\u6642\u9593", value: (_b = contentEditContext.publishIn) === null || _b === void 0 ? void 0 : _b.toJSDate(), onChange: function (e) { var _a; return setcontentEditContextParam("publishIn", DateTime_1.fromISO((_a = e === null || e === void 0 ? void 0 : e.toISOString()) !== null && _a !== void 0 ? _a : "")); }, KeyboardButtonProps: {
                                        "aria-label": "change time",
                                    } }, void 0)] }), void 0) }, void 0)] }), void 0)),
            jsxRuntime.jsxs(Box, __assign({ width: "100%", mt: 3 }, { children: [jsxRuntime.jsx(Typography, __assign({ color: "textSecondary", variant: "overline" }, { children: "\u30BF\u30A4\u30C8\u30EB" }), void 0),
                    jsxRuntime.jsx(TextField, { onChange: function (e) { return setcontentEditContextParam("title", e.target.value); }, placeholder: "\u65B0\u3057\u3044\u6295\u7A3F\u3067\u3059", fullWidth: true, value: contentEditContext.title, color: "primary" }, void 0)] }), void 0),
            jsxRuntime.jsxs(Box, __assign({ width: "100%", mt: 2 }, { children: [jsxRuntime.jsxs(Box, __assign({ display: "flex" }, { children: [jsxRuntime.jsx(Typography, __assign({ color: "textSecondary", variant: "overline" }, { children: "\u30B5\u30E0\u30CD\u30A4\u30EB" }), void 0),
                            jsxRuntime.jsx(Button, __assign({ variant: "text", color: "primary", size: "small", disabled: !contentEditContext.thumbnail, style: { marginLeft: "auto" }, onClick: function () { return setcontentEditContextParam("thumbnail", ""); } }, { children: "\u30AF\u30EA\u30A2" }), void 0)] }), void 0),
                    jsxRuntime.jsxs(Box, __assign({ height: "120px", width: "100%", mt: 1, overflow: "hidden", style: {
                            position: "relative",
                            borderRadius: "2px",
                            background: "rgba(127,127,127,0.09)",
                        } }, { children: [contentEditContext.thumbnail && jsxRuntime.jsx("img", { alt: "thumbnail", style: {
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                    WebkitUserSelect: "none"
                                }, src: axios.defaults.baseURL + contentEditContext.thumbnail }, void 0),
                            jsxRuntime.jsx(Button, __assign({ variant: "text", color: "primary", onClick: function () { return selectMedia(); }, style: {
                                    position: "absolute",
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    top: 0,
                                    height: "120px",
                                    width: "100%"
                                } }, { children: jsxRuntime.jsx(Icon, { children: "add" }, void 0) }), void 0)] }), void 0)] }), void 0),
            jsxRuntime.jsxs(Box, __assign({ mt: 2 }, { children: [jsxRuntime.jsx(Typography, __assign({ color: "textSecondary", variant: "overline" }, { children: "\u5099\u8003" }), void 0),
                    jsxRuntime.jsx(TextField, { multiline: true, rows: 6, variant: "filled", hiddenLabel: true, fullWidth: true, value: contentEditContext.description, onChange: function (e) { return setcontentEditContextParam("description", e.target.value); } }, void 0)] }), void 0),
            jsxRuntime.jsxs(Box, __assign({ mt: 2 }, { children: [jsxRuntime.jsx(Typography, __assign({ color: "textSecondary", variant: "overline" }, { children: "\u30E1\u30BF\u30C7\u30FC\u30BF" }), void 0),
                    jsxRuntime.jsx(TextField, { multiline: true, rows: 6, variant: "filled", hiddenLabel: true, fullWidth: true, value: contentEditContext.metadata, onChange: function (e) { return setcontentEditContextParam("metadata", e.target.value); } }, void 0)] }), void 0)] }, void 0));
}

function FieldEditor(props) {
    var field = props.field;
    var Element = editors[field.scheme.type].fieldEditor;
    if (Element) {
        return (jsxRuntime.jsx(Element, { field: field, onChange: props.onChange }, void 0));
    }
    return jsxRuntime.jsx(jsxRuntime.Fragment, {}, void 0);
}

function PostEditPage() {
    var _this = this;
    var postEditService = services.postEditService;
    var match = useRouteMatch();
    useEffect(function () {
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var postType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postEditService.clear();
                        return [4 /*yield*/, services.postManagementsService.fetchPostTypes(match.params.taxonomy)];
                    case 1:
                        _a.sent();
                        postType = services.postManagementsService.selected;
                        if (!postType) {
                            return [2 /*return*/];
                        }
                        if (match.params.taxonomy && match.params.contentId && match.params.contentId === "new") {
                            postEditService.initializeAsNewPost(postType.taxonomy);
                        }
                        else {
                            postEditService.fetchAsync(match.params.taxonomy, match.params.contentId);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    }, []);
    return jsxRuntime.jsx(ObserverComponent, { children: function () {
            var _a;
            function handleChangeField(f) {
                var content = postEditService.content;
                if (content) {
                    var _f = content.fields.find(function (x) { return x.schemeId === f.schemeId; });
                    if (!_f)
                        return;
                    var i = content.fields.indexOf(_f);
                    var fields = content.fields;
                    fields[i] = f;
                    postEditService.setContent(content.clone({
                        fields: fields,
                    }));
                }
            }
            return postEditService.content && (jsxRuntime.jsxs(Box, __assign({ display: "flex", position: "relative", height: "100%" }, { children: [jsxRuntime.jsx(Box, __assign({ p: 2, flex: "1 1 auto", overflow: "hidden", height: "100%", style: { overflowY: "auto" }, display: "flex", alignItems: "center", flexDirection: "column" }, { children: (_a = services.postManagementsService.selected) === null || _a === void 0 ? void 0 : _a.taxonomy.schemes.map(function (scheme) {
                            var _a;
                            var f = (_a = postEditService.content) === null || _a === void 0 ? void 0 : _a.fields.find(function (s) { return s.schemeId === scheme.schemeId; });
                            if (!f) {
                                return jsxRuntime.jsxs(Box, __assign({ className: "post", maxWidth: "100%", width: "780px", mt: 2 }, { children: [jsxRuntime.jsxs(Typography, __assign({ color: "error" }, { children: ["\"", scheme.name, " - ", scheme.displayName, "\" \u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F"] }), void 0),
                                        jsxRuntime.jsx(Box, { mt: 2 }, void 0),
                                        jsxRuntime.jsx(Divider, {}, void 0)] }), scheme.schemeId);
                            }
                            return jsxRuntime.jsxs(Box, __assign({ className: "post", maxWidth: "100%", width: "780px", mt: 2 }, { children: [jsxRuntime.jsxs(Typography, __assign({ variant: "h5", style: { wordBreak: "break-all" } }, { children: [scheme.name, " - ", scheme.displayName] }), void 0),
                                    jsxRuntime.jsx(Divider, {}, void 0),
                                    jsxRuntime.jsx(Box, { mt: 2 }, void 0),
                                    jsxRuntime.jsx(Typography, __assign({ color: "textSecondary", variant: "caption" }, { children: scheme.description }), void 0),
                                    jsxRuntime.jsx(Box, { mt: 2 }, void 0),
                                    jsxRuntime.jsx(FieldEditor, { onChange: function (e) { return handleChangeField(e); }, field: {
                                            field: f,
                                            scheme: scheme
                                        } }, void 0),
                                    jsxRuntime.jsx(Box, { mt: 4 }, void 0)] }), scheme.schemeId);
                        }) }), void 0),
                    jsxRuntime.jsx(Divider, { orientation: "vertical" }, void 0),
                    jsxRuntime.jsx(Box, __assign({ p: 2, minWidth: "300px", maxWidth: "300px", overflow: "auto" }, { children: jsxRuntime.jsx(PostEditOptionPanel, { contentEditContext: postEditService.content }, void 0) }), void 0)] }), void 0));
        } }, void 0);
}

export default PostEditPage;
