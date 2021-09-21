const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = new FormData(signUpForm);
    const token = formData.get("_csrf")
	const username = formData.get("username");
	const password = formData.get("password");
	const confirmPassword = formData.get("confirmPassword");

	const body = {token, username, password, confirmPassword };
	try {
		const res = await fetch("http://localhost:8080/sign-up", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
        console.log(res);

		if (!res.ok) {
			throw res;
		}
		window.location.href = "/";
	} catch (err) {
		if (err.status >= 400 && err.status < 600) {
			const errorJSON = await err.json();
			const errorsContainer = document.querySelector(".errors-container");
			let errorsHtml = [
				`
        <div class="alert alert-danger">
            Something went wrong. Please try again.
        </div>
      `,
			];
			const { errors } = errorJSON;
			if (errors && Array.isArray(errors)) {
				errorsHtml = errors.map(
					(message) => `
          <div>
              ${message}
          </div>
        `
				);
			}
			errorsContainer.innerHTML = errorsHtml.join("");
		} else {
			alert(
				"Something went wrong. Please check your internet connection and try again!"
			);
		}
	}
});
