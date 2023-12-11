import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      buttonStart.setAttribute('disabled', true);
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startDate = selectedDates[0];
      buttonStart.removeAttribute('disabled', true);
    }
  },
};

const selector = document.querySelector('input#datetime-picker');
let startDate;
const buttonStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

buttonStart.setAttribute('disabled', true);
flatpickr(selector, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function updateTime() {
  const currentTime = startDate - new Date();
  const time = convertMs(currentTime);

  if (time.seconds >= 0) {
    days.textContent = addLeadingZero(String(time.days));
    hours.textContent = addLeadingZero(String(time.hours));
    minutes.textContent = addLeadingZero(String(time.minutes));
    seconds.textContent = addLeadingZero(String(time.seconds));
    setTimeout(updateTime, 1000);
  }
}

buttonStart.addEventListener('click', () => {
  setTimeout(updateTime, 1000);
});
