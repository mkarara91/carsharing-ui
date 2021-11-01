import * as React from "react";
import { useMutation } from "react-query";
import { findMatchingJourney } from "../../../client/DirectionsClient";
import { useAppSelector } from "../../../stores/hooks";
import { selectUserJourney } from "../../../stores/map/AddressSlicer";

export const FindMatchButton = (): JSX.Element => {
    const userJourney = useAppSelector(selectUserJourney);
    const { isLoading, isError, isSuccess, mutate } = useMutation(findMatchingJourney, { retry: 3 });

    return (
        <div>
            <button onClick={() => mutate(userJourney)}>Find Matching Journey</button>
            {isLoading && <div>Loading......</div>}
            {isError && <div>ERROR</div>}
            {isSuccess && <div>Success</div>}
        </div>
    );
};
