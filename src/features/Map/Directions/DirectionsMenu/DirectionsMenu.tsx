import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { Divider, Icon } from '../../../../components';
import { addNotification } from '../../../../components/Notification/notificationSlice';
import {
  DirectionsMenuProps,
  LocationSelection,
  Route,
  Transportation,
} from '../../_interfaces';
import {
  changeDestination,
  changeMode,
  changeRoute,
  changeStartingPoint,
  changeWeights,
} from '../../mapSlice';
import { dijkstra } from '../../_utils/dijkstraAlgo';
import { getHexHash } from '../../_utils/drawGridHelpers';
import { mapToGraph } from '../../_utils/graphHelper';
import styles from './DirectionsMenu.module.scss';
import { CloseButton } from '../../../../components/Button/CloseButton';
import { LocationSection } from '../LocationSection/LocationSection';
import { VehicleSection } from '../VehicleSection/VehicleSection';
import { RouteSection } from '../RouteSection/RouteSection';
import { DetailSection } from '../DetailSection/DetailSection';

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

  const getDijkstraResult = useCallback((): Route => {
    if (!startingPoint)
      return { duration: Infinity, distance: Infinity, path: [] };
    if (!destination)
      return { duration: Infinity, distance: Infinity, path: [] };
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
    if (result?.duration === Infinity) {
      dispatch(
        addNotification({ type: 'Info', message: 'There is no route possible' })
      );
      return;
    }
    dispatch(changeRoute(result));
    setShowRouteUpdate(true);
  };

  const handleVehicleChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: Transportation
  ) => {
    dispatch(changeWeights({ type, value: +e.target.value }));
    dispatch(changeMode('direction'));
  };

  const handleLocationCancel = (type: LocationSelection) => {
    if (type === 'startingPoint') dispatch(changeStartingPoint(undefined));
    else dispatch(changeDestination(undefined));
    dispatch(changeRoute(undefined));
    setShowRouteUpdate(false);
  };

  const handleLocationClick = (type: LocationSelection) => {
    if (type === 'startingPoint') updateMode('startingPointSelection');
    else updateMode('destinationSelection');
  };

  const handleRouteCancel = () => {
    dispatch(changeRoute(undefined));
    setShowRouteUpdate(false);
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
          <CloseButton
            className={styles.directionsMenu__closeButton}
            onClose={handleClose}
          />
        </div>
        {route && route.duration && (
          <>
            <DetailSection route={route} />
            <Divider>
              <Icon name="route" />
            </Divider>
          </>
        )}
        <LocationSection
          startingPoint={startingPoint}
          destination={destination}
          handleLocationCancel={handleLocationCancel}
          handleLocationClick={handleLocationClick}
        />
        <Divider>
          <Icon name="route" />
        </Divider>
        <VehicleSection
          weights={weights}
          handleVehicleChange={handleVehicleChange}
        />
        <Divider>
          <Icon name="route" />
        </Divider>
        <RouteSection
          calculateRoute={calculateRoute}
          showRouteUpdate={showRouteUpdate}
          handleRouteCancel={handleRouteCancel}
          route={route}
        />
      </div>
    </>
  );
};
