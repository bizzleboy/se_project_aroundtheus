class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeIcon);
    this._deleteButton.addEventListener("click", () => this._deleteCard);
    this._cardImage.addEventListener("click", () =>
      this._handlePreviewClick(data)
    );
  }

  _handleLikeIcon(evt) {
    this._likeButton.classList.toggle("card__like-active");
  }

  _deleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  _handlePreviewClick(data) {
    const previewLink = data.link;
    const previewAlt = data.name;
    const previewCaption = data.name;
    const modalPreviewImage = previewPopup.querySelector(
      ".modal__preview-image"
    );
    const modalPreviewPictureCaption =
      previewPopup.querySelector(".modal__caption");

    //prettier-ignore
    modalPreviewImage.setAttribute("src", previewLink);
    //prettier-ignore
    modalPreviewImage.setAttribute("alt", previewLink);
    modalPreviewPictureCaption.textContent = data.name;

    openPopup(previewPopup);
  }

  _getTemplate() {
    //prettier-ignore
    document.querySelector(this._selector).content.querySelector(".card").cloneNode(true);
  }
  getElement() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._likeButton = this._element.querySelector(".card__like");
    this._deleteButton = this._element.querySelector(".card__delete");
    this._cardImage = this._element.querySelector(".card__image");

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__text").textContent = this.name;
  }
}
export default Card;
