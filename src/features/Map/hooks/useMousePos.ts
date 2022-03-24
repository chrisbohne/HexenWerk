import { RefObject, useEffect, useRef } from 'react';

export const useMousePos = (ref: RefObject<HTMLElement | null>) => {
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = ref.current;

    const handleUpdateMouse = (event: MouseEvent) => {
      if (!canvas) return;
      const viewportMousePos = { x: event.clientX, y: event.clientY };
      const topLeftCanvasPos = {
        x: canvas?.offsetLeft,
        y: canvas?.offsetTop,
      };
      mousePosRef.current = {
        x: viewportMousePos.x - topLeftCanvasPos.x,
        y: viewportMousePos.y - topLeftCanvasPos.y,
      };
    };

    if (!canvas) return;
    canvas.addEventListener('wheel', handleUpdateMouse);
    canvas.addEventListener('mousemove', handleUpdateMouse);

    return () => {
      canvas.removeEventListener('wheel', handleUpdateMouse);
      canvas.removeEventListener('mousemove', handleUpdateMouse);
    };
  }, [ref]);

  return mousePosRef;
};
