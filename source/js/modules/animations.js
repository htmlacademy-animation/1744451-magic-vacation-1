export const animateLetters = (textNode, settings) => {
  const animationsArray = [];

  if (!textNode) {
    return [];
  }

  const duration = settings.duration ? settings.duration : 500;
  const delay = settings.delay ? settings.delay : 0;
  const wordDelayDiff = settings.hasOwnProperty(`wordDelayDiff`) ? settings.wordDelayDiff : 300;

  prepareLetters(textNode);

  const words = textNode.querySelectorAll(`.animated-text__word`);
  let wordDelay = 0;
  for (const word of words) {
    const letters = word.querySelectorAll(`span`);
    for (const letter of letters) {
      const animation = letter.animate([
        // keyframes
        {transform: `translate3d(0, 0, 0)`}
      ], {
        // timing options
        duration,
        fill: `forwards`,
        delay: Math.random() * 300 + wordDelay + delay
      });
      animationsArray.push(animation)
    }

    wordDelay += wordDelayDiff;
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
