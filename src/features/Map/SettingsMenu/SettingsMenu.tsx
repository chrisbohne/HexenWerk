import Icon from '../../../components/Icon/Icon';

import styles from './SettingsMenu.module.scss';

interface SettingsMenuProps {
  closeSettingsMenu: () => void;
  settingsMenuOpen: boolean;
}

export const SettingsMenu = ({
  closeSettingsMenu,
  settingsMenuOpen,
}: SettingsMenuProps) => {
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
      <h3>Settings</h3>
    </div>
  );
};
