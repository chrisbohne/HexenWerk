import { ReactNode } from 'react';
import styles from './Divider.module.scss';

interface DividerProps {
  children: ReactNode;
}

export const Divider = ({ children }: DividerProps) => {
  return <div className={styles.divider}>{children}</div>;
};
