import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ selector: popupSelector });

    this._handleFormSubmit = handleFormSubmit;

    this._popupForm = this._popUpElement.querySelector(".modal__form");
    this._button = this._popupForm.querySelector(".modal__button");
    this._buttonInitialText = this._button.textContent;
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._button.textContent = loadingText;
      this._button.setAttribute("disabled", true);
    } else {
      this._button.textContent = this._buttonInitialText;
      this._button.removeAttribute("disabled");
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
