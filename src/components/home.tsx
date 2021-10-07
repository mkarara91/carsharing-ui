import * as React from "react";
import "./home.scss";
import DestinationAddressSearchInput from "./map/inputs/DestinationAddressInput";
import StartAddressSearchInput from "./map/inputs/StartAddressSearchInput";
import Map from "./map/Map";

type Props = {
    isLoaded: boolean;
};

const Home = (props: Props): JSX.Element => {
    return (
        <div className="main-wrapper">
            <h1>Car Pooling APP</h1>

            <div className="address-input-container">
                <div className="start-input">
                    <h3>Enter Start Address:</h3>
                    {props.isLoaded && <StartAddressSearchInput />}
                </div>
                <div className="destination-input">
                    <h4>Enter Destination Address:</h4>
                    {props.isLoaded && <DestinationAddressSearchInput />}
                </div>
            </div>
            <div className="map-container">
                <Map isLoaded={props.isLoaded}></Map>
            </div>
        </div>
    );
};

export default Home;
