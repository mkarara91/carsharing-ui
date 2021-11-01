import { Marker } from "@react-google-maps/api";
import * as React from "react";
import { useEffect, RefObject } from "react";
import { LatLon } from "use-places-autocomplete";
import { setDirection } from "../../client/GoogleAsyncClient";
import { Address } from "../../datatypes/journeyTypes";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { selectDestination, selectDirection, selectStart } from "../../stores/map/AddressSlicer";
import TravelDirection from "./TravelDirection";

type Props = {
    panTo: (latLong: LatLon) => void;
    mapRef: RefObject<google.maps.Map | undefined>;
};

export const UserMarkers = (props: Props): JSX.Element => {
    const dispatch = useAppDispatch();
    const startAddress = useAppSelector(selectStart);
    const destinationAddress = useAppSelector(selectDestination);
    const direction = useAppSelector(selectDirection);

    const [startState, setStartState] = React.useState<Address | null>(null);
    const [destinationState, setDestinationState] = React.useState<Address | null>(null);

    useEffect(() => {
        if (startAddress.latLong && startAddress !== startState) {
            setStartState(startAddress);
            props.panTo(startAddress.latLong);
            props.mapRef.current?.setZoom(16);
        } else if (destinationAddress.latLong && destinationAddress !== destinationState) {
            setDestinationState(destinationAddress);
            props.panTo(destinationAddress.latLong);
            props.mapRef.current?.setZoom(12);
        }

        if (startAddress.latLong && destinationAddress.latLong) {
            dispatch(setDirection({ start: startAddress.latLong, end: destinationAddress.latLong }));
        }
    });

    return (
        <React.Fragment>
            {startState?.latLong && <Marker key="UserStartKey" position={startState.latLong}></Marker>}
            {destinationState?.latLong && (
                <Marker key="UserDestinationKey" position={destinationState.latLong}></Marker>
            )}
            <TravelDirection key="UserDirection" color="#00C" opacity={0.5} direction={direction}></TravelDirection>
        </React.Fragment>
    );
};
