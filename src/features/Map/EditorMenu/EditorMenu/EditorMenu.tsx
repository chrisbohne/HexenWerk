import { Icon } from '../../../../components';
import { allTiles } from '../../../../assets/tiles';
import { useAppSelector } from '../../../../app/store';
import { EditorMenuProps } from '../../_interfaces';
import styles from './EditorMenu.module.scss';

export const EditorMenu = ({
  handleCategoryClick,
  categoryMenuOpen,
  previewTiles,
  updateMode,
}: EditorMenuProps) => {
  const { mode, selectedTile, selectedCategory } = useAppSelector(
    (state) => state.map
  );

  const tileSelection = previewTiles.map((element) => {
    return (
      <button
        onClick={() => handleCategoryClick(element)}
        className={`${styles['editorMenu__tileSelection-tileBackground']} ${
          selectedCategory === element.id && categoryMenuOpen
            ? styles.activeCategory
            : ''
        }`}
        key={element.id}
      >
        <div
          className={styles['editorMenu__tileSelection-tileImage']}
          style={{ backgroundImage: `url(${element.img})` }}
        />
      </button>
    );
  });

  return (
    <div className={styles.editorMenu}>
      <div className={styles.editorMenu__tileSelection}>{tileSelection}</div>
      <div className={styles.editorMenu__test}>
        <div className={styles.editorMenu__selectedTileContainer}>
          <div
            className={styles.editorMenu__selectedTile}
            style={{
              backgroundImage:
                mode === 'append' ? `url(${allTiles[+selectedTile].svg})` : '',
            }}
          ></div>
        </div>
        <div className={styles.editorMenu__iconContainer}>
          <Icon
            name="cursor"
            className={`${styles.editorMenu__icon} ${
              mode === 'none' ||
              mode === 'destinationSelection' ||
              mode === 'direction' ||
              mode === 'startingPointSelection'
                ? styles.activated
                : ''
            }`}
            onClick={() => updateMode('none')}
          />
          <Icon
            name="puzzle"
            className={`${styles.editorMenu__icon} ${
              mode === 'append' ? styles.activated : ''
            }`}
            onClick={() => updateMode('append')}
          />
          <Icon
            className={`${styles.editorMenu__icon} ${
              mode === 'eraser' ? styles.activated : ''
            }`}
            name="eraser"
            onClick={() => updateMode('eraser')}
          />
        </div>
      </div>
    </div>
  );
};
