import { useEffect, useState } from 'react';
import { userService } from '../../../../api';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { Button } from '../../../../components/Button/Button';
import { Confirmation } from '../../../../components/Confirmation/Confirmation';
import { addNotification } from '../../../../components/Notification/notificationSlice';
import { addMap } from '../../../Auth';
import { changeMapName, changeMapSaved } from '../../mapSlice';
import { SaveFormProps } from '../../_interfaces';
import styles from './SaveForm.module.scss';

export const SaveForm = ({ closeModal }: SaveFormProps) => {
  const dispatch = useAppDispatch();
  const { mapName, map, mapSize } = useAppSelector((state) => state.map);
  const { maps } = useAppSelector((state) => state.auth);
  const [currentMapName, setCurrentMapName] = useState('');
  const [confirmation, setConfirmation] = useState<
    { type: string; message: string; button: string } | undefined
  >(undefined);
  const [mapNameTaken, setMapNameTaken] = useState(false);

  useEffect(() => {
    setCurrentMapName(mapName);
  }, [mapName]);

  const saveMap = async () => {
    const mapToSave = {
      name: currentMapName,
      mapData: JSON.stringify(map),
      size: mapSize,
    };
    if (currentMapName === mapName || mapNameTaken) {
      const mapToOverride = maps.find((el) => el.name === currentMapName);
      if (!mapToOverride) return;
      const { id } = mapToOverride;

      try {
        const savedMap = await userService.updateUserMap({
          ...mapToSave,
          id,
        });
        dispatch(addMap(savedMap));
        dispatch(changeMapSaved(true));
        closeModal();
        dispatch(addNotification({ type: 'Success', message: 'Map saved' }));
        setMapNameTaken(false);
      } catch (error) {
        dispatch(
          addNotification({ type: 'Error', message: 'Something went wrong' })
        );
      }
    } else {
      try {
        const savedMap = await userService.saveUserMap(mapToSave);
        dispatch(changeMapName(currentMapName));
        dispatch(addMap(savedMap));
        dispatch(changeMapSaved(true));
        closeModal();
        dispatch(addNotification({ type: 'Success', message: 'Map saved' }));
      } catch (error) {
        dispatch(
          addNotification({ type: 'Error', message: 'Something went wrong' })
        );
      }
    }
  };

  const handleClick = () => {
    if (!currentMapName) {
      dispatch(
        addNotification({ type: 'Info', message: 'Map name is missing' })
      );
      return;
    }
    const mapNameAlreadyTaken = maps.findIndex(
      (el) => el.name === currentMapName
    );
    if (mapNameAlreadyTaken !== -1 && currentMapName !== mapName) {
      setConfirmation({
        type: 'taken',
        message:
          'Map name already taken. Do you want to override the existing map?',
        button: 'Override',
      });
      setMapNameTaken(true);
    } else {
      setConfirmation({
        type: 'save',
        message: 'Do you want to save your current map?',
        button: 'Save',
      });
    }
  };

  return (
    <div className={styles.saveForm}>
      <h2>Save Map</h2>
      <div className={styles.saveForm__content}>
        {confirmation ? (
          <Confirmation
            onConfirmation={saveMap}
            onCancel={() => setConfirmation(undefined)}
            message={confirmation.message}
            confirmButtonText={confirmation.button}
          />
        ) : (
          <>
            <label htmlFor="saveMap">Map Name</label>
            <input
              id="saveMap"
              value={currentMapName}
              onChange={(e) => {
                setCurrentMapName(e.target.value);
                setMapNameTaken(false);
                setConfirmation(undefined);
              }}
            />
            <Button type="info" onClick={handleClick}>
              Save Map
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
