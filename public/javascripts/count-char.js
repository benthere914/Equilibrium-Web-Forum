let textarea = document.getElementById("biography");
let charCount = document.getElementById("charCount");

textarea.addEventListener("keyup", (e) => {
    let count = e.target.value.length;
    charCount.innerText = `${count} / 250`
    tooHigh(count)

})
textarea.addEventListener("keydown", (e) => {
    let count = e.target.value.length;
    charCount.innerText = `${count} / 250`;
    tooHigh(count)
})
let tooHigh = (num) => {
    charCount.style.color = "black"
    if (num > 249){charCount.style.color = "red"}
}
