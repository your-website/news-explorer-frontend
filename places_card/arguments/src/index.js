// В данном примере коллбэк-функции передаются как аргументы при создании нового экземпляра класса Card;
// Коллбэками описывается работа лайка/удаления карточки/открытия Popup'а с изображением карточки


const rootElement = document.querySelector('.root');
const cardTemplate = document.querySelector('#place-card-template').content.querySelector('.place-card');

// Инстанс класса Апи (Эй пи ай)
const api = new Api({
  address: 'https://praktikum.tk',
  groupId: `cohort0`,
  token: `80a75492-21c5-4330-a02f-308029e94b63`,
});


api.getAppInfo()
  .then(([cardsInfo, userInfo]) => {

    // Создаем инстансы классов.
    const picturePopup = new PicturePopup('#picture-popup-template', rootElement);
    const cardListSection = new CardListSection({
      selector: '.places-list'
    });

    const getCardData = (cardInfo) => {
      return {
        // Получаем карточки
        data: {...cardInfo, currentUserId: userInfo._id},
        // Коллбэк-функции для удаления карточки.
        removeHandlerCallback: (card) => {
          api.deleteCard(card.id)
            .then(() => {
              cardsInfo = cardsInfo.filter(item => {
                return item._id !== cardInfo._id;
              });
              card.remove()
            })
        },
        // Коллбэк-функция для открытия попапа изображения.
        openHandlerCallback: () => {
          picturePopup.open(cardInfo.link);
          return picturePopup
        },
        // Коллбэку-функция для установки лайка.
        likeHandlerCallback: (card) => {
          api.changeLikeCardStatus(card.id, !card.isLiked)
            .then(data => {
              const index = cardsInfo.findIndex(item => item._id === card.id);
              cardsInfo.splice(index, 1, data);
              card.setView({...data, currentUserId: userInfo._id});
            })
        }
      }
    };

    // Создание карточки
    // Передача двух параметров в поле setData класса CardListSection.
    // Поле setData добавляет в разметку карточку с данными, которые приходят после мапирования cardsInfo
    // с применением для каждого элемента массива функции getCardData, объявленной выше.
    cardListSection.setData(cardsInfo.map(item => getCardData(item)),(info) => {
      // аргумент info - массив полученных карточек
      return [].concat(info).reduce((fragment, cardData) => {
        // Возвращаем Element карточки.
        const card = new Card(cardData,(data) => {
          const newCardElement = cardTemplate.cloneNode(true);
          newCardElement.querySelector('.place-card__image').style.backgroundImage = 'url(' + data.link + ')';
          newCardElement.querySelector('.place-card__name').textContent = data.name;
          return newCardElement;
        });
        fragment.appendChild(card.node);
        return fragment;
      }, document.createDocumentFragment());
    });


  });

