import { services } from "Apps/Services";
import { ChildRouter, useAppLocation, useAppNavigate } from "Libs/Routing/RouterConfig";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useMatch } from "@reach/router";

export default () => {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        services.postManagementsService.fetchPostTypes().then(() => setIsInitialized(true));
    }, []);

    return <>
        {isInitialized && <ChildRouter />}
    </>;
};