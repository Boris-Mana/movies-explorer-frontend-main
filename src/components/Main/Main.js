import Header from "../Header/Header.js";
import Footer from '../Footer/Footer';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';

function Main(
    {
        loggedIn,
        onOpenMobMenu
    }
) {

    return (
        <main>
            <Header loggedIn={loggedIn} onOpenMobMenu={onOpenMobMenu} isLanding={true} />
            <div>
                <Promo />
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
            </div>
            <Footer />
        </main>

    );
}

export default Main;
