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

document.addEventListener('DOMContentLoaded', function () {
    const bgMusic = document.getElementById('bg-music');

    // Check if the music is already playing across pages
    if (!localStorage.getItem('musicPlaying')) {
        bgMusic.play();  // Play the music if it is not already playing
        localStorage.setItem('musicPlaying', 'true');  // Store that music is playing
    }

    // Handle button clicks for login and create account
    const loginButton = document.getElementById('login-btn');
    const createAccountButton = document.getElementById('create-account-btn');

    loginButton.addEventListener('click', function () {
        // Navigate to login page without reloading the music
        window.location.href = 'login.html';
    });

    createAccountButton.addEventListener('click', function () {
        // Navigate to create account page without reloading the music
        window.location.href = 'create-account.html';
    });
});

