import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { LatLng } from "react-google-places-autocomplete/build/GooglePlacesAutocomplete.types";
import { RootState } from "../ConfigureStore";

interface Address {
    addressLabel: string;
    geocodedAddess?: google.maps.GeocoderResult;
    latLong?: LatLng;
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

export const setDestinationGeoLocation = createAsyncThunk<Address, string>(
    "address/setDestinationGeoLocation",
    async (label: string) => {
        const address: google.maps.GeocoderResult[] = await geocodeByAddress(label);
        const LongLat = await getLatLng(address[0]);
        return {
            addressLabel: label,
            geocodedAddess: address[0],
            latLong: LongLat
        } as Address;
    }
);

export const setStartGeoLocation = createAsyncThunk<Address, string>(
    "address/setStartGeoLocation",
    async (label: string) => {
        const address: google.maps.GeocoderResult[] = await geocodeByAddress(label);
        const LongLat = await getLatLng(address[0]);
        return {
            addressLabel: label,
            geocodedAddess: address[0],
            latLong: LongLat
        } as Address;
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
    }
});

export const { changeStartAddress, changeDestinationAddress } = AddressSlicer.actions;

export const selectStart = (state: RootState): Address => state.address.startAddress;
export const selectDestination = (state: RootState): Address => state.address.destinationAddress;

export default AddressSlicer.reducer;
