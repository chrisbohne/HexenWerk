import { Icon } from '../Icon/Icon';
import { CloseButtonProps } from '../_interfaces';
import styles from './Button.module.scss';

export const CloseButton = ({ onClose, className }: CloseButtonProps) => {
  return (
    <Icon
      className={`${styles.closeButton} ${className} `}
      name="cancel"
      onClick={onClose}
    />
  );
};
