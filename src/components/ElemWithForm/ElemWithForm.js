import { Route, Link } from "react-router-dom";
import ErrorMessageBlock from "../ErrorMessageBlock/ErrorMessageBlock";
import { useState } from "react";

export default function ElemWithForm({
  isSaveActive,
  title,
  titleClassModif,
  containerModif,
  name,
  btnText,
  modif,
  onClose,
  toMainBtnHidden,
  children,
  onSubmit,
  onLogout,
  onOpenEdit,
  isEditProfile,
  isProfile,
  isResponseFail,
  message,
}) {

  const [isSubmitHidden, setIsSubmitHidden] = useState(isProfile ? true : false);

  const buttonText = isEditProfile ? "Cохранить" : btnText;
  const submitDisableClass = "form__save_disable"

  const onEditClick = () => {
    setIsSubmitHidden(!isSubmitHidden);
    onOpenEdit();
  };

  return (
    <div className={`form ${containerModif ? containerModif : ''}`}>
      <Link className="form__to-main-page" to='/'>
        <button
          className={`form__close-button ${toMainBtnHidden ? toMainBtnHidden : ""}`}
          type="button"
          name="close"
          onClick={onClose}
        ></button>
      </Link>
      <form
        className={`form__container ${modif ? modif : ''}`}
        name={name}
        onSubmit={onSubmit}
        noValidate
      >
        <h2 className={`form__title ${titleClassModif ? titleClassModif : ''}`}>{title}</h2>
        <div className="form__child-box">
          {children}
        </div>
        {isResponseFail && <ErrorMessageBlock message={message} />}

        <button
          className={`form__save ${isSubmitHidden && "form__save_disable"} ${isSaveActive && "form__save_active"}`}
          type="submit"
          name="save"
        >
          {buttonText}
        </button>

      </form>
      <Route path="/signup">
        <div className="form__buttom-text-box">
          <p className="form__bottom-text">Уже зарегистрированы?</p>
          <Link className="form__link-out" to="/signin">Войти</Link>
        </div>
      </Route>
      <Route path="/signin">
        <div className="form__buttom-text-box">
          <p className="form__bottom-text">Ещё не зарегистрированы?</p>
          <Link className="form__link-out" to="/signup">Регистрация</Link>
        </div>
      </Route>
      <Route path="/profile">
        <button
          className={`form__save form__save_profile form__save_replace ${!isSubmitHidden && submitDisableClass}`}
          type="button"
          onClick={onEditClick}
          name="save"
        >
          Редактировать
        </button>
        <div className="form__buttom-text-box">
          <button className="form__logout form__save_replace" onClick={onLogout}>Выйти из аккаунта</button>
        </div>
      </Route>
    </div>

  );
}
