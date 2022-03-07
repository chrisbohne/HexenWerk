import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../components/Button/Button';
import { IRegistration } from './interfaces';
import styles from './Register.module.scss';

interface IProps {
  signUp(data: IRegistration): void;
}

const RegistrationForm: FC<IProps> = ({ signUp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegistration>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IRegistration> = (data) => {
    signUp(data);
    reset();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        {...register('name', {
          required: 'Please enter a username',
          minLength: {
            value: 3,
            message: 'Please enter a username with at least 3 characters',
          },
        })}
      />
      {errors.name && (
        <p className={styles.error} role="alert">
          {errors.name.message}
        </p>
      )}
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
      {errors.email && (
        <p className={styles.error} role="alert">
          {errors.email.message}
        </p>
      )}
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
      {errors.password && (
        <p className={styles.error} role="alert">
          {errors.password.message}
        </p>
      )}
      <Button type="primary" label="Register" />
    </form>
  );
};

export default RegistrationForm;
