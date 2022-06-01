import Water from '../images/nature/Water.svg';
import Mountain from '../images/nature/Mountain.svg';
import Forest from '../images/nature/Forest.svg';
import Grass from '../images/nature/Grass.svg';
import { ITileCategory } from './interfaces';

export const natureTiles: ITileCategory = {
  68: {
    svg: Water,
    height: 111.6,
    category: 'nature',
    streetConnections: undefined,
    railConnections: undefined,
    airport: false,
    shipping: true,
  },
  69: {
    svg: Mountain,
    height: 250.6,
    category: 'nature',
    streetConnections: undefined,
    railConnections: undefined,
    airport: false,
    shipping: false,
  },
  70: {
    svg: Forest,
    height: 160.6,
    category: 'nature',
    streetConnections: undefined,
    railConnections: undefined,
    airport: false,
    shipping: false,
  },
  71: {
    svg: Grass,
    height: 136.6,
    category: 'nature',
    streetConnections: undefined,
    railConnections: undefined,
    airport: false,
    shipping: false,
  },
};
