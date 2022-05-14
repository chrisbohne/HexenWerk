import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import Icon from '../../../components/Icon/Icon';
import {
  changeDestination,
  changeMode,
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

  const { mode, map, weights, startingPoint, destination } = useAppSelector(
    (state) => state.map
  );

  const updateMode = (
    mode: 'startingPointSelection' | 'destinationSelection'
  ) => {
    dispatch(changeMode(mode));
  };

  const handleClose = () => {
    closeDirectionsMenu();
    if (mode === 'startingPointSelection' || mode === 'destinationSelection')
      dispatch(changeMode('none'));
  };

  const calculateRoute = () => {
    const graph = mapToGraph(map, weights);
    if (startingPoint && destination) {
      const startingHash = 'C:' + getHexHash(startingPoint);
      const destinationHash = 'C:' + getHexHash(destination);
      const result = dijkstra(graph, startingHash, destinationHash);
      console.log(result);
    }
  };

  return (
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
          <p>{startingPoint ? 'Selected' : ''}</p>
          <Icon
            name="delete"
            onClick={() => dispatch(changeStartingPoint(undefined))}
          />
        </div>
        <div>
          <button
            className={styles.directionsMenu__button}
            onClick={() => updateMode('destinationSelection')}
          >
            Choose Destination
          </button>
          <p>{destination ? 'Selected' : ''}</p>
          <Icon
            name="delete"
            onClick={() => dispatch(changeDestination(undefined))}
          />
        </div>
      </div>
      <hr></hr>
      <div>
        <h3>Vehicles</h3>
        <label htmlFor="carInput">Car</label>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(changeWeights({ type: 'street', value: +e.target.value }))
          }
          value={weights.street}
          id="carInput"
          type="range"
          min="1"
          max="10"
        ></input>
        <p>{weights.street + ' minutes per hex'}</p>

        <label htmlFor="trainInput">Train</label>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(changeWeights({ type: 'rail', value: +e.target.value }))
          }
          value={weights.rail}
          id="trainInput"
          type="range"
          min="1"
          max="10"
        ></input>
        <p>{weights.rail + ' minutes per hex'}</p>

        <label htmlFor="planeInput">Plane</label>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(changeWeights({ type: 'flight', value: +e.target.value }))
          }
          value={weights.flight}
          id="planeInput"
          type="range"
          min="1"
          max="10"
        ></input>
        <p>{weights.flight + ' minutes per hex'}</p>

        <label htmlFor="shipInput">Ship</label>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(
              changeWeights({ type: 'shipping', value: +e.target.value })
            )
          }
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
    </div>
  );
};
