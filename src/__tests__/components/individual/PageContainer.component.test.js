import { render } from '@testing-library/react';
import PageContainer from '../../../components/individual/PageContainer.component';
import { getElementsAtEvent } from 'react-chartjs-2';

describe('PageContainer', () => {
    it('renders children inside a Paper component', () => {
        const {container,getByTestId} = render(
            <PageContainer >
                <div data-testid="test-child" />
            </PageContainer>
        );
        const paper = container.getElementsByClassName('MuiBox-root');
        const child = getByTestId('test-child');
        expect(paper).toHaveLength(1);
        expect(child).toBeInTheDocument();
    });

    
});
