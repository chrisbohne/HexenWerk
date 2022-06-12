import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { CarouselProps } from '../_interfaces/carousel.interface';

import styles from './Carousel.module.scss';

export const Carousel = ({ slides, setIndex }: CarouselProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const [slideSize, setSlideSize] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setIndex(slideIndex);
  }, [slideIndex, setIndex]);

  const slidesToShow = slides.map((slide, index) => {
    return (
      <li
        style={{ left: `${index * slideSize}px` }}
        key={index}
        ref={slideRef}
        className={styles.carousel__slide}
      >
        <div
          style={{ backgroundImage: `url(${slide})` }}
          className={styles.carousel__image}
        ></div>
      </li>
    );
  });

  const indicatorButtons = slides.map((_, index) => {
    return (
      <button
        onClick={() => setSlideIndex(index)}
        key={index}
        className={`${styles.carousel__indicator} ${
          slideIndex === index ? styles['carousel__indicator-current'] : ''
        }`}
      ></button>
    );
  });

  useEffect(() => {
    if (!slideRef.current) return;
    setSlideSize(slideRef.current?.clientWidth);
  }, []);

  useEffect(() => {
    //
  }, [slideSize]);

  const handleClickLeft = () => {
    setSlideIndex((prev) => {
      if (prev - 1 >= 0) {
        return (prev -= 1);
      }
      return prev;
    });
  };

  const handleClickRight = () => {
    setSlideIndex((prev) => {
      if (prev + 1 < slides.length) {
        return (prev += 1);
      }
      return prev;
    });
  };

  return (
    <div className={styles.carousel}>
      <Icon
        name="left"
        onClick={handleClickLeft}
        className={`${styles.carousel__button} ${
          styles['carousel__button-left']
        }  ${slideIndex === 0 ? styles.hide : ''}`}
      />
      <div className={styles.carousel__trackContainer}>
        <ul
          style={{ transform: `translateX(${-slideIndex * slideSize}px)` }}
          className={styles.carousel__track}
        >
          {slidesToShow}
        </ul>
      </div>

      <Icon
        name="right"
        className={`${styles.carousel__button} ${
          styles['carousel__button-right']
        } ${slideIndex === slides.length - 1 ? styles.hide : ''}`}
        onClick={handleClickRight}
      />
      <div className={styles.carousel__nav}>
        {/* <button
          className={`${styles.carousel__indicator} ${styles['carousel__indicator-current']}`}
        ></button>
        <button className={styles.carousel__indicator}></button>
        <button className={styles.carousel__indicator}></button> */}
        {indicatorButtons}
      </div>
    </div>
  );
};
