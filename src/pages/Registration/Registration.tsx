import { RegistrationForm } from '../../features/Auth';
import styles from './Registration.module.scss';

export const Registration = () => {
  return (
    <div className={styles.container}>
      <RegistrationForm />
    </div>
  );
};
