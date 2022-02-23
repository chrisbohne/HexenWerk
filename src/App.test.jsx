import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

test('should redirect and update history', () => {
  const history = createMemoryHistory();

  render(
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  );

  userEvent.click(screen.getByText(/About/));

  expect(screen.getByText(/About HexFinder/i)).toBeInTheDocument();
});
