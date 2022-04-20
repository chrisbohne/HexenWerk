import Icon from '../../components/Icon/Icon';
import styles from './Playground.module.scss';

const Playground = () => {
  return (
    <div className={styles.playground} data-testid="test-playground">
      <div className={styles.playground__menu}>
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
    </div>
  );
};

export default Playground;
