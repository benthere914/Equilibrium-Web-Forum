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
	try {
		const res = await fetch(`/posts/${url}/comments`, {
			method: 'POST',
			body: JSON.stringify(content),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		obj = await res.json();

		if (!res.ok) {throw res;}
	} catch (err) {
		const errorJSON = await err.json();
	}

	let list = document.querySelector('.commentsList');
	let newComment = document.createElement('li');
	let author = document.createElement('h3');
	let commentContent = document.createElement('h3');
	let date = document.createElement('h3');

    obj.date = new Date(obj.date);
    let number;
    let day;
    let month;
    let year = 2021;
    let hour;
    let minutes;
    let format;

    number = Number(obj.date.getDate())
    if (number < 0 || number > 31){day = ""}
    if (number < 10){day =  `0${number}`}
    if (number > 10){day =  number}

    number = Number(obj.date.getMonth())
    if (number < 0 || number > 12){month = ""}
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    month = months[number]

    number = Number(obj.date.getHours())
    if (number < 0 || number > 24){hour = ""}
    if (number < 10){hour =  `0${number}`}
    if (number > 12){hour =  `${Number(number) - 12}`}
    if (number <= 12){hour =  `${Number(number)}`}
    if (number === 24){hour =  `${12}`}


    number = Number(obj.date.getMinutes())
    if (number < 0 || number > 60){minutes = ""}
    if (number < 10){minutes = `0${number}`}
    if (number === 60){minutes = "00"}
    if (number > 10){minutes = `${number}`}

    number = Number(obj.date.getHours())
    if (number < 0 || number > 24){format =  ""}
    if (number <= 11 || number === 24){format =   `AM`}
    if (number >= 12){format =   `PM`}

	author.innerText = obj.author;
	commentContent.innerText = obj.commentContent;
	date.innerText = `${month}, ${day}, ${year}, ${hour}:${minutes} ${format}`;

	newComment.append(author, commentContent, date);
	list.prepend(newComment);
    document.querySelector(".commentTextBox").value = ""
});
