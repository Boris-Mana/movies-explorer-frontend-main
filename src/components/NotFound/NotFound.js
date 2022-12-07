import { useHistory } from 'react-router-dom';

export default function NotFound() {
    const history = useHistory();

    return (
        <div className="notfound">
            <h1 className="notfound__title">404</h1>
            <p className="notfound__text">Страница не найдена</p>
            <button className="notfound__back-link" onClick={() => { history.goBack(); }}>Назад</button>
        </div>
    );
}