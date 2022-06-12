import {
  cityTiles,
  natureTiles,
  railTiles,
  streetTiles,
} from '../../../assets/tiles';
import {
  CanvasData,
  GridPosition,
  GridRange,
  IOffsetHex,
  mapData,
  mapMode,
  PathSection,
  Point,
} from '../_interfaces';
import { hexDrawLine, offsetFromCube, offsetToCube } from './hexLogic';
import { getHex } from './hexHelper';
import { MAX_SCALE } from '../_constants/canvas';

interface ICity {
  height: number;
  tileNum: string;
  topLeftPoint: {
    x: number;
    y: number;
  };
}

const tileHeight = Math.sqrt(3) * 50;
const tileWidth = 200;

export const availableTiles = {
  ...streetTiles,
  ...railTiles,
  ...cityTiles,
  ...natureTiles,
};

export const drawGrid = (
  context: CanvasRenderingContext2D,
  map: mapData,
  visibleGridRange: GridRange,
  mode: mapMode,
  preCanvas: HTMLCanvasElement,
  zoomLevelIndex: number,
  scale: number,
  hoveredHex?: string,
  selectedTile?: string,
  canvasData?: CanvasData
) => {
  const locationsToHighlight: ICity[] = [];
  const { rowStart, rowEnd, colStart, colEnd } = visibleGridRange;
  // We need to render more rows because of the city tile height
  for (let row = rowStart; row <= rowEnd + 3; row++) {
    for (
      let evenCol = colStart % 2 === 0 ? colStart : colStart - 1;
      evenCol <= colEnd + 1;
      evenCol += 2
    ) {
      const gridPos = { row, col: evenCol };
      displayHexTile(
        context,
        gridPos,
        map,
        mode,
        hoveredHex || '',
        selectedTile || '',
        locationsToHighlight,
        preCanvas,
        zoomLevelIndex,
        scale
      );
    }
    for (
      let oddCol = colStart % 2 === 0 ? colStart + 1 : colStart;
      oddCol <= colEnd + 1;
      oddCol += 2
    ) {
      const gridPos = { row, col: oddCol };
      displayHexTile(
        context,
        gridPos,
        map,
        mode,
        hoveredHex || '',
        selectedTile || '',
        locationsToHighlight,
        preCanvas,
        zoomLevelIndex,
        scale
      );
    }
  }

  if (mode === 'startingPointSelection' || mode === 'destinationSelection') {
    canvasData &&
      highlightLocations(
        context,
        canvasData,
        locationsToHighlight,
        preCanvas,
        zoomLevelIndex,
        scale
      );
  }
};

// draw helpers

function displayHexTile(
  context: CanvasRenderingContext2D,
  gridPosition: GridPosition,
  map: mapData,
  mode: mapMode,
  hoveredHex: string,
  selectedTile: string,
  locationsToHighlight: ICity[],
  preCanvas: HTMLCanvasElement,
  zoomLevelIndex: number,
  scale: number
) {
  const hash = getHexHash(gridPosition);
  const { row, col } = gridPosition;
  const { tileNum, tile, effect } = getTileToDisplay(
    mode,
    map,
    hash,
    hoveredHex ? hoveredHex : '',
    selectedTile ? selectedTile : ''
  );

  if (tile) {
    const topLeftPoint = {
      x: ((col * 3) / 4) * tileWidth - tileWidth / 2,
      y:
        row * tileHeight -
        (col % 2 === 0 ? tileHeight / 2 : 0) -
        (tile.height - tileHeight),
    };
    if (
      (mode === 'startingPointSelection' && tile.category === 'city') ||
      (mode === 'destinationSelection' && tile.category === 'city')
    ) {
      locationsToHighlight.push({
        tileNum,
        height: tile.height,
        topLeftPoint,
        // isHovered: hash === hoveredHex ? true : false,
      });
    } else
      drawHex(
        context,
        tileNum,
        tile.height,
        topLeftPoint,
        effect,
        preCanvas,
        zoomLevelIndex,
        scale
      );
  }
}

function getTileToDisplay(
  mode: mapMode,
  map: mapData,
  hash: string,
  hoveredHex: string,
  selectedTile: string
) {
  let tileNum;
  let tile;
  let effect = 1;
  if (mode === 'append' && hash === hoveredHex && map[hash] !== selectedTile) {
    tileNum = selectedTile;
    tile = availableTiles[+tileNum];
    effect = 0.6;
  } else if (mode === 'eraser' && hash === hoveredHex && map[hash]) {
    tileNum = map[hash];
    tile = availableTiles[+tileNum];
    effect = 0.4;
  } else {
    tileNum = map[hash];
    tile = availableTiles[+tileNum];
  }
  return { tileNum, tile, effect };
}

function drawHex(
  context: CanvasRenderingContext2D,
  tileNum: string,
  height: number,
  topLeftPoint: Point,
  effect: number,
  preCanvas: HTMLCanvasElement,
  zoomLevelIndex: number,
  scale: number
) {
  context.globalAlpha = effect;
  context.drawImage(
    preCanvas,
    210 * MAX_SCALE * +tileNum,
    340 * zoomLevelIndex * MAX_SCALE,
    200 * scale,
    height * scale,
    topLeftPoint.x,
    topLeftPoint.y,
    200,
    height
  );
  context.globalAlpha = 1;
}

function highlightLocations(
  context: CanvasRenderingContext2D,
  canvasData: CanvasData,
  locationsToHighlight: ICity[],
  preCanvas: HTMLCanvasElement,
  zoomLevelIndex: number,
  scale: number
) {
  context.globalAlpha = 0.8;
  context.fillStyle = 'black';
  if (canvasData)
    context.fillRect(
      canvasData.x,
      canvasData.y,
      canvasData.width,
      canvasData.height
    );
  context.globalAlpha = 1;
  locationsToHighlight.forEach((tile) => {
    drawHex(
      context,
      tile.tileNum,
      tile.height,
      tile.topLeftPoint,
      1,
      preCanvas,
      zoomLevelIndex,
      scale
    );
  });
}

export function drawStartingPointAndDestination(
  context: CanvasRenderingContext2D,
  map: mapData,
  hoveredHex: string,
  startingPoint: GridPosition | undefined,
  destination: GridPosition | undefined,
  mode: mapMode,
  preCanvas: HTMLCanvasElement,
  zoomLevelIndex: number,
  scale: number
) {
  const points = [
    { point: startingPoint, i: 0 },
    { point: destination, i: 1 },
  ];

  const cityTileIsHovered =
    hoveredHex &&
    map[hoveredHex] &&
    availableTiles[+map[hoveredHex]].category === 'city';

  if (cityTileIsHovered && mode === 'startingPointSelection') {
    const test = hoveredHex.split(',');
    const test2 = { point: { row: +test[0], col: +test[1] }, i: 0 };
    points.shift();
    points.push(test2);
  }

  if (cityTileIsHovered && mode === 'destinationSelection') {
    const test = hoveredHex.split(',');
    const test2 = { point: { row: +test[0], col: +test[1] }, i: 1 };
    points[1] = test2;
  }

  points.forEach((point) => {
    if (point.point) {
      const { col, row } = point.point;
      const center = {
        x: ((col * 3) / 4) * tileWidth - 99 / 2,
        y: row * tileHeight - (col % 2 === 0 ? tileHeight / 2 : 0) - 171,
      };
      context.drawImage(
        preCanvas,
        210 * MAX_SCALE * (73 + point.i),
        340 * zoomLevelIndex * MAX_SCALE,
        99 * scale,
        171 * scale,
        center.x,
        center.y,
        99,
        171
      );
    }
  });
}

export function drawRoute(
  context: CanvasRenderingContext2D,
  path: PathSection[]
) {
  context.lineWidth = 10;
  path.forEach((el, index) => {
    if (el.type === 'street') {
      context.strokeStyle = 'salmon';
      context.fillStyle = 'salmon';
      context.setLineDash([10, 10]);
    }
    if (el.type === 'rail') {
      context.strokeStyle = 'goldenrod';
      context.fillStyle = 'goldenrod';
      context.setLineDash([30, 15]);
    }
    if (el.type === 'flight') {
      context.strokeStyle = 'blue';
      context.fillStyle = 'blue';
      context.setLineDash([25, 8, 8, 8]);
    }
    if (el.type === 'shipping') {
      context.strokeStyle = 'green';
      context.fillStyle = 'green';
      context.setLineDash([30, 8, 8, 8, 8, 8, 8, 8]);
    }

    const offsetHex = HexHashToOffset(el.tile.slice(2));
    const { col, row } = offsetHex;
    const center = {
      x: ((col * 3) / 4) * tileWidth,
      y: row * tileHeight - (col % 2 === 0 ? tileHeight / 2 : 0) - 8,
    };

    if (el.type === 'flight') {
      const nextElOffsetHex = HexHashToOffset(path[index + 1].tile.slice(2));
      const flight = hexDrawLine(
        offsetToCube(offsetHex),
        offsetToCube(nextElOffsetHex)
      );
      flight.forEach((el, index) => {
        const { col, row } = offsetFromCube(el);
        const center = {
          x: ((col * 3) / 4) * tileWidth,
          y: row * tileHeight - (col % 2 === 0 ? tileHeight / 2 : 0) - 8,
        };
        context.moveTo(center.x, center.y);
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI, false);
        context.fill();
        // const img = new Image();
        // img.src = Sphere;

        // context.drawImage(img, center.x - 33, center.y - 33);

        if (index === flight.length - 1) return;
        const { col: col2, row: row2 } = offsetFromCube(flight[index + 1]);
        const center2 = {
          x: ((col2 * 3) / 4) * tileWidth,
          y: row2 * tileHeight - (col2 % 2 === 0 ? tileHeight / 2 : 0) - 8,
        };
        context.beginPath();
        context.moveTo(center.x, center.y);
        context.lineTo(center2.x, center2.y);
        context.stroke();
      });
    } else {
      context.moveTo(center.x, center.y);
      context.beginPath();
      context.arc(center.x, center.y, 15, 0, 2 * Math.PI, false);
      context.fill();
      // const img = new Image();
      // img.src = Sphere;

      // context.drawImage(img, center.x - 33, center.y - 33);
      if (index === path.length - 1) return;
      const offsetHex2 = HexHashToOffset(path[index + 1].tile.slice(2));
      const { col: col2, row: row2 } = offsetHex2;
      const center2 = {
        x: ((col2 * 3) / 4) * tileWidth,
        y: row2 * tileHeight - (col2 % 2 === 0 ? tileHeight / 2 : 0) - 8,
      };
      context.beginPath();
      context.moveTo(center.x, center.y);
      context.lineTo(center2.x, center2.y);
      context.stroke();
    }
  });
  context.fillStyle = '';
}

// helpers

export function getHexHash(gridPosition: GridPosition) {
  return '' + gridPosition.row + ',' + gridPosition.col;
}

export function HexHashToOffset(hash: string): IOffsetHex {
  const splittedHash = hash.split(',');
  return { row: +splittedHash[0], col: +splittedHash[1] };
}

export const getVisibleGridRange = (
  viewPortTopLeft: Point,
  scale: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  const viewPortBottomRight = {
    x: viewPortTopLeft.x + canvasWidth / scale,
    y: viewPortTopLeft.y + canvasHeight / scale,
  };
  const currentTopLeftHex = offsetFromCube(getHex(viewPortTopLeft));
  const currentBottomRightHex = offsetFromCube(getHex(viewPortBottomRight));
  const gridRange = {
    rowStart: currentTopLeftHex.row,
    rowEnd: currentBottomRightHex.row,
    colStart: currentTopLeftHex.col,
    colEnd: currentBottomRightHex.col,
  };
  return gridRange;
};

export const getHoveredHex = (
  mousePos: Point,
  viewPortTopLeft: Point,
  scale: number
) => {
  const currentMousePos = {
    x: mousePos.x / scale + viewPortTopLeft.x,
    y: mousePos.y / scale + viewPortTopLeft.y,
  };
  const hexPos = getHex(currentMousePos);
  const offsetPos = offsetFromCube(hexPos);
  const hoveredHex = '' + offsetPos.row + ',' + offsetPos.col;
  return hoveredHex;
};

export function drawPath(
  path: { tile: string; type: string }[],
  context: CanvasRenderingContext2D
) {
  path.forEach((el) => {
    const { col, row } = HexHashToOffset(el.tile.slice(2));
    const center = {
      x: ((col * 3) / 4) * tileWidth - 75 / 2,
      y: row * tileHeight - (col % 2 === 0 ? tileHeight / 2 : 0) - 100,
    };
    context.beginPath();
    context.arc(center.x, center.y, 40, 0, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
    context.stroke();
  });
}
