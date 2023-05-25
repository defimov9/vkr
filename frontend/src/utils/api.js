import { BASE_URL } from "./auth";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  changeUserAvatar(file) {
    const formData = new FormData();
    formData.append("avatar", file);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: formData,
    }).then(this._checkResponse);
  }

  getInitialCards(currentPage, findUserCards) {
    return fetch(
      `${this._baseUrl}/cards?page=${currentPage}&pageSize=9&findUserCards=${findUserCards}`,
      {
        headers: this._headers,
      }
    ).then(this._checkResponse);
  }

  addCard({ title, link }) {
    const formData = new FormData();
    formData.append("link", link);
    formData.append("name", title);
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: formData,
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, needAdd) {
    return needAdd ? this.addLike(id) : this.deleteLike(id);
  }

  setToken() {
    this._headers.authorization = `Bearer ${localStorage.getItem("jwt")}`;
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
