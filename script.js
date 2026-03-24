const imageMap = {};
const IMG_NAME_INDEX = 0;
const IMG_LINK_INDEX = 1;
const IMG_LABEL_INDEX = 2;
const CONTAINER_TEXT_SPACE = 20;

document.body.onload = () => {
    const screenWidth = window.innerWidth;

    const width = document.getElementById('main').offsetWidth;
    const footer = document.getElementById('footer');

    const images = [
        ['elmo.png', 'https://www.youtube.com/watch?v=-hZ4bQFMTas', 'elmo'],
        ['granny.png', 'https://www.youtube.com/watch?v=L7j6o-es-l0', 'granny'],
        ['poptropica.png', 'https://www.youtube.com/watch?v=Q71RPCGK8mc', 'poptropica'],
        ['qubo.png', 'https://www.youtube.com/watch?v=xFBPtJdgkfU', 'qubo'],
        ['run.png', 'https://www.coolmathgames.com/0-run-2', 'run'],
        ['vaio.png', 'https://www.youtube.com/watch?v=vSIJ0X56x2g', 'vaio'],
        ['word-girl.png', 'https://www.youtube.com/watch?v=cALTm4TTrUI', 'word-girl'],
        ['el-salvador.png', 'https://www.youtube.com/watch?v=3wS8brgTZDI', 'el-salvador'],
        ['girlsgogames.png', 'https://web.archive.org/web/20150609190720/http://www.girlsgogames.com/', 'girlsgogames'],
        ['barbie.png', 'https://www.youtube.com/watch?v=wTPw0YeQs5A&list=RDwTPw0YeQs5A&start_radio=1', 'barbie'],
        ['minecraft.png', 'https://www.youtube.com/watch?v=yxYVZF_Q8Tg', 'minecraft'],
        ['coolmathgames.png', 'https://www.coolmathgames.com/', 'coolmathgames'],
        ['bethany-mota.png', 'https://www.youtube.com/watch?v=zhTQAvzTzT0', 'bethany-mota'],
        ['gaga.png', 'https://www.youtube.com/watch?v=2Abk1jAONjw', 'gaga'],
        ['sonar.png', 'https://www.youtube.com/watch?v=PwOgjDqt9BM', 'atrevete-a-soñar'],
        ['wassabi.png', 'https://www.youtube.com/watch?v=8cJiBArztwA', 'wassabi'],
    ];

    const maxImgWidth = 100;
    const maxImgHeight = 120;
    const LESS_MARGIN = 0;
    const FOOTER_SAFE_GAP = 5;
    
    const calculateXY = (i) => {
        // calculate the left and right margins - left or right of body
        const margin = (screenWidth - width) / 2;

        let finalX;
        
        if (i % 2 === 0) {
            // left margin
            finalX = Math.random() * Math.max(0, margin +  LESS_MARGIN - maxImgWidth);
        } else {
            // right
            const rightStart = margin + width;
            finalX = rightStart + Math.random() * Math.max(0, margin - maxImgWidth);
        }
        const footerTop = footer.getBoundingClientRect().top;
        const maxY = Math.max(0, footerTop - maxImgHeight - FOOTER_SAFE_GAP);
        const finalY = Math.random() * maxY;

        return {
            x: finalX,
            y: finalY
        };
    }
    
    // check if two rectangles overlap
    const checkCollision = (x1, y1, w1, h1, x2, y2, w2, h2) => {
        return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);
    };
    
    // check if overlap
    const isOverlapping = (newX, newY, placedImages) => {
        for (const pos of placedImages) {
            if (checkCollision(newX, newY, maxImgWidth, maxImgHeight, pos.x, pos.y, maxImgWidth, maxImgHeight)) {
                return true;
            }
        }
        return false;
    };
    
    // everyday we shuffling
    const shuffled = images.sort(() => Math.random() - 0.5);

    // prevent collision between images
    const imgMap = {};
    const placedImages = [];

    shuffled.forEach((image, i) => {
        
        // try 5 times
        let position = null;
        let attempts = 0;
        const maxAttempts = 5;
        
        while (attempts < maxAttempts) {
            const { x, y } = calculateXY(i);
            
            if (!isOverlapping(x, y, placedImages)) {
                position = { x, y };
                break;
            }
            attempts++;
        }
        
        // only show image if no overlap
        if (position) {
            // wrapper
            const iconWrapper = document.createElement('div');
            iconWrapper.classList.add('icon-wrapper');

            //  shortcut arrow
            const shortcutArrow = document.createElement('img');
            shortcutArrow.src = 'img/shortcut-arrow.png';
            shortcutArrow.classList.add('shortcut-arrow');

            // link
            const link = document.createElement('a')
            link.href = image[IMG_LINK_INDEX];
            link.target = '_blank';
            link.classList.add('icon-container');

            // icon
            const icon = document.createElement('img');
            icon.classList.add('icon-img');
            icon.src = `img/${image[IMG_NAME_INDEX]}`;


            iconWrapper.appendChild(shortcutArrow);
            iconWrapper.appendChild(icon);

            const label = document.createElement('span');
            label.classList.add('icon-label');
            label.textContent = image[IMG_LABEL_INDEX];

            link.style.left = `${position.x}px`;
            link.style.top = `${position.y}px`;
            link.appendChild(iconWrapper);
            link.appendChild(label);
            link.classList.add('floating');
            document.getElementById('background-imgs').appendChild(link);

            imgMap[image] = position;
            placedImages.push(position);

        }
    });
}

// windows style time padding
const pad = n => n < 10 ? '0' + n : n;

// keep time updated
const setFooterClock = () => {
    const d = new Date();
    let h = d.getHours();
    const m = pad(d.getMinutes());
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const t = `${h}:${m} ${ampm}`;
    const dt = `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;
    const time = document.querySelector('#time span#time');
    const date = document.querySelector('#time span#date');
    if (time) time.textContent = t;
    if (date) date.textContent = dt;
};

setInterval(setFooterClock, 1000);
setFooterClock();