import { FC } from 'react';
import styles from './Button.module.scss';

interface IButton {
  label: string;
}

const Button: FC<IButton> = ({ label }) => {
  return (
    <button data-testid="button" className={styles.button}>
      {label}
    </button>
  );
};

export default Button;
