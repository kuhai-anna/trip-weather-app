import userAvatar from 'images/panda.jpg';
import css from './AppBar.module.css';

export const AppBar = () => {
  return (
    <div className={css.appBar}>
      <img className={css.userAvatar} src={userAvatar} alt="user avatar" />
    </div>
  );
};
