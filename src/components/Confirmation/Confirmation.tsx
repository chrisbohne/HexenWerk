import { Button } from '../Button/Button';
import { ConfirmationProps } from '../_interfaces';
import styles from './Confirmation.module.scss';

export const Confirmation = ({
  onConfirmation,
  onCancel,
  message,
  confirmButtonText,
  confirmationButtonType,
}: ConfirmationProps) => {
  return (
    <div className={styles.confirmation}>
      <div className={styles.confirmation__contentContainer}>
        <div className={styles.confirmation__messageContainer}>
          <p>{message}</p>
        </div>
        <div className={styles.confirmation__buttonContainer}>
          <Button
            type={confirmationButtonType ? confirmationButtonType : 'info'}
            onClick={onConfirmation}
          >
            {confirmButtonText}
          </Button>
          <Button type="cancel" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
