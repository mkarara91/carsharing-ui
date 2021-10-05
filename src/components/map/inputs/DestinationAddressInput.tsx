import * as React from "react";
import { changeDestinationAddress, selectDestination } from "../../../stores/map/AddressSlicer";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";

const DestinationAddressSearchInput = (): JSX.Element => {
    const destinationAddress  = useAppSelector(selectDestination);
    const selectValue = destinationAddress.geocodedAddess?.formatted_address;
    const dispatch = useAppDispatch();

    const handleSelect = async (value: any) => {
        const address: google.maps.GeocoderResult[] = await geocodeByAddress(value.label);
        const LongLat = await getLatLng(address[0]);
        const result = {
            geocodedAddess: address[0],
            latLong: LongLat,
        }        
        dispatch(changeDestinationAddress(result));
    };

    return (
        <div>
            <GooglePlacesAutocomplete
                selectProps={{
                    isClearable: true,
                    selectValue,
                    onChange: (value: any) => handleSelect(value)
                    }} 
                apiKey="AIzaSyC-nJV8TMlz6OFta8jRo6zf--UImae-f0c"/>
        </div>
    );
}

export default DestinationAddressSearchInput;
