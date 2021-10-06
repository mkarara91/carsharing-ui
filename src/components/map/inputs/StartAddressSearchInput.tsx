import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover } from "@reach/combobox";
import * as React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { selectStart, setStartGeoLocation } from "../../../stores/map/AddressSlicer";

const StartAddressSearchInput = (): JSX.Element => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data }
    } = usePlacesAutocomplete();

    const startAddress = useAppSelector(selectStart);
    const selectValue = startAddress.addressLabel;
    if (selectValue) {
        setValue(selectValue);
    }
    const dispatch = useAppDispatch();

    const handleSelect = async (value: any) => {
        setValue(value);
        dispatch(setStartGeoLocation(value.label));
    };

    return (
        <div>
            <Combobox onSelect={(address) => handleSelect(address)}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Enter Destination Address"></ComboboxInput>
                <ComboboxPopover>
                    {status === "OK" &&
                        data.map(({ description }, index) => (
                            <ComboboxOption key={`suggestion-option ${index}`} value={description}></ComboboxOption>
                        ))}
                </ComboboxPopover>
            </Combobox>
        </div>
    );
};

export default StartAddressSearchInput;
