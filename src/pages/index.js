import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import Api from "../components/Api";

import "../pages/index.css";

import closeDelete from "../images/CloseIcon.svg";

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
api
  .getUserInfo()
  .then((data) => {
    userId = data._id; // Store the user ID
  })
  .catch((err) => {
    console.error(err);
  });

/*
Webpack image import thingys
############################################################
*/
import logo from "../images/aroundUS.svg";
// import avatarImage from "../images/jacques-cousteau.jpg";
import close from "../images/CloseIcon.svg";

const logoImage = document.getElementById("logo");

logoImage.src = logo;

const profilePicture = document.getElementById("profpic");
// profilePicture.src = avatarImage;

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

//console.log(api);

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

/*
                      Template
############################################################
*/

const cardSelector = "#card__template";
/*
                      FUNCTIONS
############################################################
*/

const changeAvatarPopup = new PopupWithForm("#change-avatar", (data) => {
  api
    .updateAvatar(data.avatar)
    .then((result) => {
      profilePicture.src = result.avatar;
      changeAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
});

changeAvatarPopup.setEventListeners();

const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__subtitle",
});

api
  .getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result.name, result.about);
    profilePicture.src = result.avatar;
  })
  .catch((err) => {
    console.error(err); // log the error to the console
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
  // Show a loading indicator while the API request is being made
  // editForm.renderLoading(true);

  // Call the updateUserInfo method of the api instance
  api
    .updateUserInfo(data.name, data.subtitle)
    .then((updatedUserData) => {
      // Update the user info on the page with the new data
      userInfo.setUserInfo(updatedUserData.name, updatedUserData.about);

      // Close the edit form
      editForm.close();
    })
    .catch((err) => {
      console.error(err); // Log the error to the console
    });
  // .finally(() => {
  //   // Hide the loading indicator after the API request is complete
  //   editForm.renderLoading(false);
  // });
});

const addForm = new PopupWithForm("#add", (data) => {
  // Show a loading indicator while the API request is being made
  // addForm.renderLoading(true);

  // Call the addCard method of the api instance
  api
    .addCard(data.title, data.link)
    .then((createdCardData) => {
      // Create a new card using the response data
      const cardElement = createCard(createdCardData);

      // Add the new card to the card section
      cardSection.addItem(cardElement);

      // Close the add form
      addForm.close();
    })
    .catch((err) => {
      console.error(err); // Log the error to the console
    });
  // .finally(() => {
  //   // Hide the loading indicator after the API request is complete
  //   addForm.renderLoading(false);
  // });
});

addForm.setEventListeners();
editForm.setEventListeners();

const deleteForm = document.querySelector("#delete-form");

const deleteCardPopup = new PopupWithForm("#delete", (data) => {});

deleteCardPopup.setEventListeners();

const imagePreview = new PopupWithImage("#preview");
imagePreview.setEventListeners();

function createCard(data) {
  return new Card(
    data,
    cardSelector,
    {
      handleImageClick: (name, link) => {
        imagePreview.open(name, link);
      },
      handleDeleteClick: (element, cardId) => {
        // Remove existing event listener before adding a new one
        const handleSubmit = (e) => {
          e.preventDefault();
          api
            .deleteCard(cardId)
            .then(() => {
              element.remove();
              deleteCardPopup.close();
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              deleteForm.removeEventListener("submit", handleSubmit);
            });
        };

        deleteForm.removeEventListener("submit", handleSubmit);
        deleteForm.addEventListener("submit", handleSubmit);

        deleteCardPopup.open();
      },
    },
    { api: api }
  ).getElement();
}

async function renderCard(item) {
  const cardElement = await createCard(item);
  cardSection.addItem(cardElement);
}

const cardSection = new Section(
  {
    items: [],
    renderer: renderCard,
  },
  ".cards"
);

api
  .getInitialCards()
  .then(async (cards) => {
    for (const card of cards) {
      await renderCard(card);
    }
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

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
