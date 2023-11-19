let img = null;
let dx = 0;
let dy = 0;
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
  }
});

function createBouncingImage(src, speed, sizePercentage) {
  if (img) return;

  img = document.createElement('img');
  img.src = src;
  img.style.position = 'fixed';
  img.style.left = '0px';
  img.style.top = '0px';
  img.style.zIndex = 1000;
  img.style.width = `${sizePercentage}%`;
  document.body.appendChild(img);

  const imageSize = (sizePercentage / 100) * window.innerWidth;
  dx = speed;
  dy = speed;
  x = 0;
  y = 0;
  bouncing = true;
  interval = setInterval(updatePosition, 10);

  function updatePosition() {
    x += dx;
    y += dy;

    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;
    let colorChanged = false;

    if (x <= 0 || x >= window.innerWidth - imgWidth) {
        dx = -dx;
        colorChanged = true;
    }

    if (y <= 0 || y >= window.innerHeight - imgHeight) {
        dy = -dy;
        colorChanged = true;
    }

    if (colorChanged) {
        changeImageColor();
    }

    img.style.left = x + 'px';
    img.style.top = y + 'px';
}

function changeImageColor() {
    const hueRotation = Math.floor(Math.random() * 360);
    img.style.filter = `hue-rotate(${hueRotation}deg)`;
}
}

function removeBouncingImage() {
  if (!img) return;

  clearInterval(interval);
  document.body.removeChild(img);
  img = null;
  bouncing = false;
}