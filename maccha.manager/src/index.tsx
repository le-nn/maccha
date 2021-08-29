import React from "react";
import ReactDOM from "react-dom";
import { MacchaManager } from "./index.lib";
import * as serviceWorker from "./serviceWorker";

(async () => {
    const App = await MacchaManager({
        host: "http://localhost:8081/",
        plugins: [
        ]
    });
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PW
serviceWorker.unregister();
