export default class Popup {
  constructor({ selector }) {
    this._popUpElement = document.querySelector(selector);
  }
  open() {
    this._popUpElement.classList.add("modal_opened");

    document.addEventListener("keyup", (event) => this._handleEscClose(event));
  }
  close() {
    this._popUpElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains("modal")) {
      this.close();
    }
  }
  setEventListeners() {
    const closeButton = this._popUpElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popUpElement.addEventListener("mousedown", (evt) => {
      this._handleOverlayClick(evt);
    });
  }
}
