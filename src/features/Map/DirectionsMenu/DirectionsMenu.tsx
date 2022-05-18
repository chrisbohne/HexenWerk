import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import Icon from '../../../components/Icon/Icon';
import { addNotification } from '../../../components/Notification/notificationSlice';
import {
  changeDestination,
  changeMode,
  changeRoute,
  changeStartingPoint,
  changeWeights,
} from '../mapSlice';
import { dijkstra } from '../utils/dijkstraAlgo';
import { getHexHash } from '../utils/drawGridHelpers';
import { mapToGraph } from '../utils/graphHelper';
import styles from './DirectionsMenu.module.scss';

interface DirectionsMenuProps {
  closeDirectionsMenu: () => void;
  directionsMenuOpen: boolean;
}

export const DirectionsMenu = ({
  closeDirectionsMenu,
  directionsMenuOpen,
}: DirectionsMenuProps) => {
  const dispatch = useAppDispatch();
  const [showRouteUpdate, setShowRouteUpdate] = useState(false);

  const { map, weights, startingPoint, destination, route } = useAppSelector(
    (state) => state.map
  );

  const updateMode = (
    mode: 'startingPointSelection' | 'destinationSelection'
  ) => {
    dispatch(changeMode(mode));
  };

  const handleClose = () => {
    closeDirectionsMenu();

    dispatch(changeMode('none'));
  };

  const getDijkstraResult = useCallback(() => {
    if (!startingPoint) return;
    if (!destination) return;
    const graph = mapToGraph(map, weights);
    const startingHash = 'C:' + getHexHash(startingPoint);
    const destinationHash = 'C:' + getHexHash(destination);
    const result = dijkstra(graph, startingHash, destinationHash);
    return result;
  }, [destination, startingPoint, map, weights]);

  const calculateRoute = () => {
    if (!startingPoint) {
      dispatch(
        addNotification({ type: 'Info', message: 'Select a Starting Point' })
      );
      return;
    }
    if (!destination) {
      dispatch(
        addNotification({ type: 'Info', message: 'Select a Destination' })
      );
      return;
    }
    const result = getDijkstraResult();
    if (result?.distance === Infinity) {
      dispatch(
        addNotification({ type: 'Info', message: 'There is no route possible' })
      );
      return;
    }
    dispatch(changeRoute(result));
    setShowRouteUpdate(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    dispatch(changeWeights({ type, value: +e.target.value }));
    dispatch(changeMode('direction'));
  };

  useEffect(() => {
    if (showRouteUpdate) {
      const delayDebounceFn = setTimeout(async () => {
        const result = getDijkstraResult();
        dispatch(changeRoute(result));
      }, 600);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [weights, dispatch, getDijkstraResult, showRouteUpdate]);

  return (
    <>
      <div
        className={`${styles.directionsMenu} ${
          directionsMenuOpen && styles['directionsMenu--open']
        }`}
      >
        <div className={styles.directionsMenu__closeContainer}>
          <Icon
            className={styles.directionsMenu__closeButton}
            onClick={handleClose}
            name="close"
          />
        </div>
        <hr></hr>
        <div>
          <h3>Locations</h3>
          <div>
            <button
              onClick={() => updateMode('startingPointSelection')}
              className={styles.directionsMenu__button}
            >
              Choose Starting Point
            </button>
            <p>{startingPoint ? 'Selected' : 'Not Selected'}</p>
            <Icon
              name="delete"
              onClick={() => {
                dispatch(changeStartingPoint(undefined));
                dispatch(changeRoute(undefined));
                setShowRouteUpdate(false);
              }}
            />
          </div>
          <div>
            <button
              className={styles.directionsMenu__button}
              onClick={() => updateMode('destinationSelection')}
            >
              Choose Destination
            </button>
            <p>{destination ? 'Selected' : 'Not Selected'}</p>
            <Icon
              name="delete"
              onClick={() => {
                dispatch(changeDestination(undefined));
                dispatch(changeRoute(undefined));
                setShowRouteUpdate(false);
              }}
            />
          </div>
        </div>
        <hr></hr>
        <div>
          <h3>Vehicles</h3>
          <label htmlFor="carInput">Car</label>
          <input
            onChange={(e) => handleChange(e, 'street')}
            value={weights.street}
            id="carInput"
            type="range"
            min="1"
            max="10"
          ></input>
          <p>{weights.street + ' minutes per hex'}</p>

          <label htmlFor="trainInput">Train</label>
          <input
            onChange={(e) => handleChange(e, 'rail')}
            value={weights.rail}
            id="trainInput"
            type="range"
            min="1"
            max="10"
          ></input>
          <p>{weights.rail + ' minutes per hex'}</p>

          <label htmlFor="planeInput">Plane</label>
          <input
            onChange={(e) => handleChange(e, 'flight')}
            value={weights.flight}
            id="planeInput"
            type="range"
            min="1"
            max="10"
          ></input>
          <p>{weights.flight + ' minutes per hex'}</p>

          <label htmlFor="shipInput">Ship</label>
          <input
            onChange={(e) => handleChange(e, 'shipping')}
            value={weights.shipping}
            id="shipInput"
            type="range"
            min="1"
            max="10"
          ></input>
          <p>{weights.shipping + ' minutes per hex'}</p>
        </div>
        <hr></hr>
        <h3>Calculate Route</h3>
        <Icon name="route" onClick={calculateRoute} />
        <Icon
          name="delete"
          onClick={() => {
            dispatch(changeRoute(undefined));
            setShowRouteUpdate(false);
          }}
        />
        {route?.distance && <p>Duration of Trip: {route?.distance}min</p>}
      </div>
    </>
  );
};
