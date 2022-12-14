import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openPopup,
  closeModalEscape,
  closeModalMouseDown,
  closePopup,
} from "./utils.js";

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
  name: "Lago Di Braies",
  link: "./images/lago-di-braies.png",
};
const initialCards = [card1, card2, card3, card4, card5, card6];

const cardsContainer = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card__template").content;
/*
                      POPUPS
############################################################
*/

const editWindow = document.querySelector("#edit");

const addWindow = document.querySelector("#add");

const profileAddForm = document.querySelector("#add-form");

const profileEditForm = document.querySelector("#edit-form");

const previewPopup = document.querySelector("#preview");

/*
                      BUTTONS
############################################################
*/

const openProfileEditorButton = document.querySelector(".profile__edit");
const closeProfileEditorButton = document.querySelector("#edit-close");

const addButton = document.querySelector(".profile__add");

const closeAddPictureButton = document.querySelector(".js-close");

const createButton = document.querySelector("#create-btn");

const closePreviewPopupButton = previewPopup.querySelector("#preview-close");

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

/*
                      Template
############################################################
*/

const cardSelector = "#card__template";
/*
                      FUNCTIONS
############################################################
*/

//Open popup event listener
export const editButtonListener = openProfileEditorButton.addEventListener(
  "click",
  () => {
    fillProfileForm();
    openPopup(editWindow);
  }
);
export const addButtonListener = addButton.addEventListener("click", () =>
  openPopup(addWindow)
);

const submitListener = editWindow.addEventListener(
  "submit",
  handleProfileSubmit
);

// find all close buttons
const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  // find the closest popup
  const popup = button.closest(".modal");
  // set the listener
  button.addEventListener("click", () => closePopup(popup));
});

function fillProfileForm() {
  nameInputField.setAttribute("value", profileName.textContent);
  jobInputField.setAttribute("value", subtitleName.textContent);
}

//adding cards

function createCard() {
  const createdCard = {
    name: titleInputField.value,
    link: linkInputField.value,
  };
  const card = new Card(createdCard, cardSelector);
  return card;
}

//editing profile submitsd
function handleProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInputField.value;

  subtitleName.textContent = jobInputField.value;
  closePopup(editWindow);
}

function addCard(evt) {
  evt.preventDefault();

  cardsContainer.prepend(createCard().getElement());
  closePopup(addWindow);
  profileAddForm.reset();
  addFormValidator.resetValidation();
  // toggleButtonState([titleInputField, linkInputField], createButton, config);
}

const addForm = document.querySelector("#add-form");
addForm.addEventListener("submit", addCard);

const config = {
  invalidInput: "modal__input-invalid",
  activateError: "form__input-error_active",
  formTypeError: "form__input_type_error",
  inactiveButton: "modal__button-inactive",
  modalInput: ".modal__input",
  modalButton: ".modal__button",
  modalForm: ".modal__form",
};

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, profileAddForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

initialCards.forEach(function (cardElement) {
  const card = new Card(cardElement, cardSelector);
  cardsContainer.prepend(card.getElement());
});
