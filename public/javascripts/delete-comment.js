let deleteText = document.querySelectorAll(".comment-delete")

const res = await fetch("/posts/comments/delete", {
    method: "Delete",
    body: JSON.stringify(body),
    headers: {
        "Content-Type": "application/json",
        
    },
});
