import { render, screen } from '@testing-library/react';
import LoginPage from './page';

// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('LoginPage', () => {
    it('renders login heading', () => {
        render(<LoginPage />);
        const heading = screen.getByText(/TeachPort/i);
        expect(heading).toBeDefined();
    });

    it('renders IIN and Password inputs', () => {
        render(<LoginPage />);
        expect(screen.getByLabelText(/IIN/i)).toBeDefined();
        expect(screen.getByLabelText(/Password/i)).toBeDefined();
    });
});
