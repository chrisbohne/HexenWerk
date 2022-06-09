import { ITileCategory } from '../../../assets/tiles/interfaces';
import { mapMode } from './map.interface';

export interface EditorMenuProps {
  // closeCategoryMenu: () => void;
  categoryMenuOpen: boolean;
  previewTiles: PreviewTile[];
  updateMode: (mode: mapMode) => void;
  // openCategoryMenu: () => void;
  // closeSettingsMenu: () => void;
  // closeDirectionsMenu: () => void;
  handleCategoryClick: (element: PreviewTile) => void;
}

export interface CategoryMenuProps {
  categoryMenuOpen: boolean;
  closeCategoryMenu: () => void;
  selectedCategoryTiles: ITileCategory;
  updateSelectedTile: (id: string) => void;
  // updateSelector: () => void;
  updateMode: (mode: mapMode) => void;
}

export interface EditorProps {
  closeCategoryMenu: () => void;
  categoryMenuOpen: boolean;
  openCategoryMenu: () => void;
  closeSettingsMenu: () => void;
  closeDirectionsMenu: () => void;
}

export interface PreviewTile {
  img: SVGImageElement;
  id: string;
}
