function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
let timerId = null;

startBtnEl.addEventListener('click', () => {
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;
  document.body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000)
})

stopBtnEl.addEventListener('click', () => {
  clearInterval(timerId);
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
})