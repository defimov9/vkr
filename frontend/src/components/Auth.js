import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Auth = ({name, title, btnText, onSubmit}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(email, password);
  }

  return (
    <section className={`auth ${name === 'login' ? 'auth_login' : ''}`}>
      <form
        className="form popup__form"
        action="#"
        method="post"
        name={`form-${name}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <p className="popup__title auth__title">{title}</p>
        <label htmlFor="name" className="popup__label">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
            required
            className="popup__input auth__input"
          />
          <p className="popup__error" id="name-error"/>
        </label>
        <label htmlFor="position" className="popup__label">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handlePassword}
            required
            className="popup__input auth__input"
          />
          <p className="popup__error" id="position-error"/>
        </label>
        <button type="submit" className="popup__button-save auth__button-save">{btnText}</button>
        {name === 'register'
          ? <div className='auth__wrapper'>
              <p className='auth__text'>Уже зарегистрированы?&nbsp;</p>
              <Link className="auth__link" to="/sign-in">
                Войти
              </Link>
            </div>
          : ''}
      </form>
    </section>
  )
}

export default Auth;
