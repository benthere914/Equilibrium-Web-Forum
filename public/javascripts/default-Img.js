let postImages = document.querySelectorAll("img");
postImages.forEach(e => {e.addEventListener("error", e => {
    e.target.src = "https://t4.ftcdn.net/jpg/00/50/23/71/360_F_50237133_wYPAm4RJaWyziWKjbWtQBCm51XZh6hft.jpg";
})})
