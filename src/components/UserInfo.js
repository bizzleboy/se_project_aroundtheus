export default class UserInfo {
  constructor({ userName, userJob }) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
  }

  getUserInfo() {
    return { name: this._userName, job: this._userJob };
  }

  setUserInfo(newName, newJob) {
    this.userName.textContent = newName;
    this.userJob.textContent = newJob;
  }
}
