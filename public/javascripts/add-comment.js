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
    let textBox = document.querySelector(".commentTextBox");
    console.log(String(content.comment).trim().length)
    if (!content.comment || !String(content.comment).trim().length){textBox.setAttribute("placeholder", "Invalid Comment");textBox.value= ""; return}
    textBox.removeAttribute("placeholder");
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
	let newComment = document.createElement('div');
	newComment.classList.add("comment-container");
	let author = document.createElement('p');
	author.classList.add("comment-username");
	let commentContent = document.createElement('p');
	commentContent.classList.add("comment-content");
	let date = document.createElement('p');
	date.classList.add("comment-date");
    let topContent = document.createElement("div");
    topContent.classList.add("top-of-comment");
    let editText = document.createElement("p");
    editText.classList.add("comment-edit");
    editText.innerText = "Edit"
    let deleteText = document.createElement("p");
    deleteText.classList.add("comment-delete")
    deleteText.innerText = "Delete"

    obj.date = new Date(obj.date);
    let month = convertTime(obj.date.getMonth(), 'month');
    let year = convertTime(obj.date.getYear(), 'year');
    let day = convertTime(obj.date.getDate(), 'date');
    let hour = convertTime(obj.date.getHours(), 'hours');
    let minutes = convertTime(obj.date.getMinutes(), 'minutes');
    let format = convertTime(obj.date.getHours(), 'format');

	author.innerText = obj.author;
	commentContent.innerText = obj.commentContent;
	date.innerText = `${month}, ${day}, ${year}, ${hour}:${minutes} ${format}`;
    topContent.append(author, editText, deleteText)
	newComment.append(topContent, commentContent, date);
	list.prepend(newComment);
    document.querySelector(".commentTextBox").value = ""
});
