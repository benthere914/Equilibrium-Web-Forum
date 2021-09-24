let deleteText = document.querySelectorAll(".comment-delete");
deleteText.forEach(e => {e.addEventListener("click",(e) => {deleteEle(e)})})

deleteEle = async (e) => {
    try {
        let commentId = e.target.parentElement.previousSibling.value
        let commentDiv = e.target.parentElement.previousSibling.parentElement;
        const res = await fetch(`/comments/${commentId}`, {method: "Delete",});
        if (!res.ok){throw (res)}
        commentDiv.remove()
    } catch (error) {
        return
    }
}

export {deleteEle}
