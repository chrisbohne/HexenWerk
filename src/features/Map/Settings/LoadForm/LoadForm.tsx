/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */

import { useState } from 'react';
import { userService } from '../../../../api';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { addNotification } from '../../../../components/Notification/notificationSlice';
import { Spinner } from '../../../../components/Spinner/Spinner ';
import { removeMap } from '../../../Auth';
import { changeMapName } from '../../mapSlice';
import { LoadFormProps } from '../../_interfaces';
import styles from './LoadForm.module.scss';
import { MapListItem } from '../MapListItem/MapListItem';

export const LoadForm = ({ maps, shouldDelete, loadMap }: LoadFormProps) => {
  const dispatch = useAppDispatch();
  const { mapName } = useAppSelector((state) => state.map);
  const [selectedMap, setSelectedMap] = useState({
    name: '',
    mapData: '',
    id: '',
    size: 0,
  });
  const [showLoading, setShowLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  const deleteMap = async () => {
    setShowLoading(true);
    try {
      await userService.deleteUserMap(+selectedMap.id);
      dispatch(removeMap(selectedMap));
      if (mapName === selectedMap.name) dispatch(changeMapName(''));
    } catch (error) {
      dispatch(
        addNotification({ type: 'Error', message: 'Map could not be deleted' })
      );
    } finally {
      setShowLoading(false);
    }
  };

  const handleClick = (index: number) => {
    setSelectedMap(maps[index]);
    setActiveIndex(index);
  };

  return (
    <div onClick={() => setActiveIndex(undefined)} className={styles.loadForm}>
      <h2>My Maps</h2>
      <div className={styles.loadForm__content}>
        {maps.length ? (
          <ul>
            {maps.map((map, index) => (
              <li
                role="menuitem"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(index);
                }}
                onKeyPress={() => handleClick(index)}
                key={index}
                value={index}
                className={
                  index === activeIndex
                    ? styles.selected
                    : styles.loadForm__item
                }
              >
                <MapListItem
                  name={map.name}
                  loadMap={() => loadMap(selectedMap)}
                  deleteMap={shouldDelete ? deleteMap : undefined}
                  isActive={index === activeIndex}
                  size={map.size}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No maps found</p>
        )}
      </div>
      {showLoading && <Spinner />}
    </div>
  );
};
