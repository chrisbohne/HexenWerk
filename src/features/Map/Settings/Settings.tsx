import { useAppDispatch } from '../../../app/store';
import Icon from '../../../components/Icon/Icon';
import { changeMode } from '../mapSlice';
import { SettingsMenu } from '../SettingsMenu/SettingsMenu';
import styles from './Settings.module.scss';

interface SettingsProps {
  closeSettingsMenu: () => void;
  settingsMenuOpen: boolean;
  openSettingsMenu: () => void;
  closeCategoryMenu: () => void;
}

export const Settings = ({
  closeSettingsMenu,
  settingsMenuOpen,
  openSettingsMenu,
  closeCategoryMenu,
}: SettingsProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <SettingsMenu
        settingsMenuOpen={settingsMenuOpen}
        closeSettingsMenu={closeSettingsMenu}
      />
      <Icon
        className={`${styles.settings}`}
        name="settings"
        onClick={() => {
          openSettingsMenu();
          closeCategoryMenu();
          dispatch(changeMode('none'));
        }}
      />
    </>
  );
};
