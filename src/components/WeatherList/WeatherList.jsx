import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { WeatherListItem } from './WeatherListItem/WeatherListItem';
import { selectWeeklyWeather } from 'redux/weather/selectors';
import { IconButton } from 'components/IconButton/IconButton';
import css from './WeatherList.module.css';

export const WeatherList = () => {
  const { items } = useSelector(selectWeeklyWeather);

  // Slider
  const boxRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);

  const [contentWidth, setContentWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const onScroll = event => {
    const target = event.target;
    setScrollPosition(target.scrollLeft);
  };

  useEffect(() => {
    const box = boxRef.current;
    if (box) {
      setItemWidth(box.clientWidth);
      setContentWidth(box.scrollWidth);
    }
  }, [boxRef, items]);

  const onNextBtnClick = () => {
    if (boxRef.current) {
      boxRef.current.scrollLeft += itemWidth;
    }
  };

  const onPrevBtnClick = () => {
    if (boxRef.current) {
      boxRef.current.scrollLeft -= itemWidth;
    }
  };

  const showPrevBtn = scrollPosition > 0;
  const showNextBtn =
    scrollPosition < contentWidth - boxRef.current?.clientWidth || false;

  return (
    <>
      <h2 className={css.visuallyHidden}>List of weather forecasts</h2>
      <div className={css.slider}>
        <ul className={css.weatherList} onScroll={onScroll} ref={boxRef}>
          {items.map(({ id, date, tempmax, tempmin, icon }) => (
            <WeatherListItem
              key={id}
              date={date}
              tempmax={tempmax}
              tempmin={tempmin}
              icon={icon}
            />
          ))}
        </ul>

        {showPrevBtn && (
          <IconButton
            className={css.prevBtn}
            aria-label="Previously button"
            onClick={onPrevBtnClick}
          >
            <IconContext.Provider
              value={{
                size: '24px',
              }}
            >
              <BsArrowLeftShort className={css.inputIcon} />
            </IconContext.Provider>
          </IconButton>
        )}

        {showNextBtn && (
          <IconButton
            className={css.nextBtn}
            aria-label="Next button"
            onClick={onNextBtnClick}
          >
            <IconContext.Provider
              value={{
                size: '24px',
              }}
            >
              <BsArrowRightShort className={css.inputIcon} />
            </IconContext.Provider>
          </IconButton>
        )}
      </div>
    </>
  );
};
