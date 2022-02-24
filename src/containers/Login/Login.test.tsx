import { cleanup, render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Login from './Login';

describe('Login', () => {
  afterEach(cleanup);

  it('calls onSubmit with username and password', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByRole } = render(
      <Login onSubmit={handleSubmit} />
    );

    act(() => {
      fireEvent.change(getByLabelText(/username/i), {
        target: { value: 'chris' },
      });
      fireEvent.change(getByLabelText(/password/i), {
        target: { value: '1234' },
      });
    });

    act(() => {
      fireEvent.click(getByRole('button'));
    });

    expect(handleSubmit).toBeCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith('chris', '1234');
  });
});
