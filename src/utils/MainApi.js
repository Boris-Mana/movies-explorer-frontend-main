const urlBase = 'https://api.filmservice.olgman.nomorepartiesxyz.ru'
// 'http://localhost:3001' 
const urlSuffixCard = "/movies";
const urlSuffixUsers = "/users/me";

const credentialsValue = 'include';

const token = localStorage.getItem("token")

export class Api {
  constructor(config) {
    this._url = config.url;
    this._headersContent = "application/json";
    this._token = config.headers.Authorization;

    this._urlCards = `${this._url}${urlSuffixCard}`;
    this._urlProfile = `${this._url}${urlSuffixUsers}`;

    this._credentials = config.credentials;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка! " + res.status);
  }

  getToken = (token) => {
    this._token = `Bearer ${token}`;
  };

  getUserInfo() {
    return fetch(this._urlProfile, {
      method: "GET",
      headers: {
        Authorization: this._token,
        "Content-Type": this._headersContent,
      },
      credentials: this._credentials,
    }).then(this._handleResponse);
  }

  getCards() {
    return fetch(this._urlCards, {
      method: "GET",
      headers: {
        Authorization: this._token,
        "Content-Type": this._headersContent,
      },
      credentials: this._credentials,
    }).then(this._handleResponse);
  }

  createElement(data) {
    return fetch(this._urlCards, {
      method: "POST",
      headers: {
        Authorization: this._token,
        "Content-Type": this._headersContent,
      },
      credentials: this._credentials,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  setLikeState(likeOnState, card) {
    if (likeOnState) {
      return fetch(`${this._urlCards}`, {
        method: "POST",
        headers: {
          Authorization: this._token,
          "Content-Type": this._headersContent,
        },
        credentials: this._credentials,
        body: JSON.stringify(card),
      }).then(this._handleResponse);
    } else {
      return fetch(`${this._urlCards}/${card._id}`, {
        method: "DELETE",
        headers: {
          Authorization: this._token,
          "Content-Type": this._headersContent,
        },
        credentials: this._credentials,
      }).then(this._handleResponse);
    }
  }

  deleteElement(cardId) {
    return fetch(`${this._urlCards}/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: this._token,
        "Content-Type": this._headersContent,
      },
      credentials: this._credentials,
      body: JSON.stringify({ _id: cardId }),
    }).then(this._handleResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._url}${urlSuffixUsers}`, {
      method: "PATCH",
      headers: {
        Authorization: this._token,
        "Content-Type": this._headersContent,
      },
      credentials: this._credentials,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }
}

export const getMainApi = new Api({
  url: `${urlBase}`,
  credentials: credentialsValue,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
