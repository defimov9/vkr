import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({
  children,
  name,
  handleSubmit,
  title,
  defaultText,
  loadingText,
  isLoading,
  isDisabled,
}) => {
  return (
    <section className={`auth ${name === "login" ? "auth_login" : ""}`}>
      <form
        className="form popup__form"
        action="#"
        method="post"
        name={`form-${name}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <p className="popup__title auth__title">{title}</p>
        {children}
        <button
          type="submit"
          className={`popup__button-save auth__button-save${
            isDisabled ? " auth__button-save_disabled" : ""
          }`}
          disabled={isDisabled}
        >
          {isLoading ? loadingText : defaultText}
        </button>
        {name === "register" ? (
          <div className="auth__wrapper">
            <p className="auth__text">Уже зарегистрированы?&nbsp;</p>
            <Link className="auth__link" to="/sign-in">
              Войти
            </Link>
          </div>
        ) : (
          ""
        )}
      </form>
    </section>
  );
};

export default AuthForm;
