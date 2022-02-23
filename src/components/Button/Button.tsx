import { FC } from 'react';
import styles from './Button.module.scss';

interface IButton {
  label: string;
  type: string;
}

const Button: FC<IButton> = ({ label, type }) => {
  return (
    <button data-testid="button" className={styles[type]}>
      {label}
    </button>
  );
};

export default Button;
