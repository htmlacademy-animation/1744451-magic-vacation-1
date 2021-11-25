export default class GameTimer {
  constructor() {
    this._initTimeMinutes = 5;
    this._initTimeSeconds = 0;
    this._timeLeftInSeconds = this._initTimeMinutes * 60 + this._initTimeSeconds;
    this._timerContainer = document.querySelector(`.game__counter`);
    this._lastTime = (new Date()).getTime();
    this.requestId = null;
  }

  init() {
    this.requestId = null;
    this._lastTime = (new Date()).getTime();
    this._timeLeftInSeconds = this._initTimeMinutes * 60 + this._initTimeSeconds;

    this.requestId = window.requestAnimationFrame(this.draw.bind(this));
    this._timerContainer.innerText = this.calcTimeLeft(this._timeLeftInSeconds);
  }

  destroy() {
    window.cancelAnimationFrame(this.requestId);
  }

  draw() {
    if (this._timeLeftInSeconds <= 0) {
      this.destroy();
      return;
    }
    this.requestId = window.requestAnimationFrame(this.draw.bind(this));
    let currentTime = (new Date()).getTime();

    if (currentTime - this._lastTime >= 1000) {
      this._lastTime = currentTime;
      this._timeLeftInSeconds--;

      this._timerContainer.innerText = this.calcTimeLeft(this._timeLeftInSeconds);
    }
  }

  calcTimeLeft(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    minutes = (`0` + minutes).slice(-2);
    seconds = (`0` + seconds).slice(-2);

    return `${minutes}:${seconds}`;
  }
}
