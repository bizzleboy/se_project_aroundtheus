import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

function fillProfileForm() {
  nameInputField.setAttribute("value", profileName.textContent);
  jobInputField.setAttribute("value", subtitleName.textContent);
}

/*
                      Template
############################################################
*/

const cardSelector = "#card__template";
/*
                      FUNCTIONS
############################################################
*/

//adding cards
function addCard(evt) {
  evt.preventDefault();

  const createdCard = {
    name: titleInputField.value,
    link: linkInputField.value,
  };
  const card = new Card(createdCard, cardSelector);
  cardsContainer.prepend(card.getElement());
  closePopup(addWindow);
  profileAddForm.reset();
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

function closeModalEscape(evt) {
  if (evt.key === "Escape") {
    // search for an opened modal
    const openedModal = document.querySelector(".modal__opened");
    // close it
    closePopup(openedModal);
  }
}

function closeModalMouseDown(evt) {
  if (evt.target === evt.currentTarget) {
    console.log("lol");
    closePopup(evt.target);
  }
}

//OPEN POPUP
export function openPopup(popup) {
  popup.classList.add("modal__opened");
  document.addEventListener("keyup", closeModalEscape);
  popup.addEventListener("mousedown", closeModalMouseDown);
}
//Open popup event listener
openProfileEditorButton.addEventListener("click", () => {
  fillProfileForm();
  openPopup(editWindow);
});
addButton.addEventListener("click", () => openPopup(addWindow));

//CLOSE POPUP
function closePopup(popup) {
  popup.classList.remove("modal__opened");
  document.removeEventListener("keydown", closeModalEscape);
  popup.removeEventListener("mousedown", closeModalMouseDown);
}
//CLOSE POPUP EVENT LISTENER
closeProfileEditorButton.addEventListener("click", () =>
  closePopup(editWindow)
);
closeAddPictureButton.addEventListener("click", () => closePopup(addWindow));

//editing profile submitsd
function handleProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInputField.value;

  subtitleName.textContent = jobInputField.value;
  closePopup(editWindow);
}

//handle closing modal alternatives
closePreviewPopupButton.addEventListener("click", () =>
  closePopup(previewPopup)
);
//EVENT LISTENER FOR SUBMITTING PROFILE CHANGES
editWindow.addEventListener("submit", handleProfileSubmit);

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, profileAddForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

initialCards.forEach(function (cardElement) {
  const card = new Card(cardElement, cardSelector);
  cardsContainer.prepend(card.getElement());
});
