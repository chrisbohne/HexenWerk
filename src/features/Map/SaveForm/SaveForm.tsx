import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { Button } from '../../../components/Button/Button';
import { Confirmation } from '../../../components/Confirmation/Confirmation';
import { addNotification } from '../../../components/Notification/notificationSlice';
import { changeMapName } from '../mapSlice';

interface SaveFormProps {
  closeModal: () => void;
}

export const SaveForm = ({ closeModal }: SaveFormProps) => {
  const dispatch = useAppDispatch();
  const { mapName } = useAppSelector((state) => state.map);
  const [currentMapName, setCurrentMapName] = useState(mapName);
  const [confirmation, setConfirmation] = useState(false);

  const saveMap = () => {
    // post request to database
    dispatch(changeMapName(currentMapName));
    closeModal();
    dispatch(addNotification({ type: 'Success', message: 'Map saved' }));
  };

  return (
    <div>
      <h2>Save Map</h2>
      <label htmlFor="saveMap">Map Name</label>
      <input
        id="saveMap"
        value={currentMapName}
        onChange={(e) => setCurrentMapName(e.target.value)}
      />
      {confirmation ? (
        <Confirmation
          onConfirmation={saveMap}
          onCancel={() => setConfirmation(false)}
          message="Do you want to save the map?"
        />
      ) : (
        <Button type="menu" onClick={() => setConfirmation(true)}>
          Save Map
        </Button>
      )}
    </div>
  );
};
