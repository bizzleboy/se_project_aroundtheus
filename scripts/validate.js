/*


=======================Functions================
*/

const config = {
  invalidInput: "modal__input-invalid",
  activateError: "form__input-error_active",
  formTypeError: "form__input_type_error",
  inactiveButton: "modal__button-inactive",
  modalInput: ".modal__input",
  modalButton: ".modal__button",
  modalForm: ".modal__form",
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.invalidInput);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.activateError);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.formTypeError);
  errorElement.classList.remove(config.activateError);
  inputElement.classList.remove(config.invalidInput);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButton);

    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButton);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.modalInput));

  const buttonElement = formElement.querySelector(config.modalButton);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.modalForm));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

enableValidation(config);
