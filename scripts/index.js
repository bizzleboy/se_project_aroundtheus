/*
Cards
############################################################
*/
const card1 = {
  name: "Yosemite Valley",
  link: "./images/yosemite-valley.jpg",
};

const card2 = {
  name: "Lake Louise",
  link: "./images/lake-louise.png",
};

const card3 = {
  name: "Bald Mountains",
  link: "./images/bald-mountains.png",
};

const card4 = {
  name: "Latemar",
  link: "./images/latemar.png",
};

const card5 = {
  name: "Vanoise National Park",
  link: "./images/vanoise-national-park.png",
};

const card6 = {
  name: "Yosemite Valley",
  link: "./images/yosemite-valley.jpg",
};

const initialCards = [card1, card2, card3, card4, card5, card6];

const cardsContainer = document.querySelector(".cards");
/*
                      POPUPS
############################################################
*/

const editWindow = document.querySelector("#edit");

const addWindow = document.querySelector("#add");

const profileAddForm = document.querySelector("#add-form");

/*
                      BUTTONS
############################################################
*/

const openEditor = document.querySelector(".profile__edit");
const closeEditor = document.querySelector(".modal__close");

const addButton = document.querySelector(".profile__add");

const closeAdd = document.querySelector(".js-close");

const createButton = document.querySelector("#create-btn");

/*
                      INPUTS
############################################################
*/

const jobInputField = document.querySelector("#subtitle");

const nameInputField = document.querySelector(".modal__input");

const titleInputField = document.querySelector("#title");

const linkInputField = document.querySelector("#link");

/*
                      SETTING TEXT VALUES
############################################################
*/
const profileName = document.querySelector(".profile__name");
const subtitleName = document.querySelector(".profile__subtitle");
nameInputField.setAttribute("value", profileName.textContent);
jobInputField.setAttribute("value", subtitleName.textContent);

/*
                      FUNCTIONS
############################################################
*/
//OPEN POPUP
function openPopup(popup) {
  popup.classList.add("modal_opened");
}
//Open popup event listener
openEditor.addEventListener("click", () => openPopup(editWindow));
addButton.addEventListener("click", () => openPopup(addWindow));

//CLOSE POPUP
function closePopup(popup) {
  popup.classList.remove("modal_opened");
}
//CLOSE POPUP EVENT LISTENER
closeEditor.addEventListener("click", () => closePopup(editWindow));
closeAdd.addEventListener("click", () => closePopup(addWindow));

//editing profile submits
function handleProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInputField.value;

  subtitleName.textContent = jobInputField.value;
  closePopup(editWindow);
}

//handling createnButton

//EVENT LISTENER FOR SUBMITTING PROFILE CHANGES
editWindow.addEventListener("submit", handleProfileSubmit);

function cardImageHandler(data) {
  const createdCard = {
    name: titleInputField.value,
    link: linkInputField.value,
  };
}

//cardstuff
function getCardElement(data) {
  const cardTemplate = document.querySelector("#card__template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const previewTemplate = document.querySelector("#preview-template").content;
  // prettier-ignore
  const previewElement = previewTemplate.querySelector(".modal__preview").cloneNode(true);

  const cardName = data.name;
  const cardLink = data.link;
  const altText = data.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", cardLink);
  cardImage.setAttribute("alt", altText);

  const previewImage = previewElement.querySelector(".modal__preview-image");
  previewImage.setAttribute("src", cardLink);
  cardImage.setAttribute("alt", altText);

  cardElement.querySelector(".card__text").textContent = cardName;

  const likeButton = cardElement.querySelector(".card__like");
  const deleteButton = cardElement.querySelector(".card__delete");
  const closePreview = document.querySelector(".modal__close-preview");
  // const previewImage = document.querySelector("#preview");

  //LIKING PICTURES
  const handleLikeIcon = (evt) => {
    evt.target.classList.toggle("card__like-active");
  };
  likeButton.addEventListener("click", handleLikeIcon);

  //DELETING FUNCTION
  function deleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  //REMOVING ELEMENT IN CARDS
  deleteButton.addEventListener("click", deleteCard);

  //PREVIEWING CARDS
  cardImage.addEventListener("click", () => openPopup(previewElement));

  //CLOSING PREVIEW

  //closePreview.addEventListener("click", () => closePopup(previewImage));

  return cardElement;
}
//WHY DID THE LIKE AND DELETE HAVE TO BE WITHIN THE  getCardElement
initialCards.forEach(function (card) {
  cardsContainer.append(getCardElement(card));
});
//APPEND TO CARDS CONTAINER

//adding cards
function addCard(evt) {
  evt.preventDefault();

  const createdCard = {
    name: titleInputField.value,
    link: linkInputField.value,
  };
  cardsContainer.append(getCardElement(createdCard));
  addWindow.closePopup();
}

const addForm = document.querySelector("#add-form");
addForm.addEventListener("submit", addCard);
