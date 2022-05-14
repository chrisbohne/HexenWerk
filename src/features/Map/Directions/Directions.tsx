import { useAppDispatch } from '../../../app/store';
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
          dispatch(changeMode('none'));
        }}
        className={`${styles.directions__icon} ${
          directionsMenuOpen && styles['directions__icon--hide']
        }`}
        name="dots"
      />
    </>
  );
};
