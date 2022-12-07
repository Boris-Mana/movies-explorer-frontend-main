import pictFind from "../../images/lupa.svg"

import { useEffect, useState } from "react";

export default function SearchForm({ onFind, searchText }) {
    const [searchInput, setSearchInput] = useState(searchText);
    const [isValidSearchWord, setIsValidSearchWord] = useState(true);

    useEffect(() => {
        setSearchInput(searchText);
    }, [searchText]);


    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
        if (e.target.value.length === 0 ) {            
            setIsValidSearchWord(false);
        } else {            
            setIsValidSearchWord(true);
        }
    };

    const handleValidSearchWord = (e) => {
        e.preventDefault();
        onFind(searchInput);
    }

    return (
        <form className="search__box" onSubmit={handleValidSearchWord} noValidate>
            <input
                className="search__input"
                type="text"
                name="movie_find_input"
                placeholder="Фильм"
                required
                value={searchInput}
                id="movie_find"
                onChange={handleSearchInput}
            />
            <button
                className='search__btn'
                type="submit"
                name="find"
            >
                <img src={pictFind} alt="начать поиск" />
            </button>
            <span className={`search__input-error ${isValidSearchWord ? "search__input-error_inactive" : ""}`} id="search-input-error">Нужно ввести ключевое слово.</span>
        </form>
    );
}
