import React from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBoxProps {
    placeholder?: string;
    changed?: (e: string) => void;
    invoked?: () => void;
    value?: string;
    elevation?: number;
    style?: any;
}

export function SearchBox(props: SearchBoxProps) {
    return (
        <Paper
            elevation={props.elevation ?? 2}
            style={{ ...props.style, ...{ display: "flex" } }}
        >
            <InputBase
                onChange={e => props.changed && props.changed(e.target.value ?? "")}
                value={props.value}
                style={{
                    marginLeft: "8px",
                    flex: "1 1 auto",
                }}
                placeholder={props.placeholder}
            />
            <IconButton
                type="submit"
                style={{ padding: "8px" }}
                aria-label="search"
                onClick={() => props.invoked && props.invoked()}
            >
                <Search />
            </IconButton>
        </Paper>
    );
}