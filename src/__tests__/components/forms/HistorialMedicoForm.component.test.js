import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HistorialMedicoForm from "../../../components/forms/HistorialMedicoForm.component";
import { screen, configure } from '@testing-library/react'

describe("HistorialMedicoForm", () => {
  const onSubmit = jest.fn();
  const form = {
    title: "Test title",
    description: "Test description",
    vacaId: "Test vacaId",
    createdAt: "2022-01-01",
  };
  const setForm = jest.fn();
  const editing = false;
  const vacas = [{ id: "Test vacaId", nombre: "Test vaca" }];
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form fields", () => {
    render(<HistorialMedicoForm onSubmit={onSubmit} form={form} setForm={setForm} editing={editing} vacas={vacas} />);

    expect(screen.getByLabelText("title")).toBeInTheDocument();
    expect(screen.getByLabelText("description")).toBeInTheDocument();
    expect(screen.getByLabelText("createdAt")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should update the form state when the user types in the input fields", () => {
    render(<HistorialMedicoForm onSubmit={onSubmit} form={form} setForm={setForm} editing={editing} vacas={vacas} />);

    const titleInput = screen.getByLabelText("title");
    const descriptionInput = screen.getByLabelText("description");
    const createdAtInput = screen.getByLabelText("createdAt");

    fireEvent.change(titleInput, { target: { value: "Test title 2" } });
    fireEvent.change(descriptionInput, { target: { value: "Test description 2" } });

    expect(setForm).toHaveBeenCalledTimes(2);

  });

});
