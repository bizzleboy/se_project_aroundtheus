export default class UserInfo {
  constructor({ userName, userJob }) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
  }

  getUserInfo() {
    return { un: this._userName, uj: this._userJob };
  }

  setUserInfo(newName, newJob) {
    this.userName.textContent = newName;
    this.userJob.textContent = newJob;
  }
}
