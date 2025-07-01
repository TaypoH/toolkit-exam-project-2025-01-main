import React, { useState, useEffect } from 'react';
import Flickity from 'react-flickity-component';
import style from './SlideBar.module.sass';
import carouselConstants from '../../carouselConstants';
import './flickity.css';

const SliderBar = props => {
  const [delayedRender, setDelayedRender] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setDelayedRender(true), 0); // минимальная задержка
    return () => clearTimeout(timeout);
  }, []);

  const options = {
    draggable: true,
    wrapAround: true,
    pageDots: false,
    prevNextButtons: true,
    autoPlay: true,
    groupCells: true,
    lazyLoad: true,
  };

  const getStyleName = () => {
    const { carouselType } = props;
    switch (carouselType) {
      case carouselConstants.MAIN_SLIDER:
        return style.mainCarousel;
      case carouselConstants.EXAMPLE_SLIDER:
        return style.exampleCarousel;
      case carouselConstants.FEEDBACK_SLIDER:
        return style.feedbackCarousel;
      default:
        return '';
    }
  };

  const renderSlides = () => {
    const { carouselType, images } = props;
    if (!images || Object.keys(images).length === 0) return null;

    switch (carouselType) {
      case carouselConstants.MAIN_SLIDER:
        return Object.keys(images).map((key, index) => (
          <img
            src={images[key]}
            alt='slide'
            key={index}
            className={style['carousel-cell']}
          />
        ));
      case carouselConstants.EXAMPLE_SLIDER:
        return Object.keys(images).map((key, index) => (
          <div className={style['example-cell']} key={index}>
            <img src={images[key]} alt='slide' />
            <p>{carouselConstants.EXAMPLE_SLIDER_TEXT[index]}</p>
          </div>
        ));
      case carouselConstants.FEEDBACK_SLIDER:
        return Object.keys(images).map((key, index) => (
          <div className={style['feedback-cell']} key={index}>
            <img src={images[key]} alt='slide' />
            <p>{carouselConstants.FEEDBACK_SLIDER_TEXT[index].feedback}</p>
            <span>{carouselConstants.FEEDBACK_SLIDER_TEXT[index].name}</span>
          </div>
        ));
      default:
        return null;
    }
  };

  if (!delayedRender) return null;

  return (
    <Flickity className={getStyleName()} elementType='div' options={options}>
      {renderSlides()}
    </Flickity>
  );
};

export default SliderBar;
