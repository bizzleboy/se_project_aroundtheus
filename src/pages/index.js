import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import Api from "../components/Api";

import "../pages/index.css";

/*
API STUFF
################################
*/

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "f32abe83-9303-4a0e-8720-b7e30a51f2e5",
    "Content-Type": "application/json",
  },
});

console.log(api);

/*
Webpack image import thingys
############################################################
*/
import logo from "../images/aroundUS.svg";
import avatarImage from "../images/jacques-cousteau.jpg";
import close from "../images/CloseIcon.svg";

const logoImage = document.getElementById("logo");

logoImage.src = logo;

const profilePicture = document.getElementById("profpic");
profilePicture.src = avatarImage;

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
import yose from "../images/yosemite-valley.jpg";
import lake from "../images/lake-louise.png";
import bald from "../images/bald-mountains.png";
import latemar from "../images/latemar.png";
import nat from "../images/vanoise-national-park.png";
import lago from "../images/lago-di-braies.png";

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

const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__subtitle",
});

function fillProfileForm() {
  const { name, job } = userInfo.getUserInfo();

  nameInputField.setAttribute("value", name);
  jobInputField.setAttribute("value", job);
}

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

const editForm = new PopupWithForm("#edit", (data) => {
  userInfo.setUserInfo(data.name, data.subtitle);

  editForm.close();
});

const addForm = new PopupWithForm("#add", (data) => {
  const createdCard = {
    name: data.title,
    link: data.link,
  };

  const card = createCard(createdCard);

  cardSection.addItem(card);
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
  }).getElement();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);

      cardSection.addItem(cardElement);
    },
  },
  ".cards"
);

cardSection.renderItems();

//Open popup event listener
openProfileEditorButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  fillProfileForm();

  editForm.open();
});

addButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addForm.open();
});
