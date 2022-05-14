import { useEffect, useRef, useState } from 'react';
import { Canvas, DesktopControls } from '../../features/Map';
import { useHandleResize } from '../../hooks';
import styles from './Playground.module.scss';

const Playground = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const windowSize = useHandleResize();

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
      <div ref={canvasRef} className={styles.playground__canvas}>
        <Canvas canvasHeight={height} canvasWidth={width} />
      </div>
      {windowSize.width && windowSize.width < 1024 ? (
        <DesktopControls />
      ) : (
        <DesktopControls />
      )}
    </div>
  );
};

export default Playground;
