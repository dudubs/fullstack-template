import { createElement } from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";

window.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(createElement(App), document.getElementById("app"));
});
