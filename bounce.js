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

function createBouncingImage(src, speed, size) {
  if (img) return;

  img = document.createElement('img');
  img.src = src;
  img.style.position = 'fixed';
  img.style.zIndex = 1000;
  img.style.width = `${size}%`;
  document.body.appendChild(img);

  dx = speed;
  dy = speed;
  x = 0;
  y = 0;
  bouncing = true;
  interval = setInterval(updatePosition, 10);
}

function removeBouncingImage() {
  if (!img) return;

  clearInterval(interval);
  document.body.removeChild(img);
  img = null;
  bouncing = false;
}

function updatePosition() {
  // Existing position update logic
}

  