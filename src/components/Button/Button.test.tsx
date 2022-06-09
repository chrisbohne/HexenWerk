import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactDom from 'react-dom';
import Icon from '../Icon/Icon';
import { Button, CloseButton, IconButton } from './Button';

const onClickMock = jest.fn();
afterEach(() => {
  jest.clearAllMocks();
});

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<Button type="primary" label="Test"></Button>, div);
  });

  it('renders button correctly and handles Click', () => {
    render(<Button type="primary" label="Test" onClick={onClickMock}></Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Test');
    userEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

describe('Close Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<CloseButton onClick={onClickMock}></CloseButton>, div);
  });

  it('renders button correctly and handles Click', () => {
    render(<CloseButton onClick={onClickMock}></CloseButton>);
    expect(screen.getByRole('button')).toHaveTextContent('x');
    userEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

describe('Icon Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <IconButton
        icon={<Icon name="hamburger" />}
        onClick={onClickMock}
      ></IconButton>,
      div
    );
  });

  it('renders button correctly and handles Click', () => {
    render(
      <IconButton
        icon={<Icon name="hamburger" />}
        onClick={onClickMock}
      ></IconButton>
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
