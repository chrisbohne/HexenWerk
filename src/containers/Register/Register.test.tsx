import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor,
} from '@testing-library/react';
import Register from './Register';

describe('Register', () => {
  afterEach(cleanup);

  it('should render basic fields', () => {
    const handleOnSubmit = jest.fn();
    render(<Register onSubmit={handleOnSubmit} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should submit correct form data', async () => {
    const handleOnSubmit = jest.fn();

    const { getByLabelText, getByRole } = render(
      <Register onSubmit={handleOnSubmit} />
    );

    fireEvent.input(getByLabelText(/username/i), {
      target: { value: 'chris' },
    });
    fireEvent.input(getByLabelText(/email/i), {
      target: { value: 'chris@test.com' },
    });
    fireEvent.input(getByLabelText(/password/i), {
      target: { value: '12345678' },
    });

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(handleOnSubmit).toHaveBeenCalledWith(
        'chris',
        'chris@test.com',
        '12345678'
      );
    });
  });
});
