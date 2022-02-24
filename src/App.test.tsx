import { cleanup, render, screen } from '@testing-library/react';
import ReactDom from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  afterEach(cleanup);
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
    expect(screen.getByTestId('test-app')).toBeInTheDocument();
  });
});
