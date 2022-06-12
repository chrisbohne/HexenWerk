import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  WheelEvent,
} from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/store';
import {
  diffPoints,
  getMouseOffset,
  ORIGIN,
  scalePoint,
} from '../_utils/canvasHelpers';
import {
  addTile,
  changeDestination,
  changeMapSaved,
  changeMode,
  changeRoute,
  changeStartingPoint,
  removeTile,
  updateScale,
  updateViewPortTopLeft,
} from '../mapSlice';
import { useMousePos, usePan } from '../_hooks';
import {
  availableTiles,
  drawGrid,
  drawRoute,
  drawStartingPointAndDestination,
  getHoveredHex,
  getVisibleGridRange,
} from '../_utils/drawGridHelpers';
import { getHex } from '../_utils/hexHelper';
import { offsetFromCube } from '../_utils/hexLogic';
import styles from './Canvas.module.scss';
import { CanvasProps } from '../_interfaces';
import { usePreCanvas } from '../_hooks/usePreCanvas';
import { zoomLevels } from '../_constants/canvas';
import { Spinner } from '../../../components';

export const Canvas = ({ canvasHeight, canvasWidth }: CanvasProps) => {
  const dispatch = useAppDispatch();
  const {
    scale,
    viewPortTopLeft,
    map,
    mode,
    selectedTile,
    startingPoint,
    destination,
    route,
  } = useAppSelector((state) => state.map);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [offset, startPan] = usePan(canvasRef);
  const lastOffset = useRef(ORIGIN);
  const mousePosRef = useMousePos(canvasRef);

  const [isMoving, setIsMoving] = useState(false);
  const [hoveredHexTest, setHoveredHexTest] = useState('');
  const [cityTileIsHovered, setCityTileIsHovered] = useState(false);
  const { preCanvas, isLoading } = usePreCanvas();
  const [zoomLevelIndex, setZoomLevelIndex] = useState(0);

  useEffect(() => {
    lastOffset.current = offset;
  }, [offset]);

  useEffect(() => {
    const index = zoomLevels.findIndex((el) => el === scale);
    setZoomLevelIndex(index);
  }, [scale]);

  useEffect(() => {
    dispatch(changeMode('none'));
  }, [dispatch]);

  // Initial Context Setup
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    if (!canvasWidth) return;
    const renderContext = canvasRef.current.getContext('2d');
    if (!renderContext) return;
    renderContext.canvas.width = canvasWidth;
    renderContext.canvas.height = canvasHeight;
    renderContext.scale(scale, scale);
    renderContext.translate(-viewPortTopLeft.x, -viewPortTopLeft.y);
    setContext(renderContext);
  }, [canvasHeight, canvasWidth, scale, viewPortTopLeft]);

  useLayoutEffect(() => {
    if (!context) return;
    let requestId: number;
    const render = () => {
      if (!canvasRef.current) return;
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.restore();

      const visibleGridRange = getVisibleGridRange(
        viewPortTopLeft,
        scale,
        canvasWidth,
        canvasHeight
      );

      const canvasData = {
        x: viewPortTopLeft.x,
        y: viewPortTopLeft.y,
        width: canvasWidth / scale,
        height: canvasHeight / scale,
      };

      const hoveredHex = getHoveredHex(
        mousePosRef.current,
        viewPortTopLeft,
        scale
      );

      setHoveredHexTest(hoveredHex);

      const cityHovered =
        hoveredHex &&
        map[hoveredHex] &&
        availableTiles[+map[hoveredHex]].category === 'city';

      setCityTileIsHovered(cityHovered === true);

      if (!preCanvas) return;

      drawGrid(
        context,
        map,
        visibleGridRange,
        mode,
        preCanvas,
        zoomLevelIndex,
        scale,
        hoveredHex,
        selectedTile,
        canvasData
      );

      if (mode === 'destinationSelection' || mode === 'startingPointSelection')
        drawStartingPointAndDestination(
          context,
          map,
          hoveredHex,
          startingPoint,
          destination,
          mode,
          preCanvas,
          zoomLevelIndex,
          scale
        );

      if (mode === 'direction' && route && route.distance !== Infinity) {
        drawStartingPointAndDestination(
          context,
          map,
          hoveredHex,
          startingPoint,
          destination,
          mode,
          preCanvas,
          zoomLevelIndex,
          scale
        );
        drawRoute(context, route.path);
      }

      if (mode === 'direction') {
        drawStartingPointAndDestination(
          context,
          map,
          hoveredHex,
          startingPoint,
          destination,
          mode,
          preCanvas,
          zoomLevelIndex,
          scale
        );
      }

      requestId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [
    context,
    viewPortTopLeft,
    scale,
    canvasHeight,
    canvasWidth,
    map,
    mousePosRef,
    mode,
    selectedTile,
    destination,
    startingPoint,
    route,
    preCanvas,
    zoomLevelIndex,
  ]);

  // update new canvas position based on current offset and last offset
  useLayoutEffect(() => {
    if (offset === lastOffset.current) return;
    const scaledOffsetDiff = scalePoint(
      diffPoints(offset, lastOffset.current),
      scale
    );
    context?.translate(scaledOffsetDiff.x, scaledOffsetDiff.y);
    dispatch(updateViewPortTopLeft(scaledOffsetDiff));
  }, [context, offset, scale, dispatch]);

  // update new canvas position based on scale

  const handleWheel = (e: WheelEvent) => {
    const { mouseOffset, newScale } = getMouseOffset(e, scale, mousePosRef);
    if (!mouseOffset) return;

    // const index = zoomLevels.findIndex((el) => el === newScale);
    // setZoomLevelIndex(index);

    dispatch(
      updateViewPortTopLeft({
        x: -mouseOffset.x,
        y: -mouseOffset.y,
      })
    );
    dispatch(updateScale(newScale));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMoving(false);
    startPan(e);
  };

  const handleMouseUp = () => {
    if (!isMoving) {
      const clickPos = {
        x: mousePosRef.current.x / scale + viewPortTopLeft.x,
        y: mousePosRef.current.y / scale + viewPortTopLeft.y,
      };
      const hexPos = getHex(clickPos);
      const offsetPos = offsetFromCube(hexPos);
      const hoveredHex = '' + offsetPos.row + ',' + offsetPos.col;
      if (mode === 'eraser') {
        dispatch(removeTile(offsetPos));
        dispatch(changeMapSaved(false));
        dispatch(changeRoute(undefined));
        if (cityTileIsHovered) {
          if (JSON.stringify(offsetPos) === JSON.stringify(destination)) {
            dispatch(changeDestination(undefined));
          } else if (
            JSON.stringify(offsetPos) === JSON.stringify(startingPoint)
          )
            dispatch(changeStartingPoint(undefined));
        }
      }
      if (mode === 'append') {
        dispatch(addTile(offsetPos));
        dispatch(changeMapSaved(false));
        dispatch(changeRoute(undefined));
      }
      if (mode === 'startingPointSelection') {
        const tileNum = map[hoveredHex];
        if (tileNum && availableTiles[+tileNum].category === 'city') {
          dispatch(changeStartingPoint(offsetPos));

          if (
            offsetPos.col === destination?.col &&
            offsetPos.row === destination?.row
          ) {
            dispatch(changeDestination(undefined));
          }
          dispatch(changeMode('direction'));
        }
      }
      if (mode === 'destinationSelection') {
        const tileNum = map[hoveredHex];
        if (tileNum && availableTiles[+tileNum].category === 'city') {
          dispatch(changeDestination(offsetPos));
          if (
            offsetPos.col === startingPoint?.col &&
            offsetPos.row === startingPoint?.row
          ) {
            dispatch(changeStartingPoint(undefined));
          }
          dispatch(changeMode('direction'));
        }
      }
    }
  };

  const handleMouseMove = () => {
    setIsMoving(true);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <canvas
        style={{
          cursor:
            mode === 'append' ||
            (mode === 'eraser' && map[hoveredHexTest]) ||
            ((mode === 'startingPointSelection' ||
              mode === 'destinationSelection') &&
              cityTileIsHovered)
              ? 'pointer'
              : 'default',
        }}
        className={styles.canvas}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        width={canvasWidth}
        height={canvasHeight}
      />
    </>
  );
};
