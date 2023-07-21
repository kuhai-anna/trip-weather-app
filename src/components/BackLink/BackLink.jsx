import PropTypes from 'prop-types';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import css from './BackLink.module.css';

export const BackLink = ({ to, children, onClick }) => {
  return (
    <NavLink className={css.backLink} to={to} onClick={onClick}>
      <AiOutlineDoubleLeft size="16" className={css.iconBack} />
      {children}
    </NavLink>
  );
};

BackLink.propTypes = {
  to: PropTypes.any.isRequired,
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};
