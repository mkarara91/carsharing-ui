import * as React from "react";
import { useCallback, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { UserMarkers } from "./UserMarkers";
import { MatchingTripMarkers } from "./MatchingTripMarkers";

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
    const mapRef = useRef<google.maps.Map>();

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current?.panTo({ lat, lng });
    }, []);

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
    }, []);

    const onUnmount = useCallback(() => {}, []);

    return props.isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <UserMarkers mapRef={mapRef} panTo={panTo}></UserMarkers>
            <MatchingTripMarkers />
        </GoogleMap>
    ) : (
        <div></div>
    );
};

export default Map;
