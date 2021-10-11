import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGeocode, getLatLng, LatLon } from "use-places-autocomplete";

import { RootState } from "../ConfigureStore";

export interface Address {
    addressLabel: string;
    geocodedAddess?: google.maps.GeocoderResult;
    latLong?: LatLon;
}

interface AddressState {
    startAddress: Address;
    destinationAddress: Address;
    direction: google.maps.DirectionsResult | null;
}

const initialState: AddressState = {
    startAddress: {
        addressLabel: ""
    },
    destinationAddress: {
        addressLabel: ""
    },
    direction: null
};

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

export const AddressSlicer = createSlice({
    name: "address",
    initialState: initialState,
    reducers: {
        changeStartAddress: (state, action: PayloadAction<string>) => {
            state.startAddress.addressLabel = action.payload;
        },
        changeDestinationAddress: (state, action: PayloadAction<string>) => {
            state.destinationAddress.addressLabel = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setDestinationGeoLocation.fulfilled, (state, { payload }) => {
            state.destinationAddress = payload;
        });
        builder.addCase(setStartGeoLocation.fulfilled, (state, { payload }) => {
            state.startAddress = payload;
        });
        builder.addCase(setDirection.fulfilled, (state, { payload }) => {
            state.direction = payload;
        });
    }
});

export const { changeStartAddress, changeDestinationAddress } = AddressSlicer.actions;

export const selectStart = (state: RootState): Address => state.address.startAddress;
export const selectDestination = (state: RootState): Address => state.address.destinationAddress;
export const selectDirection = (state: RootState): google.maps.DirectionsResult | null => state.address.direction;
export default AddressSlicer.reducer;
