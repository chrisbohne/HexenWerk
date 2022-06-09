import { VehicleSectionProps } from '../../_interfaces';
import styles from './VehicleSection.module.scss';

export const VehicleSection = ({
  weights,
  handleVehicleChange,
}: VehicleSectionProps) => {
  return (
    <div className={styles.vehicleSection}>
      <div className={styles.vehicleSection__heading}>
        <h3>Vehicles</h3>
        <p>Choose the travel time for each transportation per hex</p>
      </div>
      <div className={styles.vehicleSection__content}>
        <label htmlFor="carInput">Car</label>
        <input
          onChange={(e) => handleVehicleChange(e, 'street')}
          value={weights.street}
          id="carInput"
          type="range"
          min="1"
          max="10"
        ></input>
        <p>{weights.street + ' min'}</p>
      </div>

      <div className={styles.vehicleSection__content}>
        <label htmlFor="trainInput">Train</label>
        <input
          onChange={(e) => handleVehicleChange(e, 'rail')}
          value={weights.rail}
          id="trainInput"
          type="range"
          min="1"
          max="10"
        ></input>
        <p>{weights.rail + ' min'}</p>
      </div>

      <div className={styles.vehicleSection__content}>
        <label htmlFor="planeInput">Plane</label>
        <input
          onChange={(e) => handleVehicleChange(e, 'flight')}
          value={weights.flight}
          id="planeInput"
          type="range"
          min="1"
          max="10"
        ></input>
        <p>{weights.flight + ' min'}</p>
      </div>

      <div className={styles.vehicleSection__content}>
        <label htmlFor="shipInput">Ship</label>
        <input
          onChange={(e) => handleVehicleChange(e, 'shipping')}
          value={weights.shipping}
          id="shipInput"
          type="range"
          min="1"
          max="10"
        ></input>
        <p>{weights.shipping + ' min'}</p>
      </div>
    </div>
  );
};
