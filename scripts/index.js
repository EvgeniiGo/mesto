// Находим блок profile, текущие значения и кнопку в DOM
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__subtitle');
let button = profile.querySelector('.profile__edit-button');

// Находим поля и кнопки попапа
let popup = document.querySelector('.popup');
let inputName = popup.querySelector('.popup__input_type_name');
let inputAbout = popup.querySelector('.popup__input_type_about');
let save = popup.querySelector('.popup__save-button');
let close = popup.querySelector('.popup__close-icon');

// Запускаем попап при нажатии на кнопку редактирования
button.addEventListener('click', displayPopup);

// Закрываем попап при нажатии на крестик
close.addEventListener('click', displayPopup);

// Меняем видимость попапа
function displayPopup() {
  popup.classList.toggle('popup_opened');
}

// При сохранении меняем текст полей
save.addEventListener('click', updateFields);

function updateFields() {
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  displayPopup()
}
