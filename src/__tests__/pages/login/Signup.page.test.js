import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../../../contexts/user.context";
import Signup from "../../../pages/login/Signup.page";

describe("Signup component", () => {
    beforeAll(() => {
        jest.clearAllMocks();
    });
    it("should render the Signup form", () => {
        render(
            <MemoryRouter>
                <UserContext.Provider value={{ user: null, setUser: null }}>
                    <Signup />
                </UserContext.Provider>
            </MemoryRouter >
        );

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button");

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
   
});
