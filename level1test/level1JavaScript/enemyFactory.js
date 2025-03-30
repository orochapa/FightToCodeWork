// Function to create the enemy with additional properties like health, attack, and speed
function createEnemies(imageSrc, x, y, width, height, speed, health, attack) {
    const enemy = {
        x: x,
        y: y,
        width: width,
        height: height,
        speed: speed,
        health: health,
        attack: attack,
        image: new Image(),

        // Load character image
        draw: function(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);  // Draw enemy
        },

        // AI movement function
        move: function(player, aggressionRange) {
            const dx = player.x - this.x;  // Difference in X positions between the player and the enemy
            const dy = player.y - this.y;  // Difference in Y positions between the player and the enemy
            const distance = Math.sqrt(dx * dx + dy * dy);  // Calculate distance

            if (distance < aggressionRange) {
                // Chase the player if within aggression range
                if (dx > 0) this.x += this.speed;  // Move right
                else if (dx < 0) this.x -= this.speed;  // Move left

                if (dy > 0) this.y += this.speed;  // Move down
                else if (dy < 0) this.y -= this.speed;  // Move up
            } else {
                // Random movement when not in aggression range
                randomMove(this);
            }
        },

        // Check if enemy collides with player or another object
        checkCollision: function(player) {
            // Simple bounding box collision detection
            if (this.x < player.x + player.width &&
                this.x + this.width > player.x &&
                this.y < player.y + player.height &&
                this.y + this.height > player.y) {
                    return true;  // Collision detected
            }
            return false;  // No collision
        }
    };

    enemy.image.src = imageSrc;

    // Ensure the enemy is drawn only after the image is fully loaded
    enemy.image.onload = () => {
        enemy.draw(ctx);  // Draw the enemy on the canvas
    };

    enemy.image.onerror = () => {
        console.error("Failed to load enemy image: " + imageSrc);
    };

    return enemy;  // Return the created enemy object
}

// Function for random movement
function randomMove(ai) {
    const directions = ['left', 'right', 'up', 'down'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    switch (randomDirection) {
        case 'left':
            ai.x -= ai.speed;
            break;
        case 'right':
            ai.x += ai.speed;
            break;
        case 'up':
            ai.y -= ai.speed;
            break;
        case 'down':
            ai.y += ai.speed;
            break;
    }
}

// Game loop function
function update(player, enemy) {
    // Clear the canvas before redrawing everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw the background
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Stretch background

    // Move the enemy based on the player's position and aggression range
    enemy.move(player, 200);  // 200 is the aggression range

    // Redraw the enemy after it moves (ensure this happens each time in the game loop)
    enemy.draw(ctx);  // Redraw the enemy

    // Redraw the player
    player.draw(ctx);

    // Check for collisions between the player and the enemy
    if (enemy.checkCollision(player)) {
        console.log("Enemy collided with player!");
    }

    // Keep updating the game loop
    requestAnimationFrame(() => update(player, enemy));  // Recursively call update to animate
}


