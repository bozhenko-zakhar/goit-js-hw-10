// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const snackBarForm = document.querySelector(".form");
const dalayInput = snackBarForm.elements.delay;
const promiseOptions = {
	delay: 0, state: null
};
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
}

dalayInput.addEventListener("input", () => {
	promiseOptions.delay = dalayInput.value;
})

snackBarForm.addEventListener("change", e => {
	if (e.target.name !== "state") return

	promiseOptions.state = e.target.value;
})

snackBarForm.addEventListener("submit", e => {
	e.preventDefault();

	const promise = makeSnackBarPromise(promiseOptions);

	promise.then(value => {
		iziToast.success(value)
	}).catch(error => {
		iziToast.error(error)
	})
})

function makeSnackBarPromise(options) {
	return new Promise((resolve, reject) => {

		if (options.state === "fulfilled") {
			setTimeout(() => {
				resolve({...toastOptions,
					message: `✅ Fulfilled promise in ${options.delay}ms`,
					backgroundColor: "#59A10D",
				})
		}, options.delay)
			} else {
				setTimeout(() => {
					reject({...toastOptions,
						message: `❌ Rejected promise in ${options.delay}ms`,
						backgroundColor: "#EF4040",
					})
				}, options.delay)
			}
	})
}
