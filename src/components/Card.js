class Card {
  constructor(
    data,
    selector,
    { handleImageClick, handleDeleteClick },
    options
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._popUpElement = selector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._api = options.api;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeIcon.bind(this));
    //this._deleteButton.addEventListener("click", this._deleteCard.bind(this));
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this._element, this._cardId)
    );
  }

  _handleLikeIcon() {
    const isLiked = this._likeButton.classList.contains("card__like-active");

    (isLiked
      ? this._api.removeLike(this._cardId)
      : this._api.addLike(this._cardId)
    )
      .then((updatedCard) => {
        this._likes = updatedCard.likes.length;
        this._element.querySelector(".card__like-count").textContent =
          this._likes;
        this._likeButton.classList.toggle("card__like-active");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._popUpElement)
      .content.querySelector(".card")
      .cloneNode(true);

    cardElement.querySelector(".card__like-count").textContent = this._likes;
    return cardElement;
  }
  async getElement() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(".card__like");
    this._deleteButton = this._element.querySelector(".card__delete");
    this._cardImage = this._element.querySelector(".card__image");

    // Conditionally show the delete button
    // if (22 !== this._cardId) {
    //   this._deleteButton.style.display = "none";
    // }

    try {
      const userInfo = await this._api.getUserInfo();
      if (userInfo._id !== this._ownerId) {
        this._deleteButton.style.display = "none";
      }
    } catch (error) {
      console.error(error);
    }

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = `photo of ${this._name}`;
    this._element.querySelector(".card__text").textContent = this._name;

    return this._element;
  }
}
export default Card;
