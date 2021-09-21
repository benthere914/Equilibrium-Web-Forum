const createPostForm = document.querySelector(".create-post-form");

createPostForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = new FormData(createPostForm);
	const token = formData.get("_csrf");
	const title = formData.get("title");
	const content = formData.get("content");
	const topicId = formData.get("topicId");
    const userId = formData.get("userId");
    const imgUrl = formData.get("imgUrl")

	const body = { userId, topicId, title, content, imgUrl};

	try {
        console.log(imgUrl)
		const res = await fetch("/posts/create", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				"CSRF-Token": token
			},
		});

		if (res.status === 400) {
			throw res;
		}
        const {post} = await res.json();
        window.location.href = `/posts/${post.id}`;
	} catch (err) {
		const errorJSON = await err.json();
		console.log(errorJSON);
		const errorsContainer = document.querySelector(".sign-up-errors-container");
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
