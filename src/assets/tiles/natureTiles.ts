import Water from '../images/nature/Water.svg';
import Mountain from '../images/nature/Mountain.svg';
import Forest from '../images/nature/Forest.svg';
import Grass from '../images/nature/Grass.svg';
import Grain from '../images/nature/Grain.svg';
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
    height: 231.05,
    category: 'nature',
    streetConnections: undefined,
    railConnections: undefined,
    airport: false,
    shipping: false,
  },
  70: {
    svg: Forest,
    height: 197.1,
    category: 'nature',
    streetConnections: undefined,
    railConnections: undefined,
    airport: false,
    shipping: false,
  },
  71: {
    svg: Grass,
    height: 136.1,
    category: 'nature',
    streetConnections: undefined,
    railConnections: undefined,
    airport: false,
    shipping: false,
  },
  72: {
    svg: Grain,
    height: 137.6,
    category: 'nature',
    streetConnections: undefined,
    railConnections: undefined,
    airport: false,
    shipping: false,
  },
};
