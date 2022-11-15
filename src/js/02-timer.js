import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataTimeInputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
startBtnEl.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtnEl.disabled = true;
    } else {
      startBtnEl.disabled = false;
    }
  },
};

flatpickr(dataTimeInputEl, options);

const timer = {
  timerDeadline: null,
  intervalId: null,
  rootSelector: document.querySelector('.timer'),

  start() {
    this.intervalId = setInterval(() => {
      const diff = this.timerDeadline - Date.now();
      if (diff <= 0) {
        this.stop();
        return;
      }
      console.log(diff);
      const { days, hours, minutes, seconds } = this.getTimeComponents(diff);
      this.rootSelector.querySelector('span[data-days]').textContent = this.pad(days);
      this.rootSelector.querySelector('span[data-hours]').textContent = this.pad(hours);
      this.rootSelector.querySelector('span[data-minutes]').textContent = this.pad(minutes);
      this.rootSelector.querySelector('span[data-seconds]').textContent = this.pad(seconds);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
  },

  getTimeComponents(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },
  pad(value) {
    return String(value).padStart(2, 0);
  },
};

const onStartBtnClick = event => {
  timer.start();
};

const getUserDeadline = event => {
  timer.timerDeadline = Date.parse(event.target.value);
};

dataTimeInputEl.addEventListener('input', getUserDeadline);
startBtnEl.addEventListener('click', onStartBtnClick);