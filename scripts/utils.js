/*
                      FUNCTIONS
############################################################
*/

export function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keyup", closeModalEscape);
  popup.addEventListener("mousedown", closeModalMouseDown);
}

export function closeModalEscape(evt) {
  if (evt.key === "Escape") {
    // search for an opened modal
    const openedModal = document.querySelector(".modal_opened");
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

//CLOSE POPUP
export function closePopup(popup) {
  if (popup === null) {
    //pass
  } else {
    popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeModalEscape);
    popup.removeEventListener("mousedown", closeModalMouseDown);
  }
}

//EVENT LISTENER FOR SUBMITTING PROFILE CHANGES
