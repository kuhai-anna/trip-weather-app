import { useState } from 'react';
import { AddButton } from 'components/AddButton/AddButton';
import { Modal } from 'components/Modal/Modal';
import { CreateTripForm } from 'components/CreateTripForm/CreateTripForm';
import { TripSlider } from 'components/TripSlider/TripSlider';
import css from './TripList.module.css';

export const TripList = () => {
  const [showModal, setShowModal] = useState(false);

  // Open and close modal
  const toggleModal = () => {
    setShowModal(showModal => !showModal);

    showModal
      ? (document.body.style.overflow = 'auto') &&
        (document.body.style.height = 'initial')
      : (document.body.style.overflow = 'hidden') &&
        (document.body.style.height = '100vh');
  };

  return (
    <>
      <div className={css.sliderWrapper}>
        <h3 className={css.visuallyHidden}>List of trips</h3>
        <TripSlider>
          <AddButton onClick={toggleModal} />
        </TripSlider>
      </div>

      {showModal && (
        <Modal onClose={toggleModal}>
          <CreateTripForm onClose={toggleModal} />
        </Modal>
      )}
    </>
  );
};
