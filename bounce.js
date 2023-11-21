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

  let hitCorner = false;

  if (x <= 0 || x >= window.innerWidth - imgWidth) {
    if(y <= 0 || y >= window.innerHeight - imgHeight) {
      hitCorner = true;
    }

    dx = -dx;
    colorChanged = true;
  }

  if (y <= 0 || y >= window.innerHeight - imgHeight) {
    if (x <= 0 || x >= window.innerWidth - imgWidth) {
      hitCorner = true;
    }

    dy = -dy;
    colorChanged = true;
  }

  if(hitCorner) {
    showConfetti(x, y);
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

function showConfetti(x, y) {
  const confettiCount = 20; // Number of confetti pieces
  const confettiDuration = 1500; // Duration in milliseconds

  for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = x + 'px';
      confetti.style.top = y + 'px';
      confetti.style.width = '5px';
      confetti.style.height = '5px';
      confetti.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16); // Random color
      confetti.style.zIndex = 1001;
      document.body.appendChild(confetti);

      // Randomize the confetti movement
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 50; // Max distance
      const endX = x + distance * Math.cos(angle);
      const endY = y + distance * Math.sin(angle);
      
      // Animate and remove the confetti
      confetti.animate([
          { transform: `translate(0, 0)`, opacity: 1 },
          { transform: `translate(${endX - x}px, ${endY - y}px)`, opacity: 0 }
      ], {
          duration: confettiDuration,
          easing: 'ease-out'
      }).onfinish = () => {
          document.body.removeChild(confetti);
      };
  }
}