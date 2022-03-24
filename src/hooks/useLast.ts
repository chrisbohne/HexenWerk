import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
};

export const useLast = (value: number | Point) => {
  const lastOffset = useRef({ x: 0, y: 0 });
  const lastScale = useRef(1);

  useEffect(() => {
    if (typeof value === 'number') lastScale.current = value;
    else lastOffset.current = value;
  }, [value]);

  return typeof value === 'number' ? lastScale.current : lastOffset.current;
};
