import { ChangeEvent } from 'react';
import { GridPosition, mapMode, Route, Weights } from './map.interface';

export interface DirectionsMenuProps {
  closeDirectionsMenu: () => void;
  directionsMenuOpen: boolean;
}

export interface DirectionsProps {
  closeDirectionsMenu: () => void;
  directionsMenuOpen: boolean;
  openDirectionsMenu: () => void;
  closeCategoryMenu: () => void;
}

export interface DirectionsNoticeProps {
  mode: mapMode;
  onCancel: () => void;
}

export interface DetailSectionProps {
  route: Route;
}

export interface LocationSectionProps {
  startingPoint: GridPosition | undefined;
  destination: GridPosition | undefined;
  handleLocationCancel: (type: LocationSelection) => void;
  handleLocationClick: (type: LocationSelection) => void;
}

export interface VehicleSectionProps {
  weights: Weights;
  handleVehicleChange: (
    e: ChangeEvent<HTMLInputElement>,
    type: Transportation
  ) => void;
}

export interface RouteSectionProps {
  calculateRoute: () => void;
  showRouteUpdate: boolean;
  handleRouteCancel: () => void;
  route: Route | undefined;
}

export type LocationSelection = 'startingPoint' | 'destination';

export type Transportation = 'street' | 'rail' | 'shipping' | 'flight';
