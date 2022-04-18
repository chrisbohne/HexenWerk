import Icon from '../../components/Icon/Icon';
import styles from './EditorMenuMobile.module.scss';

export const EditorMenuMobile = () => {
  return (
    <div className={styles.editorMenu}>
      <ul>
        <li>
          <Icon name="puzzle" />
        </li>
        <li>
          <Icon name="eraser" />
        </li>
        <li>
          <Icon name="slider" />
        </li>
        <li>
          <Icon name="settings" />
        </li>
      </ul>
    </div>
  );
};
