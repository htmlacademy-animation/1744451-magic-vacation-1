import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.lastActiveScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.lastActiveScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeThemeEvent();
  }

  changeVisibilityDisplay() {
    let timeout = 0;

    if (this.lastActiveScreen === 1 && this.activeScreen === 2) {
      timeout = 1000;
    }

    this.screenElements.forEach((screen) => {
      screen.classList.remove(`screen--next`);
      if (screen.classList.contains(`active`)) {
        screen.classList.add(`screen--leaving`);
      }

      setTimeout(() => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
        screen.classList.remove(`screen--leaving`);
      }, timeout);

    });
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      this.screenElements[this.activeScreen].classList.add(`active`);
      this.emitChangeDisplayEvent();
    }, timeout);
    this.screenElements[this.activeScreen].classList.add(`screen--next`);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeThemeEvent() {
    const changeThemeEvent = new CustomEvent(`changeTheme`, {
      detail: {
        'isStoryPage': this.screenElements[this.activeScreen].id === `story`,
        'index': 0
      }
    });
    window.dispatchEvent(changeThemeEvent);
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
