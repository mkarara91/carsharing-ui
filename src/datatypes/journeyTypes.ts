import { LatLon } from "use-places-autocomplete";

export interface Address {
    addressLabel: string;
    geocodedAddess?: google.maps.GeocoderResult;
    latLong?: LatLon;
}

export interface UserJourney {
    directionId?: string | null | undefined
    start: LatLon
    end: LatLon
    journey: Array<LatLon>
}