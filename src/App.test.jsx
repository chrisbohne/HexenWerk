import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

test('should render app and redirect', () => {
  render(<App />, { wrapper: MemoryRouter });

  expect(screen.getByText(/Welcome to HexFinder/i)).toBeInTheDocument();

  userEvent.click(screen.getByText(/About/));
  expect(screen.getByText(/About HexFinder/i)).toBeInTheDocument();
});
