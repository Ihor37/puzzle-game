if (window.innerWidth > 1440) {
    const bg = document.querySelector('.background');
    const final = document.querySelector('.final');
    // bg.style.width = ((bg.naturalWidth / 1440) * 100) + 'vw';
    // final.style.width = ((bg.naturalWidth / 1440) * 100) + 'vw';




    const body = document.body;
    const wrapper = document.querySelector('.wrapper');
    const images = [];
    const rowNumber = 5;
    const columnNumber = 5;
    const imageNaturalSize = 640;
    const imagesPosition = [{
                left: 4,
                top: 4
            },
            {
                left: 120,
                top: 4
            },
            {
                left: 248,
                top: 4
            },
            {
                left: 372,
                top: 4
            },
            {
                left: 477,
                top: 4
            },
            {
                left: 4,
                top: 99
            },
            {
                left: 98,
                top: 121
            },
            {
                left: 222,
                top: 97
            },
            {
                left: 372,
                top: 121
            },
            {
                left: 498,
                top: 95
            },
            {
                left: 4,
                top: 224
            },
            {
                left: 119,
                top: 247
            },
            {
                left: 227,
                top: 249
            },
            {
                left: 352,
                top: 248
            },
            {
                left: 498,
                top: 224
            },
            {
                left: 4,
                top: 354
            }, {
                left: 121,
                top: 352
            }, {
                left: 253,
                top: 376
            }, {
                left: 370,
                top: 352
            }, {
                left: 480,
                top: 352
            }, {
                left: 4,
                top: 503
            }, {
                left: 96,
                top: 477
            }, {
                left: 224,
                top: 503
            }, {
                left: 370,
                top: 500
            }, {
                left: 476,
                top: 503
            }

        ]
        // imagesPosition.forEach(el => {
        //     el.left = el.left / imageNaturalSize * 100;
        //     el.top = el.top / imageNaturalSize * 100;
        // })
    const scoreSound = new Audio('./score.mp3');
    const redemption = new Audio('./redemption.mp3');

    const animations = ['slide-in-blurred-top', 'slide-in-blurred-tr', 'slide-in-blurred-right', 'slide-in-blurred-br', 'slide-in-blurred-bottom', 'slide-in-blurred-bl', 'slide-in-blurred-left', 'slide-in-blurred-tl'];


    // document.body.querySelector('.background').ondragstart = function() { return false; };
    // document.body.querySelector('.final').ondragstart = function() { return false; };
    document.body.ondragstart = function() { return false; };

    renderItems();

    // const imagesWidth = [];
    // images.forEach(el => { imagesWidth.push(el.offsetWidth) });
    // const maxItemSize = Math.max(...imagesWidth);

    function renderItems() {
        for (let i = 0; i < rowNumber * columnNumber; i++) {
            const img = new Image();

            img.src = './images/' + (i + 1) + '.png';
            img.style.position = 'absolute';
            img.isFreezed = false;

            const width = wrapper.offsetWidth;
            const height = wrapper.offsetHeight;




            img.classList.add('item');

            img.onload = function() {
                img.style.width = ((img.naturalWidth / imageNaturalSize) * 100) + '%';
                // img.style.height = ((img.naturalHeight / window.innerHeight) * 100) + '%';
                img.style.left = `${getRandomIntInclusive(-wrapper.getBoundingClientRect().left, wrapper.getBoundingClientRect().left + width - (0.15*window.innerWidth))}px`;
                img.style.top = `${getRandomIntInclusive(-wrapper.getBoundingClientRect().top, height )}px`;

                images.push(img);
                setAnimation(img);
                wrapper.appendChild(img);
            }

        }


        // setTimeout(() => {
        //     //     // images.forEach((el) => {
        //     //     //     document.querySelector('.wrapper').appendChild(el);
        //     //     //     // body.appendChild(el);
        //     // //     // })
        //      setAnimations();
        // }, 300)

    }

    // function setAnimations() {
    //     images.forEach(el => {
    //         el.style.animationDuration = `${getAnimationDuration()}s`;
    //         el.style.animationName = `${animations[getRandomIntInclusive(0, animations.length - 1 )]}`;
    //     })
    // }


    function setAnimation(item) {

        item.style.animationDuration = `${getAnimationDuration()}s`;
        item.style.animationName = `${animations[getRandomIntInclusive(0, animations.length - 1 )]}`;

    }

    document.onmousedown = function(event) {

        if (event.target.classList.contains('item')) {


            const item = event.target; // 
            if (item.isFreezed) return;

            images.forEach((el) => {
                if (!el.isFreezed) el.style.zIndex = '0';
            })
            item.style.zIndex = '100'; // кликабельный элемент всегда будет сверху

            let shiftX = event.pageX - event.target.getBoundingClientRect().left;
            let shiftY = event.pageY - event.target.getBoundingClientRect().top;



            item.ondragstart = function() {
                return false;

            }

            function moveAt(pageX, pageY) {

                if (wrapper.contains(item)) {
                    item.style.left = (pageX - shiftX) - wrapper.getBoundingClientRect().left + 'px';
                    item.style.top = (pageY - shiftY) - wrapper.getBoundingClientRect().top + 'px';
                } else {
                    item.style.left = pageX - shiftX + 'px';
                    item.style.top = pageY - shiftY + 'px';
                }

            }

            function onMouseMove(e) {


                moveAt(e.pageX, e.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            event.currentTarget.onmouseup = function() {
                checkPosition(item);
                checkGameStatus();
                document.removeEventListener('mousemove', onMouseMove);

            };
        } else document.onmouseup = function() { return false };


    }

    function checkGameStatus() {
        let isOver = true;
        images.forEach(el => {
            if (!el.isFreezed) isOver = false;
        })
        if (isOver) {
            const finalImage = document.querySelector('.final');
            finalImage.style.zIndex = '100';
            finalImage.style.opacity = '1.0';
            30 + 'px';
            setTimeout(() => {
                redemption.play();
                document.onmouseup = null;
            }, 400);


        }


    }

    function checkPosition(item) {
        const index = images.indexOf(item);
        // const wrapper = document.querySelector('.wrapper');
        const wrapperX = wrapper.getBoundingClientRect().left;
        const wrapperY = wrapper.getBoundingClientRect().top;
        if (index === -1) { console.log('not Found'); return }


        if ((Math.abs(item.getBoundingClientRect().left - wrapperX - imagesPosition[index].left) < 4) &&
            (Math.abs(item.getBoundingClientRect().top - wrapperY - imagesPosition[index].top) < 4)) {

            item.isFreezed = true;
            item.style.zIndex = '-1';
            setStaticPosition(index);
        }
    }

    function setStaticPosition(index) {
        images[index].style.left = imagesPosition[index].left + 'px';
        images[index].style.top = imagesPosition[index].top + 'px';
        scoreSound.play();
    }





    function getAnimationDuration() {
        return String(Math.random() + 0.7).slice(0, 7)
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }



}