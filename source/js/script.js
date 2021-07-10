// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import {animateLetters} from './modules/animations.js';
import FullPageScroll from './modules/full-page-scroll';

document.addEventListener(`DOMContentLoaded`, () => {
  document.body.classList.add(`loaded`);
});

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const animations = {};
animations[`intro__title`] = animateLetters(document.querySelector(`.intro__title`), {duration: 600, delay: 200});
animations[`intro__date`] = animateLetters(document.querySelector(`.intro__date`), {duration: 400, delay: 700});
animations[`slider__item-title`] = animateLetters(document.querySelector(`.slider__item-title`), {duration: 250, delay: 0, waveLength: 0});
animations[`rules__title`] = animateLetters(document.querySelector(`.rules__title`), {duration: 250, delay: 0});
animations[`game__title`] = animateLetters(document.querySelector(`.game__title`), {duration: 250, delay: 0});
animations[`prizes__title`] = animateLetters(document.querySelector(`.prizes__title`), {duration: 250, delay: 250});

const replayAnimations = () => {
  for (const key of Object.keys(animations)) {
    for (const animation of animations[key]) {
      animation.play();
    }
  }
};

document.body.addEventListener(`screenChanged`, replayAnimations);
