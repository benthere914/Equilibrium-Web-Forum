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
        let response = await res.json();
        let {error, message} = response;
        if (message){window.location.reload();}
        if (error){
            const errorsContainer = document.querySelector(".log-in-errors-container");
            let errorsHtml;
            if (error && Array.isArray(error)) {errorsHtml = error.map((message) => `<li>${message}</li>`);}
            errorsHtml.unshift("<ul>");
            errorsHtml.push("</ul>");
            setTimeout(() => {
                errorsContainer.innerHTML = errorsHtml.join("");
                document.querySelector('.userNameTextBoxLogIn').value = "";
                document.querySelector('.passwordTextBoxLogIn').value = "";
            }, 250)
        }
	} catch (err) {
	}
});
