let editText = document.querySelectorAll(".comment-edit");
editText.forEach(e => {e.addEventListener("click",(e) => {editEle(e)})})

async function editEle(e){
    try {
        let commentId = e.target.parentElement.previousSibling.value;
        let commentDiv = e.target.parentElement.previousSibling.parentElement;
        let commentText = e.target.parentElement.nextSibling;
        let updateDiv = document.createElement('div');
            let updateText = document.createElement('textarea');
                updateText.setAttribute('class', 'edit-comment-text-box')
                updateText.value = commentText.innerText;
                updateText.addEventListener('keydown', (e) => {console.log(e.key);if (e.key === 'Enter'){updateFromEnter(e)}})
            let updateButton = document.createElement('button');
                updateButton.innerText = "Submit"
                updateButton.addEventListener('click', (e) => {updateFromButton(e)})
            let cancelButton = document.createElement('button');
                cancelButton.setAttribute('value', 'Back');
                cancelButton.innerText = "Back"
                cancelButton.addEventListener('click', e => {updateDiv.parentElement.replaceChild(commentText, updateDiv)})
            updateDiv.append(updateText, updateButton, cancelButton)
            function updateFromButton(e){update(e.target.previousSibling.value)}
            function updateFromEnter(e){update(e.target.value)}
        async function update(comment){
            let body = {comment}
            const res = await fetch(`/comments/${commentId}`, {
                method: "Put",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            commentText.innerText = await res.json();
            updateDiv.parentElement.replaceChild(commentText, updateDiv);
        }

        // if (!res.ok){throw (res)}
        commentText.parentElement.replaceChild(updateDiv, commentText)
    } catch (error) {
        console.log(error)
        return
    }
}

export {editEle}
