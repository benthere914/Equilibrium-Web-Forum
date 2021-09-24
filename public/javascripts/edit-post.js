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
	}
});

const deleteButton = document.querySelector('#delete-post-button');

deleteButton.addEventListener('click', async (e)=> {
	e.preventDefault();
	let url = window.location.href;

	let urlSplit = url.split("/");
	let postId = urlSplit[urlSplit.length-2];

	let confirmed = confirm(`Are you sure you want to delete?`);
	if (confirmed) {
		try{
			fetch(`/posts/${postId}/delete`, {
				 method: "DELETE",

		 }).then(res => res.json())

		 if(!res.ok){
			 throw res;
		 }
		}catch(e){
		}
		window.location.href = "/";
	}
})
