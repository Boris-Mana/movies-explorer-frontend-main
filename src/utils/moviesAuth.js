export const BASE_URL =  "https://api.filmservice.olgman.nomorepartiesxyz.ru"
// "https://api.manproj.students.nomoredomains.sbs";
// 'http://localhost:3001' 
// "https://auth.nomoreparties.co";
const credentialsValue = 'include';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status} ${res.statusText}`);
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then(handleResponse);
};
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: credentialsValue,
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: credentialsValue,
  }).then(handleResponse);
};
