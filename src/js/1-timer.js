import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const elements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let countdownInterval = null;
const startButton = document.getElementById('start-button')
const datetimePicker = document.getElementById('datetime-picker');



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < now) {
      iziToast.error({
        title: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
      userSelectedDate = null;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);


const updateTimer = () => {
   if (!userSelectedDate) return;
  const now = new Date();
  const timeRemaining = userSelectedDate - now;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    resetTimerDisplay();
    return;
  }
  const timeComponents = convertMs(timeRemaining);
  elements.days.textContent = addLeadingZero(timeComponents.days);
  elements.hours.textContent = addLeadingZero(timeComponents.hours);
  elements.minutes.textContent = addLeadingZero(timeComponents.minutes);
  elements.seconds.textContent = addLeadingZero(timeComponents.seconds);
}

function resetTimerDisplay() {
  elements.days.textContent = '00';
  elements.hours.textContent = '00';
  elements.minutes.textContent = '00';
  elements.seconds.textContent = '00';
}

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
  return value.toString().padStart(2, '0')
}
 
  
startButton.addEventListener('click', () => {
   if (!userSelectedDate) return;

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  countdownInterval = setInterval(updateTimer, 1000);
})


