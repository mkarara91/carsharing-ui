import { Marker } from "@react-google-maps/api";
import * as React from "react";
import { useEffect } from "react";
import { LatLon } from "use-places-autocomplete";
import { setMatchingDirection } from "../../client/GoogleAsyncClient";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { selectMatchingDirection, selectMatchingJournies } from "../../stores/map/AddressSlicer";
import TravelDirection from "./TravelDirection";

export const MatchingTripMarkers = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const matchingJournies = useAppSelector(selectMatchingJournies);
    const direction = useAppSelector(selectMatchingDirection);

    const [startState, setStartState] = React.useState<LatLon | null>(null);
    const [destinationState, setDestinationState] = React.useState<LatLon | null>(null);

    useEffect(() => {
        if (matchingJournies && matchingJournies?.length > 0) {
            setStartState(matchingJournies[0].start);
            setDestinationState(matchingJournies[0].end);

            dispatch(setMatchingDirection({ start: matchingJournies[0].start, end: matchingJournies[0].end }));
        } else {
            setDestinationState(null);
            setStartState(null);
        }
    });

    return (
        <React.Fragment>
            {startState && <Marker key="UserStartKey" position={startState}></Marker>}
            {destinationState && <Marker key="UserDestinationKey" position={destinationState}></Marker>}
            <TravelDirection key="UserDirection" opacity={1} color="#0C0" direction={direction}></TravelDirection>
        </React.Fragment>
    );
};
