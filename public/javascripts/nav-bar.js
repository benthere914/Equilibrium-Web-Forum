let getData = async (url) => {
	const response = await fetch(url);

	return response.json();
};

let loggedIn = false;
getData = async (url) => {
	const response = await fetch(url);
	return response.json();
};
window.addEventListener("load", async (ev) => {
	try {
		let userId = await getData("/users/userid");
		userId = userId.userId;
		if (typeof userId === "number") {
			loggedIn = true;
		}
	} catch (e) {}
});

if (!loggedIn) {
	const signUpModalTrigger = document.querySelector(".sign-up-modal-trigger");
	const signUpModal = document.querySelector(".sign-up-modal");
	const logInModalTrigger = document.querySelector(".log-in-modal-trigger");
	const logInModal = document.querySelector(".log-in-modal");
	const mainBody = document.querySelector(".body-encapsulation");

	const toggleSignUpModal = () => {
		signUpModal.classList.toggle("show-modal");
		logInModal.classList.remove("show-modal");
	};

	const toggleLogInModal = () => {
		logInModal.classList.toggle("show-modal");
		signUpModal.classList.remove("show-modal");
	};

	const toggleBlur = () => {
		mainBody.classList.toggle("blur");
	};

	signUpModalTrigger.addEventListener("click", (ev) => {
		if (logInModal.classList.contains("show-modal")) {
			toggleSignUpModal();
		} else {
			toggleSignUpModal();
			toggleBlur();
			mainBody.addEventListener(
				"click",
				(ev) => {
					ev.preventDefault();
					signUpModal.classList.remove("show-modal");
					logInModal.classList.remove("show-modal");
					toggleBlur();
				},
				{ once: true }
			);
		}
	});

	logInModalTrigger.addEventListener("click", (ev) => {
		if (signUpModal.classList.contains("show-modal")) {
			toggleLogInModal();
		} else {
			toggleLogInModal();
			toggleBlur();
			mainBody.addEventListener(
				"click",
				(ev) => {
					ev.preventDefault();
					signUpModal.classList.remove("show-modal");
					logInModal.classList.remove("show-modal");
					toggleBlur();
				},
				{ once: true }
			);
		}
	});
}
