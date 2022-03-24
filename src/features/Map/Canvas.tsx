import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useAppSelector, useAppDispatch } from '../../app/store';
import styles from './Canvas.module.scss';
import Street from '../../assets/images/Street52.svg';
import { addPoints, diffPoints, ORIGIN, scalePoint } from './utils';
import { updateScale, updateViewPortTopLeft } from './mapSlice';
import { useMousePos, usePan } from './hooks';

const ZOOM_SENSITIVITY = 500;
interface CanvasProps {
  canvasHeight: number;
  canvasWidth: number;
}

export const Canvas = ({ canvasHeight, canvasWidth }: CanvasProps) => {
  const dispatch = useAppDispatch();
  // scale and current top left point of visible canvas
  const { scale, viewPortTopLeft } = useAppSelector((state) => state.map);
  // reference with canvas once canvas loaded, and state for context
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  // custom hook for getting current panning state without zoom
  const [offset, startPan] = usePan();
  const lastOffset = useRef(ORIGIN);
  // custom hook for
  const mousePosRef = useMousePos(canvasRef);
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    lastOffset.current = offset;
  }, [offset]);

  // Initial Context Setup
  useLayoutEffect(() => {
    if (!canvasRef.current || context) return;
    const renderContext = canvasRef.current.getContext('2d');
    if (!renderContext) return;
    renderContext.canvas.width = window.innerWidth;
    renderContext.canvas.height = window.innerHeight;
    renderContext.scale(scale, scale);
    renderContext.translate(-viewPortTopLeft.x, -viewPortTopLeft.y);
    setContext(renderContext);
  }, [scale, context, viewPortTopLeft]);

  // draw on Canvas
  const draw = useCallback(() => {
    const image = new Image();
    image.src = Street;

    if (!didLoad) {
      image.onload = () => {
        context?.drawImage(image, 0, 0);
      };
      setDidLoad(true);
    } else {
      context?.drawImage(image, 0, 0);
    }
  }, [context, didLoad]);

  useLayoutEffect(() => {
    if (!context) return;
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
    draw();
  }, [context, draw, viewPortTopLeft, scale, canvasHeight, canvasWidth]);

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

  return (
    <>
      {console.log('changed')}
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        onMouseDown={startPan}
        width={canvasWidth}
        height={canvasHeight}
      />
    </>
  );
};
