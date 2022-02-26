import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  username: string;
  password: string;
}

interface IProps {
  login(data: IFormInput): void;
}

const Login: FC<IProps> = ({ login }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    login(data);
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        {...register('username', {
          required: true,
        })}
      />
      {errors.username && <p role="alert">Please enter your username</p>}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        {...register('password', {
          required: true,
        })}
      />
      {errors.password && <p role="alert">Please enter your password</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
