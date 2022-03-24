import { RefObject, useCallback, useEffect, useState } from 'react';
import { addPoints, ORIGIN, Point } from '../features/Map/utils';
import { useMousePos } from './useMousePos';

const ZOOM_SENSITIVITY = 500;

export const useScaleTest = (
  ref: RefObject<HTMLElement | null>,
  currentScale: number,
  origin: Point
) => {
  const [newScale, setNewScale] = useState(currentScale);
  const [zoom, setZoom] = useState(1);
  const [newOrigin, setNewOrigin] = useState(ORIGIN);
  const mousePosRef = useMousePos(ref);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      const zoom = 1 - event.deltaY / ZOOM_SENSITIVITY;
      setZoom(zoom);
      const viewportTopLeftDelta = {
        x: (mousePosRef.current.x / newScale) * (1 - 1 / zoom),
        y: (mousePosRef.current.y / newScale) * (1 - 1 / zoom),
      };
      const newOrigin = addPoints(origin, viewportTopLeftDelta);
      setNewOrigin(newOrigin);
      setNewScale(newScale * zoom);
    },
    [mousePosRef, origin, newScale]
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.addEventListener('wheel', handleWheel);
    return () => node.removeEventListener('wheel', handleWheel);
  }, [ref, handleWheel]);

  return { zoom, newOrigin, newScale };
};
