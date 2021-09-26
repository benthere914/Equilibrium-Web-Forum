const signUpForm = document.querySelector(".sign-up-form");


signUpForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = new FormData(signUpForm);
	const token = formData.get("_csrf");
	const username = formData.get("username");
	const password = formData.get("password");
	const confirmPassword = formData.get("confirmPassword");

	const body = { username, password, confirmPassword };

	try {
		const res = await fetch("/sign-up", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				"CSRF-Token": token,
				Accept: "application/json",
			},
		});
        let response = await res.json();
        let {error, message} = response;
        if (message){window.location.reload();}
        if (error){
            const errorsContainer = document.querySelector(".sign-up-errors-container");
            let errorsHtml;
            if (error && Array.isArray(error)) {errorsHtml = error.map((message) => `<li>${message}</li>`);}
           		errorsHtml.unshift(`<ul class="err_msg">`);
		        errorsHtml.push("</ul>");
            setTimeout(() => {
                errorsContainer.innerHTML = errorsHtml.join("");
                document.querySelector('.userNameTextBoxSignUp').value = "";
                document.querySelector('.passwordTextBoxSignUp').value = "";
                document.querySelector('.confirmPasswordTextBoxSignUp').value = "";
            }, 200)

        }
	} catch (err) {
	}
});
