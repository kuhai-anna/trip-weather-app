import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { IconContext } from 'react-icons';
import { IoMdClose } from 'react-icons/io';
import { IconButton } from 'components/IconButton/IconButton';
import css from './Modal.module.css';

// Create portal
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  const hendleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);
    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  }, [hendleKeyDown]);

  const hendleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={hendleBackdropClick}>
      <div className={css.modal}>
        <IconContext.Provider
          value={{
            size: '20px',
          }}
        >
          <IconButton
            className={css.closeBtn}
            aria-label="Close button"
            onClick={onClose}
          >
            <IoMdClose className={css.iconClose} />
          </IconButton>
        </IconContext.Provider>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
