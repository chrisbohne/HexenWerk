import { render, screen } from '@testing-library/react';
import ReactDom from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      div
    );
  });

  it('renders App corretly', () => {
    render(<App />, { wrapper: MemoryRouter });
    expect(screen.getByText('Welcome to HexFinder')).toBeInTheDocument();
  });
});
