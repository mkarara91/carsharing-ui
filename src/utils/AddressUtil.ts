import { LatLon } from "use-places-autocomplete";
import { UserJourney } from "../datatypes/journeyTypes";

export const parseGoogleDirection = (
    direction: google.maps.DirectionsResult,
    start: LatLon,
    end: LatLon
): UserJourney => {
    const route = direction.routes[0]?.overview_path.map((item) => ({ lng: item.lng(), lat: item.lat() }));
    return {
        start,
        end,
        journey: route
    };
};
