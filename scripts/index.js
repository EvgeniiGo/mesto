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

function openImagePopup(link, title) {
  image.src = link.src;
  image.alt = title.textContent;
  imageName.textContent = title.textContent;
  openPopup(imagePopup);
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
    openImagePopup(cardImage, cardTitle);
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
  return [inputTitle, inputSubtitle];
}

// Находим и возвращаем форму попапа
function getPopupForm(popup) {
  return popup.querySelector('.popup__form');
}

// Добавляем на загруженную страницу базовые 6 карточек
initialCards.forEach(function (card) {
  grid.append(addCard(card.name, card.link));
});

// Активируем кнопки закрытия попапов
document.querySelectorAll('.popup').forEach(function (popup) {
  activateClosePopupButton(popup);
})

// Объявляем формы попапов
const profilePopupForm = getPopupForm(profileUpdatePopup);
const cardPopupForm = getPopupForm(cardAddPopup);

// Запускаем попап при нажатии на кнопку редактирования
profileEditButton.addEventListener('click', function () {
  const [inputName, inputAbout] = getPopup(profileUpdatePopup);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(profileUpdatePopup);
});

// При сохранении меняем текст полей
profilePopupForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const [inputName, inputAbout] = getPopup(profileUpdatePopup);
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(profileUpdatePopup);
});


// Запускаем попап при нажатии на кнопку добавления (+)
profileAddButton.addEventListener('click', function () {
  openPopup(cardAddPopup);
  cardPopupForm.reset();
});

// При нажатии на кнопку создаем новую карточку и закрываем форму
cardPopupForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const [cardName, cardLink] = getPopup(cardAddPopup);
  grid.prepend(addCard(cardName.value, cardLink.value));
  closePopup(cardAddPopup);
});

