import Icon from '../../../components/Icon/Icon';
import {
  streetTiles,
  railTiles,
  cityTiles,
  natureTiles,
} from '../../../assets/tiles';
import { useState } from 'react';
import { CategoryMenu } from '../CategoryMenu/CategoryMenu';
import { useAppSelector } from '../../../app/store';
import { useDispatch } from 'react-redux';
import {
  changeSelectedCategory,
  changeSelectedTile,
  changeMode,
} from '../mapSlice';
import StreetPreview from '../../../assets/images/StreetPreview.svg';
import RailPreview from '../../../assets/images/RailPreview.svg';
import CityPreview from '../../../assets/images/CityPreview.svg';
import NaturePreview from '../../../assets/images/NaturePreview.svg';
import styles from './EditorMenuDesktop.module.scss';

export const allTiles = {
  ...streetTiles,
  ...railTiles,
  ...cityTiles,
  ...natureTiles,
};

interface EditorMenuProps {
  closeCategoryMenu: () => void;
  categoryMenuOpen: boolean;
  openCategoryMenu: () => void;
  closeSettingsMenu: () => void;
  closeDirectionsMenu: () => void;
}

export const EditorMenuDesktop = ({
  closeCategoryMenu,
  categoryMenuOpen,
  openCategoryMenu,
  closeSettingsMenu,
  closeDirectionsMenu,
}: EditorMenuProps) => {
  const dispatch = useDispatch();
  const { mode, selectedTile, selectedCategory } = useAppSelector(
    (state) => state.map
  );

  const previewTiles = [
    { img: StreetPreview, id: 'streetTiles' },
    { img: RailPreview, id: 'railTiles' },
    { img: CityPreview, id: 'cityTiles' },
    { img: NaturePreview, id: 'natureTiles' },
  ];
  const categoryTiles = {
    streetTiles,
    railTiles,
    cityTiles,
    natureTiles,
  };

  const [selectedCategoryTiles, setSelectedCategoryTiles] = useState({});

  const tileSelection = previewTiles.map((element) => {
    return (
      <button
        onClick={() => {
          openCategoryMenu();
          closeSettingsMenu();
          const tiles = categoryTiles[element.id as keyof typeof categoryTiles];
          dispatch(changeSelectedCategory(element.id));
          setSelectedCategoryTiles(tiles);
        }}
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

  const closeMenu = () => {
    closeCategoryMenu();
  };

  const updateSelectedTile = (tile: string) => {
    dispatch(changeSelectedTile(tile));
  };

  const updateMode = (mode: 'eraser' | 'append' | 'none') => {
    dispatch(changeMode(mode));
    closeSettingsMenu();
    closeDirectionsMenu();
    if (mode !== 'append') {
      dispatch(changeSelectedCategory(''));
      closeCategoryMenu();
    }
  };

  return (
    <>
      <div className={styles.editorMenu}>
        <div className={styles.editorMenu__tileSelection}>{tileSelection}</div>

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
      <CategoryMenu
        isOpen={categoryMenuOpen}
        closeMenu={closeMenu}
        selectedCategoryTiles={selectedCategoryTiles}
        updateSelectedTile={updateSelectedTile}
        updateSelector={() => updateMode('append')}
      />
    </>
  );
};
