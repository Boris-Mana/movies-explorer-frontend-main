import portfolioArrow from "../../../images/portfolio-arrow.svg"

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 id='me' className="portfolio__title">Портфолио</h2>
            <ul className="porgtolio__list">
                <li>
                    <a className="portfolio__link" href="https://olgman2411.github.io/russian-travel/" rel="noreferrer" target="_blank">
                        <p className="portfolio__link-text">Статичный сайт</p>
                        <img className="portfolio__link-arrow" src={portfolioArrow} alt="Стрелка вовне" />
                    </a>
                </li>
                <li>
                    <a className="portfolio__link" href="https://manproj.students.nomoredomains.sbs/" rel="noreferrer" target="_blank" >
                        <p className="portfolio__link-text">Адаптивный сайт</p>
                        <img className="portfolio__link-arrow" src={portfolioArrow} alt="Стрелка вовне" />
                    </a>
                </li>
                <li>
                    <a className="portfolio__link" href="https://boris-mana.github.io/calc-sq-correct/" rel="noreferrer" target="_blank" >
                        <p className="portfolio__link-text">Одностраничное приложение</p>
                        <img className="portfolio__link-arrow" src={portfolioArrow} alt="Стрелка вовне" />
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;