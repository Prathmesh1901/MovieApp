import { render, screen } from '@testing-library/react';
import SplitText from '../SplitText';

describe('SplitText', () => {
    it('renders text correctly', () => {
        render(<SplitText text="Hello World" />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('World')).toBeInTheDocument();
    });
});
