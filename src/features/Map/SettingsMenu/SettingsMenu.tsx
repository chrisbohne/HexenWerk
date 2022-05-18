import { useState } from 'react';
import { useAppDispatch } from '../../../app/store';
import { Button } from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import Modal from '../../../components/Modal/Modal';
import { addNotification } from '../../../components/Notification/notificationSlice';
import { useAuth } from '../../../hooks';
import { LoadForm } from '../LoadForm/LoadForm';
import { SaveForm } from '../SaveForm/SaveForm';
import styles from './SettingsMenu.module.scss';

interface SettingsMenuProps {
  closeSettingsMenu: () => void;
  settingsMenuOpen: boolean;
}

export const SettingsMenu = ({
  closeSettingsMenu,
  settingsMenuOpen,
}: SettingsMenuProps) => {
  const dispatch = useAppDispatch();
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const { auth } = useAuth();

  const handleClick = (type: string) => {
    if (!auth.username)
      dispatch(
        addNotification({
          type: 'Info',
          message: `Please login to ${type}`,
        })
      );
    else if (type === 'save') setSaveModalOpen(true);
    else if (type === 'load') setLoadModalOpen(true);
  };

  return (
    <div
      className={`${styles.settingsMenu} ${
        settingsMenuOpen && styles['settingsMenu--open']
      }`}
    >
      <div className={styles.settingsMenu__closeContainer}>
        <Icon
          className={styles.settingsMenu__closeButton}
          name="close"
          onClick={closeSettingsMenu}
        />
      </div>
      <h3>Savegame</h3>
      <div className={styles.settingsMenu__buttonContainer}>
        <Button onClick={() => handleClick('load')} type="menu">
          Load Map
        </Button>
        <Button onClick={() => handleClick('save')} type="menu">
          Save Map
        </Button>
      </div>
      <hr></hr>
      <h3>Prebuild Maps</h3>
      <div className={styles.settingsMenu__buttonContainer}>
        <Button type="menu">Choose Map</Button>
        <Button type="menu">Random Map</Button>
      </div>
      {loadModalOpen && (
        <Modal onClose={() => setLoadModalOpen(false)}>
          <LoadForm />
        </Modal>
      )}
      {saveModalOpen && (
        <Modal onClose={() => setSaveModalOpen(false)}>
          <SaveForm closeModal={() => setSaveModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};
