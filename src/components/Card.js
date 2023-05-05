class Card {
  constructor(data, selector, { handleImageClick }, options) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._popUpElement = selector;
    this._handleImageClick = handleImageClick;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._api = options.api;
    this._userId = options.userId;
    this._deleteForm = options.deleteForm;
    this._deleteCardPopup = options.deleteCardPopup;
  }

  _handleDeleteClickInternal(element, cardId) {
    const handleSubmit = (e) => {
      e.preventDefault();
      this._api
        .deleteCard(cardId)
        .then(() => {
          element.remove();
          this._deleteCardPopup.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this._deleteForm.removeEventListener("submit", handleSubmit);
        });
    };

    this._deleteForm.removeEventListener("submit", handleSubmit);
    this._deleteForm.addEventListener("submit", handleSubmit);

    this._deleteCardPopup.open();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeIcon.bind(this));

    this._cardImage.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClickInternal(this._element, this._cardId)
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

    if (this._userId !== this._ownerId) {
      this._deleteButton.style.display = "none";
    } else {
      this._deleteButton.style.display = "block";
    }

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = `photo of ${this._name}`;
    this._element.querySelector(".card__text").textContent = this._name;

    return this._element;
  }
}
export default Card;
