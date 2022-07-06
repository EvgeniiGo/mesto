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
  cardElement.querySelector('.card__title').textContent = title;

  // Изменение состояния кнопки Лайк по клику
  const likeButton = cardElement.querySelector('.card__like-button');
  function changeLikeState() {
    likeButton.classList.toggle('card__like-button_state_pressed')
  }
  likeButton.addEventListener('click', changeLikeState);

  return cardElement;
}

// Добавляем на загруженную страницу базовые 6 карточек
initialCards.forEach(function (card) {
  grid.append(addCard(card.name, card.link));
});


// Код для работы с попапами (формами)

// Находим блок profile, текущие значения и кнопки в DOM
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__subtitle');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

// Находим и возвращаем элементы попапа в DOM
function getPopup(popup) {
  const inputTitle = popup.querySelector('.popup__input_type_title');
  const inputSubtitle = popup.querySelector('.popup__input_type_subtitle');
  const submitButton = popup.querySelector('.popup__form');
  const closeButton = popup.querySelector('.popup__close-button');
  return [inputTitle, inputSubtitle, submitButton, closeButton];
}

// Функция, закрывающая попап редактирования профиля
function closeProfileUpdatePopup() {
  profileUpdatePopup.classList.remove('popup_opened');
}

// Открываем попап профиля и присваиваем инпутам значения из него
function openProfileUpdatePopup() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  profileUpdatePopup.classList.add('popup_opened');
}

// Функция сохранения новых значений профиля
function updateFields(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closeProfileUpdatePopup()
}

// Находим и настраиваем попап редактирования профиля
const profileUpdatePopup = document.querySelector('#profileUpdatePopup');
const [inputName, inputAbout, saveButton, closeButton] = getPopup(profileUpdatePopup);
// Запускаем попап при нажатии на кнопку редактирования
profileEditButton.addEventListener('click', openProfileUpdatePopup);
// Закрываем попап при нажатии на крестик
closeButton.addEventListener('click', closeProfileUpdatePopup);
// При сохранении меняем текст полей
saveButton.addEventListener('submit', updateFields);

// Открываем пустой попап добавления новой карточки
function openCardAddPopup() {
  cardName.value = "";
  cardLink.value = "";
  cardAddPopup.classList.add('popup_opened');
}

// Функция, закрывающая попап добавления новой карточки
function closeCardAddPopup() {
  cardAddPopup.classList.remove('popup_opened');
}

// Функция добавления новой карточки через форму
function addNewCard(evt) {
  evt.preventDefault();
  newCard = {
    name: cardName.value,
    link: cardLink.value
  }
  grid.prepend(addCard(cardName.value, cardLink.value));
  closeCardAddPopup();
}

// Находим и настраиваем попап добавления карточки
const cardAddPopup = document.querySelector('#cardAddPopup');
const [cardName, cardLink, addButton, cancelButton] = getPopup(cardAddPopup);
// Запускаем попап при нажатии на кнопку добавления (+)
profileAddButton.addEventListener('click', openCardAddPopup);
// Закрываем попап при нажатии на крестик
cancelButton.addEventListener('click', closeCardAddPopup);
// При нажатии на кнопку создаем новую карточку и закрываем форму
addButton.addEventListener('submit', addNewCard);






