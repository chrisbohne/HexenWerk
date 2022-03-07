import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactDom from 'react-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Playground from '../../pages/Playground/Playground';
import Nav from './Nav';

describe('Navbar', () => {
  afterEach(cleanup);
  it('rendes correctly', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>,
      div
    );
  });

  it('renders nav item and redirects correctly', () => {
    render(
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </>,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByTestId('test-nav-item')).toBeInTheDocument();

    userEvent.click(screen.getByText('Playground'));
    expect(screen.getByTestId('test-playground')).toBeInTheDocument();
  });
});
