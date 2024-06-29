(function () {
    function $(select) {
        return document.querySelector(select);
    }
    var isGameOver = false;
    var imgArr = 15;
    var randomImg = 0;
    var imgIndexArr = [];
    var containerElement = {
        contentImg: $('.content-img'),
        contentImgOne: $('.content-img').querySelector('img:nth-child(1)'),
        contentImgTwo: $('.content-img').querySelector('img:nth-child(2)'),
        text: $('.text'),
        contentRight: $('.content-right')
    }
    var pText = ['在心中任意选择一个两位数', '（或者说，从10~99之间任意选择一个数）', '把这个数字分别减去其十位数和个位数', '（例如你选择的是71,那就：71-7-1=63）', '在右边图表中找出与最后得出的数所相应的图形，并把这个图形牢记心中。', '然后点击上方的阵型。', '你会发现，阵型所显示出来的图形就是你刚刚心里记下的那个图形。'];
    function createP() {
        containerElement.text.innerHTML = "";
        let textHTML = "";
        pText.forEach(txt => {
            textHTML += `<p>${txt}</p>`;
        });
        containerElement.text.innerHTML = textHTML;
    }
    function createContentImg() {
        containerElement.contentRight.innerHTML = "";
        let contentText = "";
        let randomContentImg = Math.floor(Math.random() * imgArr);
        for (let i = 0; i < 100; i++) {
            if (i < 12) {
                const imgIndex = i * 9;
                imgIndexArr.push(imgIndex);
            }
            const createImg = Math.floor(Math.random() * imgArr);
            if (imgIndexArr.includes(i)) {
                contentText += `<div class="item"><span>${i}</span><img src='../images/values/${randomContentImg}.png'></div>`;
            } else {
                contentText += `<div class="item"><span>${i}</span><img src='../images/values/${createImg}.png'></div>`;
            }
        }
        containerElement.contentRight.innerHTML = contentText;
        randomImg = randomContentImg;
    }
    function onContentImgClick() {
        if (isGameOver) {
            if (window.confirm('是否再玩一次?')) {
                containerElement.contentImg.style.transition = '';
                containerElement.contentImg.style.transform = '';
                containerElement.contentImgOne.style.opacity = '1';
                containerElement.contentImgTwo.style.opacity = '0';
                imgIndexArr = [];
                createP();
                createContentImg();
                isGameOver = false;
            }
        } else {
            const time = 3;
            const timeoutNumber = parseInt(time + '000');
            containerElement.contentImg.style.transition = `all ${time}s`;
            containerElement.contentImg.style.transform = 'rotate(1800deg)';
            containerElement.contentImgTwo.src = `../images/values/${randomImg}.png`;
            setTimeout(() => {
                containerElement.contentImgOne.style.opacity = '0';
                containerElement.contentImgTwo.style.opacity = '1';
            }, timeoutNumber);
            isGameOver = true;
        }
    }
    const initEvent = function () {
        containerElement.contentImg.addEventListener('click', onContentImgClick)
    }
    const main = function () {
        createP();
        createContentImg();
        initEvent();
    }
    main();
})()