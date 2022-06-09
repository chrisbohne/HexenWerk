import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/store';
import { NotificationProps } from '../_interfaces';
import styles from './Notification.module.scss';
import { removeNotification } from './notificationSlice';

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
    let isMounted = true;
    if (isMounted) handleStartTimer();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && width === 100) handleCloseNotification();
    return () => {
      isMounted = false;
    };
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
