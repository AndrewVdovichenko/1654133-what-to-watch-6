import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as EmailValidator from 'email-validator';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import {login} from '../../store/api-actions';
import {AuthorizationStatus} from '../../utils/const';
import {redirectToRoute} from '../../store/action';

const AuthView = () => {
  const loginRef = useRef();
  const passwordRef = useRef();
  const [invalidEmail, setInvalidEmail] = useState(false);
  const authStatus = useSelector((state) => state.USER.authorizationStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authStatus === AuthorizationStatus.AUTH) {
      dispatch(redirectToRoute(`/`));
    }
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const isInvalid = !EmailValidator.validate(loginRef.current.value);
    setInvalidEmail(isInvalid);

    if (isInvalid) {
      return;
    }

    const authData = {
      login: loginRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(login(authData));
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="" className="sign-in__form" onSubmit={handleSubmit}>
          {invalidEmail &&
            <div className="sign-in__message">
              <p>Please enter a valid email address</p>
            </div>
          }
          <div className="sign-in__fields">
            <div className={`sign-in__field ${invalidEmail ? `sign-in__field--error` : ``}`}>
              <input
                ref={loginRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      {<Footer />}
    </div>
  );
};

export default AuthView;
