const topics = document.querySelectorAll('.topics').forEach(topic =>{
  topic.addEventListener("click", async(e) => {
      let topicToDelete = e.target;
      let topicId = e.target.id.split('-')[1];

      try{
         let deleted = await fetch(`/topics/${topicId}`, {
          method: "DELETE"
        });
        if (!deleted.ok){
          throw deleted;
        }
      }catch(e){
      }
      topicToDelete.remove();
    })
  })
