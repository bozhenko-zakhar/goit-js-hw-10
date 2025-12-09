// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const snackBarForm = document.querySelector(".form");
const dalayInput = snackBarForm.elements.delay;
const fieldset = snackBarForm.querySelector("fieldset");

const toastOptions = {
	timeout: 3000,
	messageColor: "white",
	position: 'topRight',
	minWidth: '700px',
	progressBar: false,
	close: false,
	icon: false,
	transitionIn: "fadeIn",
	animateInside: false
};

snackBarForm.addEventListener("submit", e => {
	e.preventDefault();
	
	const promiseOptions = {};

	for (const radio of fieldset.elements) {
		if (radio.checked) {
			promiseOptions.state = radio.value;
			promiseOptions.delay = dalayInput.value;
			snackBarForm.reset();
			break
		}
	}

	handleSnackBarPromise(promiseOptions);
});
	

function handleSnackBarPromise(options) {
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (options.state === "fulfilled") {
				resolve(options.delay)
			} else {
				reject(options.delay)
			}
		}, options.delay);
	});

	promise.then(value => {
		iziToast.success({...toastOptions,
			message: `✅ Fulfilled promise in ${value}ms`,
			backgroundColor: "#59A10D"
		});
	}).catch(error => {
		iziToast.error({...toastOptions,
			message: `❌ Rejected promise in ${error}ms`,
			backgroundColor: "#EF4040"
		});
	});
}