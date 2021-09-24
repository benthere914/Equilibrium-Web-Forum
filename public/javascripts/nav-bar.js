let loggedIn = false;
async function getData(url) {
	const response = await fetch(url);

	return response.json();
}
window.addEventListener('load', async (ev) => {
    try{
        let userId = await getData('/users/userid');
        userId = userId.userId;

        if(typeof userId === "number"){
            loggedIn = true;
        }
    }catch (e){
    }


});




if (!loggedIn){
const signUpModalTrigger = document.querySelector(".sign-up-modal-trigger");
const signUpModal = document.querySelector(".sign-up-modal");
const logInModalTrigger = document.querySelector(".log-in-modal-trigger");
const logInModal = document.querySelector(".log-in-modal");
const mainBody = document.querySelector(".body-encapsulation");

function toggleSignUpModal() {
    signUpModal.classList.toggle("show-modal");
}

function toggleLogInModal() {
	logInModal.classList.toggle("show-modal");
}

function toggleBlur() {
    mainBody.classList.toggle("blur");
}


signUpModalTrigger.addEventListener("click", ev => {
    toggleSignUpModal();
    toggleBlur();
    mainBody.addEventListener("click", ev => {
        ev.preventDefault();
        toggleSignUpModal();
		toggleBlur();
    }, {once:true});
});

logInModalTrigger.addEventListener("click", (ev) => {
	toggleLogInModal();
    toggleBlur();
    mainBody.addEventListener("click", ev => {
        ev.preventDefault();
        toggleLogInModal();
		toggleBlur();
    }, {once:true})
});


}
