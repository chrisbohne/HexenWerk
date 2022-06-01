import { Confirmation } from '../../../../components';
import { ConfirmModalProps } from '../../_interfaces';
import styles from './ConfirmModal.module.scss';

export const ConfirmModal = ({
  message,
  confirmButton,
  onCancel,
  onConfirmation,
}: ConfirmModalProps) => {
  return (
    <div className={styles.confirmModal}>
      <Confirmation
        // onConfirmation={() => {
        //   handleReset();
        //   setActiveModal('none');
        // }}
        onConfirmation={onConfirmation}
        // onCancel={() => setActiveModal('none')}
        onCancel={onCancel}
        message={message}
        // message={
        //   mapSaved
        //     ? 'Do you want to create a new map?'
        //     : 'You have unsaved changes. If you create a new map these changes will be gone.'
        // }
        // confirmButtonText="Create Map"
        confirmButtonText={confirmButton}
      />
    </div>
  );
};
