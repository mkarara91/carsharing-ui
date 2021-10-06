import * as React from "react";
import { render } from "react-dom";
import Home from "./components/home";
import { store } from "./stores/ConfigureStore";
import { Provider } from "react-redux";
import "./style.scss";
import { useLoadScript } from "@react-google-maps/api";

type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
const libs: Libraries = ["places"];
const apiKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

function App() {
    const { isLoaded } = useLoadScript({
        id: "google-map-script",
        libraries: libs,
        googleMapsApiKey: apiKey
    });
    return (
        <div>
            <Home isLoaded={isLoaded} />
        </div>
    );
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
