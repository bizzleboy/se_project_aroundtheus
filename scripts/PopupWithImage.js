import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ selector: popupSelector });

    this._caption = this._selector.querySelector(".modal__caption");
    this._image = this._selector.querySelector(".modal__preview-image");
  }
  open(caption, link) {
    console.log(link);
    this._caption.textContent = caption;
    this._image.src = link;
    super.open();
  }
}
