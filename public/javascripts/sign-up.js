const signUpForm = document.querySelector(".sign-up-form");
const startWritingForm = document.querySelector(".start-writing-form");

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

		if (res.status === 400) {
			throw res;
		}

		window.location.reload();
	} catch (err) {
		const errorJSON = await err.json();
		console.log(errorJSON);
		const errorsContainer = document.querySelector(".sign-up-errors-container");
		let errorsHtml;
		const { error } = errorJSON;
		console.log(error);
		if (error && Array.isArray(error)) {
			errorsHtml = error.map(
				(message) => `
          <li>
              ${message}
          </li>
        `
			);
		}
		errorsHtml.unshift(`<ul class="err_msg">`);
		errorsHtml.push("</ul>");
		errorsContainer.innerHTML = errorsHtml.join("");
	}
});


