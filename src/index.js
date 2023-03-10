import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";

import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

import "./index.css";

/*
Webpack image import thingys
############################################################
*/
import logo from "./images/aroundUS.svg";
import pp from "./images/jacques-cousteau.jpg";
import close from "./images/CloseIcon.svg";

const logoImage = document.getElementById("logo");
console.log(logoImage);

logoImage.src = logo;

const profilePicture = document.getElementById("profpic");
profilePicture.src = pp;

const closePreview = document.getElementById("preview-close");
closePreview.src = close;

const closeEdit = document.getElementById("edit-close");
closeEdit.src = close;

const closeAdd = document.getElementById("add-close");
closeAdd.src = close;

/*
Cards
############################################################
*/
import yose from "./images/yosemite-valley.jpg";
import lake from "./images/lake-louise.png";
import bald from "./images/bald-mountains.png";
import latemar from "./images/latemar.png";
import nat from "./images/vanoise-national-park.png";
import lago from "./images/lago-di-braies.png";

const card1 = {
  name: "Yosemite Valley",
  link: yose,
};

const card2 = {
  name: "Lake Louise",
  link: lake,
};

const card3 = {
  name: "Bald Mountains",
  link: bald,
};

const card4 = {
  name: "Latemar",
  link: latemar,
};

const card5 = {
  name: "Vanoise National Park",
  link: nat,
};

const card6 = {
  name: "Lago Di Braies",
  link: lago,
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

const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__subtitle",
});

const editForm = new PopupWithForm("#edit", () => {
  userInfo.setUserInfo(nameInputField.value, jobInputField.value);

  editForm.close();
});

const previewForm = new PopupWithForm("#preview", () => {
  previewForm.close();
});

const addForm = new PopupWithForm("#add", () => {
  const createdCard = {
    name: titleInputField.value,
    link: linkInputField.value,
  };

  const card = createCard(createdCard);
  cardsContainer.prepend(card.getElement());
  addForm.close();
});

addForm.setEventListeners();
editForm.setEventListeners();

const imagePreview = new PopupWithImage("#preview");
imagePreview.setEventListeners();

function createCard(data) {
  return new Card(data, cardSelector, {
    handleImageClick: (name, link) => {
      imagePreview.open(name, link);
    },
  });
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);

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
