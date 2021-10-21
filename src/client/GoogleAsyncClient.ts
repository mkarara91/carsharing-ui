import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGeocode, getLatLng, LatLon } from "use-places-autocomplete";
import { Address } from "../datatypes/journeyTypes";

const getGeocodedData = async (address: string) => {
    const geocoderResult: google.maps.GeocoderResult[] = await getGeocode({
        address
    });
    const longLat = await getLatLng(geocoderResult[0]);
    return {
        addressLabel: address,
        geocodedAddess: geocoderResult[0],
        latLong: longLat
    } as Address;
};

export const setDestinationGeoLocation = createAsyncThunk<Address, string>(
    "address/setDestinationGeoLocation",
    getGeocodedData
);

export const setStartGeoLocation = createAsyncThunk<Address, string>("address/setStartGeoLocation", getGeocodedData);

export const setDirection = createAsyncThunk<google.maps.DirectionsResult, { start: LatLon; end: LatLon }>(
    "address/setDirection",
    async (data: { start: LatLon; end: LatLon }) => {
        const DirectionsService = new google.maps.DirectionsService();

        const result: google.maps.DirectionsResult = await DirectionsService.route(
            {
                origin: new google.maps.LatLng(data.start.lat, data.start.lng),
                destination: new google.maps.LatLng(data.end.lat, data.end.lng),
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    return result;
                } else {
                    console.error(`error fetching directions ${result}`);
                    return null;
                }
            }
        );

        return result;
    }
);
