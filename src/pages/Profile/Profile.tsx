import { useAuth } from '../../hooks';

import ComingSoon from '../../assets/images/ComingSoon.svg';
import styles from './Profile.module.scss';

export const Profile = () => {
  const { auth } = useAuth();

  return (
    <div className={styles.profileContainer}>
      <div>
        <h1>Hello, {auth.username} </h1>
        <h3>Your profile section is comming soon...</h3>
      </div>
      <img src={ComingSoon} alt="" />
    </div>
  );
};
