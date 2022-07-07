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

const cardTemplate = document.querySelector('#card-template').content;
const grid = document.querySelector('.card-grid');

const profileUpdatePopup = document.querySelector('#profileUpdatePopup');
const cardAddPopup = document.querySelector('#cardAddPopup');

const imagePopup = document.querySelector('#imagePopup');
const image = imagePopup.querySelector('.popup__image');
const imageName = imagePopup.querySelector('.popup__image-name');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__subtitle');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

// Универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Найти кнопку закрытия попапа и сделать ее рабочей
function activateClosePopupButton(popup) {
  const popupCloseButton = popup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', function () {
    closePopup(popup);
  });
}

// Функция добавления новой карточки
function addCard(title, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = title;
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = title;

  // Открывает попап при нажатии на картинку
  cardImage.addEventListener('click', function () {
    image.src = cardImage.src;
    image.alt = cardTitle.textContent;
    imageName.textContent = cardTitle.textContent;
    openPopup(imagePopup);

    // Активируем кнопку закрытия попапа с картинкой
    activateClosePopupButton(imagePopup);
  })

  // Измененяем состояние кнопки Лайк по клику
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_state_pressed')
  });

  // Удаляем карточку нажатием на урну
  const trashButton = cardElement.querySelector('.card__delete-button')
  trashButton.addEventListener('click', function () {
    cardElement.remove();
  })
  return cardElement;
}

// Находим и возвращаем элементы попапа в DOM
function getPopup(popup) {
  const inputTitle = popup.querySelector('.popup__input_type_title');
  const inputSubtitle = popup.querySelector('.popup__input_type_subtitle');
  const popupForm = popup.querySelector('.popup__form');
  return [inputTitle, inputSubtitle, popupForm];
}



// Добавляем на загруженную страницу базовые 6 карточек
initialCards.forEach(function (card) {
  grid.append(addCard(card.name, card.link));
});


// Запускаем попап при нажатии на кнопку редактирования
profileEditButton.addEventListener('click', function () {
  const [inputName, inputAbout, popupForm] = getPopup(profileUpdatePopup);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(profileUpdatePopup);

  // Активируем кнопку закрытия попапа
  activateClosePopupButton(profileUpdatePopup);

  // При сохранении меняем текст полей
  popupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup(profileUpdatePopup);
  });
});


// Запускаем попап при нажатии на кнопку добавления (+)
profileAddButton.addEventListener('click', function () {
  const [cardName, cardLink, popupForm] = getPopup(cardAddPopup);
  openPopup(cardAddPopup);
  popupForm.reset();

  // Активируем кнопку закрытия попапа
  activateClosePopupButton(cardAddPopup);

  // При нажатии на кнопку создаем новую карточку и закрываем форму
  popupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    grid.prepend(addCard(cardName.value, cardLink.value));
    closePopup(cardAddPopup);
  });
});

