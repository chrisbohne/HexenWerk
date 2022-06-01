import { useEffect, useRef, useState } from 'react';
import { userService } from '../../../api';
import { useAppDispatch } from '../../../app/store';
import { Spinner } from '../../../components';
import { useAuth } from '../../../hooks';
import { setMaps } from '../../Auth';
import { Editor } from '../EditorMenu/Editor/Editor';
import { Directions, EditorMenu, Settings } from '../index';
import { TileCount } from '../TileCount/TileCount';

import styles from './DesktopControls.module.scss';

export const DesktopControls = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAuth();
  const [directionsMenuOpen, setDirectionsMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const calledOnce = useRef(false);

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

  useEffect(() => {
    if (calledOnce.current) return;
    let isMounted = true;
    // if (!auth.username) return;
    // if (auth.maps.length > 0) return;
    if (!auth.username || auth.maps.length > 0 || !isMounted) return;
    const getMaps = async () => {
      try {
        setIsLoading(true);
        const currentUser = await userService.getCurrentUser();
        isMounted && dispatch(setMaps(currentUser.maps));
      } catch (error) {
        dispatch(setMaps([]));
      } finally {
        setIsLoading(false);
      }
    };
    getMaps();
    calledOnce.current = true;

    return () => {
      isMounted = false;
      setIsLoading(false);
    };
  }, [dispatch, auth]);

  return (
    <div className={styles.desktopControls}>
      {isLoading && <Spinner />}
      <Editor
        closeCategoryMenu={closeCategoryMenu}
        categoryMenuOpen={categoryMenuOpen}
        openCategoryMenu={openCategoryMenu}
        closeDirectionsMenu={closeDirectionsMenu}
        closeSettingsMenu={closeSettingsMenu}
      />

      {/* <EditorMenu
        closeCategoryMenu={closeCategoryMenu}
        categoryMenuOpen={categoryMenuOpen}
        openCategoryMenu={openCategoryMenu}
        closeDirectionsMenu={closeDirectionsMenu}
        closeSettingsMenu={closeSettingsMenu}
      /> */}
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
      <TileCount />
    </div>
  );
};
