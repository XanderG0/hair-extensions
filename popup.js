document.getElementById('toggleBounce').addEventListener('click', () => {
    const imageUrl = document.getElementById('imageUrl').value;
    const speed = document.getElementById('speed').value;
    const size = document.getElementById('size').value;
  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        toggle: true,
        imageUrl: imageUrl,
        speed: parseInt(speed),
        size: parseInt(size)
      });
    });
  });

  document.getElementById('imageUrl').addEventListener('change', updateSettings);
  document.getElementById('speed').addEventListener('change', updateSettings);
  document.getElementById('size').addEventListener('change', updateSettings);
  
  document.getElementById('toggleBounce').addEventListener('click', () => {
    sendMessage({ toggle: true });
  });
  
  function updateSettings() {
    sendMessage({
      imageUrl: document.getElementById('imageUrl').value,
      speed: parseInt(document.getElementById('speed').value),
      size: parseInt(document.getElementById('size').value)
    });
  }
  
  function sendMessage(data) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, data);
    });
  }
  