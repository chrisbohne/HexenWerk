import { FC, MutableRefObject, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal');

interface IProps {
  children: ReactNode;
  close(): void;
}

const Modal: FC<IProps> = ({ children, close }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot?.appendChild(elRef.current);
    return () => {
      if (elRef.current) {
        modalRoot?.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(
    <div className={styles.modal}>
      <button className={styles.button} onClick={close}>
        close
      </button>
      {children}
    </div>,
    elRef.current
  );
};

export default Modal;
