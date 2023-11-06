import React from 'react';
import { render, screen } from '@testing-library/react';

import MainCards from '../../../components/individual/MainCards.component';


describe('MainCards component', () => {
    it('should render without errors', () => {
        render(<MainCards />);
        expect(screen.getByText('Únete a Nosotros')).toBeInTheDocument();
        
    });

    it('should render the correct number of cards', () => {
        const {container} = render(<MainCards />);
        expect(container.getElementsByClassName('card')).toHaveLength(3);
    });

    it('should render the correct card titles', () => {
        render(<MainCards />);
        expect(screen.getByText('Únete a Nosotros')).toBeInTheDocument();
        expect(screen.getByText('Nuestro Compromiso con la Excelencia')).toBeInTheDocument();
        expect(screen.getByText('Fomentando la Sostenibilidad')).toBeInTheDocument();
    });
});
