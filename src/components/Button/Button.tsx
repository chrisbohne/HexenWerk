import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

interface IButton {
  children: ReactNode;
  type: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface IIconButton {
  children: ReactNode;
  onClick?: () => void;
}

export const Button: FC<IButton> = ({ disabled, children, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      data-testid="button"
      className={`${styles[type]} ${styles.button}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const IconButton: FC<IIconButton> = ({ children, onClick }) => {
  return (
    <button className={styles.button__icon} onClick={onClick}>
      {children}
    </button>
  );
};
