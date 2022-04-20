import Town from '../images/Town.svg';
import { ITileCategory } from './interfaces';

export const cityTiles: ITileCategory = {
  7: {
    svg: Town,
    height: 212.6,
    category: 'city',
    streetConnections: [0, 1, 2, 3, 4, 5],
    railConnections: [0, 1, 2, 3, 4, 5],
    airport: false,
  },
};
