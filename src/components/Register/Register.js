import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useContext, useEffect } from "react";

import Header from '../Header/Header.js';
import ElemWithForm from '../ElemWithForm/ElemWithForm';

import { CHECKEMAILREGEX, CHECKNAMESREGEX } from '../../utils/constants';

export default function Register({ onSignUp, isResponseFail, message }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isSaveActive, setIsSaveActive] = useState(false);


  useEffect(() => {
    if (isEmailValid && isPasswordValid && isNameValid && name !== '' && email !== '' && password !== '') {
      setIsSaveActive(true);
    } else {
      setIsSaveActive(false);
    }
  }, [isEmailValid, isPasswordValid, isNameValid]);


  function handleEmailChange(e) {
    if (!e.target.validity.valid || e.target.value === '' ) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      setEmail(e.target.value);
    }
  }

  function handlePasswodChange(e) {
    if (!e.target.validity.valid) {
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
      setPassword(e.target.value);
    }
  }

  function handleNameChange(e) {
    if (!e.target.validity.valid) {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
      setName(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSignUp({
      name,
      email,
      password
    });

  }

  const propsProflEdit = {
    title: "Добро пожаловать!",
    name: "register",
    submitBtnClass: "form__save",
    children: (
      <fieldset className="form__user-info form__user-info_signs">
        <p className="form__fild-name form__fild-name_signs">Имя</p>
        <input
          className={`form__input form__input_signs ${!isNameValid && "form__input_err"}`}
          type="text"
          name="name"
          minLength="2"
          maxLength="40"
          pattern={CHECKNAMESREGEX}
          required
          id="upn"
          onChange={handleNameChange}
        />
        <span className={`form__input-error form__input-error_signs ${!isNameValid && "form__input-error_active"}`} id="user-name-error">От двух символов.  Латиница, кириллица, пробел или дефис</span>
        <p className="form__fild-name form__fild-name_signs">E-mail</p>
        <input
          className={`form__input form__input_signs ${!isEmailValid && "form__input_err"}`}
          type="email"
          pattern={CHECKEMAILREGEX}
          required
          id="upe"
          onChange={handleEmailChange}
        />
        <span className={`form__input-error form__input-error_signs ${!isEmailValid && "form__input-error_active"}`} id="profession-error">Введите правильный адрес</span>
        <p className="form__fild-name form__fild-name_signs">Пароль</p>
        <input
          className={`form__input form__input_signs ${!isPasswordValid && "form__input_err"}`}
          type="password"
          name="password"
          minLength="2"
          required
          id="upp"
          onChange={handlePasswodChange}
        />
        <span className={`form__input-error form__input-error_signs ${!isPasswordValid && "form__input-error_active"}`} id="profession-error">Что-то пошло не так…</span>
      </fieldset>
    ),
  };

  return (
    <>
      <Header />
      <div className="register">
        <ElemWithForm
          isSaveActive={isSaveActive}
          title={propsProflEdit.title}
          titleClassModif="form__title_signs"
          name={propsProflEdit.name}
          btnText="Зарегистрироваться"
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
