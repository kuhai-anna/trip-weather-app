import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getDayOfWeek } from 'helpers/getDayOfWeek';
import css from './WeatherListItem.module.css';

export const WeatherListItem = ({ date, tempmax, tempmin, icon }) => {
  const [weatherIcon, setWeatherIcon] = useState(null);
  const dayOfWeek = getDayOfWeek(date);

  useEffect(() => {
    if (icon) {
      const loadImage = async () => {
        // Dynamic icon import
        try {
          const iconModule = await import(`icons/${icon}.svg`);
          setWeatherIcon(iconModule.default);
        } catch (error) {
          console.error('Error loading city image:', error);
        }
      };

      loadImage();
    }
  }, [icon]);

  return (
    <li>
      <div className={css.weatherCard}>
        <p className={css.dayOfWeek}>{dayOfWeek}</p>
        <img
          className={css.weatherIcon}
          src={`${weatherIcon}`}
          alt={`${icon} icon`}
          width={'70'}
          height={'70'}
        />
        <p className={css.temperature}>
          {Math.round(tempmax)}&deg;/{Math.round(tempmin)}&deg;
        </p>
      </div>
    </li>
  );
};

WeatherListItem.propTypes = {
  date: PropTypes.string.isRequired,
  tempmax: PropTypes.number.isRequired,
  tempmin: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};
