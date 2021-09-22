const addComment = document.querySelector('.add-comment-form');

addComment.addEventListener('submit', async (e) => {
	e.preventDefault();
	const formData = new FormData(addComment);
	const comment = formData.get('comment');
	const content = { comment };
	let obj;
	try {
		const res = await fetch(`/posts/${2}/comments`, {
			method: 'POST',
			body: JSON.stringify(content),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		obj = await res.json();
        console.log(obj)

		if (!res.ok) {
			throw res;
		}
	} catch (err) {
		const errorJSON = await err.json();
		console.log(errorJSON);
	}

	let list = document.querySelector('.commentsList');
	let newComment = document.createElement('li');
	let author = document.createElement('h3');
	let commentContent = document.createElement('h3');
	let date = document.createElement('h3');
	author.innerText = obj.author;
	commentContent.innerText = obj.commentContent;
	date.innerText = obj.date;
	newComment.append(author, commentContent, date);
	list.prepend(newComment);
	console.log(list);
    document.querySelector(".commentTextBox").value = ""
});
