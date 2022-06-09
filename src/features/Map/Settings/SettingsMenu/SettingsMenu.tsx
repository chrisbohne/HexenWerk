import { Button } from '../../../../components/Button/Button';
import { Divider, Icon } from '../../../../components';
import { SettingsMenuProps } from '../../_interfaces';
import { CloseButton } from '../../../../components/Button/CloseButton';
import styles from './SettingsMenu.module.scss';

export const SettingsMenu = ({
  closeSettingsMenu,
  settingsMenuOpen,
  handleClick,
}: SettingsMenuProps) => {
  return (
    <div
      className={`${styles.settingsMenu} ${
        settingsMenuOpen && styles['settingsMenu--open']
      }`}
    >
      <div className={styles.settingsMenu__closeContainer}>
        <CloseButton
          onClose={closeSettingsMenu}
          className={styles.settingsMenu__closeButton}
        />
      </div>

      <h3>Savegame</h3>
      <p>Save and manage your maps</p>
      <div className={styles.settingsMenu__buttonContainer}>
        <Button
          className={styles.loadButton}
          onClick={() => handleClick('load')}
          type="menu"
        >
          My Maps
        </Button>

        <Button
          className={styles.saveButton}
          onClick={() => handleClick('save')}
          type="menu"
        >
          Save Map
        </Button>
      </div>
      <Divider>
        <Icon name="route" />
      </Divider>
      <h3>Map Selection</h3>
      <p>Choose from a list of prebuild maps or create a new map</p>
      <div className={styles.settingsMenu__buttonContainer}>
        <Button
          className={styles.chooseButton}
          onClick={() => handleClick('choose')}
          type="menu"
        >
          Choose Map
        </Button>
        <Button
          className={styles.randomButton}
          onClick={() => handleClick('random')}
          type="menu"
        >
          Random Map
        </Button>
        <Button
          type="menu"
          className={styles.saveButton}
          onClick={() => handleClick('new')}
        >
          New Map
        </Button>
      </div>
    </div>
  );
};
