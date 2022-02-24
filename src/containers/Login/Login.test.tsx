import { cleanup, render } from '@testing-library/react';
import Login from './Login';

afterEach(cleanup);

describe('Login', () => {
  it('calls onSubmit with username and password', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <Login onSubmit={handleSubmit} />
    );
    const username = getByLabelText(/username/i) as HTMLInputElement;
    username.value = 'chris';
    const password = getByLabelText(/password/i) as HTMLInputElement;
    password.value = '1234';
  });
});
