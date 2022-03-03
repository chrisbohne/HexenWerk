import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../components/Button/Button';
import styles from './Login.module.scss';

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
      {errors.username && (
        <p className={styles.error} role="alert">
          Please enter your username
        </p>
      )}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        {...register('password', {
          required: true,
        })}
      />
      {errors.password && (
        <p className={styles.error} role="alert">
          Please enter your password
        </p>
      )}
      <Button label="Login" type="primary" />
    </form>
  );
};

export default Login;
