import React from "react";
import useClose from "../hooks/useClose";

const ImagePopup = ({ isOpen, onClose, onOverlayClick, card }) => {
  useClose(isOpen, onClose);

  return (
    <section
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      id="popup-show-photo"
      onClick={onOverlayClick}
    >
      <figure className="popup__figure">
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        />
        <img
          className="popup__image"
          src={
            card.link
              ? `http://localhost:3001/uploads/cards/${card.link}`
              : null
          }
          alt={card.name}
        />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </section>
  );
};

export default ImagePopup;
