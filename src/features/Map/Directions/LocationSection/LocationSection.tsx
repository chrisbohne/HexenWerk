import { Button, Icon } from '../../../../components';
import { LocationSectionProps } from '../../_interfaces';
import styles from './LocationSection.module.scss';

export const LocationSection = ({
  startingPoint,
  destination,
  handleLocationCancel,
  handleLocationClick,
}: LocationSectionProps) => {
  return (
    <div className={styles.locationSection}>
      <div className={styles.locationSection__heading}>
        <h3>Locations</h3>
        <p>Choose your starting point and your destination</p>
      </div>
      <div className={styles.locationSection__content}>
        <Button
          type="menu"
          onClick={() => handleLocationClick('startingPoint')}
          className={`${styles.locationSection__button} ${
            startingPoint && styles['locationSection__button-selected']
          }`}
        >
          Starting Point
          {startingPoint ? <Icon name="checkSquare" /> : <Icon name="square" />}
        </Button>
        {startingPoint && (
          <Icon
            name="cancel"
            className={styles.locationSection__cancel}
            onClick={() => {
              handleLocationCancel('startingPoint');
            }}
          />
        )}
      </div>
      <div className={styles.locationSection__content}>
        <Button
          type="menu"
          onClick={() => handleLocationClick('destination')}
          className={`${styles.locationSection__button} ${
            destination && styles['locationSection__button-selected']
          }`}
        >
          Destination
          {destination ? <Icon name="checkSquare" /> : <Icon name="square" />}
        </Button>
        {destination && (
          <Icon
            name="cancel"
            className={styles.locationSection__cancel}
            onClick={() => {
              handleLocationCancel('destination');
            }}
          />
        )}
      </div>
    </div>
  );
};
