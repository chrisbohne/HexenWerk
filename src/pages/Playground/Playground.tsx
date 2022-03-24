import { useEffect, useRef, useState } from 'react';
import Icon from '../../components/Icon/Icon';
import { Canvas } from '../../features/Map';
import styles from './Playground.module.scss';

const Playground = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
      {console.log(width, height)}
      <div ref={canvasRef} className={styles.playground__canvas}>
        <Canvas canvasHeight={height} canvasWidth={width} />
      </div>
      <div className={styles.playground__menu}>
        <ul>
          <li>
            <Icon name="puzzle" />
          </li>
          <li>
            <Icon name="eraser" />
          </li>
          <li>
            <Icon name="slider" />
          </li>
          <li>
            <Icon name="settings" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Playground;
