import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconContext } from 'react-icons';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { selectActiveTrip, selectVisibleTrips } from 'redux/trips/selectors';
import { TripCard } from 'components/TripList/TripCard/TripCard';
import { IconButton } from 'components/IconButton/IconButton';
import css from './TripSlider.module.css';

export const TripSlider = ({ children }) => {
  const visibleTrips = useSelector(selectVisibleTrips);
  const weatherIsVisible = useSelector(selectActiveTrip);

  // Sort trips by start trip date
  const sortTripsByStart = visibleTrips.sort(
    (firstDay, nextDay) => firstDay.startDate - nextDay.startDate
  );

  // Slider
  const boxRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  const [contentWidth, setContentWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const onScroll = event => {
    const target = event.target;
    setScrollPosition(target.scrollLeft);
  };

  useEffect(() => {
    const box = boxRef.current;
    if (box) {
      setCardWidth(box.clientWidth);
      setContentWidth(box.scrollWidth);
    }
  }, [boxRef, visibleTrips]);

  const onNextBtnClick = () => {
    if (boxRef.current) {
      boxRef.current.scrollLeft += cardWidth;
    }
  };

  const onPrevBtnClick = () => {
    if (boxRef.current) {
      boxRef.current.scrollLeft -= cardWidth;
    }
  };

  const showPrevBtn = scrollPosition > 0;
  const showNextBtn =
    scrollPosition < contentWidth - boxRef.current?.clientWidth || false;

  return (
    <div className={`${css.slider} ${weatherIsVisible ? css.smallSlider : ''}`}>
      <ul
        className={`${css.tripList} ${
          visibleTrips.length ? css.withMarginRight : ''
        }`}
        onScroll={onScroll}
        ref={boxRef}
      >
        {sortTripsByStart.map(({ id, city, startDate, endDate }) => (
          <TripCard
            key={id}
            id={id}
            city={city}
            startDate={startDate}
            endDate={endDate}
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

      {children}
    </div>
  );
};

TripSlider.propTypes = {
  children: PropTypes.any,
};
