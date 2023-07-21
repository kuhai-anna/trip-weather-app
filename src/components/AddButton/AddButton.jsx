import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { BiPlus } from 'react-icons/bi';
import css from './AddButton.module.css';

export const AddButton = ({ onClick }) => {
  return (
    <button className={css.addBtn} type="button" onClick={onClick}>
      <IconContext.Provider
        value={{
          size: '20px',
        }}
      >
        <BiPlus />
      </IconContext.Provider>
      <span className={css.addBtnText}>Add trip</span>
    </button>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
