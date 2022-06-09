import { useAppSelector } from '../../../app/store';
import TileElement from '../../../assets/images/TileElement.svg';
import styles from './TileCount.module.scss';

export const TileCount = () => {
  const { mapSize } = useAppSelector((state) => state.map);

  return (
    <div className={styles.tileCount}>
      <div
        style={{ backgroundImage: `url(${TileElement})` }}
        className={styles.tileCount__image}
      ></div>
      <div className={styles.tileCount__count}>
        <h1>x{mapSize}</h1>
      </div>
    </div>
  );
};
