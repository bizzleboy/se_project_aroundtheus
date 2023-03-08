import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";

import PopupWithImage from "./PopupWithImage.js";

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
/*
                      POPUPS
############################################################
*/

const editWindow = document.querySelector("#edit");

const addWindow = document.querySelector("#add");

const profileAddForm = document.querySelector("#add-form");

const profileEditForm = document.querySelector("#edit-form");

/*
                      BUTTONS
############################################################
*/

const openProfileEditorButton = document.querySelector(".profile__edit");

const addButton = document.querySelector(".profile__add");

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

function fillProfileForm() {
  nameInputField.setAttribute("value", profileName.textContent);
  jobInputField.setAttribute("value", subtitleName.textContent);
}

fillProfileForm();

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

const editForm = new PopupWithForm("#edit", () => {
  profileName.textContent = nameInputField.value;

  subtitleName.textContent = jobInputField.value;
  editForm.close();
});

const addForm = new PopupWithForm("#add", () => {
  const createdCard = {
    name: titleInputField.value,
    link: linkInputField.value,
  };
  const card = new Card(createdCard, cardSelector);
  cardsContainer.prepend(card.getElement());
  addForm.close();
});
addForm.setEventListeners();
editForm.setEventListeners();
const imagePreview = new PopupWithImage("#preview");
imagePreview.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(item, cardSelector);

      cardsContainer.prepend(cardElement.getElement());
    },
  },
  ".cards"
);

cardSection.renderItems();

//Open popup event listener
openProfileEditorButton.addEventListener("click", () => {
  editForm.open();
});

addButton.addEventListener("click", () => {
  addForm.open();
});
