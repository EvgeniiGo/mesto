// Находим блок profile, текущие значения и кнопку в DOM
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__subtitle');
const button = profile.querySelector('.profile__edit-button');

// Находим поля и кнопки попапа
const popup = document.querySelector('.popup');
const inputName = popup.querySelector('.popup__input_type_name');
const inputAbout = popup.querySelector('.popup__input_type_about');
const save = popup.querySelector('.popup__form');
const close = popup.querySelector('.popup__close-button');

// Открываем попап и присваиваем инпутам значения из профиля
function openPopup() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  popup.classList.add('popup_opened');
}

// Закрываем попап
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Присваиваем полям новые значения и закрываем попап
function updateFields(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}

// Запускаем попап при нажатии на кнопку редактирования
button.addEventListener('click', openPopup);

// Закрываем попап при нажатии на крестик
close.addEventListener('click', closePopup);

// При сохранении меняем текст полей
save.addEventListener('submit', updateFields);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Находим блок card-grid
const grid = document.querySelector('.card-grid');

// Функция добавления новой карточки
function addCard(title, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  console.log(link);
  cardElement.querySelector('.card__title').textContent = title;

  // Изменение состояния кнопки Лайк по клику
  const likeButton = cardElement.querySelector('.card__like-button');
  function changeLikeState() {
    likeButton.classList.toggle('card__like-button_state_pressed')
  }
  likeButton.addEventListener('click', changeLikeState);

  grid.append(cardElement);
}

// Добавляем на загруженную страницу базовые 6 карточек
initialCards.forEach(function (card) {
  addCard(card.name, card.link);
});