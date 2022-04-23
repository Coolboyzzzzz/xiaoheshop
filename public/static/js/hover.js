window.onload = function () {
    var dom = document.getElementsByClassName('el-collapse-item__header')
console.log(dom)
for (let i = 0; i < dom.length; i++) {
    console.log(1)
    dom[i].addEventListener("mouseover", () => {
        dom[i].click()
    })
}
}

