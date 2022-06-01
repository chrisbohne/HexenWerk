import { railTiles, streetTiles, cityTiles, natureTiles } from './';

export const allTiles = {
  ...streetTiles,
  ...railTiles,
  ...cityTiles,
  ...natureTiles,
};
