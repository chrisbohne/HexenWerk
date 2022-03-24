import styles from './Discover.module.scss';
import { useMousePos } from '../../hooks/useMousePos';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  addPoints,
  diffPoints,
  ORIGIN,
  scalePoint,
} from '../../features/Map/utils';
import { usePan } from '../../hooks/usePan';
import { useScale } from '../../hooks/useScale';
import { useLast } from '../../hooks/useLast';

const Discover = () => {
  const [buffer, setBuffer] = useState(ORIGIN);
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, startPan] = usePan();
  const scale = useScale(ref);
  const lastOffsetRef = useRef({ x: 0, y: 0 });
  const lastScaleRef = useRef(1);

  const mousePosRef = useMousePos(ref);

  const delta = diffPoints(offset, lastOffsetRef.current);
  const adjustedOffset = useRef(addPoints(offset, delta));

  if (lastScaleRef.current === scale) {
    adjustedOffset.current = addPoints(
      adjustedOffset.current,
      scalePoint(delta, scale)
    );
  } else {
    const lastMouse = scalePoint(mousePosRef.current, lastScaleRef.current);
    const newMouse = scalePoint(mousePosRef.current, scale);
    const mouseOffset = diffPoints(lastMouse, newMouse);
    adjustedOffset.current = addPoints(adjustedOffset.current, mouseOffset);
  }

  lastOffsetRef.current = offset;
  lastScaleRef.current = scale;

  useLayoutEffect(() => {
    const height = ref.current?.clientHeight ?? 0;
    const width = ref.current?.clientWidth ?? 0;

    setBuffer({
      x: (width - width / scale) / 2,
      y: (height - height / scale) / 2,
    });
  }, [scale, setBuffer]);

  return (
    <div
      ref={ref}
      className={styles.container}
      style={{ position: 'relative' }}
      onMouseDown={startPan}
    >
      <div
        style={{
          backgroundImage: 'url(https://i.stack.imgur.com/f6vGv.png)',
          transform: `scale(${scale})`,
          backgroundPosition: `${-adjustedOffset.current.x}px ${-adjustedOffset
            .current.y}px`,
          position: 'absolute',
          bottom: buffer.y,
          left: buffer.x,
          right: buffer.x,
          top: buffer.y,
        }}
      ></div>
    </div>
  );
};

export default Discover;
