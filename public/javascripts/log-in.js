const logInForm = document.querySelector(".log-in-form");

logInForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = new FormData(logInForm);
	const token = formData.get("_csrf");
	const username = formData.get("username");
	const password = formData.get("password");

	const body = { username, password };
	try {
		const res = await fetch("/log-in", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				"CSRF-Token": token,
			},
		});

		if (res.status === 400) {
			throw res;
		}
		window.location.href = "/";
	} catch (err) {
		const errorJSON = await err.json();
		const errorsContainer = document.querySelector(".log-in-errors-container");
		let errorsHtml = [
			`
        <div>
            Please fix the following errors:
        </div>
      `,
		];
		const { error } = errorJSON;
		console.log(error);
		if (error && Array.isArray(error)) {
			errorsHtml = error.map(
				(message) => `
          <div class="err_msg">
              ${message}
          </div>
        `
			);
		}
		errorsContainer.innerHTML = errorsHtml.join("");
	}
});
