import { ButtonProps } from '../_interfaces';
import styles from './Button.module.scss';

export const Button = ({
  disabled,
  children,
  type,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      data-testid="button"
      className={`${styles[type]} ${styles.button} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
