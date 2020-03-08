class Api {
  constructor({address, token, groupId}) {
    this.token = token;
    this.groupId = groupId;
    this.address = address;
  }

  getAppInfo() {
    return Promise.all([this.getCards(), this.getUserInfo()]);
  }

  getCards() {
    return fetch(`${this.address}/${this.groupId}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(e => alert('Ошибка загрузки карточек!'))
  }


  deleteCard(cardID) {
    return fetch(`${this.address}/${this.groupId}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(e => alert('Ошибка!'));
  }

  getUserInfo() {
    return fetch(`${this.address}/${this.groupId}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(e => alert('Ошибка загрузки и информации пользователя!'))
  }


  changeLikeCardStatus(cardID, like) {
    return fetch(`${this.address}/${this.groupId}/cards/like/${cardID}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .catch(e => alert('Ошибка!'));
  }
}

