export default class Popup {
  constructor({ selector }) {
    this._selector = document.querySelector(selector);
  }
  open() {
    this._selector.classList.add("modal_opened");
  }
  close() {
    if (this._selector === null) {
      //pass
      console.log("a");
    } else {
      this._selector.classList.remove("modal_opened");
      // document.removeEventListener("keyup", closeModalEscape);
      // this._selector.removeEventListener("mousedown", closeModalMouseDown);
    }
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      console.log("hi");
      console.log(this._selector);
      this._selector.close();
    }
  }
  setEventListeners() {
    const closeButton = this._selector.querySelector(".modal__close");
    console.log(this._selector);
    const openedModal = this._selector.querySelector(".modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
    closeButton.addEventListener("click", () => {
      this.close();
      //document.removeEventListener("keydown");
    });
  }
}
