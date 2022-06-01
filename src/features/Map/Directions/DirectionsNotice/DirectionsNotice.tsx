import { Button } from '../../../../components';
import { DirectionsNoticeProps } from '../../_interfaces';
import styles from './DirectionsNotice.module.scss';

export const DirectionsNotice = ({ mode, onCancel }: DirectionsNoticeProps) => {
  return (
    <div className={styles.hint}>
      <h4>{`Select ${
        mode === 'destinationSelection' ? 'Destination' : 'Starting Point'
      }`}</h4>
      <p>Click on an highlighted element</p>
      <Button type="danger" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};
