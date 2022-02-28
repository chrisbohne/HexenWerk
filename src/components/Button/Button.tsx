import { FC, ReactElement } from 'react';
import styles from './Button.module.scss';

interface IButton {
  label: string;
  type: string;
  onClick?: () => void;
}

interface ICloseButton {
  onClick(): void;
}

interface IIconButton {
  icon: ReactElement;
  onClick?: () => void;
}

export const Button: FC<IButton> = ({ label, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      data-testid="button"
      className={`${styles[type]} ${styles.button}`}
      data-content={label}
    >
      {label}
    </button>
  );
};

export const CloseButton: FC<ICloseButton> = ({ onClick }) => {
  return (
    <button className={styles.button__close} onClick={onClick}>
      x
    </button>
  );
};

export const IconButton: FC<IIconButton> = ({ icon, onClick }) => {
  return (
    <button className={styles.button__icon} onClick={onClick}>
      {icon}
    </button>
  );
};
