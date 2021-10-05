import * as React from "react";
import { render } from "react-dom";
import Home from "./components/home";
import {store} from "./stores/ConfigureStore";
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
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById("root")
    );
