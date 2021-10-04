import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import Home from "./components/home";
import "./style.scss";

function App() {
    const [state, setState] = useState("CLICK ME");

    return (
    <div>
        <h1>
            WELCOME
        </h1>
        <Home/>
        <button onClick={() => setState("CLICKED")}>{state}</button>
    </div>);
}

render(<App />, document.getElementById("root"));