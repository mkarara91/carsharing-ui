import * as React from "react";
import { useMutation } from "react-query";

import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { changeUserJourney, selectUserJourney } from "../../../stores/map/AddressSlicer";
import { UserJourney } from "../../../datatypes/journeyTypes";
const directionsBaseURL: string = process.env.DIRECTIONS_SERVICE_URL as string;

const SubmitTrip = (): JSX.Element => {
    const userJourney = useAppSelector(selectUserJourney);
    const dispatch = useAppDispatch();
    const { isLoading, isError, mutate } = useMutation(createPost, { retry: 3 });

    async function createPost() {
        if (userJourney) {
            const response: UserJourney = await axios.post(`${directionsBaseURL}/create`, userJourney, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            dispatch(changeUserJourney(response));
        }
    }
    return (
        <div>
            <button onClick={() => mutate()}>Submit Trip</button>
            {isLoading && <div>Loading......</div>}
            {isError && <div>ERROR</div>}
        </div>
    );
};

export default SubmitTrip;
