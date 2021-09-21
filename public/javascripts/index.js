window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
    const topics = document.querySelectorAll('.topics').forEach(topic =>{
        topic.addEventListener("click", async(e) => {
            console.log(topic.id);
            const topicId = topic.id.split('-')[1];
            console.log(document.cookie)
            if (!e.target.classList.contains('toggled')){
                toggle(e.target);
                e.target.style.order = 1;
                    await fetch("/")

            }


        })
    })
})


function toggle(element) {
    element.classList.add('toggled');
}
