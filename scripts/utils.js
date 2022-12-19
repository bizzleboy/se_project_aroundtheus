//OPEN POPUP
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
  popup.classList.remove("modal__opened");
  document.removeEventListener("keydown", closeModalEscape);
  popup.removeEventListener("mousedown", closeModalMouseDown);
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
