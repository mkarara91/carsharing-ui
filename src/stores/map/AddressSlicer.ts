import { createSlice } from "@reduxjs/toolkit";
import { LatLng } from "react-google-places-autocomplete/build/GooglePlacesAutocomplete.types";
import {RootState} from "../ConfigureStore";

interface Address {
    geocodedAddess?: google.maps.GeocoderResult;
    latLong?: LatLng;
}

interface AddressState {
    startAddress: Address,
    destinationAddress: Address
}

const initialState: AddressState = {
    startAddress: {},
    destinationAddress: {}
}

export const AddressSlicer = createSlice({
    name: "address",
    initialState: initialState,
    reducers: {
        changeStartAddress: (state, action) => {
            state.startAddress = action.payload;
        },
        changeDestinationAddress: (state, action) => {
            state.destinationAddress = action.payload;
        }
    }
});

export const {changeStartAddress, changeDestinationAddress} = AddressSlicer.actions;

export const selectStart = (state: RootState): Address => state.address.startAddress;
export const selectDestination = (state: RootState): Address => state.address.destinationAddress;

export default AddressSlicer.reducer;