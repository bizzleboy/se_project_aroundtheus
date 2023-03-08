export default class Popup {
  constructor({ selector }) {
    this._selector = document.querySelector(selector);
  }
  open() {
    this._selector.classList.add("modal_opened");
    this._selector.addEventListener("keyup", closeModalEscape);
    this._selector.addEventListener("mousedown", closeModalMouseDown);
  }
  close() {
    if (this._selector === null) {
      //pass
    } else {
      this._selector.classList.remove("modal_opened");
      document.removeEventListener("keyup", closeModalEscape);
      this._selector.removeEventListener("mousedown", closeModalMouseDown);
    }
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      // search for an opened modal
      const openedModal = document.querySelector(".modal_opened");
      // close it
      closePopup(openedModal);
    }
  }
  setEventListeners() {
    const closeButton = this._selector.querySelector(".modal__close");
    // closeButton.addEventListener("click", )
  }
}
