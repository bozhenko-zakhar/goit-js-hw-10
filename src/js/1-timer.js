// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector("#datetime-picker");
const startButton = document.querySelector("button");
const dataDays = document.querySelector("span[data-days]");
const dataHours = document.querySelector("span[data-hours]");
const dataMinutes = document.querySelector("span[data-minutes]");
const dataSeconds = document.querySelector("span[data-seconds]");
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onCloseHandler(selectedDates[0]);
  },
};

function onCloseHandler(selectedDate) {
	const options = {
			timeout: 3000,
			messageColor: "white",
			position: 'topRight',
			progressBar: false,
			close: false,
			transitionIn: "fadeIn",
			animateInside: false
	}
	
	if (selectedDate.getTime() <= Date.now()) {
		iziToast.error({...options,
    	message: 'Please choose a date in the future',
			backgroundColor: "#EF4040",
		});

		startButton.disabled = true;

		return
	}

	userSelectedDate = selectedDate.getTime();
	startButton.disabled = false;
}

function onStartHandler() {
	startButton.disabled = true;
	dateInput.disabled = true;

	const intervalId = setInterval(() => {
		if (userSelectedDate <= Date.now()) {
			clearInterval(intervalId);
			startButton.disabled = false;
			dateInput.disabled = false;
			return
		}

		dataDays.textContent = addLeadingZero(convertMs(userSelectedDate - Date.now()).days);
		dataHours.textContent = addLeadingZero(convertMs(userSelectedDate - Date.now()).hours);
		dataMinutes.textContent = addLeadingZero(convertMs(userSelectedDate - Date.now()).minutes);
		dataSeconds.textContent = addLeadingZero(convertMs(userSelectedDate - Date.now()).seconds);
	}, 1000);
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
	return value.toString().padStart(2, "0")
}

flatpickr("#datetime-picker", options);
startButton.addEventListener("click", onStartHandler)