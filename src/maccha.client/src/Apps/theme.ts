import { createTheme, ThemeOptions } from "@mui/material";
import { mergeDeeply } from "../Libs/Utils/DeepMerge";

const color = (() => {
    if (typeof localStorage === "undefined") {
        return "#8db860";
    }

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

const common: ThemeOptions = {
    palette: {
        primary: {
            light: light,
            main: main,
            dark: dark,
            contrastText: "#fff",
        },
        secondary: {
            light: "#9585f2",
            main: "#6550db",
            dark: "#5648a4",
            contrastText: "#fff",
        },
        text: {
            primary: "#1c273e",
            secondary: "rgba(0,0,0,0.4)"
        },
        background: {
        }
    },
    shadows: [
        'none',
        "0px 2px 1px -1px rgba(0, 10, 60, 0.16), 0px 1px 3px 0px rgba(0, 10, 60, 0.1)",
        "0px 3px 1px -2px rgba(0, 10, 60, 0.16), 0px 1px 5px 0px rgba(0, 10, 60, 0.1)",
        "0px 3px 3px -2px rgba(0, 10, 60, 0.12), 0px 1px 8px 0px rgba(0, 10, 60, 0.08)",
        "0px 2px 4px -1px rgba(0, 10, 60, 0.12), 0px 1px 10px 0px rgba(0, 10, 60, 0.08)",
        "0px 3px 5px -1px rgba(0, 10, 60, 0.12), 0px 1px 14px 0px rgba(0, 10, 60, 0.04)",
        "0px 3px 5px -1px rgba(0, 10, 60, 0.12), 0px 1px 18px 0px rgba(0, 10, 60, 0.04)",
        "0px 4px 5px -2px rgba(0, 10, 60, 0.12), 0px 2px 16px 1px rgba(0, 10, 60, 0.04)",
        "0px 5px 5px -3px rgba(0, 10, 60, 0.12), 0px 3px 14px 2px rgba(0, 10, 60, 0.04)",
        "0px 5px 6px -3px rgba(0, 10, 60, 0.12), 0px 3px 16px 2px rgba(0, 10, 60, 0.04)",
        "0px 6px 6px -3px rgba(0, 10, 60, 0.12), 0px 4px 18px 3px rgba(0, 10, 60, 0.04)",
        "0px 6px 7px -4px rgba(0, 10, 60, 0.12), 0px 4px 20px 3px rgba(0, 10, 60, 0.04)",
        "0px 7px 8px -4px rgba(0, 10, 60, 0.12), 0px 5px 22px 4px rgba(0, 10, 60, 0.04)",
        "0px 7px 8px -4px rgba(0, 10, 60, 0.12), 0px 5px 24px 4px rgba(0, 10, 60, 0.04)",
        "0px 7px 9px -4px rgba(0, 10, 60, 0.12), 0px 5px 26px 4px rgba(0, 10, 60, 0.04)",
        "0px 8px 9px -5px rgba(0, 10, 60, 0.12), 0px 6px 28px 5px rgba(0, 10, 60, 0.04)",
        "0px 8px 10px -5px rgba(0, 10, 60, 0.12), 0px 6px 30px 5px rgba(0, 10, 60, 0.04)",
        "0px 8px 11px -5px rgba(0, 10, 60, 0.12), 0px 6px 32px 5px rgba(0, 10, 60, 0.04)",
        "0px 9px 11px -5px rgba(0, 10, 60, 0.12), 0px 7px 34px 6px rgba(0, 10, 60, 0.04)",
        "0px 9px 12px -6px rgba(0, 10, 60, 0.12), 0px 7px 36px 6px rgba(0, 10, 60, 0.04)",
        "0px 10px 13px -6px rgba(0, 10, 60, 0.12), 0px 8px 38px 7px rgba(0, 10, 60, 0.04)",
        "0px 10px 13px -6px rgba(0, 10, 60, 0.12), 0px 8px 40px 7px rgba(0, 10, 60, 0.04)",
        "0px 10px 14px -6px rgba(0, 10, 60, 0.12), 0px 8px 42px 7px rgba(0, 10, 60, 0.04)",
        "0px 11px 14px -7px rgba(0, 10, 60, 0.12), 0px 9px 44px 8px rgba(0, 10, 60, 0.04)",
        "0px 11px 15px -7px rgba(0, 10, 60, 0.12), 0px 9px 46px 8px rgba(0, 10, 60, 0.04)"
    ],
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-input": {
                        padding: "8px 20px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1.5px",
                        borderColor: "rgba(0, 0, 0, 0.5)"
                    }
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                outlined: {
                    borderRadius: "10px",
                    padding: "8px 14px",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1.5px",
                        borderColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "10px",
                    },
                },

            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                    boxShadow:  "0px 6px 6px -3px rgba(0, 10, 60, 0.08), 0px 4px 18px 3px rgba(0, 10, 60, 0.04)",
                }
            }
        },
        MuiPaper:{
            styleOverrides:{
                root:{
                    boxShadow:  "0px 6px 6px -3px rgba(0, 10, 60, 0.08), 0px 4px 18px 3px rgba(0, 10, 60, 0.04)",
                }
            }
        }
    },
    typography: {
        fontFamily: "Noto Sans JP, sans-serif",
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
};

const darkOption: ThemeOptions = {
};

const lightOption: ThemeOptions = {
    palette: {
        background: {
            default: "#f2f3f5",
            paper: "#ffffff"
        }
    },
};

export const darkTheme = createTheme(mergeDeeply(common, darkOption));
export const lightTheme = createTheme(mergeDeeply(common, lightOption));
