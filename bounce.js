let img = null;
let dx = 5;
let dy = 5;
let x = 0;
let y = 0;
let bouncing = false;
let interval = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.toggle) {
        if (!bouncing) {
            createBouncingImage(request.imageUrl, request.speed, request.size);
        } else {
            removeBouncingImage();
        }
    } else {
        if (bouncing) {
            updateBouncingImage(request.imageUrl, request.speed, request.size);
        }
    }
});

function createBouncingImage(src, speed, sizePercentage) {
    img = document.createElement('img');
    img.src = src;
    img.style.position = 'fixed';
    img.style.left = '0px';
    img.style.top = '0px';
    img.style.zIndex = 1000;
    updateImageProperties(speed, sizePercentage);
    document.body.appendChild(img);
    bouncing = true;
    interval = setInterval(updatePosition, 10);
}

function updateBouncingImage(src, speed, sizePercentage) {
    img.src = src;
    updateImageProperties(speed, sizePercentage);
}

function updateImageProperties(speed, sizePercentage) {
    const imageSize = (sizePercentage / 100) * window.innerWidth;
    img.style.width = `${sizePercentage}%`;
    dx = speed;
    dy = speed;
    x = Math.min(x, window.innerWidth - imageSize);
    y = Math.min(y, window.innerHeight - imageSize);
}

function updatePosition() {
    x += dx;
    y += dy;

    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;

    if (x <= 0 || x >= window.innerWidth - imgWidth) {
        dx = -dx;
    }

    if (y <= 0 || y >= window.innerHeight - imgHeight) {
        dy = -dy;
    }

    img.style.left = x + 'px';
    img.style.top = y + 'px';
}

function removeBouncingImage() {
    clearInterval(interval);
    document.body.removeChild(img);
    img = null;
    bouncing = false;
}
