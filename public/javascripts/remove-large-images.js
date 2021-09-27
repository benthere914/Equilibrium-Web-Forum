let images = document.querySelectorAll('.recommended ul li img');
let deleteParentDiv = (e) => {
    console.log(e.parentElement.parentElement)
    e.parentElement.parentElement.remove()
}
images.forEach(e => {
    console.log(e.clientWidth, e.clientHeight)
    if (e.clientHeight > 200 || e.clientWidth > 200){deleteParentDiv}})
