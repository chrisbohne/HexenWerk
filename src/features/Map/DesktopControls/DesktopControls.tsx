import { useState } from 'react';
import { Directions, EditorMenuDesktop, Settings } from '../index';

export const DesktopControls = () => {
  const [directionsMenuOpen, setDirectionsMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  const closeDirectionsMenu = () => {
    setDirectionsMenuOpen(false);
  };

  const openDirectionsMenu = () => {
    setDirectionsMenuOpen(true);
  };

  const closeCategoryMenu = () => {
    setCategoryMenuOpen(false);
  };

  const openCategoryMenu = () => {
    setCategoryMenuOpen(true);
  };

  const closeSettingsMenu = () => {
    setSettingsMenuOpen(false);
  };

  const openSettingsMenu = () => {
    setSettingsMenuOpen(true);
  };

  return (
    <div>
      <EditorMenuDesktop
        closeCategoryMenu={closeCategoryMenu}
        categoryMenuOpen={categoryMenuOpen}
        openCategoryMenu={openCategoryMenu}
        closeDirectionsMenu={closeDirectionsMenu}
        closeSettingsMenu={closeSettingsMenu}
      />
      <Directions
        closeDirectionsMenu={closeDirectionsMenu}
        directionsMenuOpen={directionsMenuOpen}
        openDirectionsMenu={openDirectionsMenu}
        closeCategoryMenu={closeCategoryMenu}
      />
      <Settings
        closeSettingsMenu={closeSettingsMenu}
        settingsMenuOpen={settingsMenuOpen}
        openSettingsMenu={openSettingsMenu}
        closeCategoryMenu={closeCategoryMenu}
      />
    </div>
  );
};
