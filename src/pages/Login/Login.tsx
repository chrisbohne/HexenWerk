import { LoginForm } from '../../features/Auth';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default Login;
