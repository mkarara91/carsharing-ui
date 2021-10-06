import * as React from "react";
import "./home.scss";
import DestinationAddressSearchInput from "./map/inputs/DestinationAddressInput";
import StartAddressSearchInput from "./map/inputs/StartAddressSearchInput";

const Home = (): JSX.Element => {
    return (
        <div className="main-wrapper">
            <h1>Car Pooling APP</h1>

            <div className="address-input-container">
                <div className="start-input">
                    <h3>Enter Start Address:</h3>
                    <StartAddressSearchInput />
                </div>
                <div className="destination-input">
                    <h4>Enter Destination Address:</h4>
                    <DestinationAddressSearchInput />
                </div>
            </div>
        </div>
    );
};

export default Home;
