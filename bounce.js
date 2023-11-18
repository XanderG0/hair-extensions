(function() {
    const imgSrc = 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg'; // URL of the image you want to bounce
    const speed = 5; // Speed of the bouncing image
  
    let dx = speed;
    let dy = speed;
    let x = 0;
    let y = 0;
  
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.position = 'fixed';
    img.style.left = '0px';
    img.style.top = '0px';
    img.style.zIndex = 1000;
    document.body.appendChild(img);
  
    function updatePosition() {
      x += dx;
      y += dy;
  
      if (x <= 0 || x >= window.innerWidth - img.width) {
        dx = -dx;
      }
  
      if (y <= 0 || y >= window.innerHeight - img.height) {
        dy = -dy;
      }
  
      img.style.left = x + 'px';
      img.style.top = y + 'px';
    }
  
    setInterval(updatePosition, 10);
  })();
  