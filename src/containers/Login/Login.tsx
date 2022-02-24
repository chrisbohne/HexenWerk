import { FC } from 'react';

interface ILogin {
  onSubmit(): void;
}

const Login: FC<ILogin> = ({ onSubmit }) => {
  return <div>Login</div>;
};

export default Login;
