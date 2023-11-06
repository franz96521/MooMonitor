import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EnhancedTable from '../../../components/individual/EnhancedTable.component';

describe('EnhancedTable', () => {
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

    it('renders the table with the correct columns and rows', () => {
        render(<EnhancedTable headers={headCells} rows={rows}  />);
        expect(screen.getByText('Id')).toBeInTheDocument();
        expect(screen.getByText('nombre')).toBeInTheDocument();
        expect(screen.getByText('ubicacion')).toBeInTheDocument();
       
    });

    it('calls onClickAdd when the add button is clicked', () => {
        const onClickAdd = jest.fn();
        render(<EnhancedTable headers={headCells} rows={rows} onClickAdd={onClickAdd} />);
        userEvent.click(screen.getByRole('button', { name: 'Add' }));
        expect(onClickAdd).toHaveBeenCalledTimes(1);
    });


});
