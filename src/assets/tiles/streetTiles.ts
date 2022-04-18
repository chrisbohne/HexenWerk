import Street52 from '../images/Street52.svg';
import Street30 from '../images/Street30.svg';
import Street41 from '../images/Street41.svg';

interface ITile {
  [key: number]: {
    svg: string;
    height: number;
    category: string;
    streetConnections: number[];
  };
}

const streetTiles: ITile = {
  1: {
    svg: Street52,
    height: 138.6,
    category: 'street',
    streetConnections: [5, 2],
  },
  2: {
    svg: Street30,
    height: 136.6,
    category: 'street',
    streetConnections: [3, 0],
  },
  3: {
    svg: Street41,
    height: 136.6,
    category: 'street',
    streetConnections: [4, 1],
  },
};

export default streetTiles;
