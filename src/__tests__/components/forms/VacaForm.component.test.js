import { render, screen, fireEvent } from '@testing-library/react';
import VacaForm from '../../../components/forms/VacaForm.component';

describe('VacaForm', () => {
  const onSubmit = jest.fn();
  const form = {
    peso: "100",
    raza: "manchada",
    farm: "Farm A",
    group: "22",
    numero: "182",
  };
  const setForm = jest.fn();
  const editing = false;
  const farms = ['Farm A', 'Farm B', 'Farm C'];

  beforeEach(() => {
    render(
      <VacaForm
        onSubmit={onSubmit}
        form={form}
        setForm={setForm}
        editing={editing}
        farms={farms}
      />
    );
  });

  it('renders the form fields', () => {
    expect(screen.getByLabelText('peso')).toBeInTheDocument();
    expect(screen.getByLabelText('raza')).toBeInTheDocument();
    expect(screen.getByLabelText('group')).toBeInTheDocument();
    expect(screen.getByLabelText('numero')).toBeInTheDocument();
  });

  it('calls onSubmit when the form is submitted', () => {
    fireEvent.submit(screen.getByRole('button'));
    expect(onSubmit).toHaveBeenCalled();
  });
});
