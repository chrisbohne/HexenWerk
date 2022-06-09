import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { Icon } from '../../../../components';
import { changeMode } from '../../mapSlice';
import { DirectionsProps } from '../../_interfaces';
import { DirectionsMenu } from '../DirectionsMenu/DirectionsMenu';
import { DirectionsNotice } from '../DirectionsNotice/DirectionsNotice';
import styles from './Directions.module.scss';

export const Directions = ({
  closeDirectionsMenu,
  directionsMenuOpen,
  openDirectionsMenu,
  closeCategoryMenu,
}: DirectionsProps) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.map);

  const handleDirectionsMenuClick = () => {
    openDirectionsMenu();
    closeCategoryMenu();
    dispatch(changeMode('direction'));
  };

  return (
    <div className={styles.directions}>
      <DirectionsMenu
        closeDirectionsMenu={closeDirectionsMenu}
        directionsMenuOpen={directionsMenuOpen}
      />
      <Icon
        name="slider"
        onClick={handleDirectionsMenuClick}
        className={`${styles.directions__icon} ${
          directionsMenuOpen && styles['directions__icon--hide']
        }`}
      />
      {(mode === 'destinationSelection' ||
        mode === 'startingPointSelection') && (
        <DirectionsNotice
          mode={mode}
          onCancel={() => dispatch(changeMode('direction'))}
        />
      )}
    </div>
  );
};
