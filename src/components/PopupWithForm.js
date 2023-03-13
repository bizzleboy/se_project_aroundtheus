import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ selector: popupSelector });

    this._handleFormSubmit = handleFormSubmit;

    this._popupForm = this._popUpElement.querySelector(".modal__form");
  }

  _getInputValues() {
    const inputList = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );

    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
