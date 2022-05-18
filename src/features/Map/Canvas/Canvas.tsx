import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/store';
import styles from './Canvas.module.scss';
import {
  addPoints,
  diffPoints,
  ORIGIN,
  scalePoint,
} from '../utils/canvasHelpers';
import {
  addTile,
  changeDestination,
  changeMode,
  changeRoute,
  changeStartingPoint,
  removeTile,
  updateScale,
  updateViewPortTopLeft,
} from '../mapSlice';
import { useMousePos, usePan } from '../hooks';
import {
  availableTiles,
  drawGrid,
  drawRoute,
  drawStartingPointAndDestination,
  getHoveredHex,
  getVisibleGridRange,
} from '../utils/drawGridHelpers';
import { getHex } from '../utils/hexHelper';
import { offsetFromCube } from '../utils/hexLogic';

const ZOOM_SENSITIVITY = 500;
interface CanvasProps {
  canvasHeight: number;
  canvasWidth: number;
}

export const Canvas = ({ canvasHeight, canvasWidth }: CanvasProps) => {
  const dispatch = useAppDispatch();
  // scale and current top left point of visible canvas
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
  // reference with canvas once canvas loaded, and state for context
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  // custom hook for getting current panning state without zoom
  const [offset, startPan] = usePan(canvasRef);
  const lastOffset = useRef(ORIGIN);
  // custom hook for
  const mousePosRef = useMousePos(canvasRef);
  const [didMount, setDidMount] = useState(false);

  const [isMoving, setIsMoving] = useState(false);
  const [hoveredHexTest, setHoveredHexTest] = useState('');
  const [cityTileIsHovered, setCityTileIsHovered] = useState(false);

  useEffect(() => {
    lastOffset.current = offset;
  }, [offset]);

  // Initial Context Setup
  useLayoutEffect(() => {
    if (didMount) return;
    if (!canvasRef.current) return;
    const renderContext = canvasRef.current.getContext('2d');
    if (!renderContext) return;
    renderContext.canvas.width = canvasWidth;
    renderContext.canvas.height = canvasHeight;
    renderContext.scale(scale, scale);
    renderContext.translate(-viewPortTopLeft.x, -viewPortTopLeft.y);
    setContext(renderContext);
    // hacky way of waiting for width to be correct width and not 0
    if (canvasWidth !== 0) setDidMount(true);
  }, [canvasHeight, canvasWidth, scale, viewPortTopLeft, didMount]);

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

      drawGrid(
        context,
        map,
        visibleGridRange,
        mode,
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
          mode
        );

      if (mode === 'direction' && route && route.distance !== Infinity) {
        drawStartingPointAndDestination(
          context,
          map,
          hoveredHex,
          startingPoint,
          destination,
          mode
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
          mode
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
  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (!canvasElem) return;

    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      if (!context) return;
      const zoom = 1 - event.deltaY / ZOOM_SENSITIVITY;
      context.translate(viewPortTopLeft.x, viewPortTopLeft.y);

      const viewportTopLeftDelta = {
        x: (mousePosRef.current.x / scale) * (1 - 1 / zoom),
        y: (mousePosRef.current.y / scale) * (1 - 1 / zoom),
      };
      const newviewPortTopLeft = addPoints(
        viewPortTopLeft,
        viewportTopLeftDelta
      );
      context.scale(zoom, zoom);
      context.translate(-newviewPortTopLeft.x, -newviewPortTopLeft.y);

      dispatch(
        updateViewPortTopLeft({
          x: -viewportTopLeftDelta.x,
          y: -viewportTopLeftDelta.y,
        })
      );
      dispatch(updateScale(zoom));
    }

    canvasElem.addEventListener('wheel', handleWheel);
    return () => canvasElem.removeEventListener('wheel', handleWheel);
  }, [context, mousePosRef, scale, viewPortTopLeft, dispatch]);

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
        dispatch(changeRoute(undefined));
        if (cityTileIsHovered) {
          if (JSON.stringify(offsetPos) === JSON.stringify(destination)) {
            dispatch(changeDestination(undefined));
          } else if (
            JSON.stringify(offsetPos) === JSON.stringify(startingPoint)
          )
            dispatch(changeStartingPoint(undefined));
        }
        // update graph
      }
      if (mode === 'append') {
        dispatch(addTile(offsetPos));
        dispatch(changeRoute(undefined));
        // update graph
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
        width={canvasWidth}
        height={canvasHeight}
      />
    </>
  );
};
