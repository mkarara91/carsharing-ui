import * as React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete"

const DestinationAddressSearchInput = (): JSX.Element => {
    return (
        <div>
            <GooglePlacesAutocomplete apiKey="AIzaSyC-nJV8TMlz6OFta8jRo6zf--UImae-f0c"/>
        </div>
    );
}

export default DestinationAddressSearchInput;
