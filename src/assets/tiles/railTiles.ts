import Rail52 from '../images/Rail52.svg';
import { ITileCategory } from './interfaces';

export const railTiles: ITileCategory = {
  6: {
    svg: Rail52,
    height: 138.6,
    category: 'rails',
    railConnections: [5, 2],
    streetConnections: undefined,
    airport: false,
  },
};
