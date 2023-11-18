document.getElementById('toggleBounce').addEventListener('click', () => {
  const imageUrl = document.getElementById('imageUrl').value;
  const speed = document.getElementById('speed').value;
  const size = document.getElementById('size').value;
  const insanity = document.getElementById('insanityCheckbox').value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      toggle: true,
      imageUrl: imageUrl,
      speed: parseInt(speed),
      size: parseInt(size),
      insanity: insanity
    });
  });
});