import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../components/Button/Button';
import { ILogin } from './interfaces';
import styles from './Login.module.scss';

interface IProps {
  login(data: ILogin): void;
}

const LoginForm: FC<IProps> = ({ login }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = (user) => {
    login(user);
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

export default LoginForm;
