
const signUpModalTrigger = document.querySelector(".sign-up-modal-trigger");
const signUpModal = document.querySelector(".sign-up-modal");
const logInModalTrigger = document.querySelector(".log-in-modal-trigger");
const logInModal = document.querySelector(".log-in-modal");
const closeSignUpModal = document.querySelector(".close-sign-up-modal");
const closeLogInModal = document.querySelector(".close-log-in-modal");

function toggleSignUpModal() {
    signUpModal.classList.toggle("show-modal");
}

function toggleLogInModal() {
	logInModal.classList.toggle("show-modal");
}

signUpModalTrigger.addEventListener("click", ev => {
    ev.preventDefault();
    toggleSignUpModal();
});

logInModalTrigger.addEventListener("click", (ev) => {
    ev.preventDefault();
	toggleLogInModal();
});

closeSignUpModal.addEventListener("click", toggleSignUpModal);
closeLogInModal.addEventListener("click", toggleLogInModal);
