import Town from '../images/cities/Town.svg';
import City from '../images/cities/City.svg';
import Village from '../images/cities/Village.svg';
import Sight from '../images/cities/Sight.svg';
import { ITileCategory } from './interfaces';

export const cityTiles: ITileCategory = {
  64: {
    svg: Town,
    height: 218.1,
    category: 'city',
    streetConnections: [0, 1, 2, 3, 4, 5],
    railConnections: [0, 1, 2, 3, 4, 5],
    airport: false,
    shipping: true,
  },
  65: {
    svg: City,
    height: 293.1,
    category: 'city',
    streetConnections: [0, 1, 2, 3, 4, 5],
    railConnections: [0, 1, 2, 3, 4, 5],
    airport: true,
    shipping: true,
  },
  66: {
    svg: Village,
    height: 171.1,
    category: 'city',
    streetConnections: [0, 1, 2, 3, 4, 5],
    railConnections: undefined,
    airport: false,
    shipping: false,
  },
  67: {
    svg: Sight,
    height: 182.38,
    category: 'city',
    streetConnections: [0, 1, 2, 3, 4, 5],
    railConnections: undefined,
    airport: false,
    shipping: true,
  },
};
