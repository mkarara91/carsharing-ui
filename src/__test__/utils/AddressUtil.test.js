import { parseGoogleDirection } from "../../utils/AddressUtil";

describe("tests for AddressUtil", () => {
    let index = 1;
    const lat = () => index++;
    const lng = () => index++;
    const direction = {
        routes: [
            {
                overview_path: [
                    { lat, lng },
                    { lat, lng },
                    { lat, lng },
                    { lat, lng },
                    { lat, lng },
                    { lat, lng },
                    { lat, lng },
                    { lat, lng }
                ]
            }
        ]
    };
    it("parseGoogleDirection should return correct format", () => {
        const result = parseGoogleDirection(direction, { lat: 1, lng: 2 }, { lat: 3, lng: 4 }, 2);

        expect(result.end.lat).toBe(3);
        expect(result.end.lng).toBe(4);
        expect(result.start.lat).toBe(1);
        expect(result.start.lng).toBe(2);
        expect(result.journey.length).toBe(8);
    });
});
