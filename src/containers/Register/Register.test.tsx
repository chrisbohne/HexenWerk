import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from './Register';

const mockSignUp = jest.fn();

describe('Register', () => {
  beforeEach(() => {
    render(<Register signUp={mockSignUp} />);
  });

  it('should render basic fields', () => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument();
  });

  it('should not submit if fields are empty', async () => {
    userEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(mockSignUp).not.toBeCalled();
  });

  it('it should display matching error when username is too short', async () => {
    userEvent.type(screen.getByLabelText(/username/i), 'c');
    userEvent.type(screen.getByLabelText(/email/i), 'chris@test.com');
    userEvent.type(screen.getByLabelText(/username/i), '12345678');
    userEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(mockSignUp).not.toBeCalled();
  });

  it('it should display matching error when email is false format', async () => {
    userEvent.type(screen.getByLabelText(/username/i), 'chris');
    userEvent.type(screen.getByLabelText(/email/i), 'test.com');
    userEvent.type(screen.getByLabelText(/username/i), '12345678');
    userEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(mockSignUp).not.toBeCalled();
  });

  it('it should display matching error when password is too short', async () => {
    userEvent.type(screen.getByLabelText(/username/i), 'chris');
    userEvent.type(screen.getByLabelText(/email/i), 'chris@test.com');
    userEvent.type(screen.getByLabelText(/username/i), '1234');
    userEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
    expect(mockSignUp).not.toBeCalled();
  });

  it('should submit correct form data', async () => {
    userEvent.type(screen.getByLabelText(/username/i), 'chris');
    userEvent.type(screen.getByLabelText(/email/i), 'chris@test.com');
    userEvent.type(screen.getByLabelText(/password/i), '12345678');
    userEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        username: 'chris',
        email: 'chris@test.com',
        password: '12345678',
      });
    });
    expect(mockSignUp).toHaveBeenCalledTimes(1);
  });
});
