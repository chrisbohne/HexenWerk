import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../app/store';
import { Button, Confirmation } from '../../../../components';
import { MapListItemProps } from '../../_interfaces';
import TileImg from '../../../../assets/images/TileElement.svg';
import styles from './MapListItem.module.scss';
import { ButtonTypes } from '../../../../components/_interfaces';

export const MapListItem = ({
  name,
  size,
  isActive,
  loadMap,
  deleteMap,
}: MapListItemProps) => {
  const { mapSaved } = useAppSelector((state) => state.map);
  const [confirmation, setConfirmation] = useState<
    | {
        type: string;
        message: string;
        button: string;
        confirmationType: ButtonTypes;
      }
    | undefined
  >(undefined);
  const growRef = useRef<HTMLDivElement>(null);
  const wrapperRef1 = useRef<HTMLDivElement>(null);
  const wrapperRef2 = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState('0');

  const handleConfirmation = () => {
    if (!deleteMap || (confirmation && confirmation.type === 'load')) {
      loadMap();
    } else {
      deleteMap();
    }
    setConfirmation(undefined);
  };

  const handleCancel = () => {
    setConfirmation(undefined);
  };

  const handleLoadClick = () => {
    if (!mapSaved)
      setConfirmation({
        type: 'load',
        message:
          'You have unsaved changes. If you continue these changes will be gone',
        button: 'Continue',
        confirmationType: 'info',
      });
    else
      setConfirmation({
        type: 'load',
        message: 'Do you want to load the map?',
        button: 'Load',
        confirmationType: 'info',
      });
  };

  const handleDeleteClick = () => {
    setConfirmation({
      type: 'delete',
      message: 'Are you sure you want to delete this map?',
      button: 'Delete',
      confirmationType: 'danger',
    });
  };

  useEffect(() => {
    if (confirmation) setHeight(wrapperRef1.current?.clientHeight + 'px');
    else if (isActive) setHeight(wrapperRef2.current?.clientHeight + 'px');
    else setHeight('0');
  }, [confirmation, isActive]);

  useEffect(() => {
    if (!growRef.current) return;
    growRef.current.style.height = height;
  }, [height]);

  useEffect(() => {
    if (!isActive) {
      if (!growRef.current) return;
      growRef.current.style.height = '0px';
      // match the height transition to first finsh the animation
      setTimeout(() => {
        setConfirmation(undefined);
      }, 200);
    }
  }, [isActive]);

  return (
    <div
      className={`${styles.mapListItem} ${
        isActive && styles['mapListItem-active']
      }`}
    >
      <div
        className={`${isActive && styles['mapListItem__content-active']} ${
          styles.mapListItem__content
        }`}
      >
        <p>{name}</p>
        <p>
          {size}x
          <span>
            <div
              className={styles.mapListItem__tile}
              style={{ backgroundImage: `url(${TileImg})` }}
            ></div>
          </span>
        </p>
      </div>
      <div ref={growRef} className={styles.grow}>
        {confirmation ? (
          <div ref={wrapperRef1}>
            <Confirmation
              onConfirmation={handleConfirmation}
              onCancel={handleCancel}
              message={confirmation.message}
              confirmButtonText={confirmation.button}
              confirmationButtonType={confirmation.confirmationType}
            />
          </div>
        ) : (
          <div ref={wrapperRef2}>
            <Button type="info" onClick={handleLoadClick}>
              Load
            </Button>
            {deleteMap && (
              <Button
                className={styles.mapListItem__cancelButton}
                type="danger"
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
