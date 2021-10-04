import * as React from "react";
import { shallow } from "enzyme";
import Home from "../../components/home";

describe("Testing Home Component", () => {
    it("Home component should match snapshot", () => {
        const comp = shallow(<Home />);
        expect(comp).toMatchSnapshot();
    });
});
