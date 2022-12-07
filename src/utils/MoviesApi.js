const urlBase = 'https://api.nomoreparties.co/beatfilm-movies'

export default function getMoviesApi () {
  return fetch(urlBase).then((res) => {
    if (res.ok) {      
      return res.json();
    }
    return Promise.reject("Ошибка! " + res.status);
  });
}
