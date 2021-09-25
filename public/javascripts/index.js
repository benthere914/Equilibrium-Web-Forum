


window.addEventListener("load", async (event) => {
    document.querySelector(".nav-bar").scrollIntoView();

	let current = 50;

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
			let allTopics = document.querySelectorAll(".topics-only .topics");
			allTopics.forEach(topic => {
				topic.classList.add("loggedIn");
			})
			let nodes = [];
			followsTopics.forEach((x) => {
				nodes.push(document.getElementById(`${x}`));
			});
			nodes.forEach((node) => {
				node.classList.add("toggled");
				node.style.order = 1;
			});
			let relevantUrls= [];
			for (let each of followsTopics){
				relevantUrls.push(`relevant-${each.split('-')[1]}`)
			}
				let intiialRelevantNodes = [];
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

				const relevantPosts = document.querySelectorAll(`.${cssId}`);
				relevantPosts.forEach((post) => {
					post.style.order = current;
					current--;
				});

				if (loggedIn) {
					let userId = await getData("/users/userid");
					const body = {
						userId: userId.userId,
						topicId: parseInt(topicId, 10),
					};
					let res = await fetch("/follows/topics", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(body),
					});
				}
			} else if (e.target.classList.contains("toggled")){
				e.target.classList.remove('toggled');
				e.target.style.order = 12;
				if (current < 50) current ++;
			}let cssId = `relevant-${topicId}`;
			const relevantPosts = document.querySelectorAll(`.${cssId}`);
			relevantPosts.forEach((post) => {
				post.style.order = current;
			});

		});
	});
});

let getData = async (url) => {
	const response = await fetch(url);

	return response.json();
}

 let toggle = (element) => {
	element.classList.add("toggled");
};
