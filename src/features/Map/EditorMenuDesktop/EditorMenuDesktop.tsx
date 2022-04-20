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
  changeSelector,
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

export const EditorMenuDesktop = () => {
  const dispatch = useDispatch();
  const { activeSelector, selectedTile, selectedCategory } = useAppSelector(
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

  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [selectedCategoryTiles, setSelectedCategoryTiles] = useState({});

  const tileSelection = previewTiles.map((element, index) => {
    return (
      <div
        role="button"
        tabIndex={index}
        onClick={() => {
          setCategoryMenuOpen(true);
          const tiles = categoryTiles[element.id];
          dispatch(changeSelectedCategory(element.id));
          setSelectedCategoryTiles(tiles);
        }}
        onKeyDown={() => {
          console.log('hello');
        }}
        className={`${styles['editorMenu__tileSelection-tileBackground']} ${
          selectedCategory === element.id ? styles.activeCategory : ''
        }`}
        key={element.id}
      >
        <div
          className={styles['editorMenu__tileSelection-tileImage']}
          style={{ backgroundImage: `url(${element.img})` }}
        />
      </div>
    );
  });

  const closeMenu = () => {
    setCategoryMenuOpen(false);
  };

  const updateSelectedTile = (tile: string) => {
    dispatch(changeSelectedTile(tile));
  };

  const updateSelector = (selector: 'eraser' | 'hand' | 'cursor') => {
    dispatch(changeSelector(selector));
    if (selector !== 'hand') dispatch(changeSelectedCategory(''));
  };

  return (
    <>
      <div className={styles.editorMenu}>
        <div className={styles.editorMenu__tileSelection}>{tileSelection}</div>

        <div
          style={{
            backgroundImage:
              activeSelector === 'hand'
                ? `url(${allTiles[selectedTile].svg})`
                : '',
          }}
          className={styles.editorMenu__selectedTile}
        ></div>
        <div>
          <Icon
            name="cursor"
            className={`${styles.editorMenu__icon} ${
              activeSelector === 'cursor' ? styles.activated : ''
            }`}
            onClick={() => updateSelector('cursor')}
          />
          <Icon
            name="hand"
            className={`${styles.editorMenu__icon} ${
              activeSelector === 'hand' ? styles.activated : ''
            }`}
            onClick={() => updateSelector('hand')}
          />
          <Icon
            className={`${styles.editorMenu__icon} ${
              activeSelector === 'eraser' ? styles.activated : ''
            }`}
            name="eraser"
            onClick={() => updateSelector('eraser')}
          />
        </div>
      </div>
      <CategoryMenu
        isOpen={categoryMenuOpen}
        closeMenu={closeMenu}
        selectedCategoryTiles={selectedCategoryTiles}
        updateSelectedTile={updateSelectedTile}
        updateSelector={() => updateSelector('hand')}
      />
    </>
  );
};
