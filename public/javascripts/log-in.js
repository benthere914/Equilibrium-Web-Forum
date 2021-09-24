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

		if (!res.ok) {
			throw res;
		}
		window.location.reload();
	} catch (err) {
		const errorJSON = await err.json();
		const errorsContainer = document.querySelector(".log-in-errors-container");

		const { error } = errorJSON;
		let errorsHtml;
		if (error && Array.isArray(error)) {
			errorsHtml = error.map(
				(message) => `
          <li>
              ${message}
          </li>
        `
			);
		}
		errorsHtml.unshift("<ul>");
		errorsHtml.push("</ul>");
		errorsContainer.innerHTML = errorsHtml.join("");
	}
});
