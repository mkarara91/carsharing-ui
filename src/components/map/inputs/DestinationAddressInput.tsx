import * as React from "react";
import { selectDestination, setDestinationGeoLocation } from "../../../stores/map/AddressSlicer";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";

const DestinationAddressSearchInput = (): JSX.Element => {
    const destinationAddress = useAppSelector(selectDestination);
    const selectValue = destinationAddress.addressLabel;
    const dispatch = useAppDispatch();
    const handleSelect = async (value: any) => {
        dispatch(setDestinationGeoLocation(value.label));
    };

    return (
        <div>
            <GooglePlacesAutocomplete
                selectProps={{
                    isClearable: true,
                    selectValue,
                    onChange: (value: any) => handleSelect(value)
                }}
                apiKey=""
            />
        </div>
    );
};

export default DestinationAddressSearchInput;
