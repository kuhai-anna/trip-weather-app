import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { MdDelete } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { IconButton } from 'components/IconButton/IconButton';
import { deleteTrips, setActiveTripId } from 'redux/trips/tripsSlice';
import { getDate } from 'helpers/getDate';
import { selectActiveTripId } from 'redux/trips/selectors';
import css from './TripCard.module.css';

export const TripCard = ({ id, city, startDate, endDate }) => {
  const [cityImage, setCityImage] = useState(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTripId = useSelector(selectActiveTripId);

  const onCardClick = () => dispatch(setActiveTripId(id));

  const normalizeCityName = city.toLowerCase().split(' ').join('-');

  useEffect(() => {
    if (city) {
      const loadImage = async () => {
        // Dynamic image import
        try {
          const imageModule = await import(`images/${normalizeCityName}.jpg`);
          setCityImage(imageModule.default);
        } catch (error) {
          console.error('Error loading city image:', error);
        }
      };

      loadImage();
    }
  }, [normalizeCityName, city]);

  // Delete trip card
  const onDelete = () => {
    // Remove an active trip from the state
    if (activeTripId === id) {
      dispatch(setActiveTripId(null));
    }
    // Delete trip
    dispatch(deleteTrips(id));
    // Redirecting the user to the main page after deleting the trip
    navigate('/');
  };

  const {
    day: startDay,
    month: startMonth,
    year: startYear,
  } = getDate(startDate);
  const { day: endDay, month: endMonth, year: endYear } = getDate(endDate);

  const queryString = `${startYear}-${startMonth}-${startDay}/${endYear}-${endMonth}-${endDay}`;

  return (
    <li>
      <div
        className={css.tripCard}
        onMouseEnter={() => setShowDeleteButton(true)}
        onMouseLeave={() => setShowDeleteButton(false)}
      >
        {showDeleteButton && (
          <IconContext.Provider
            value={{
              size: '18px',
            }}
          >
            <IconButton
              className={css.deleteBtn}
              style={{
                opacity: showDeleteButton ? 1 : 0,
              }}
              aria-label="Delete button"
              onClick={onDelete}
            >
              <MdDelete />
            </IconButton>
          </IconContext.Provider>
        )}

        <NavLink
          className={`${css.link} ${activeTripId === id ? css.active : ''}`}
          to={`weather/${city}/${queryString}`}
          onClick={onCardClick}
        >
          <div className={css.tripWrapper}>
            <img
              className={css.cardImage}
              src={`${cityImage}`}
              alt={`${city}`}
              width={'180'}
              height={'160'}
            />
            <div className={css.tripDescription}>
              <p className={css.city}>{city}</p>
              <p className={css.dates}>
                {startDay}.{startMonth}.{startYear} - {endDay}.{endMonth}.
                {endYear}
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </li>
  );
};

TripCard.propTypes = {
  id: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  startDate: PropTypes.number.isRequired,
  endDate: PropTypes.number.isRequired,
};
