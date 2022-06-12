import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { maps } from '../../../../assets/maps';
import { Icon, Modal, Spinner } from '../../../../components';
import { addNotification } from '../../../../components/Notification/notificationSlice';
import { useAuth } from '../../../../hooks';
import { Map } from '../../../Auth/_interfaces';
import {
  changeDestination,
  changeMap,
  changeMapName,
  changeMapSaved,
  changeMapSize,
  changeMode,
  changeStartingPoint,
  reset,
} from '../../mapSlice';
import { SettingsModal, SettingsProps } from '../../_interfaces';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { LoadForm } from '../LoadForm/LoadForm';
import { SaveForm } from '../SaveForm/SaveForm';
import { SettingsMenu } from '../SettingsMenu/SettingsMenu';
import styles from './Settings.module.scss';

export const Settings = ({
  closeSettingsMenu,
  settingsMenuOpen,
  openSettingsMenu,
  closeCategoryMenu,
}: SettingsProps) => {
  const dispatch = useAppDispatch();
  const { auth } = useAuth();
  const { mapSaved } = useAppSelector((state) => state.map);
  const [activeModal, setActiveModal] = useState<SettingsModal | 'none'>(
    'none'
  );
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = (type: 'load' | 'save') => {
    if (!auth.username) {
      dispatch(
        addNotification({
          type: 'Info',
          message: `Please login to ${
            type === 'save' ? 'save' : 'view your maps'
          }`,
        })
      );
      return false;
    }
    return true;
  };

  const handleClick = (type: SettingsModal) => {
    if (type === 'new' || type === 'choose' || type === 'random') {
      setActiveModal(type);
    } else {
      const loggedIn = checkLogin(type);
      if (loggedIn) setActiveModal(type);
    }
  };

  const handleReset = () => {
    setIsLoading(true);
    dispatch(reset());
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const loadMap = (map: Map) => {
    closeSettingsMenu();
    setActiveModal('none');
    setIsLoading(true);
    setTimeout(() => {
      dispatch(changeMapName(map.name));
      dispatch(changeMapSaved(true));
      dispatch(changeMap(JSON.parse(map.mapData)));
      dispatch(changeMapSize(map.size));
      dispatch(addNotification({ type: 'Success', message: 'Map loaded' }));
      dispatch(changeStartingPoint(undefined));
      dispatch(changeDestination(undefined));
      setIsLoading(false);
    }, 500);
  };

  const loadRandomMap = () => {
    const randomIndex = Math.floor(Math.random() * maps.length);
    loadMap(maps[randomIndex]);
  };

  return (
    <div className={styles.settings}>
      <SettingsMenu
        settingsMenuOpen={settingsMenuOpen}
        closeSettingsMenu={closeSettingsMenu}
        handleClick={handleClick}
        handleReset={handleReset}
      />
      {activeModal === 'load' && (
        <Modal onClose={() => setActiveModal('none')}>
          <LoadForm loadMap={loadMap} shouldDelete={true} maps={auth.maps} />
        </Modal>
      )}
      {activeModal === 'save' && (
        <Modal onClose={() => setActiveModal('none')}>
          <SaveForm closeModal={() => setActiveModal('none')} />
        </Modal>
      )}
      {activeModal === 'choose' && (
        <Modal onClose={() => setActiveModal('none')}>
          <LoadForm shouldDelete={false} maps={maps} loadMap={loadMap} />
        </Modal>
      )}
      {activeModal === 'new' && (
        <Modal onClose={() => setActiveModal('none')}>
          <ConfirmModal
            message={
              mapSaved
                ? 'Do you want to create a new map?'
                : 'You have unsaved changes. If you create a new map these changes will be gone'
            }
            confirmButton="Create Map"
            onConfirmation={() => {
              handleReset();
              setActiveModal('none');
            }}
            onCancel={() => setActiveModal('none')}
          />
        </Modal>
      )}
      {activeModal === 'random' && (
        <Modal onClose={() => setActiveModal('none')}>
          <ConfirmModal
            message={
              mapSaved
                ? 'Do you want to load a new map?'
                : 'You have unsaved changes. If you load a new map these changes will be gone'
            }
            confirmButton="Load Map"
            onCancel={() => setActiveModal('none')}
            onConfirmation={loadRandomMap}
          />
        </Modal>
      )}
      <Icon
        className={`${styles.settings__icon} ${
          settingsMenuOpen && styles['settings__icon--hide']
        }`}
        name="settings"
        onClick={() => {
          openSettingsMenu();
          closeCategoryMenu();
          dispatch(changeMode('none'));
        }}
      />
      {isLoading && <Spinner />}
    </div>
  );
};
