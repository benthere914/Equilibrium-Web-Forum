import { convertTime } from "./utils.js";


const logInModal = document.querySelector(".log-in-modal");
const mainBody = document.querySelector(".body-encapsulation");

let toggleLogInModal = () => {
	logInModal.classList.toggle("show-modal");
}

let toggleBlur = () => {
	mainBody.classList.toggle("blur");
}


import { deleteEle } from "./delete-comment.js";
import { editEle } from "./edit-comment.js";

const addComment = document.querySelector('.add-comment-form');
addComment.addEventListener('submit', async (e) => {

	e.preventDefault();
	const formData = new FormData(addComment);
	const comment = formData.get('comment');
	const userId = formData.get("userId");
	if (userId === "null"){
		toggleLogInModal();
		toggleBlur();
	} else {
	const content = { comment };
	let obj;
    let id;
    let url = window.location.href;
    url = url.split("/");

    url = url[url.length - 1];

    let textBox = document.querySelector(".commentTextBox");
    try {
        let userIdResponse = await fetch('/users/userid');
        let userId = await userIdResponse.json();
        if (!userId.userId){textBox.value = "";alert("You must be logged in to comment"); throw new Error("You must be logged in to comment")}
    } catch (error) {
        return error
    }
    if (!content.comment || !String(content.comment).trim().length){textBox.setAttribute("placeholder", "Invalid Comment");textBox.value= ""; return}

    textBox.removeAttribute("placeholder");

	try {
		const res = await fetch(`/posts/${url}/comments`, {
			method: 'POST',
			body: JSON.stringify(content),
			headers: {'Content-Type': 'application/json',},
		});
		obj = await res.json();
        const response = await fetch(`/comments/latest`);
		id = await response.json();
		if (!res.ok || !response.ok) {throw res;}
	} catch (err) {
		const errorJSON = await err.json();
        textBox.setAttribute("placeholder", "Commenting not available"); textBox.value = "";return
	}

	let list = document.querySelector('.commentsList');
	let newComment = document.createElement('div');
	let author = document.createElement('p');
	let commentContent = document.createElement('p');
	let date = document.createElement('p');
    let topContent = document.createElement("div");
    let editText = document.createElement("p");
    let deleteText = document.createElement("p");
    let commentId = document.createElement("input");
	newComment.classList.add("comment-container");
	author.classList.add("comment-username");
	commentContent.classList.add("comment-content");
	date.classList.add("comment-date");
    topContent.classList.add("top-of-comment");
    editText.classList.add("comment-edit");
    editText.innerText = "Edit"
    deleteText.classList.add("comment-delete")
    deleteText.innerText = "Delete"
    commentId.setAttribute("type", "hidden");
    commentId.setAttribute("value", id)

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
	newComment.append(commentId, topContent, commentContent, date);
	list.prepend(newComment);
    newComment.firstChild.nextSibling.firstChild.nextSibling.nextSibling.addEventListener("click", (e) => {deleteEle(e)})
    newComment.firstChild.nextSibling.firstChild.nextSibling.addEventListener("click", (e) => {editEle(e)})
    document.querySelector(".commentTextBox").value = ""

}});
