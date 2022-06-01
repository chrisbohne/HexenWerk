import { useAppSelector } from '../../app/store';
import { Notification } from './Notification';

import styles from './Notification.module.scss';

export const NotificationProvider = () => {
  const notifications = useAppSelector((state) => state.notifications);

  return (
    <div className={styles.notification}>
      <div className={styles.notification__wrapper}>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
    </div>
  );
};
