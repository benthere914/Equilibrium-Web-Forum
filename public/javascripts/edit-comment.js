import {convertTime} from './utils.js'
let editText = document.querySelectorAll(".comment-edit");
editText.forEach(e => {e.addEventListener("click",(e) => {editEle(e)})})

 editEle = async (e) => {
    try {
        let commentId = e.target.parentElement.previousSibling.value;
        let commentDiv = e.target.parentElement.previousSibling.parentElement;
        let commentText = e.target.parentElement.nextSibling;
        let updateDiv = document.createElement('div');
        let updateText = document.createElement('textarea');
        let updateButton = document.createElement('button');
        let cancelButton = document.createElement('button');
        updateText.setAttribute('class', 'edit-comment-text-box')
        updateText.value = commentText.innerText;
        updateText.addEventListener('keydown', (e) => {if (e.key === 'Enter'){updateFromEnter(e)}})
        updateButton.innerText = "Submit"
        updateButton.addEventListener('click', (e) => {updateFromButton(e)})
        cancelButton.setAttribute('value', 'Back');
        cancelButton.innerText = "Back"
        cancelButton.addEventListener('click', e => {updateDiv.parentElement.replaceChild(commentText, updateDiv)})
        updateDiv.append(updateText, updateButton, cancelButton)
         updateFromButton = (e) => {update(e.target.previousSibling.value)}
         updateFromEnter = (e) => {update(e.target.value)}
         update = async (comment) => {
            let body = {comment}
            const res = await fetch(`/comments/${commentId}`, {
                method: "Put",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let {newCommentText, date, err} = await res.json();
            if (err){throw new Error('Permission Denied');}
            commentText.innerText = newCommentText;
            updateDiv.parentElement.replaceChild(commentText, updateDiv);
            date = new Date(date);
            let month = convertTime(date.getMonth(), 'month');
            let year = convertTime(date.getYear(), 'year');
            let day = convertTime(date.getDate(), 'date');
            let hour = convertTime(date.getHours(), 'hours');
            let minutes = convertTime(date.getMinutes(), 'minutes');
            let format = convertTime(date.getHours(), 'format');
            commentDiv.lastChild.innerText = `${month}, ${day}, ${year}, ${hour}:${minutes} ${format}`;
        }


        commentText.parentElement.replaceChild(updateDiv, commentText)
    } catch (error) {
        return
    }
}

export {editEle}
