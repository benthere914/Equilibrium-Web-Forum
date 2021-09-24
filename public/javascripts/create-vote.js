const upvoteButton = document.querySelector(".upvote-button");
const downvoteButton = document.querySelector(".downvote-button");
const submitVote = document.querySelector(".submit-vote");
const voteTotal = document.querySelector(".vote-total");

upvoteButton.addEventListener("click", async (e) => {
	const formData = new FormData(submitVote);
	const postId = formData.get("postId");
	const userId = formData.get("userId");
	const vote = 1;
	const body = { userId, vote };

	if (userId === "null") {
		alert("Please log in to do that.");
	} else {
		try {
			const res = await fetch(`/posts/${postId}/votes`, {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});
			if (res.status === 400) {
				throw res;
			}
			let { currentVoteTotal, userVoteStatus } = await res.json();
			if (userVoteStatus === 0) {
				upvoteButton.classList.remove("increment-active");
				upvoteButton.classList.add("increment");
			} else if (userVoteStatus === 1) {
				upvoteButton.classList.remove("increment");
				upvoteButton.classList.add("increment-active");
				downvoteButton.classList.remove("increment-active");
				downvoteButton.classList.add("increment");
			} else if (userVoteStatus === -1) {
				upvoteButton.classList.remove("increment-active");
				upvoteButton.classList.add("increment");
			}

			voteTotal.innerHTML = currentVoteTotal;
		} catch (err) {
		}
	}
});

downvoteButton.addEventListener("click", async (e) => {
	e.preventDefault();
	const formData = new FormData(submitVote);
	const postId = formData.get("postId");
	const userId = formData.get("userId");
	const vote = -1;
	const body = { userId, vote };

	if (userId === "null") {
		alert("Please log in to do that.");
	} else {
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
			let { currentVoteTotal, userVoteStatus } = await res.json();
			if (userVoteStatus === 0) {
				downvoteButton.classList.remove("increment-active");
				downvoteButton.classList.add("increment");
			} else if (userVoteStatus === 1) {
				downvoteButton.classList.remove("increment-active");
				downvoteButton.classList.add("increment");
			} else if (userVoteStatus === -1) {
				downvoteButton.classList.remove("increment");
				downvoteButton.classList.add("increment-active");
				upvoteButton.classList.remove("increment-active");
				upvoteButton.classList.add("increment");
			}
			voteTotal.innerHTML = currentVoteTotal;
		} catch (err) {
		}
	}
});
