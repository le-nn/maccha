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

import { w as withStyles, a as _extends, _ as _objectWithoutProperties, c as clsx, p as propTypes, l as lighten, N as fade, d as darken, e as capitalize } from './index.lib-914af5e3.js';
import { createContext, forwardRef, useMemo, createElement, useContext } from 'react';

/**
 * @ignore - internal component.
 */

var TableContext = createContext();

if (process.env.NODE_ENV !== 'production') {
  TableContext.displayName = 'TableContext';
}

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'table',
      width: '100%',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      '& caption': _extends({}, theme.typography.body2, {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        textAlign: 'left',
        captionSide: 'bottom'
      })
    },

    /* Styles applied to the root element if `stickyHeader={true}`. */
    stickyHeader: {
      borderCollapse: 'separate'
    }
  };
};
var defaultComponent = 'table';
var Table = /*#__PURE__*/forwardRef(function Table(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? defaultComponent : _props$component,
      _props$padding = props.padding,
      padding = _props$padding === void 0 ? 'default' : _props$padding,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$stickyHeader = props.stickyHeader,
      stickyHeader = _props$stickyHeader === void 0 ? false : _props$stickyHeader,
      other = _objectWithoutProperties(props, ["classes", "className", "component", "padding", "size", "stickyHeader"]);

  var table = useMemo(function () {
    return {
      padding: padding,
      size: size,
      stickyHeader: stickyHeader
    };
  }, [padding, size, stickyHeader]);
  return /*#__PURE__*/createElement(TableContext.Provider, {
    value: table
  }, /*#__PURE__*/createElement(Component, _extends({
    role: Component === defaultComponent ? null : 'table',
    ref: ref,
    className: clsx(classes.root, className, stickyHeader && classes.stickyHeader)
  }, other)));
});
process.env.NODE_ENV !== "production" ? Table.propTypes = {
  /**
   * The content of the table, normally `TableHead` and `TableBody`.
   */
  children: propTypes.node.isRequired,

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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * Allows TableCells to inherit padding of the Table.
   */
  padding: propTypes.oneOf(['default', 'checkbox', 'none']),

  /**
   * Allows TableCells to inherit size of the Table.
   */
  size: propTypes.oneOf(['small', 'medium']),

  /**
   * Set the header sticky.
   *
   * ⚠️ It doesn't work with IE 11.
   */
  stickyHeader: propTypes.bool
} : void 0;
var Table$1 = withStyles(styles, {
  name: 'MuiTable'
})(Table);

/**
 * @ignore - internal component.
 */

var Tablelvl2Context = createContext();

if (process.env.NODE_ENV !== 'production') {
  Tablelvl2Context.displayName = 'Tablelvl2Context';
}

var styles$1 = {
  /* Styles applied to the root element. */
  root: {
    display: 'table-row-group'
  }
};
var tablelvl2 = {
  variant: 'body'
};
var defaultComponent$1 = 'tbody';
var TableBody = /*#__PURE__*/forwardRef(function TableBody(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? defaultComponent$1 : _props$component,
      other = _objectWithoutProperties(props, ["classes", "className", "component"]);

  return /*#__PURE__*/createElement(Tablelvl2Context.Provider, {
    value: tablelvl2
  }, /*#__PURE__*/createElement(Component, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    role: Component === defaultComponent$1 ? null : 'rowgroup'
  }, other)));
});
process.env.NODE_ENV !== "production" ? TableBody.propTypes = {
  /**
   * The content of the component, normally `TableRow`.
   */
  children: propTypes.node,

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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes
  /* @typescript-to-proptypes-ignore */
  .elementType
} : void 0;
var TableBody$1 = withStyles(styles$1, {
  name: 'MuiTableBody'
})(TableBody);

var styles$2 = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: _extends({}, theme.typography.body2, {
      display: 'table-cell',
      verticalAlign: 'inherit',
      // Workaround for a rendering bug with spanned columns in Chrome 62.0.
      // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
      borderBottom: "1px solid\n    ".concat(theme.palette.type === 'light' ? lighten(fade(theme.palette.divider, 1), 0.88) : darken(fade(theme.palette.divider, 1), 0.68)),
      textAlign: 'left',
      padding: 16
    }),

    /* Styles applied to the root element if `variant="head"` or `context.table.head`. */
    head: {
      color: theme.palette.text.primary,
      lineHeight: theme.typography.pxToRem(24),
      fontWeight: theme.typography.fontWeightMedium
    },

    /* Styles applied to the root element if `variant="body"` or `context.table.body`. */
    body: {
      color: theme.palette.text.primary
    },

    /* Styles applied to the root element if `variant="footer"` or `context.table.footer`. */
    footer: {
      color: theme.palette.text.secondary,
      lineHeight: theme.typography.pxToRem(21),
      fontSize: theme.typography.pxToRem(12)
    },

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      padding: '6px 24px 6px 16px',
      '&:last-child': {
        paddingRight: 16
      },
      '&$paddingCheckbox': {
        width: 24,
        // prevent the checkbox column from growing
        padding: '0 12px 0 16px',
        '&:last-child': {
          paddingLeft: 12,
          paddingRight: 16
        },
        '& > *': {
          padding: 0
        }
      }
    },

    /* Styles applied to the root element if `padding="checkbox"`. */
    paddingCheckbox: {
      width: 48,
      // prevent the checkbox column from growing
      padding: '0 0 0 4px',
      '&:last-child': {
        paddingLeft: 0,
        paddingRight: 4
      }
    },

    /* Styles applied to the root element if `padding="none"`. */
    paddingNone: {
      padding: 0,
      '&:last-child': {
        padding: 0
      }
    },

    /* Styles applied to the root element if `align="left"`. */
    alignLeft: {
      textAlign: 'left'
    },

    /* Styles applied to the root element if `align="center"`. */
    alignCenter: {
      textAlign: 'center'
    },

    /* Styles applied to the root element if `align="right"`. */
    alignRight: {
      textAlign: 'right',
      flexDirection: 'row-reverse'
    },

    /* Styles applied to the root element if `align="justify"`. */
    alignJustify: {
      textAlign: 'justify'
    },

    /* Styles applied to the root element if `context.table.stickyHeader={true}`. */
    stickyHeader: {
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 2,
      backgroundColor: theme.palette.background.default
    }
  };
};
/**
 * The component renders a `<th>` element when the parent context is a header
 * or otherwise a `<td>` element.
 */

var TableCell = /*#__PURE__*/forwardRef(function TableCell(props, ref) {
  var _props$align = props.align,
      align = _props$align === void 0 ? 'inherit' : _props$align,
      classes = props.classes,
      className = props.className,
      component = props.component,
      paddingProp = props.padding,
      scopeProp = props.scope,
      sizeProp = props.size,
      sortDirection = props.sortDirection,
      variantProp = props.variant,
      other = _objectWithoutProperties(props, ["align", "classes", "className", "component", "padding", "scope", "size", "sortDirection", "variant"]);

  var table = useContext(TableContext);
  var tablelvl2 = useContext(Tablelvl2Context);
  var isHeadCell = tablelvl2 && tablelvl2.variant === 'head';
  var role;
  var Component;

  if (component) {
    Component = component;
    role = isHeadCell ? 'columnheader' : 'cell';
  } else {
    Component = isHeadCell ? 'th' : 'td';
  }

  var scope = scopeProp;

  if (!scope && isHeadCell) {
    scope = 'col';
  }

  var padding = paddingProp || (table && table.padding ? table.padding : 'default');
  var size = sizeProp || (table && table.size ? table.size : 'medium');
  var variant = variantProp || tablelvl2 && tablelvl2.variant;
  var ariaSort = null;

  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return /*#__PURE__*/createElement(Component, _extends({
    ref: ref,
    className: clsx(classes.root, classes[variant], className, align !== 'inherit' && classes["align".concat(capitalize(align))], padding !== 'default' && classes["padding".concat(capitalize(padding))], size !== 'medium' && classes["size".concat(capitalize(size))], variant === 'head' && table && table.stickyHeader && classes.stickyHeader),
    "aria-sort": ariaSort,
    role: role,
    scope: scope
  }, other));
});
process.env.NODE_ENV !== "production" ? TableCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   */
  align: propTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),

  /**
   * The table cell contents.
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
   * Sets the padding applied to the cell.
   * By default, the Table parent component set the value (`default`).
   */
  padding: propTypes.oneOf(['checkbox', 'default', 'none']),

  /**
   * Set scope attribute.
   */
  scope: propTypes.string,

  /**
   * Specify the size of the cell.
   * By default, the Table parent component set the value (`medium`).
   */
  size: propTypes.oneOf(['medium', 'small']),

  /**
   * Set aria-sort direction.
   */
  sortDirection: propTypes.oneOf(['asc', 'desc', false]),

  /**
   * Specify the cell type.
   * By default, the TableHead, TableBody or TableFooter parent component set the value.
   */
  variant: propTypes.oneOf(['body', 'footer', 'head'])
} : void 0;
var TableCell$1 = withStyles(styles$2, {
  name: 'MuiTableCell'
})(TableCell);

var styles$3 = {
  /* Styles applied to the root element. */
  root: {
    width: '100%',
    overflowX: 'auto'
  }
};
var TableContainer = /*#__PURE__*/forwardRef(function TableContainer(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      other = _objectWithoutProperties(props, ["classes", "className", "component"]);

  return /*#__PURE__*/createElement(Component, _extends({
    ref: ref,
    className: clsx(classes.root, className)
  }, other));
});
process.env.NODE_ENV !== "production" ? TableContainer.propTypes = {
  /**
   * The table itself, normally `<Table />`
   */
  children: propTypes.node,

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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes
  /* @typescript-to-proptypes-ignore */
  .elementType
} : void 0;
var TableContainer$1 = withStyles(styles$3, {
  name: 'MuiTableContainer'
})(TableContainer);

var styles$4 = {
  /* Styles applied to the root element. */
  root: {
    display: 'table-header-group'
  }
};
var tablelvl2$1 = {
  variant: 'head'
};
var defaultComponent$2 = 'thead';
var TableHead = /*#__PURE__*/forwardRef(function TableHead(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? defaultComponent$2 : _props$component,
      other = _objectWithoutProperties(props, ["classes", "className", "component"]);

  return /*#__PURE__*/createElement(Tablelvl2Context.Provider, {
    value: tablelvl2$1
  }, /*#__PURE__*/createElement(Component, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    role: Component === defaultComponent$2 ? null : 'rowgroup'
  }, other)));
});
process.env.NODE_ENV !== "production" ? TableHead.propTypes = {
  /**
   * The content of the component, normally `TableRow`.
   */
  children: propTypes.node,

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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes
  /* @typescript-to-proptypes-ignore */
  .elementType
} : void 0;
var TableHead$1 = withStyles(styles$4, {
  name: 'MuiTableHead'
})(TableHead);

var styles$5 = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      color: 'inherit',
      display: 'table-row',
      verticalAlign: 'middle',
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      '&$hover:hover': {
        backgroundColor: theme.palette.action.hover
      },
      '&$selected, &$selected:hover': {
        backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.selectedOpacity)
      }
    },

    /* Pseudo-class applied to the root element if `selected={true}`. */
    selected: {},

    /* Pseudo-class applied to the root element if `hover={true}`. */
    hover: {},

    /* Styles applied to the root element if table variant="head". */
    head: {},

    /* Styles applied to the root element if table variant="footer". */
    footer: {}
  };
};
var defaultComponent$3 = 'tr';
/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 */

var TableRow = /*#__PURE__*/forwardRef(function TableRow(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? defaultComponent$3 : _props$component,
      _props$hover = props.hover,
      hover = _props$hover === void 0 ? false : _props$hover,
      _props$selected = props.selected,
      selected = _props$selected === void 0 ? false : _props$selected,
      other = _objectWithoutProperties(props, ["classes", "className", "component", "hover", "selected"]);

  var tablelvl2 = useContext(Tablelvl2Context);
  return /*#__PURE__*/createElement(Component, _extends({
    ref: ref,
    className: clsx(classes.root, className, tablelvl2 && {
      'head': classes.head,
      'footer': classes.footer
    }[tablelvl2.variant], hover && classes.hover, selected && classes.selected),
    role: Component === defaultComponent$3 ? null : 'row'
  }, other));
});
process.env.NODE_ENV !== "production" ? TableRow.propTypes = {
  /**
   * Should be valid <tr> children such as `TableCell`.
   */
  children: propTypes.node,

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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: propTypes
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * If `true`, the table row will shade on hover.
   */
  hover: propTypes.bool,

  /**
   * If `true`, the table row will have the selected shading.
   */
  selected: propTypes.bool
} : void 0;
var TableRow$1 = withStyles(styles$5, {
  name: 'MuiTableRow'
})(TableRow);

export { TableContainer$1 as T, Table$1 as a, TableHead$1 as b, TableRow$1 as c, TableCell$1 as d, TableBody$1 as e };
