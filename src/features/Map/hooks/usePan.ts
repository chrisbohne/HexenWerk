import React, { useCallback, useRef, useState } from 'react';
import { Point } from '../utils';

const ORIGIN = Object.freeze({ x: 0, y: 0 });

export const usePan = (): [Point, (e: React.MouseEvent) => void, boolean] => {
  const [panState, setPanState] = useState(ORIGIN);
  const lastPointRef = useRef(ORIGIN);
  const [isPanning, setIsPanning] = useState(false);

  const pan = useCallback((event: MouseEvent) => {
    const lastPoint = lastPointRef.current;
    const point = { x: event.pageX, y: event.pageY };
    lastPointRef.current = point;
    setIsPanning(true);
    setPanState((prevState) => {
      const delta = { x: point.x - lastPoint.x, y: point.y - lastPoint.y };
      const offset = { x: prevState.x + delta.x, y: prevState.y + delta.y };
      return offset;
    });
  }, []);

  const endPan = useCallback(() => {
    document.removeEventListener('mousemove', pan);
    document.removeEventListener('mouseup', endPan);
  }, [pan]);

  const startPan = useCallback(
    (event: React.MouseEvent) => {
      document.addEventListener('mousemove', pan);
      document.addEventListener('mouseup', endPan);
      lastPointRef.current = { x: event.pageX, y: event.pageY };
    },
    [pan, endPan]
  );

  return [panState, startPan, isPanning];
};
