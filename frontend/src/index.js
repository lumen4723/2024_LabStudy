import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
// import { CookiesProvider } from "react-cookie";
import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* <CookiesProvider> */}
        {/* <BrowserRouter> */}
        <App />
        {/* </BrowserRouter> */}
        {/* </CookiesProvider> */}
    </React.StrictMode>
);
