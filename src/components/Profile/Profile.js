import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useContext, useEffect } from "react";

import Header from '../Header/Header.js';
import ElemWithForm from '../ElemWithForm/ElemWithForm';
import { CHECKEMAILREGEX, CHECKNAMESREGEX } from '../../utils/constants';

export default function Profile({ onClose, onUpdateUser, onOpenMobMenu, onLogout, message }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditProfile, setIsEditProfile] = useState(false)

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSaveActive, setIsSaveActive] = useState(false);
  const [messageSameData, setMessageSameData] = useState('Новые данные должны отличаться от старых.');
  const [responseFail, setResponseFail] = useState(false);
  const [isSameName, setIsSameName] = useState(true);
  const [isSameEmail, setIsSameEmail] = useState(true);
  const [isSameData, setIsSameData] = useState(true);

  useEffect(() => {
    console.log('Слушатель первого запуска');
    setName(currentUser.name);
    setEmail(currentUser.email);
    setIsSaveActive(false);
  }, []);

  useEffect(() => {
    if (isEditProfile && isSameEmail && isSameName) {
      setResponseFail(true);
      setIsSameData(true);
    } else {
      setResponseFail(false);
      setIsSameData(false);
    }
  }, [isSameEmail, isSameName]);

  useEffect(() => {
    if (isEditProfile && isEmailValid && isNameValid && (!isSameEmail || !isSameName)) {
      setIsSaveActive(true);
      setResponseFail(false);
    } else {
      setIsSaveActive(false);
      setResponseFail(true)
    }
  }, [name, email]);

  function handleEmailChange(e) {
    let mailInput = e.target;
    setEmail(mailInput.value);
    if (currentUser.email === mailInput.value) {
      setIsSameEmail(true);
    } else {
      setIsSameEmail(false);
    }
    if (!mailInput.validity.valid) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  }

  function handleNameChange(e) {
    let nameInput = e.target;
    setName(nameInput.value);
    if (currentUser.name === nameInput.value) {
      setIsSameName(true);
    } else {
      setIsSameName(false);
    }
    if (!nameInput.validity.valid) {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      email,
    });
    setIsSaveActive(false);
    setIsEditProfile(false);
    setResponseFail(false);
  }


  function handleOpenEdit() {
    setIsEditProfile(true);
  }

  const propsProflEdit = {
    title: `Привет, ${currentUser.name}!`,
    name: "profile-edit",
    buttonText: "Сохранить",
    hideLogo: "form__close-button_hidden",
    activateInputClass: "form__input_profile_active",
    children: (
      <fieldset className="form__user-info form__user-info_profile">
        <div className="form__fild-box">
          <p className="form__fild-name form__fild-name_profile">Имя</p>
          <input
            className={`form__input form__input_profile ${isEditProfile && "form__input_profile_active"}`}
            type="text"
            name="name"
            minLength="2"
            maxLength="40"
            pattern={CHECKNAMESREGEX}
            required
            // placeholder={!isEditProfile ? currentUser.name : ''}
            value={isEditProfile ? name : currentUser.name}
            id="user-name"
            onChange={handleNameChange}
          />
          <span className={`form__input-error form__input-error_signs ${!isNameValid && "form__input-error_active"}`} id="user-name-error">От двух символов.  Латиница, кириллица, пробел или дефис</span>
        </div>

        <div className="form__fild-box">
          <p className="form__fild-name form__fild-name_profile">E-mail</p>
          <input
            className={`form__input form__input_profile ${isEditProfile && "form__input_profile_active"}`}
            type="email"
            name="email"
            // placeholder={!isEditProfile ? currentUser.email : ''}
            value={isEditProfile ? email : currentUser.email}
            pattern={CHECKEMAILREGEX}
            required
            id="email"
            onChange={handleEmailChange}
          />
          <span className={`form__input-error form__input-error_signs ${!isEmailValid && "form__input-error_active"}`} id="profession-error">Введите правильный адрес</span>
        </div>
      </fieldset>
    ),
  };

  return (
    <>
      <Header onOpenMobMenu={onOpenMobMenu} />
      <div className="profile">
        <ElemWithForm
          isSaveActive={isSaveActive}
          title={propsProflEdit.title}
          name={propsProflEdit.name}
          btnText={propsProflEdit.buttonText}
          toMainBtnHidden={propsProflEdit.hideLogo}
          onClose={onClose}
          children={propsProflEdit.children}
          onSubmit={handleSubmit}
          onLogout={onLogout}
          onOpenEdit={handleOpenEdit}
          isProfile={true}
          isEditProfile={isEditProfile}
          isResponseFail={responseFail}
          message={isSameData ? messageSameData : message}
        />
      </div>
    </>

  );
}
