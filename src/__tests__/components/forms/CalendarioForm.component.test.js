import { fireEvent, render, screen } from '@testing-library/react';
import CalendarioForm from '../../../components/forms/CalendarioForm.component';

describe('CalendarioForm', () => {
  const onSubmit = jest.fn(
    (form) => new Promise((resolve) => resolve(form))
  );
  const form = {
    title: 'aaaa',
    date: "2021-01-01",
  };
  const setForm = jest.fn();
  const editing = false;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the form fields', () => {
    render(<CalendarioForm onSubmit={onSubmit} form={form} setForm={setForm} editing={editing} />);

    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('fecha')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should update the form state when the user types in the input fields', () => {
    render(<CalendarioForm onSubmit={onSubmit} form={form} setForm={setForm} editing={editing} />);

    const titleInput = screen.getByLabelText('Title');
    const dateInput = screen.getByLabelText('fecha');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(dateInput, { target: { value: '2022-01-01' } });

    expect(setForm).toHaveBeenCalledTimes(1);
    expect(setForm).toHaveBeenCalledWith({ ...form, title: 'Test Title' });
  });

  it('should call the onSubmit function when the user submits the form', () => {
    render(<CalendarioForm onSubmit={onSubmit} form={form} setForm={setForm} editing={editing} />);

    const submitButton = screen.getByRole('button');

    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(2);
  });
});
