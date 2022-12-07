function NavTab() {
    return (
        <nav className="nav-tab">
            <ul className="nav-tab__container">
                <li>
                    <a className="nav-tab__text" href="#about">О проекте</a>
                </li>
                <li>
                    <a className="nav-tab__text" href="#technol">Технологии</a>
                </li>
                <li>
                    <a className="nav-tab__text" href="#me">Студент</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;