import React, { useEffect } from "react";
import { ChildRouter, useAppNavigate } from "Libs/Routing/RouterConfig";
import { useParams } from "@reach/router";
import { useDispatch } from "react-relux";
import { ContactSettingsStore } from "Apps/Models/Stores/Contacts/ContactSettingsStore";
import { css } from "@mui/material";

export default () => {
    const params = useParams();
    const navigate = useAppNavigate();
    const dispatch = useDispatch(ContactSettingsStore);

    useEffect(() => {
        // navigate();
        dispatch(s => s.loadSettingsAsync());
    }, []);

    return <ChildRouter css={css({
        height: "100%"
    })} />;
};