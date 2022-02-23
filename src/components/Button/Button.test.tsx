import { cleanup, render } from '@testing-library/react';
import ReactDom from 'react-dom';
import Button from './Button';

describe('Button', () => {
  afterEach(cleanup);
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<Button label="Click"></Button>, div);
  });

  it('renders button corretly', () => {
    const { getByTestId } = render(<Button label="Click"></Button>);
    expect(getByTestId('button')).toHaveTextContent('Click');
  });
});
