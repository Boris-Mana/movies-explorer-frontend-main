function Techs() {
    return (
        <section className="used-technology">
            <h2 id='technol' className="used-technology__main-title">Технологии</h2>
            <h3 className="used-technology__info-title">7 технологий</h3>
            <p className="used-technology__info-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className="used-technology__container">
                <div className="used-technology__container-item">
                    <p className="used-technology__container-text">HTML</p>
                </div>
                <div className="used-technology__container-item">
                    <p className="used-technology__container-text">CSS</p>
                </div>
                <div className="used-technology__container-item">
                    <p className="used-technology__container-text">JS</p>
                </div>
                <div className="used-technology__container-item">
                    <p className="used-technology__container-text">React</p>
                </div>
                <div className="used-technology__container-item">
                    <p className="used-technology__container-text">Git</p>
                </div>
                <div className="used-technology__container-item">
                    <p className="used-technology__container-text">Express.js</p>
                </div>
                <div className="used-technology__container-item">
                    <p className="used-technology__container-text">mongoDB</p>
                </div>
            </div>
        </section>
    );
}

export default Techs;