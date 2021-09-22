import { convertTime } from "./utils.js";
const addComment = document.querySelector('.add-comment-form');
addComment.addEventListener('submit', async (e) => {
	e.preventDefault();
	const formData = new FormData(addComment);
	const comment = formData.get('comment');
	const content = { comment };
	let obj;
    let url = window.location.href;
    url = url.split("/");
    url = url[url.length - 1]
    console.log(url, content)
	try {
		const res = await fetch(`/posts/${url}/comments`, {
			method: 'POST',
			body: JSON.stringify(content),
			headers: {'Content-Type': 'application/json',},
		});
		obj = await res.json();
		if (!res.ok) {throw res;}
	} catch (err) {
		const errorJSON = await err.json();
	}

	let list = document.querySelector('.commentsList');
	let newComment = document.createElement('li');
	let author = document.createElement('h3');
	let commentContent = document.createElement('h3');
	let date = document.createElement('h3');

    obj.date = new Date(obj.date);
    let month = convertTime(obj.date.getMonth(), 'month');
    let year = convertTime(obj.date.getYear(), 'year');
    let day = convertTime(obj.date.getDate(), 'date');
    let hour = convertTime(obj.date.getHours(), 'hours');
    let minutes = convertTime(obj.date.getMinutes(), 'minutes');
    let format = convertTime(obj.date.getHours(), 'hours');

	author.innerText = obj.author;
	commentContent.innerText = obj.commentContent;
	date.innerText = `${month}, ${day}, ${year}, ${hour}:${minutes} ${format}`;

	newComment.append(author, commentContent, date);
	list.prepend(newComment);
    document.querySelector(".commentTextBox").value = ""
});
