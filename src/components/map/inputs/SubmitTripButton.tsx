import * as React from "react";
import { useMutation } from "react-query";
import { useAppSelector } from "../../../stores/hooks";
import { selectUserJourney } from "../../../stores/map/AddressSlicer";
import { createJourney } from "../../../client/DirectionsClient";

const SubmitTripButton = (): JSX.Element => {
    const userJourney = useAppSelector(selectUserJourney);
    const { isLoading, isError, isSuccess, mutate } = useMutation(createJourney, { retry: 3 });

    return (
        <div>
            <button onClick={() => mutate(userJourney)}>Submit Trip</button>
            {isLoading && <div>Loading......</div>}
            {isError && <div>ERROR</div>}
            {isSuccess && <div>Success</div>}
        </div>
    );
};

export default SubmitTripButton;
