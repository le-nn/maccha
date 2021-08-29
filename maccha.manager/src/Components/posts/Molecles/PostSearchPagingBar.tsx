import React from "react";
import Pagination from "@material-ui/lab/Pagination";

interface PostSearchPagingBarProps {
    count: number;
    fetch: number;
    offset: number;
    onChange: (e: { fetch: number; offset: number }) => void;
}

export function PostSearchPagingBar(props: PostSearchPagingBarProps) {
    const n = props.count / props.fetch;
    const count = Number.isInteger(n) ? n : Math.floor(props.count / props.fetch) + 1;

    return <div>{props.count} 件中
        {
            Math.min(props.offset + 1, props.count)} - {Math.min(props.offset + props.fetch, props.count)
        }
        <Pagination
            color="primary"
            count={count}
            page={props.offset / props.fetch + 1}
            onChange={(_, v) => props.onChange({
                offset: (v - 1) * props.fetch,
                fetch: props.fetch
            })} />
    </div>;
}
