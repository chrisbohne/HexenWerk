// import { getCorners } from './hexHelper';
import {
  cityTiles,
  natureTiles,
  railTiles,
  streetTiles,
} from '../../../assets/tiles';
import { Point } from '../interfaces';

// const tileHeight = Math.sqrt(3) * 100;
// const tileWidth = 400;
const tileHeight = Math.sqrt(3) * 50;
const tileWidth = 200;

// const drawHex = (context: CanvasRenderingContext2D, center: Point) => {
//   const corners = getCorners(center);
//   context.beginPath();
//   context.moveTo(corners[0].x, corners[0].y);
//   for (let i = 1; i < 6; i++) {
//     context.lineTo(corners[i].x, corners[i].y);
//   }
//   context.closePath();
//   context.lineWidth = 0;
//   context.fill();
// };

const availableTiles = {
  ...streetTiles,
  ...railTiles,
  ...cityTiles,
  ...natureTiles,
};

const numTiles = Object.keys(availableTiles).length;

// preload all images on seperate canvas as kind of sprite
const preCanvas = document.createElement('canvas');
// preCanvas.width = 420 * 8;
// preCanvas.height = 800;
preCanvas.width = 210 * numTiles;
preCanvas.height = 400;
const preCtx = preCanvas.getContext('2d');
for (let i = 0; i < numTiles; i++) {
  const img = new Image();
  img.src = availableTiles[i].svg;
  img.onload = () => {
    preCtx?.drawImage(img, i * 210, 0);
  };
}
// preCtx?.scale(2, 2);

const drawImage = (
  context: CanvasRenderingContext2D,
  center: Point,
  id: string,
  height: number,
  tile: any
) => {
  // context.drawImage(
  //   preCanvas,
  //   420 * +id,
  //   0,
  //   400,
  //   height * 2,
  //   center.x,
  //   center.y,
  //   400,
  //   height * 2
  // );
  context.drawImage(
    preCanvas,
    210 * +id,
    0,
    200,
    height,
    center.x,
    center.y,
    200,
    height
  );
  // const img = new Image();
  // img.src = tile.svg;
  // context.drawImage(img, center.x, center.y);
};

export const loadImages = (images: string[]) => {
  let loadCount = 0;
  const loadTotal = images.length;
  let preLoaded = false;

  const loadedImages = [];
  for (let i = 0; i < images.length; i++) {
    const image = new Image();
    image.onload = function () {
      loadCount++;
      if (loadCount === loadTotal) {
        preLoaded = true;
      }
    };
    image.src = images[i];
    loadedImages[i] = image;
  }
  return loadedImages;
};

export const drawHexGrid = (
  context: CanvasRenderingContext2D,
  map: {
    [key: string]: string;
  },
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number
) => {
  for (let row = rowStart; row <= rowEnd + 1; row++) {
    for (
      let evenCol = colStart % 2 === 0 ? colStart : colStart - 1;
      evenCol <= colEnd + 1;
      evenCol += 2
    ) {
      const hash = '' + row + ',' + evenCol;
      if (map[hash]) {
        const tile = availableTiles[map[hash]];
        const center = {
          x: ((evenCol * 3) / 4) * tileWidth - tileWidth / 2,
          // y: row * tileHeight - tileHeight / 2 - (tile.height * 2 - tileHeight),
          y: row * tileHeight - tileHeight / 2 - (tile.height - tileHeight),
        };
        drawImage(context, center, map[hash], tile.height, tile);
      }
    }
    for (
      let oddCol = colStart % 2 === 0 ? colStart + 1 : colStart;
      oddCol <= colEnd + 1;
      oddCol += 2
    ) {
      const hash = '' + row + ',' + oddCol;
      if (map[hash]) {
        const tile = availableTiles[map[hash]];
        const center = {
          x: ((oddCol * 3) / 4) * tileWidth - tileWidth / 2,
          // y: row * tileHeight - (tile.height * 2 - tileHeight),
          y: row * tileHeight - (tile.height - tileHeight),
        };
        drawImage(context, center, map[hash], tile.height, tile);
      }
    }
  }
};
