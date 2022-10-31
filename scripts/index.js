let card1 = {
  name: "Yosemite Valley",
  link: "../images/yosemite-valley.jpg",
};

let card2 = {
  name: "Lake Louise",
  link: "../images/lake-louise.png",
};

let card3 = {
  name: "Bald Mountains",
  link: "../images/bald-mountains.png",
};

let card4 = {
  name: "Latemar",
  link: "../images/latemar.png",
};

let card5 = {
  name: "Vanoise National Park",
  link: "../images/vanoise-national-park.png",
};

let card6 = {
  name: "Yosemite Valley",
  link: "../images/yosemite-valley.jpg",
};

let initialCards = [card1, card2, card3, card4, card5, card6];
let openEditor = document.querySelector(".profile__edit");
let closeEditor = document.querySelector(".modal__close");
let editWindow = document.querySelector(".modal");

// prettier-ignore
let nameInput = document.querySelector(".modal__input").setAttribute("value", document.querySelector(".profile__name").textContent);
// prettier-ignore
let jobInput =  document.querySelector("#subtitle").setAttribute("value", document.querySelector(".profile__subtitle").textContent);

openEditor.addEventListener("click", function () {
  editWindow.classList.add("modal_opened");
});

closeEditor.addEventListener("click", function () {
  editWindow.classList.remove("modal_opened");
});

function handleProfileSubmit(evt) {
  evt.preventDefault();
  let profileName = document.querySelector(".profile__name");
  profileName.textContent = document.querySelector(".modal__input").value;

  let profileSubtitle = document.querySelector(".profile__subtitle");
  profileSubtitle.textContent = document.querySelector("#subtitle").value;
}

editWindow.addEventListener("submit", handleProfileSubmit);

function getCardElement(data) {
  let cardTemplate = document.querySelector("#card__template").textContent;
}
