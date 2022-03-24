import { RefObject, useCallback, useEffect, useState } from 'react';

interface ScaleOpts {
  direction: 'up' | 'down';
  interval: number;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;

export const useScale = (ref: RefObject<HTMLElement | null>) => {
  const [scale, setScale] = useState(1);

  const updateScale = useCallback(({ direction, interval }: ScaleOpts) => {
    setScale((prevState) => {
      let scale: number;

      if (direction === 'down' && prevState * interval < MAX_SCALE) {
        scale = prevState * interval;
      } else if (direction === 'down') {
        scale = MAX_SCALE;
      } else if (direction === 'up' && prevState * interval > MIN_SCALE) {
        scale = prevState * interval;
      } else if (direction === 'up') {
        scale = MIN_SCALE;
      } else {
        scale = prevState;
      }

      return scale;
    });
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const func = (e: WheelEvent) => {
      e.preventDefault();
      updateScale({
        direction: e.deltaY > 0 ? 'up' : 'down',
        interval: e.deltaY > 0 ? 0.9 : 1.1,
      });
    };

    node.addEventListener('wheel', func);

    return () => node.removeEventListener('wheel', func);
  }, [ref, updateScale]);

  return scale;
};
