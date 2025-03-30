console.log("Enemy Creation Loaded");

function createEnemy(imageSrc, x, y, width, height, health, attack, speed) {
    const enemy = {
        image: new Image(),        // Create a new image object for the enemy
        x: x,
        y: y,
        width: width,
        height: height,
        health: health,
        attack: attack,
        speed: speed,
        isLoaded: false, // Flag to track if the image is loaded

        // Draw function to render the enemy on the canvas
        draw: function(ctx) {
            if (this.isLoaded) {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);  // Draw enemy
            } else {
                console.log("Enemy image is not loaded yet");  // Debug message
            }
        }
    };

    // Load the image for the enemy
    enemy.image.src = imageSrc;

    // When the enemy image is successfully loaded
    enemy.image.onload = function() {
        enemy.isLoaded = true;  // Mark as loaded
        console.log("Enemy image loaded:", imageSrc);  // Log success message
    };

    // If the enemy image fails to load
    enemy.image.onerror = function() {
        console.error("Failed to load enemy image:", imageSrc);  // Log error message
    };

    return enemy; // Return the created enemy object
}
