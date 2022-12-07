import { useState, useEffect } from "react";

import {
    MESSAGEGETMOVERROR,
    MESSAGENOTHINGFOUND,
    WIDTHBIGSCR,
    WIDTHSMALLSCR,
    LENGTHBIG,
    LENGTHMIDDLE,
    LENGTHSMALL
} from "../../utils/constants";

import Header from '../Header/Header.js';
import Footer from '../Footer/Footer';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import Preloader from "../Preloader/Preloader";
import ErrorMessageBlock from "../ErrorMessageBlock/ErrorMessageBlock";

export default function Movies(
    {
        isMoveisLoaded,
        isMoveisRequesFail,
        isMoveisLoading,
        isChecked,
        onCheckbox,
        onOpenMobMenu,
        onLike,
        onSearch,
        searchText,
        workArr
    }
) {
    const [srcWidth, setSrcWidth] = useState(window.innerWidth);
    const [moviesShow, setMoviesShow] = useState([]);
    const [counterMoreClick, setCounterMoreClick] = useState(0);



    useEffect(() => {
        if (isMoveisLoaded) {
            let timer = setTimeout(() => { }, 10);
            window.addEventListener('resize', (e) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    setSrcWidth(window.innerWidth);
                }, 500);
            });

            const found = getOnScreenArr(workArr, counterMoreClick);
            setMoviesShow(found);

            return window.removeEventListener('resize', (e) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    setSrcWidth(window.innerWidth);
                }, 500);
            });
        } else {
            setMoviesShow([]);
        }
    }, []);

    const handleShowShortSwitcher = () => {
        onCheckbox();
        setCounterMoreClick(0);
    };

    const getOnScreenArr = (workArr, counterMoreClick) => {
        const screenWidth = window.innerWidth;
        const allLength = workArr.length;

        let maxLength = LENGTHBIG;
        if (screenWidth >= WIDTHBIGSCR) {
            maxLength = LENGTHBIG + counterMoreClick * 3;
        } else if (screenWidth < WIDTHSMALLSCR) {
            maxLength = LENGTHSMALL + counterMoreClick;
        } else {
            maxLength = LENGTHMIDDLE + counterMoreClick * 2;
        }

        const maxNum = allLength > maxLength ? maxLength : allLength;
        return workArr.slice(0, maxNum);
    };

    const handleMoreClick = () => {
        setCounterMoreClick((counterMoreClick) => counterMoreClick + 1);
    };

    useEffect(() => {
        let timer = setTimeout(() => { }, 10);
        window.addEventListener('resize', (e) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setSrcWidth(window.innerWidth);
            }, 500);
        });

        const found = getOnScreenArr(workArr, counterMoreClick);
        setMoviesShow(found);

        return window.removeEventListener('resize', (e) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setSrcWidth(window.innerWidth);
            }, 500);
        });
    }, [srcWidth, isChecked, isMoveisLoaded, counterMoreClick, workArr]);

    const moviesListSection = () => {
        return (
            <>
                <MoviesCardList workArr={moviesShow} moviesListClass="movies__list" onLike={onLike} />

                <button className={`movies__show-more-btn ${workArr.length <= moviesShow.length && "movies__show-more-btn_hide"}`} onClick={handleMoreClick}>
                    <p className="movies__show-more-text">Еще</p>
                </button>
            </>
        )
    };

    return (
        <>
            <Header onOpenMobMenu={onOpenMobMenu} />
            <div className="movies__filters">
                <SearchForm onFind={onSearch} searchText={searchText} />
                <FilterCheckbox isChecked={isChecked} onCheckbox={handleShowShortSwitcher} />
            </div>

            <section className="movies">
                {isMoveisLoading && <Preloader />}
                {isMoveisRequesFail && <ErrorMessageBlock message={MESSAGEGETMOVERROR} />}
                {moviesShow.length > 0 ? moviesListSection() : <ErrorMessageBlock message={MESSAGENOTHINGFOUND} />}
            </section>

            <Footer />
        </>
    );
}
