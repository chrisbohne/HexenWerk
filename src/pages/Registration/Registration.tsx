import { RegisterForm } from '../../features/Auth/RegistrationForm';
import styles from './Registration.module.scss';

const Registration = () => {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
};

export default Registration;
