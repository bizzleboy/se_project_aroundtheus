import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ selector: popupSelector });

    this._caption = this._popUpElement.querySelector(".modal__caption");
    this._image = this._popUpElement.querySelector(".modal__preview-image");
  }
  open(caption, link) {
    this._caption.textContent = caption;
    this._image.src = link;
    this._image.alt = "photo of " + caption;
    super.open();
  }
}
