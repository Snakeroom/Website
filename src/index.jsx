require("file-loader?name=[name].[ext]!html-minify-loader!./index.html");

import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app.jsx";

ReactDOM.render(<App />, document.getElementById("app"));