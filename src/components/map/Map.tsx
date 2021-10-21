import * as React from "react";
import { useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { selectDestination, selectStart } from "../../stores/map/AddressSlicer";
import TravelDirection from "./TravelDirection";
import { Address } from "../../datatypes/journeyTypes";
import { setDirection } from "../../client/GoogleAsyncClient";

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
    const startAddress = useAppSelector(selectStart);
    const destinationAddress = useAppSelector(selectDestination);
    const dispatch = useAppDispatch();

    const [startState, setStartState] = React.useState<Address | null>(null);
    const [destinationState, setDestinationState] = React.useState<Address | null>(null);

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

    useEffect(() => {
        if (startAddress.latLong && startAddress !== startState) {
            setStartState(startAddress);
            panTo(startAddress.latLong);
            mapRef.current?.setZoom(16);
        } else if (destinationAddress.latLong && destinationAddress !== destinationState) {
            setDestinationState(destinationAddress);
            panTo(destinationAddress.latLong);
            mapRef.current?.setZoom(12);
        }

        if (startAddress.latLong && destinationAddress.latLong) {
            dispatch(setDirection({ start: startAddress.latLong, end: destinationAddress.latLong }));
        }
    });

    return props.isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {startState?.latLong && <Marker key="StartKey" position={startState.latLong}></Marker>}
            {destinationState?.latLong && <Marker key="DestinationKey" position={destinationState.latLong}></Marker>}
            <TravelDirection></TravelDirection>
        </GoogleMap>
    ) : (
        <div></div>
    );
};

export default Map;
