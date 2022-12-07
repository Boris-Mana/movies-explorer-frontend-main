import logo from "../../images/logo.svg";
import { Route, Link } from "react-router-dom";
import { LandingPageNavigate, OtherPagesNavigate } from '../Navigation/Navigation';

function Header({ loggedIn, onOpenMobMenu, isLanding }) {

  function LinkToMain() {
    return (<Link
      className="header__logo"
      to="/"
    >
      <img src={logo} alt="ЛогоМой" />
    </Link>)
  }

  return (
    <>
      <Route exact path="/">
        <header className="header header_landing">
          {LinkToMain()}
          {
            loggedIn ?
              <OtherPagesNavigate
                onOpenMobMenu={onOpenMobMenu}
                whiteTextClass="navigation__movies_white-text"
                isLanding={isLanding}
              /> :
              <LandingPageNavigate />
          }
        </header>
      </Route>

      <Route path="/movies">
        <header className="header">
          {LinkToMain()}
          <OtherPagesNavigate onOpenMobMenu={onOpenMobMenu} />
        </header>
      </Route>

      <Route path="/saved-movies">
        <header className="header">
          {LinkToMain()}
          <OtherPagesNavigate onOpenMobMenu={onOpenMobMenu} />
        </header>
      </Route>

      <Route path="/profile">
        <header className="header">
          {LinkToMain()}
          <OtherPagesNavigate onOpenMobMenu={onOpenMobMenu} />
        </header>
      </Route>
    </>



  );
}

export default Header;
