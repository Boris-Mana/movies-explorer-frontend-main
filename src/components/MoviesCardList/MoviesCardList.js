import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ workArr, moviesListClass, onLike, onDelCard }) {


    const cardsElements = workArr.map((card) => {
        return (
            <MoviesCard
                card={card}
                key={card.movieId}
                onLike={onLike}
                onDelCard={onDelCard}
            />
        )
    });

    return (
        <div className={`${moviesListClass}`}>
            {cardsElements}
        </div>
    );
}
