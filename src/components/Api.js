export default class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "f32abe83-9303-4a0e-8720-b7e30a51f2e5",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // other methods for working with the API
}
