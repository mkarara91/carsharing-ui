import * as React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { selectStart, setStartGeoLocation } from "../../../stores/map/AddressSlicer";

const StartAddressSearchInput = (): JSX.Element => {
    const startAddress = useAppSelector(selectStart);
    const selectValue = startAddress.addressLabel;
    const dispatch = useAppDispatch();

    const handleSelect = async (value: any) => {
        dispatch(setStartGeoLocation(value.label));
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

export default StartAddressSearchInput;
