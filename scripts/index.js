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
const openEditor = document.querySelector(".profile__edit");
const closeEditor = document.querySelector(".modal__close");
const editWindow = document.querySelector(".modal");

const nameInputField = document.querySelector(".modal__input");
const profileName = document.querySelector(".profile__name");

const jobInputField = document.querySelector("#subtitle");
const subtitleName = document.querySelector(".profile__subtitle");

nameInputField.setAttribute("value", profileName.textContent);
jobInputField.setAttribute("value", subtitleName.textContent);

//OPEN POPUP
function openPopup(popup) {
  popup.classList.add("modal_opened");
}

//Open popup event listener
openEditor.addEventListener("click", () => openPopup(editWindow));

//close popup
function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

closeEditor.addEventListener("click", () => closePopup(editWindow));

//editing profile submits
function handleProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInputField.value;

  subtitleName.textContent = jobInputField.value;
  closePopup(editWindow);
}

editWindow.addEventListener("submit", handleProfileSubmit);

const cardsList = document.querySelector(".cards");

//addcard
const addWindow = document.querySelector(".js-add");

const addButton = document.querySelector(".profile__add");
addButton.addEventListener("click", () => openPopup(addWindow));

const closeAdd = document.querySelector(".js-close");
closeAdd.addEventListener("click", () => closePopup(addWindow));

const titleInputField = document.querySelector("#title");
const linkInputField = document.querySelector("#link");

const profileAddForm = document.querySelector("#add-form");

//cardstuff
function getCardElement(data) {
  const cardTemplate = document.querySelector("#card__template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardName = data.name;
  const cardLink = data.link;
  const altText = data.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", cardLink);
  cardImage.setAttribute("alt", altText);

  cardElement.querySelector(".card__text").textContent = cardName;

  return cardElement;
}
const cardsContainer = document.querySelector(".cards");

initialCards.forEach(function (card) {
  cardsContainer.append(getCardElement(card));
});

//like button
likeButton = document.querySelector("card__like");

//likeButton.setAttribute("background-image", "url('../images/heart.svg')");
likeButton.setAttribute("width", "555");
