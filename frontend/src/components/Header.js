import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import logo from "../images/logo-white.svg";

const Header = ({ email, onSignOut, loggedIn }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleBurgerClick = () => setIsVisible(!isVisible);

  const location = useLocation();

  return (
    <header className={`header ${isVisible ? "header_visible" : ""}`}>
      <img
        src={logo}
        alt="Логотип сервиса Место"
        className="header__logo logo"
      />

      {loggedIn ? (
        <>
          <div
            className={`header__wrapper ${
              isVisible ? "header__wrapper_visible" : ""
            }`}
          >
            <p className="header__email">{email}</p>
            <button
              className="header__button-exit"
              onClick={onSignOut}
              type="button"
            >
              Выйти
            </button>
          </div>
          <button
            type="button"
            className={`burger ${isVisible ? "burger_close" : ""}`}
            onClick={handleBurgerClick}
          >
            <span className="burger__line" />
          </button>
        </>
      ) : location.pathname === "/sign-in" ? (
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      ) : (
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      )}
    </header>
  );
};

export default Header;
