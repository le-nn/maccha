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

import { w as withStyles, _ as _objectWithoutProperties, P as Paper, a as _extends, c as clsx, p as propTypes } from './index.lib-751d07a4.js';
import { forwardRef, createElement } from 'react';

var styles = {
  /* Styles applied to the root element. */
  root: {
    overflow: 'hidden'
  }
};
var Card = /*#__PURE__*/forwardRef(function Card(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$raised = props.raised,
      raised = _props$raised === void 0 ? false : _props$raised,
      other = _objectWithoutProperties(props, ["classes", "className", "raised"]);

  return /*#__PURE__*/createElement(Paper, _extends({
    className: clsx(classes.root, className),
    elevation: raised ? 8 : 1,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Card.propTypes = {
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
   * If `true`, the card will use raised styling.
   */
  raised: propTypes.bool
} : void 0;
var Card$1 = withStyles(styles, {
  name: 'MuiCard'
})(Card);

export { Card$1 as C };
