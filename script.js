const imageMap = {};
const IMG_URL_INDEX = 0;

document.body.onload = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const width = document.getElementById('main').offsetWidth;

    const images = [
        ['elmo.png', 'https://www.youtube.com/watch?v=-hZ4bQFMTas'],
        ['granny.png', 'https://www.youtube.com/watch?v=L7j6o-es-l0'],
        ['poptropica.png', 'https://www.youtube.com/watch?v=Q71RPCGK8mc'],
        ['qubo.png', 'https://www.youtube.com/watch?v=xFBPtJdgkfU'],
        ['run.png', 'https://www.coolmathgames.com/0-run-2'],
        ['vaio.png', 'https://www.youtube.com/watch?v=vSIJ0X56x2g'],
        ['word-girl.png', 'https://www.youtube.com/watch?v=cALTm4TTrUI'],
        ['el-salvador.png', 'https://www.youtube.com/watch?v=3wS8brgTZDI'],
        ['girlsgogames.png', 'https://web.archive.org/web/20150609190720/http://www.girlsgogames.com/'],
        ['barbie.png', 'https://www.youtube.com/watch?v=wTPw0YeQs5A&list=RDwTPw0YeQs5A&start_radio=1'],
        ['minecraft.png', 'https://www.youtube.com/watch?v=yxYVZF_Q8Tg'],
    ];

    // assume body will be centered
    const maxImgWidth = 200; 
    const maxImgHeight = 200;
    
    const calculateXY = (i) => {
        // calculate the left and right margins - left or right of body
        const margin = (screenWidth - width) / 2;

        let finalX;
        
        if (i % 2 === 0) {
            // left margin
            finalX = Math.random() * Math.max(0, margin - maxImgWidth);
        } else {
            // right
            const rightStart = margin + width;
            finalX = rightStart + Math.random() * Math.max(0, margin - maxImgWidth);
        }
        
        const finalY = Math.random() * (screenHeight - maxImgHeight);
        
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
        const link = document.createElement('a')
        link.href = image[1];
        link.target = '_blank';

        const img = document.createElement('img');

        img.src = `img/${image[IMG_URL_INDEX]}`;
        img.style.position = 'absolute';
        
        // try 2 times
        let position = null;
        let attempts = 0;
        const maxAttempts = 2;
        
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

            img.style.left = `${position.x}px`;
            img.style.top = `${position.y}px`;
            img.style.maxWidth = '200px';
            img.style.maxHeight = '200px';
            img.classList.add('floating-img');
            link.appendChild(img);
            document.getElementById('background-imgs').appendChild(link);

            imgMap[image] = position;
            placedImages.push(position);
        }
    });
}

// windows style time padding
const pad = n => n < 10 ? '0' + n : n;

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