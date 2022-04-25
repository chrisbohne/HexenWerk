import {
  cityTiles,
  natureTiles,
  railTiles,
  streetTiles,
} from '../../../assets/tiles';
import { Point } from '../interfaces';

const tileHeight = Math.sqrt(3) * 50;
const tileWidth = 200;

// export const drawHex = (context: CanvasRenderingContext2D, point: Point) => {
//   const corners = getCorners(point);
//   context.globalAlpha = 0.4;
//   context.beginPath();
//   context.moveTo(corners[0].x, corners[0].y);
//   for (let i = 1; i < 6; i++) {
//     context.lineTo(corners[i].x, corners[i].y);
//   }
//   context.closePath();
//   // context.lineWidth = 4;
//   // context.strokeStyle = 'white';
//   // context.stroke();
//   context.fill();
//   context.globalAlpha = 1;
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

const drawImage = (
  context: CanvasRenderingContext2D,
  center: Point,
  id: string,
  height: number,
  isHovered: boolean,
  // isEraser: boolean
  mode: string
) => {
  if (isHovered) {
    context.globalAlpha = 0.6;
    if (mode === 'eraser') context.filter = 'grayscale(100%)';
  }
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
  context.globalAlpha = 1;
  context.filter = 'none';
};

export const drawHexGrid = (
  context: CanvasRenderingContext2D,
  map: {
    [key: string]: string;
  },
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  hoveredHex: string,
  selectedTile: string,
  // isEraser: boolean
  mode: string
) => {
  for (let row = rowStart; row <= rowEnd + 1; row++) {
    for (
      let evenCol = colStart % 2 === 0 ? colStart : colStart - 1;
      evenCol <= colEnd + 1;
      evenCol += 2
    ) {
      displayTile(row, evenCol, context, map, hoveredHex, selectedTile, mode);
    }
    for (
      let oddCol = colStart % 2 === 0 ? colStart + 1 : colStart;
      oddCol <= colEnd + 1;
      oddCol += 2
    ) {
      displayTile(row, oddCol, context, map, hoveredHex, selectedTile, mode);
    }
  }
};

function displayTile(
  row: number,
  col: number,
  context: CanvasRenderingContext2D,
  map: {
    [key: string]: string;
  },
  hoveredHex: string,
  selectedTile: string,
  mode: string
) {
  const hash = '' + row + ',' + col;
  let tileNum = '';
  let tile;
  let isHovered = false;
  if (hash === hoveredHex && mode === 'eraser' && map[hash]) {
    tileNum = map[hash];
    tile = availableTiles[+tileNum];
    isHovered = true;
  } else if (
    hash === hoveredHex &&
    map[hash] !== selectedTile &&
    mode !== 'eraser'
  ) {
    tileNum = selectedTile;
    tile = availableTiles[+selectedTile];
    isHovered = true;
  } else if (map[hash]) {
    tileNum = map[hash];
    tile = availableTiles[+tileNum];
  }
  if (tile) {
    const center = {
      x: ((col * 3) / 4) * tileWidth - tileWidth / 2,
      y:
        row * tileHeight -
        (col % 2 === 0 ? tileHeight / 2 : 0) -
        (tile.height - tileHeight),
    };
    drawImage(context, center, tileNum, tile.height, isHovered, mode);
  }
}
