import * as React from "react";
import { render } from "react-dom";
import Home from "./components/home";
import ConfigureStore from "./stores/ConfigureStore";
import { Provider } from 'react-redux'
import "./style.scss";

function App() {
    return (
        <div>
            <Home />
        </div>
    );
}

render(
    <Provider store={ConfigureStore}>
        <App />
    </Provider>, 
    document.getElementById("root")
    );
