import Portfolio from "../Portfolio/Portfolio";
import myPhoto from "../../../images/olga.jpg"

function AboutMe() {
    return (
        <section className="about-me">
            <h2 id='me' className="about-me__main-title">Студент</h2>
            <div className="about-me__main-container">
                <div className="about-me__text-container">
                    <h3 className="about-me__title">Ольга</h3>
                    <p className="about-me__subtitle">Фронтенд-разработчик, 41 год</p>
                    <p className="about-me__text">Родилась и живу в Воронеже. Есть дочь и муж. В последние годы работаю дизайнером-верстальщиком в крупной торговой компании.</p>
                    <a className="about-me__git-link" href="https://github.com/OlgMan2411/movies-explorer-frontend" rel="noreferrer" target="_blank">Github</a>
                </div>
                <div className="about-me__img">
                    <img src={myPhoto} alt="Фото автора" />
                </div>
            </div>
            <Portfolio />
        </section>
    );
}

export default AboutMe;