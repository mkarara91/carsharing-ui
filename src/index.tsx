import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import Home from "./components/home";
import "./style.scss";

function App() {
    return (
        <div>
            <Home />
        </div>
    );
}

render(<App />, document.getElementById("root"));
