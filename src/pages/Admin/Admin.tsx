import { UsersList } from '../../features/Users';
import styles from './Admin.module.scss';

export const Admin = () => {
  return (
    <div className={styles.adminContainer}>
      <h1>Admin Page</h1>
      <br />
      <UsersList />
    </div>
  );
};
