import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setDestinationGeoLocation, setDirection, setStartGeoLocation } from "../../client/GoogleAsyncClient";
import { Address, UserJourney } from "../../datatypes/journeyTypes";
import { parseGoogleDirection } from "../../utils/AddressUtil";

import { RootState } from "../ConfigureStore";

interface AddressState {
    startAddress: Address;
    destinationAddress: Address;
    direction: google.maps.DirectionsResult | null;
    userJourney: UserJourney | null;
}

const initialState: AddressState = {
    startAddress: {
        addressLabel: ""
    },
    destinationAddress: {
        addressLabel: ""
    },
    direction: null,
    userJourney: null
};

export const AddressSlicer = createSlice({
    name: "address",
    initialState: initialState,
    reducers: {
        changeStartAddress: (state, action: PayloadAction<string>) => {
            state.startAddress.addressLabel = action.payload;
        },
        changeDestinationAddress: (state, action: PayloadAction<string>) => {
            state.destinationAddress.addressLabel = action.payload;
        },
        changeUserJourney: (state, action: PayloadAction<UserJourney>) => {
            state.userJourney = action.payload;
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
            if (state.startAddress.latLong && state.destinationAddress.latLong) {
                state.userJourney = parseGoogleDirection(
                    payload,
                    state.startAddress.latLong,
                    state.destinationAddress.latLong
                );
            }
        });
    }
});

export const { changeStartAddress, changeDestinationAddress, changeUserJourney } = AddressSlicer.actions;

export const selectStart = (state: RootState): Address => state.address.startAddress;
export const selectDestination = (state: RootState): Address => state.address.destinationAddress;
export const selectDirection = (state: RootState): google.maps.DirectionsResult | null => state.address.direction;
export const selectUserJourney = (state: RootState): UserJourney | null => state.address.userJourney;
export default AddressSlicer.reducer;
