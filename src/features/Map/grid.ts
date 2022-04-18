import { getCorners } from '../../helpers/grid';
import { Point } from './utils';
import streetTiles from '../../assets/tiles/streetTiles';

const tileHeight = Math.sqrt(3) * 50;
const tileWidth = 200;

const drawHex = (context: CanvasRenderingContext2D, center: Point) => {
  const corners = getCorners(center);
  context.beginPath();
  context.moveTo(corners[0].x, corners[0].y);
  for (let i = 1; i < 6; i++) {
    context.lineTo(corners[i].x, corners[i].y);
  }
  context.closePath();
  context.lineWidth = 0;
  context.fill();
};

const drawImage = (
  context: CanvasRenderingContext2D,
  center: Point,
  src: string
) => {
  const image = new Image();
  image.src = src;
  context.drawImage(image, center.x, center.y);
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
    [key: string]: number;
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
      const hash = '' + row + evenCol;
      if (map[hash]) {
        const tile = streetTiles[map[hash]];
        const center = {
          x: ((evenCol * 3) / 4) * tileWidth - tileWidth / 2,
          y: row * tileHeight - tileHeight / 2 - (tile.height - tileHeight),
        };
        drawImage(context, center, tile.svg);
      }
    }
    for (
      let oddCol = colStart % 2 === 0 ? colStart + 1 : colStart;
      oddCol <= colEnd + 1;
      oddCol += 2
    ) {
      const hash = '' + row + oddCol;
      if (map[hash]) {
        const tile = streetTiles[map[hash]];
        const center = {
          x: ((oddCol * 3) / 4) * tileWidth - tileWidth / 2,
          y: row * tileHeight - (tile.height - tileHeight),
        };
        drawImage(context, center, tile.svg);
      }
    }
  }
};
