import { CloseButton } from '../../../../components/Button/CloseButton';
import { CategoryMenuProps } from '../../_interfaces';
import styles from './CategoryMenu.module.scss';

export const CategoryMenu = ({
  closeCategoryMenu,
  selectedCategoryTiles,
  updateMode,
  updateSelectedTile,
  categoryMenuOpen,
}: CategoryMenuProps) => {
  const tiles = Object.entries(selectedCategoryTiles).map(([id, tile]) => {
    return (
      <button
        style={{ backgroundImage: `url(${tile.svg})` }}
        className={styles.categoryMenu__tile}
        key={id}
        onClick={() => {
          updateSelectedTile(id);
          updateMode('append');
          closeCategoryMenu();
        }}
      ></button>
    );
  });

  return (
    <div
      className={`${styles.categoryMenu} ${
        categoryMenuOpen && styles['categoryMenu-open']
      }`}
    >
      <div className={styles.categoryMenu__closeContainer}>
        <CloseButton
          onClose={closeCategoryMenu}
          className={styles.categoryMenu__closeButton}
        />
      </div>
      <div className={styles.categoryMenu__tileGalery}>{tiles}</div>
    </div>
  );
};
