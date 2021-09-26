export const animateLetters = (textNode, settings) => {
  const animationsArray = [];

  if (!textNode) {
    return [];
  }

  const duration = settings.duration ? settings.duration : 800;
  const delay = settings.delay ? settings.delay : 0;
  const waveLength = settings.waveLength ? settings.waveLength : 6;

  prepareLetters(textNode);

  const words = textNode.querySelectorAll(`.animated-text__word`);
  let wordIndex = 0;
  let letterIndex = 0;
  for (const word of words) {
    const letters = word.querySelectorAll(`span`);
    for (const letter of letters) {
      const letterDuration = (duration * 1.5) / (wordIndex + 1);
      const letterDelay = (Math.abs((letterIndex % waveLength) - waveLength / 2)
        * (Math.trunc(Math.random() * 75 / (wordIndex + 1)) + 75))
        + (duration / (wordIndex + 1) * wordIndex * 1.5)
        + delay;
      const animation = letter.animate([
        // keyframes
        {transform: `translate3d(0, 100%, 0)`},
        {transform: `translate3d(0, 0, 0)`}
      ], {
        // timing options
        duration: letterDuration,
        fill: `both`,
        delay: letterDelay,
        easing: `cubic-bezier(0.18, 0.89, 0.32, 1)`
      });
      animationsArray.push(animation);
      letterIndex++;
    }
    wordIndex++;
  }
  return animationsArray;
};

const prepareLetters = (textNode) => {
  if (textNode.classList.contains(`animation-prepared`)) {
    return;
  }
  const text = textNode.innerHTML;
  textNode.innerHTML = ``;
  const words = text.match(/[^\r\n|\s]+/g);
  textNode.classList.add(`animation-prepared`);
  for (const word of words) {
    const wordSpan = document.createElement(`span`);
    wordSpan.classList.add(`animated-text__word`);
    textNode.appendChild(wordSpan);
    for (const letter of word) {
      const letterSpan = document.createElement(`span`);
      letterSpan.textContent = letter;
      wordSpan.appendChild(letterSpan);
    }
  }
};

const primaryAward = document.getElementById(`primary-award`);
const secondaryAward = document.getElementById(`secondary-award`);
const additionalAward = document.getElementById(`additional-award`);

export const startPrizesAnimation = () => {
  primaryAward.src = `img/primary-award.svg?${new Date().getTime()}`;
  secondaryAward.src = `img/second-award.svg?${new Date().getTime()}`;
  additionalAward.src = `img/additional-award.svg?${new Date().getTime()}`;
};
