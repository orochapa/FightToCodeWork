// Play background music automatically on page load with a fade-in effect
window.onload = function () {
    const music = new Audio('RetroMusic copy.mp3');
    music.loop = true; // Loop the music
    music.volume = 0;  // Start with the music at volume 0 (mute)
    music.play(); // Start playing the music

    // Fade in the music by increasing the volume gradually
    let volume = 0;
    let fadeInInterval = setInterval(function () {
        if (volume < 1) {
            volume += 0.25; // Increase volume more quickly within 4 seconds (adjust the rate as needed)
            music.volume = volume;
        } else {
            clearInterval(fadeInInterval); // Stop the interval once volume reaches 1
        }
    }, 100); // Adjust the fade speed here (100ms intervals)
};

// Hide the loading screen after the page is fully loaded and fade out smoothly over 4 seconds
window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');

    // Fade out the loading screen with a 4-second transition
    loadingScreen.style.transition = 'opacity 4s ease-out';  // Smooth fade-out transition over 4 seconds
    loadingScreen.style.opacity = '0';

    // Remove the loading screen after it fades out
    setTimeout(function () {
        loadingScreen.style.display = 'none';
    }, 4000); // Remove it after the fade-out animation ends (4 seconds)
});

// Keep the music continuous across pages
window.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bg-music');

    // Restore music playback time if it exists
    if (sessionStorage.getItem('musicTime')) {
        music.currentTime = parseFloat(sessionStorage.getItem('musicTime'));
    }

    music.play();

    // Save playback time before navigating away
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('musicTime', music.currentTime);
    });

    // Display username on welcome page
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        const username = localStorage.getItem('username') || 'Guest';
        welcomeMessage.textContent = `Welcome, ${username}!`;
    }
});

// Navigation Function
function navigateTo(page) {
    window.location.href = `../level1test/${page}`;
}



// Handle form submission and store username
function handleFormSubmit(event) {
    event.preventDefault();

    // Retrieve username from form
    const username = document.querySelector('input[placeholder="Username"]').value;

    if (username) {
        // Store username in localStorage
        localStorage.setItem('username', username);

        // Redirect to welcome page
        window.location.href = 'welcome.html';
    } else {
        alert('Please enter a username.');
    }
}