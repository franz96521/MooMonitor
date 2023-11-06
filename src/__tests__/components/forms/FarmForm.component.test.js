import { render, screen, fireEvent } from "@testing-library/react";
import FarmForm from "../../../components/forms/FarmForm.component";

describe("FarmForm", () => {
  const mockSubmit = jest.fn();
  const mockFarm = {
    nombre: "Farm 1",
    ubicacion: "Address 1",
  };
  const mockSetFarm = jest.fn();
  const mockEditing = false;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form fields", () => {
    render(<FarmForm onSubmit={mockSubmit} form={mockFarm} setForm={mockSetFarm} editing={mockEditing} />);

    expect(screen.getByLabelText("nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("ubicacion")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should update the form state when the user types in the input fields", () => {
    render(<FarmForm onSubmit={mockSubmit} form={mockFarm} setForm={mockSetFarm} editing={mockEditing} />);

    const nombreInput = screen.getByLabelText("nombre");
    const ubicacionInput = screen.getByLabelText("ubicacion");

    fireEvent.change(nombreInput, { target: { value: "Farm 2" } });
    fireEvent.change(ubicacionInput, { target: { value: "Address 2" } });

    expect(mockSetFarm).toHaveBeenCalledTimes(2);
    expect(mockSetFarm).toHaveBeenCalledWith({ ...mockFarm, nombre: "Farm 2" });
    expect(mockSetFarm).toHaveBeenCalledWith({ ...mockFarm, ubicacion: "Address 2" });
  });
  

});
