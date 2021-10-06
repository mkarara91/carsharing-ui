import * as React from "react";
import { GoogleMap } from "@react-google-maps/api";

const center = {
    lat: -3.745,
    lng: -38.523
};

const mapContainerStyle = {
    width: "80vw",
    height: "80vh"
};

type Props = {
    isLoaded: boolean;
};

const Map = (props: Props): JSX.Element => {
    const onLoad = React.useCallback((map) => {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
    }, []);

    const onUnmount = React.useCallback(() => {}, []);

    return props.isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}></GoogleMap>
    ) : (
        <div></div>
    );
};

export default Map;
