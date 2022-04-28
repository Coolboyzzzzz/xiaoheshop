window.onload = function () {
    var dom = document.getElementsByClassName('el-collapse-item__header')
    for (let i = 0; i < dom.length; i++) {
        dom[i].addEventListener("mouseover", () => {
            dom[i].click()
        })
    }
    var title1 = '【　　　】小何网上书城';
    var title2 = '【新提醒】小何网上书城';
    var i = 0;
    setInterval(function () {
        // 切换两个标题的显示
        // 判断
        if (i % 2 == 0) {
            document.title = title1;
        } else {
            document.title = title2;
        }
        i++;
    }, 500);
}

