class FormValidator {
  constructor(selectorConfig, formElement) {
    this._invalidInput = selectorConfig.invalidInput;
    this._activateError = selectorConfig.activateError;
    this._formTypeError = selectorConfig.formTypeError;
    this._inactiveButton = selectorConfig.inactiveButton;
    this._modalInput = selectorConfig.modalInput;
    this._modalButton = selectorConfig.modalButton;
    this._modalForm = selectorConfig.modalForm;

    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._invalidInput);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._activateError);
  }

  _hideInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    errorElement.classList.remove(this._activateError);
    inputElement.classList.remove(this._invalidInput);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButton);

      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButton);
    }
  }

  _setEventListeners() {
    //prettier-ignore
    
    this._inputList = Array.from(this._formElement.querySelectorAll(this._modalInput));
    this._buttonElement = this._formElement.querySelector(this._modalButton);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
