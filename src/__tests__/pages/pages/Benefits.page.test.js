import React from "react";
import { render } from "@testing-library/react";
import Benefits from "../../../pages/pages/Benefits.page";

describe("Benefits component", () => {
    it("should render without crashing", () => {
        const { getByText } = render(<Benefits />);
        const benefitsComponent = getByText("Únete a Nosotros");
        expect(benefitsComponent).toBeInTheDocument();
    });
});
