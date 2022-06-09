import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Point } from '../_interfaces';

const ORIGIN = Object.freeze({ x: 0, y: 0 });

export const usePan = (
  ref: RefObject<HTMLElement | null>
): [Point, (e: React.MouseEvent) => void, boolean] => {
  const [panState, setPanState] = useState(ORIGIN);
  const lastPointRef = useRef(ORIGIN);
  const [isPanning, setIsPanning] = useState(false);
  const [spacebarPressed, setSpacebarPressed] = useState(false);

  const pan = useCallback(
    (event: MouseEvent) => {
      if (spacebarPressed) {
        const lastPoint = lastPointRef.current;
        const point = { x: event.pageX, y: event.pageY };
        lastPointRef.current = point;
        setIsPanning(true);
        setPanState((prevState) => {
          const delta = { x: point.x - lastPoint.x, y: point.y - lastPoint.y };
          const offset = { x: prevState.x + delta.x, y: prevState.y + delta.y };
          return offset;
        });
      }
    },
    [spacebarPressed]
  );

  useEffect(() => {
    const allowMove = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (e.repeat) return;
        if (ref.current) ref.current.style.cursor = 'move';
        setSpacebarPressed(true);
      }
    };

    const blockMove = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (ref.current) ref.current.style.cursor = 'auto';
        setSpacebarPressed(false);
      }
    };

    document.addEventListener('keydown', allowMove);

    document.addEventListener('keyup', blockMove);

    return () => {
      document.removeEventListener('keydown', allowMove);
      document.removeEventListener('keyup', blockMove);
    };
  }, [ref]);

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
