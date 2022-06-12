import { EditorProps, mapMode, PreviewTile } from '../../_interfaces';
import { EditorMenu } from '../EditorMenu/EditorMenu';
import {
  streetTiles,
  railTiles,
  cityTiles,
  natureTiles,
} from '../../../../assets/tiles';
import StreetPreview from '../../../../assets/images/StreetPreviewBlue.svg';
import RailPreview from '../../../../assets/images/RailPreviewBlue.svg';
import CityPreview from '../../../../assets/images/CityPreviewBlue.svg';
import NaturePreview from '../../../../assets/images/NaturePreviewBlue.svg';
import { useAppDispatch } from '../../../../app/store';
import {
  changeMode,
  changeSelectedCategory,
  changeSelectedTile,
} from '../../mapSlice';
import { useState } from 'react';
import { CategoryMenu } from '../CategoryMenu/CategoryMenu';

import styles from './Editor.module.scss';

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

export const Editor = ({
  categoryMenuOpen,
  closeCategoryMenu,
  openCategoryMenu,
  closeDirectionsMenu,
  closeSettingsMenu,
}: EditorProps) => {
  const dispatch = useAppDispatch();
  const [selectedCategoryTiles, setSelectedCategoryTiles] = useState({});

  const handleCategoryClick = (element: PreviewTile) => {
    openCategoryMenu();
    closeSettingsMenu();
    closeDirectionsMenu();
    const tiles = categoryTiles[element.id as keyof typeof categoryTiles];
    dispatch(changeSelectedCategory(element.id));
    setSelectedCategoryTiles(tiles);
  };

  const updateMode = (mode: mapMode) => {
    dispatch(changeMode(mode));
    closeSettingsMenu();
    closeDirectionsMenu();
    if (mode !== 'append') {
      dispatch(changeSelectedCategory(''));
      closeCategoryMenu();
    }
  };

  const updateSelectedTile = (id: string) => {
    dispatch(changeSelectedTile(id));
  };

  return (
    <div className={styles.editor}>
      <EditorMenu
        categoryMenuOpen={categoryMenuOpen}
        previewTiles={previewTiles}
        updateMode={updateMode}
        handleCategoryClick={handleCategoryClick}
      />
      <CategoryMenu
        closeCategoryMenu={closeCategoryMenu}
        selectedCategoryTiles={selectedCategoryTiles}
        updateMode={updateMode}
        updateSelectedTile={updateSelectedTile}
        categoryMenuOpen={categoryMenuOpen}
      />
    </div>
  );
};
