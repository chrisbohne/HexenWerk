import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../components/Button/Button';
import styles from './Login.module.scss';

interface IFormInput {
  email: string;
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
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        {...register('email', {
          required: true,
        })}
      />
      {errors.email && (
        <p className={styles.error} role="alert">
          Please enter your Email
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
