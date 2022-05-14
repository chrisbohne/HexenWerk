import Rail52 from '../images/rails/Rail52.svg';
import Rail41 from '../images/rails/Rail41.svg';
import Rail30 from '../images/rails/Rail30.svg';
import Rail51 from '../images/rails/Rail51.svg';
import Rail42 from '../images/rails/Rail42.svg';
import Rail53 from '../images/rails/Rail53.svg';
import Rail40 from '../images/rails/Rail40.svg';
import Rail31 from '../images/rails/Rail31.svg';
import Rail20 from '../images/rails/Rail20.svg';
import Rail41Street52 from '../images/rails/Rail41Street52.svg';
import Rail30Street52 from '../images/rails/Rail30Street52.svg';
import Rail52Street30 from '../images/rails/Rail52Street30.svg';
import Rail30Street41 from '../images/rails/Rail30Street41.svg';
import Rail41Street30 from '../images/rails/Rail41Street30.svg';
import Rail52Street41 from '../images/rails/Rail52Street41.svg';
import { ITileCategory } from './interfaces';

export const railTiles: ITileCategory = {
  49: {
    svg: Rail52,
    height: 138.6,
    category: 'rails',
    railConnections: [5, 2],
    streetConnections: undefined,
    airport: false,
    shipping: false,
  },
  50: {
    svg: Rail41,
    height: 136.6,
    category: 'rails',
    railConnections: [4, 1],
    streetConnections: undefined,
    airport: false,
    shipping: false,
  },
  51: {
    svg: Rail30,
    height: 136.6,
    category: 'rails',
    railConnections: [3, 0],
    streetConnections: undefined,
    airport: false,
    shipping: false,
  },
  52: {
    svg: Rail51,
    height: 138.6,
    category: 'rails',
    railConnections: [5, 1],
    streetConnections: undefined,
    airport: false,
    shipping: false,
  },
  53: {
    svg: Rail42,
    height: 136.6,
    category: 'rails',
    railConnections: [4, 2],
    streetConnections: undefined,
    airport: false,
    shipping: false,
  },
  54: {
    svg: Rail53,
    height: 138.6,
    category: 'rails',
    railConnections: [5, 3],
    streetConnections: undefined,
    airport: false,
    shipping: false,
  },
  55: {
    svg: Rail40,
    height: 136.6,
    category: 'rails',
    railConnections: [4, 0],
    streetConnections: undefined,
    airport: false,
    shipping: false,
  },
  56: {
    svg: Rail31,
    height: 136.6,
    category: 'rails',
    railConnections: [3, 1],
    streetConnections: undefined,
    airport: false,
    shipping: false,
  },
  57: {
    svg: Rail20,
    height: 136.6,
    category: 'rails',
    railConnections: [2, 0],
    streetConnections: undefined,
    airport: false,
    shipping: false,
  },
  58: {
    svg: Rail41Street52,
    height: 138.6,
    category: 'railsAndStreet',
    railConnections: [4, 1],
    streetConnections: [5, 2],
    airport: false,
    shipping: false,
  },
  59: {
    svg: Rail30Street52,
    height: 138.6,
    category: 'railsAndStreet',
    railConnections: [3, 0],
    streetConnections: [5, 2],
    airport: false,
    shipping: false,
  },
  60: {
    svg: Rail52Street30,
    height: 138.6,
    category: 'railsAndStreet',
    railConnections: [5, 2],
    streetConnections: [3, 0],
    airport: false,
    shipping: false,
  },
  61: {
    svg: Rail30Street41,
    height: 136.6,
    category: 'railsAndStreet',
    railConnections: [3, 0],
    streetConnections: [4, 1],
    airport: false,
    shipping: false,
  },
  62: {
    svg: Rail41Street30,
    height: 136.6,
    category: 'railsAndStreet',
    railConnections: [4, 1],
    streetConnections: [3, 0],
    airport: false,
    shipping: false,
  },
  63: {
    svg: Rail52Street41,
    height: 138.6,
    category: 'railsAndStreet',
    railConnections: [5, 2],
    streetConnections: [4, 1],
    airport: false,
    shipping: false,
  },
};
