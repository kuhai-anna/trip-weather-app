import { WeatherToday } from 'components/WeatherToday/WeatherToday';
import { Timer } from 'components/Timer/Timer';
import { Footer } from 'components/Footer/Footer';
import css from './Sidebar.module.css';

export const Sidebar = () => {
  return (
    <aside className={css.aside}>
      <div className={css.asideContainer}>
        <WeatherToday />
        <Timer />
      </div>
      <Footer />
    </aside>
  );
};
