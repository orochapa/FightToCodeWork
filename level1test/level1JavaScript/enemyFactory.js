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
        direction: '', // Direction for random movement (left, right, up, down)
        velocityX: 0,  // X-axis velocity for smooth movement
        velocityY: 0,  // Y-axis velocity for smooth movement
        moveInterval: 500, // Interval (in ms) between random movement direction changes
        lastMoveTime: Date.now(), // Time of the last movement change

        // Draw function to render the enemy on the canvas
        draw: function(ctx) {
            if (this.isLoaded) {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);  // Draw enemy
            } else {
                console.log("Enemy image is not loaded yet");  // Debug message
            }
        },

        // Move the enemy (with smooth movement)
        move: function() {
            const currentTime = Date.now();
            if (currentTime - this.lastMoveTime >= this.moveInterval) {
                this.randomMove();  // Change direction randomly after the interval
                this.lastMoveTime = currentTime;  // Update the last movement time
            }

            // Update position based on velocity
            this.x += this.velocityX;
            this.y += this.velocityY;

            // Ensure the enemy stays within the canvas bounds
            this.x = Math.max(0, Math.min(this.x, canvas.width - this.width));
            this.y = Math.max(0, Math.min(this.y, canvas.height - this.height));
        },

        // Random movement logic with smooth velocity
        randomMove: function() {
            const directions = ['left', 'right', 'up', 'down'];
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];

            // Adjust velocity based on the random direction
            switch (randomDirection) {
                case 'left':
                    this.velocityX = -this.speed;  // Move left
                    this.velocityY = 0;  // Stop moving vertically
                    break;
                case 'right':
                    this.velocityX = this.speed;  // Move right
                    this.velocityY = 0;  // Stop moving vertically
                    break;
                case 'up':
                    this.velocityX = 0;  // Stop moving horizontally
                    this.velocityY = -this.speed;  // Move up
                    break;
                case 'down':
                    this.velocityX = 0;  // Stop moving horizontally
                    this.velocityY = this.speed;  // Move down
                    break;
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


function spawnEnemies() {
    const enemies = [];

    for (let i = 0; i < 4; i++) {  // Create 4 enemies
        const enemy = createEnemy(
            'level1graphics/RightWolfMan.png', // Image source
            Math.random() * (canvas.width - 100),  // Random X position (ensures no overlap)
            Math.random() * (canvas.height - 100), // Random Y position (ensures no overlap)
            100, 100,  // Width and Height of the enemy
            25,        // Health
            5,         // Attack
            2,         // Speed
            200        // Aggression range (px)
        );
        enemies.push(enemy);  // Add enemy to the enemies array
    }

    return enemies;  // Return the array of enemies
}