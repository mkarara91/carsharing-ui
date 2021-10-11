import * as React from "react";
import { useAppSelector } from "../../stores/hooks";
import { selectDirection } from "../../stores/map/AddressSlicer";
import { DirectionsRenderer } from "@react-google-maps/api";

const TravelDirection = (): JSX.Element | null => {
    const direction = useAppSelector(selectDirection);

    if (direction) {
        return (
            <DirectionsRenderer
                directions={direction}
                options={{
                    polylineOptions: {
                        strokeOpacity: 1,
                        strokeWeight: 4
                    },
                    preserveViewport: true,
                    suppressMarkers: true
                }}
            />
        );
    }
    return null;
};

export default TravelDirection;
