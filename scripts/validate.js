const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Функция показа ошибки при невалидном поле
function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  // Объявляем тег внутри которого указывается ошибка
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Добавляем стилизацию невалидного поля
  inputElement.classList.add(`${inputErrorClass}`);
  // Добавляем сообщение об ошибке внутрь тага ошибки
  errorElement.textContent = errorMessage;
  // Добаляем стилизацию тага ошибки
  errorElement.classList.add(`${errorClass}`);
};

// Функция отмены показа ошибки при невалидном поле
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  // Объявляем тег внутри которого указывается ошибка
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Убираем стилизацию невалидного поля
  inputElement.classList.remove(`${inputErrorClass}`);
  // Убираем стилизацию тага ошибки
  errorElement.classList.remove(`${errorClass}`);
  // Убираем сообщение об ошибке из тага ошибки
  errorElement.textContent = "";
};

// Проверяем валидность поля и регулируем показ ошибок
function isValid(formElement, inputElement, inputErrorClass, errorClass) {
  // Если введенное значение не соответствует требованиям - показывает ошибку
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    // Иначе скрывает ошибку
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

function hasInvalidInput(inputList) {
  // Проходим по всем полям формы и проверяем есть ли хоть одно не валидное
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  // Проверяем есть ли хоть одно невалидное поле внутри формы
  if (hasInvalidInput(inputList)) {
    // Если есть, то блокируем кнопку сохранения
    buttonElement.classList.add(`${inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);
    // Если нет, разблокируем кнопку
  } else {
    buttonElement.classList.remove(`${inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
  }
}

function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  // Объявляем массив всех полей внутри формы и кнопку сохранения формы
  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
  const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
  // Проверяем кнопку при открытии формы на блокировку
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  // Перебираем массив
  inputList.forEach(function (inputElement) {
    // Добавляем слушатель, проверяющий валидность
    
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, inputErrorClass, errorClass);

      // Блокируем или разблокируем кнопку в зависимости от валидности полей
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}


function enableValidation(validationSettings) {
  // Объявляем переменные для всех селекторов
  const formSelector = validationSettings['formSelector']
  const inputSelector = validationSettings['inputSelector'];
  const submitButtonSelector = validationSettings['submitButtonSelector'];
  const inactiveButtonClass = validationSettings['inactiveButtonClass'];
  const inputErrorClass = validationSettings['inputErrorClass'];
  const errorClass = validationSettings['errorClass'];

  const formList = Array.from(document.querySelectorAll(`${formSelector}`));

  // Перебираем массив
  formList.forEach(function (formElement) {
    // Отменяем стандартное поведение submit
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    // Добавляем слушатель каждой форме
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}

enableValidation(validationSettings);