import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

interface IProps {
  signUp(data: IFormInput): void;
}

const Register: FC<IProps> = ({ signUp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    signUp(data);
    reset();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        {...register('username', {
          required: 'Please enter a username',
          minLength: {
            value: 3,
            message: 'Please enter a username with at least 3 characters',
          },
        })}
      />
      {errors.username && <p role="alert">{errors.username.message}</p>}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        {...register('email', {
          required: 'Please enter an email address',
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Please enter a valid email',
          },
        })}
      />
      {errors.email && <p role="alert">{errors.email.message}</p>}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        {...register('password', {
          required: 'Please enter a password',
          minLength: {
            value: 8,
            message: 'Please enter a password with at least 8 characters',
          },
        })}
      />
      {errors.password && <p role="alert">{errors.password.message}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
