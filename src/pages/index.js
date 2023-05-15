import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import Api from "../components/Api";

import "../pages/index.css";
import { config, cardSelector, selectors } from "../utils/constants.js";

/*
                      Constants
############################################################
*/

const profileAddForm = document.getElementById(selectors.profileAddForm);
const profileEditForm = document.getElementById(selectors.profileEditForm);
const openProfileEditorButton = document.querySelector(
  selectors.openProfileEditorButton
);
const addButton = document.querySelector(selectors.addButton);
const jobInputField = document.getElementById(selectors.jobInputField);
const nameInputField = document.getElementById(selectors.nameInputField);
//const logoImage = document.querySelector(".header__logo");
const logoImage = document.getElementById(selectors.logoImage);
const profilePicture = document.getElementById(selectors.profilePicture);

const closePreview = document.getElementById(selectors.closePreview);
const closeEdit = document.getElementById(selectors.closeEdit);
const closeAdd = document.getElementById(selectors.closeAdd);
const closeDelete = document.getElementById(selectors.closeDelete);

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

let userId; // Declare the variable at the top level

const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__subtitle",
  userAvatar: "#profpic",
});

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => renderCard(item, userId),
  },
  ".cards"
);

async function initApp() {
  try {
    const userInfoData = await api.getUserInfo();
    userId = userInfoData._id;
    userInfo.setUserInfo(
      userInfoData.name,
      userInfoData.about,
      userInfoData.avatar
    );

    const cards = await api.getInitialCards();
    for (const card of cards) {
      await renderCard(card, userId);
    }
  } catch (err) {
    console.error(err);
  }
}

initApp();

/*
Webpack image import thingys
############################################################
*/
import logo from "../images/aroundUS.svg";
// import avatarImage from "../images/jacques-cousteau.jpg";
import close from "../images/CloseIcon.svg";

logoImage.src = logo;

// profilePicture.src = avatarImage;

closePreview.src = close;

closeEdit.src = close;

closeAdd.src = close;

closeDelete.src = close;

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

/*
                      FUNCTIONS
############################################################
*/

const changeAvatarPopup = new PopupWithForm("#change-avatar", (data) => {
  changeAvatarPopup.renderLoading(true);

  api
    .updateAvatar(data.avatar)
    .then((result) => {
      userInfo.setAvatar(result.avatar);
      changeAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      changeAvatarPopup.renderLoading(false);
    });
});

changeAvatarPopup.setEventListeners();

function fillProfileForm() {
  const { name, job } = userInfo.getUserInfo();

  nameInputField.setAttribute("value", name);
  jobInputField.setAttribute("value", job);
}

const avatarForm = document.querySelector("#avatar-form");

const avatarFormValidator = new FormValidator(config, avatarForm);
avatarFormValidator.enableValidation();

profilePicture.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  changeAvatarPopup.open();
});

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, profileAddForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const editForm = new PopupWithForm("#edit", (data) => {
  editForm.renderLoading(true);

  api
    .updateUserInfo(data.name, data.subtitle)
    .then((updatedUserData) => {
      console.log(data.avatar);
      console.log(updatedUserData.avatar);
      userInfo.setUserInfo(
        updatedUserData.name,
        updatedUserData.about,
        updatedUserData.avatar
      );
      editForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editForm.renderLoading(false);
    });
});

const addForm = new PopupWithForm("#add", (data) => {
  addForm.renderLoading(true);

  api
    .addCard(data.title, data.link)
    .then((createdCardData) => {
      return createCard(createdCardData, userId); // Return the promise here
    })
    .then((cardElement) => {
      cardSection.addItem(cardElement); // Add the card to the DOM after the image has been preloaded
      addForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addForm.renderLoading(false);
    });
});

addForm.setEventListeners();
editForm.setEventListeners();

const deleteForm = document.querySelector("#delete-form");

const deleteCardPopup = new PopupWithForm("#delete", () => {
  api
    .deleteCard(deleteCardPopup.cardId)
    .then(() => {
      deleteCardPopup.cardElement.remove();
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
});

deleteCardPopup.setEventListeners();

const imagePreview = new PopupWithImage("#preview");
imagePreview.setEventListeners();

function createCard(data, userId) {
  return new Card(
    data,
    cardSelector,
    {
      handleImageClick: (name, link) => {
        imagePreview.open(name, link);
      },
    },
    {
      handleDeleteCard: (cardElement, cardId) => {
        deleteCardPopup.cardElement = cardElement; // Store the card element
        deleteCardPopup.cardId = cardId; // Store the card ID
        deleteCardPopup.open(); // Open the delete confirmation popup
      },
      handleLikeToggle: (cardId, isLiked) => {
        return isLiked ? api.removeLike(cardId) : api.addLike(cardId);
      },
    },
    userId
  ).getElement();
}

async function renderCard(item, id) {
  const cardElement = await createCard(item, id);
  cardSection.addItem(cardElement);
}

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
