import { services } from "Apps/Services";
import { ChildRouter, useAppLocation, useAppNavigate } from "Libs/Routing/RouterConfig";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useMatch } from "@reach/router";
import { css } from "@emotion/react";
import { useDispatch } from "memento.react";
import { PostTypeCollectionStore } from "Apps/Models/Stores/Posts/PostTypeCollectionStore";

export default () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const postTypeDispatch = useDispatch(PostTypeCollectionStore);
    useEffect(() => {
        postTypeDispatch(s => s.fetchPostTypes())
            .then(() => setIsInitialized(true));
    }, []);

    return <>
        {isInitialized && <ChildRouter
            css={css({
                height: "100%"
            })}
        />}
    </>;
};