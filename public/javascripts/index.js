window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
    const topics = document.querySelectorAll('.topics').forEach(topic =>{
        topic.addEventListener("click", (e) => {
            console.log(topic.id);
            const topicId = topic.id.split('-')[1];
            console.log(document.cookie)
            if (!e.target.classList.contains('toggled')){
                toggle(e.target);
                e.target.style.order = 1;
                let userId;
                fetch("/users/userid").then(response => response.json()).then(data => userId = data);
                if (!userId){
                    console.log("hi")
                    let topicsWithId;
                    fetch(`/topics/${topicId}`).then(res => res.json()).then(data=> topicsWithId = data);
                    console.log(topicsWithId);

                }


            }


        })
    })
})


function toggle(element) {
    element.classList.add('toggled');
}
