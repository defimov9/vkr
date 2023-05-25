import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardDelete, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  const { link, name, owner, likes } = card;

  const isOwn = owner === currentUser._id;
  const cardTrashButtonClassName = `card__button-trash ${
    isOwn ? "" : "card__button-trash_hidden"
  }`;

  const isLiked = likes.some((like) => like === currentUser._id);
  const cardLikeButtonClassName = `card__button-like ${
    isLiked ? "card__button-like_active" : ""
  }`;

  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleTrashClick = () => onCardDelete(card);

  return (
    <li className="gallery__item card">
      <button
        type="button"
        className={cardTrashButtonClassName}
        onClick={handleTrashClick}
      />
      <img
        src={`http://localhost:3001/uploads/cards/${link}`}
        alt={name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__wrapper">
        <h3 className="card__title">{name}</h3>
        <div className="card__like-zone">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="card__like-counter">{likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
