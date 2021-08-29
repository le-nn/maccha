import { createMuiTheme,makeStyles } from "@material-ui/core/styles";
import { cyan, grey, orange } from "@material-ui/core/colors";

const color = (() => {
    const color = localStorage.getItem("color");
    if (!color) {
        localStorage.setItem("color", "#8db860");
        return "#8db860";
    }
    return color;
})();

const main = color;
const dark = color;
const light = color;

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: light ?? cyan[300],
            main: main ?? cyan[500],
            dark: dark ?? cyan[700],
            contrastText: "#fff",
        },
        secondary: {
            light: "rgb(46,46,46)",
            main: "rgb(24,24,24)",
            dark: "rgb(12,12,12)",
            contrastText: "#fff",
        },
    },
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: "rgb(236, 236, 236)"
            }
        },
        MuiInput: {
            underline: {
                "&:before": {
                    borderBottom: "2px solid rgb(42, 42, 42)"
                },
                "&:hover:not(.Mui-disabled):before ": {
                    borderBottom: "2px solid rgb(42, 42, 42, 0.54)",
                }
            },
        },
        MuiOutlinedInput: {
            notchedOutline: {
                borderWidth: "2px",
                borderColor: "rgba(0, 0, 0, 0.54);"
            }
        },
        MuiInputBase: {
            root: {
                marginTop: "12px!important"
            },
        },
        MuiButton: {
            root: {
                borderRadius: "2px"
            }
        }
    },
    typography: {
        fontFamily: "Noto Sans JP",
        fontWeightRegular: 500,
        fontWeightLight: 300,
        fontWeightBold: 700,
        fontWeightMedium: 500,
        h1: {
            fontWeight: 300
        },
        h2: {
            fontWeight: 300
        },
        h3: {
            fontWeight: 400
        },
        h4: {
            fontWeight: 400
        },
        h5: {
            fontWeight: 500
        },
        h6: {
            fontWeight: 500
        },
    },
});