const createPostForm = document.querySelector(".create-post-form");

createPostForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = new FormData(createPostForm);
	const token = formData.get("_csrf");
	const title = formData.get("title");
	const content = formData.get("content");
	const topicId = formData.get("topicId");
    const userId = formData.get("userId");
    const imgUrl = formData.get("imgUrl");

	const body = { userId, topicId, title, content, imgUrl};

	try {
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
		console.log(errorJSON)
	}
});
