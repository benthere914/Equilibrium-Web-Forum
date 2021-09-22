const upvoteButton = document.querySelector(".upvote-button");
const downvoteButton = document.querySelector(".downvote-button");
const submitVote = document.querySelector(".submit-vote");
const voteTotal = document.querySelector(".vote-total");

upvoteButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(submitVote);
	const postId = formData.get("postId");
    const userId = formData.get("userId")
    const vote = 1;
    const body = { userId, vote };
    try {
        const res = await fetch(`/posts/${postId}/votes`, {
					method: "POST",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
				});
				if (res.status === 400) {
					throw res;
				}
				const { voteTotal: newVotes } = await res.json();
				voteTotal.innerHTML = newVotes;
    } catch (err) {
        console.log(err);
    }
});

downvoteButton.addEventListener("click", async (e) => {
    e.preventDefault();
	const formData = new FormData(submitVote);
	const postId = formData.get("postId");
    const userId = formData.get("userId")
	const vote = -1;
	const body = { userId, vote };
	try {
        const res = await fetch(`/posts/${postId}/votes`, {
					method: "POST",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (res.status === 400) {
					throw res;
				}
				const { voteTotal: newVotes } = await res.json();
				voteTotal.innerHTML = newVotes;
	} catch (err) {
        console.log(err)

	}
});
