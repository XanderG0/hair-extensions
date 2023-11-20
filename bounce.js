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
  img.onload = function() {
      // Image dimensions are available after it's loaded
      const imgWidth = img.offsetWidth;
      const imgHeight = img.offsetHeight;

      // Correct initial position calculation
      let calculatedX = Math.floor(Math.random() * (window.innerWidth - imgWidth));
      let calculatedY = Math.floor(Math.random() * (window.innerHeight - imgHeight));
      
      // Set initial position
      img.style.left = calculatedX + 'px';
      img.style.top = calculatedY + 'px';

      // Set up movement
      dx = speed;
      dy = speed;
      x = calculatedX;
      y = calculatedY;
      bouncing = true;
      interval = setInterval(updatePosition, 10);
  };

  img.src = src;
  img.style.position = 'fixed';
  img.style.zIndex = 1000;
  img.style.width = `${sizePercentage}%`;
  document.body.appendChild(img);
}

function updatePosition() {
  x += dx;
  y += dy;

  let colorChanged = false;
  const imgWidth = img.offsetWidth;
  const imgHeight = img.offsetHeight;

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

function removeBouncingImage() {
  if (!img) return;

  clearInterval(interval);
  document.body.removeChild(img);
  img = null;
  bouncing = false;
}
