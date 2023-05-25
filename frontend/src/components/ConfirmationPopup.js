import React from 'react';
import useClose from '../hooks/useClose';

const ConfirmationPopup = ({ isOpen, onClose, onOverlayClick, onCardDelete, card, isLoading }) => {
  useClose(isOpen, onClose);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onCardDelete(card);
  }

  const buttonText = isLoading ? 'Удаление...' : 'Да';

  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      id="popup-confirmation"
      onClick={onOverlayClick}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        />
        <div className="popup__form">
          <p className="popup__title">Вы уверены?</p>
          <button
            type="button"
            className="popup__button-save"
            onClick={handleSubmit}
          >{buttonText}</button>
        </div>
      </div>
    </section>
  )
}

export  default  ConfirmationPopup;
