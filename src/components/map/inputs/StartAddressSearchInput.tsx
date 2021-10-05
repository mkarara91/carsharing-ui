import * as React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete"

const StartAddressSearchInput = (): JSX.Element => {
    return (
        <div>
            <GooglePlacesAutocomplete apiKey=""/>
        </div>
    );
}

export default StartAddressSearchInput;
