// Находим блок profile, текущие значения и кнопку в DOM
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__subtitle');
let button = profile.querySelector('.profile__edit-button');

// Находим поля и кнопки попапа
let popup = document.querySelector('.popup');
let inputName = popup.querySelector('.popup__input_type_name');
let inputAbout = popup.querySelector('.popup__input_type_about');
let save = popup.querySelector('.popup__form');
let close = popup.querySelector('.popup__close-button');


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