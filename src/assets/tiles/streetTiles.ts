import Street52 from '../images/Street52.svg';
import Street30 from '../images/Street30.svg';
import Street41 from '../images/Street41.svg';
import Street430 from '../images/Street430.svg';
import Street530 from '../images/Street530.svg';
import { ITileCategory } from './interfaces';

export const streetTiles: ITileCategory = {
  1: {
    svg: Street52,
    height: 138.6,
    category: 'street',
    streetConnections: [5, 2],
    railConnections: undefined,
    airport: false,
  },
  2: {
    svg: Street30,
    height: 136.6,
    category: 'street',
    streetConnections: [3, 0],
    railConnections: undefined,
    airport: false,
  },
  3: {
    svg: Street41,
    height: 136.6,
    category: 'street',
    streetConnections: [4, 1],
    railConnections: undefined,
    airport: false,
  },
  4: {
    svg: Street430,
    height: 136.6,
    category: 'street',
    streetConnections: [4, 1],
    railConnections: undefined,
    airport: false,
  },
  5: {
    svg: Street530,
    height: 136.6,
    category: 'street',
    streetConnections: [4, 1],
    railConnections: undefined,
    airport: false,
  },
};
