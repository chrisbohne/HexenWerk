import Water from '../images/Water.svg';
import { ITileCategory } from './interfaces';

export const natureTiles: ITileCategory = {
  8: {
    svg: Water,
    height: 111.6,
    category: 'nature',
    streetConnections: undefined,
    railConnections: undefined,
    airport: false,
  },
};
