import * as React from "react";

import { DirectionsRenderer } from "@react-google-maps/api";

type Props = {
    direction: google.maps.DirectionsResult | null;
    color: string;
    opacity: number;
};
const TravelDirection = (props: Props): JSX.Element | null => {
    if (props.direction) {
        return (
            <DirectionsRenderer
                directions={props.direction}
                options={{
                    polylineOptions: {
                        strokeColor: props.color,
                        strokeOpacity: props.opacity,
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
