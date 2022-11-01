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

let initialCards = [card1, card2, card3, card4, card5, card6];
const openEditor = document.querySelector(".profile__edit");
const closeEditor = document.querySelector(".modal__close");
const editWindow = document.querySelector(".modal");

const nameInputField = document.querySelector(".modal__input");
const profileName = document.querySelector(".profile__name");

const jobInputField = document.querySelector("#subtitle");
const subtitleName = document.querySelector(".profile__subtitle");

// prettier-ignore
let nameInput = nameInputField.setAttribute("value",profileName.textContent);
// prettier-ignore
let jobInput =  jobInputField.setAttribute("value",subtitleName.textContent);

//OPEN POPUP
function openPopup(popup) {
  editWindow.classList.add("modal_opened");
}

//Open popup event listener
openEditor.addEventListener("click", openPopup);

//close popup
function closePopup(popup) {
  editWindow.classList.remove("modal_opened");
}

closeEditor.addEventListener("click", closePopup);

//editing profile submits
function handleProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInputField.value;

  subtitleName.textContent = jobInputField.value;
  closePopup(evt);
}

editWindow.addEventListener("submit", handleProfileSubmit);
let cardsList = document.querySelector(".cards");

function getCardElement(data) {
  let cardTemplate = document.querySelector("#card__template").content;
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  let cardName = data.name;
  let cardLink = data.link;
  let altText = data.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", cardLink);
  cardImage.setAttribute("alt", altText);

  cardElement.querySelector(".card__text").textContent = cardName;

  return cardElement;
}

let cardsContainer = document.querySelector(".cards");
for (card of initialCards) {
  cardsContainer.append(getCardElement(card));
}
