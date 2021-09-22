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
    const postId = formData.get("postId");

	const body = { userId, topicId, title, content, imgUrl};

	try {
        console.log(imgUrl)
		const res = await fetch(`/posts/${postId}/edit`, {
			method: "PUT",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				"CSRF-Token": token
			},
		});

		if (!res.ok) {
			throw res;
		}
        window.location.href = `/posts/${postId}`;
	} catch (err) {
		console.log(err)
	}
});
