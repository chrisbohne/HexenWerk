import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/store';
import styles from './Notification.module.scss';
import { removeNotification } from './notificationSlice';

interface NotificationProps {
  message: string;
  type: string;
  id: string;
}

export const Notification = ({ message, type, id }: NotificationProps) => {
  const dispatch = useAppDispatch();

  const [close, setClose] = useState(false);
  const [width, setWidth] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number>();

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prevState) => {
        if (prevState < 100) {
          return prevState + 0.5;
        }
        clearInterval(id);
        return prevState;
      });
    }, 20);
    setIntervalId(+id);
  };

  const handlePauseTimer = useCallback(() => {
    clearInterval(intervalId);
  }, [intervalId]);

  const handleCloseNotification = useCallback(() => {
    handlePauseTimer();
    setClose(true);
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, 400);
  }, [dispatch, handlePauseTimer, id]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  useEffect(() => {
    if (width === 100) handleCloseNotification();
  }, [width, handleCloseNotification]);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`${styles.notification__item} ${close && styles.close} `}
    >
      <button
        className={styles.notification__closeButton}
        onClick={handleCloseNotification}
      >
        x
      </button>
      <p>{message}</p>
      <div
        style={{ width: `${width}%` }}
        className={`${styles.notification__bar} ${
          type === 'Success'
            ? styles.success
            : type === 'Error'
            ? styles.error
            : styles.info
        }`}
      ></div>
    </div>
  );
};
