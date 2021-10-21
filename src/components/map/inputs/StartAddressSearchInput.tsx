import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover } from "@reach/combobox";
import * as React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { setStartGeoLocation } from "../../../client/GoogleAsyncClient";
import { useAppDispatch } from "../../../stores/hooks";
import "./inputStyle.scss";

const StartAddressSearchInput = (): JSX.Element => {
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
        dispatch(setStartGeoLocation(value));
        clearSuggestions();
    };

    return (
        <div className="address-input-container">
            <Combobox onSelect={(address) => handleSelect(address)}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Enter Start Address"
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

export default StartAddressSearchInput;
