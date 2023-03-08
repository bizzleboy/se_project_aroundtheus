import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this.handleFormSubmit = handleFormSubmit;
    console.log(this.popupSelector);
    console.log(this._selector);
    this._popupForm = this._selector.querySelector("modal__form");
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
  open() {
    super.open();
  }
  _handleEscClose() {
    super._handleEscClose();
  }
}
