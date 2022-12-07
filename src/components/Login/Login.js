import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useContext, useEffect } from "react";

import { CHECKEMAILREGEX } from '../../utils/constants';

import Header from '../Header/Header.js';
import ElemWithForm from '../ElemWithForm/ElemWithForm';

export default function Login({ onSignIn, isResponseFail, message }) {
  const currentUser = useContext(CurrentUserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isSaveActive, setIsSaveActive] = useState(false);

  useEffect(() => {
    if (isEmailValid && isPasswordValid && email !== '' && password !== '') {
      setIsSaveActive(true);
    } else {
      setIsSaveActive(false);
    }
  }, [isEmailValid, isPasswordValid, email, password]);


  function handleEmailChange(e) {
    console.log('На входе в мыло:', e.target.value);
    setEmail(e.target.value);
    if (!e.target.validity.valid) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  }

  function handlePasswodChange(e) {
    console.log('На входе в пароль:', e.target.value);
    setPassword(e.target.value);
    if (!e.target.validity.valid) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
      setPassword(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSignIn({ email, password });

  }

  const propsProflEdit = {
    title: "Рады видеть!",
    name: "signin",
    submitBtnClass: "form__save",
    buttonText: "Войти",
    children: (
      <fieldset className="form__user-info form__user-info_signs">
        <p className="form__fild-name form__fild-name_signs">E-mail</p>
        <input
          className={`form__input form__input_signs ${!isEmailValid && "form__input_err"}`}
          type="email"
          name="value"
          pattern={CHECKEMAILREGEX}
          required
          id="ine"
          onChange={handleEmailChange}
        />
        <span className={`form__input-error form__input-error_signs ${!isEmailValid && "form__input-error_active"}`} id="profession-error">Введите правильный адрес</span>
        <p className="form__fild-name form__fild-name_signs">Пароль</p>
        <input
          className={`form__input form__input_signs ${!isPasswordValid && "form__input_err"}`}
          minLength="2"
          type="password"
          name="password"
          required
          id="inp"
          onChange={handlePasswodChange}
        />
        <span className={`form__input-error form__input-error_signs ${!isPasswordValid && "form__input-error_active"}`} id="profession-error">Что-то пошло не так…</span>
      </fieldset>
    ),
  };

  return (
    <>
      <Header />
      <div className="login">
        <ElemWithForm
          isSaveActive={isSaveActive}
          title={propsProflEdit.title}
          titleClassModif="form__title_signs"
          name={propsProflEdit.name}
          btnText={propsProflEdit.buttonText}
          toMainBtnHidden={propsProflEdit.hideLogo}
          children={propsProflEdit.children}
          submitBtnClass={propsProflEdit.submitBtnClass}
          onSubmit={handleSubmit}
          isResponseFail={isResponseFail}
          message={message}
        />
      </div>


    </>

  );
}
