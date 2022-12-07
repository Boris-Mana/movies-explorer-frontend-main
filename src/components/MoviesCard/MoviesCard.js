import { Route } from "react-router-dom";
import { useContext } from "react";
import { CardsContext } from "../../contexts/CardsContext.js";

export default function MoviesCard({ card, onDelCard, onLike }) {
    const moviesSaved = useContext(CardsContext);
    const isLiked = moviesSaved.some((i) => i.movieId === card.movieId);

    const hours = Math.floor(card.duration / 60);
    const minutes = card.duration % 60;
    const duration = hours === 0 ? `${minutes}м` : `${hours}ч ${minutes}м`

    const handleDeleteClick = () => {
        onDelCard(card);
    };

    const handleCardLike = () => {
        onLike(card, isLiked);
    };

    return (
        <li className="movie-card" id={card.movieId}>
            <div className="movie-card__info-box">
                <div>
                    <h2 className="movie-card__title">{card.nameRU}</h2>
                    <p className="movie-card__duration">{duration}</p>
                </div>
                <Route path='/movies'>
                    <button
                        className={`movie-card__like ${isLiked && "movie-card__like_active"}`}
                        type="button"
                        name="like"
                        onClick={handleCardLike}
                    ></button>
                </Route>

                <Route path='/saved-movies'>
                    <button
                        className="movie-card__close"
                        type="button"
                        name="like"
                        onClick={handleDeleteClick}
                    ></button>
                </Route>


            </div>
            <a className="movie-card__img-box" href={card.trailerLink} rel="noreferrer" target="_blank" >
                <img
                    className="movie-card__img"
                    src={card.image}
                    alt={card.nameRU}
                />
            </a>
        </li>
    );
}
