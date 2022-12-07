import profile from "../../images/profile.svg";
import akkPict from "../../images/akk.svg"
import { Link } from "react-router-dom";

function LandingPageNavigate() {
    return (
        <nav>
            <ul className="navigation">
                <li>
                    <Link className="navigation__signup" to="/signup">Регистрация</Link>
                </li>
                <li>
                    <Link className="navigation__signin" to="/signin">Войти</Link>
                </li>
            </ul>
        </nav>
    )
};

function OtherPagesNavigate({ onOpenMobMenu, whiteTextClass, isLanding }) {
    return (
        <>
            <nav>
                <ul className="navigation">
                    <li className="navigation__container">
                        <Link className={`navigation__movies ${whiteTextClass}`} to="/movies">Фильмы</Link>
                        <Link className={`navigation__saved-movies ${whiteTextClass}`} to="/saved-movies">Сохранённые фильмы</Link>
                    </li>
                    <li>
                        <Link className="navigation__account-btn" to="/profile">
                            <p className={`navigation__acc-text ${whiteTextClass}`}>Аккаунт</p>
                            <img className="navigation__account-pict" src={akkPict} alt="Переход к аккаунту" />
                        </Link>
                    </li>
                    <button className={`navigation__small-screen-menu-btn ${isLanding && "navigation__small-screen-menu-btn_whte"}`} onClick={onOpenMobMenu}></button>
                </ul>
            </nav>

        </>
    )
};

function MobileMenu({ onClose }) {

    return (
        <>
            <nav>
                <ul className="navigation__mobile">
                    <li >
                        <Link className="navigation__saved-movies navigation__saved-movies_mobile" onClick={onClose} to="/">Главная </Link>
                    </li>
                    <li >
                        <Link className="navigation__movies navigation__saved-movies_mobile navigation__movies-underline" onClick={onClose} to="/movies">Фильмы</Link>
                    </li>
                    <li >
                        <Link className="navigation__saved-movies navigation__saved-movies_mobile" onClick={onClose} to="/saved-movies">Сохранённые фильмы</Link>
                    </li>
                    <li>
                        <Link to="/profile" >
                            <img className="navigation__akk-btn-mobile" src={profile} alt="Переход к аккаунту" onClick={onClose} />
                        </Link>
                    </li>
                </ul>
            </nav>

        </>
    )
};


export { LandingPageNavigate, OtherPagesNavigate, MobileMenu };