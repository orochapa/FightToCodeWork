console.log("Enemy Creation Loaded");

// Factory method to create an enemy
function createEnemy(imageSrc, x, y, width, height, health, attack, speed) {
    // Create the enemy object
    const enemy = {
        x: x,
        y: y,
        width: width,
        height: height,
        image: new Image(),  // Correctly initialize the image property once
        health: health,
        attack: attack,
        speed: speed, // Movement speed

        // Draw function to render the enemy on the canvas
        draw: function(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);  // Draw enemy
        }
    };

    // Set the enemy's image source
    enemy.image.src = imageSrc;

    // Ensure the enemy is drawn only after the image is fully loaded
    enemy.image.onload = () => {
        enemy.draw(ctx);  // Draw the enemy on the canvas once loaded
    };

    // Check if the enemy image failed to load
    enemy.image.onerror = () => {
        console.error("Failed to load enemy image: " + imageSrc);
    };

    return enemy; // Return the created enemy object
}

// Function to move the enemy randomly
function moveEnemyRandomly(enemy) {
    const directions = ['left', 'right', 'up', 'down'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    switch(randomDirection) {
        case 'left':
            enemy.x -= enemy.speed;
            break;
        case 'right':
            enemy.x += enemy.speed;
            break;
        case 'up':
            enemy.y -= enemy.speed;
            break;
        case 'down':
            enemy.y += enemy.speed;
            break;
    }

    // Ensure the enemy stays within bounds
    enemy.x = Math.max(0, Math.min(enemy.x, canvas.width - enemy.width));
    enemy.y = Math.max(0, Math.min(enemy.y, canvas.height - enemy.height));
}
