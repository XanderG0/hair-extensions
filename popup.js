document.addEventListener('DOMContentLoaded', function() {
    const imageUrlInput = document.getElementById('imageUrl');
    const speedInput = document.getElementById('speed');
    const sizeInput = document.getElementById('size');
    const toggleButton = document.getElementById('toggleBounce');

    imageUrlInput.addEventListener('input', updateSettings);
    speedInput.addEventListener('input', updateSettings);
    sizeInput.addEventListener('input', updateSettings);
    toggleButton.addEventListener('click', toggleBounce);

    function updateSettings() {
        sendMessage({
            imageUrl: imageUrlInput.value,
            speed: parseInt(speedInput.value, 10),
            size: parseInt(sizeInput.value, 10)
        });
    }

    function toggleBounce() {
        sendMessage({ toggle: true });
    }

    function sendMessage(data) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, data);
        });
    }
});
