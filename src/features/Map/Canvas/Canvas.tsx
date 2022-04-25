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
  removeTile,
  updateScale,
  updateViewPortTopLeft,
} from '../mapSlice';
import { useMousePos, usePan } from '../hooks';
import { drawHexGrid } from '../utils/drawGridHelpers';
// import { getHex } from '../../../helpers/grid';
import { getHex } from '../utils/hexHelper';
// import { offsetFromCube } from '../../../helpers/hexLogic';
import { offsetFromCube } from '../utils/hexLogic';

const ZOOM_SENSITIVITY = 500;
interface CanvasProps {
  canvasHeight: number;
  canvasWidth: number;
}

export const Canvas = ({ canvasHeight, canvasWidth }: CanvasProps) => {
  const dispatch = useAppDispatch();
  // scale and current top left point of visible canvas
  const { scale, viewPortTopLeft, map, activeSelector, selectedTile } =
    useAppSelector((state) => state.map);
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

  useEffect(() => {
    lastOffset.current = offset;
  }, [offset]);

  // Initial Context Setup
  useLayoutEffect(() => {
    if (didMount) return;
    if (!canvasRef.current) return;
    const renderContext = canvasRef.current.getContext('2d');
    if (!renderContext) return;
    // canvasRef.current.oncontextmenu = (e) => {
    //   e.preventDefault();
    //   e.stopPropagation();
    // };
    renderContext.canvas.width = canvasWidth;
    renderContext.canvas.height = canvasHeight;
    renderContext.scale(scale, scale);
    renderContext.translate(-viewPortTopLeft.x, -viewPortTopLeft.y);
    setContext(renderContext);
    // hacky way of waiting for width to be correct with and not 0
    if (canvasWidth !== 0) setDidMount(true);
  }, [canvasHeight, canvasWidth, scale, viewPortTopLeft, didMount]);

  useLayoutEffect(() => {
    if (!context) return;
    let requestId: number;
    const render = () => {
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.restore();
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
      let hoveredHex = '';
      if (activeSelector === 'hand' || activeSelector === 'eraser') {
        const currentMousePos = {
          x: mousePosRef.current.x / scale + viewPortTopLeft.x,
          y: mousePosRef.current.y / scale + viewPortTopLeft.y,
        };
        const hexPos = getHex(currentMousePos);
        const offsetPos = offsetFromCube(hexPos);
        hoveredHex = '' + offsetPos.row + ',' + offsetPos.col;
      }

      drawHexGrid(
        context,
        map,
        gridRange.rowStart,
        gridRange.rowEnd,
        gridRange.colStart,
        gridRange.colEnd,
        hoveredHex,
        selectedTile,
        activeSelector
      );
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
    activeSelector,
    selectedTile,
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
      if (activeSelector === 'eraser') dispatch(removeTile(offsetPos));
      if (activeSelector === 'hand') dispatch(addTile(offsetPos));
    }
  };

  const handleMouseMove = () => {
    setIsMoving(true);
  };

  // useLayoutEffect(() => {
  //   if (hoveredGrid) {
  //     dispatch(addTile(hoveredGrid));
  //   }
  // }, [hoveredGrid, dispatch]);

  return (
    <>
      <canvas
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
