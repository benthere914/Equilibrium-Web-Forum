window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
    const topics = document.querySelectorAll('.topics').forEach(topic =>{
        topic.addEventListener("click", async(e) => {
            const topicId = topic.id.split('-')[1];
            if (!e.target.classList.contains('toggled')){
                toggle(e.target);
                e.target.style.order = 1;
                try{
                    let userId =  await getData('/users/userid');
                    userId = userId.userId;
                    console.log('You are signed In');
                }catch(err){
                    let cssId = `relevant-${topicId}`;
                    console.log(cssId);
                   const relevantPosts = document.querySelectorAll(`.${cssId}`);
                   relevantPosts.forEach(post => {
                       post.style.order = 1;
                   })
                //    relevantPosts.forEach(post => console.log());
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
