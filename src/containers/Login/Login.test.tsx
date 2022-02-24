import { cleanup, render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Login from './Login';

afterEach(cleanup);

describe('Login', () => {
  it('calls onSubmit with username and password', async () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByRole } = render(
      <Login onSubmit={handleSubmit} />
    );

    await act(async () => {
      fireEvent.change(getByLabelText(/username/i), {
        target: { value: 'chris' },
      });
      fireEvent.change(getByLabelText(/password/i), {
        target: { value: '1234' },
      });
    });

    await act(async () => {
      fireEvent.click(getByRole('button'));
    });

    expect(handleSubmit).toBeCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith('chris', '1234');
  });
});
