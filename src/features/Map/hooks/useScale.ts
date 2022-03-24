import { RefObject, useCallback, useEffect, useState } from 'react';
import { addPoints, ORIGIN, Point } from '../utils';
import { useMousePos } from './useMousePos';

const ZOOM_SENSITIVITY = 500;

export const useScale = (
  ref: RefObject<HTMLElement | null>,
  currentScale: number,
  viewportTopLeft: Point
) => {
  // const [scaleAfterZoom, setScaleAfterZoom] = useState(currentScale);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [scaledViewPortTopLeft, setScaledViewPortTopLeft] = useState(ORIGIN);
  const [diffViewPortTopLeft, setDiffViewPortTopLeft] = useState(ORIGIN);
  const mousePosRef = useMousePos(ref);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      const zoom = 1 - event.deltaY / ZOOM_SENSITIVITY;
      setZoomLevel(zoom);
      const viewportTopLeftDelta = {
        x: (mousePosRef.current.x / currentScale) * (1 - 1 / zoom),
        y: (mousePosRef.current.y / currentScale) * (1 - 1 / zoom),
      };
      setDiffViewPortTopLeft(viewportTopLeftDelta);
      // const newOrigin = addPoints(viewportTopLeft, viewportTopLeftDelta);
      // setScaledViewPortTopLeft(newOrigin);
      // setScaleAfterZoom(currentScale * zoom);
    },
    [mousePosRef, currentScale]
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.addEventListener('wheel', handleWheel);
    return () => node.removeEventListener('wheel', handleWheel);
  }, [ref, handleWheel]);

  return { zoomLevel, diffViewPortTopLeft };
};
