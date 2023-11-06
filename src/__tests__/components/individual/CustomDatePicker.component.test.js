import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import CustomDatePicker from '../../../components/individual/CustomDatePicker.component';

describe('CustomDatePicker', () => {
    const onChange = jest.fn(
        (form) => new Promise((resolve) => resolve(form))
    
    );

    beforeEach(() => {
        jest.clearAllMocks();
        onChange.mockClear();
    });

    it('renders with a label', () => {
        render(<CustomDatePicker label="Test Label" value={null} onChange={onChange} />);
        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('calls onChange when a date is selected', () => {
        render(<CustomDatePicker label="Test Label" value={null} onChange={onChange} />);
        const input = screen.getByLabelText('Test Label');
        userEvent.click(input);
        userEvent.click(screen.getByRole('button', { name: 'OK' }));
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('displays the selected date', () => {
        const date = new Date().toLocaleDateString('es-pa');
        console.log(date)
        render(<CustomDatePicker label="Test Label" value={date} onChange={onChange} />);
        // update thedate value
        const input = screen.getByLabelText('Test Label');
        userEvent.click(input);
        userEvent.click(screen.getByRole('button', { name: 'OK' }));
        expect(input.value).toEqual(date);


    });
});
