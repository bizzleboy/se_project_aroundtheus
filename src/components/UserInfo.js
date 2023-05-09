export default class UserInfo {
  constructor({ userName, userJob, userAvatar }) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
    this.userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      name: this.userName.textContent,
      job: this.userJob.textContent,
      avatar: this.userAvatar.src,
    };
  }

  setUserInfo(newName, newJob, newAvatar) {
    this.userName.textContent = newName;
    this.userJob.textContent = newJob;
    this.setAvatar(newAvatar);
  }

  setAvatar(newAvatar) {
    this.userAvatar.src = newAvatar;
  }
}
