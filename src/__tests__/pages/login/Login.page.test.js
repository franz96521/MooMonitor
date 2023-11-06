import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../../../contexts/user.context";
import Login from "../../../pages/login/Login.page";

describe("Login page", () => {
    beforeAll(() => {
        jest.clearAllMocks();
    });
    it("renders login form", () => {
        render(
            <MemoryRouter>
                <UserContext.Provider value={{
                    user: null,
                    setUser: jest.fn(),
                    emailPasswordLogin:jest.fn(),
                    fetchUser:jest.fn(),
                }}>
                    <Login />
                </UserContext.Provider>
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByRole("button", { name: "Login" });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it("updates the form state when the user types in the input fields", () => {
        render(
            <MemoryRouter>
                <UserContext.Provider value={{
                    user: null,
                    setUser: jest.fn(),
                    emailPasswordLogin:jest.fn(),
                    fetchUser:jest.fn(),
                }}>
                    <Login />
                </UserContext.Provider>
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.change(emailInput, { target: { value: "aa" } });
        fireEvent.change(passwordInput, { target: { value: "aa" } });

        expect(emailInput.value).toEqual("aa");
        expect(passwordInput.value).toEqual("aa");
    });

    it("calls the emailPasswordLogin function when the user submits the form", () => {
        const emailPasswordLogin = jest.fn();
        render(
            <MemoryRouter>
                <UserContext.Provider value={{
                    user: null,
                    setUser: jest.fn(),
                    emailPasswordLogin:emailPasswordLogin,
                    fetchUser:jest.fn(),
                }}>
                    <Login />
                </UserContext.Provider>
            </MemoryRouter>
        );

        const submitButton = screen.getByRole("button", { name: "Login" });

        fireEvent.click(submitButton);

        expect(emailPasswordLogin).toHaveBeenCalledTimes(1);
    });

});
