import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import { CardsContext } from "../../contexts/CardsContext";

import ProtectedRoute from "../protectedRoute/ProtectedRoute";

import Main from "../Main/Main.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import Profile from '../Profile/Profile.js';
import NotFound from "../NotFound/NotFound";
import * as moviesAuth from "../../utils/moviesAuth";

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import getMoviesApi from "../../utils/MoviesApi";
import { getMainApi } from "../../utils/MainApi"

import MobileMenuPopup from "../MobileMenuPopup/MobileMenuPopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { DURATIONSHORT } from "../../utils/constants";


const IMGURLPREF = 'https://api.nomoreparties.co/';


export default function App() {
  const [isChecked, setIsChecked] = useState(false);
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({});

  const [isMobileMenuPopupOpen, setIsMobileMenuPopupOpen] = useState(false);

  const [isMoveisLoaded, setIsMoviesLoaded] = useState(false);
  const [isMoveisLoading, setIsMoviesLoading] = useState(false);
  const [isMoveisRequesFail, setIsMoveisRequesFail] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);

  // Переменные для отображения фильмов. Исходные данные и фильтрованные
  const [searchText, setSearchText] = useState('');
  const [moviesArrOrigAll, setMoviesArrOrigAll] = useState([]);
  const [moviesAllFormatted, setMoviesAllFormatted] = useState(JSON.parse(localStorage.getItem('moviesFormatedAll')));
  const [moviesShortFormatted, setMoviesShortFormatted] = useState(JSON.parse(localStorage.getItem('moviesShortFormated')));
  const [workArr, setWorkArr] = useState([]);

  // Массив фильмов сохраненный. Получен с нашего api
  const [moviesSavedToAPI, setMoviesSavedToAPI] = useState([]);

  const [isResponseFail, setIsResponseFail] = useState(true);
  const [message, setMessage] = useState("");

  const makeMovieDataList = () => {
    const workAr = moviesArrOrigAll.length === 0 ? JSON.parse(localStorage.getItem('allOrigMovies')) : moviesArrOrigAll;
    const dataList = workAr.map((movie) => ({
      country: movie.country ? movie.country : '',
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${IMGURLPREF}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `${IMGURLPREF}${movie.image.url}`,
      movieId: movie.id,
    }));
    const shortDataList = dataList.filter(movie => movie.duration < DURATIONSHORT);

    localStorage.setItem('moviesFormatedAll', JSON.stringify(dataList));
    localStorage.setItem('moviesShortFormated', JSON.stringify(shortDataList));
  }

  const handleMobMenuOpenClick = () => {
    setIsMobileMenuPopupOpen(true);
  };

  const handleSearchClick = (searchInput) => {
    localStorage.setItem('searchText', searchInput);
    setSearchText(searchInput);
  };

  const handleCheckboxClick = () => {
    localStorage.setItem('ShowShortState', !isChecked);
    setIsChecked(!isChecked);
  }

  const handleLikeClick = (card, isLiked) => {
    //Карты из стороннего сервиса не имеют поля _id. Только пришедшие с нашего бэка. Далее выбор для del запроса
    const workCard = isLiked ? moviesSavedToAPI.find(item => item.movieId === card.movieId) : card;

    getMainApi
      .setLikeState(!isLiked, workCard)
      .then((newCard) => {
        if (!isLiked) {
          setMoviesSavedToAPI([...moviesSavedToAPI, newCard]);
        } else {
          setMoviesSavedToAPI((state) => state.filter(item => item.movieId !== newCard.card.movieId));
        }
        localStorage.setItem("markAsLike", JSON.stringify(moviesSavedToAPI));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelCardClick = (card) => {
    getMainApi
      .deleteElement(card._id)
      .then((res) => {
        setMoviesSavedToAPI((state) =>
          state.filter((item) => res.card.movieId !== item.movieId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getAllInfo = () => {
    setIsMoviesLoading(true);
    // Сразу получаем карты от Яндекса (все) и наши сохраненные
    Promise.all([getMainApi.getUserInfo(), getMoviesApi(), getMainApi.getCards()])
      .then(([data, cardsAll, cardsSaved]) => {
        setCurrentUser({
          name: data.name,
          email: data.email,
          _id: data._id,
        });
        setIsMoviesLoading(false);
        localStorage.setItem('currentUser', JSON.stringify(data));
        localStorage.setItem('allOrigMovies', JSON.stringify(cardsAll));
        setMoviesArrOrigAll(JSON.parse(localStorage.getItem('allOrigMovies')));

        makeMovieDataList(); //сохранили в стейт и в local storage массив карт, с нашими полями
        //Сохраняем в стейт лайкнутые карточки. Скачанные с нашего апи  
        const cardsOnlyMy = cardsSaved.filter(movie => movie.owner === data._id);
        localStorage.setItem('markAsLike', JSON.stringify(cardsOnlyMy));
        setMoviesSavedToAPI(cardsOnlyMy);

        setIsMoviesLoaded(true);
        setIsMoveisRequesFail(false);
      }).then(() => {
        const textInStorage = localStorage.getItem('searchText');
        const checkStatInStorage = localStorage.getItem('ShowShortState');
        const arrInStorage = JSON.parse(localStorage.getItem('moviesFound'));

        setMoviesAllFormatted(JSON.parse(localStorage.getItem('moviesFormatedAll')));
        setMoviesShortFormatted(JSON.parse(localStorage.getItem('moviesShortFormated')));


        setSearchText(textInStorage !== null ? textInStorage : '');
        setIsChecked(checkStatInStorage !== null ? checkStatInStorage : false);
        setWorkArr(arrInStorage !== null ? arrInStorage : [])
      })
      .catch((err) => {
        console.log('Ошибка при загрузке фильмов. Код', err);
        setIsMoviesLoaded(false);
        setIsMoveisRequesFail(true);
        setIsMoviesLoading(false);
      });
  };

  useEffect(() => {
    if (loggedIn) {
      const textInStorage = localStorage.getItem('searchText');
      const checkStatInStorage = localStorage.getItem('ShowShortState');
      const arrInStorage = JSON.parse(localStorage.getItem('moviesFound'));
      const arrLiked = JSON.parse(localStorage.getItem('markAsLike'));
      const user = JSON.parse(localStorage.getItem('currentUser'));
      const moviesAllSaved = JSON.parse(localStorage.getItem('moviesFormatedAll'));
      let arrToStart = [];

      setMoviesAllFormatted(JSON.parse(localStorage.getItem('moviesFormatedAll')));
      setMoviesShortFormatted(JSON.parse(localStorage.getItem('moviesShortFormated')));


      setSearchText(textInStorage !== null ? textInStorage : '');
      setIsChecked(checkStatInStorage !== null ? checkStatInStorage : false);

      if (!textInStorage && textInStorage === '') {
        arrToStart = isChecked ? moviesShortFormatted : moviesAllFormatted;
      }

      setWorkArr(arrInStorage !== null ? arrInStorage : arrToStart);
      setMoviesSavedToAPI(arrLiked !== null ? arrLiked : []);
      setCurrentUser(user !== null ? user : {});
      setIsMoviesLoaded(moviesAllSaved ? true : false);
    }
  }, []);

  useEffect(() => {
    const arrInFind = isChecked ? moviesShortFormatted : moviesAllFormatted;
    let arrToWrite;

    const srchStr = searchText.toLowerCase();
    if (arrInFind && srchStr && srchStr !== '') {
      arrToWrite = arrInFind.filter((movie) => {
        const whereFind = movie.nameRU.toLowerCase() + movie.nameEN.toLowerCase();
        if (whereFind.includes(srchStr)) {
          return movie
        };
      });
    } else {
      arrToWrite = arrInFind;
    }
    localStorage.setItem('moviesFound', JSON.stringify(arrToWrite));
    setWorkArr(arrToWrite);
  }, [isChecked, searchText, loggedIn]);

  useEffect(() => {

  });

  const auth = (jwt) => {
    return moviesAuth.getContent(jwt).then((res) => {
      if (res) {
        // setCurrentUser({ ...currentUser, email: res.email });
        setLoggedIn(true);
      }
    }).catch((err => {
      handleSignOut()
    }));
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth(jwt);
      setLoggedIn(true);
    } else {
      handleSignOut();
      history.push('/')
    }
  }, [loggedIn]);


  const onLogin = ({ email, password }) => {
    return moviesAuth
      .authorize(email, password)
      .then((res) => {
        setMessage('');
        const token = res.token;
        localStorage.setItem("token", res.token);
        getMainApi.getToken(token);
        // setCurrentUser({ ...currentUser, email });
        setLoggedIn(true);
        setIsResponseFail(false);
        getAllInfo();
        history.push('/movies');
      })
      .catch((err) => {
        setMessage(`Что-то пошло не так! Ошибка ${err}`);
        setIsResponseFail(true);
        console.log("Ошибка авторизации:", err);
      });
  };

  const onRegister = ({ name, email, password }) => {
    return moviesAuth
      .register(name, email, password)
      .then((data) => {
        setMessage('');
        setIsResponseFail(true);
        alert(`Вы успешно зарегистрировались. Пользователь: ${data.user.name}, ${data.user.email}`);
        return moviesAuth.authorize(email, password)
      })
      .then((resp) => {
        setMessage('');
        const token = resp.token;
        localStorage.setItem("token", resp.token);
        getMainApi.getToken(token);
        setLoggedIn(true);
        setIsResponseFail(false);
        getAllInfo();
        history.push('/movies');

      })
      .catch((err) => {
        setMessage(`Что-то пошло не так! Ошибка ${err}`);
        setIsResponseFail(true);
        console.log("Ошибка регистрации:", err);
      });
  };

  const handleUpdateUser = ({ name, email }) => {
    getMainApi
      .updateUserInfo({ name, email })
      .then((data) => {
        console.log('По успешному сохранению юзверя пришли данные:', data)
        setMessage('');
        setCurrentUser({ ...currentUser, name: data.name, email: data.email });
        localStorage.setItem('currentUser', JSON.stringify(data));
        alert(`Данные успешно изменены. Пользователь: ${data.name}, ${data.email}`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setMessage(`Не удалось изменить данные. Ошибка -", ${err}`);
      });
  };


  const handleSignOut = () => {
    history.push("/");
    setLoggedIn(false);
    setIsResponseFail(false);
    setMoviesSavedToAPI([]);
    localStorage.removeItem('searchText');
    localStorage.removeItem('moviesShortFormated');
    localStorage.removeItem('moviesFormatedAll');
    localStorage.removeItem('allOrigMovies');
    localStorage.removeItem('markAsLike');
    localStorage.removeItem('ShowShortState');
    localStorage.removeItem('moviesFound');
    localStorage.removeItem('currentUser');
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const closeMenuPopup = () => {
    setIsMobileMenuPopupOpen(false);
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={moviesSavedToAPI}>
        <div className="root">

          <MobileMenuPopup
            isOpen={isMobileMenuPopupOpen}
            onClose={closeMenuPopup}
          />

          <Switch>

            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
              isChecked={isChecked}
              isMoveisLoaded={isMoveisLoaded}
              isMoveisRequesFail={isMoveisRequesFail}
              isMoveisLoading={isMoveisLoading}
              searchText={searchText}
              onCheckbox={handleCheckboxClick}
              onOpenMobMenu={handleMobMenuOpenClick}
              onLike={handleLikeClick}
              onSearch={handleSearchClick}
              workArr={workArr}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              onOpenMobMenu={handleMobMenuOpenClick}
              onDelCard={handleDelCardClick}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              sign={false}
              onUpdateUser={handleUpdateUser}
              onOpenMobMenu={handleMobMenuOpenClick}
              onLogout={handleSignOut}
              message={message}
            />

            <Route exact path='/'>
              <Main loggedIn={loggedIn} onOpenMobMenu={handleMobMenuOpenClick} />
            </Route>

            <Route path="/signin">
              {!loggedIn ?
                <Login
                  onSignIn={onLogin}
                  loggedIn={loggedIn}
                  isResponseFail={isResponseFail}
                  message={message}
                /> : <Redirect to="/" />}
            </Route>

            <Route path="/signup">
              {!loggedIn ? <Register
                onSignUp={onRegister}
                loggedIn={loggedIn}
                isResponseFail={isResponseFail}
                message={message}
              /> : <Redirect to="/" />}
            </Route>

            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>

        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}
