import { useAppDispatch, useAppSelector } from '../../../app/store';
import Icon from '../../../components/Icon/Icon';
import { changeMode } from '../mapSlice';
import { DirectionsMenu } from '../DirectionsMenu/DirectionsMenu';
import styles from './Directions.module.scss';

interface DirectionsProps {
  closeDirectionsMenu: () => void;
  directionsMenuOpen: boolean;
  openDirectionsMenu: () => void;
  closeCategoryMenu: () => void;
}

export const Directions = ({
  closeDirectionsMenu,
  directionsMenuOpen,
  openDirectionsMenu,
  closeCategoryMenu,
}: DirectionsProps) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.map);

  return (
    <>
      <DirectionsMenu
        closeDirectionsMenu={closeDirectionsMenu}
        directionsMenuOpen={directionsMenuOpen}
      />
      <Icon
        onClick={() => {
          openDirectionsMenu();
          closeCategoryMenu();
          dispatch(changeMode('direction'));
        }}
        className={`${styles.directions__icon} ${
          directionsMenuOpen && styles['directions__icon--hide']
        }`}
        name="slider"
      />
      {(mode === 'destinationSelection' ||
        mode === 'startingPointSelection') && (
        <div className={styles.hint}>
          <h4>{`Choose ${
            mode === 'destinationSelection' ? 'Destination' : 'Starting Point'
          }`}</h4>
          <button onClick={() => dispatch(changeMode('direction'))}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
};
