import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Groups, { createData } from "../../../pages/pages/Calendario.page";
import { UserContext } from "../../../contexts/user.context";
import { MemoryRouter } from "react-router-dom";

describe("createData", () => {
    it("should create a new row with the given data", () => {
        const id = 1;
        const title = "Test Title";
        const description = "Test Description";
        const fecha = "2022-01-01";
        const expectedRow = { id, title, description, fecha };
        const actualRow = createData(id, title, description, fecha);
        expect(actualRow).toEqual(expectedRow);
    });
});

describe("Groups", () => {
    it("should render the table with the correct data", async () => {
        const headCells = [
            {
                id: 'id',
                numeric: false,
                disablePadding: true,
                label: 'Id',
            }, {
                id: 'nombre',
                numeric: true,
                disablePadding: false,
                label: 'nombre',
            },
            {
                id: 'ubicacion',
                numeric: false,
                disablePadding: false,
                label: 'ubicacion',
            },

        ];
        const rows = [
            {
                id: '1',
                nombre: 'nombre1',
                ubicacion: 'ubicacion1',
            },
            {
                id: '2',
                nombre: 'nombre2',
                ubicacion: 'ubicacion2',
            },
            {
                id: '3',
                nombre: 'nombre3',
                ubicacion: 'ubicacion3',
            },

        ];
        render(
            <MemoryRouter>
                <UserContext.Provider value={{ user: { _accessToken: "" }, setUser: null }}>
                    <Groups
                        headCells={headCells}
                        rows={rows}
                    />
                </UserContext.Provider>
            </MemoryRouter>
        );
        const table = screen.getByRole("table");
        expect(table).toBeInTheDocument();
        expect(screen.getByText("Add Calendario")).toBeInTheDocument();
        

    });

});
