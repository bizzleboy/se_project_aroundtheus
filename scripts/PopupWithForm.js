import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ selector: popupSelector });

    this.handleFormSubmit = handleFormSubmit;
    this.popupSelector = popupSelector;

    this._popupForm = this._selector.querySelector(".modal__form");
  }

  _getInputValues() {
    const inputList = Array.from(
      this._selector.querySelectorAll(".modal__input")
    );
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  close() {
    this.popupSelector.reset();
    super.close();
  }
  open() {
    super.open();
  }
  setEventListeners() {
    super.setEventListeners();
    this.popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues());
    });
  }
}
