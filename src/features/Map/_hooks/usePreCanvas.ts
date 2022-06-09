import { useEffect, useState } from 'react';
import { MAX_SCALE, zoomLevels } from '../_constants/canvas';
import { cachedTileElement } from '../_interfaces';
import { availableTiles } from '../_utils/drawGridHelpers';
import Destination from '../../../assets/images/DestinationLocation.svg';
import Start from '../../../assets/images/StartingLocation.svg';

export const usePreCanvas = () => {
  const [loadedImages, setLoadedImages] = useState<cachedTileElement[]>([]);
  const [preCanvas, setPreCanvas] = useState<HTMLCanvasElement>();
  // const [zoomLevelIndex, setZoomLevelIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const svgCache: cachedTileElement[] = [];
    const arr = Object.values(availableTiles);
    let counter = 0;
    const total = arr.length + 2;
    const alldone = () => {
      setLoadedImages(svgCache);
      setIsLoading(false);
    };
    const loaded = () => {
      counter++;
      if (counter >= total) {
        alldone();
      }
    };

    arr.forEach((el) => {
      const img = new Image();
      img.onload = loaded;
      img.src = el.svg;
      svgCache.push({ img, height: el.height, width: 200 });
    });

    const mapIcons = [Start, Destination];
    mapIcons.forEach((el) => {
      const img = new Image();
      img.onload = loaded;
      img.src = el;
      svgCache.push({ img, height: 171, width: 99 });
    });
  }, []);

  useEffect(() => {
    const numTiles = Object.keys(availableTiles).length + 2;

    const numOfZoomLevels = zoomLevels.length;
    const preCanvas = document.createElement('canvas');

    preCanvas.width = 210 * numTiles * MAX_SCALE;
    console.log(210 * numTiles * MAX_SCALE);
    const maxTileHeight = 340;
    preCanvas.height = maxTileHeight * MAX_SCALE * numOfZoomLevels;
    const preCtx = preCanvas.getContext('2d');

    for (let i = 0; i <= numOfZoomLevels; i++) {
      const scale = zoomLevels[i];
      loadedImages?.forEach((el, index) => {
        preCtx?.drawImage(
          el.img,
          index * 210 * MAX_SCALE,
          340 * i * MAX_SCALE,
          el.width * scale,
          el.height * scale
        );
      });
    }

    setPreCanvas(preCanvas);
  }, [loadedImages]);

  // useEffect(() => {
  //   const index = zoomLevels.findIndex((el) => el === scale);
  //   setZoomLevelIndex(index);
  // }, [scale]);

  return { preCanvas, isLoading };
};
