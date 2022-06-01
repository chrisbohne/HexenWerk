import { LoginForm } from '../../features/Auth';
import styles from './Login.module.scss';

export const Login = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};
