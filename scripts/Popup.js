export default class Popup {
  constructor({ selector }) {
    this._selector = document.querySelector(selector);
  }
  open() {
    this._selector.classList.add("modal_opened");
    document.addEventListener("keyup", (event) => this._handleEscClose(event));
  }
  close() {
    if (this._selector === null) {
      //pass
    } else {
      this._selector.classList.remove("modal_opened");
      document.removeEventListener("keyup", (event) =>
        this._handleEscClose(event)
      );
    }
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      console.log(evt);
      this.close();
    }
  }
  setEventListeners() {
    const closeButton = this._selector.querySelector(".modal__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });
    this._selector.addEventListener("mousedown", () => {
      console.log("hi");
      this._handleOverlayClick;
    });
  }
}
