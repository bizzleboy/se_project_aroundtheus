export default class UserInfo {
  constructor({ userName, userJob }) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
  }

  getUserInfo() {
    return { name: this.userName.textContent, job: this.userJob.textContent };
  }

  setUserInfo(newName, newJob) {
    this.userName.textContent = newName;
    this.userJob.textContent = newJob;
  }
}
