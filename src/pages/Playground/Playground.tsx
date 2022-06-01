import { useEffect, useRef, useState } from 'react';
import { Canvas, DesktopControls } from '../../features/Map';
import styles from './Playground.module.scss';

export const Playground = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // const isTouchEnabled = () => {
  //   return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  // };

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const canvasWidth = canvasRef.current.clientWidth;
      const canvasHeight = canvasRef.current.clientHeight;

      setWidth(canvasWidth);
      setHeight(canvasHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.playground} data-testid="test-playground">
      {window.innerWidth >= 1024 ? (
        <>
          <div ref={canvasRef} className={styles.playground__canvas}>
            <Canvas canvasHeight={height} canvasWidth={width} />
          </div>
          <DesktopControls />
        </>
      ) : (
        <div>
          <h1>Mobile version comming soon...</h1>
        </div>
      )}
    </div>
  );
};
