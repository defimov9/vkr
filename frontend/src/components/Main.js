import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { NavLink, Route, Routes } from "react-router-dom";
import Gallery from "./Gallery";

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  onGalleryClick,
  onFeedClick,
  loggedIn,
  currentUser,
  setLoading,
  closeAllPopups,
  cards,
  setCards,
}) => {
  const { name, about, avatar } = useContext(CurrentUserContext); // currentUser

  return (
    <main className="main">
      <h1 className="title">
        Cервис Место: можно добавлять фотографии, удалять их и ставить лайки
      </h1>
      <section className="profile">
        <div
          className="profile__avatar"
          aria-label="Открыть попап редактирования аватара"
          tabIndex="1"
          onClick={onEditAvatar}
          style={{
            backgroundImage: avatar
              ? `url(http://localhost:3001/uploads/avatars/${avatar})`
              : null,
          }}
        />
        <div className="profile__content">
          <div className="profile__wrapper">
            <h2 className="profile__name">{name}</h2>
            <button
              type="button"
              className="profile__button-edit"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__position">{about}</p>
        </div>
        <button
          type="button"
          className="profile__button-add"
          onClick={onAddPlace}
        />
      </section>
      <section className="navigation">
        <NavLink
          to="/profile/gallery"
          className={({ isActive }) =>
            `navigation__button ${isActive ? "navigation__button_active" : ""}`
          }
          onClick={onGalleryClick}
        >
          Мои изображения
        </NavLink>
        <NavLink
          to="/profile/feed"
          className={({ isActive }) =>
            `navigation__button ${isActive ? "navigation__button_active" : ""}`
          }
          onClick={onFeedClick}
        >
          Все изоражения
        </NavLink>
      </section>

      <Routes>
        <Route
          path="gallery"
          element={
            <Gallery
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              loggedIn={loggedIn}
              currentUser={currentUser}
              setLoading={setLoading}
              closeAllPopups={closeAllPopups}
              cards={cards}
              setCards={setCards}
            />
          }
        />
        <Route
          path="feed"
          element={
            <Gallery
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              loggedIn={loggedIn}
              currentUser={currentUser}
              setLoading={setLoading}
              closeAllPopups={closeAllPopups}
              cards={cards}
              setCards={setCards}
            />
          }
        />
      </Routes>
    </main>
  );
};

export default Main;
