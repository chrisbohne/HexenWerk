// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { LoginForm } from './LoginForm';

// const mockLogin = jest.fn();

// describe('Login', () => {
//   beforeEach(() => {
//     render(<LoginForm login={mockLogin} />);
//   });

//   it('should render basic fields', () => {
//     expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
//   });

//   it('should not submit if fields are empty', async () => {
//     userEvent.click(screen.getByRole('button', { name: /login/i }));
//     expect(await screen.findAllByRole('alert')).toHaveLength(2);
//     expect(mockLogin).not.toBeCalled();
//   });

//   it('should submit correct form data', async () => {
//     userEvent.type(screen.getByLabelText(/username/i), 'chris');
//     userEvent.type(screen.getByLabelText(/password/i), '12345678');
//     userEvent.click(screen.getByRole('button', { name: /login/i }));

//     await waitFor(() => {
//       expect(mockLogin).toHaveBeenCalledWith({
//         username: 'chris',
//         password: '12345678',
//       });
//     });
//     expect(mockLogin).toHaveBeenCalledTimes(1);
//   });
// });
