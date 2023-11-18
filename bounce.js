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
      if(insanity){
        doSomethingCrazy();
      }
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

function doSomethingCrazy() {
    function insanityFunction() {
        // Create goat GIF
        const goatGif = document.createElement('img');
        goatGif.src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7c079791-e92f-4eda-b1d9-f5cd835d16e1/d4u78aq-c333f2b1-f755-4975-886f-4d459a7fb87b.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjMDc5NzkxLWU5MmYtNGVkYS1iMWQ5LWY1Y2Q4MzVkMTZlMVwvZDR1NzhhcS1jMzMzZjJiMS1mNzU1LTQ5NzUtODg2Zi00ZDQ1OWE3ZmI4N2IuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.9tu8d1FJ56wn6VblLafh-iXoKN4B8axVwz0VkmvtOaQ'; // Replace with the actual URL of the goat GIF
        goatGif.style.position = 'fixed';
        goatGif.style.bottom = '-100px'; // Start below the screen
        goatGif.style.left = '0';
        goatGif.style.zIndex = '1000';
        document.body.appendChild(goatGif);
    
        // Animate goat rising
        let goatBottom = -100; // Adjust this value based on the actual size of your GIF
        const riseInterval = setInterval(() => {
            goatBottom += 1; // Adjust the rising speed as needed
            goatGif.style.bottom = goatBottom + 'px';
    
            // Stop rising when the goat is fully visible
            if (goatBottom >= 10) { // Adjust based on where you want the goat to start walking
                clearInterval(riseInterval);
                walkGoat();
            }
        }, 10);
    
        // Function to make the goat walk
        function walkGoat() {
            let goatPosition = 0;
            const walkInterval = setInterval(() => {
                goatPosition += 5; // Adjust the walking speed as needed
                goatGif.style.left = goatPosition + 'px';
    
                // Check if goat has walked off screen, then remove it
                if (goatPosition > window.innerWidth) {
                    clearInterval(walkInterval);
                    document.body.removeChild(goatGif);
                }
            }, 50);
        }
    }
    
}

function anotherCrazyFunction() {
    // Define what this function does
}

// ...more functions as needed.