/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */

import { FC, MutableRefObject, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import styles from './Modal.module.scss';

let modalRoot = document.getElementById('modal');
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal');
  document.body.appendChild(modalRoot);
}

interface IProps {
  children: ReactNode;
  onClose(): void;
}

const Modal: FC<IProps> = ({ children, onClose }) => {
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
    <div className={styles.modal__container} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <Icon name="close" onClick={onClose} />
        {children}
      </div>
    </div>,
    elRef.current
  );
};

export default Modal;
