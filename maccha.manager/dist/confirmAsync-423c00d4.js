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

import { i as __awaiter, j as __generator, m as __assign, u as useTheme, k as jsxRuntime, B as Button } from './index.lib-fcf45d4b.js';
import { s as showDialogAsync, D as DialogContentFrame } from './showDialog-eede1950.js';

/**
 * Dialog that can confirm Ok or Cancel.
 * @param props dialog props
 */
function ConfirmDialog(props) {
    useTheme();
    return (jsxRuntime.jsx(DialogContentFrame, { actions: jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(Button, __assign({ variant: "text", onClick: function () { return props.onClose(false); } }, { children: props.context.cancelText }), void 0),
                jsxRuntime.jsx(Button, __assign({ variant: "text", onClick: function () { return props.onClose(true); }, color: "primary" }, { children: props.context.okText }), void 0)] }, void 0), description: props.context.description, message: props.context.message }, void 0));
}
/**
 * show confirm dialog async.
 * @param message confirm message
 * @param option dialog option
 */
function confirmAsync(message, option) {
    return __awaiter(this, void 0, void 0, function () {
        var merged;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    merged = (__assign({ message: message, description: "", okText: "OK", cancelText: "Cancel" }, option));
                    return [4 /*yield*/, showDialogAsync(ConfirmDialog, merged)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

export { confirmAsync as c };
