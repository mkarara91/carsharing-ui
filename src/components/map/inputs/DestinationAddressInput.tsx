import * as React from "react";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxOption } from "@reach/combobox";
import { useAppDispatch } from "../../../stores/hooks";
import usePlacesAutocomplete from "use-places-autocomplete";
import "@reach/combobox/styles.css";
import { setDestinationGeoLocation } from "../../../client/GoogleAsyncClient";

const DestinationAddressSearchInput = (): JSX.Element => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete();

    const dispatch = useAppDispatch();
    const handleSelect = async (value: any) => {
        setValue(value, false);
        dispatch(setDestinationGeoLocation(value));
        clearSuggestions();
    };
    return (
        <div>
            <Combobox onSelect={(address) => handleSelect(address)}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Enter Destination Address"
                ></ComboboxInput>
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

export default DestinationAddressSearchInput;
