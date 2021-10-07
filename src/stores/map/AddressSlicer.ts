import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getGeocode, getLatLng, LatLon } from "use-places-autocomplete";

import { RootState } from "../ConfigureStore";

interface Address {
    addressLabel: string;
    geocodedAddess?: google.maps.GeocoderResult;
    latLong?: LatLon;
}

interface AddressState {
    startAddress: Address;
    destinationAddress: Address;
}

const initialState: AddressState = {
    startAddress: {
        addressLabel: ""
    },
    destinationAddress: {
        addressLabel: ""
    }
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
    }
});

export const { changeStartAddress, changeDestinationAddress } = AddressSlicer.actions;

export const selectStart = (state: RootState): Address => state.address.startAddress;
export const selectDestination = (state: RootState): Address => state.address.destinationAddress;

export default AddressSlicer.reducer;
