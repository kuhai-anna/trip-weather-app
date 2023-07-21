import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectActiveTrip } from 'redux/trips/selectors';
import { selectWeatherToday } from 'redux/weather/selectors';
import { getDayOfWeek } from 'helpers/getDayOfWeek';
import css from './WeatherToday.module.css';


export const WeatherToday = () => {
  const { city } = useSelector(selectActiveTrip);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const {
    items: { date, temp, icon },
  } = useSelector(selectWeatherToday);

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
    <div className={css.weatherTodayContainer}>
      <h2 className={css.visuallyHidden}>Weather forecast for today</h2>
      <p className={css.dayOfWeek}>{dayOfWeek}</p>
      <div className={css.iconContainer}>
        <img
          src={`${weatherIcon} `}
          alt={`${icon} icon`}
          width={'90'}
          height={'90'}
        />
        <div className={css.tempWrapper}>
          <span className={css.temperature}>{Math.round(temp)}</span>
          <span className={css.deg}>&deg;</span>
          <span className={css.celsius}>C</span>
        </div>
      </div>
      <p className={css.city}>{city}</p>
    </div>
  );
};
