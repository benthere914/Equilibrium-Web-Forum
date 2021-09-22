window.addEventListener("load", async (event)=>{
    console.log("hello from javascript!");
    let current = 8;

    let loggedIn = false;
    try{
        let userId = await getData('/users/userid');
        userId = userId.userId;
        loggedIn = true;
        if(userId){
            let followsTopics = await getData(`follows/topics/${userId}`);
            followsTopics = followsTopics.map(each => {return `topic-${each.topicId}`});

            let nodes = [];
            followsTopics.forEach(x => {nodes.push(document.getElementById(`${x}`))});
            nodes.forEach(node => {node.classList.add('toggled'); node.style.order = current});
        }

    }catch(e){

    }
    console.log(loggedIn);
    const topics = document.querySelectorAll('.topics').forEach(topic =>{
        topic.addEventListener("click", async(e) => {
            const topicId = topic.id.split('-')[1];
            if (!e.target.classList.contains('toggled')){
                toggle(e.target);
                e.target.style.order = 1;
                let cssId = `relevant-${topicId}`;
                const relevantPosts = document.querySelectorAll(`.${cssId}`);
                relevantPosts.forEach(post => {
                    post.style.order = current;
                    current--;
                })

                if (loggedIn){
                    const body = { userId, topicId: parseInt(topicId, 10)};
                    console.log(body);
                    //this line creates a follow between a user and a topic
                    let res = await fetch('/follows/topics', {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(body)
                    });
                }

            }
        })
    })
});

async function getData(url) {
    const response = await fetch(url);

    return response.json();
  }

function toggle(element) {
    element.classList.add('toggled');
}
