import { ITileCategory } from '../../../assets/tiles/interfaces';
import Icon from '../../../components/Icon/Icon';
import styles from './CategoryMenu.module.scss';

interface IProps {
  isOpen: boolean;
  closeMenu: () => void;
  selectedCategoryTiles: ITileCategory;
  updateSelectedTile: (id: string) => void;
  updateSelector: () => void;
}

export const CategoryMenu = ({
  isOpen,
  closeMenu,
  selectedCategoryTiles,
  updateSelectedTile,
  updateSelector,
}: IProps) => {
  const tiles = Object.entries(selectedCategoryTiles).map(([id, tile]) => {
    return (
      <button
        style={{ backgroundImage: `url(${tile.svg})` }}
        className={styles.categoryMenu__tile}
        key={id}
        onClick={() => {
          updateSelectedTile(id);
          updateSelector();
          closeMenu();
        }}
      ></button>
    );
  });

  return (
    <div
      className={`${styles.categoryMenu} ${
        isOpen && styles['categoryMenu-open']
      }`}
    >
      <div className={styles.categoryMenu__closeContainer}>
        <Icon
          className={styles.categoryMenu__closeButton}
          name="close"
          onClick={closeMenu}
        />
      </div>
      <div className={styles.categoryMenu__tileGalery}>{tiles}</div>
    </div>
  );
};
