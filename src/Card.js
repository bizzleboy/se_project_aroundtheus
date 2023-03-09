class Card {
  constructor(data, selector, { handleImageClick }) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeIcon.bind(this));
    this._deleteButton.addEventListener("click", this._deleteCard.bind(this));
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-active");
  }

  _deleteCard() {
    this._deleteButton.closest(".card").remove();
  }

  _handlePreviewClick() {
    this._preview = document.querySelector("#preview");

    const previewLink = this._link;
    const previewAlt = this._name;

    const previewCaption = this._name;
    const modalPreviewImage = this._preview.querySelector(
      ".modal__preview-image"
    );

    const modalPreviewPictureCaption = previewAlt;

    //prettier-ignore
    modalPreviewImage.setAttribute("src", previewLink);
    //prettier-ignore
    modalPreviewImage.setAttribute("alt", previewAlt);
    this._preview.querySelector(".modal__caption").textContent = this._name;

    this._preview.classList.add("modal_opened");
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

    this._cardImage.src = `${this._link}`;
    this._cardImage.alt = `${this._link}`;
    this._element.querySelector(".card__text").textContent = this._name;

    return this._element;
  }
}
export default Card;
