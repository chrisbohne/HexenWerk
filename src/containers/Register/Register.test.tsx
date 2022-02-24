import { render, fireEvent, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Register from './Register';

describe('Register', () => {
  afterEach(cleanup);

  it('calls the onSubmit function with relevant data', () => {
    const handleOnSubmit = jest.fn();
    const { getByLabelText, getByRole } = render(
      <Register onSubmit={handleOnSubmit} />
    );

    act(() => {
      fireEvent.change(getByLabelText(/username/i), {
        target: { value: 'chris' },
      });
      fireEvent.change(getByLabelText(/email/i), {
        target: { value: 'chris@test.com' },
      });
      fireEvent.change(getByLabelText(/password/i), {
        target: { value: '12345678' },
      });
    });

    act(() => {
      fireEvent.click(getByRole('button'));
    });

    expect(handleOnSubmit).toBeCalledTimes(1);
    expect(handleOnSubmit).toHaveBeenCalledWith(
      'chris',
      'chris@test.com',
      '12345678'
    );
  });
});
