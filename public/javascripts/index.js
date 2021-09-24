


window.addEventListener("load", async (event) => {
    document.querySelector(".nav-bar").scrollIntoView();

	let current = 12;

	let loggedIn = false;
	try {
		let userId = await getData("/users/userid");
		userId = userId.userId;

		if (typeof userId === "number") {
			loggedIn = true;

			let followsTopics = await getData(`follows/topics/${userId}`);
			followsTopics = followsTopics.map((each) => {
				return `topic-${each.topicId}`;
			});

			let nodes = [];
			followsTopics.forEach((x) => {
				nodes.push(document.getElementById(`${x}`));
			});
			nodes.forEach((node) => {
				node.classList.add("toggled");
				node.style.order = current - 1;
			});
			let relevantUrls= [];
			for (let each of followsTopics){
				relevantUrls.push(`relevant-${each.split('-')[1]}`)
			}
				let intiialRelevantNodes = [];
				console.log(relevantUrls)
			for (let i = 0; i < relevantUrls.length; i++){
				let posts = document.querySelectorAll(`.${relevantUrls[i]}`);
				if (posts.length){
					posts.forEach(post => post.style.order = current -1);
				}
			}
		}
	} catch (e) {}

	const topics = document.querySelectorAll(".topics").forEach((topic) => {
		topic.addEventListener("click", async (e) => {
			const topicId = topic.id.split("-")[1];
			if (!e.target.classList.contains("toggled")) {
				toggle(e.target);
				e.target.style.order = 1;
				let cssId = `relevant-${topicId}`;
				current--;
				const relevantPosts = document.querySelectorAll(`.${cssId}`);
				relevantPosts.forEach((post) => {
					post.style.order = current;
				});

				if (loggedIn) {
					let userId = await getData("/users/userid");
					const body = {
						userId: userId.userId,
						topicId: parseInt(topicId, 10),
					};
					console.log(body);
					//this line creates a follow between a user and a topic
					let res = await fetch("/follows/topics", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(body),
					});
				}
			} else if (e.target.classList.contains("toggled")){
				e.target.classList.remove('toggled');
				e.target.style.order = 12;
				if (current < 12) current ++;
			}let cssId = `relevant-${topicId}`;
			const relevantPosts = document.querySelectorAll(`.${cssId}`);
			relevantPosts.forEach((post) => {
				post.style.order = current;
			});

		});
	});
});

async function getData(url) {
	const response = await fetch(url);

	return response.json();
}

function toggle(element) {
	element.classList.add("toggled");
}
;
