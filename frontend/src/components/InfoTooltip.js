import React from 'react';
import useClose from '../hooks/useClose';
import iconError from '../images/icon-error.svg';
import iconSuccess from '../images/icon-success.svg';

const InfoTooltip = ({ onClose, isOpen, isSuccess, onOverlayClick }) => {
  useClose(isOpen, onClose);

  const caption = `${isSuccess
    ? 'Вы успешно зарегистрировались!'
    : (`Что-то пошло не так!
        Попробуйте ещё раз.`)}`

  const image = `${isSuccess ? iconSuccess : iconError}`;

  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      id="popup-info-tooltip"
      onClick={onOverlayClick}
    >
      <div className="popup__wrapper">
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        />
        <img className="popup__image popup__image_place_info-tooltip" src={image} alt={caption} />
        <p className="popup__caption popup__caption_place_info-tooltip">{caption}</p>
      </div>
    </section>
  )
}

export default  InfoTooltip;
