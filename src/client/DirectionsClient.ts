import axios from "axios";
import { UserJourney } from "../datatypes/journeyTypes";
import { store } from "../stores/ConfigureStore";
import { changeUserJourney, setMatchingJournies } from "../stores/map/AddressSlicer";

const directionsBaseURL: string = process.env.DIRECTIONS_SERVICE_URL as string;

export const createJourney = async (userJourney: UserJourney | null): Promise<any> => {
    if (userJourney) {
        const response: UserJourney = await axios.post(`${directionsBaseURL}/create`, userJourney, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        store.dispatch(changeUserJourney(response));
    }
};

export const findMatchingJourney = async (userJourney: UserJourney | null): Promise<any> => {
    if (userJourney) {
        const params = {
            startLon: userJourney.start.lng,
            startLat: userJourney.start.lat,
            endLon: userJourney.end.lng,
            endLat: userJourney.end.lat
        };
        const response: UserJourney[] = await axios
            .get(`${directionsBaseURL}/match`, {
                params: params,
                headers: { "Content-Type": "application/json; charset=utf-8" }
            })
            .then((response) => {
                const { data } = response;
                return data as UserJourney[];
            });
        store.dispatch(setMatchingJournies(response));
    }
};
