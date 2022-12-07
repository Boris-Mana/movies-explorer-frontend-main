import { useState, useContext, useEffect } from "react";
import { CardsContext } from "../../contexts/CardsContext";

import { MESSAGENOTHINGFOUND, DURATIONSHORT } from "../../utils/constants";

import Header from '../Header/Header.js';
import Footer from '../Footer/Footer';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ErrorMessageBlock from "../ErrorMessageBlock/ErrorMessageBlock";

function SavedMovies({ onCheckbox, onOpenMobMenu, onDelCard }) {
    const moviesSavedToAPI = useContext(CardsContext);
    const [isCheckedSaved, setIsCheckedSaved] = useState(false);
    const [moviesShow, setMoviesShow] = useState(JSON.parse(localStorage.getItem('markAsLike')) ? JSON.parse(localStorage.getItem('markAsLike')) : moviesSavedToAPI);
    const [searchInLikedText, setSearchInLikedText] = useState('');

    useEffect(() => {
        setIsCheckedSaved(false);
        setSearchInLikedText('');
    }, []);

    useEffect(() => {
        const srchStr = searchInLikedText.toLowerCase();
        let moviesForFind = moviesSavedToAPI;

        if (isCheckedSaved) {
            moviesForFind = moviesSavedToAPI.filter(movie => movie.duration < DURATIONSHORT);
        }
        if (srchStr && srchStr !== '') {
            moviesForFind = moviesForFind.filter((movie) => {
                const whereFind = movie.nameRU.toLowerCase() + movie.nameEN.toLowerCase();
                if (whereFind.includes(srchStr)) {
                    return movie
                };
            });
        }
        setMoviesShow(moviesForFind);

    }, [isCheckedSaved, searchInLikedText, moviesSavedToAPI]);


    const handleShowShortSwitcher = () => {
        setIsCheckedSaved(!isCheckedSaved);
    };


    return (
        <>
            <Header onOpenMobMenu={onOpenMobMenu} />
            <div className="movies__filters">
                <SearchForm onFind={(searchText) => { setSearchInLikedText(searchText); }} />
                <FilterCheckbox isCheckedSaved={isCheckedSaved} onCheckbox={handleShowShortSwitcher} />
            </div>
            <section className="saved-movies">
                {
                    moviesShow.length > 0 ?
                        <MoviesCardList
                            workArr={moviesShow}
                            moviesListClass="saved-movies__list"
                            onDelCard={onDelCard}
                        /> :
                        <ErrorMessageBlock message={MESSAGENOTHINGFOUND} />
                }
                <div className="saved-movies__blank" />
            </section>
            <Footer />
        </>
    );
}

export default SavedMovies;