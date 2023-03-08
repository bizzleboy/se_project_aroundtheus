import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ selector: popupSelector });

    this._caption = this._selector.querySelector(".modal__caption");
    this._image = this._selector.querySelector(".modal__preview-image");
  }
  open(caption, link) {
    this._caption.textContext = caption;
    this._src = link;
    super.open();
  }
}
