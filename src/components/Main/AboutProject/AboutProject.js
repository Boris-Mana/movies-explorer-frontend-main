function AboutProject() {
    return (
        <section className="about-project">
            <h2 id='about' className="about-project__main-title">О проекте</h2>
            <div className="about-project__container-info">
                <div className="about-project__container-info-item">
                    <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__container-info-item">
                    <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__info-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__container-diagr">
                <div className="about-project__container-diagr-item">
                    <p className="about-project__diagr-text">1 неделя</p>
                </div>
                <div className="about-project__container-diagr-item">
                    <p className="about-project__diagr-text">4 недели</p>
                </div>
                <div className="about-project__container-diagr-item">
                    <p className="about-project__diagr-text about-project__diagr-text_grey">Back-end</p>
                </div>
                <div className="about-project__container-diagr-item">
                    <p className="about-project__diagr-text about-project__diagr-text_grey">Front-end</p>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;