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

export function openPopup(popup) {
  popup.classList.add("modal__opened");
  document.addEventListener("keyup", closeModalEscape);
  popup.addEventListener("mousedown", closeModalMouseDown);
}

export function closeModalEscape(evt) {
  if (evt.key === "Escape") {
    // search for an opened modal
    const openedModal = document.querySelector(".modal__opened");
    // close it
    closePopup(openedModal);
  }
}

export function closeModalMouseDown(evt) {
  if (evt.target === evt.currentTarget) {
    console.log("lol");
    closePopup(evt.target);
  }
}
export function fillProfileForm() {
  nameInputField.setAttribute("value", profileName.textContent);
  jobInputField.setAttribute("value", subtitleName.textContent);
}

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

//CLOSE POPUP
export function closePopup(popup) {
  if (popup === null) {
    //pass
  } else {
    popup.classList.remove("modal__opened");
    document.removeEventListener("keydown", closeModalEscape);
    popup.removeEventListener("mousedown", closeModalMouseDown);
  }
}
//CLOSE POPUP EVENT LISTENER
export const closeEditorListener = closeProfileEditorButton.addEventListener(
  "click",
  () => closePopup(editWindow)
);
export const closeAddListener = closeAddPictureButton.addEventListener(
  "click",
  () => closePopup(addWindow)
);

//editing profile submitsd
export function handleProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInputField.value;

  subtitleName.textContent = jobInputField.value;
  closePopup(editWindow);
}

export const closePreview = closePreviewPopupButton.addEventListener(
  "click",
  () => closePopup(previewPopup)
);
//EVENT LISTENER FOR SUBMITTING PROFILE CHANGES
export const submitListener = editWindow.addEventListener(
  "submit",
  handleProfileSubmit
);
