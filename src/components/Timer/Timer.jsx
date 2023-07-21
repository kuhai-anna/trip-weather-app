import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveTrip } from 'redux/trips/selectors';
import { convertMs } from 'helpers/converterMs';
import css from './Timer.module.css';

export const Timer = () => {
  const { startDate } = useSelector(selectActiveTrip);
  // Current time
  const [timeNow, setTimeNow] = useState(new Date().getTime());

  // Check if timeNow is less than startDate. Return 0 if the remainder is negative
  const remainingSeconds = Math.max(0, startDate - timeNow);
  const { days, hours, minutes, seconds } = convertMs(remainingSeconds);

  useEffect(() => {
    if (remainingSeconds) {
      // Update time every second
      const intervalId = setInterval(() => {
        setTimeNow(new Date().getTime());
      }, 1000);

      // Stop update when the component will unmount
      return () => clearInterval(intervalId);
    }
  }, [remainingSeconds]);

  return (
    <ul className={css.timerList}>
      <li>
        <span className={css.timeNumber}>{days}</span>
        <span className={css.timeUnit}>Days</span>
      </li>
      <li>
        <span className={css.timeNumber}>{hours}</span>
        <span className={css.timeUnit}>Hours</span>
      </li>
      <li>
        <span className={css.timeNumber}>{minutes}</span>
        <span className={css.timeUnit}>Minutes</span>
      </li>
      <li>
        <span className={css.timeNumber}>{seconds}</span>
        <span className={css.timeUnit}>Seconds</span>
      </li>
    </ul>
  );
};
