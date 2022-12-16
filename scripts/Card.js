class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeIcon.bind(this));
    this._deleteButton.addEventListener("click", this._deleteCard.bind(this));
    this._cardImage.addEventListener("click", () => this._handlePreviewClick());
  }

  _handleLikeIcon() {
    console.log(this._likeButton);
    this._likeButton.classList.toggle("card__like-active");
  }

  _deleteCard() {
    this._deleteButtonclosest(".card").remove();
  }

  _handlePreviewClick() {
    const previewLink = this._link;
    const previewAlt = this._name;
    const previewCaption = this.name;
    const modalPreviewImage = this._element.querySelector(
      ".modal__preview-image"
    );
    console.log(this._element);
    console.log(modalPreviewImage);
    const modalPreviewPictureCaption = previewAlt;

    //prettier-ignore
    modalPreviewImage.setAttribute("src", previewLink);
    //prettier-ignore
    modalPreviewImage.setAttribute("alt", previewLink);
    modalPreviewPictureCaption.textContent = data.name;

    openPopup(previewPopup);
  }

  _getTemplate() {
    //prettier-ignore
    return document.querySelector(this._selector).content.querySelector(".card").cloneNode(true);
  }
  getElement() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(".card__like");
    this._deleteButton = this._element.querySelector(".card__delete");
    this._cardImage = this._element.querySelector(".card__image");

    this._setEventListeners();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__text").textContent = this._name;

    return this._element;
  }
}
export default Card;
